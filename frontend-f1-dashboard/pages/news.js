import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '/components/Navbar.js';


const F1NewsCarousel = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8080/get-f1-news/5');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <><Navbar />
    <div className="w-auto">
          <div className="carousel w-full">
              {news.map((article, index) => (
                  <div key={article.dataSourceIdentifier} id={`slide${index}`} className="carousel-item relative w-full">
                      <div className="flex flex-col md:flex-row items-center justify-center w-full p-4 bg-base-200">
                          <div className="md:w-1/2 p-4">
                              <h2 className="text-2xl font-bold mb-2">{article.headline}</h2>
                              <p className="mb-4">{article.description}</p>
                              <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
                              <div className="flex justify-center w-full space-x-4">
                      <a href={`#slide${index === 0 ? news.length - 1 : index - 1}`} className="btn btn-circle">❮</a>
                      <a href={`#slide${index === news.length - 1 ? 0 : index + 1}`} className="btn btn-circle">❯</a>
                    </div>
                          </div>
                          <div className="md:w-1/2 p-4">
                              {article.images && article.images.length > 0 ? (
                                  <Image
                                      src={article.images[0].url}
                                      alt={article.images[0].name}
                                      width={500}
                                      height={300}
                                      objectFit="cover"
                                      className="rounded-lg"
                                      onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = "/placeholder-image.jpg"; // Make sure to add a placeholder image in your public folder
                                      } } />
                              ) : (
                                  <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center rounded-lg">
                                      <span>No image available</span>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div></>
  );
};

export default F1NewsCarousel;