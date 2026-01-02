import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-display font-bold text-powersil-dark mb-8">{t('about.title')}</h1>
      <div className="prose prose-lg max-w-none text-slate-600">
        <p>
          {t('about.p1')}
        </p>
        <p>
          {t('about.mission')} <strong>{t('about.missionText')}</strong>
        </p>
        <p>
          {t('about.p2')}
        </p>
        <h2 className="text-2xl font-bold text-powersil-dark mt-8 mb-4">{t('about.valuesTitle')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>{t('about.v1Title')}</strong> {t('about.v1Desc')}</li>
          <li><strong>{t('about.v2Title')}</strong> {t('about.v2Desc')}</li>
          <li><strong>{t('about.v3Title')}</strong> {t('about.v3Desc')}</li>
        </ul>
      </div>
    </div>
  );
};

export default About;