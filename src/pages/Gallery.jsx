import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight, Play, Heart, Share2, Download, Eye } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const galleryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        src: doc.data().imageUrl,
        ...doc.data(),
      }));
      setGalleryImages(galleryData);
    };

    fetchGallery();
  }, []);

  // Filter images based on search term and category
  useEffect(() => {
    let filtered = galleryImages;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(img => 
        (img.title && img.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (img.description && img.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (img.alt && img.alt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredImages(filtered);
  }, [searchTerm, selectedCategory, galleryImages]);

  useEffect(() => {
    if (galleryImages.length > 0) {
      const allCategories = galleryImages.reduce((acc, img) => {
        if (img.category && !acc.includes(img.category)) {
          acc.push(img.category);
        }
        return acc;
      }, []);

      const categoryCounts = allCategories.map(category => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        count: galleryImages.filter(p => p.category === category).length
      }));

      setCategories([
        { id: 'all', name: 'All Photos', count: galleryImages.length },
        ...categoryCounts
      ]);
    }
  }, [galleryImages]);

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
    if (!dateString) return '';
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
