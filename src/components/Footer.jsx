import { memo } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-gray-200/80 bg-gray-50/50 py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/home" className="flex items-center gap-2.5">
          <img
            src={assets.logo}
            alt=""
            className="h-10 w-10 rounded-xl shadow-md"
          />
          <span className="text-lg font-bold text-gray-900">Money Manager</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link to="/home" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link to="/login" className="hover:text-purple-600 transition-colors">
            Login
          </Link>
          <Link to="/signup" className="hover:text-purple-600 transition-colors">
            Sign Up
          </Link>
        </nav>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200/60 text-center text-sm text-gray-500">
        <p>
          Built with <Heart className="inline w-4 h-4 text-rose-500 fill-rose-500" /> for smarter financial habits.
        </p>
      </div>
    </div>
  </footer>
);

export default memo(Footer);
