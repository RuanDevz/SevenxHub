import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  const location = useLocation();
  
  return (
    <aside className="w-56 hidden md:block bg-white dark:bg-gray-900 shadow-md h-screen sticky top-16">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`block px-4 py-2 rounded-md ${
                location.pathname === '/'
                  ? 'bg-red-800 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
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
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;