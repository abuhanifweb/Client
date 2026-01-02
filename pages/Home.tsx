import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Globe, ChevronRight } from 'lucide-react';
import { PARTNERS, PRODUCTS } from '../constants';
import PowerCalculator from '../components/PowerCalculator';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-powersil-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1565514020126-6d60c29994c5?auto=format&fit=crop&q=80&w=2000" 
            alt="Industrial Generator" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-powersil-dark via-powersil-dark/90 to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-display font-extrabold leading-tight">
                {t('hero.title')}<br />
                <span className="text-powersil-accent">{t('hero.subtitle')}</span>
              </h1>
              <div className="space-y-4 text-slate-300 text-lg max-w-xl">
                <p>
                  <strong>{t('hero.problem')}</strong> {t('hero.problemDesc')}
                </p>
                <p>
                  <strong>{t('hero.solution')}</strong> {t('hero.solutionDesc')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <NavLink 
                  to="/products" 
                  className="bg-powersil-accent text-powersil-dark font-bold py-3 px-8 rounded-sm hover:bg-amber-400 transition-colors flex items-center gap-2"
                >
                  {t('hero.viewCatalog')} <ArrowRight className="h-5 w-5" />
                </NavLink>
                <NavLink 
                  to="/services" 
                  className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-sm hover:bg-white hover:text-powersil-dark transition-colors"
                >
                  {t('hero.ourServices')}
                </NavLink>
              </div>
            </div>
            
            {/* Calculator Widget in Hero */}
            <div className="hidden lg:block transform translate-y-8">
              <PowerCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Banner */}
      <div className="bg-slate-100 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 font-bold uppercase text-xs tracking-widest mb-6">{t('common.trustedBy')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            {PARTNERS.map(partner => (
              <img key={partner.name} src={partner.logo} alt={partner.name} className="h-8 md:h-10 object-contain" />
            ))}
          </div>
        </div>
      </div>

      {/* Value Proposition / Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-powersil-dark mb-4">{t('whyUs.title')}</h2>
            <p className="text-slate-600">
              {t('whyUs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-powersil-accent" />}
              title={t('whyUs.supportTitle')}
              description={t('whyUs.supportDesc')}
            />
            <FeatureCard 
              icon={<Globe className="h-8 w-8 text-powersil-accent" />}
              title={t('whyUs.globalTitle')}
              description={t('whyUs.globalDesc')}
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-powersil-accent" />}
              title={t('whyUs.certTitle')}
              description={t('whyUs.certDesc')}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-powersil-dark mb-2">{t('featured.title')}</h2>
              <p className="text-slate-600">{t('featured.subtitle')}</p>
            </div>
            <NavLink to="/products" className="hidden md:flex items-center gap-1 text-powersil-accent font-bold hover:underline">
              {t('featured.viewAll')} <ChevronRight className="h-5 w-5" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-slate-100 overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9 bg-slate-200 relative overflow-hidden h-48">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-powersil-accent text-powersil-dark text-xs font-bold px-2 py-1 rounded-sm">
                    {product.powerKVA} kVA
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-500 font-bold uppercase mb-1">{product.category}</div>
                  <h3 className="text-xl font-bold text-powersil-dark mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description[language]}</p>
                  <NavLink to="/contact" className="text-powersil-primary font-bold text-sm flex items-center gap-1 hover:text-powersil-accent">
                    {t('featured.requestSpecs')} <ArrowRight className="h-4 w-4" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <NavLink to="/products" className="inline-flex items-center gap-1 text-powersil-accent font-bold">
              {t('featured.viewAll')} <ChevronRight className="h-5 w-5" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-powersil-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-6">{t('cta.auditTitle')}</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            {t('cta.auditDesc')}
          </p>
          <NavLink 
            to="/contact" 
            className="inline-block bg-white text-powersil-dark font-bold py-4 px-10 rounded-sm hover:bg-slate-100 transition-colors"
          >
            {t('cta.schedule')}
          </NavLink>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-50 p-8 rounded-lg border border-slate-100 hover:border-powersil-accent/50 transition-colors">
    <div className="bg-white p-3 rounded-full w-fit shadow-sm mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-powersil-dark mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default Home;