import { MenuConfig } from '../types/Menu';

/**
 * Sample Coffee Shop Menu - Perfect for demos
 */
export const coffeeShopMenu: MenuConfig = {
  businessId: 'demo-coffee-001',
  businessName: 'Demo Coffee Shop',
  brandColor: '#8B4513',
  categories: ['Hot Drinks', 'Cold Drinks', 'Food', 'Extras'],
  items: [
    // Hot Drinks
    {
      id: 'item-001',
      name: 'Latte',
      category: 'Hot Drinks',
      basePrice: 4.50,
      description: 'Espresso with steamed milk',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-small', name: 'Small (12oz)', priceAdjustment: -0.50 },
            { id: 'size-medium', name: 'Medium (16oz)', priceAdjustment: 0 },
            { id: 'size-large', name: 'Large (20oz)', priceAdjustment: 0.75 },
          ],
        },
        {
          id: 'mod-milk',
          name: 'Milk Type',
          required: true,
          multiSelect: false,
          options: [
            { id: 'milk-whole', name: 'Whole Milk', priceAdjustment: 0 },
            { id: 'milk-2percent', name: '2% Milk', priceAdjustment: 0 },
            { id: 'milk-oat', name: 'Oat Milk', priceAdjustment: 0.75 },
            { id: 'milk-almond', name: 'Almond Milk', priceAdjustment: 0.75 },
            { id: 'milk-soy', name: 'Soy Milk', priceAdjustment: 0.50 },
          ],
        },
        {
          id: 'mod-shots',
          name: 'Extra Shots',
          required: false,
          multiSelect: false,
          options: [
            { id: 'shots-0', name: 'Regular', priceAdjustment: 0 },
            { id: 'shots-1', name: '1 Extra Shot', priceAdjustment: 0.75 },
            { id: 'shots-2', name: '2 Extra Shots', priceAdjustment: 1.50 },
          ],
        },
        {
          id: 'mod-flavor',
          name: 'Flavor',
          required: false,
          multiSelect: true,
          options: [
            { id: 'flavor-vanilla', name: 'Vanilla', priceAdjustment: 0.50 },
            { id: 'flavor-caramel', name: 'Caramel', priceAdjustment: 0.50 },
            { id: 'flavor-hazelnut', name: 'Hazelnut', priceAdjustment: 0.50 },
            { id: 'flavor-mocha', name: 'Mocha', priceAdjustment: 0.75 },
          ],
        },
      ],
    },
    {
      id: 'item-002',
      name: 'Cappuccino',
      category: 'Hot Drinks',
      basePrice: 4.25,
      description: 'Espresso with foamed milk',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-small', name: 'Small (8oz)', priceAdjustment: -0.50 },
            { id: 'size-medium', name: 'Medium (12oz)', priceAdjustment: 0 },
            { id: 'size-large', name: 'Large (16oz)', priceAdjustment: 0.75 },
          ],
        },
        {
          id: 'mod-milk',
          name: 'Milk Type',
          required: true,
          multiSelect: false,
          options: [
            { id: 'milk-whole', name: 'Whole Milk', priceAdjustment: 0 },
            { id: 'milk-oat', name: 'Oat Milk', priceAdjustment: 0.75 },
            { id: 'milk-almond', name: 'Almond Milk', priceAdjustment: 0.75 },
          ],
        },
      ],
    },
    {
      id: 'item-003',
      name: 'Americano',
      category: 'Hot Drinks',
      basePrice: 3.50,
      description: 'Espresso with hot water',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-small', name: 'Small (12oz)', priceAdjustment: -0.50 },
            { id: 'size-medium', name: 'Medium (16oz)', priceAdjustment: 0 },
            { id: 'size-large', name: 'Large (20oz)', priceAdjustment: 0.75 },
          ],
        },
      ],
    },
    {
      id: 'item-004',
      name: 'Mocha',
      category: 'Hot Drinks',
      basePrice: 5.00,
      description: 'Espresso with chocolate and steamed milk',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-medium', name: 'Medium (16oz)', priceAdjustment: 0 },
            { id: 'size-large', name: 'Large (20oz)', priceAdjustment: 0.75 },
          ],
        },
        {
          id: 'mod-whip',
          name: 'Whipped Cream',
          required: false,
          multiSelect: false,
          options: [
            { id: 'whip-yes', name: 'With Whip', priceAdjustment: 0 },
            { id: 'whip-no', name: 'No Whip', priceAdjustment: 0 },
          ],
        },
      ],
    },

    // Cold Drinks
    {
      id: 'item-005',
      name: 'Iced Latte',
      category: 'Cold Drinks',
      basePrice: 4.75,
      description: 'Espresso with cold milk over ice',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-medium', name: 'Medium (16oz)', priceAdjustment: 0 },
            { id: 'size-large', name: 'Large (24oz)', priceAdjustment: 1.00 },
          ],
        },
        {
          id: 'mod-milk',
          name: 'Milk Type',
          required: true,
          multiSelect: false,
          options: [
            { id: 'milk-whole', name: 'Whole Milk', priceAdjustment: 0 },
            { id: 'milk-oat', name: 'Oat Milk', priceAdjustment: 0.75 },
            { id: 'milk-almond', name: 'Almond Milk', priceAdjustment: 0.75 },
          ],
        },
      ],
    },
    {
      id: 'item-006',
      name: 'Cold Brew',
      category: 'Cold Drinks',
      basePrice: 4.25,
      description: 'Smooth cold-steeped coffee',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-medium', name: 'Medium (16oz)', priceAdjustment: 0 },
            { id: 'size-large', name: 'Large (20oz)', priceAdjustment: 0.75 },
          ],
        },
      ],
    },

    // Food
    {
      id: 'item-007',
      name: 'Croissant',
      category: 'Food',
      basePrice: 3.50,
      description: 'Buttery French pastry',
      available: true,
      modifiers: [],
    },
    {
      id: 'item-008',
      name: 'Blueberry Muffin',
      category: 'Food',
      basePrice: 3.75,
      description: 'Fresh-baked muffin',
      available: true,
      modifiers: [],
    },
    {
      id: 'item-009',
      name: 'Avocado Toast',
      category: 'Food',
      basePrice: 7.50,
      description: 'Smashed avocado on sourdough',
      available: true,
      modifiers: [
        {
          id: 'mod-extras',
          name: 'Add-ons',
          required: false,
          multiSelect: true,
          options: [
            { id: 'extra-egg', name: 'Fried Egg', priceAdjustment: 2.00 },
            { id: 'extra-bacon', name: 'Bacon', priceAdjustment: 2.50 },
            { id: 'extra-tomato', name: 'Tomato', priceAdjustment: 0.50 },
          ],
        },
      ],
    },
  ],
};

