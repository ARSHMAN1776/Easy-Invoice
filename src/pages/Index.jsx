import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from "../components/ItemDetails";
import { templates } from "../utils/templateRegistry";
import { FiEdit, FiFileText, FiTrash2, FiDollarSign, FiChevronDown } from "react-icons/fi";
import { RefreshCw, Sparkles, Zap, TrendingUp } from "lucide-react";

// Currency options with symbols and codes
const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

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

const noteOptions = [
  "Thank you for choosing us today! We hope your shopping experience was pleasant and seamless. Your satisfaction matters to us, and we look forward to serving you again soon. Keep this receipt for any returns or exchanges.",
  "Your purchase supports our community! We believe in giving back and working towards a better future. Thank you for being a part of our journey. We appreciate your trust and hope to see you again soon.",
  "We value your feedback! Help us improve by sharing your thoughts on the text message survey link. Your opinions help us serve you better and improve your shopping experience. Thank you for shopping with us!",
  "Did you know you can save more with our loyalty program? Ask about it on your next visit and earn points on every purchase. It's our way of saying thank you for being a loyal customer. See you next time!",
  "Need assistance with your purchase? We're here to help! Reach out to our customer support, or visit our website for more information. We're committed to providing you with the best service possible.",
  "Keep this receipt for returns or exchanges.",
  "Every purchase makes a difference! We are dedicated to eco-friendly practices and sustainability. Thank you for supporting a greener planet with us. Together, we can build a better tomorrow.",
  "Have a great day!",
  "Thank you for shopping with us today. Did you know you can return or exchange your items within 30 days with this receipt? We want to ensure that you're happy with your purchase, so don't hesitate to come back if you need assistance.",
  "Eco-friendly business. This receipt is recyclable.",
  "We hope you enjoyed your shopping experience! Remember, for every friend you refer, you can earn exclusive rewards. Visit www.example.com/refer for more details. We look forward to welcoming you back soon!",
  "Thank you for choosing us! We appreciate your business and look forward to serving you again. Keep this receipt for any future inquiries or returns.",
  "Your purchase supports local businesses and helps us continue our mission. Thank you for being a valued customer. We hope to see you again soon!",
  "We hope you had a great shopping experience today. If you have any feedback, please share it with us on our website. We are always here to assist you.",
  "Thank you for your visit! Remember, we offer exclusive discounts to returning customers. Check your email for special offers on your next purchase.",
  "Your satisfaction is our top priority. If you need any help or have questions about your purchase, don't hesitate to contact us. Have a great day!",
  "We love our customers! Thank you for supporting our business. Follow us on social media for updates on promotions and new products. See you next time!",
  "Every purchase counts! We are committed to making a positive impact, and your support helps us achieve our goals. Thank you for shopping with us today!",
  "We hope you found everything you needed. If not, please let us know so we can improve your experience. Your feedback helps us serve you better. Thank you!",
  "Thank you for visiting! Did you know you can save more with our rewards program? Ask about it during your next visit and start earning points today!",
  "We appreciate your trust in us. If you ever need assistance with your order, please visit our website or call customer service. We're here to help!",
];

