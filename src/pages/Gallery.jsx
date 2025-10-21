import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, Play, Heart, Share2, Download, Eye } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);

  // Gallery images data with categories and descriptions
  const galleryImages = [
    { 
      id: 1, 
      src: "/Image1.jpg", 
      alt: "Team Training Session", 
      category: "training",
      title: "Intensive Training",
      description: "Our players during an intense training session, preparing for the upcoming championship.",
      date: "2024-01-15"
    },
    { 
      id: 2, 
      src: "/Image2.jpg", 
      alt: "Match Action Shot", 
      category: "matches",
      title: "Championship Moment",
      description: "A crucial moment during our recent championship match that led to victory.",
      date: "2024-01-10"
    },
    { 
      id: 3, 
      src: "/Image3.jpg", 
      alt: "Team Celebration", 
      category: "celebration",
      title: "Victory Celebration",
      description: "The team celebrating their hard-fought victory with fans and supporters.",
      date: "2024-01-08"
    },
    { 
      id: 4, 
      src: "/Image4.jpg", 
      alt: "Stadium Atmosphere", 
      category: "stadium",
      title: "Electric Atmosphere",
      description: "The incredible atmosphere at Hotstar Stadium during a packed match day.",
      date: "2024-01-05"
    },
    { 
      id: 5, 
      src: "/Image5.jpg", 
      alt: "Championship Glory", 
      category: "trophy",
      title: "Trophy Presentation",
      description: "The moment of glory as our captain lifts the championship trophy.",
      date: "2024-01-01"
    },
    { 
      id: 6, 
      src: "/Image6.jpg", 
      alt: "Team Victory", 
      category: "celebration",
      title: "Team Unity",
      description: "The team showing unity and determination after a crucial win.",
      date: "2023-12-28"
    },
    { 
      id: 7, 
      src: "/Image7.jpg", 
      alt: "Training Session", 
      category: "training",
      title: "Morning Training",
      description: "Early morning training session showing dedication and commitment.",
      date: "2023-12-25"
    },
    { 
      id: 8, 
      src: "/Image8.jpg", 
      alt: "Match Day", 
      category: "matches",
      title: "Match Day Preparation",
      description: "Players preparing for the big match with focus and determination.",
      date: "2023-12-22"
    },
    { 
      id: 9, 
      src: "/Image9.jpg", 
      alt: "Team Spirit", 
      category: "team",
      title: "Team Spirit",
      description: "The unbreakable bond and spirit that defines Hotstar FC.",
      date: "2023-12-20"
    },
    { 
      id: 10, 
      src: "/Image10.jpg", 
      alt: "Championship Glory", 
      category: "trophy",
      title: "Championship Victory",
      description: "Another angle of our championship victory celebration.",
      date: "2023-12-18"
    },
    { 
      id: 11, 
      src: "/Image11.jpg", 
      alt: "Fan Support", 
      category: "fans",
      title: "Fan Support",
      description: "Our incredible fans showing unwavering support throughout the season.",
      date: "2023-12-15"
    },
    { 
      id: 12, 
      src: "/Image12.jpg", 
      alt: "Team Unity", 
      category: "team",
      title: "Team Bonding",
      description: "Team bonding moments that strengthen our unity and performance.",
      date: "2023-12-12"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length },
    { id: 'matches', name: 'Matches', count: galleryImages.filter(img => img.category === 'matches').length },
    { id: 'training', name: 'Training', count: galleryImages.filter(img => img.category === 'training').length },
    { id: 'celebration', name: 'Celebrations', count: galleryImages.filter(img => img.category === 'celebration').length },
    { id: 'trophy', name: 'Trophies', count: galleryImages.filter(img => img.category === 'trophy').length },
    { id: 'team', name: 'Team', count: galleryImages.filter(img => img.category === 'team').length },
    { id: 'fans', name: 'Fans', count: galleryImages.filter(img => img.category === 'fans').length },
    { id: 'stadium', name: 'Stadium', count: galleryImages.filter(img => img.category === 'stadium').length }
  ];

  // Filter images based on search term and category
  useEffect(() => {
    let filtered = galleryImages;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.alt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  }, [searchTerm, selectedCategory]);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Gallery
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Relive the greatest moments, victories, and memories from Hotstar FC's incredible journey
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredImages.length} of {galleryImages.length} photos
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 cursor-pointer"
                onClick={() => openModal(image)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <Eye className="w-8 h-8 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold">View Details</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {categories.find(cat => cat.id === image.category)?.name}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {image.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(image.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Photos Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-6xl max-h-[90vh] mx-4">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Modal Content */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800">
                <div className="relative">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full max-h-[60vh] object-cover"
                  />
                  
                  {/* Image Actions */}
                  <div className="absolute top-4 right-16 flex gap-2">
                    <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {categories.find(cat => cat.id === selectedImage.category)?.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(selectedImage.date)}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {selectedImage.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    {selectedImage.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105">
                      <Play className="w-5 h-5" />
                      Watch Video
                    </button>
                    <button className="flex items-center gap-2 border-2 border-yellow-500 text-yellow-500 px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
