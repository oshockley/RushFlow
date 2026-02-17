export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  modifiers: string[];
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  timestamp: Date;
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  audioFileUri?: string;
  transcription?: string;
}

export interface VoiceRecording {
  uri: string;
  duration: number;
  timestamp: Date;
}
