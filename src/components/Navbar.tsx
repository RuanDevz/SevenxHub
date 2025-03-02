import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Film className="h-8 w-8 text-red-800 dark:text-red-600" />
              <span className="ml-2 text-xl font-bold text-red-800 dark:text-red-600">SevenHub</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800 dark:focus:ring-red-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-gray-500 dark:text-gray-400 hover:text-red-800 dark:hover:text-red-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none mr-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-800 dark:focus:ring-red-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-gray-500 dark:text-gray-400 hover:text-red-800 dark:hover:text-red-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;