import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Zap, Globe } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-powersil-accent ${
      isActive ? 'text-powersil-accent' : 'text-slate-300'
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-slate-800 text-powersil-accent' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  return (
    <nav className="bg-powersil-dark text-white sticky top-0 z-50 shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="bg-powersil-accent p-1.5 rounded-sm group-hover:bg-amber-400 transition-colors">
                <Zap className="h-6 w-6 text-powersil-dark" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                POWERSIL.PT
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.key} to={link.path} className={linkClass}>
                  {t(`nav.${link.key}`)}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <NavLink
              to="/contact"
              className="bg-powersil-accent text-powersil-dark font-bold py-2 px-4 rounded-sm hover:bg-amber-400 transition-colors shadow-md"
            >
              {t('nav.quote')}
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-slate-300 hover:text-white p-2"
            >
              <span className="font-bold">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-powersil-dark border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                className={mobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
             <NavLink
                to="/contact"
                className="block w-full text-center mt-4 bg-powersil-accent text-powersil-dark font-bold py-3 px-4 rounded-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.quote')}
              </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;