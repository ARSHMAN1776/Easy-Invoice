import React, { useState, useEffect } from 'react';
import { CheckCircle, Zap, FileText, DollarSign, Download, Code, Users, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const Improve = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setAnimateStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const improvements = [
    { 
      id: 1, 
      title: 'Cleaner Templates', 
      description: 'We standardized templates to make them easier to customize and print with consistent formatting across all document types.',
      icon: FileText,
      status: 'completed',
      impact: 'High'
    },
    { 
      id: 2, 
      title: 'Flexible Currency Support', 
      description: 'Add or remove currencies via a single utils file without touching templates, supporting 50+ global currencies.',
      icon: DollarSign,
      status: 'completed',
      impact: 'Medium'
    },
    { 
      id: 3, 
      title: 'PDF Export Improvements', 
      description: 'Better PDF generation with consistent layout and font sizing across templates, reducing file size by 40%.',
      icon: Download,
      status: 'in-progress',
      impact: 'High'
    },
    { 
      id: 4, 
      title: 'API Integration', 
      description: 'Seamless integration with popular accounting software and payment gateways for automated workflows.',
      icon: Zap,
      status: 'planned',
      impact: 'High'
    },
    { 
      id: 5, 
      title: 'Advanced Customization', 
      description: 'Theme builder with drag-and-drop interface for creating branded invoice templates without coding.',
      icon: Sparkles,
      status: 'planned',
      impact: 'Medium'
    },
    { 
      id: 6, 
      title: 'Team Collaboration', 
      description: 'Multi-user support with role-based permissions and real-time collaboration features.',
      icon: Users,
      status: 'planned',
      impact: 'High'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in-progress': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'planned': return 'bg-violet-100 text-violet-800 border-violet-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-amber-600 bg-amber-50';
      case 'Low': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-blue-800 text-sm font-medium mb-8 transition-all duration-1000 hover:bg-white hover:shadow-lg cursor-default border border-blue-100/50 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Continuous Innovation
              <TrendingUp className="w-4 h-4 ml-2" />
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              How We Improve
            </h1>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Our mission is to revolutionize the billing experience for small businesses worldwide. 
              Discover our latest enhancements and upcoming features designed to streamline your workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`relative text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 cursor-default group overflow-hidden ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 group-hover:from-emerald-500/10 group-hover:to-emerald-600/10 transition-all duration-500"></div>
            <div className="relative">
              <div className="text-4xl font-bold text-emerald-600 mb-3 group-hover:scale-110 transition-transform duration-300">2</div>
              <div className="text-gray-600 font-medium">Completed</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-100 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className={`relative text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 cursor-default group overflow-hidden delay-200 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-sky-600/5 group-hover:from-sky-500/10 group-hover:to-sky-600/10 transition-all duration-500"></div>
            <div className="relative">
              <div className="text-4xl font-bold text-sky-600 mb-3 group-hover:scale-110 transition-transform duration-300">1</div>
              <div className="text-gray-600 font-medium">In Progress</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-sky-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className={`relative text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 cursor-default group overflow-hidden delay-300 ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-violet-600/5 group-hover:from-violet-500/10 group-hover:to-violet-600/10 transition-all duration-500"></div>
            <div className="relative">
              <div className="text-4xl font-bold text-violet-600 mb-3 group-hover:scale-110 transition-transform duration-300">3</div>
              <div className="text-gray-600 font-medium">Planned</div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-violet-100 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Improvements Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {improvements.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className={`group relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-[1.05] transition-all duration-700 cursor-pointer overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${800 + index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Enhanced Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced Icon and Status */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                      <IconComponent className="w-7 h-7 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(item.status)} transition-all duration-500 group-hover:scale-105 shadow-sm`}>
                      {item.status === 'completed' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                    </div>
                  </div>

                  {/* Enhanced Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-500 leading-tight">
                    {item.title}
                  </h3>

                  {/* Enhanced Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Enhanced Impact and Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500 font-medium">Impact:</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getImpactColor(item.impact)} transition-all duration-300 group-hover:scale-105`}>
                        {item.impact}
                      </span>
                    </div>
                    <div className={`p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-all duration-300 ${hoveredCard === item.id ? 'translate-x-2 rotate-12' : ''}`}>
                      <ArrowRight className={`w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-300`} />
                    </div>
                  </div>
                </div>

                {/* Enhanced Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-500"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500 delay-100"></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500 delay-200"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Contribution Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className={`relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-16 text-center shadow-2xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} delay-1000`}>
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          {/* Floating code symbols */}
          <div className="absolute top-8 left-8 text-white/20 text-2xl animate-bounce delay-300">&lt;/&gt;</div>
          <div className="absolute top-12 right-12 text-white/20 text-xl animate-pulse delay-700">{}</div>
          <div className="absolute bottom-8 left-16 text-white/20 text-lg animate-bounce delay-500">[]</div>
          
          <div className="relative z-10">
            <div className="relative inline-block mb-8">
              <Code className="w-20 h-20 text-white mx-auto animate-pulse" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping"></div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Want to Contribute?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our community of developers and help us build the future of business billing. 
              Your contributions make a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-white/25 overflow-hidden">
                <span className="relative z-10">Open a Pull Request</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-10 py-5 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 border border-white/30 hover:border-white/50 transform hover:scale-110 transition-all duration-300 shadow-xl overflow-hidden">
                <span className="relative z-10">File an Issue</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Improve;