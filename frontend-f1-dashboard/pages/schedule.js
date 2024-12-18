// // import { useRouter } from "next/router";
// // import "/src/app/globals.css";
// // import Navbar from '/components/Navbar.js';
// // import { useState, useEffect } from "react";

// // export default function Schedule({ schedule }) {
// //   // Log the schedule to understand its structure
// //   console.log('Received schedule:', schedule);
// //   console.log('Schedule type:', typeof schedule);

// //   // Ensure schedule is always an array
// //   const scheduleArray = Array.isArray(schedule) ? schedule : 
// //     (schedule && typeof schedule === 'object' ? Object.values(schedule) : []);

// //   // State for year selection
// //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="container mx-auto px-4 py-8">
// //         <h1 className="text-3xl font-bold mb-6">F1 Race Schedule</h1>
        
// //         {/* Year Selection Dropdown */}
// //         <div className="mb-6">
// //           <select 
// //             className="select select-bordered w-full max-w-xs"
// //             value={selectedYear}
// //             onChange={(e) => setSelectedYear(Number(e.target.value))}
// //           >
// //             {/* Generate year options from 2020 to current year */}
// //             {Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => 2020 + i).map(year => (
// //               <option key={year} value={year}>{year}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Error or Empty State Handling */}
// //         {scheduleArray.length === 0 ? (
// //           <div className="alert alert-warning">
// //             No schedule data available
// //           </div>
// //         ) : (
// //           <div className="collapse collapse-arrow bg-base-200">
// //             {scheduleArray.map((race, index) => (
// //               <div key={index} className="collapse">
// //                 <input type="radio" name="my-accordion" /> 
// //                 <div className="collapse-title text-xl font-medium">
// //                   {race.gPrx} - {new Date(race.startDate).toLocaleDateString()}
// //                 </div>
// //                 <div className="collapse-content"> 
// //                   <p>Circuit: {race.crct}</p>
// //                   <p>Winner: {race.winner || 'Not yet determined'}</p>
// //                   <p>Status: {race.completed ? 'Completed' : 'Upcoming'}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// // export async function getServerSideProps(context) {
// //   const currentYear = new Date().getFullYear();
  
// //   try {
// //     const scheduleResponse = await fetch(`http://localhost:8080/get-f1-schedule/${currentYear}`);
    
// //     if (!scheduleResponse.ok) {
// //       throw new Error('Failed to fetch schedule');
// //     }
    
// //     const scheduleData = await scheduleResponse.json();
    
// //     console.log('Fetched schedule data:', scheduleData);
// //     console.log('Schedule data type:', typeof scheduleData);

// //     // Ensure we're passing an array
// //     const schedule = Array.isArray(scheduleData) ? scheduleData : 
// //       (scheduleData && typeof scheduleData === 'object' ? Object.values(scheduleData) : []);
    
// //     return {
// //       props: {
// //         schedule
// //       }
// //     };
// //   } catch (error) {
// //     console.error('Error fetching schedule:', error);
    
// //     return {
// //       props: {
// //         schedule: [] // Explicitly return an empty array
// //       }
// //     };
// //   }
// // }

// import { useRouter } from "next/router";
// import "/src/app/globals.css";
// import Navbar from '/components/Navbar.js';
// import { useState, useEffect } from "react";

// export default function Schedule({ schedule }) {
//   // Extensive debugging logs
//   console.log('Raw Schedule Data:', JSON.stringify(schedule, null, 2));
  
//   // More robust data processing
//   const processScheduleData = (rawSchedule) => {
//     // If schedule is not an array, try to convert it
//     const scheduleArray = Array.isArray(rawSchedule) 
//       ? rawSchedule 
//       : Object.values(rawSchedule || {});

//     // Map and validate each race entry
//     return scheduleArray.map(race => ({
//       gPrx: race.gPrx || 'Unknown Grand Prix',
//       startDate: race.startDate ? new Date(race.startDate).toLocaleDateString() : 'Invalid Date',
//       crct: race.crct || 'Unknown Circuit',
//       winner: race.winner || 'Not yet determined',
//       completed: race.completed || false
//     }));
//   };

//   const processedSchedule = processScheduleData(schedule);

//   // Log processed data for verification
//   console.log('Processed Schedule:', JSON.stringify(processedSchedule, null, 2));

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">F1 Race Schedule</h1>

//         {processedSchedule.length === 0 ? (
//           <div className="alert alert-warning">
//             No schedule data available
//           </div>
//         ) : (
//           <div className="collapse collapse-arrow bg-base-200">
//             {processedSchedule.map((race, index) => (
//               <div key={index} className="collapse">
//                 <input type="radio" name="my-accordion" /> 
//                 <div className="collapse-title text-xl font-medium">
//                   {race.gPrx} - {race.startDate}
//                 </div>
//                 <div className="collapse-content"> 
//                   <p>Circuit: {race.crct}</p>
//                   <p>Winner: {race.winner}</p>
//                   <p>Status: {race.completed ? 'Completed' : 'Upcoming'}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const currentYear = new Date().getFullYear();
  
//   try {
//     const scheduleResponse = await fetch(`http://localhost:8080/get-f1-schedule/${currentYear}`);
    
//     if (!scheduleResponse.ok) {
//       throw new Error('Failed to fetch schedule');
//     }
    
//     const scheduleData = await scheduleResponse.json();
    
//     // Log the exact structure of the received data
//     console.log('Backend Response:', JSON.stringify(scheduleData, null, 2));

//     return {
//       props: {
//         schedule: scheduleData
//       }
//     };
//   } catch (error) {
//     console.error('Error fetching schedule:', error);
    
//     return {
//       props: {
//         schedule: [] // Fallback to empty array
//       }
//     };
//   }
// }
import { useRouter } from "next/router";
import "/src/app/globals.css";
import Navbar from '/components/Navbar.js';
import { useState, useMemo } from "react";

export default function Schedule({ schedule }) {
  // Convert the nested object to a flat array of races
  const processScheduleData = (scheduleObj) => {
    // Flatten the nested object into an array of races
    const flattenedRaces = Object.values(scheduleObj).flat().map(race => ({
      ...race,
      // Convert UTC date to local date string
      startDate: new Date(race.startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      })
    }));

    // Sort races by date
    return flattenedRaces.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  // Process races when component loads
  const processedRaces = useMemo(() => processScheduleData(schedule), [schedule]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">F1 Race Schedule</h1>

        {processedRaces.length === 0 ? (
          <div className="alert alert-warning">
            No schedule data available
          </div>
        ) : (
          <div className="space-y-4">
            {processedRaces.map((race, index) => (
              <div key={index} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion" /> 
                <div className="collapse-title text-xl font-medium flex justify-between">
                  <span>{race.gPrx}</span>
                  <span className="text-sm text-gray-600">{race.startDate}</span>
                </div>
                <div className="collapse-content"> 
                  <p><strong>Circuit:</strong> {race.crct}</p>
                  <p><strong>Winner:</strong> {race.winner}</p>
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
  const currentYear = new Date().getFullYear();
  
  try {
    const scheduleResponse = await fetch(`http://localhost:8080/get-f1-schedule/${currentYear}`);
    
    if (!scheduleResponse.ok) {
      throw new Error('Failed to fetch schedule');
    }
    
    const scheduleData = await scheduleResponse.json();
    
    return {
      props: {
        schedule: scheduleData
      }
    };
  } catch (error) {
    console.error('Error fetching schedule:', error);
    
    return {
      props: {
        schedule: {} // Return an empty object if fetch fails
      }
    };
  }
}