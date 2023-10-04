"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataRenderer = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [organicResults, setOrganicResults] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);

  useEffect(() => {
    // Fetch data from the specified endpoint
    axios
      .get('http://35.200.178.102:8080/ipfs/Qmbspr5KdwTjxiD4jQKp3Uv3wNhERjxoao2barxEyGxkGp')
      .then((response) => {
        // Extract inline_images, inline_videos, and organic_results from the response
        console.log(response.data)
        const inlineImages = response.data.inline_images.slice(0, 6); // Display only the first 6 images
        const inlineVideos = response.data.inline_videos;
        const organicResultsData = response.data.organic_results;
        const relatedQuestionsData = response.data.related_questions;
        setRelatedQuestions(relatedQuestionsData);
        setImages(inlineImages);
        setVideos(inlineVideos);
        setOrganicResults(organicResultsData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold m-4 ml-8 mt-8">Image Gallery</h1>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="w-1/8 p-4">
            <div className="border rounded-lg overflow-hidden" style={{ width: '200px', height: '200px' }}>
              <img src={image.thumbnail} alt={`Image ${index}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-8 m-4 ml-8">Videos</h1>
      <div className="flex flex-wrap">
        {videos.map((video, index) => (
          <div key={index} className="w-1/4 p-4">
            <div className="border rounded-lg overflow-hidden" style={{ minWidth: '200px', minHeight: '150px', padding: '16px' }}>
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                <img src={video.thumbnail} alt={`Video ${index}`} className="w-full h-32 object-cover" />
                <p className="mt-2 font-bold">{video.title}</p>
              </a>
            </div>
          </div>
        ))}
      </div>

      
      <h1 className="text-2xl font-bold mt-8 m-4 ml-8">Results</h1>
      <ul>
        {organicResults.map((result, index) => (
          <li key={index} className='ml-8 mb-3 max-w-6xl'>
            <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              <h3 className="text-xl font-semibold">{result.title}</h3>
              <p className="text-gray-600">{result.displayed_link}</p>
              </a>
              <p className="text-gray-800">{result.snippet}</p>
          
          </li>
        ))}
      </ul>

      <h1 className="text-2xl font-bold mt-12 mb-4 ml-8">Related Questions</h1>
      <ul className='ml-8 mb-4'>
        {relatedQuestions.map((question, index) => (
          <li key={index} className="mb-4 max-w-6xl">
            <a href={question.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              <h3 className="text-xl font-semibold">{question.question}</h3>
              <p className="text-gray-800">{question.snippet}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataRenderer;
