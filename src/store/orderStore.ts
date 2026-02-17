import { create } from 'zustand';
import { Order } from '../types/Order';
import { MenuConfig } from '../types/Menu';
import { defaultMenu } from '../data/sampleMenus';

interface OrderStore {
  currentOrder: Order | null;
  orders: Order[];
  menu: MenuConfig;
  demoMode: boolean;
  businessName: string;
  brandColor: string;
  
  setCurrentOrder: (order: Order) => void;
  addOrder: (order: Order) => void;
  clearCurrentOrder: () => void;
  setMenu: (menu: MenuConfig) => void;
  setDemoMode: (enabled: boolean) => void;
  setBusinessName: (name: string) => void;
  setBrandColor: (color: string) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  currentOrder: null,
  orders: [],
  menu: defaultMenu,
  demoMode: true, // Start in demo mode for pitches
  businessName: defaultMenu.businessName,
  brandColor: defaultMenu.brandColor || '#007AFF',
  
  setCurrentOrder: (order) => set({ currentOrder: order }),
  
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, order],
    currentOrder: null,
  })),
  
  clearCurrentOrder: () => set({ currentOrder: null }),
  
  setMenu: (menu) => set({ 
    menu,
    businessName: menu.businessName,
    brandColor: menu.brandColor || '#007AFF',
  }),
  
  setDemoMode: (enabled) => set({ demoMode: enabled }),
  
  setBusinessName: (name) => set({ businessName: name }),
  
  setBrandColor: (color) => set({ brandColor: color }),
}));
