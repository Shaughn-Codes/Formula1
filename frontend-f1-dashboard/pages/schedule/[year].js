import { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from "react";
import "/src/app/globals.css";
import Navbar from '/components/Navbar.js';
import config from '../../config';

/**
 * F1 Schedule Component
 * 
 * Displays Formula 1 race schedules for different years with detailed race information.
 * Features include:
 * - Year selection dropdown (from 2015 to current year)
 * - Dynamic URL updates based on selected year
 * - Collapsible race cards with details
 * - Server-side initial data loading
 * 
 * @param {Object} initialSchedule - Initial schedule data fetched server-side
 */
export default function Schedule({ initialSchedule }) {
  const router = useRouter();
  
  // Initialize selected year from URL query or current year
  const [selectedYear, setSelectedYear] = useState(() => {
    const routerYear = router.query.year ? parseInt(router.query.year, 10) : new Date().getFullYear();
    console.log('Initial selectedYear:', routerYear);
    return routerYear;
  });

  // Store the schedule data fetched from the API
  const [schedule, setSchedule] = useState(initialSchedule);

  /**
   * Fetches schedule data for a specific year from the API
   * @param {number} year - The year to fetch schedule data for
   */
  const fetchScheduleData = async (year) => {
    try {
      const response = await fetch(`${config.apiUrl}/get-f1-schedule/${year}`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setSchedule({});
    }
  };

  // Update URL and fetch new data when selected year changes
  useEffect(() => {
    router.replace(`/schedule/${selectedYear}`, undefined, { shallow: true });
    fetchScheduleData(selectedYear);
  }, [selectedYear]);

  /**
   * Processes and transforms the raw schedule data into a flat array of races
   * with formatted dates and sorted by start date
   * 
   * @param {Object} scheduleObj - Raw schedule data from the API
   * @returns {Array} Processed and sorted array of race objects
   */
  const processScheduleData = (scheduleObj) => {
    if (!scheduleObj || Object.keys(scheduleObj).length === 0) {
      console.warn('Schedule object is empty or undefined');
      return [];
    }

    try {
      // Flatten nested schedule object and format dates
      const flattenedRaces = Object.values(scheduleObj).flat().map((race) => ({
        ...race,
        startDate: new Date(race.startDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        })
      }));
      
      // Sort races by start date
      return flattenedRaces.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } catch (error) {
      console.error('Error processing schedule data:', error);
      return [];
    }
  };

  // Memoize processed race data to avoid unnecessary recalculations
  const processedRaces = useMemo(() => processScheduleData(schedule), [schedule]);

  // Filter races to only show those from the selected year
  const filteredRaces = useMemo(() => {
    return processedRaces.filter((race) => 
      new Date(race.startDate).getFullYear() === selectedYear
    );
  }, [processedRaces, selectedYear]);

  // Generate array of years from 2015 to current year for dropdown
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">F1 Race Schedule</h1>
        
        {/* Year selection dropdown */}
        <div className="mb-6">
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedYear}
            onChange={(e) => {
              const newYear = Number(e.target.value);
              console.log('Year selected:', newYear);
              setSelectedYear(newYear);
            }}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Display warning if no races found, otherwise show race cards */}
        {filteredRaces.length === 0 ? (
          <div className="alert alert-warning">
            No schedule data available for {selectedYear}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Collapsible race cards */}
            {filteredRaces.map((race, index) => (
              <div key={index} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion" />
                <div className="collapse-title text-xl font-medium flex justify-between">
                  <span>{race.gPrx}</span>
                  <span className="text-sm text-gray-600">{race.startDate}</span>
                </div>
                <div className="collapse-content">
                  <p><strong>Circuit:</strong> {race.crct}</p>
                  <p><strong>Winner:</strong> {race.winner || 'Not yet determined'}</p>
                  <p><strong>Status:</strong> {race.completed ? 'Completed' : 'Upcoming'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Server-side props function to fetch initial schedule data
 * 
 * @param {Object} context - Next.js context object containing route parameters
 * @returns {Object} Props object containing initial schedule data
 */
export async function getServerSideProps(context) {
  const { year } = context.params;
  const selectedYear = year ? String(year) : String(new Date().getFullYear());

  try {
    // Fetch initial schedule data for the selected year
    const scheduleResponse = await fetch(`${config.apiUrl}/get-f1-schedule/${selectedYear}`);
    if (!scheduleResponse.ok) {
      throw new Error('Failed to fetch schedule');
    }

    const scheduleData = await scheduleResponse.json();
    return {
      props: {
        initialSchedule: scheduleData
      }
    };
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return {
      props: {
        initialSchedule: {}
      }
    };
  }
}