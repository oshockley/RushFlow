export interface MenuItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description?: string;
  available: boolean;
  modifiers?: MenuModifier[];
}

export interface MenuModifier {
  id: string;
  name: string;
  options: ModifierOption[];
  required: boolean;
  multiSelect: boolean;
}

export interface ModifierOption {
  id: string;
  name: string;
  priceAdjustment: number; // Can be positive or negative
}

export interface MenuConfig {
  businessId: string;
  businessName: string;
  categories: string[];
  items: MenuItem[];
  brandColor?: string;
  logo?: string;
}
