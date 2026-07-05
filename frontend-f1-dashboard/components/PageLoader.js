import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const PageLoader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="text-center">
        {/* F1 Racing Car Animation */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-2">
            {/* Racing car representation */}
            <div className="relative">
              <div className="w-24 h-12 bg-red-600 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-16 h-6 bg-white rounded animate-ping"></div>
              </div>
              {/* Wheels */}
              <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-800 rounded-full"></div>
              <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          
          {/* Racing track line */}
          <div className="w-full h-1 bg-white mt-4 rounded animate-pulse"></div>
        </div>

        {/* DaisyUI Spinner */}
        <div className="flex items-center justify-center mb-4">
          <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>

        {/* F1-style loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-wider">LOADING</h2>
          <p className="text-red-500 font-mono text-sm">
            <span className="inline-block animate-pulse">●</span> PIT STOP IN PROGRESS
          </p>
        </div>

        {/* Progress bar with F1 colors */}
        <div className="w-64 h-2 bg-gray-800 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '70%' }}></div>
        </div>

        {/* RPM Gauge-style indicator */}
        <div className="mt-4 flex justify-center space-x-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-4 rounded ${
                i < 5 ? 'bg-red-600 animate-pulse' : 'bg-gray-700'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;