import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format the duration
  const formatDuration = (seconds: string) => {
    const totalSeconds = parseInt(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Link to={`/video/${video.file_code}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={video.splash_img} 
            alt={video.title} 
            className="w-full h-40 object-cover"
            onError={(e) => {
              // Fallback image if the splash image fails to load
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
            <div className="bg-red-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.length)}
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-gray-900 dark:text-white font-semibold text-sm truncate">{video.title}</h3>
          <div className="flex justify-between items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
            <span>{formatDate(video.created)}</span>
            <span>{video.views} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;