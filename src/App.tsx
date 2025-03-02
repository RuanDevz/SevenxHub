import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import VideoPage from './pages/VideoPage';
import { getCategories } from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getCategories();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navbar onSearch={handleSearch} />
          <div className="flex">
            <Sidebar categories={categories} />
            <main className="flex-1 md:ml-56">
              <Routes>
                <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/video/:fileCode" element={<VideoPage />} />
              </Routes>
            </main>
          </div>
          <MobileMenu categories={categories} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;