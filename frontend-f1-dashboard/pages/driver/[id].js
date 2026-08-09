import { useRouter } from "next/router";
import "/src/app/globals.css";
import Navbar from '/components/Navbar.js';
import { useState } from "react";
import Image from 'next/image';
import config from '../../config';

export default function Driver({driverInfo, driverStats}) {
    const router = useRouter();
    const {id} = router.query;

    const driverName = driverInfo.displayName;
    const teamName = driverInfo.vehicles?.[0]?.team ?? 'Unknown';
    const uniformNumber = driverInfo.vehicles?.[0]?.number ?? 'Unknown';
    const teamManufacturer = driverInfo.vehicles?.[0]?.manufacturer ?? 'Unknown';
    const teamEngine = driverInfo.vehicles?.[0]?.engine ?? 'Unknown';
    const teamTire = driverInfo.vehicles?.[0]?.tire ?? 'Unknown';
    const teamChassis = driverInfo.vehicles?.[0]?.chassis ?? 'Unknown';
    const flag = driverInfo.flag.href;

    // Hardcoded to 2024 since 2025 season hasn't started yet
    const currentYear = 2024;
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const currentStats = driverStats.find(stat => stat.year === selectedYear);

    const handleYearChange = (event) => {
        setSelectedYear(Number(event.target.value));
    };

    return (
        <>
            <Navbar />
            <div className="hero bg-hero bg-no-repeat bg-center bg-[length:25%] min-h-screen font-racing">
                <div className="hero-content flex-col lg:flex-row-reverse p-4 lg:p-8">
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

                        <p className="text-sm md:text-base lg:text-lg">
                            Driver {driverName} drives for {teamName} driving in a {teamChassis} chassis 
                            with a {teamEngine} engine inside that&apos;s manufactured by {teamManufacturer}, 
                            and running on {teamTire} tires.
                        </p>

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

                        {currentStats && (
                            <div className="mt-4">
                                <h2 className="text-lg mb-4">
                                    Stats for {selectedYear} Season
                                </h2>
                                {/* Mobile grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-4 mb-4">
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Rank</div>
                                        <div className="stat-value text-2xl text-primary">{currentStats.rank}</div>
                                    </div>
                                    <div className="stat bg-base-200 rounded-lg p-4">
                                        <div className="stat-title">Points</div>
                                        <div className="stat-value text-2xl">{currentStats.points}</div>
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
                                        <div className="stat-title">Top 10</div>
                                        <div className="stat-value text-2xl">{currentStats.top10}</div>
                                    </div>
                                </div>

                                {/* Desktop stats */}
                                <div className="hidden lg:flex stats shadow">
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Rank</div>
                                        <div className="stat-value">{currentStats.rank}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Points</div>
                                        <div className="stat-value text-2xl text-primary">{currentStats.points}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Starts</div>
                                        <div className="stat-value ">{currentStats.starts}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Wins</div>
                                        <div className="stat-value text-primary">{currentStats.wins}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Poles</div>
                                        <div className="stat-value">{currentStats.poles}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Top 5</div>
                                        <div className="stat-value text-primary">{currentStats.top5}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Top 10</div>
                                        <div className="stat-value">{currentStats.top10}</div>
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

// Fetches driver info and stats from API
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