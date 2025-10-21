import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Phone, CreditCard, Smartphone, Star, Heart, Eye, Plus, Minus, X, Check, Truck, Shield, Clock } from 'lucide-react';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
    items: []
  });

  // Product data with detailed information
  const products = [
    {
      id: 1,
      name: "Home Jersey 2024",
      price: 8999,
      originalPrice: 10999,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "jerseys",
      description: "Official Hotstar FC home jersey for the 2024 season. Made with premium materials for comfort and durability.",
      features: ["100% Polyester", "Moisture-wicking", "Official team colors", "Player name & number available"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Red", "Yellow"],
      inStock: true,
      rating: 4.8,
      reviews: 124,
      featured: true,
      bestseller: true
    },
    {
      id: 2,
      name: "Away Jersey 2024",
      price: 8999,
      originalPrice: 10999,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "jerseys",
      description: "Official Hotstar FC away jersey featuring our signature design and team colors.",
      features: ["100% Polyester", "Moisture-wicking", "Official team colors", "Player name & number available"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Black"],
      inStock: true,
      rating: 4.7,
      reviews: 98,
      featured: true,
      bestseller: false
    },
    {
      id: 3,
      name: "Team Scarf",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      category: "accessories",
      description: "Show your support with our official team scarf. Perfect for match days and cold weather.",
      features: ["100% Acrylic", "Team colors", "Fringed edges", "One size fits all"],
      sizes: ["One Size"],
      colors: ["Red/Yellow", "Black/White"],
      inStock: true,
      rating: 4.6,
      reviews: 87,
      featured: false,
      bestseller: true
    },
    {
      id: 4,
      name: "Team Cap",
      price: 3499,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      category: "accessories",
      description: "Official Hotstar FC cap with embroidered logo. Adjustable fit for all head sizes.",
      features: ["100% Cotton", "Adjustable strap", "Embroidered logo", "UV protection"],
      sizes: ["One Size"],
      colors: ["Red", "Black", "White"],
      inStock: true,
      rating: 4.5,
      reviews: 76,
      featured: false,
      bestseller: false
    },
    {
      id: 5,
      name: "Training Kit",
      price: 6999,
      originalPrice: 7999,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "training",
      description: "Complete training kit including jersey and shorts. Perfect for workouts and training sessions.",
      features: ["Moisture-wicking fabric", "Comfortable fit", "Team colors", "Durable construction"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Red", "Black"],
      inStock: true,
      rating: 4.7,
      reviews: 92,
      featured: true,
      bestseller: false
    },
    {
      id: 6,
      name: "Team Mug",
      price: 1999,
      originalPrice: 2499,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      category: "accessories",
      description: "Ceramic mug with official Hotstar FC logo. Perfect for your morning coffee or tea.",
      features: ["Ceramic material", "Dishwasher safe", "11oz capacity", "Official logo"],
      sizes: ["One Size"],
      colors: ["White", "Black"],
      inStock: true,
      rating: 4.4,
      reviews: 65,
      featured: false,
      bestseller: false
    },
    {
      id: 7,
      name: "Team Hoodie",
      price: 12999,
      originalPrice: 14999,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a4?w=400&h=400&fit=crop",
      category: "apparel",
      description: "Comfortable hoodie with team logo and colors. Perfect for casual wear and match days.",
      features: ["80% Cotton, 20% Polyester", "Kangaroo pocket", "Drawstring hood", "Team logo"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Red", "Black", "Gray"],
      inStock: true,
      rating: 4.6,
      reviews: 78,
      featured: true,
      bestseller: true
    },
    {
      id: 8,
      name: "Team Keychain",
      price: 999,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=400&h=400&fit=crop",
      category: "accessories",
      description: "Metal keychain with team logo. A small way to show your support everywhere you go.",
      features: ["Metal construction", "Team logo", "Key ring included", "Durable"],
      sizes: ["One Size"],
      colors: ["Gold", "Silver"],
      inStock: true,
      rating: 4.3,
      reviews: 43,
      featured: false,
      bestseller: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'jerseys', name: 'Jerseys', count: products.filter(p => p.category === 'jerseys').length },
    { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
    { id: 'training', name: 'Training', count: products.filter(p => p.category === 'training').length },
    { id: 'apparel', name: 'Apparel', count: products.filter(p => p.category === 'apparel').length }
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        filtered.sort((a, b) => b.featured - a.featured);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, sortBy]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: product.sizes[0], selectedColor: product.colors[0] }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(price);
  };

  const handleOrder = () => {
    setOrderDetails({
      ...orderDetails,
      items: cart
    });
    setShowOrderModal(true);
  };

  const handleCallOrder = () => {
    const phoneNumber = '+254700000000'; // Replace with actual phone number
    const message = `Hi! I'd like to order the following items from Hotstar FC:\n\n${cart.map(item => `${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}`).join('\n')}\n\nTotal: ${formatPrice(getTotalPrice())}`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMpesaOrder = () => {
    const phoneNumber = '+254700000000'; // Replace with actual phone number
    const message = `Hi! I'd like to pay via M-Pesa for the following items from Hotstar FC:\n\n${cart.map(item => `${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}`).join('\n')}\n\nTotal: ${formatPrice(getTotalPrice())}\n\nPlease send M-Pesa payment details.`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Official Store
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Show your support with our exclusive Hotstar FC merchandise. Call to order with cash on delivery or M-Pesa payment.
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.bestseller && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Best Seller
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Sale
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-400">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-yellow-500">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Products Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-2xl w-full mx-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{item.name}</h3>
                          <p className="text-sm text-gray-400">{item.selectedSize}, {item.selectedColor}</p>
                          <p className="text-yellow-500 font-bold">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-semibold px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-2xl font-bold text-yellow-500">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCallOrder}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call to Order
                    </button>
                    <button
                      onClick={handleMpesaOrder}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Smartphone className="w-5 h-5" />
                      M-Pesa
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 max-h-[90vh] overflow-hidden">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-lg text-gray-400">{selectedProduct.rating}</span>
                      <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-4">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-yellow-500">
                      {formatPrice(selectedProduct.price)}
                    </span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-6">{selectedProduct.description}</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-semibold text-white mb-2">Features:</h3>
                      <ul className="space-y-1">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="text-gray-400 flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Available Sizes:</h3>
                      <div className="flex gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <span key={size} className="px-3 py-1 bg-gray-800 text-white rounded-lg text-sm">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-2">Available Colors:</h3>
                      <div className="flex gap-2">
                        {selectedProduct.colors.map((color) => (
                          <span key={color} className="px-3 py-1 bg-gray-800 text-white rounded-lg text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Order?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Call us now to place your order! We offer cash on delivery and M-Pesa payment options for your convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+254700000000"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now: +254 700 000 000
              </a>
              <button className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5" />
                WhatsApp Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
