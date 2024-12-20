
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from "react";
import "/src/app/globals.css";
import Navbar from '/components/Navbar.js';

export default function Schedule({ initialSchedule }) {
  const router = useRouter();
  
  const [selectedYear, setSelectedYear] = useState(() => {
    const routerYear = router.query.year ? parseInt(router.query.year, 10) : new Date().getFullYear();
    console.log('Initial selectedYear:', routerYear);
    return routerYear;
  });

  const [schedule, setSchedule] = useState(initialSchedule);

  const fetchScheduleData = async (year) => {
    try {
      const response = await fetch(`http://localhost:8080/get-f1-schedule/${year}`);
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

  useEffect(() => {
    router.replace(`/schedule/${selectedYear}`, undefined, { shallow: true });
    fetchScheduleData(selectedYear);
  }, [selectedYear]);

  const processScheduleData = (scheduleObj) => {
    if (!scheduleObj || Object.keys(scheduleObj).length === 0) {
      console.warn('Schedule object is empty or undefined');
      return [];
    }

    try {
      const flattenedRaces = Object.values(scheduleObj).flat().map((race) => ({
        ...race,
        startDate: new Date(race.startDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        })
      }));
      
      return flattenedRaces.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } catch (error) {
      console.error('Error processing schedule data:', error);
      return [];
    }
  };

  const processedRaces = useMemo(() => processScheduleData(schedule), [schedule]);

  const filteredRaces = useMemo(() => {
    return processedRaces.filter((race) => 
      new Date(race.startDate).getFullYear() === selectedYear
    );
  }, [processedRaces, selectedYear]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">F1 Race Schedule</h1>
        
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

        {filteredRaces.length === 0 ? (
          <div className="alert alert-warning">
            No schedule data available for {selectedYear}
          </div>
        ) : (
          <div className="space-y-4">
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

export async function getServerSideProps(context) {
  const { year } = context.params;
  const selectedYear = year ? String(year) : String(new Date().getFullYear());

  try {
    const scheduleResponse = await fetch(`http://localhost:8080/get-f1-schedule/${selectedYear}`);
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
