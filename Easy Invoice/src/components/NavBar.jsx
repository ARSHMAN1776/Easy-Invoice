import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home as HomeIcon, Coffee, FileText, Trash2, Edit2 } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    const currentPath = window.location.pathname;
    if (window.history.length > 1) {
      window.history.back();
      // if location didn't change after a short delay, fallback to '/'
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
    <button onClick={goBack} aria-label="Go back" className="p-2 rounded-md hover:bg-gray-100">
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();
  const nav = [
    { title: 'Home', to: '/', icon: <HomeIcon className="h-5 w-5" /> },
    { title: 'Blog', to: '/blog', icon: <FileText className="h-5 w-5" /> },
    { title: 'How we improve', to: '/improve', icon: <Coffee className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-white backdrop-blur-sm border-b border-slate-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <BackButton />
            <Link to="/" className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-slate-100 text-slate-800 font-medium text-sm">E</span>
              <span className="text-sm font-semibold text-slate-900 tracking-tight">EasyInvoicePro</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${pathname === n.to ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                {React.cloneElement(n.icon, { className: 'h-4 w-4 text-slate-400' })}
                <span>{n.title}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block h-6 w-px bg-slate-100 mr-2" aria-hidden />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="Clear form"
                  onClick={() => window.dispatchEvent(new CustomEvent('app:clearForm'))}
                  className="p-2 rounded-md text-slate-600 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">Clear all data</div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="Fill dummy data"
                  onClick={() => window.dispatchEvent(new CustomEvent('app:fillDummyData'))}
                  className="p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={6} className="max-w-xs">
                <div className="text-sm">Populate the form with sample data.</div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="Go to receipt"
                  onClick={() => {
                    if (pathname.startsWith('/receipt')) {
                      // If already on receipt, take user back to main page
                      window.location.pathname = '/';
                    } else {
                      window.dispatchEvent(new CustomEvent('app:goReceipt'));
                    }
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-indigo-700 text-sm font-medium bg-white border border-indigo-100 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <FileText className="h-4 w-4 text-indigo-600" />
                  <span className="hidden md:inline">{pathname.startsWith('/receipt') ? 'Invoice' : 'Receipt'}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={6} className="max-w-xs">
                <div className="text-sm font-semibold">Invoice #{new Date().getFullYear().toString().slice(-2)}-{Math.floor(Math.random()*9000+1000)}</div>
                <div className="text-xs text-slate-500">Date: {new Date().toISOString().split('T')[0]}</div>
                <div className="mt-2 text-sm text-slate-600">Open the invoice preview for details.</div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
