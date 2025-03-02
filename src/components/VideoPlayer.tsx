import React, { useEffect, useState } from 'react';
import { Video } from '../types';
import { getVideoInfo } from '../services/api';
import { ArrowLeft, Share2, ThumbsUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface VideoPlayerProps {
  fileCode: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ fileCode }) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoInfo = async () => {
      setLoading(true);
      try {
        const videoData = await getVideoInfo(fileCode);
        setVideo(videoData);
      } catch (err) {
        setError('Failed to load video information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [fileCode]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="w-full h-[70vh] bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-4">
          {error || 'Video not found'}
        </div>
        <Link to="/" className="text-red-800 dark:text-red-600 hover:underline">
          Return to home page
        </Link>
      </div>
    );
  }

  // Define a URL de embed: se for um vídeo de mock (começa com 'sample') usa um fallback; caso contrário, usa o embed da Doodstream.
  const embedUrl = video.file_code.startsWith('sample')
    ? `https://www.youtube.com/embed/dQw4w9WgXcQ`
    : `https://dood.wf/e/${fileCode}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={handleGoBack}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-800 dark:hover:text-red-600 mb-4"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back
      </button>
      
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-4">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          title={video.title}
        ></iframe>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{video.title}</h1>
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div>
            <span>{video.views} views</span>
            <span className="mx-2">•</span>
            <span>{formatDate(video.created)}</span>
          </div>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <button className="flex items-center hover:text-red-800 dark:hover:text-red-600">
              <ThumbsUp className="h-5 w-5 mr-1" />
              Like
            </button>
            <button className="flex items-center hover:text-red-800 dark:hover:text-red-600">
              <Share2 className="h-5 w-5 mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Video Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Uploaded:</span> {formatDate(video.created)}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">File Size:</span> {Math.round(parseInt(video.size) / 1024 / 1024)} MB
            </p>
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Views:</span> {video.views}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Duration:</span> {Math.floor(parseInt(video.length) / 60)}:{(parseInt(video.length) % 60).toString().padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
