import React from 'react';
import { SERVICES } from '../constants';
import { Wrench, Droplet, VolumeX, CheckCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t, language } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'wrench': return <Wrench className="h-8 w-8 text-white" />;
      case 'droplet': return <Droplet className="h-8 w-8 text-white" />;
      case 'volume-x': return <VolumeX className="h-8 w-8 text-white" />;
      default: return <Wrench className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div>
      <div className="bg-powersil-primary py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{t('services.title')}</h1>
          <p className="text-xl text-slate-300">
            {t('services.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
              <div className="flex-1">
                <div className="bg-powersil-accent w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-lg rotate-3">
                  {getIcon(service.icon)}
                </div>
                <h2 className="text-3xl font-display font-bold text-powersil-dark mb-4">{service.title[language]}</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {service.description[language]}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      {detail[language]}
                    </li>
                  ))}
                </ul>
                <NavLink 
                  to="/contact" 
                  className="inline-block bg-powersil-dark text-white font-bold py-3 px-8 rounded-sm hover:bg-slate-800 transition-colors"
                >
                  {t('services.schedule')}
                </NavLink>
              </div>
              <div className="flex-1 w-full">
                <img 
                  src={`https://picsum.photos/600/400?random=${index + 20}`} 
                  alt={service.title.en} 
                  className="rounded-lg shadow-xl w-full object-cover h-80 md:h-96"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;