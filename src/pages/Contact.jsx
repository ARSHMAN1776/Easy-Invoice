import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Award, Zap, ArrowRight, Star } from 'lucide-react';
import { Helmet } from "react-helmet";

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-l from-blue-500/25 to-cyan-500/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-500/25 to-blue-600/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full animate-bounce shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="bg-white/60 backdrop-blur-xl border-b border-blue-200/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-300/30 mb-6 shadow-lg">
                <Star className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-slate-700 font-medium">Premium Support Experience</span>
              </div>
              
              <h1 className="text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 tracking-tight">
                Let's Connect
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Experience world-class support for EasyInvoicePro. Our dedicated team of experts is ready to elevate your invoicing experience to new heights.
              </p>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl border border-blue-300/30 mb-4 group-hover:scale-110 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-500/30 group-hover:to-cyan-500/30 shadow-lg">
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-16">
            {/* Contact Info & FAQ Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column - Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg" />
                  Contact Information
                </h2>
                
                <div className="grid gap-6">
                  {contactInfo.map((item, index) => (
                    <div 
                      key={index} 
                      className="group relative overflow-hidden"
                      style={{ animationDelay: item.delay }}
                    >
                      <div className="flex items-start gap-6 p-8 bg-white/80 backdrop-blur-xl rounded-2xl border border-blue-200/50 hover:bg-white/90 hover:border-blue-300/60 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                        <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-700 font-semibold mb-2 text-lg">
                            {item.content}
                          </p>
                          <p className="text-slate-500 text-sm">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - FAQ */}
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full shadow-lg" />
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="group p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-blue-200/50 hover:bg-white/90 hover:border-blue-300/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{faq.icon}</div>
                        <div>
                          <h4 className="font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                            {faq.question}
                          </h4>
                          <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Section - Full Width */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-blue-200/50 p-10 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30" />
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg" />
                        Send us a Message
                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg" />
                      </h2>
                      <p className="text-slate-600">Ready to transform your business? Let's start the conversation.</p>
                    </div>
                    
                    {isSubmitted ? (
                      <div className="text-center py-16">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <CheckCircle className="h-10 w-10 text-white" />
                          </div>
                          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">
                          Message Sent Successfully! 🎉
                        </h3>
                        <p className="text-slate-600 text-lg">
                          Thank you for reaching out. Our expert team will respond within 2 minutes during business hours.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="group">
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
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
                              className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/80 shadow-sm"
                              placeholder="Usama Umar"
                            />
                            <div className={`h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 shadow-sm ${focusedField === 'name' ? 'w-full mt-1' : 'w-0'}`} />
                          </div>
                          
                          <div className="group">
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
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
                              className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/80 shadow-sm"
                              placeholder="Usama@company.com"
                            />
                            <div className={`h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 shadow-sm ${focusedField === 'email' ? 'w-full mt-1' : 'w-0'}`} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="group">
                            <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-3">
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
                              className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/80 shadow-sm"
                              placeholder="Your Company Name"
                            />
                            <div className={`h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 shadow-sm ${focusedField === 'company' ? 'w-full mt-1' : 'w-0'}`} />
                          </div>

                          <div className="group">
                            <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-3">
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
                              className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/80 cursor-pointer shadow-sm"
                            >
                              <option value="" className="bg-white text-slate-800">Select a subject</option>
                              <option value="general" className="bg-white text-slate-800">General Inquiry</option>
                              <option value="support" className="bg-white text-slate-800">Technical Support</option>
                              <option value="billing" className="bg-white text-slate-800">Billing Question</option>
                              <option value="feature" className="bg-white text-slate-800">Feature Request</option>
                              <option value="bug" className="bg-white text-slate-800">Bug Report</option>
                              <option value="partnership" className="bg-white text-slate-800">Partnership Inquiry</option>
                            </select>
                            <div className={`h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 shadow-sm ${focusedField === 'subject' ? 'w-full mt-1' : 'w-0'}`} />
                          </div>
                        </div>

                        <div className="group">
                          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
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
                            className="w-full px-6 py-4 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-white/80 resize-none shadow-sm"
                            placeholder="Tell us about your project, challenges, or how we can help you succeed..."
                          />
                          <div className={`h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 shadow-sm ${focusedField === 'message' ? 'w-full mt-1' : 'w-0'}`} />
                        </div>

                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                          className="group relative w-full overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg shadow-lg"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          
                          <div className="relative flex items-center justify-center gap-3">
                            {isSubmitting ? (
                              <React.Fragment>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending Magic...
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                Send Message
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </React.Fragment>
                            )}
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-blue-500/30 rounded-3xl blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;