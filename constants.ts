import { Product, ProductCategory, Service } from './types';

export const NAV_LINKS = [
  { key: 'home', path: '/' },
  { key: 'products', path: '/products' },
  { key: 'services', path: '/services' },
  { key: 'caseStudies', path: '/case-studies' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'PS-10P Silent',
    category: ProductCategory.DIESEL,
    powerKVA: 10,
    engine: 'Perkins 403D-11G',
    description: {
      en: 'Compact and silent, ideal for small commercial applications.',
      pt: 'Compacto e silencioso, ideal para pequenas aplicações comerciais.'
    },
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'p2',
    name: 'PS-50C Industrial',
    category: ProductCategory.DIESEL,
    powerKVA: 50,
    engine: 'Cummins 4BTA3.9',
    description: {
      en: 'Robust power for construction and industrial sites.',
      pt: 'Potência robusta para estaleiros de construção e industriais.'
    },
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 'p3',
    name: 'PS-100V Heavy Duty',
    category: ProductCategory.DIESEL,
    powerKVA: 100,
    engine: 'Volvo TAD531GE',
    description: {
      en: 'High efficiency with low fuel consumption for continuous duty.',
      pt: 'Alta eficiência com baixo consumo de combustível para uso contínuo.'
    },
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: 'p4',
    name: 'PS-500P Mission Critical',
    category: ProductCategory.DIESEL,
    powerKVA: 500,
    engine: 'Perkins 2506C',
    description: {
      en: 'Data center grade reliability and rapid start capability.',
      pt: 'Fiabilidade de nível Data Center e capacidade de arranque rápido.'
    },
    image: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: 'p5',
    name: 'GS-30 Gas Eco',
    category: ProductCategory.GAS,
    powerKVA: 30,
    engine: 'PSI 2.4L',
    description: {
      en: 'Clean energy solution for urban environments.',
      pt: 'Solução de energia limpa para ambientes urbanos.'
    },
    image: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: 'p6',
    name: 'LT-4000 LED Tower',
    category: ProductCategory.LIGHTING,
    powerKVA: 6,
    engine: 'Kubota D1105',
    description: {
      en: '4x1000W LED lamps with hydraulic mast.',
      pt: '4 lâmpadas LED de 1000W com mastro hidráulico.'
    },
    image: 'https://picsum.photos/400/300?random=6'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: {
      en: 'Preventive Maintenance',
      pt: 'Manutenção Preventiva'
    },
    icon: 'wrench',
    description: {
      en: 'Scheduled inspections to ensure reliability and longevity.',
      pt: 'Inspeções programadas para garantir fiabilidade e longevidade.'
    },
    details: [
      { en: 'Oil & Filter Analysis', pt: 'Análise de Óleo e Filtros' },
      { en: 'Load Bank Testing', pt: 'Testes em Banco de Carga' },
      { en: 'Firmware Updates', pt: 'Atualizações de Firmware' },
      { en: '24/7 Emergency Response', pt: 'Resposta de Emergência 24/7' }
    ]
  },
  {
    id: 's2',
    title: {
      en: 'Fuel Polishing',
      pt: 'Limpeza de Combustível'
    },
    icon: 'droplet',
    description: {
      en: 'Advanced filtration to remove water and contaminants from stored diesel.',
      pt: 'Filtração avançada para remover água e contaminantes do diesel armazenado.'
    },
    details: [
      { en: 'Micro-filtration', pt: 'Microfiltração' },
      { en: 'Tank Cleaning', pt: 'Limpeza de Tanques' },
      { en: 'Biocide Treatment', pt: 'Tratamento Biocida' },
      { en: 'Fuel Sampling', pt: 'Amostragem de Combustível' }
    ]
  },
  {
    id: 's3',
    title: {
      en: 'Acoustic Treatments',
      pt: 'Tratamentos Acústicos'
    },
    icon: 'volume-x',
    description: {
      en: 'Custom soundproofing solutions for noise-sensitive areas.',
      pt: 'Soluções personalizadas de insonorização para áreas sensíveis ao ruído.'
    },
    details: [
      { en: 'Canopy Upgrades', pt: 'Atualização de Carenagens' },
      { en: 'Exhaust Attenuation', pt: 'Atenuação de Escape' },
      { en: 'Plant Room Insulation', pt: 'Isolamento de Salas Técnicas' },
      { en: 'Decibel Logging', pt: 'Registo de Decibéis' }
    ]
  }
];

export const PARTNERS = [
  { name: 'Perkins', logo: 'https://picsum.photos/150/60?random=10' },
  { name: 'Volvo', logo: 'https://picsum.photos/150/60?random=11' },
  { name: 'Cummins', logo: 'https://picsum.photos/150/60?random=12' },
  { name: 'HIMOINSA', logo: 'https://picsum.photos/150/60?random=13' },
  { name: 'Stamford', logo: 'https://picsum.photos/150/60?random=14' },
];