import { useRouter } from "next/router";
import "/src/app/globals.css";
import Navbar from '/components/Navbar.js';
import { useState } from "react";

/**
 * F1 Driver Details Component
 * 
 * Displays detailed information about a specific F1 driver including:
 * - Personal information (name, nationality)
 * - Current team details (team name, car specifications)
 * - Year-by-year statistics
 * - Driver headshot and nationality flag
 * 
 * @param {Object} driverInfo - Driver's personal and team information
 * @param {Array} driverStats - Array of driver's statistics by year
 */
export default function Driver({driverInfo, driverStats}) {
    const router = useRouter();
    const {id} = router.query;

    // Extract driver's personal information and team details
    // Using optional chaining to safely access nested properties
    const driverName = driverInfo.displayName;
    const teamName = driverInfo.vehicles?.[0]?.team ?? 'Unknown';
    const uniformNumber = driverInfo.vehicles?.[0]?.number ?? 'Unknown';
    const teamManufacturer = driverInfo.vehicles?.[0]?.manufacturer ?? 'Unknown';
    const teamEngine = driverInfo.vehicles?.[0]?.engine ?? 'Unknown';
    const teamTire = driverInfo.vehicles?.[0]?.tire ?? 'Unknown';
    const teamChassis = driverInfo.vehicles?.[0]?.chassis ?? 'Unknown';
    const flag = driverInfo.flag.href;

    // State management for year selection
    // Setting the year manually because the 2025 seaons has not started yet and there is nothing to fetch from the api
    
    // const currentYear = new Date().getFullYear();
    const currentYear = 2024;
    const [selectedYear, setSelectedYear] = useState(currentYear);

    // Find statistics for the currently selected year
    const currentStats = driverStats.find(stat => stat.year === selectedYear);

    /**
     * Handler for year selection change
     * Updates the selectedYear state when user selects a different year
     * 
     * @param {Event} event - Change event from the select element
     */
    const handleYearChange = (event) => {
        setSelectedYear(Number(event.target.value));
    };

    return (
        <>
            <Navbar />
            {/* Main hero section with driver information */}
            <div className="hero bg-hero bg-no-repeat bg-center bg-contain h-screen bg-custom min-h-screen font-racing">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {/* Driver headshot */}
                    <img 
                        src={driverInfo.headshot} 
                        className="max-w-sm rounded-lg shadow-2xl" 
                        alt={`${driverName} headshot`}
                    />

                    <div>
                        {/* Driver name and nationality flag */}
                        <h1 className="text-2xl">
                            {driverName} for {teamName}
                            <span className="inline-flex items-start">
                                <img 
                                    src={flag} 
                                    className="self-center w-6 h-6 rounded-full mx-2"
                                    alt={`${driverName}'s nationality flag`}
                                />
                            </span>
                        </h1>

                        {/* Driver and team details */}
                        <p>
                            Driver {driverName} drives for {teamName} driving in a {teamChassis} chassis 
                            with a {teamEngine} engine inside that's manufacturerd by {teamManufacturer} 
                            running on {teamTire} tires.
                        </p>

                        {/* Year selection dropdown */}
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium">Select Year:</label>
                            <select 
                                className="select select-primary w-full max-w-xs" 
                                value={selectedYear} 
                                onChange={handleYearChange}
                            >
                                {driverStats.map(stat => (
                                    <option key={stat.year} value={stat.year}>
                                        {stat.year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Statistics display for selected year */}
                        {currentStats && (
                            <div className="mt-4">
                                <h2 className="text-lg">
                                    Stats for {selectedYear} Season
                                </h2>
                                {/* Stats grid displaying various performance metrics */}
                                <div className="stats shadow">
                                    {/* Championship rank */}
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Rank</div>
                                        <div className="stat-value">{currentStats.rank}</div>
                                    </div>
                                    {/* Race starts */}
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Starts</div>
                                        <div className="stat-value text-primary">{currentStats.starts}</div>
                                    </div>
                                    {/* Race wins */}
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Wins</div>
                                        <div className="stat-value">{currentStats.wins}</div>
                                    </div>
                                    {/* Pole positions */}
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Poles</div>
                                        <div className="stat-value text-primary">{currentStats.poles}</div>
                                    </div>
                                    {/* Top 5 finishes */}
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Top 5</div>
                                        <div className="stat-value">{currentStats.top5}</div>
                                    </div>
                                    {/* Top 10 finishes */}
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Top 10</div>
                                        <div className="stat-value text-primary">{currentStats.top10}</div>
                                    </div>
                                    {/* Championship points */}
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Points</div>
                                        <div className="stat-value">{currentStats.points}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

/**
 * Server-side props function to fetch driver information and statistics
 * 
 * @param {Object} context - Next.js context object containing route parameters
 * @returns {Object} Props object containing driver info and stats
 */
export async function getServerSideProps(context) {
    const {id} = context.params;

    // Fetch driver's personal information
    const driverInfoResponse = await fetch(`http://localhost:8080/get-driver-info/${id}`);
    const driverInfo = await driverInfoResponse.json();

    // Fetch driver's statistics
    const driverStatsResponse = await fetch(`http://localhost:8080/get-driver-stats/${id}`);
    const driverStats = await driverStatsResponse.json();

    return {
        props: {
            driverInfo,
            driverStats
        }
    };
}