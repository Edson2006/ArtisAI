export interface UserSettings {
  userId: string;
  // Quotes & Billing
  defaultTaxRate: number;
  defaultValidityDays: number;
  quotePrefix: string;
  defaultLegalMentions: string;
  
  // General
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  
  // Notifications
  notifications: {
    emailOnQuoteCreated: boolean;
    emailOnQuoteAccepted: boolean;
    weeklyReport: boolean;
    productUpdates: boolean;
  };
  
  updatedAt: string;
}

export const defaultSettings: Omit<UserSettings, 'userId' | 'updatedAt'> = {
  defaultTaxRate: 20,
  defaultValidityDays: 30,
  quotePrefix: 'DEV-',
  defaultLegalMentions: 'Devis valable 30 jours. Acompte de 30% à la commande.',
  theme: 'light',
  language: 'fr',
  notifications: {
    emailOnQuoteCreated: true,
    emailOnQuoteAccepted: true,
    weeklyReport: true,
    productUpdates: true
  }
};
