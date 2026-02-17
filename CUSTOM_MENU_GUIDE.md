# 📋 How to Add a Custom Menu for Any Business

When pitching to a specific business, you can quickly create a custom menu configuration to make the demo even more impressive.

## Quick Method (5 minutes)

### Step 1: Get Their Menu
- Take a photo of their menu board, or
- Get a PDF from their website, or
- Ask for a copy

### Step 2: Create Menu File

Create a new file: `src/data/[businessname]Menu.ts`

```typescript
import { MenuConfig } from '../types/Menu';

export const acmeCoffeeMenu: MenuConfig = {
  businessId: 'acme-coffee-001',
  businessName: 'Acme Coffee House',
  brandColor: '#4A2C2A', // Their brand color
  categories: ['Hot Drinks', 'Cold Drinks', 'Food'],
  items: [
    {
      id: 'item-001',
      name: 'House Latte',  // Use THEIR exact names
      category: 'Hot Drinks',
      basePrice: 4.95,  // Their exact prices
      description: 'Our signature espresso drink',
      available: true,
      modifiers: [
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-12', name: '12oz', priceAdjustment: 0 },
            { id: 'size-16', name: '16oz', priceAdjustment: 0.50 },
            { id: 'size-20', name: '20oz', priceAdjustment: 1.00 },
          ],
        },
        // Add their milk options
        {
          id: 'mod-milk',
          name: 'Milk',
          required: true,
          multiSelect: false,
          options: [
            { id: 'milk-regular', name: 'Regular', priceAdjustment: 0 },
            { id: 'milk-oat', name: 'Oat', priceAdjustment: 0.75 },
            // ... their options
          ],
        },
      ],
    },
    // Add 5-10 of their most popular items
  ],
};
```

### Step 3: Add to Sample Menus

Edit `src/data/sampleMenus.ts`:

```typescript
// At the top, add import:
import { acmeCoffeeMenu } from './acmeCoffeeMenu';

// At the bottom, export it:
export { acmeCoffeeMenu };
```

### Step 4: Add to Settings Screen

Edit `src/screens/SettingsScreen.tsx`:

```typescript
// Add import
import { acmeCoffeeMenu } from '../data/acmeCoffeeMenu';

// Add button in the render section:
<TouchableOpacity 
  style={[styles.menuButton, menu.businessId === acmeCoffeeMenu.businessId && styles.menuButtonActive]}
  onPress={() => {
    setMenu(acmeCoffeeMenu);
    setTempBusinessName(acmeCoffeeMenu.businessName);
    setTempBrandColor(acmeCoffeeMenu.brandColor || '#4A2C2A');
    Alert.alert('✅ Menu Loaded', 'Acme Coffee menu loaded!');
  }}
>
  <View>
    <Text style={styles.menuButtonTitle}>☕ Acme Coffee House</Text>
    <Text style={styles.menuButtonDescription}>
      Custom menu for demo
    </Text>
  </View>
</TouchableOpacity>
```

## Menu Template (Copy/Paste)

```typescript
import { MenuConfig } from '../types/Menu';

export const [businessname]Menu: MenuConfig = {
  businessId: '[unique-id]',
  businessName: '[Business Name]',
  brandColor: '#000000', // Get from their website
  categories: ['Category1', 'Category2'], // Their categories
  items: [
    // Coffee/Drink Template
    {
      id: 'item-###',
      name: 'Product Name',
      category: 'Category',
      basePrice: 0.00,
      description: 'Brief description',
      available: true,
      modifiers: [
        // Size modifier
        {
          id: 'mod-size',
          name: 'Size',
          required: true,
          multiSelect: false,
          options: [
            { id: 'size-s', name: 'Small', priceAdjustment: -0.50 },
            { id: 'size-m', name: 'Medium', priceAdjustment: 0 },
            { id: 'size-l', name: 'Large', priceAdjustment: 0.75 },
          ],
        },
        // Milk modifier
        {
          id: 'mod-milk',
          name: 'Milk Type',
          required: false,
          multiSelect: false,
          options: [
            { id: 'milk-whole', name: 'Whole Milk', priceAdjustment: 0 },
            { id: 'milk-skim', name: 'Skim', priceAdjustment: 0 },
            { id: 'milk-almond', name: 'Almond', priceAdjustment: 0.75 },
            { id: 'milk-oat', name: 'Oat', priceAdjustment: 0.75 },
            { id: 'milk-soy', name: 'Soy', priceAdjustment: 0.50 },
          ],
        },
        // Extras (optional, multi-select)
        {
          id: 'mod-extras',
          name: 'Add-ons',
          required: false,
          multiSelect: true,
          options: [
            { id: 'extra-shot', name: 'Extra Shot', priceAdjustment: 0.75 },
            { id: 'extra-vanilla', name: 'Vanilla', priceAdjustment: 0.50 },
            { id: 'extra-caramel', name: 'Caramel', priceAdjustment: 0.50 },
          ],
        },
      ],
    },
    
    // Food item template (simpler, fewer modifiers)
    {
      id: 'food-###',
      name: 'Food Item',
      category: 'Food',
      basePrice: 0.00,
      description: 'Description',
      available: true,
      modifiers: [], // Most food items have no modifiers
    },
  ],
};
```

