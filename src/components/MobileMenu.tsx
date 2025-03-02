import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '../types';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  categories: Category[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="fixed bottom-4 right-4 z-50 bg-red-800 text-white p-3 rounded-full shadow-lg"
        aria-label="Toggle categories menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
          <div 
            className="absolute bottom-16 right-4 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
            <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
              <li>
                <Link
                  to="/"
                  className={`block px-4 py-2 rounded-md ${
                    location.pathname === '/'
                      ? 'bg-red-800 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={toggleMenu}
                >
                  All Videos
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className={`block px-4 py-2 rounded-md ${
                      location.pathname === `/category/${category.id}`
                        ? 'bg-red-800 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;