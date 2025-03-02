import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const VideoPage: React.FC = () => {
  const { fileCode } = useParams<{ fileCode: string }>();

  if (!fileCode) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-800 dark:text-red-600 mb-4">Video Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300">The requested video could not be found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <VideoPlayer fileCode={fileCode} />
    </div>
  );
};

export default VideoPage;