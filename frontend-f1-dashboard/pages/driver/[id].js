import { useRouter } from "next/router";
import "/src/app/globals.css";
import { useState } from "react";
import {Navbar} from "/components/Navbar.js";



export default function Driver({driverInfo,driverStats}){
    const router = useRouter();
    const {id} = router.query;
    const driverName = driverInfo.displayName;
    const teamName = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].team : 'Unknown';
    const uniformNumber = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].number : 'Unknown';
    const teamManufacturer = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].manufacturer : 'Unknown';
    const teamEngine = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].engine : 'Unknown';
    const teamTire = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].tire : 'Unknown';
    const teamChassis = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].chassis : 'Unknown';


    const [selectedYear, setSelectedYear] = useState(2024);

    // Filtering stats for the selected year
    const currentStats = driverStats.find(stat => stat.year === selectedYear);

    // Handling the change of the year selection
    const handleYearChange = (event) =>{
        setSelectedYear(Number(event.target.value));
    };

    return (
     
        <><div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a>Driver</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Quali</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Drivers</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
        </div><div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={driverInfo.headshot} className="max-w-sm rounded-lg shadow-2xl"></img>
                    <div>
                        <h1 className="text-2xl">{driverName} for {teamName}
                            <span className="inline-flex items-start">
                                <img src={driverInfo.flag.href} className="self-center w-6 h-6 rounded-full mx-2"></img>
                            </span>
                        </h1>
                        <p>
                            Driver {driverName} drives for {teamName} driving in a {teamChassis} chassis with a {teamEngine} engine inside that's manufacturerd by {teamManufacturer} running on {teamTire} tires.
                        </p>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium">Select Year:</label>
                            <select className="select select-primary w-full max-w-xs" value={selectedYear} onChange={handleYearChange}>
                                {driverStats.map(stat => (
                                    <option key={stat.year} value={stat.year}>
                                        {stat.year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Display driver stat for the selected year */}
                        {currentStats && (
                            <div className="mt-4">
                                <h2 className="text-lg">
                                    Stats for {selectedYear} Season
                                </h2>
                                <div className="stats shadow">
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Rank</div>
                                        <div className="stat-value">{currentStats.rank}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Starts</div>
                                        <div className="stat-value text-primary">{currentStats.starts}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Wins</div>
                                        <div className="stat-value">{currentStats.wins}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Poles</div>
                                        <div className="stat-value text-primary">{currentStats.poles}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Top 5</div>
                                        <div className="stat-value">{currentStats.top5}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Top 10</div>
                                        <div className="stat-value text-primary">{currentStats.top10}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Points</div>
                                        <div className="stat-value">{currentStats.points}</div>
                                    </div>

                                    

                                </div>

                            </div>
                        )}
                    </div>
                    {/* <img class='size-min' src={driverInfo.flag.href}></img> */}
                </div>
            </div></>
        
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    const driverInfoResponse = await fetch(`http://localhost:8080/get-driver-info/${id}`)
    const driverInfo = await driverInfoResponse.json();
    const driverStatsResponse = await fetch(`http://localhost:8080/get-driver-stats/${id}`)
    const driverStats = await driverStatsResponse.json();

    return{
        props: {
            driverInfo,
            driverStats
        }
    };
    
}