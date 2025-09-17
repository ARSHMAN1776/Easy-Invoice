import React, { useState } from 'react';
import { CheckCircle, Zap, FileText, DollarSign, Download, Code, Users, ArrowRight, Sparkles } from 'lucide-react';

const Improve = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-orange-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 transition-all duration-300 hover:bg-blue-200 cursor-default">
              <Sparkles className="w-4 h-4 mr-2" />
              Continuous Innovation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              How We Improve
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our mission is to revolutionize the billing experience for small businesses worldwide. 
              Discover our latest enhancements and upcoming features designed to streamline your workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-default">
            <div className="text-3xl font-bold text-green-600 mb-2">2</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-default">
            <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-default">
            <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
            <div className="text-gray-600">Planned</div>
          </div>
        </div>
      </div>

      {/* Improvements Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {improvements.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)} transition-all duration-300`}>
                      {item.status === 'completed' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Impact and Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Impact:</span>
                      <span className={`text-xs font-semibold ${getImpactColor(item.impact)}`}>
                        {item.impact}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-gray-400 transform transition-all duration-300 ${hoveredCard === item.id ? 'translate-x-1 text-blue-600' : ''}`} />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contribution Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          <div className="relative z-10">
            <Code className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to Contribute?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community of developers and help us build the future of business billing. 
              Your contributions make a real difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Open a Pull Request
              </button>
              <button className="px-8 py-4 bg-blue-500/20 text-white rounded-xl font-semibold hover:bg-blue-500/30 border border-white/20 transform hover:scale-105 transition-all duration-300">
                File an Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Improve;