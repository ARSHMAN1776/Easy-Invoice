import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-t from-white/60 dark:from-slate-900/60">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} EasyInvoicePro. All rights reserved.
          </div>

          <div className="flex-1 text-center md:text-right">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Designed &amp; built by <span className="font-medium">Arshman Rasool</span>
            </div>
          </div>

          {/* removed Home link as requested; footer now contains only copyright and credit */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
