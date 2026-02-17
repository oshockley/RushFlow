/**
 * POS Adapter - Abstraction layer for different POS systems
 * Currently supports: Mock, Square, Toast, Clover
 */

export type POSSystem = 'mock' | 'square' | 'toast' | 'clover';

export interface POSOrder {
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    modifiers: string[];
    price: number;
  }>;
  totalPrice: number;
}

export interface POSResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}

/**
 * Base POS Adapter interface
 */
abstract class BasePOSAdapter {
  abstract sendOrder(order: POSOrder): Promise<POSResponse>;
  abstract validateConnection(): Promise<boolean>;
}

/**
 * Mock POS Adapter for testing
 */
class MockPOSAdapter extends BasePOSAdapter {
  async sendOrder(order: POSOrder): Promise<POSResponse> {
    console.log('Mock POS: Sending order', order);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      orderId: `MOCK-${Date.now()}`,
    };
  }

  async validateConnection(): Promise<boolean> {
    return true;
  }
}

/**
 * Square POS Adapter
 * Docs: https://developer.squareup.com/docs/orders-api/what-it-does
 */
class SquarePOSAdapter extends BasePOSAdapter {
  private apiKey: string;
  private locationId: string;

  constructor(apiKey: string, locationId: string) {
    super();
    this.apiKey = apiKey;
    this.locationId = locationId;
  }

  async sendOrder(order: POSOrder): Promise<POSResponse> {
    // TODO: Implement Square API integration
    console.log('Square POS: Would send order', order);
    throw new Error('Square integration not yet implemented');
  }

  async validateConnection(): Promise<boolean> {
    // TODO: Validate Square API connection
    return false;
  }
}

/**
 * Toast POS Adapter
 * Docs: https://doc.toasttab.com/
 */
class ToastPOSAdapter extends BasePOSAdapter {
  private apiKey: string;
  private restaurantGuid: string;

  constructor(apiKey: string, restaurantGuid: string) {
    super();
    this.apiKey = apiKey;
    this.restaurantGuid = restaurantGuid;
  }

  async sendOrder(order: POSOrder): Promise<POSResponse> {
    // TODO: Implement Toast API integration
    console.log('Toast POS: Would send order', order);
    throw new Error('Toast integration not yet implemented');
  }

  async validateConnection(): Promise<boolean> {
    // TODO: Validate Toast API connection
    return false;
  }
}

/**
 * Factory function to create POS adapter
 */
export const createPOSAdapter = (
  system: POSSystem,
  config?: Record<string, string>
): BasePOSAdapter => {
  switch (system) {
    case 'mock':
      return new MockPOSAdapter();
    
    case 'square':
      if (!config?.apiKey || !config?.locationId) {
        throw new Error('Square requires apiKey and locationId');
      }
      return new SquarePOSAdapter(config.apiKey, config.locationId);
    
    case 'toast':
      if (!config?.apiKey || !config?.restaurantGuid) {
        throw new Error('Toast requires apiKey and restaurantGuid');
      }
      return new ToastPOSAdapter(config.apiKey, config.restaurantGuid);
    
    default:
      throw new Error(`Unsupported POS system: ${system}`);
  }
};

// Export the adapter instance (default to mock for development)
export const posAdapter = createPOSAdapter('mock');
