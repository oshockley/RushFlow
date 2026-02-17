import { MenuConfig } from '../types/Menu';
import { Order, OrderItem } from '../types/Order';
import { defaultMenu } from '../data/sampleMenus';

/**
 * Demo Service - Simulates AI voice processing for pitches/demos
 * This allows you to demo the app without needing backend infrastructure
 */

interface DemoOrderScenario {
  spokenOrder: string;
  parsedItems: OrderItem[];
}

// Pre-configured demo scenarios that work perfectly
const demoScenarios: DemoOrderScenario[] = [
  {
    spokenOrder: "Large oat milk latte with an extra shot and a blueberry muffin",
    parsedItems: [
      {
        id: 'demo-item-1',
        name: 'Latte',
        quantity: 1,
        modifiers: ['Large (20oz)', 'Oat Milk', '1 Extra Shot'],
        price: 6.75,
      },
      {
        id: 'demo-item-2',
        name: 'Blueberry Muffin',
        quantity: 1,
        modifiers: [],
        price: 3.75,
      },
    ],
  },
  {
    spokenOrder: "Two medium cappuccinos with almond milk and a croissant",
    parsedItems: [
      {
        id: 'demo-item-3',
        name: 'Cappuccino',
        quantity: 2,
        modifiers: ['Medium (12oz)', 'Almond Milk'],
        price: 5.00,
      },
      {
        id: 'demo-item-4',
        name: 'Croissant',
        quantity: 1,
        modifiers: [],
        price: 3.50,
      },
    ],
  },
  {
    spokenOrder: "Iced latte, large, oat milk, and an avocado toast with a fried egg",
    parsedItems: [
      {
        id: 'demo-item-5',
        name: 'Iced Latte',
        quantity: 1,
        modifiers: ['Large (24oz)', 'Oat Milk'],
        price: 5.50,
      },
      {
        id: 'demo-item-6',
        name: 'Avocado Toast',
        quantity: 1,
        modifiers: ['Fried Egg'],
        price: 9.50,
      },
    ],
  },
  {
    spokenOrder: "Small americano and a mocha with whipped cream",
    parsedItems: [
      {
        id: 'demo-item-7',
        name: 'Americano',
        quantity: 1,
        modifiers: ['Small (12oz)'],
        price: 3.00,
      },
      {
        id: 'demo-item-8',
        name: 'Mocha',
        quantity: 1,
        modifiers: ['Medium (16oz)', 'With Whip'],
        price: 5.00,
      },
    ],
  },
];

let scenarioIndex = 0;

/**
 * Simulate voice transcription and order parsing for demos
 */
export const processDemoVoiceOrder = async (
  audioUri: string,
  menu: MenuConfig = defaultMenu
): Promise<Order> => {
  // Simulate processing time (realistic delay)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Get next demo scenario (cycle through them)
  const scenario = demoScenarios[scenarioIndex % demoScenarios.length];
  scenarioIndex++;

  // Calculate total
  const totalPrice = scenario.parsedItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // Create order object
  const order: Order = {
    id: `DEMO-${Date.now()}`,
    items: scenario.parsedItems,
    timestamp: new Date(),
    totalPrice,
    status: 'pending',
    audioFileUri: audioUri,
    transcription: scenario.spokenOrder,
  };

  return order;
};

/**
 * Get a random demo scenario for display
 */
export const getRandomScenario = (): DemoOrderScenario => {
  return demoScenarios[Math.floor(Math.random() * demoScenarios.length)];
};

/**
 * Custom demo order - manually specify what to show
 */
export const createCustomDemoOrder = (
  transcription: string,
  items: OrderItem[]
): Order => {
  const totalPrice = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return {
    id: `CUSTOM-${Date.now()}`,
    items,
    timestamp: new Date(),
    totalPrice,
    status: 'pending',
    transcription,
  };
};

/**
 * Validate that menu items exist in the configured menu
 */
export const validateDemoOrder = (order: Order, menu: MenuConfig): boolean => {
  return order.items.every(item => {
    return menu.items.some(menuItem => menuItem.name === item.name);
  });
};