## Tips for Menu Creation

### 1. Focus on Top Sellers
Don't add everything. Add:
- 5-10 most popular drinks
- 3-5 food items
- Items that show complexity (modifiers)

### 2. Match Their Language
- If they say "Regular" not "Whole Milk", use that
- Use their size names (Small/Medium/Large vs. Tall/Grande/Venti)
- Match their terminology exactly

### 3. Get Prices Right
- Shows you did homework
- Makes demo more credible
- Check their menu board or website

### 4. Brand Color
- Use color picker on their website
- Or use their Instagram brand colors
- Fallback: Coffee brown (#4A2C2A) or their industry color

### 5. Keep IDs Unique
- Use business prefix: `acme-item-001`
- Prevents conflicts between menus

## Advanced: Dynamic Menu Loading

For production, you'd load menus from a backend:

```typescript
// Future: Load from API
const loadMenuFromAPI = async (businessId: string) => {
  const response = await fetch(`/api/menus/${businessId}`);
  const menu = await response.json();
  setMenu(menu);
};
```

## Demo Order Scenarios

After creating a custom menu, update demo scenarios in `src/services/DemoService.ts`:

```typescript
// Add custom scenarios for this business
const acmeDemoScenarios: DemoOrderScenario[] = [
  {
    spokenOrder: "Large house latte with oat milk",
    parsedItems: [
      {
        id: 'demo-1',
        name: 'House Latte', // Their exact name
        quantity: 1,
        modifiers: ['20oz', 'Oat'],
        price: 5.95,
      },
    ],
  },
];
```

## Quick Reference: Common Modifiers

### Coffee Shops
- Size (Small/Medium/Large)
- Milk (Whole/Skim/Almond/Oat/Soy)
- Shots (Regular/Extra)
- Flavors (Vanilla/Caramel/Hazelnut/Mocha)
- Temperature (Hot/Iced)
- Sweetener (None/Sugar/Splenda/Honey)

### Restaurants
- Size (Small/Medium/Large)
- Protein (Chicken/Beef/Veggie)
- Cheese (American/Cheddar/Swiss/Pepper Jack)
- Toppings (Lettuce/Tomato/Onion/Pickles)
- Sauce (Mayo/Mustard/Ketchup/Special)
- Cooking (Rare/Medium/Well Done)

### Quick Service
- Size (Value/Regular/Large)
- Sides (Fries/Salad/Fruit)
- Drink (Coke/Sprite/Water)

## Checklist for Each New Business

- [ ] Get their actual menu (photo/PDF)
- [ ] Note their top 5-10 items
- [ ] List their common modifiers
- [ ] Get their exact prices
- [ ] Find their brand color (hex code)
- [ ] Create TypeScript file
- [ ] Test with 3 demo orders
- [ ] Add to Settings screen
- [ ] Practice demo with their items

---

**Time Investment:** 15-30 minutes per business
**Impact:** Massive credibility boost in demo
**Result:** Higher conversion rates

When they see their exact menu items, prices, and branding, the sale becomes much easier!
