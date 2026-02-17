import axios from 'axios';

// TODO: Replace with your actual backend URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export interface TranscriptionResponse {
  text: string;
  confidence: number;
}

export interface ParsedOrder {
  items: Array<{
    name: string;
    quantity: number;
    modifiers: string[];
    price: number;
  }>;
  totalPrice: number;
}

/**
 * Upload audio file and get transcription from Whisper API
 */
export const transcribeAudio = async (audioUri: string): Promise<TranscriptionResponse> => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('audio', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    } as any);

    const response = await axios.post(`${API_BASE_URL}/api/voice/transcribe`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 second timeout
    });

    return response.data;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
};

/**
 * Parse transcription text into structured order
 */
export const parseOrder = async (transcription: string): Promise<ParsedOrder> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/voice/parse`, {
      text: transcription,
    });

    return response.data;
  } catch (error) {
    console.error('Order parsing error:', error);
    throw new Error('Failed to parse order');
  }
};

/**
 * Combined function: transcribe and parse in one call
 */
export const processVoiceOrder = async (audioUri: string): Promise<{
  transcription: string;
  order: ParsedOrder;
}> => {
  try {
    const transcriptionResult = await transcribeAudio(audioUri);
    const orderResult = await parseOrder(transcriptionResult.text);

    return {
      transcription: transcriptionResult.text,
      order: orderResult,
    };
  } catch (error) {
    console.error('Voice order processing error:', error);
    throw error;
  }
};
