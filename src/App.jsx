import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { navItems } from "./nav-items";
import TemplatePage from "./pages/TemplatePage";
import ReceiptPage from "./pages/ReceiptPage";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";
import Welcome from "./pages/Welcome";   // ✅ your welcome page
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Improve from "./pages/Improve";

const queryClient = new QueryClient();

const Layout = ({ children }) => {
  const location = useLocation();

  // ✅ Hide NavBar & Footer on Welcome page
  const hideLayout = location.pathname === "/" || location.pathname === "/welcome";

  return (
    <>
      {!hideLayout && <NavBar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />   {/* 👈 Welcome page */}
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/home" element={<Index />} />
            <Route path="/template" element={<TemplatePage />} />
            <Route path="/receipt" element={<ReceiptPage />} />
             <Route path="/blog" element={<Blog />} />            {/* ✅ Blog page */}
          <Route path="/improve" element={<Improve />} />    
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
