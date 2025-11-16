import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt.toDate().toISOString(),
      }));
      setBlogPosts(blogsData);
      setFilteredPosts(blogsData);
    };

    fetchBlogs();
  }, []);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category).filter(Boolean))];

  useEffect(() => {
    let posts = regularPosts;

    if (selectedCategory !== 'All') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(posts);
  }, [searchTerm, selectedCategory, blogPosts]);

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
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/30 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            The Hotstar Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Your source for the latest news, match analysis, and behind-the-scenes stories from Hotstar FC.
          </p>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                    </span>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4 text-yellow-500">{featuredPost.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2"><Calendar size={16} /> {formatDate(featuredPost.date)}</div>
                  <div className="flex items-center gap-2"><User size={16} /> {featuredPost.author}</div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <Link to={`/blog/${featuredPost.id}`} className="group text-yellow-500 font-semibold hover:text-yellow-400 transition-colors flex items-center">
                  Read More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog List Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative h-56 overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                    <div className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.date)}</div>
                    <div className="flex items-center gap-1"><User size={14} /> {post.author}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors h-16">{post.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm h-20 overflow-hidden">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors text-sm flex items-center">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 col-span-full">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Posts Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-20 bg-gradient-to-r from-yellow-500/10 to-red-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest news, updates, and exclusive content delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;