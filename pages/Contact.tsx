import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: 'Quote', // Quote, Service, Other
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-powersil-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-slate-300">{t('contact.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-powersil-accent">
            <Phone className="h-8 w-8 text-powersil-dark mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">{t('contact.callUs')}</h3>
            <p className="text-slate-600">+351 220 000 000</p>
            <p className="text-slate-400 text-sm mt-1">{t('contact.available247')}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-powersil-accent">
            <Mail className="h-8 w-8 text-powersil-dark mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">{t('contact.emailUs')}</h3>
            <p className="text-slate-600">geral@powersil.pt</p>
            <p className="text-slate-400 text-sm mt-1">{t('contact.response2h')}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-powersil-accent">
            <MapPin className="h-8 w-8 text-powersil-dark mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">{t('contact.visitHq')}</h3>
            <p className="text-slate-600">Zona Industrial Maia</p>
            <p className="text-slate-400 text-sm mt-1">Porto, Portugal</p>
          </div>
        </div>

        <div className="my-16 flex flex-col lg:flex-row gap-12">
          {/* Map Placeholder */}
          <div className="flex-1 bg-slate-200 rounded-lg min-h-[400px] flex items-center justify-center">
             <span className="text-slate-500 font-bold text-xl">Interactive Map Placeholder</span>
             {/* In a real app, embed Google Maps iframe here */}
          </div>

          {/* Form */}
          <div className="flex-1 bg-white p-8 rounded-lg shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold font-display text-powersil-dark mb-6">{t('contact.requestTitle')}</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">{t('contact.successTitle')}</h3>
                <p>{t('contact.successDesc')}</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-bold underline"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.fullName')}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-powersil-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-powersil-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.email')}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-powersil-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-powersil-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.inquiryType')}</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-powersil-accent focus:outline-none bg-white"
                  >
                    <option value="Quote">{t('contact.types.quote')}</option>
                    <option value="Service">{t('contact.types.service')}</option>
                    <option value="Fuel">{t('contact.types.fuel')}</option>
                    <option value="Other">{t('contact.types.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-powersil-accent focus:outline-none"
                    placeholder={t('contact.messagePlaceholder')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-powersil-accent text-powersil-dark font-bold py-3 rounded-md hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  {t('contact.sendRequest')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;