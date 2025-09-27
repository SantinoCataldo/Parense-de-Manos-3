// Tipos principales para el evento de boxeo

export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  age: number;
  weight: number;
  height: number;
  reach: number;
  record: {
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
  };
  nationality: string;
  image: string;
  social?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Fight {
  id: string;
  fighter1: Fighter;
  fighter2: Fighter;
  category: WeightCategory;
  rounds: number;
  isMainEvent: boolean;
  isCoMainEvent: boolean;
  status: FightStatus;
  result?: FightResult;
  scheduledTime: string; // formato HH:mm
}

export interface FightResult {
  winner: Fighter;
  method: 'KO' | 'TKO' | 'Decision' | 'Submission' | 'DQ' | 'Draw';
  round?: number;
  time?: string;
}

export enum WeightCategory {
  FLYWEIGHT = 'Peso Mosca',
  BANTAMWEIGHT = 'Peso Gallo',
  FEATHERWEIGHT = 'Peso Pluma',
  LIGHTWEIGHT = 'Peso Ligero',
  WELTERWEIGHT = 'Peso Welter',
  MIDDLEWEIGHT = 'Peso Medio',
  LIGHT_HEAVYWEIGHT = 'Peso Semipesado',
  HEAVYWEIGHT = 'Peso Pesado',
  CRUISERWEIGHT = 'Peso Crucero'
}

export enum FightStatus {
  SCHEDULED = 'Programada',
  LIVE = 'En vivo',
  COMPLETED = 'Completada',
  CANCELLED = 'Cancelada',
  POSTPONED = 'Pospuesta'
}

export interface Event {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  venue: Venue;
  fights: Fight[];
  ticketInfo: TicketInfo;
  sponsors: Sponsor[];
  poster: string;
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TicketInfo {
  available: boolean;
  prices: {
    category: string;
    price: number;
    currency: string;
  }[];
  salesUrl?: string;
  salesPhone?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category: 'Principal' | 'Oficial' | 'Colaborador';
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  author: string;
  category: 'Noticias' | 'Resultados' | 'Anuncios';
}

// Tipos para formularios
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Tipos para navegación
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  subItems?: NavItem[];
}