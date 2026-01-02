import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-powersil-primary text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-powersil-accent" fill="currentColor" />
              <span className="font-display font-bold text-2xl text-white">POWERSIL.PT</span>
            </div>
            <p className="text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-sm">{t('footer.solutions')}</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/products" className="hover:text-powersil-accent transition-colors">Industrial Generators</NavLink></li>
              <li><NavLink to="/products" className="hover:text-powersil-accent transition-colors">Gas Solutions</NavLink></li>
              <li><NavLink to="/services" className="hover:text-powersil-accent transition-colors">ATS Panels</NavLink></li>
              <li><NavLink to="/services" className="hover:text-powersil-accent transition-colors">Fuel Cleaning</NavLink></li>
            </ul>
          </div>

           {/* Legal / Company */}
           <div>
            <h3 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-sm">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/about" className="hover:text-powersil-accent transition-colors">{t('nav.about')}</NavLink></li>
              <li><NavLink to="/case-studies" className="hover:text-powersil-accent transition-colors">{t('nav.caseStudies')}</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-powersil-accent transition-colors">Careers</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-powersil-accent transition-colors">Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
             <h3 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-sm">{t('footer.contact')}</h3>
             <ul className="space-y-3 text-sm">
               <li className="flex items-start gap-3">
                 <MapPin className="h-5 w-5 text-powersil-accent shrink-0" />
                 <span>Zona Industrial Maia,<br/>Porto, Portugal</span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone className="h-5 w-5 text-powersil-accent shrink-0" />
                 <span>+351 220 000 000</span>
               </li>
               <li className="flex items-center gap-3">
                 <Mail className="h-5 w-5 text-powersil-accent shrink-0" />
                 <span>geral@powersil.pt</span>
               </li>
             </ul>
             <div className="flex gap-4 mt-6">
               <a href="#" className="text-slate-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
               <a href="#" className="text-slate-400 hover:text-white"><Linkedin className="h-5 w-5" /></a>
               <a href="#" className="text-slate-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
             </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;