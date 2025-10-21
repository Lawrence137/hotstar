import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, Calendar, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,0,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              HOTSTAR FC
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the passion, power, and glory of football. Join the most electrifying fan community in the world.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/matches"
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
            >
              View Matches
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/join"
              className="group border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Join Fan Club
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">50+</div>
              <div className="text-gray-300">Trophies Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">100K+</div>
              <div className="text-gray-300">Active Fans</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">25+</div>
              <div className="text-gray-300">Years History</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">500+</div>
              <div className="text-gray-300">Matches Played</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-yellow-500">Hotstar FC</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience football like never before with our exclusive features and community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Championship Legacy</h3>
              <p className="text-gray-400 mb-6">
                Join a club with a rich history of victories and championship titles that define excellence.
              </p>
              <Link to="/about" className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors">
                Learn More →
              </Link>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                <Users className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Global Community</h3>
              <p className="text-gray-400 mb-6">
                Connect with passionate fans worldwide and be part of the most vibrant football community.
              </p>
              <Link to="/contact" className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors">
                Join Now →
              </Link>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                <Calendar className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Live Matches</h3>
              <p className="text-gray-400 mb-6">
                Never miss a moment with live match updates, exclusive content, and real-time statistics.
              </p>
              <Link to="/matches" className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors">
                View Schedule →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Join the <span className="text-white">Legacy</span>?
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Become part of the Hotstar FC family today and experience football at its finest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="bg-black text-yellow-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Join Fan Club
            </Link>
            <Link
              to="/marketplace"
              className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-black hover:text-yellow-500 transition-all duration-300"
            >
              Shop Merchandise
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
