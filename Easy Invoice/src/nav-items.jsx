import { HomeIcon, FileText, Coffee } from "lucide-react";
import Index from "./pages/Index.jsx";
import Blog from "./pages/Blog.jsx";
import Improve from "./pages/Improve.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  { title: "Home", to: "/", icon: <HomeIcon className="h-4 w-4" />, page: <Index /> },
  { title: "Blog", to: "/blog", icon: <FileText className="h-4 w-4" />, page: <Blog /> },
  { title: "How we improve", to: "/improve", icon: <Coffee className="h-4 w-4" />, page: <Improve /> },
];
