export type Language = 'en' | 'pt';

export interface LocalizedString {
  en: string;
  pt: string;
}

export enum ProductCategory {
  DIESEL = 'Diesel Generators',
  GAS = 'Gas Generators',
  LIGHTING = 'Lighting Towers',
  ATS = 'ATS Panels'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  powerKVA: number;
  engine: string;
  description: LocalizedString;
  image: string;
}

export interface Service {
  id: string;
  title: LocalizedString;
  icon: string;
  description: LocalizedString;
  details: LocalizedString[];
}

export interface CalculatorResult {
  kVA: number;
  kW: number;
  amps: number;
  recommendedModel?: string;
}

export interface AIEstimateResult {
  minKVA: number;
  maxKVA: number;
  reasoning: string;
  suggestedCategory: string;
}