import React, { useEffect, useState } from 'react';
import VideoGrid from '../components/VideoGrid';
import { fetchVideos, searchVideos } from '../services/api';
import { Video } from '../types';

interface HomePageProps {
  searchQuery: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        let results: Video[];
        
        if (searchQuery) {
          results = await searchVideos(searchQuery);
          setHasMore(false); // Sem paginação para buscas
        } else {
          results = await fetchVideos(page);
          setHasMore(results.length === 20); // Considerando 20 vídeos por página
        }
        
        if (page === 1) {
          setVideos(results);
        } else {
          setVideos(prev => [...prev, ...results]);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [searchQuery, page]);

  // Reseta para a página 1 quando a busca mudar
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {searchQuery ? `Search Results: ${searchQuery}` : 'Hot Videos'}
      </h1>
      
      <VideoGrid videos={videos} loading={loading && page === 1} />
      
      {page > 1 && loading && (
        <div className="flex justify-center mt-8">
          <div className="loader">Loading...</div>
        </div>
      )}
      
      {hasMore && !loading && !searchQuery && (
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

export default HomePage;
