import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, Calendar, Star, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  // Team slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Team images data
  const teamImages = [
    { id: 1, src: "/Image1.jpg", alt: "Team Training" },
    { id: 2, src: "/Image2.jpg", alt: "Match Action" },
    { id: 3, src: "/Image3.jpg", alt: "Team Celebration" },
    { id: 4, src: "/Image4.jpg", alt: "Stadium Atmosphere" },
    { id: 5, src: "/Image5.jpg", alt: "Championship Moment" },
    { id: 6, src: "/Image6.jpg", alt: "Team Victory" },
    { id: 7, src: "/Image7.jpg", alt: "Training Session" },
    { id: 8, src: "/Image8.jpg", alt: "Match Day" },
    { id: 9, src: "/Image9.jpg", alt: "Team Spirit" },
    { id: 10, src: "/Image10.jpg", alt: "Championship Glory" },
    { id: 11, src: "/Image11.jpg", alt: "Fan Support" },
    { id: 12, src: "/Image12.jpg", alt: "Team Unity" }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [teamImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamImages.length) % teamImages.length);
  };

  // Marketplace products data
  const products = [
    { id: 1, name: "Home Jersey 2024", price: "$89.99", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", category: "Jerseys" },
    { id: 2, name: "Away Jersey 2024", price: "$89.99", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", category: "Jerseys" },
    { id: 3, name: "Team Scarf", price: "$24.99", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop", category: "Accessories" },
    { id: 4, name: "Team Cap", price: "$34.99", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop", category: "Accessories" },
    { id: 5, name: "Training Kit", price: "$69.99", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", category: "Training" },
    { id: 6, name: "Team Mug", price: "$19.99", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop", category: "Accessories" }
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,0,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            {/* Logo */}
            <div className="mb-12 flex justify-center">
              <div className="relative">
                <img 
                  src="/Logo.jpg" 
                  alt="Hotstar FC Logo" 
                  className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-full border-4 border-yellow-500 shadow-2xl shadow-yellow-500/25 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/20 to-red-500/20 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent leading-tight">
              WANGIGE HOTSTAR FC
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed px-4">
              Experience the passion, power, and glory of football. Join the most electrifying fan community in the world.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link
              to="/matches"
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 w-full sm:w-auto flex items-center justify-center"
            >
              <span>View Matches</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/join"
              className="group border-2 border-yellow-500 text-yellow-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 w-full sm:w-auto text-center"
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

      {/* Team Slideshow Section */}
      <section className="w-full py-20 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="text-yellow-500">Champions</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the passion and dedication of our incredible team
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {teamImages.map((image) => (
                  <div key={image.id} className="w-full flex-shrink-0">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-96 md:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{image.alt}</h3>
                      <p className="text-gray-300">Hotstar FC Team</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {teamImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-yellow-500 w-8' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-gradient-to-r from-gray-900 to-black">
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
      <section className="w-full py-20 bg-black">
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

      {/* Marketplace Section */}
      <section className="w-full py-20 bg-gradient-to-br from-black via-red-900/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Official <span className="text-yellow-500">Merchandise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Show your support with our exclusive team merchandise and accessories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <div key={product.id} className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-yellow-500 mb-4">{product.price}</p>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <ShoppingBag size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/marketplace"
              className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              View All Products
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-500">
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
              className="bg-black text-yellow-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Join Fan Club
            </Link>
            <Link
              to="/marketplace"
              className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-black hover:text-yellow-500 transition-all duration-300 shadow-lg"
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
