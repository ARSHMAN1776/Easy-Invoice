import React, { useState, useEffect } from 'react';
import { Zap, Shield, CheckCircle, ArrowRight, BarChart3, FileText, Users, Star, Play, Globe, Lock, Smartphone } from 'lucide-react';

const EasyInvoiceProLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (e, url) => {
    e.preventDefault();
    setIsNavigating(true);
    
    // Prevent scrolling during transition
    document.body.style.overflow = 'hidden';
    
    // Create professional loading overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 25%, #BFDBFE 50%, #93C5FD 75%, #60A5FA 100%);
      z-index: 9999;
      opacity: 0;
      transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      backdrop-filter: blur(10px);
    `;
    
    // Professional loading animation with multiple elements
    overlay.innerHTML = `
      <div style="position: relative; text-align: center; transform: translateY(20px); opacity: 0; transition: all 0.8s ease-out 0.3s;">
        
        <!-- Logo Animation -->
        <div style="margin-bottom: 40px; transform: scale(0.8); transition: all 0.6s ease-out 0.5s;" class="logo-container">
          <div style="
            width: 80px; 
            height: 80px; 
            background: linear-gradient(135deg, #3B82F6, #1D4ED8);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
            position: relative;
            overflow: hidden;
          ">
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            <div style="
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
              transform: rotate(45deg);
              animation: shimmer 2s infinite;
            "></div>
          </div>
        </div>
        
        <!-- Loading Spinner -->
        <div style="margin-bottom: 30px; position: relative;">
          <div style="
            width: 80px;
            height: 80px;
            border: 3px solid rgba(59, 130, 246, 0.2);
            border-radius: 50%;
            position: relative;
            margin: 0 auto;
          ">
            <div style="
              width: 80px;
              height: 80px;
              border: 3px solid transparent;
              border-top: 3px solid #3B82F6;
              border-right: 3px solid #1D4ED8;
              border-radius: 50%;
              animation: professionalSpin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              position: absolute;
              top: -3px;
              left: -3px;
            "></div>
          </div>
          
          <!-- Floating dots around spinner -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <div style="
              position: absolute;
              width: 8px;
              height: 8px;
              background: #3B82F6;
              border-radius: 50%;
              animation: orbit 3s linear infinite;
              transform-origin: 50px 0;
            "></div>
            <div style="
              position: absolute;
              width: 6px;
              height: 6px;
              background: #1D4ED8;
              border-radius: 50%;
              animation: orbit 3s linear infinite reverse;
              transform-origin: -40px 0;
              animation-delay: -1s;
            "></div>
            <div style="
              position: absolute;
              width: 4px;
              height: 4px;
              background: #60A5FA;
              border-radius: 50%;
              animation: orbit 3s linear infinite;
              transform-origin: 0 35px;
              animation-delay: -2s;
            "></div>
          </div>
        </div>
        
        <!-- Professional Text -->
        <div style="margin-bottom: 20px;">
          <h3 style="
            font-size: 28px;
            font-weight: 700;
            color: #1E40AF;
            margin-bottom: 12px;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #1E40AF, #3B82F6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">Loading EasyInvoicePro</h3>
          
          <div style="
            font-size: 16px;
            color: #1E40AF;
            opacity: 0.8;
            font-weight: 500;
            animation: fadeInOut 2s ease-in-out infinite;
          " class="loading-text">Preparing your workspace...</div>
        </div>
        
        <!-- Progress Dots -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 20px;">
          <div style="
            width: 12px;
            height: 12px;
            background: #3B82F6;
            border-radius: 50%;
            animation: progressDot 1.4s ease-in-out infinite;
          "></div>
          <div style="
            width: 12px;
            height: 12px;
            background: #3B82F6;
            border-radius: 50%;
            animation: progressDot 1.4s ease-in-out infinite;
            animation-delay: 0.2s;
          "></div>
          <div style="
            width: 12px;
            height: 12px;
            background: #3B82F6;
            border-radius: 50%;
            animation: progressDot 1.4s ease-in-out infinite;
            animation-delay: 0.4s;
          "></div>
        </div>
        
        <!-- Floating particles -->
        <div style="position: absolute; top: -20px; left: -20px; width: calc(100% + 40px); height: calc(100% + 40px); pointer-events: none;">
          <div style="
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            animation: float1 4s ease-in-out infinite;
            top: 20%;
            left: 10%;
          "></div>
          <div style="
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(29, 78, 216, 0.4);
            border-radius: 50%;
            animation: float2 5s ease-in-out infinite;
            top: 60%;
            right: 15%;
            animation-delay: -1s;
          "></div>
          <div style="
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(96, 165, 250, 0.5);
            border-radius: 50%;
            animation: float3 6s ease-in-out infinite;
            bottom: 30%;
            left: 20%;
            animation-delay: -2s;
          "></div>
        </div>
      </div>
      
      <style>
        @keyframes professionalSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes progressDot {
          0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes float1 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
        
        @keyframes float2 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-15px) translateX(-10px) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        @keyframes float3 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.5;
          }
          33% { 
            transform: translateY(-10px) translateX(15px) scale(1.5);
            opacity: 1;
          }
          66% { 
            transform: translateY(5px) translateX(-5px) scale(0.8);
            opacity: 0.7;
          }
        }
        
        .logo-container {
          transform: scale(1) !important;
        }
        
        .loading-text {
          background: linear-gradient(90deg, #1E40AF, #3B82F6, #60A5FA, #3B82F6, #1E40AF);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShimmer 3s ease-in-out infinite, fadeInOut 2s ease-in-out infinite;
        }
        
        @keyframes textShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      </style>
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger entrance animations
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      
      // Animate content after overlay appears
      setTimeout(() => {
        const content = overlay.querySelector('div');
        if (content) {
          content.style.transform = 'translateY(0)';
          content.style.opacity = '1';
        }
      }, 300);
    });
    
    // Navigate after professional animation sequence
    setTimeout(() => {
      // Add exit animation
      const content = overlay.querySelector('div');
      if (content) {
        content.style.transform = 'translateY(-20px)';
        content.style.opacity = '0';
      }
      
      setTimeout(() => {
        window.location.href = url;
      }, 400);
    }, 2000);
  };

  const keyFeatures = [
    { 
      icon: FileText, 
      title: "Smart Invoice Creation", 
      description: "AI-powered templates with automatic calculations and professional layouts",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      icon: BarChart3, 
      title: "Real-time Analytics", 
      description: "Track payment status, overdue invoices, and business performance metrics",
      color: "from-indigo-500 to-purple-600"
    },
    { 
      icon: Globe, 
      title: "Multi-Currency Support", 
      description: "Handle international clients with 150+ currencies and automatic conversion",
      color: "from-purple-500 to-pink-600"
    },
    { 
      icon: Smartphone, 
      title: "Mobile Optimized", 
      description: "Create and manage invoices on the go with our responsive web app",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      icon: Users, 
      title: "Team Collaboration", 
      description: "Multiple user access with role-based permissions and activity tracking",
      color: "from-teal-500 to-cyan-600"
    },
    { 
      icon: CheckCircle, 
      title: "Professional Templates", 
      description: "Beautiful, customizable invoice designs that impress your clients",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" 
             style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-400/20 via-blue-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse delay-1000"
             style={{ transform: `translateY(${scrollY * 0.15}px)` }}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"
             style={{ transform: `translateY(${scrollY * 0.08}px)` }}></div>
        
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl rotate-12 animate-bounce" 
             style={{ animationDuration: '6s', transform: `translateY(${scrollY * 0.05}px) rotate(12deg)` }}></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/30 rounded-2xl -rotate-12 animate-bounce delay-1000"
             style={{ animationDuration: '8s', transform: `translateY(${scrollY * 0.07}px) rotate(-12deg)` }}></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent transform rotate-12"></div>
      </div>



      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-100/95 via-blue-100/95 to-indigo-100/95 backdrop-blur-md border-b border-blue-200/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              EasyInvoicePro
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors duration-300">Features</a>
            <a href="#demo" className="text-slate-700 hover:text-blue-600 transition-colors duration-300">Demo</a>
            <a 
              href="/home" 
              onClick={(e) => handleNavigation(e, '/home')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        {/* Hero Background with Subtle Blue Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-indigo-100/30 to-purple-100/40 rounded-3xl mx-6"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/20 via-blue-200/25 to-indigo-200/20 rounded-3xl mx-6"></div>
        
        {/* Subtle Hero Decorative Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-300/15 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-2 mb-8">
              <Star className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600 font-medium">Trusted by 10,000+ Businesses</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Invoice Like a
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Professional
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Create stunning invoices, track payments, and manage your business finances with 
              <span className="font-semibold text-blue-600"> EasyInvoicePro</span> - the most advanced 
              invoice management platform designed for modern businesses.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <a 
                href="/home" 
                onClick={(e) => handleNavigation(e, '/home')}
                className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 inline-block overflow-hidden"
              >
                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl transform translate-y-1 opacity-50 group-hover:translate-y-3 transition-transform duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center space-x-3">
                  <span>Get Started Free</span>
                  <div className="flex items-center">
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    <div className="ml-1 w-2 h-2 bg-white/60 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  </div>
                </div>
                
                {/* Loading Dots (Hidden by default, can be shown during navigation) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">500K+</div>
                <div className="text-gray-600">Invoices Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Powerful Features for
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to streamline your invoice management and grow your business efficiently.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div 
              className="group relative bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/40 transition-all duration-500 hover:-translate-y-4 transform perspective-1000"
              onMouseEnter={() => setHoveredFeature('fast')}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 ${hoveredFeature === 'fast' ? 'scale-110 rotate-6' : ''}`}>
                <Zap className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast Creation</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Generate professional invoices in under 30 seconds with our AI-powered template system 
                and smart auto-fill technology.
              </p>
              
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            <div 
              className="group relative bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/40 transition-all duration-500 hover:-translate-y-4 transform"
              onMouseEnter={() => setHoveredFeature('quality')}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 ${hoveredFeature === 'quality' ? 'scale-110 rotate-6' : ''}`}>
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Brand-Perfect Templates</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Choose from 50+ stunning templates or customize your own. Every invoice reflects 
                your brand's professionalism and attention to detail.
              </p>
              
              <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>View Templates</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            <div 
              className="group relative bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/40 transition-all duration-500 hover:-translate-y-4 transform"
              onMouseEnter={() => setHoveredFeature('secure')}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 ${hoveredFeature === 'secure' ? 'scale-110 rotate-6' : ''}`}>
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Bank-level encryption, automated backups, and smart payment tracking. 
                Your data is protected with military-grade security protocols.
              </p>
              
              <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Security Details</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-2">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Currency</h4>
              <p className="text-sm text-gray-600">Support for 150+ currencies</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-2">
              <Smartphone className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Mobile Apps</h4>
              <p className="text-sm text-gray-600">Coming Soon</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-2">
              <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
              <p className="text-sm text-gray-600">Real-time insights</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:-translate-y-2">
              <Users className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Team Collaboration</h4>
              <p className="text-sm text-gray-600">Multi-user access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="demo" className="py-20 px-6 relative">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              See EasyInvoicePro in Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Simple, intuitive interface designed for creating professional invoices quickly and efficiently.
          </p>

          {/* Screenshots Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Dashboard Screenshot */}
            <div className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 hover:bg-white/50 transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center border border-blue-200/50 shadow-inner overflow-hidden">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Dashboard Overview</p>
<img
  src="/assets/screenshot1.png"
  alt="Screenshot 1"
  className="text-xs text-gray-500 mt-1"
/>


                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold text-gray-900">Smart Dashboard</h4>
                <p className="text-sm text-gray-600 mt-1">Track all your invoices and payments in one place</p>
              </div>
            </div>

            {/* Invoice Creation Screenshot */}
            <div className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 hover:bg-white/50 transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl flex items-center justify-center border border-indigo-200/50 shadow-inner overflow-hidden">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Invoice Editor</p>
<img
  src="/assets/screenshot2.png"
  alt="Screenshot 2"
  className="text-xs text-gray-500 mt-1"
/>                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold text-gray-900">Invoice Creation</h4>
                <p className="text-sm text-gray-600 mt-1">Create professional invoices in seconds</p>
              </div>
            </div>

            {/* Client Management Screenshot */}
            <div className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 hover:bg-white/50 transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl flex items-center justify-center border border-emerald-200/50 shadow-inner overflow-hidden">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Client Management</p>
<img
  src="/assets/screenshot3.png"
  alt="Screenshot 3"
  className="text-xs text-gray-500 mt-1"
/>                   </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold text-gray-900">Client Management</h4>
                <p className="text-sm text-gray-600 mt-1">Organize and manage all your clients efficiently</p>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      {/* Key Features Showcase */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Everything You Need in One Place
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive invoice management tools designed to help your business grow efficiently and professionally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 hover:bg-white/50 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-gray-600 font-medium">Free Forever</div>
                <div className="text-sm text-gray-500 mt-1">No premium plans</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Happy Users</div>
                <div className="text-sm text-gray-500 mt-1">Growing daily</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">500K+</div>
                <div className="text-gray-600 font-medium">Invoices Created</div>
                <div className="text-sm text-gray-500 mt-1">And counting</div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Uptime</div>
                <div className="text-sm text-gray-500 mt-1">Always available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 backdrop-blur-xl border border-white/30 rounded-3xl p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Ready to Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Invoice Management?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Join over 10,000 businesses already using EasyInvoicePro to streamline their billing, 
              improve cash flow, and focus on what matters most - growing their business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <a href="/home" className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl transform translate-y-1 opacity-50 group-hover:translate-y-3 transition-transform duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </a>
              
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">✓ Completely Free Forever</div>
                <div className="text-sm text-gray-600">✓ No Hidden Fees</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Bank-level Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-lg border-t border-white/10 py-12 px-6 mt-20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">EasyInvoicePro</span>
          </div>
          <p className="text-gray-400 mb-8">
            The most advanced invoice management platform for modern businesses
          </p>
          <div className="text-gray-500 text-sm">
            © 2025 EasyInvoicePro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EasyInvoiceProLanding;