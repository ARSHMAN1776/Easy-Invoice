import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:20px_20px] opacity-20"></div>
      
      {/* Accent gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Compact single row layout */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Brand section */}
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">EasyInvoicePro</h3>
              <p className="text-base text-slate-300 mt-1">Professional Invoice Solutions</p>
            </div>
          </div>
          
          {/* Quick Links - horizontal */}
         <div className="flex items-center space-x-10">
  {[
    { name: 'Templates', href: '/template' },
    { name: 'Support', href: '/contact' },
    { name: 'Privacy', href: '/contact' }
  ].map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-base font-medium py-2"
    >
      {item.name}
    </a>
  ))}
</div>
          
          {/* Copyright & Social */}
          <div className="flex items-center space-x-8">
            <p className="text-slate-200 text-lg font-medium hidden md:block">
              © {new Date().getFullYear()} EasyInvoicePro • Built by{" "}
              <span className="text-blue-400 font-bold">Arshman Rasool</span>
            </p>
            <div className="flex space-x-4">
              {/* GitHub */}
              <a
                href="https://github.com/ARSHMAN1776"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 group"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.05.14 3.01.41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.83 1.1.83 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/arshman-rasool-364591338/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.07-2.06 2.07zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1CTGGmdEuw/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.07C24 5.37 18.63 0 12 0S0 5.37 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile copyright */}
        <div className="mt-8 text-center md:hidden">
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            © {new Date().getFullYear()} EasyInvoicePro • Built by{" "}
            <span className="text-blue-400 font-bold">Arshman Rasool</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;