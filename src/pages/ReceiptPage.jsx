import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, RefreshCw, FileText, RotateCw, Download, Printer, ChevronDown, Plus, Trash2, Building2, Receipt, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Receipt1 from "../components/templates/Receipt1";
import Receipt2 from "../components/templates/Receipt2";
import Receipt3 from "../components/templates/Receipt3";
import Receipt4 from "../components/templates/Receipt4";
import { formatCurrency } from "../utils/formatCurrency";
import { WORLD_CURRENCIES } from "../utils/currencies";
import { generateReceiptPDF } from "../utils/receiptPDFGenerator";
import { generateGSTNumber } from "../utils/invoiceCalculations";
import FloatingLabelInput from "../components/FloatingLabelInput";
import ItemDetails from "../components/ItemDetails";

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

const footerOptions = [
  "Thank you for choosing us today! We hope your shopping experience was pleasant and seamless. Your satisfaction matters to us, and we look forward to serving you again soon. Keep this receipt for any returns or exchanges.",
  "Your purchase supports our community! We believe in giving back and working towards a better future. Thank you for being a part of our journey. We appreciate your trust and hope to see you again soon.",
  
];

const ReceiptPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const receiptRef = useRef(null);
  const currencyRef = useRef(null);

  const [billTo, setBillTo] = useState("");
  const [invoice, setInvoice] = useState({
    date: "",
    number: generateRandomInvoiceNumber(),
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    gst: "",
  });
  const [cashier, setCashier] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 0, amount: 0, total: 0 },
  ]);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [theme, setTheme] = useState("Receipt1");
  const [notes, setNotes] = useState("");
  const [footer, setFooter] = useState("Thank you");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const prevStateRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const refreshFooter = () => {
    const randomIndex = Math.floor(Math.random() * footerOptions.length);
    setFooter(footerOptions[randomIndex]);
  };

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem("receiptFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || "");
      setInvoice(parsedData.invoice || { date: "", number: generateRandomInvoiceNumber() });
      setYourCompany(parsedData.yourCompany || { name: "", address: "", phone: "", gst: "" });
      setCashier(parsedData.cashier || "");
      setItems(parsedData.items || [{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
      setTaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
      setFooter(parsedData.footer || "Thank you");
      // Prefer selectedCurrency from receiptFormData; if missing, try main formData localStorage
      let currency = parsedData.selectedCurrency;
      if (!currency) {
        try {
          const mainForm = localStorage.getItem('formData');
          if (mainForm) {
            const mainParsed = JSON.parse(mainForm);
            currency = mainParsed.selectedCurrency;
          }
        } catch (e) {
          // ignore JSON errors
        }
      }
      setSelectedCurrency(currency || "USD");
    } else {
      // Initialize with default values if nothing in localStorage
      setInvoice((prev) => ({ ...prev, number: generateRandomInvoiceNumber() }));
      setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      billTo,
      invoice,
      yourCompany,
      cashier,
      items,
      taxPercentage,
      notes,
      footer,
      selectedCurrency,
    };
    localStorage.setItem("receiptFormData", JSON.stringify(formData));
  }, [billTo, invoice, yourCompany, cashier, items, taxPercentage, notes, footer, selectedCurrency]);

  // Listen for global NavBar events to fill or clear receipt data
  useEffect(() => {
    const fillSample = () => {
      // only act if currently viewing receipt page
      if (!window.location.pathname.startsWith('/receipt')) return;
      // save previous state so user could restore if needed
      if (!prevStateRef.current) {
        prevStateRef.current = {
          billTo,
          invoice,
          yourCompany,
          cashier,
          items,
          taxPercentage,
          notes,
          footer,
          selectedCurrency,
        };
      }

      setBillTo('Acme Store');
      setInvoice({ date: new Date().toISOString().split('T')[0], number: generateRandomInvoiceNumber() });
      setYourCompany({ name: 'Arshman Rasool', address: '123 Main St, City', phone: '+1 555 123 4567', gst: generateGSTNumber() });
      setCashier('Arshman Rasool');
      const sampleItems = [
        { name: 'Notebook', description: 'A5 ruled notebook', quantity: 2, amount: 5.0, total: 10.0 },
        { name: 'Ballpoint Pen', description: 'Blue ink', quantity: 3, amount: 1.5, total: 4.5 },
      ];
      setItems(sampleItems);
      setTaxPercentage(5);
      setNotes('Sample receipt populated from NavBar');
      setFooter(footerOptions[Math.floor(Math.random() * footerOptions.length)]);
      // keep selectedCurrency as-is (user choice)
    };

    const clearAll = () => {
      if (!window.location.pathname.startsWith('/receipt')) return;
      // clear receipt fields and localStorage entry
      setBillTo('');
      setInvoice({ date: '', number: generateRandomInvoiceNumber() });
      setYourCompany({ name: '', address: '', phone: '', gst: '' });
      setCashier('');
      setItems([{ name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
      setTaxPercentage(0);
      setNotes('');
      setFooter('Thank you');
      try {
        localStorage.removeItem('receiptFormData');
      } catch (e) {}
      prevStateRef.current = null;
    };

    window.addEventListener('app:fillDummyData', fillSample);
    window.addEventListener('app:clearForm', clearAll);
    return () => {
      window.removeEventListener('app:fillDummyData', fillSample);
      window.removeEventListener('app:clearForm', clearAll);
    };
  }, [billTo, invoice, yourCompany, cashier, items, taxPercentage, notes, footer, selectedCurrency]);

  // Persist selectedCurrency immediately to main formData as well, so both pages stay in sync
  useEffect(() => {
    try {
      const mainForm = localStorage.getItem('formData');
      const parsed = mainForm ? JSON.parse(mainForm) : {};
      parsed.selectedCurrency = selectedCurrency;
      localStorage.setItem('formData', JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }
  }, [selectedCurrency]);

  const handleDownloadPDF = async () => {
    if (!isDownloading && receiptRef.current) {
      setIsDownloading(true);
      const receiptData = { // Prepare receiptData object
        billTo,
        invoice,
        yourCompany,
        cashier,
        items,
        taxPercentage,
        notes,
        footer,
        selectedCurrency,
      };
      try {
        await generateReceiptPDF(receiptRef.current, theme, receiptData);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
  };

  const calculateTaxAmount = () => {
    const subTotal = parseFloat(calculateSubTotal()) || 0;
    return subTotal * (taxPercentage / 100);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal()) || 0;
    const taxAmount = parseFloat(calculateTaxAmount()) || 0;
    return subTotal + taxAmount;
  };

  const selectedCurrencyObj = WORLD_CURRENCIES.find(c => c.code === selectedCurrency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Animated Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg animate-pulse">
              <Receipt className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Receipt Generator
              </h1>
              <p className="text-gray-600 text-sm">Create professional receipts instantly</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Enhanced Currency Dropdown */}
            <div className="relative" ref={currencyRef}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 hover:bg-gray-50 min-w-[160px]"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-2xl">{selectedCurrencyObj?.symbol || '$'}</span>
                  <div className="text-left">
                    <div className="font-semibold text-sm text-gray-700">{selectedCurrency}</div>
                    <div className="text-xs text-gray-500 truncate">{selectedCurrencyObj?.name}</div>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {currencyDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-60 overflow-y-auto animate-slide-down">
                  {WORLD_CURRENCIES.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedCurrency === currency.code ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <span className="text-xl">{currency.symbol}</span>
                      <div className="text-left flex-1">
                        <div className="font-medium text-sm text-gray-700">{currency.code}</div>
                        <div className="text-xs text-gray-500 truncate">{currency.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:bg-green-600 disabled:opacity-50 hover-lift"
            >
              {isPrinting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Printer className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 transform hover:scale-105 hover-lift"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6 animate-slide-in-left">
            {/* Company Information Card */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 receipt-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Company Name"
                  value={yourCompany.name}
                  onChange={handleInputChange(setYourCompany)}
                  name="name"
                />
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Phone Number"
                  value={yourCompany.phone}
                  onChange={handleInputChange(setYourCompany)}
                  name="phone"
                />
              </div>
              
              <FloatingLabelInput
                id="yourCompanyAddress"
                label="Address"
                value={yourCompany.address}
                onChange={handleInputChange(setYourCompany)}
                name="address"
                className="mt-4"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <FloatingLabelInput
                    id="yourCompanyGST"
                    label="GST Number"
                    value={yourCompany.gst}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 15);
                      handleInputChange(setYourCompany)({
                        target: { name: "gst", value },
                      });
                    }}
                    name="gst"
                    maxLength={15}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newGST = generateGSTNumber();
                      setYourCompany(prev => ({ ...prev, gst: newGST }));
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Generate new GST number"
                  >
                    <RotateCw className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                <FloatingLabelInput
                  id="cashier"
                  label="Cashier Name"
                  value={cashier}
                  onChange={(e) => setCashier(e.target.value)}
                  name="cashier"
                />
              </div>
            </div>

            {/* Customer Information Card */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 receipt-card">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Customer Information</h2>
              <FloatingLabelInput
                id="billTo"
                label="Customer Name"
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                name="billTo"
              />
            </div>

            {/* Invoice Information Card */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 receipt-card">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Invoice Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="invoiceNumber"
                  label="Invoice Number"
                  value={invoice.number}
                  onChange={handleInputChange(setInvoice)}
                  name="number"
                />
                <FloatingLabelInput
                  id="invoiceDate"
                  label="Invoice Date"
                  type="date"
                  value={invoice.date}
                  onChange={handleInputChange(setInvoice)}
                  name="date"
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 receipt-card">
              <ItemDetails
                items={items}
                handleItemChange={handleItemChange}
                addItem={addItem}
                removeItem={removeItem}
              />
            </div>

            {/* Totals Card */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Calculation Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(parseFloat(calculateSubTotal()), selectedCurrency)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Tax Rate (%):</span>
                  <input
                    type="number"
                    value={taxPercentage}
                    onChange={(e) => setTaxPercentage(parseFloat(e.target.value) || 0)}
                    className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="28"
                    step="1"
                  />
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                  <span className="text-gray-700">Tax Amount:</span>
                  <span className="font-semibold">{formatCurrency(parseFloat(calculateTaxAmount()), selectedCurrency)}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md">
                  <span className="text-lg font-bold">Grand Total:</span>
                  <span className="text-xl font-bold">{formatCurrency(parseFloat(calculateGrandTotal()), selectedCurrency)}</span>
                </div>
              </div>
            </div>

            {/* Notes and Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 receipt-card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  rows="4"
                  placeholder="Add any additional notes here..."
                />
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 receipt-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Footer Message</h3>
                  <button
                    type="button"
                    onClick={refreshFooter}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors hover-lift"
                    title="Generate random footer"
                  >
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <textarea
                  value={footer}
                  onChange={(e) => setFooter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  rows="4"
                  placeholder="Thank you message..."
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="animate-slide-in-right">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Live Preview</h2>
              
              {/* Theme Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Choose Template</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Receipt1', 'Receipt2', 'Receipt3', 'Receipt4'].map((receiptType) => (
                    <label key={receiptType} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={receiptType}
                        checked={theme === receiptType}
                        onChange={() => setTheme(receiptType)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                        theme === receiptType 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300 hover:border-blue-400'
                      }`}>
                        {theme === receiptType && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        theme === receiptType ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {receiptType}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Receipt Preview */}
              <div className="flex justify-center">
                <div 
                  ref={receiptRef} 
                  className="w-[380px] bg-white rounded-lg shadow-xl border border-gray-200 receipt-preview print-area"
                >
                  {theme === "Receipt1" && (
                    <Receipt1
                      data={{
                        billTo,
                        invoice,
                        yourCompany,
                        cashier,
                        items,
                        taxPercentage,
                        notes,
                        footer,
                        selectedCurrency,
                      }}
                    />
                  )}
                  {theme === "Receipt2" && (
                    <Receipt2
                      data={{
                        billTo,
                        invoice,
                        yourCompany,
                        cashier,
                        items,
                        taxPercentage,
                        notes,
                        footer,
                        selectedCurrency,
                      }}
                    />
                  )}
                  {theme === "Receipt3" && (
                    <Receipt3
                      data={{
                        billTo,
                        invoice,
                        yourCompany,
                        cashier,
                        items,
                        taxPercentage,
                        notes,
                        footer,
                        selectedCurrency,
                      }}
                    />
                  )}
                  {theme === "Receipt4" && (
                    <Receipt4
                      data={{
                        billTo,
                        invoice,
                        yourCompany,
                        items,
                        taxPercentage,
                        footer,
                        cashier,
                        selectedCurrency,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS animations and styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slide-in-left {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slide-in-right {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slide-down {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          
          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out;
          }
          
          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out 0.2s both;
          }
          
          .animate-slide-down {
            animation: slide-down 0.3s ease-out;
          }
          
          /* Custom scrollbar for currency dropdown */
          .max-h-60::-webkit-scrollbar {
            width: 6px;
          }
          
          .max-h-60::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }
          
          .max-h-60::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          
          .max-h-60::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          /* Print styles */
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
          
          /* Hover effects for cards */
          .receipt-card:hover {
            background-color: rgba(255, 255, 255, 0.85);
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }
          
          /* Focus styles for better accessibility */
          input:focus, textarea:focus, select:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          /* Button hover animations */
          .hover-lift:hover {
            transform: translateY(-1px);
            transition: transform 0.2s ease;
          }
          
          .hover-lift:active {
            transform: translateY(0);
          }
          
          /* Receipt preview hover effect */
          .receipt-preview:hover {
            transform: scale(1.02);
            transition: transform 0.3s ease;
          }
        `
      }} />
    </div>
  );
};

export default ReceiptPage;