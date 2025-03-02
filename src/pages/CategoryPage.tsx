import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import { getVideosByCategory } from '../services/api';
import { Video } from '../types';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!categoryId) return;

    const loadCategoryVideos = async () => {
      setLoading(true);
      try {
        const results = await getVideosByCategory(categoryId, page);
        
        // Get category name from the first word of the category ID
        setCategoryName(categoryId.charAt(0).toUpperCase() + categoryId.slice(1));
        
        if (page === 1) {
          setVideos(results);
        } else {
          setVideos(prev => [...prev, ...results]);
        }
        
        setHasMore(results.length === 20); // Assuming 20 is the per_page value
      } catch (error) {
        console.error('Error loading category videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryVideos();
  }, [categoryId, page]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {categoryName} Videos
      </h1>
      
      <VideoGrid videos={videos} loading={loading && page === 1} />
      
      {page > 1 && loading && (
        <div className="flex justify-center mt-8">
          <div className="loader">Loading...</div>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;