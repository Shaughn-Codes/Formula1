'use client'; // Indicates this is a Next.js client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

/**
 * F1NewsCarousel Component
 * 
 * A responsive carousel component that displays Formula 1 news articles fetched from an API.
 * Each article includes a headline, description, image (if available), and a link to the full article.
 * The carousel supports navigation between articles using arrow buttons.
 * 
 * Features:
 * - Responsive layout that adapts to different screen sizes
 * - Loading and error states
 * - Image fallback handling
 * - Circular navigation through articles
 */
const F1NewsCarousel = () => {
  // State management for news articles, loading status, and error handling
  const [news, setNews] = useState([]); // Stores the array of news articles
  const [loading, setLoading] = useState(true); // Controls loading indicator
  const [error, setError] = useState(null); // Stores any error messages

  // Effect hook to fetch news data when component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Attempt to fetch 5 news articles from the local API endpoint
        const response = await fetch('http://localhost:8080/get-f1-news/5');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data); // Update news state with fetched articles
        setLoading(false); // Hide loading indicator
      } catch (err) {
        setError(err.message); // Store error message if fetch fails
        setLoading(false); // Hide loading indicator
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this effect runs once on mount

  // Show loading indicator while fetching data
  if (loading) return <div className="text-center">Loading...</div>;
  
  // Show error message if fetch failed
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="w-auto">
        {/* Carousel container */}
        <div className="carousel w-full">
          {/* Map through news articles to create carousel slides */}
          {news.map((article, index) => (
            <div 
              key={article.dataSourceIdentifier} 
              id={`slide${index}`} 
              className="carousel-item relative w-full"
            >
              {/* Article content container with responsive layout */}
              <div className="flex flex-col md:flex-row items-center justify-center w-full p-4 bg-base-200">
                {/* Text content section */}
                <div className="md:w-1/2 p-4">
                  <h2 className="text-2xl font-bold mb-2">{article.headline}</h2>
                  <p className="mb-4">{article.description}</p>
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-center w-full space-x-4">
                    {/* Previous slide button with circular navigation */}
                    <a 
                      href={`#slide${index === 0 ? news.length - 1 : index - 1}`} 
                      className="btn btn-circle"
                    >
                      ❮
                    </a>
                    {/* Next slide button with circular navigation */}
                    <a 
                      href={`#slide${index === news.length - 1 ? 0 : index + 1}`} 
                      className="btn btn-circle"
                    >
                      ❯
                    </a>
                  </div>
                </div>

                {/* Image section */}
                <div className="md:w-1/2 p-4">
                  {/* Conditional rendering based on image availability */}
                  {article.images && article.images.length > 0 ? (
                    <Image
                      src={article.images[0].url}
                      alt={article.images[0].name}
                      width={500}
                      height={300}
                      objectFit="cover"
                      className="rounded-lg"
                      onError={(e) => {
                        // Handle image loading errors by showing a placeholder
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  ) : (
                    // Fallback display when no image is available
                    <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center rounded-lg">
                      <span>No image available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default F1NewsCarousel;