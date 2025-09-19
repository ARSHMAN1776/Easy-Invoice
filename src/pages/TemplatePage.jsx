import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Download, Printer, FileText, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import InvoiceTemplate from '../components/InvoiceTemplate';
import { generatePDF } from '../utils/pdfGenerator';
import { templates } from '../utils/templateRegistry';

const TemplatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      setCurrentTemplate(location.state.selectedTemplate || 1);
    } else {
      // If no form data in location state, try to load from localStorage
      const savedFormData = localStorage.getItem('formData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
    
    // Trigger animation after component mounts
    setTimeout(() => setIsLoaded(true), 100);
  }, [location.state]);

  const handleTemplateChange = (templateNumber) => {
    setCurrentTemplate(templateNumber);
  };

  const handleDownloadPDF = async () => {
    if (formData && !isDownloading) {
      setIsDownloading(true);
      try {
        await generatePDF(formData, currentTemplate);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handlePrint = () => {
    if (formData && !isPrinting) {
      setIsPrinting(true);
      try {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        const invoiceElement = document.querySelector('.invoice-preview');
        
        if (printWindow && invoiceElement) {
          // Get all stylesheets from the current document
          const styles = Array.from(document.styleSheets)
            .map(styleSheet => {
              try {
                return Array.from(styleSheet.cssRules)
                  .map(rule => rule.cssText)
                  .join('');
              } catch (e) {
                console.log('Cannot access stylesheet');
                return '';
              }
            })
            .join('');

          // Get all style tags content
          const styleTags = Array.from(document.querySelectorAll('style'))
            .map(style => style.innerHTML)
            .join('');

          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Invoice - ${formData.invoiceNumber || 'INV001'}</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              
              <!-- Include Tailwind CSS -->
              <script src="https://cdn.tailwindcss.com"></script>
              
              <style>
                ${styles}
                ${styleTags}
                
                /* Additional print styles */
                body { 
                  margin: 0; 
                  padding: 20px; 
                  font-family: Arial, sans-serif;
                  background: white;
                  color: black;
                }
                
                .invoice-preview {
                  width: 100% !important;
                  height: auto !important;
                  box-shadow: none !important;
                  border: none !important;
                  background: white !important;
                }
                
                @media print {
                  body { 
                    margin: 0; 
                    padding: 0; 
                  }
                  @page { 
                    margin: 0.5in; 
                    size: A4;
                  }
                  .no-print {
                    display: none !important;
                  }
                }
                
                /* Ensure colors print */
                * {
                  -webkit-print-color-adjust: exact !important;
                  color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              </style>
            </head>
            <body>
              <div class="invoice-preview">
                ${invoiceElement.innerHTML}
              </div>
              
              <script>
                // Wait for content to load then print
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.close();
                  }, 500);
                };
              </script>
            </body>
            </html>
          `);
          printWindow.document.close();
        }
      } catch (error) {
        console.error('Error printing invoice:', error);
        
        // Fallback: Use browser's built-in print for the current page
        const originalContents = document.body.innerHTML;
        const invoiceElement = document.querySelector('.invoice-preview');
        
        if (invoiceElement) {
          document.body.innerHTML = `
            <div style="padding: 20px;">
              ${invoiceElement.innerHTML}
            </div>
          `;
          window.print();
          document.body.innerHTML = originalContents;
          window.location.reload(); // Reload to restore the page
        }
      } finally {
        setIsPrinting(false);
      }
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading invoice data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className={`relative z-10 container mx-auto px-4 py-8 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Header Section */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="group hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" /> 
                Back to Home
              </Button>
              <div className="flex items-center space-x-2 text-gray-600">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Invoice Templates</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handlePrint} 
                disabled={isPrinting}
                className="group bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isPrinting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Printing...
                  </>
                ) : (
                  <>
                    <Printer className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Print Invoice
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleDownloadPDF} 
                disabled={isDownloading}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Template Selection Section */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8 transition-all duration-700 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Choose Your Template</h2>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-2">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-w-[200px] ${
                    currentTemplate === index + 1
                      ? "border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-100"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTemplateChange(index + 1)}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      currentTemplate === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-gray-800">{template.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Template {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invoice Preview Section */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-700 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Invoice Preview</h2>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Template {currentTemplate}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="w-[210mm] h-[297mm] bg-white shadow-2xl rounded-lg overflow-hidden border transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl invoice-preview">
              <InvoiceTemplate data={formData} templateNumber={currentTemplate} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-8 transition-all duration-700 delay-600 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <p className="text-gray-500">
            Customize your invoice with professional templates
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TemplatePage;