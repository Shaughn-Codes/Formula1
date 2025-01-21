import { useRouter } from "next/router";
import "/src/app/globals.css";
import Navbar from '/components/Navbar.js';
import { useState } from "react";
import Image from 'next/image';
import config from '../../config';

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
            <div className="hero bg-hero bg-no-repeat bg-center bg-[length:25%] min-h-screen font-racing">
                <div className="hero-content flex-col lg:flex-row-reverse p-4 lg:p-8">
                    {/* Driver headshot - responsive on mobile */}
                    <div className="w-full lg:w-auto">
                        <Image 
                            src={driverInfo.headshot} 
                            alt={`${driverName} headshot`}
                            width={650}
                            height={650}
                            className="rounded-lg shadow-lg max-w-[300px] md:max-w-[400px] lg:max-w-[650px] mx-auto lg:mx-0 w-full h-auto"
                            priority
                        />
                    </div>

                    <div className="w-full lg:w-1/2 space-y-6 lg:space-y-4">
                        {/* Driver name and nationality flag */}
                        <h1 className="text-xl md:text-2xl flex flex-wrap items-center gap-2 lg:gap-0">
                            <span>{driverName} for {teamName}</span>
                            <span className="inline-flex items-center lg:ml-2">
                                <Image 
                                    src={flag} 
                                    alt={`${driverName}'s nationality flag`}
                                    width={25}
                                    height={5}
                                    className="inline-block"
                                />
                            </span>
                        </h1>

                        {/* Driver and team details */}
                        <p className="text-sm md:text-base lg:text-lg">
                            Driver {driverName} drives for {teamName} driving in a {teamChassis} chassis 
                            with a {teamEngine} engine inside that&apos;s manufactured by {teamManufacturer}, 
                            and running on {teamTire} tires.
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
                                <h2 className="text-lg mb-4">
                                    Stats for {selectedYear} Season
                                </h2>
                                {/* Stats grid - responsive on mobile */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-4 mb-4">
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Rank</div>
                                        <div className="stat-value text-2xl">{currentStats.rank}</div>
                                    </div>
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Starts</div>
                                        <div className="stat-value text-2xl text-primary">{currentStats.starts}</div>
                                    </div>
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Wins</div>
                                        <div className="stat-value text-2xl">{currentStats.wins}</div>
                                    </div>
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Poles</div>
                                        <div className="stat-value text-2xl text-primary">{currentStats.poles}</div>
                                    </div>
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Top 5</div>
                                        <div className="stat-value text-2xl">{currentStats.top5}</div>
                                    </div>
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Top 10</div>
                                        <div className="stat-value text-2xl text-primary">{currentStats.top10}</div>
                                    </div>
                                </div>

                                {/* Original stats display for desktop */}
                                <div className="hidden lg:flex stats shadow">
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
    const { id } = context.params;
    
    try {
        const [infoRes, statsRes] = await Promise.all([
            fetch(`${config.apiUrl}/get-driver-info/${id}`),
            fetch(`${config.apiUrl}/get-driver-stats/${id}`)
        ]);

        const driverInfo = await infoRes.json();
        const driverStats = await statsRes.json();

        return {
            props: {
                driverInfo,
                driverStats,
            },
        };
    } catch (error) {
        console.error('Error fetching driver data:', error);
        return {
            notFound: true,
        };
    }
}