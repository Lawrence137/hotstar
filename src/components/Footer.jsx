import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/Logo.jpg" 
                alt="Hotstar FC Logo" 
                className="h-12 w-12 rounded-full border-2 border-yellow-500"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Hotstar FC
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
              Experience the passion, power, and glory of football. Join the most electrifying fan community in the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-110">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-yellow-500">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/matches" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Matches
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-yellow-500">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group text-sm sm:text-base">
                  <ArrowRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-yellow-500">Contact Info</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm sm:text-base">123 Football Street</p>
                  <p className="text-gray-400 text-sm sm:text-base">Sports City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                <p className="text-gray-400 text-sm sm:text-base">+254 718 266 432
                  +254 724 013 599
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                <p className="text-gray-400 text-sm sm:text-base break-all">info@hotstarfc.com</p>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400 text-sm sm:text-base"
                />
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 text-sm sm:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Hotstar FC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;