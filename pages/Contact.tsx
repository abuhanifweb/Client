import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, AlertCircle } from 'lucide-react';
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
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errors.required');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.email');
    }
    if (!formData.phone.trim()) newErrors.phone = t('contact.errors.required');
    if (!formData.message.trim()) newErrors.message = t('contact.errors.required');
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        type: 'Quote',
        message: ''
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const inputClass = (fieldName: string) => `
    w-full px-4 py-3 rounded-md border text-slate-900 bg-white shadow-sm placeholder-slate-400
    focus:ring-2 focus:ring-powersil-accent focus:border-transparent focus:outline-none transition-all duration-200
    ${errors[fieldName] ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-slate-300'}
  `;

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
          <div className="flex-1 bg-slate-200 rounded-lg min-h-[400px] flex items-center justify-center overflow-hidden shadow-inner">
             <div className="text-center p-6">
               <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
               <span className="text-slate-500 font-bold text-xl block">Interactive Map</span>
               <span className="text-slate-400 text-sm">Google Maps Integration Area</span>
             </div>
          </div>

          {/* Form */}
          <div className="flex-1 bg-white p-8 lg:p-10 rounded-xl shadow-xl border border-slate-100 relative">
            <h2 className="text-2xl font-bold font-display text-powersil-dark mb-6 pb-4 border-b border-slate-100">
              {t('contact.requestTitle')}
            </h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-lg text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('contact.successTitle')}</h3>
                <p className="text-green-700 mb-6">{t('contact.successDesc')}</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-bold text-powersil-primary underline hover:text-powersil-accent transition-colors"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700">{t('contact.fullName')} <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" /> {errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700">{t('contact.company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass('company')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700">{t('contact.email')} <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700">{t('contact.phone')} <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass('phone')}
                    />
                     {errors.phone && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" /> {errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-slate-700">{t('contact.inquiryType')}</label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`${inputClass('type')} appearance-none`}
                    >
                      <option value="Quote">{t('contact.types.quote')}</option>
                      <option value="Service">{t('contact.types.service')}</option>
                      <option value="Fuel">{t('contact.types.fuel')}</option>
                      <option value="Other">{t('contact.types.other')}</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-slate-700">{t('contact.message')} <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass('message')}
                    placeholder={t('contact.messagePlaceholder')}
                  ></textarea>
                   {errors.message && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" /> {errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-powersil-accent text-powersil-dark font-bold py-4 rounded-md hover:bg-amber-400 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t('contact.sendRequest')}
                    </>
                  )}
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