/**
 * Quick Service Restaurant Menu Example
 */
export const quickServiceMenu: MenuConfig = {
  businessId: 'demo-qsr-001',
  businessName: 'Demo Quick Serve',
  brandColor: '#E63946',
  categories: ['Burgers', 'Sides', 'Drinks'],
  items: [
    {
      id: 'burger-001',
      name: 'Classic Burger',
      category: 'Burgers',
      basePrice: 8.99,
      description: 'Beef patty with lettuce, tomato, onion',
      available: true,
      modifiers: [
        {
          id: 'mod-cheese',
          name: 'Cheese',
          required: false,
          multiSelect: false,
          options: [
            { id: 'cheese-american', name: 'American', priceAdjustment: 0.75 },
            { id: 'cheese-cheddar', name: 'Cheddar', priceAdjustment: 0.75 },
            { id: 'cheese-swiss', name: 'Swiss', priceAdjustment: 0.75 },
          ],
        },
        {
          id: 'mod-extras',
          name: 'Add-ons',
          required: false,
          multiSelect: true,
          options: [
            { id: 'extra-bacon', name: 'Bacon', priceAdjustment: 2.00 },
            { id: 'extra-avocado', name: 'Avocado', priceAdjustment: 1.50 },
            { id: 'extra-egg', name: 'Egg', priceAdjustment: 1.50 },
          ],
        },
      ],
    },
    {
      id: 'side-001',
      name: 'French Fries',
      category: 'Sides',
      basePrice: 3.49,
      description: 'Crispy golden fries',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-small', name: 'Small', priceAdjustment: -0.50 },
            { id: 'size-medium', name: 'Medium', priceAdjustment: 0 },
            { id: 'size-large', name: 'Large', priceAdjustment: 1.00 },
          ],
        },
      ],
    },
  ],
};

// Export default menu for demos
export const defaultMenu = coffeeShopMenu;
