export interface Video {
  title: string;
  file_code: string;
  length: string;
  splash_img: string;
  created: string;
  size: string;
  views: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface ApiResponse {
  status: number;
  msg: string;
  result: Video[];
}

export interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}