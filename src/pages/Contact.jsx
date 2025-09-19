import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Award, Zap, ArrowRight, Star, Sparkles } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-7 w-7" />,
      title: 'For Any Query',
      content: 'arshmanrasool75@gmail.com',
      description: '24/7',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '0ms'
    },
    {
      icon: <Phone className="h-7 w-7" />,
      title: 'Phone Support',
      content: '03481776890',
      description: 'Direct line to owner',
      gradient: 'from-emerald-500 to-teal-500',
      delay: '100ms'
    },
    {
      icon: <MapPin className="h-7 w-7" />,
      title: 'Headquarters',
      content: 'Eden Value Home',
      description: 'Lahore, Pakistan',
      gradient: 'from-purple-500 to-pink-500',
      delay: '200ms'
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: 'Availability',
      content: 'Monday - Friday',
      description: '8:00 AM - 5:00 PM PST',
      gradient: 'from-orange-500 to-red-500',
      delay: '300ms'
    }
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, number: '10K+', label: 'Happy Clients' },
    { icon: <MessageSquare className="h-8 w-8" />, number: '24/7', label: 'Support' },
    { icon: <Award className="h-8 w-8" />, number: '99.9%', label: 'Uptime' },
    { icon: <Zap className="h-8 w-8" />, number: '<2min', label: 'Response Time' }
  ];

  const faqs = [
    {
      question: 'How do I export my invoice data?',
      answer: 'Export your data seamlessly using our advanced Tools dropdown. We support PDF, Excel, CSV, and custom formats with real-time processing.',
      icon: '📊'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely! We use military-grade encryption and local storage. Your sensitive business data never leaves your device - complete privacy guaranteed.',
      icon: '🔒'
    },
    {
      question: 'Can I customize invoice templates?',
      answer: 'Yes! Our premium template engine offers unlimited customization with brand colors, logos, custom fields, and professional layouts.',
      icon: '🎨'
    },
    {
      question: 'Do you offer integrations?',
      answer: 'We integrate with 50+ popular business tools including QuickBooks, Stripe, PayPal, and major CRM platforms for seamless workflow.',
      icon: '🔗'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main flowing orb */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)',
            left: mousePosition.x / 15 + scrollY / 3,
            top: mousePosition.y / 15 + scrollY / 5,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'blur(60px)'
          }}
        />
        
        {/* Floating gradient orbs */}
        <div className="absolute -top-96 -right-96 w-[800px] h-[800px] bg-gradient-conic from-blue-400 via-purple-500 to-cyan-400 rounded-full opacity-20 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute -bottom-96 -left-96 w-[700px] h-[700px] bg-gradient-conic from-emerald-400 via-blue-500 to-purple-400 rounded-full opacity-15 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-purple-100/40" />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239333ea' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
          }}
        />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          >
            <div 
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60 animate-pulse shadow-lg"
              style={{
                filter: 'blur(1px)',
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          </div>
        ))}
        
        {/* Sparkle effects */}
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute w-4 h-4 text-yellow-400 opacity-40 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header Section with Enhanced Styling */}
      <div className="relative z-10">
        <div className="bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              {/* Premium badge with enhanced animation */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-full border border-blue-200/30 mb-8 shadow-2xl hover:scale-105 transition-all duration-500 group">
                <Star className="h-5 w-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-sm text-slate-700 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Premium Support Experience
                </span>
                <Star className="h-5 w-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
              
              {/* Enhanced main title with better typography */}
              <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tight leading-none">
                <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-purple-700 bg-clip-text text-transparent animate-gradient-x">
                  Let's Connect
                </span>
              </h1>
              
              {/* Subtitle with improved spacing and animation */}
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Experience world-class support for <span className="font-bold text-blue-600">EasyInvoicePro</span>
                </p>
                <p className="text-lg text-slate-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Our dedicated team of experts is ready to elevate your invoicing experience to new heights.
                </p>
              </div>

              {/* Enhanced Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
                  >
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-3xl border border-white/30 mb-6 group-hover:scale-110 transition-all duration-500 shadow-2xl group-hover:shadow-blue-500/25">
                        <div className="text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                          {stat.icon}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    </div>
                    <div className="text-4xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="space-y-24">
            {/* Contact Info & FAQ Section with stagger animation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left Column - Contact Info */}
              <div className="animate-fade-in-left">
                <h2 className="text-4xl font-black text-slate-800 mb-12 flex items-center gap-4">
                  <div className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-xl animate-pulse" />
                  <span className="bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
                    Contact Information
                  </span>
                </h2>
                
                <div className="grid gap-8">
                  {contactInfo.map((item, index) => (
                    <div 
                      key={index} 
                      className="group relative overflow-hidden animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-6 p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 hover:bg-white/90 hover:border-blue-200/50 transition-all duration-700 hover:transform hover:scale-105 hover:-translate-y-2 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-blue-500/25">
                        <div className={`flex-shrink-0 w-18 h-18 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          {item.icon}
                          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-slate-800 mb-3 text-xl group-hover:text-blue-600 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-slate-700 font-bold mb-2 text-lg group-hover:text-slate-900 transition-colors duration-300">
                            {item.content}
                          </p>
                          <p className="text-slate-500 text-sm font-medium">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-500" />
                      </div>
                      
                      {/* Enhanced hover effects */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur -z-10" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - FAQ */}
              <div className="animate-fade-in-right">
                <h3 className="text-4xl font-black text-slate-800 mb-12 flex items-center gap-4">
                  <div className="w-3 h-10 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full shadow-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h3>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="group p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 hover:bg-white/90 hover:border-emerald-200/50 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                    >
                      <div className="flex items-start gap-6">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {faq.icon}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-800 mb-4 text-lg group-hover:text-emerald-600 transition-colors duration-300">
                            {faq.question}
                          </h4>
                          <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur -z-10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form Section */}
            <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white/30 p-12 relative overflow-hidden shadow-2xl">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-purple-50/50" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
                  <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(147,51,234,0.1)_0%,_transparent_50%)]" />
                  
                  <div className="relative z-10">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-black text-slate-800 mb-4 flex items-center justify-center gap-4">
                        <div className="w-3 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-xl animate-pulse" />
                        <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                          Send us a Message
                        </span>
                        <div className="w-3 h-10 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full shadow-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                      </h2>
                      <p className="text-slate-600 text-lg">Ready to transform your business? Let's start the conversation.</p>
                    </div>
                    
                    {isSubmitted ? (
                      <div className="text-center py-20 animate-fade-in">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-2xl">
                            <CheckCircle className="h-12 w-12 text-white" />
                          </div>
                          <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-full blur-xl animate-pulse" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                          Message Sent Successfully! 🎉
                        </h3>
                        <p className="text-slate-600 text-xl leading-relaxed">
                          Thank you for reaching out. Our expert team will respond within 2 minutes during business hours.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="group">
                            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-4">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField('')}
                              className="w-full px-6 py-5 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 hover:bg-white/80 shadow-lg hover:shadow-xl text-lg font-medium"
                              placeholder="Usama Umar"
                            />
                            <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 shadow-lg rounded-full ${focusedField === 'name' ? 'w-full mt-2 opacity-100' : 'w-0 opacity-0'}`} />
                          </div>
                          
                          <div className="group">
                            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-4">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField('')}
                              className="w-full px-6 py-5 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 hover:bg-white/80 shadow-lg hover:shadow-xl text-lg font-medium"
                              placeholder="Usama@company.com"
                            />
                            <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 shadow-lg rounded-full ${focusedField === 'email' ? 'w-full mt-2 opacity-100' : 'w-0 opacity-0'}`} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="group">
                            <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-4">
                              Company
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('company')}
                              onBlur={() => setFocusedField('')}
                              className="w-full px-6 py-5 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 hover:bg-white/80 shadow-lg hover:shadow-xl text-lg font-medium"
                              placeholder="Your Company Name"
                            />
                            <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 shadow-lg rounded-full ${focusedField === 'company' ? 'w-full mt-2 opacity-100' : 'w-0 opacity-0'}`} />
                          </div>

                          <div className="group">
                            <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-4">
                              Subject *
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              required
                              value={formData.subject}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('subject')}
                              onBlur={() => setFocusedField('')}
                              className="w-full px-6 py-5 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 hover:bg-white/80 cursor-pointer shadow-lg hover:shadow-xl text-lg font-medium"
                            >
                              <option value="" className="bg-white text-slate-800">Select a subject</option>
                              <option value="general" className="bg-white text-slate-800">General Inquiry</option>
                              <option value="support" className="bg-white text-slate-800">Technical Support</option>
                              <option value="billing" className="bg-white text-slate-800">Billing Question</option>
                              <option value="feature" className="bg-white text-slate-800">Feature Request</option>
                              <option value="bug" className="bg-white text-slate-800">Bug Report</option>
                              <option value="partnership" className="bg-white text-slate-800">Partnership Inquiry</option>
                            </select>
                            <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 shadow-lg rounded-full ${focusedField === 'subject' ? 'w-full mt-2 opacity-100' : 'w-0 opacity-0'}`} />
                          </div>
                        </div>

                        <div className="group">
                          <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-4">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField('')}
                            className="w-full px-6 py-5 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/50 transition-all duration-500 hover:bg-white/80 resize-none shadow-lg hover:shadow-xl text-lg font-medium leading-relaxed"
                            placeholder="Tell us about your project, challenges, or how we can help you succeed..."
                          />
                          <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 shadow-lg rounded-full ${focusedField === 'message' ? 'w-full mt-2 opacity-100' : 'w-0 opacity-0'}`} />
                        </div>

                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                          className="group relative w-full overflow-hidden px-10 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-black rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 text-xl shadow-xl"
                        >
                          {/* Animated shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          
                          {/* Pulsing background effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                          
                          <div className="relative flex items-center justify-center gap-4">
                            {isSubmitting ? (
                              <React.Fragment>
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                <span className="animate-pulse">Sending Magic...</span>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                <span>Send Message</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                              </React.Fragment>
                            )}
                          </div>
                          
                          {/* Floating particles on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                                style={{
                                  left: `${20 + i * 10}%`,
                                  top: `${20 + (i % 2) * 60}%`,
                                  animationDelay: `${i * 0.2}s`,
                                  animationDuration: '2s'
                                }}
                              />
                            ))}
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced outer glow effects */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-cyan-400/30 rounded-[2rem] blur-xl -z-10 animate-pulse" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-cyan-300/20 rounded-[2rem] blur-2xl -z-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-30px) rotate(270deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        /* Enhanced glassmorphism effects */
        .backdrop-blur-2xl {
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced shadow variations */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;