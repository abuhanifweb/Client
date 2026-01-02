import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Filter, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { t, language } = useLanguage();

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const categories = ['All', ...Object.values(ProductCategory)];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-powersil-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">{t('products.title')}</h1>
          <p className="text-slate-300 max-w-2xl">
            {t('products.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-powersil-dark">
                <Filter className="h-5 w-5" />
                <h3 className="font-bold text-lg">{t('products.filters')}</h3>
              </div>
              
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-powersil-accent text-powersil-dark font-bold' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'All' ? (language === 'pt' ? 'Todos' : 'All') : cat}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <h4 className="font-bold text-sm text-powersil-dark mb-4">{t('products.needHelp')}</h4>
                <p className="text-xs text-slate-500 mb-4">
                  {t('products.useCalculator')}
                </p>
                <NavLink 
                  to="/" 
                  className="block w-full text-center bg-powersil-dark text-white text-xs font-bold py-2 rounded-sm"
                >
                  {t('products.goToCalculator')}
                </NavLink>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedCategory === 'All' ? t('products.allInventory') : selectedCategory}
                </h2>
                <span className="text-sm text-slate-500">{filteredProducts.length} {t('products.results')}</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                    <div className="h-48 overflow-hidden relative bg-slate-200">
                       <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-white font-bold text-lg">{product.powerKVA} kVA</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-xs font-bold text-powersil-accent uppercase mb-1">{product.category}</div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{product.name}</h3>
                      <div className="text-xs text-slate-500 mb-4 space-y-1">
                        <p><span className="font-semibold">{t('products.engine')}</span> {product.engine}</p>
                        <p>{product.description[language]}</p>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <NavLink 
                          to="/contact" 
                          className="w-full flex items-center justify-center gap-1 text-sm font-bold text-powersil-dark hover:text-powersil-accent transition-colors"
                        >
                          {t('products.requestQuote')} <ChevronRight className="h-4 w-4" />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
             </div>

             {filteredProducts.length === 0 && (
               <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                 <p className="text-slate-500">{t('products.noResults')}</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;