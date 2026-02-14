import { memo } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import BrandLogo from "./BrandLogo.jsx";

const Footer = () => (
  <footer className="border-t border-gray-200/80 bg-gray-50/60 py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/home" className="inline-block mb-4">
            <BrandLogo />
          </Link>
          <p className="text-sm text-gray-600 max-w-xs">
            Build better money habits with a clean dashboard, smart tracking, and actionable financial insights.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">About</h4>
          <p className="text-sm text-gray-600">
            Money Manager is a personal finance SaaS that helps you monitor income, expenses, lending, and borrowing from one place.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm text-gray-600">
            <Link to="/home" className="hover:text-purple-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-purple-600 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-purple-600 transition-colors">Contact</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>support@moneymanager.app</p>
            <p>Mon - Fri, 9:00 AM - 6:00 PM</p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-purple-600">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-purple-600">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:support@moneymanager.app" className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-purple-600">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200/60 text-center text-sm text-gray-500">
        <p>© 2026 All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default memo(Footer);
