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
      'Design': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
      'Technical': 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
      'Templates': 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
      'Localization': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
      'Accessibility': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      'Automation': 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
    };
    return colors[category] || 'bg-gradient-to-r from-slate-500 to-gray-500 text-white';
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100"></div>
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(147, 197, 253, 0.1) 0%, transparent 50%)`
        }}
      ></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20" id="header" data-animate>
          <div className={`inline-flex items-center px-6 py-3 bg-blue-100 backdrop-blur-sm text-blue-700 rounded-full text-sm font-medium mb-8 border border-blue-200 transition-all duration-1000 ${isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <svg className="w-4 h-4 mr-2 animate-spin" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Expert Insights & Best Practices
          </div>
          <h1 className={`text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-8 leading-tight transition-all duration-1000 delay-200 ${isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Business Intelligence
          </h1>
          <p className={`text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Cutting-edge insights and practical guides for modern business operations.
            <br />
            <span className="text-blue-600 font-medium">Elevate your invoicing, receipts, and business documentation.</span>
          </p>
        </div>

        {/* Premium Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16" id="categories" data-animate>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/25'
                  : 'bg-white backdrop-blur-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 shadow-sm'
              } ${isVisible.categories ? `translate-y-0 opacity-100` : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-500"></div>
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
          {/* Enhanced Main Content */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {displayedPosts.map((post, index) => (
                <article
                  key={post.id}
                  id={`post-${post.id}`}
                  data-animate
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  className={`group relative bg-white backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer border border-slate-200 hover:border-blue-300 hover:shadow-lg ${
                    post.featured 
                      ? 'lg:col-span-2 hover:shadow-2xl hover:shadow-blue-500/10' 
                      : 'hover:shadow-xl hover:shadow-slate-300/20'
                  } ${hoveredPost === post.id ? 'transform -translate-y-3 scale-105' : ''} ${isVisible[`post-${post.id}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700`}></div>
                  
                  <div className={`relative p-8 ${post.featured ? 'lg:p-12' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`px-4 py-2 text-xs font-bold rounded-full ${getCategoryColor(post.category)} shadow-lg`}>
                        {post.category}
                      </span>
                      <span className="text-slate-400 text-sm font-medium">{post.readTime}</span>
                    </div>
                    
                    <h2 className={`font-bold text-slate-800 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-500 ${
                      post.featured ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'
                    }`}>
                      {post.title}
                    </h2>
                    
                    <p className={`text-slate-600 mb-8 leading-relaxed ${
                      post.featured ? 'text-lg' : 'text-base'
                    }`}>
                      {post.excerpt}
                    </p>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedArticle(post);
                      }}
                      className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span>Read Article</span>
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Enhanced Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${post.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </article>
              ))}
            </div>

            {/* Enhanced Load More/Back Button */}
            <div className="text-center mt-16">
              {!showMore && filteredPosts.length > 6 ? (
                <button 
                  onClick={() => setShowMore(true)}
                  className="group px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-110 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    Load More Articles
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              ) : showMore ? (
                <button 
                  onClick={() => setShowMore(false)}
                  className="group px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-slate-500/25 transition-all duration-500 transform hover:scale-110 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M15 10l-4-4v3H4a1 1 0 000 2h7v3l4-4z" clipRule="evenodd" />
                    </svg>
                    Show Less Articles
                  </span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Premium Sidebar */}
          <aside className="space-y-8" id="sidebar" data-animate>
            {/* Enhanced Categories Widget */}
            <div className={`bg-white backdrop-blur-xl rounded-3xl p-8 border border-slate-200 shadow-lg transition-all duration-1000 ${isVisible.sidebar ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <h3 className="text-2xl font-bold text-slate-800 mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Categories</h3>
              <div className="space-y-3">
                {categories.slice(1).map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group w-full text-left px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-300"></div>
                    <span className="relative z-10">{category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Popular Posts */}
            <div className={`bg-white backdrop-blur-xl rounded-3xl p-8 border border-slate-200 shadow-lg transition-all duration-1000 delay-200 ${isVisible.sidebar ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <h3 className="text-2xl font-bold text-slate-800 mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Featured Articles</h3>
              <div className="space-y-6">
                {posts.slice(0, 3).map((post, index) => (
                  <div key={post.id} className="group cursor-pointer p-4 rounded-xl hover:bg-slate-50 transition-all duration-300" onClick={() => setSelectedArticle(post)}>
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${post.gradient} rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-300 mb-2 leading-snug">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)} opacity-90`}>
                            {post.category}
                          </span>
                          <span className="text-sm text-slate-500">{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Enhanced Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl max-w-5xl max-h-[90vh] overflow-hidden border border-slate-200 animate-in zoom-in duration-500">
              {/* Enhanced Article Header */}
              <div className={`bg-gradient-to-r ${selectedArticle.gradient} p-10 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 text-sm font-medium backdrop-blur-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Articles
                    </button>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-2 text-sm font-bold rounded-full bg-white/20 backdrop-blur-sm">
                      {selectedArticle.category}
                    </span>
                    <span className="text-white/90 text-sm font-medium">{selectedArticle.readTime}</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">{selectedArticle.title}</h1>
                  <p className="text-xl text-white/90 leading-relaxed max-w-4xl">{selectedArticle.excerpt}</p>
                </div>
              </div>

              {/* Enhanced Article Content */}
              <div className="p-10 overflow-y-auto max-h-[60vh] bg-white">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:bg-gradient-to-r prose-h2:from-blue-600 prose-h2:to-indigo-600 prose-h2:bg-clip-text prose-h2:text-transparent prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-700 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-slate-600 prose-li:mb-3 prose-strong:text-slate-800 prose-strong:font-semibold"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              </div>

              {/* Enhanced Article Footer */}
              <div className="bg-slate-50 backdrop-blur-sm p-8 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-slate-500 text-sm">
                      <span className="font-medium text-slate-800">{selectedArticle.readTime}</span> • Expert Insights
                    </div>
                    <div className="flex gap-3">
                      <button className="p-2 bg-slate-100 hover:bg-blue-100 rounded-lg transition-all duration-300 text-slate-600 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                        </svg>
                      </button>
                      <button className="p-2 bg-slate-100 hover:bg-red-100 rounded-lg transition-all duration-300 text-slate-600 hover:text-red-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;