// Enhanced Currency Dropdown Component
const CurrencyDropdown = ({ selectedCurrency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCurrencyObj = currencies.find(c => c.code === selectedCurrency);

  return (
    <div className="relative z-[100]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-lg backdrop-blur-sm group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <span className="text-white font-bold text-lg">{selectedCurrencyObj?.symbol}</span>
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-800">{selectedCurrencyObj?.code}</div>
            <div className="text-sm text-slate-600">{selectedCurrencyObj?.name}</div>
          </div>
        </div>
        <FiChevronDown className={`text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 z-[101] max-h-64 overflow-y-auto animate-fade-in-up backdrop-blur-xl">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              type="button"
              onClick={() => {
                onCurrencyChange(currency.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                selectedCurrency === currency.code ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-r-4 border-blue-500' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                selectedCurrency === currency.code 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                <span className="font-bold text-sm">{currency.symbol}</span>
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-slate-800">{currency.code}</div>
                <div className="text-sm text-slate-600">{currency.name}</div>
              </div>
              {selectedCurrency === currency.code && (
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [billTo, setBillTo] = useState({ name: "", address: "", phone: "" });
  const [shipTo, setShipTo] = useState({ name: "", address: "", phone: "" });
  const [invoice, setInvoice] = useState({
    date: "",
    paymentDate: "",
    number: "",
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [items, setItems] = useState([]);
  const [taxPercentage, settaxPercentage] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const refreshNotes = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * noteOptions.length);
      setNotes(noteOptions[randomIndex]);
      setIsRefreshing(false);
    }, 600);
  };

  useEffect(() => {
    // Load form data from memory instead of localStorage
    const savedFormData = null; // Replace localStorage usage
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || { name: "", address: "", phone: "" });
      setShipTo(parsedData.shipTo || { name: "", address: "", phone: "" });
      setInvoice(
        parsedData.invoice || { date: "", paymentDate: "", number: "" }
      );
      setYourCompany(
        parsedData.yourCompany || { name: "", address: "", phone: "" }
      );
      setItems(parsedData.items || []);
      settaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
      setSelectedCurrency(parsedData.selectedCurrency || "USD");
    } else {
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
    }
  }, []);

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
    updateTotals();
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
    const calculatedSubTotal = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
    setSubTotal(calculatedSubTotal);
    return calculatedSubTotal;
  };

  const calculateTaxAmount = (subTotalValue) => {
    const tax = (subTotalValue * taxPercentage) / 100;
    setTaxAmount(tax);
    return tax;
  };

  const calculateGrandTotal = (subTotalValue, taxAmountValue) => {
    const total = parseFloat(subTotalValue) + parseFloat(taxAmountValue);
    setGrandTotal(total);
    return total;
  };

  const updateTotals = () => {
    const currentSubTotal = calculateSubTotal();
    const currentTaxAmount = calculateTaxAmount(currentSubTotal);
    calculateGrandTotal(currentSubTotal, currentTaxAmount);
  };

  const handleTaxPercentageChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    settaxPercentage(taxRate);
  };

  useEffect(() => {
    updateTotals();
  }, [items, taxPercentage]);

  const handleTemplateClick = (templateNumber) => {
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency,
    };
    navigate("/template", {
      state: { formData, selectedTemplate: templateNumber },
    });
  };

  const fillDummyData = () => {
    setBillTo({
      name: "Arshman Rasool",
      address: "123 Main St, Anytown, USA",
      phone: "(555) 123-4567",
    });
    setShipTo({
      name: "Customer Example",
      address: "456 Elm St, Othertown, USA",
      phone: "(555) 987-6543",
    });
    setInvoice({
      date: new Date().toISOString().split("T")[0],
      paymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({
      name: "Your Company",
      address: "789 Oak St, Businessville, USA",
      phone: "(555) 555-5555",
    });
    setItems([
      {
        name: "Product A",
        description: "High-quality item",
        quantity: 2,
        amount: 50,
        total: 100,
      },
      {
        name: "Service B",
        description: "Professional service",
        quantity: 1,
        amount: 200,
        total: 200,
      },
      {
        name: "Product C",
        description: "Another great product",
        quantity: 3,
        amount: 30,
        total: 90,
      },
      {
        name: "Service D",
        description: "Another professional service",
        quantity: 2,
        amount: 150,
        total: 300,
      },
      {
        name: "Product E",
        description: "Yet another product",
        quantity: 1,
        amount: 75,
        total: 75,
      },
      {
        name: "Service F",
        description: "Yet another service",
        quantity: 4,
        amount: 100,
        total: 400,
      },
    ]);
    settaxPercentage(10);
    calculateSubTotal();
    setNotes("Thank you for your business!");
  };

  const clearForm = () => {
    setBillTo({ name: "", address: "", phone: "" });
    setShipTo({ name: "", address: "", phone: "" });
    setInvoice({
      date: "",
      paymentDate: "",
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({ name: "", address: "", phone: "" });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    settaxPercentage(0);
    setNotes("");
  };

  useEffect(() => {
    const onClear = () => clearForm();
    const onFill = () => fillDummyData();
    const onGoReceipt = () => navigate('/receipt', { state: { formData: { billTo, shipTo, invoice, yourCompany, items, taxPercentage, notes, selectedCurrency } } });

    window.addEventListener('app:clearForm', onClear);
    window.addEventListener('app:fillDummyData', onFill);
    window.addEventListener('app:goReceipt', onGoReceipt);

    return () => {
      window.removeEventListener('app:clearForm', onClear);
      window.removeEventListener('app:fillDummyData', onFill);
      window.removeEventListener('app:goReceipt', onGoReceipt);
    };
  }, [billTo, shipTo, invoice, yourCompany, items, taxPercentage, notes, selectedCurrency, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-float opacity-50" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 right-40 w-5 h-5 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-float opacity-30" style={{animationDelay: '5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-slow">
              <Sparkles className="text-white text-2xl" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
              Easy Invoice Pro
            </h2>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-slow" style={{animationDelay: '0.5s'}}>
              <Zap className="text-white text-2xl" />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"></div>
          </div>
          <p className="text-slate-700 text-lg font-semibold flex items-center justify-center gap-2">
            <TrendingUp className="text-emerald-500" size={20} />
            Create professional invoices with style & precision
            <TrendingUp className="text-emerald-500" size={20} />
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Panel - Enhanced Form */}
          <div className="w-full xl:w-1/2 animate-slide-in-left">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 rounded-3xl pointer-events-none"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-2xl"></div>
              
              <form className="relative z-10 space-y-8">
               {/* Currency Selection - Enhanced */}
<div className="mb-8 p-6 bg-gradient-to-br from-indigo-50/80 to-blue-100/80 rounded-2xl border border-indigo-200/50 shadow-lg backdrop-blur-sm animate-fade-in-up hover:shadow-xl transition-all duration-500 relative z-50">
  <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
    <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
      <FiDollarSign className="text-white text-sm" />
    </span>
    Currency Selection
  </h3>
  <CurrencyDropdown 
    selectedCurrency={selectedCurrency}
    onCurrencyChange={setSelectedCurrency}
  />
</div>

                {/* Enhanced Bill To Section */}
                <div className="mb-8 p-8 bg-gradient-to-br from-rose-50/90 to-pink-100/90 rounded-3xl border border-rose-200/60 shadow-xl backdrop-blur-sm animate-fade-in-up hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{animationDelay: '0.3s'}}>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-pink-600/10 rounded-full blur-2xl"></div>
                  <h2 className="text-3xl font-black mb-8 text-slate-800 flex items-center gap-4">
                    <span className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <FiFileText className="text-white text-xl" />
                    </span>
                    Bill To Customer
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <FloatingLabelInput
                        id="billToName"
                        label="Customer Name"
                        value={billTo.name}
                        onChange={handleInputChange(setBillTo)}
                        name="name"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-rose-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="group relative">
                      <FloatingLabelInput
                        id="billToPhone"
                        label="Phone Number"
                        value={billTo.phone}
                        onChange={handleInputChange(setBillTo)}
                        name="phone"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-rose-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="group mt-6 relative">
                    <FloatingLabelInput
                      id="billToAddress"
                      label="Billing Address"
                      value={billTo.address}
                      onChange={handleInputChange(setBillTo)}
                      name="address"
                      className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-rose-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Enhanced Ship To Section */}
                <div className="mb-8 p-8 bg-gradient-to-br from-cyan-50/90 to-blue-100/90 rounded-3xl border border-cyan-200/60 shadow-xl backdrop-blur-sm animate-fade-in-up hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{animationDelay: '0.4s'}}>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-2xl"></div>
                  <h2 className="text-3xl font-black mb-8 text-slate-800 flex items-center gap-4">
                    <span className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <FiFileText className="text-white text-xl" />
                    </span>
                    Ship To Address
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <FloatingLabelInput
                        id="shipToName"
                        label="Recipient Name"
                        value={shipTo.name}
                        onChange={handleInputChange(setShipTo)}
                        name="name"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-cyan-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="group relative">
                      <FloatingLabelInput
                        id="shipToPhone"
                        label="Phone Number"
                        value={shipTo.phone}
                        onChange={handleInputChange(setShipTo)}
                        name="phone"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-cyan-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="group mt-6 relative">
                    <FloatingLabelInput
                      id="shipToAddress"
                      label="Shipping Address"
                      value={shipTo.address}
                      onChange={handleInputChange(setShipTo)}
                      name="address"
                      className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-cyan-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Enhanced Invoice Information Section */}
                <div className="mb-8 p-8 bg-gradient-to-br from-blue-50/90 to-indigo-100/90 rounded-3xl border border-blue-200/60 shadow-xl backdrop-blur-sm animate-fade-in-up hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{animationDelay: '0.4s'}}>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-2xl"></div>
                  <h2 className="text-3xl font-black mb-8 text-slate-800 flex items-center gap-4">
                    <div className="relative">
                      <span className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <span className="text-white font-black text-xl">#</span>
                      </span>
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce shadow-lg"></div>
                    </div>
                    Invoice Information
                    <div className="ml-auto w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse"></div>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative group">
                      <FloatingLabelInput
                        id="invoiceNumber"
                        label="Invoice #"
                        value={invoice.number}
                        onChange={handleInputChange(setInvoice)}
                        name="number"
                        className="border-2 border-blue-200 focus:border-blue-500 bg-white/90 backdrop-blur-sm rounded-xl transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-bounce"></div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="group relative">
                      <FloatingLabelInput
                        id="invoiceDate"
                        label="Invoice Date"
                        type="date"
                        value={invoice.date}
                        onChange={handleInputChange(setInvoice)}
                        name="date"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-blue-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="group relative">
                      <FloatingLabelInput
                        id="paymentDate"
                        label="Payment Due Date"
                        type="date"
                        value={invoice.paymentDate}
                        onChange={handleInputChange(setInvoice)}
                        name="paymentDate"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-blue-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Your Company Section */}
                <div className="mb-8 p-8 bg-gradient-to-br from-emerald-50/90 to-cyan-100/90 rounded-3xl border border-emerald-200/60 shadow-xl backdrop-blur-sm animate-fade-in-up hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{animationDelay: '0.6s'}}>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-cyan-600/10 rounded-full blur-2xl"></div>
                  <h2 className="text-3xl font-black mb-8 text-slate-800 flex items-center gap-4">
                    <span className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <FiFileText className="text-white text-xl" />
                    </span>
                    Your Company
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <FloatingLabelInput
                        id="yourCompanyName"
                        label="Company Name"
                        value={yourCompany.name}
                        onChange={handleInputChange(setYourCompany)}
                        name="name"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-emerald-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div className="group relative">
                      <FloatingLabelInput
                        id="yourCompanyPhone"
                        label="Phone Number"
                        value={yourCompany.phone}
                        onChange={handleInputChange(setYourCompany)}
                        name="phone"
                        className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-emerald-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="group mt-6 relative">
                    <FloatingLabelInput
                      id="yourCompanyAddress"
                      label="Company Address"
                      value={yourCompany.address}
                      onChange={handleInputChange(setYourCompany)}
                      name="address"
                      className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-emerald-500 transition-all duration-300 group-hover:shadow-lg hover:bg-white/95 h-14 text-base font-semibold px-4"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Enhanced Item Details Section */}
                <div className="mb-8 p-8 bg-gradient-to-br from-violet-50/90 to-purple-100/90 rounded-3xl border border-violet-200/60 shadow-xl backdrop-blur-sm animate-fade-in-up hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{animationDelay: '0.8s'}}>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-500/8 to-violet-600/8 rounded-full blur-3xl"></div>
                  
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <h2 className="text-3xl font-black text-slate-800 flex items-center gap-4">
                      <span className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <span className="text-white font-black text-xl">📋</span>
                      </span>
                      <div className="flex flex-col">
                        <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Item Details</span>
                        <span className="text-sm font-normal text-slate-600">Add products & services</span>
                      </div>
                    </h2>
                    
                    {/* Enhanced Add Item Button */}
                    <button
                      type="button"
                      onClick={addItem}
                      className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>
                      
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-180 transition-all duration-500">
                          <span className="text-white font-black text-lg">+</span>
                        </div>
                        <span className="text-lg">Add Item</span>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      </div>
                      
                      {/* Sparkle Effects */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </button>
                  </div>

                  {/* Enhanced Items List */}
                  <div className="space-y-6 relative z-10">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-violet-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-violet-400/70 animate-fade-in-up"
                        style={{animationDelay: `${0.1 * index}s`}}
                      >
                        {/* Gradient Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                        
                        {/* Item Number Badge */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        
                       <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
  {/* Item Name */}
  <div className="lg:col-span-2 group/input relative">
    <div className="relative">
      <label 
        htmlFor={`itemName${index}`}
        className="block text-xs font-medium text-slate-600 mb-2"
      >
        Item/Service Name
      </label>
      <input
        id={`itemName${index}`}
        type="text"
        value={item.name}
        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
        className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-violet-500 transition-all duration-300 h-12 text-sm font-medium px-4 w-full focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        placeholder="item name"
      />
      <div className="absolute inset-0 top-8 rounded-xl opacity-0 transition-all duration-300 pointer-events-none"></div>
    </div>
  </div>
  
  {/* Description */}
  <div className="lg:col-span-2 group/input relative">
    <div className="relative">
      <label 
        htmlFor={`itemDescription${index}`}
        className="block text-xs font-medium text-slate-600 mb-2"
      >
        Description
      </label>
      <input
        id={`itemDescription${index}`}
        type="text"
        value={item.description}
        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
        className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-violet-500 transition-all duration-300 h-12 text-sm font-medium px-4 w-full focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        placeholder="Enter description"
      />
      <div className="absolute inset-0 top-8 rounded-xl opacity-0 transition-all duration-300 pointer-events-none"></div>
    </div>
  </div>
  
  
  {/* Quantity */}
  <div className="group/input relative">
    <div className="relative">
      <label 
        htmlFor={`itemQuantity${index}`}
        className="block text-xs font-medium text-slate-600 mb-2"
      >
        Quantity
      </label>
      <input
        id={`itemQuantity${index}`}
        type="number"
        value={item.quantity}
        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
        className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-violet-500 transition-all duration-300 h-12 text-sm font-medium px-4 w-full text-center focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        placeholder="0"
        min="0"
        step="1"
      />
      <div className="absolute inset-0 top-8 rounded-xl opacity-0 transition-all duration-300 pointer-events-none"></div>
    </div>
  </div>
  
  {/* Amount */}
  <div className="group/input relative">
    <div className="relative">
      <label 
        htmlFor={`itemAmount${index}`}
        className="block text-xs font-medium text-slate-600 mb-2"
      >
        Price ({selectedCurrency})
      </label>
      <input
        id={`itemAmount${index}`}
        type="number"
        value={item.amount}
        onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value) || 0)}
        className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-slate-200 focus:border-violet-500 transition-all duration-300 h-12 text-sm font-medium px-4 w-full text-center focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        placeholder="0.00"
        min="0"
        step="0.01"
      />
      <div className="absolute inset-0 top-8 rounded-xl opacity-0 transition-all duration-300 pointer-events-none"></div>
    </div>
  </div>
</div>
                        
                        {/* Total Display */}
                        <div className="mt-4 flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                              <span className="text-white font-bold text-sm">Σ</span>
                            </div>
                            <span className="text-lg font-bold text-slate-700">Total: </span>
                            <span className="text-xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                              {formatCurrency(item.total, selectedCurrency)}
                            </span>
                          </div>
                          
                          {/* Enhanced Delete Button */}
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="group/delete relative p-3 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 overflow-hidden"
                              title="Remove Item"
                            >
                              {/* Animated Background */}
                              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover/delete:opacity-100 transition-all duration-300"></div>
                              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/delete:opacity-100 animate-pulse transition-all duration-500"></div>
                              
                              {/* Icon with Animation */}
                              <div className="relative z-10 flex items-center justify-center">
                                <FiTrash2 
                                  size={18} 
                                  className="transform group-hover/delete:rotate-12 group-hover/delete:scale-110 transition-all duration-300" 
                                />
                              </div>
                              
                              {/* Danger Effects */}
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover/delete:opacity-100 animate-ping"></div>
                              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-0 group-hover/delete:opacity-100 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Empty State */}
                  {items.length === 0 && (
                    <div className="text-center py-12 relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-bounce">
                        <span className="text-white text-3xl">📦</span>
                      </div>
                      <p className="text-slate-600 text-lg font-medium">No items added yet</p>
                      <p className="text-slate-500 text-sm mt-2">Click "Add Item" to get started</p>
                    </div>
                  )}
                </div>

                {/* Enhanced Totals Section */}
                <div className="mb-8 p-8 bg-gradient-to-br from-purple-50/90 to-pink-100/90 rounded-3xl border border-purple-200/60 shadow-xl backdrop-blur-sm animate-fade-in-up hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{animationDelay: '1s'}}>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-2xl"></div>
                  <h3 className="text-3xl font-black mb-8 text-slate-800 flex items-center gap-4">
                    <span className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-white font-black text-xl">$</span>
                    </span>
                    Financial Summary
                    <div className="ml-auto w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-spin-slow"></div>
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-6 bg-white/60 rounded-2xl border border-white/40 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group">
                      <span className="font-bold text-slate-700 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">S</span>
                        </div>
                        Sub Total:
                      </span>
                      <span className="font-black text-xl text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{formatCurrency(subTotal, selectedCurrency)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-6 bg-white/60 rounded-2xl border border-white/40 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group">
                      <span className="font-bold text-slate-700 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">%</span>
                        </div>
                        Tax Rate (%):
                      </span>
                      <div className="relative">
                        <input
                          type="number"
                          value={taxPercentage}
                          onChange={(e) => handleTaxPercentageChange(e)}
                          className="w-36 p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-center font-bold text-lg shadow-lg focus:shadow-xl hover:shadow-xl h-14"
                          min="0"
                          max="28"
                          step="1"
                          placeholder="0"
                        />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-6 bg-white/60 rounded-2xl border border-white/40 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group">
                      <span className="font-bold text-slate-700 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">T</span>
                        </div>
                        Tax Amount:
                      </span>
                      <span className="font-black text-xl text-slate-800 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{formatCurrency(taxAmount, selectedCurrency)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
                      <span className="font-black text-white text-2xl flex items-center gap-3 relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-black text-xl">G</span>
                        </div>
                        Grand Total:
                      </span>
                      <span className="font-black text-white text-3xl relative z-10 animate-pulse">{formatCurrency(grandTotal, selectedCurrency)}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Notes Section */}
                <div className="mb-8 p-8 bg-gradient-to-br from-amber-50/90 to-orange-100/90 rounded-3xl border border-amber-200/60 shadow-xl backdrop-blur-sm animate-fade-in-up hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{animationDelay: '1.2s'}}>
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-full blur-2xl"></div>
                  <div className="flex items-center mb-8">
                    <h3 className="text-3xl font-black text-slate-800 flex items-center gap-4">
                      <span className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <FiEdit className="text-white text-xl" />
                      </span>
                      Notes & Comments
                    </h3>
                    <button
                      type="button"
                      onClick={refreshNotes}
                      className={`ml-6 p-4 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg group transform hover:scale-110 ${isRefreshing ? 'animate-spin' : ''}`}
                      title="Generate Random Note"
                    >
                      <RefreshCw size={24} className="text-amber-600 group-hover:text-amber-700" />
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-bounce"></div>
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-8 border-2 border-amber-200 rounded-2xl focus:border-amber-500 transition-all duration-300 bg-white/90 backdrop-blur-sm resize-none hover:shadow-lg font-medium text-slate-700 focus:bg-white/95 text-base leading-relaxed"
                      rows="6"
                      placeholder="Add your personalized notes, terms, conditions, or special instructions here..."
                      style={{ minHeight: '160px' }}
                    />
                    <div className="absolute bottom-6 right-6 text-amber-400/60">
                      <FiEdit size={20} />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/3 to-orange-500/3 opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Panel - Enhanced Template Gallery */}
          <div className="w-full xl:w-1/2 animate-slide-in-right">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-700 relative overflow-hidden min-h-[85vh]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 rounded-3xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <h2 className="text-4xl font-black mb-8 text-slate-800 flex items-center gap-4">
                  <span className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <FiFileText className="text-white text-2xl" />
                  </span>
                  <div className="flex flex-col">
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Template Gallery</span>
                    <span className="text-sm font-normal text-slate-600">Choose your perfect design</span>
                  </div>
                  <div className="ml-auto relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-bounce"></div>
                  </div>
                </h2>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-4">
                  {templates.map((template, index) => (
                    <div
                      key={index}
                      className={`template-card group relative bg-white p-6 rounded-2xl cursor-pointer border-2 border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-indigo-400 animate-fade-in-up ${hoveredTemplate === index ? 'shadow-lg border-indigo-400' : ''}`}
                      style={{animationDelay: `${0.1 * index}s`}}
                      onClick={() => handleTemplateClick(index + 1)}
                      onMouseEnter={() => setHoveredTemplate(index)}
                      onMouseLeave={() => setHoveredTemplate(null)}
                    >
                      <div className="relative z-10">
                        <div className="relative mb-4 bg-slate-50 rounded-xl p-2">
                          <img
                            src={`/assets/template${index + 1}-preview.png`}
                            alt={template.name}
                            className={`w-full ${
                              template.name === "Template 10"
                                ? "h-[60px] w-[90px] mx-auto"
                                : "h-32"
                            } object-contain rounded-lg`}
                            style={{
                              imageRendering: 'crisp-edges',
                              imageRendering: '-webkit-optimize-contrast',
                              imageRendering: 'pixelated'
                            }}
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-base text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 mb-3">
                            {template.name}
                          </p>
                          <div className="flex items-center justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? 'bg-amber-400' : 'bg-slate-300'}`}></div>
                            ))}
                          </div>
                        </div>
                        <div className={`absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm transition-opacity duration-300 ${hoveredTemplate === index ? 'opacity-100' : 'opacity-0'}`}>
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradient-x {
          0%, 100% {
            background-size: 400% 400%;
            background-position: left center;
          }
          50% {
            background-size: 400% 400%;
            background-position: right center;
          }
        }

        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-60px) rotateY(-15deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(60px) rotateY(15deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(-10px) rotate(240deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(-25%) scale(1.1);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.6);
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #c026d3);
          transform: scale(1.1);
        }

        .shadow-3xl {
          box-shadow: 0 45px 100px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(6px);
        }

        .bg-white-80 {
          background-color: rgba(255, 255, 255, 0.8);
        }

        .bg-white-90 {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .bg-white-70 {
          background-color: rgba(255, 255, 255, 0.7);
        }

        .bg-white-50 {
          background-color: rgba(255, 255, 255, 0.5);
        }

        .bg-white-60 {
          background-color: rgba(255, 255, 255, 0.6);
        }

        .bg-white-95 {
          background-color: rgba(255, 255, 255, 0.95);
        }

        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }

        * {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        button {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        button:hover {
          transform: translateY(-3px) scale(1.05);
        }

        button:active {
          transform: translateY(-1px) scale(1.02);
        }

        .template-card {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }

        .template-card:hover {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .group:hover .group-hover-scale-110 {
          transform: scale(1.25);
        }

        .group:hover .group-hover-opacity-100 {
          opacity: 1;
        }

        /* Enhanced focus states */
        *:focus-visible {
          outline: 3px solid rgba(99, 102, 241, 0.5);
          outline-offset: 2px;
        }

        /* Custom selection colors */
        ::selection {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
        }

        ::-moz-selection {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
        }
        `
      }} />
    </div>
  );
};

export default Index;