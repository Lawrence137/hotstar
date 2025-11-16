import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { LayoutDashboard, Trophy, Store, Image, FileText, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-red-900/50 hover:text-white transition-colors duration-200 rounded-lg";
  const activeLinkClasses = "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold shadow-lg";

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <img src="/Logo.jpg" alt="Hotstar FC" className="h-10 w-10 rounded-full border-2 border-yellow-500" />
          <span className="text-xl font-bold tracking-wide text-white">Hotstar FC</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <LayoutDashboard className="mr-3" size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/matches" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <Trophy className="mr-3" size={20} />
          <span>Matches</span>
        </NavLink>
        <NavLink to="/admin/marketplace" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <Store className="mr-3" size={20} />
          <span>Marketplace</span>
        </NavLink>
        <NavLink to="/admin/gallery" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <Image className="mr-3" size={20} />
          <span>Gallery</span>
        </NavLink>
        <NavLink to="/admin/blog" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FileText className="mr-3" size={20} />
          <span>Blog</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-red-600/80 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          <LogOut className="mr-2" size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
