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
        scrolled ? "bg-blue-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
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
          <Link to="/shop" className="hover:text-yellow-400 transition">Shop</Link>
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
        <div className="md:hidden bg-black/95 backdrop-blur-md text-white flex flex-col items-center gap-4 py-6 font-medium">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/matches" onClick={() => setIsOpen(false)}>Matches</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link
            to="/join"
            className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Join Fan Club
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
