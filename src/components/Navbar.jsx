// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // modern icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-gradient-to-r from-black via-red-900/90 to-black backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Hotstar FC" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-bold tracking-wide">Hotstar FC</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/matches" className="hover:text-yellow-400 transition">Matches</Link>
          <Link to="/gallery" className="hover:text-yellow-400 transition">Gallery</Link>
          <Link to="/marketplace" className="hover:text-yellow-400 transition">Marketplace</Link>
          <Link to="/blog" className="hover:text-yellow-400 transition">Blog</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            to="/join"
            className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            Join Fan Club
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-black via-red-900/95 to-black backdrop-blur-md shadow-2xl border-t border-red-500/30">
            <div className="px-6 py-8">
              {/* Mobile Menu Items */}
              <div className="flex flex-col space-y-4 mb-8">
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-red-900/30"
                >
                  <span className="text-lg font-medium">Home</span>
                  <div className="ml-auto w-0 group-hover:w-8 h-0.5 bg-yellow-400 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/matches" 
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-red-900/30"
                >
                  <span className="text-lg font-medium">Matches</span>
                  <div className="ml-auto w-0 group-hover:w-8 h-0.5 bg-yellow-400 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/gallery" 
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-red-900/30"
                >
                  <span className="text-lg font-medium">Gallery</span>
                  <div className="ml-auto w-0 group-hover:w-8 h-0.5 bg-yellow-400 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/marketplace" 
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-red-900/30"
                >
                  <span className="text-lg font-medium">Marketplace</span>
                  <div className="ml-auto w-0 group-hover:w-8 h-0.5 bg-yellow-400 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/blog" 
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-red-900/30"
                >
                  <span className="text-lg font-medium">Blog</span>
                  <div className="ml-auto w-0 group-hover:w-8 h-0.5 bg-yellow-400 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center text-white hover:text-yellow-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-red-900/30"
                >
                  <span className="text-lg font-medium">About</span>
                  <div className="ml-auto w-0 group-hover:w-8 h-0.5 bg-yellow-400 transition-all duration-300"></div>
                </Link>
              </div>
              
              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-red-500/30">
                <Link
                  to="/join"
                  className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-4 rounded-xl font-bold text-lg text-center hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Join Fan Club
                </Link>
              </div>
            </div>
          </div>
        )}
    </header>
  );
};

export default Navbar;
