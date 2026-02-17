import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { VoiceRecorder } from '../components/VoiceRecorder';
import { VoiceRecording } from '../types/Order';
import { useOrderStore } from '../store/orderStore';
import { processDemoVoiceOrder } from '../services/DemoService';
import { OrderReviewScreen } from './OrderReviewScreen';

export const VoiceOrderScreen = () => {
  const [recordings, setRecordings] = useState<VoiceRecording[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReview, setShowReview] = useState(false);
  
  const { currentOrder, setCurrentOrder, demoMode, businessName, brandColor, menu } = useOrderStore();

  const handleRecordingComplete = async (recording: VoiceRecording) => {
    console.log('Recording completed:', recording);
    setRecordings([...recordings, recording]);
    
    if (demoMode) {
      // Demo mode: Use simulated processing
      setIsProcessing(true);
      try {
        const order = await processDemoVoiceOrder(recording.uri, menu);
        setCurrentOrder(order);
        setShowReview(true);
      } catch (error) {
        console.error('Demo processing error:', error);
        alert('Error processing order. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Production mode: Would call real API
      alert('Production mode: Connect to backend API');
    }
  };

  const handleBackToRecording = () => {
    setShowReview(false);
  };

  // Show review screen if we have an order
  if (showReview && currentOrder) {
    return <OrderReviewScreen order={currentOrder} onBack={handleBackToRecording} />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: brandColor }]}>
        <Text style={styles.title}>{businessName}</Text>
        <Text style={styles.subtitle}>Voice Order Entry</Text>
        {demoMode && (
          <View style={styles.demoBadge}>
            <Text style={styles.demoBadgeText}>DEMO MODE</Text>
          </View>
        )}
      </View>

      <View style={styles.recorderContainer}>
        {isProcessing ? (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color={brandColor} />
            <Text style={styles.processingText}>Processing order...</Text>
            <Text style={styles.processingSubtext}>AI is analyzing your voice order</Text>
          </View>
        ) : (
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
        )}
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Quick Tips:</Text>
        <Text style={styles.instructionItem}>• Speak clearly and at normal pace</Text>
        <Text style={styles.instructionItem}>• Include all modifiers (size, milk type, etc.)</Text>
        <Text style={styles.instructionItem}>• Say "and" between multiple items</Text>
        <Text style={styles.instructionItem}>• Tap stop when order is complete</Text>
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>Example Orders:</Text>
        <Text style={styles.exampleText}>
          "Large oat milk latte with an extra shot"
        </Text>
        <Text style={styles.exampleText}>
          "Two medium cappuccinos and a croissant"
        </Text>
        <Text style={styles.exampleText}>
          "Iced coffee, large, with almond milk"
        </Text>
      </View>

      <ScrollView style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Recent Orders ({recordings.length})</Text>
        {recordings.slice().reverse().map((rec, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyText}>
              Order #{recordings.length - index} - {rec.duration.toFixed(1)}s
            </Text>
            <Text style={styles.historyTime}>
              {rec.timestamp.toLocaleTimeString()}
            </Text>
          </View>
        ))}
        {recordings.length === 0 && (
          <Text style={styles.emptyHistoryText}>No orders yet. Start recording!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  demoBadge: {
    position: 'absolute',
    top: 60,
    right: 24,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  demoBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  recorderContainer: {
    backgroundColor: '#fff',
    paddingVertical: 50,
    marginTop: 24,
    marginHorizontal: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 240,
    justifyContent: 'center',
  },
  processingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  processingText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    marginTop: 24,
    letterSpacing: -0.2,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    letterSpacing: 0.1,
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    marginTop: 24,
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  instructionsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  instructionItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  exampleContainer: {
    backgroundColor: '#f8f8f8',
    marginTop: 20,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  exampleText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  historyContainer: {
    flex: 1,
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 100,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#888',
    marginBottom: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  historyTime: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
  },
  emptyHistoryText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
});
