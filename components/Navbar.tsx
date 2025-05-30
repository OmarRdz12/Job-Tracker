
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SITE_TITLE } from '../constants';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const linkClass = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = "bg-primary text-white";
  const inactiveLinkClass = "text-gray-700 hover:bg-base-300 hover:text-gray-900";
  const siteTitle = SITE_TITLE;

  return (
    <div className="fixed top-0 left-0 w-full bg-base-100 shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <NavLink to="/" className="text-2xl font-bold text-primary">
          {siteTitle}
        </NavLink>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
         <div className="hidden md:flex space-x-4">
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
      </nav>
      {open && (
        <div className="w-full bg-base-100 shadow-md p-4 flex flex-col space-y-2 md:hidden">
          <NavLink 
            to="/companies" 
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
            onClick={() => setOpen(false)}
          >
            Companies
          </NavLink>
          <NavLink 
            to="/applications" 
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
            onClick={() => setOpen(false)}
          >
            Applications
          </NavLink>
          <NavLink 
            to="/references" 
            className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
            onClick={() => setOpen(false)}
          >
            References
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
