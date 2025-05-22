
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SITE_TITLE } from '../constants';

const Navbar: React.FC = () => {
  const linkClass = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = "bg-primary text-white";
  const inactiveLinkClass = "text-gray-700 hover:bg-base-300 hover:text-gray-900";
  const siteTitle = SITE_TITLE;
  return (
    <nav className="bg-base-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-primary">
          {siteTitle}
        </NavLink>
        <div className="flex space-x-4">
          <NavLink 
            to="/companies" 
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            Companies
          </NavLink>
          <NavLink 
            to="/applications" 
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            Applications
          </NavLink>
          <NavLink 
            to="/references" 
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            References
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
