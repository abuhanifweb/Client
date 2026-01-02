import React, { useState } from 'react';
import { Calculator, Cpu, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { estimatePowerLoad } from '../services/geminiService';
import { AIEstimateResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const PowerCalculator: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'manual' | 'ai'>('manual');
  
  // Manual State
  const [phases, setPhases] = useState<number>(3);
  const [voltage, setVoltage] = useState<number>(400);
  const [amps, setAmps] = useState<number>(0);
  const [manualResult, setManualResult] = useState<number | null>(null);

  // AI State
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIEstimateResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const calculateManual = () => {
    // Formula: kVA = (V * A * sqrt(phases)) / 1000
    // For 3 phase: V * A * 1.732 / 1000
    // For 1 phase: V * A / 1000
    const factor = phases === 3 ? 1.732 : 1;
    const kva = (voltage * amps * factor) / 1000;
    setManualResult(kva);
  };

  const handleAIEstimate = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    try {
      const result = await estimatePowerLoad(aiPrompt, language);
      setAiResult(result);
    } catch (e: any) {
      setAiError(e.message || t('common.error'));
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-powersil-dark p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <ZapIcon className="h-6 w-6 text-powersil-accent" />
          <h3 className="text-xl font-bold font-display">{t('calculator.title')}</h3>
        </div>
        <p className="text-slate-300 text-sm">
          {t('calculator.subtitle')}
        </p>
      </div>

      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'manual' ? 'text-powersil-dark border-b-2 border-powersil-accent bg-slate-50' : 'text-slate-500 hover:text-powersil-dark'
          }`}
        >
          <Calculator className="h-4 w-4" />
          {t('calculator.standard')}
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'ai' ? 'text-powersil-dark border-b-2 border-powersil-accent bg-slate-50' : 'text-slate-500 hover:text-powersil-dark'
          }`}
        >
          <Cpu className="h-4 w-4" />
          {t('calculator.aiEstimator')}
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'manual' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('calculator.phases')}</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="phases" checked={phases === 1} onChange={() => setPhases(1)} className="text-powersil-accent focus:ring-powersil-accent" />
                  {t('calculator.singlePhase')}
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="phases" checked={phases === 3} onChange={() => setPhases(3)} className="text-powersil-accent focus:ring-powersil-accent" />
                  {t('calculator.threePhase')}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('calculator.voltage')}</label>
                <input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-powersil-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('calculator.amperage')}</label>
                <input
                  type="number"
                  value={amps}
                  onChange={(e) => setAmps(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-powersil-accent"
                  placeholder="e.g. 50"
                />
              </div>
            </div>

            <button
              onClick={calculateManual}
              className="w-full bg-powersil-dark text-white font-bold py-3 rounded-md hover:bg-slate-800 transition-colors"
            >
              {t('calculator.calculate')}
            </button>

            {manualResult !== null && (
              <div className="mt-4 p-4 bg-slate-100 rounded-md border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">{t('calculator.estimatedLoad')}</p>
                <p className="text-3xl font-bold text-powersil-dark">{manualResult.toFixed(2)} kVA</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {t('calculator.buffer')} ({ (manualResult * 1.2).toFixed(2) } kVA)
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('calculator.describeSetup')}</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={t('calculator.placeholder')}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-powersil-accent h-32 resize-none"
              />
            </div>
            
            <button
              onClick={handleAIEstimate}
              disabled={aiLoading || !aiPrompt.trim()}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {aiLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Cpu className="h-5 w-5" />}
              {t('calculator.askAI')}
            </button>

            {aiError && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {aiError}
              </div>
            )}

            {aiResult && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-md border border-indigo-100">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-indigo-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-indigo-900">{t('calculator.recommendedRange')}</h4>
                    <p className="text-2xl font-bold text-indigo-700 my-1">
                      {aiResult.minKVA} - {aiResult.maxKVA} kVA
                    </p>
                    <p className="text-sm text-indigo-800 mb-2">{aiResult.suggestedCategory}</p>
                    <p className="text-xs text-slate-600 italic border-t border-indigo-200 pt-2">
                      "{aiResult.reasoning}"
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {!process.env.API_KEY && (
               <div className="text-xs text-slate-400 mt-2 text-center">
                 {t('calculator.aiRequiresKey')}
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple icon wrapper
const ZapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export default PowerCalculator;