import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md animate-pulse">
            <div className="h-40 bg-gray-300 dark:bg-gray-600"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No videos found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.file_code} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;