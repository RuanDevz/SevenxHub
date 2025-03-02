import { ApiResponse, Video, Category } from '../types';

const API_KEY = '477553z35zfy36nz8hossi';
const BASE_URL = 'https://doodapi.com/api';

// Mock data to use when API fails
const MOCK_VIDEOS: Video[] = [
  {
    title: "Hot Amateur Video",
    file_code: "sample1",
    length: "1200",
    splash_img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-05-15",
    size: "1048576000",
    views: 12500
  },
  {
    title: "Blonde Beauty Solo",
    file_code: "sample2",
    length: "900",
    splash_img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-06-20",
    size: "786432000",
    views: 9800
  },
  {
    title: "Brunette Threesome Action",
    file_code: "sample3",
    length: "1800",
    splash_img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-07-10",
    size: "1572864000",
    views: 7500
  },
  {
    title: "Asian Massage Special",
    file_code: "sample4",
    length: "2400",
    splash_img: "https://images.unsplash.com/photo-1518022525094-218670c9b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-08-05",
    size: "524288000",
    views: 21000
  },
  {
    title: "Redhead Passionate Scene",
    file_code: "sample5",
    length: "1500",
    splash_img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-09-15",
    size: "2097152000",
    views: 35000
  },
  {
    title: "Ebony Beauty Compilation",
    file_code: "sample6",
    length: "3600",
    splash_img: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-10-20",
    size: "629145600",
    views: 42000
  },
  {
    title: "Latina Steamy Encounter",
    file_code: "sample7",
    length: "1800",
    splash_img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-11-10",
    size: "1835008000",
    views: 18000
  },
  {
    title: "MILF Next Door",
    file_code: "sample8",
    length: "2100",
    splash_img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    created: "2023-12-25",
    size: "943718400",
    views: 56000
  }
];

export const fetchVideos = async (page = 1, perPage = 20): Promise<Video[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/file/list?key=${API_KEY}&page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    if (data.status !== 200) {
      throw new Error(data.msg || 'API returned an error');
    }
    
    return data.result || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    // Return mock data when API fails
    return MOCK_VIDEOS.slice(0, perPage);
  }
};

export const searchVideos = async (query: string): Promise<Video[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/videos?key=${API_KEY}&search_term=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    if (data.status !== 200) {
      throw new Error(data.msg || 'API returned an error');
    }
    
    return data.result || [];
  } catch (error) {
    console.error('Error searching videos:', error);
    // Filter mock data based on search query
    return MOCK_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const getVideoInfo = async (fileCode: string): Promise<Video | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/file/info?key=${API_KEY}&file_code=${fileCode}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 200) {
      throw new Error(data.msg || 'API returned an error');
    }
    
    return data.result[0] || null;
  } catch (error) {
    console.error('Error fetching video info:', error);
    // Return a mock video if the requested file_code matches one of our mock videos
    const mockVideo = MOCK_VIDEOS.find(v => v.file_code === fileCode);
    return mockVideo || MOCK_VIDEOS[0]; // Fallback to first mock video if not found
  }
};

// Adult content categories
export const getCategories = (): Category[] => {
  return [
    { id: 'amateur', name: 'Amateur' },
    { id: 'anal', name: 'Anal' },
    { id: 'asian', name: 'Asian' },
    { id: 'blonde', name: 'Blonde' },
    { id: 'brunette', name: 'Brunette' },
    { id: 'ebony', name: 'Ebony' },
    { id: 'latina', name: 'Latina' },
    { id: 'lesbian', name: 'Lesbian' },
    { id: 'milf', name: 'MILF' },
    { id: 'pov', name: 'POV' },
    { id: 'threesome', name: 'Threesome' }
  ];
};

export const getVideosByCategory = async (categoryId: string, page = 1): Promise<Video[]> => {
  try {
    // First try to get real videos from the API
    const allVideos = await fetchVideos(page, 50);
    
    const keywordMap: Record<string, string[]> = {
      amateur: ['amateur', 'homemade', 'hot amateur'],
      anal: ['anal', 'backdoor', 'ass'],
      asian: ['asian', 'japanese', 'korean', 'chinese', 'thai', 'massage'],
      blonde: ['blonde', 'fair', 'light hair'],
      brunette: ['brunette', 'dark hair', 'brown hair'],
      ebony: ['ebony', 'black', 'african'],
      latina: ['latina', 'hispanic', 'spanish'],
      lesbian: ['lesbian', 'girl on girl', 'women'],
      milf: ['milf', 'mature', 'mom', 'cougar'],
      pov: ['pov', 'point of view', 'first person'],
      threesome: ['threesome', 'trio', '3some']
    };
    
    const keywords = keywordMap[categoryId] || [];
    
    if (keywords.length === 0) {
      return allVideos;
    }
    
    const filteredVideos = allVideos.filter(video => 
      keywords.some(keyword => 
        video.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    // If we have results, return them
    if (filteredVideos.length > 0) {
      return filteredVideos;
    }
    
    // If no results from real API, use mock data
    return MOCK_VIDEOS.filter(video => 
      keywords.some(keyword => 
        video.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } catch (error) {
    console.error('Error loading category videos:', error);
    
    // Filter mock videos based on category
    const keywordMap: Record<string, string[]> = {
      amateur: ['amateur', 'hot amateur'],
      anal: ['anal'],
      asian: ['asian', 'massage'],
      blonde: ['blonde', 'beauty'],
      brunette: ['brunette', 'threesome'],
      ebony: ['ebony', 'beauty'],
      latina: ['latina', 'steamy'],
      lesbian: ['lesbian'],
      milf: ['milf', 'next door'],
      pov: ['pov'],
      threesome: ['threesome', 'action']
    };
    
    const keywords = keywordMap[categoryId] || [];
    
    return MOCK_VIDEOS.filter(video => 
      keywords.some(keyword => 
        video.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }
};