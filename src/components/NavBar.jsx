import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home as HomeIcon, 
  Coffee, 
  FileText, 
  Trash2, 
  Edit2,
  Settings,
  Bell,
  Download,
  Upload,
  Mail,
  Menu,
  X,
  Eye,
  Edit3,
  Sparkles
} from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

const BackButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const goBack = () => {
    const currentPath = window.location.pathname;
    if (window.history.length > 1) {
      window.history.back();
      setTimeout(() => {
        if (window.location.pathname === currentPath) {
          navigate('/');
        }
      }, 200);
    } else {
      navigate('/');
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          onClick={goBack} 
          aria-label="Go back"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative p-2.5 rounded-xl backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft 
            className={`h-4 w-4 text-slate-700 transition-all duration-300 ${
              isHovered ? 'text-blue-600 -translate-x-0.5' : ''
            }`} 
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="text-sm font-medium">Go back</div>
      </TooltipContent>
    </Tooltip>
  );
};

const Dropdown = ({ trigger, children, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignmentClasses = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      <div className={`absolute top-full mt-2 w-80 z-50 transition-all duration-300 transform-gpu ${alignmentClasses} ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="backdrop-blur-2xl bg-white/80 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20" />
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const DropdownItem = ({ icon, children, onClick, href, className = '', danger = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseClasses = `group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer relative overflow-hidden ${
    danger 
      ? 'text-red-600 hover:text-red-700 hover:bg-red-50/60' 
      : 'text-slate-700 hover:text-slate-900 hover:bg-blue-50/60'
  }`;
  
  const content = (
    <>
      <div className={`absolute inset-0 transition-all duration-200 ${
        danger 
          ? 'bg-gradient-to-r from-red-500/5 to-red-500/10' 
          : 'bg-gradient-to-r from-blue-500/5 to-blue-500/10'
      } ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      {icon && React.cloneElement(icon, { 
        className: `h-4 w-4 transition-all duration-200 ${
          danger ? 'text-red-500' : 'text-slate-500 group-hover:text-blue-600'
        } ${isHovered ? 'scale-110' : ''}` 
      })}
      <span className="relative font-medium">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link 
        to={href} 
        className={`${baseClasses} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <div 
      onClick={onClick} 
      className={`${baseClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </div>
  );
};

const DropdownSeparator = () => (
  <div className="border-t border-white/20 my-1 mx-4" />
);

const MobileMenu = ({ isOpen, onClose, nav }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <div className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={onClose} />
      
      {/* Mobile Menu Panel */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 backdrop-blur-2xl bg-white/90 border-l border-white/20 shadow-2xl z-50 transition-all duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-blue-50/20" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-slate-900">Navigation</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl hover:bg-white/40 transition-all duration-200 hover:scale-105"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <div className="relative py-4 space-y-1 px-4">
          {nav.map((n, index) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={onClose}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] relative overflow-hidden ${
                pathname === n.to 
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 shadow-md border border-blue-200/30' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              {React.cloneElement(n.icon, { 
                className: `h-5 w-5 transition-all duration-200 ${
                  pathname === n.to ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
                }`
              })}
              <span className="relative font-medium">{n.title}</span>
            </Link>
          ))}
          
          <div className="border-t border-white/20 my-4 mx-4" />
          
          {/* Tools Section */}
          <div className="px-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Settings className="h-3 w-3" />
              Quick Actions
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('app:fillDummyData'));
                  onClose();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/40 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <Edit2 className="h-4 w-4 text-slate-500" />
                Fill Sample Data
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('app:clearForm'));
                  onClose();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/40 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
                Clear All Data
              </button>
            </div>
          </div>

          {/* Mobile Receipt/Invoice Button */}
          <div className="px-4 pt-4">
            <button
              onClick={() => {
                if (pathname.startsWith('/receipt')) {
                  navigate('/');
                } else {
                  navigate('/receipt');
                }
                onClose();
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-white font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-[1.02] shadow-lg"
            >
              {pathname.startsWith('/receipt') ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {pathname.startsWith('/receipt') ? 'Invoice' : 'Receipt'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const nav = [
    { title: "Home", to: "/home", icon: <HomeIcon className="h-4 w-4" /> },
    { title: 'Blog', to: '/blog', icon: <FileText className="h-4 w-4" /> },
    { title: 'How we improve', to: '/improve', icon: <Coffee className="h-4 w-4" /> },
    { title: 'Contact', to: '/contact', icon: <Mail className="h-4 w-4" /> },
  ];

  // Enhanced Receipt/Invoice button handler
  const handleReceiptInvoiceClick = () => {
    if (pathname.startsWith('/receipt')) {
      // Go back to invoice form/editor
      navigate('/');
    } else {
      // Go to receipt preview
      try {
        // First try the custom event for existing app integration
        const event = new CustomEvent('app:goReceipt', {
          detail: { 
            source: 'navbar',
            currentPath: pathname 
          }
        });
        window.dispatchEvent(event);
        
        // Fallback navigation after a short delay to allow custom event processing
        setTimeout(() => {
          if (!pathname.startsWith('/receipt')) {
            navigate('/receipt');
          }
        }, 100);
      } catch (error) {
        // Direct navigation fallback
        console.warn('Custom event failed, using direct navigation:', error);
        navigate('/receipt');
      }
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-2xl bg-white/70 shadow-xl border-b border-white/20' 
          : 'backdrop-blur-xl bg-white/60 shadow-lg'
      }`}>
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-blue-50/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center relative">
            
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <BackButton />
              
              <Link to="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    EasyInvoicePro
                  </div>
                  <div className="text-xs text-slate-500 font-medium -mt-0.5 group-hover:text-blue-500 transition-colors duration-300">
                    Professional Invoicing
                  </div>
                </div>
              </Link>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="group relative"
                >
                  <div className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 relative overflow-hidden backdrop-blur-sm ${
                    pathname === n.to 
                      ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 shadow-md border border-blue-200/30' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/40 border border-transparent hover:border-white/20'
                  }`}>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {React.cloneElement(n.icon, { 
                      className: `transition-all duration-200 ${
                        pathname === n.to ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
                      }` 
                    })}
                    <span className="relative">{n.title}</span>
                    
                    {/* Active indicator */}
                    {pathname === n.to && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block h-6 w-px bg-white/30 mr-2" />
              
              {/* Tools Dropdown */}
              <Dropdown
                trigger={
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        aria-label="Tools and Settings"
                        className="group relative p-2.5 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105 shadow-sm"
                      >
                        <Settings className="h-4 w-4 text-slate-700 group-hover:text-blue-600 transition-all duration-200" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <div className="text-sm font-medium">Tools & Settings</div>
                    </TooltipContent>
                  </Tooltip>
                }
                align="right"
              >
                <div className="px-4 py-3 border-b border-white/20">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    Quick Tools
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Manage your data</div>
                </div>
                
                <DropdownItem
                  icon={<Edit2 />}
                  onClick={() => window.dispatchEvent(new CustomEvent('app:fillDummyData'))}
                >
                  Fill Sample Data
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem
                  icon={<Trash2 />}
                  onClick={() => window.dispatchEvent(new CustomEvent('app:clearForm'))}
                  danger={true}
                >
                  Clear All Data
                </DropdownItem>
              </Dropdown>

              {/* Notifications */}
              <Dropdown
                trigger={
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        aria-label="Notifications"
                        className="group relative p-2.5 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105 shadow-sm"
                      >
                        <Bell className="h-4 w-4 text-slate-700 group-hover:text-blue-600 transition-all duration-200" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-sm"></span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <div className="text-sm font-medium">3 New Notifications</div>
                    </TooltipContent>
                  </Tooltip>
                }
                align="right"
              >
                <div className="px-4 py-3 border-b border-white/20">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Bell className="h-4 w-4 text-blue-500" />
                    Notifications
                  </div>
                  <div className="text-xs text-slate-500 font-medium">3 unread messages</div>
                </div>
                
                <DropdownItem>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-sm text-slate-900">Invoice #25-4521 paid</div>
                    <div className="text-xs text-slate-500">Payment received from John Smith</div>
                    <div className="text-xs text-blue-600 font-medium">2 minutes ago</div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-sm text-slate-900">New client registered</div>
                    <div className="text-xs text-slate-500">Sarah Johnson joined your client list</div>
                    <div className="text-xs text-blue-600 font-medium">1 hour ago</div>
                  </div>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem className="text-center text-blue-600 hover:bg-blue-50/60 font-semibold">
                  View all notifications
                </DropdownItem>
              </Dropdown>

              {/* Enhanced Receipt/Invoice Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    aria-label={pathname.startsWith('/receipt') ? 'Go back to invoice editor' : 'Preview receipt'}
                    onClick={handleReceiptInvoiceClick}
                    className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-white text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm border border-blue-400/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                    
                    {pathname.startsWith('/receipt') ? (
                      <Edit3 className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    ) : (
                      <Eye className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    )}
                    
                    <span className="hidden md:inline relative font-bold">
                      {pathname.startsWith('/receipt') ? 'Invoice' : 'Receipt'}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <div className="text-sm font-bold">
                    {pathname.startsWith('/receipt') 
                      ? 'Return to Invoice Editor' 
                      : `Generate Receipt Preview`
                    }
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {pathname.startsWith('/receipt') 
                      ? 'Go back to create/edit invoices' 
                      : `View your invoice as a receipt`
                    }
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden group relative p-2.5 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105 shadow-sm"
              >
                <Menu className="h-4 w-4 text-slate-700 group-hover:text-blue-600 transition-colors duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        nav={nav}
      />
    </>
  );
};

export default NavBar;