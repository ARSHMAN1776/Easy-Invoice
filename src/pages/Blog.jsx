import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMore, setShowMore] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const posts = [
    { 
      id: 1, 
      title: 'Designing Clear Receipts', 
      excerpt: 'Master the art of creating receipts that customers actually understand and appreciate with modern design principles.',
      category: 'Design',
      readTime: '5 min read',
      featured: true,
      gradient: 'from-purple-600 to-blue-600',
      content: `
        <h2>The Art of Clear Receipt Design</h2>
        <p>In today's digital age, receipts are more than just proof of purchase—they're a crucial touchpoint between your business and customers. A well-designed receipt can enhance customer satisfaction, reduce support queries, and even strengthen your brand identity.</p>
        
        <h3>Essential Elements of a Clear Receipt</h3>
        <p>Every receipt should include these fundamental components:</p>
        <ul>
          <li><strong>Business Information:</strong> Your company name, address, and contact details should be prominently displayed</li>
          <li><strong>Transaction Details:</strong> Clear transaction ID for easy reference</li>
          <li><strong>Itemized List:</strong> Clear product names, quantities, and individual prices</li>
          <li><strong>Payment Method:</strong> How the customer paid and any relevant payment details</li>
          <li><strong>Total Breakdown:</strong> Subtotal, taxes, discounts, and final amount</li>
        </ul>
        
        <h3>Typography and Layout Best Practices</h3>
        <p>The visual hierarchy of your receipt is crucial for readability:</p>
        <ul>
          <li>Use consistent font sizes throughout the document</li>
          <li>Bold important information like totals and business name</li>
          <li>Ensure adequate spacing between sections</li>
          <li>Align numbers consistently for easy scanning</li>
        </ul>
        
        <p>Remember, a clear receipt is an investment in customer satisfaction and operational efficiency.</p>
      `
    },
    { 
      id: 2, 
      title: 'Optimizing Invoicing Workflows', 
      excerpt: 'Discover automation strategies that save hours for small businesses while dramatically improving cash flow.',
      category: 'Automation',
      readTime: '7 min read',
      featured: false,
      gradient: 'from-emerald-600 to-teal-600',
      content: `
        <h2>Streamline Your Invoicing Process</h2>
        <p>For small businesses, time is money. Every hour spent on manual invoicing tasks is an hour not spent growing your business.</p>
        
        <h3>Automation Opportunities</h3>
        <ul>
          <li><strong>Recurring Invoices:</strong> Set up automatic generation for regular clients</li>
          <li><strong>Payment Reminders:</strong> Automate follow-ups for overdue payments</li>
          <li><strong>Data Entry:</strong> Use templates to reduce manual input</li>
        </ul>
        
        <p>By implementing these workflow optimizations, you can reduce invoicing time by up to 75%.</p>
      `
    },
    { 
      id: 3, 
      title: 'Accessibility in Financial Documents', 
      excerpt: 'Creating inclusive financial documents with proper font choices, contrast ratios, and structural design.',
      category: 'Accessibility',
      readTime: '6 min read',
      featured: true,
      gradient: 'from-pink-600 to-rose-600',
      content: `
        <h2>Creating Inclusive Financial Documents</h2>
        <p>Accessibility in financial documents isn't just about compliance—it's about creating inclusive experiences that serve all customers effectively.</p>
        
        <h3>Font and Typography Guidelines</h3>
        <ul>
          <li><strong>Font Family:</strong> Use sans-serif fonts like Arial, Helvetica, or Verdana</li>
          <li><strong>Font Size:</strong> Minimum 12pt for body text, 14pt preferred</li>
          <li><strong>Line Spacing:</strong> 1.5x line height for better readability</li>
        </ul>
        
        <p>Accessible design benefits everyone, creating better customer experiences.</p>
      `
    },
    { 
      id: 4, 
      title: 'Custom Templates 101', 
      excerpt: 'Build professional template systems that scale with your business needs and maintain brand consistency.',
      category: 'Templates',
      readTime: '4 min read',
      featured: false,
      gradient: 'from-indigo-600 to-purple-600',
      content: `
        <h2>Master Template Creation</h2>
        <p>Custom templates are the backbone of efficient business documentation.</p>
        
        <h3>Template Planning</h3>
        <ul>
          <li><strong>Brand Guidelines:</strong> Incorporate your logo, colors, and fonts consistently</li>
          <li><strong>Business Needs:</strong> Identify different document types you regularly create</li>
        </ul>
        
        <p>Well-designed templates are an investment in your business efficiency.</p>
      `
    },
    { 
      id: 5, 
      title: 'Global Localization & Currency', 
      excerpt: 'Navigate international markets with proper currency handling, regional formats, and cultural considerations.',
      category: 'Localization',
      readTime: '8 min read',
      featured: false,
      gradient: 'from-amber-600 to-orange-600',
      content: `
        <h2>Going Global: Localization Best Practices</h2>
        <p>As businesses expand internationally, proper localization of financial documents becomes crucial.</p>
        
        <h3>Currency Handling</h3>
        <ul>
          <li><strong>Currency Codes:</strong> Use ISO 4217 standard codes (USD, EUR, GBP)</li>
          <li><strong>Exchange Rates:</strong> Implement real-time or fixed-rate conversion</li>
        </ul>
        
        <p>Proper localization demonstrates respect for your international customers.</p>
      `
    },
    { 
      id: 6, 
      title: 'Perfect PDF & Print Output', 
      excerpt: 'Achieve consistent, professional document output across all devices and printing scenarios.',
      category: 'Technical',
      readTime: '5 min read',
      featured: false,
      gradient: 'from-cyan-600 to-blue-600',
      content: `
        <h2>Perfect PDF and Print Output</h2>
        <p>Nothing undermines professional credibility like poorly formatted documents.</p>
        
        <h3>PDF Optimization</h3>
        <ul>
          <li><strong>Embed Fonts:</strong> Ensure text displays consistently across all devices</li>
          <li><strong>Vector Graphics:</strong> Use scalable graphics that look crisp at any size</li>
        </ul>
        
        <p>Consistent, professional document output builds trust with customers.</p>
      `
    },
  ];

  const categories = ['All', 'Design', 'Automation', 'Templates', 'Accessibility', 'Localization', 'Technical'];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const displayedPosts = showMore ? filteredPosts : filteredPosts.slice(0, 6);

  const getCategoryColor = (category) => {
    const colors = {
      'Design': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/25',
      'Technical': 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/25',
      'Templates': 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-indigo-500/25',
      'Localization': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/25',
      'Accessibility': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/25',
      'Automation': 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/25'
    };
    return colors[category] || 'bg-gradient-to-r from-slate-500 to-gray-500 text-white shadow-slate-500/25';
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Enhanced Multi-Layer Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        
        {/* Dynamic gradient overlay with parallax */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 40% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
            `
          }}
        ></div>

        {/* Mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `conic-gradient(from 180deg at 50% 50%, rgba(59, 130, 246, 0.1) 0deg, rgba(147, 51, 234, 0.1) 60deg, rgba(236, 72, 153, 0.1) 120deg, rgba(59, 130, 246, 0.1) 180deg, rgba(34, 197, 94, 0.1) 240deg, rgba(59, 130, 246, 0.1) 360deg)`
          }}
        ></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          >
            <div 
              className={`w-3 h-3 rounded-full ${
                i % 4 === 0 ? 'bg-blue-400/30' :
                i % 4 === 1 ? 'bg-purple-400/30' :
                i % 4 === 2 ? 'bg-pink-400/30' : 'bg-indigo-400/30'
              } blur-sm`}
              style={{
                transform: `translateY(${Math.sin((scrollY + i * 100) * 0.01) * 20}px)`
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              transform: `rotate(${i * 45}deg) translateY(${Math.sin((scrollY + i * 200) * 0.005) * 30}px)`
            }}
          >
            <div className={`w-8 h-8 ${
              i % 3 === 0 ? 'bg-gradient-to-br from-blue-400/20 to-purple-400/20 rotate-45' :
              i % 3 === 1 ? 'bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full' :
              'bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 clip-path-triangle'
            } backdrop-blur-sm border border-white/30`}></div>
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Ultra-Enhanced Header Section */}
        <div className="text-center mb-24" id="header" data-animate>
          <div className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-xl text-blue-700 rounded-full text-sm font-bold mb-10 border border-blue-200/50 shadow-xl shadow-blue-500/10 transition-all duration-1000 hover:shadow-blue-500/20 hover:scale-105 ${isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <svg className="w-5 h-5 mr-3 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <div className="absolute -inset-1 bg-blue-400/20 rounded-full animate-ping"></div>
            </div>
            Expert Insights & Best Practices
          </div>
          
          <h1 className={`text-7xl lg:text-8xl xl:text-9xl font-black mb-10 leading-tight transition-all duration-1000 delay-200 ${isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent animate-pulse">
              Business
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>
          
          <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-400 ${isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-2xl lg:text-3xl text-slate-600 leading-relaxed mb-8">
              Cutting-edge insights and practical guides for modern business operations.
            </p>
            <p className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Elevate your invoicing, receipts, and business documentation.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <span className="relative z-10 flex items-center gap-3">
                  Explore Articles
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button className="group px-10 py-5 bg-white/80 backdrop-blur-xl text-slate-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl border border-slate-200 hover:border-slate-300 transition-all duration-500 transform hover:scale-105 hover:bg-white">
                <span className="flex items-center gap-3">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Start Guide
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Ultra-Premium Category Filter */}
        <div className="mb-20" id="categories" data-animate>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold text-slate-800 mb-4 transition-all duration-1000 ${isVisible.categories ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Browse by Category
            </h2>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full transition-all duration-1000 delay-200 ${isVisible.categories ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-700 transform hover:scale-110 hover:-translate-y-2 cursor-pointer overflow-hidden backdrop-blur-xl ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-600/30'
                    : 'bg-white/70 text-slate-700 hover:bg-white hover:text-blue-700 border border-slate-200/50 shadow-xl hover:shadow-2xl hover:border-blue-300'
                } ${isVisible.categories ? `translate-y-0 opacity-100` : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">{category}</span>
                
                {/* Category icon based on type */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                  <div className="w-full h-full bg-white/30 rounded-full animate-ping"></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          {/* Ultra-Enhanced Main Content */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {displayedPosts.map((post, index) => (
                <article
                  key={post.id}
                  id={`post-${post.id}`}
                  data-animate
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  className={`group relative bg-white/80 backdrop-blur-2xl rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer border border-white/50 hover:border-blue-300/50 shadow-xl hover:shadow-2xl ${
                    post.featured 
                      ? 'lg:col-span-2 hover:shadow-blue-500/20' 
                      : 'hover:shadow-slate-500/20'
                  } ${hoveredPost === post.id ? 'transform -translate-y-6 scale-105 rotate-1' : ''} ${isVisible[`post-${post.id}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Enhanced Gradient Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-15 transition-all duration-700`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {/* Animated border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-700"></div>
                  
                  <div className={`relative p-10 ${post.featured ? 'lg:p-14' : ''}`}>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <span className={`px-5 py-3 text-sm font-bold rounded-2xl ${getCategoryColor(post.category)} shadow-lg transform group-hover:scale-110 transition-all duration-500`}>
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {post.readTime}
                        </div>
                      </div>
                      
                      {post.featured && (
                        <div className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                          FEATURED
                        </div>
                      )}
                    </div>
                    
                    <h2 className={`font-black text-slate-800 mb-8 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-500 ${
                      post.featured ? 'text-4xl lg:text-5xl leading-tight' : 'text-2xl lg:text-3xl leading-tight'
                    }`}>
                      {post.title}
                    </h2>
                    
                    <p className={`text-slate-600 mb-10 leading-relaxed ${
                      post.featured ? 'text-xl' : 'text-lg'
                    }`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedArticle(post);
                        }}
                        className="group/btn relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-2xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center gap-3">
                          Read Full Article
                          <svg 
                            className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-2 group-hover/btn:scale-110" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </button>
                      
                      <div className="flex gap-3">
                        <button className="p-3 bg-slate-100/50 hover:bg-blue-100 rounded-xl transition-all duration-300 text-slate-500 hover:text-blue-600 transform hover:scale-110">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                          </svg>
                        </button>
                        <button className="p-3 bg-slate-100/50 hover:bg-red-100 rounded-xl transition-all duration-300 text-slate-500 hover:text-red-600 transform hover:scale-110">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Show More/Less Button */}
            {filteredPosts.length > 6 && (
              <div className="text-center mt-16">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="group relative px-12 py-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold rounded-3xl hover:from-slate-500 hover:to-slate-600 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {showMore ? 'Show Less' : 'Load More Articles'}
                    <svg 
                      className={`w-6 h-6 transition-transform duration-500 ${showMore ? 'rotate-180' : ''} group-hover:scale-110`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Ultra-Enhanced Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-10">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-xl rounded-3xl p-10 border border-blue-200/50 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.95c.04.02.08.04.12.06.19.1.39.1.58 0 .04-.02.08-.04.12-.06L19 8m-14 8v-8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4">Stay Updated</h3>
                  <p className="text-slate-600 leading-relaxed">Get weekly insights delivered to your inbox</p>
                </div>
                
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-700 placeholder-slate-400"
                  />
                  <button 
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>

              {/* Popular Tags */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-xl">
                <h3 className="text-2xl font-black text-slate-800 mb-8">Popular Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {['Receipt Design', 'Invoice Automation', 'PDF Generation', 'Business Templates', 'Tax Compliance', 'Digital Documents'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:text-blue-700 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    >
                      #{tag.replace(' ', '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 backdrop-blur-xl rounded-3xl p-10 border border-purple-200/50 shadow-xl">
                <h3 className="text-2xl font-black text-slate-800 mb-8">Quick Stats</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">Total Articles</span>
                    <span className="text-2xl font-black text-purple-600">{posts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">Categories</span>
                    <span className="text-2xl font-black text-purple-600">{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">Featured</span>
                    <span className="text-2xl font-black text-purple-600">{posts.filter(p => p.featured).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-10 py-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 text-sm font-bold rounded-xl ${getCategoryColor(selectedArticle.category)}`}>
                  {selectedArticle.category}
                </span>
                <span className="text-slate-500 text-sm">{selectedArticle.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-3 hover:bg-slate-100 rounded-xl transition-all duration-300 text-slate-500 hover:text-slate-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-10">
              <h1 className="text-4xl font-black text-slate-800 mb-8 leading-tight">
                {selectedArticle.title}
              </h1>
              
              <div 
                className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              
              <div className="flex gap-4 mt-12 pt-8 border-t border-slate-200">
                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300">
                  Share Article
                </button>
                <button className="flex-1 px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all duration-300">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;