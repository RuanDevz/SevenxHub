import React from 'react';
import { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading }) => {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {videos.map(video => (
        <div
          key={video.file_code}
          className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
        >
          <iframe
            src={`https://dood.wf/e/${video.file_code}`}
            title={video.title}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
