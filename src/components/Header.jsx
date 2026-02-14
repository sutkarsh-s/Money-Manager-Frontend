import { useState, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo.jsx";

const NAV_LINKS = [
  { name: "Home", to: "/home" },
  { name: "About us", to: "/about" },
  { name: "Contact us", to: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const navLinkStyles =
    "text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium";
  const ctaStyles =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transition-all duration-200";

  return (
    <header
      className="border-b border-gray-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm shadow-gray-200/50"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/home"
            className="flex items-center gap-3 min-w-0 group"
            aria-label="Money Manager - Home"
          >
            <div className="group-hover:scale-[1.01] transition-transform">
              <BrandLogo />
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`${navLinkStyles} ${
                  location.pathname === link.to ? "text-purple-600 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <Link
                to="/login"
                className={`${navLinkStyles} ${
                  location.pathname === "/login" ? "text-purple-600 font-semibold" : ""
                }`}
              >
                Login
              </Link>
              <Link to="/signup" className={ctaStyles}>
                Get Started
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-t border-gray-200 shadow-xl animate-fade-in"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-xl ${navLinkStyles} ${
                    location.pathname === link.to ? "text-purple-600 font-semibold bg-purple-50" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-100">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-xl ${navLinkStyles} ${
                    location.pathname === "/login" ? "text-purple-600 font-semibold bg-purple-50" : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className={`${ctaStyles} justify-center py-3`}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
