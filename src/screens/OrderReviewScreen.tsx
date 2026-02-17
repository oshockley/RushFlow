import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Order } from '../types/Order';
import { useOrderStore } from '../store/orderStore';
import { posAdapter } from '../services/POSAdapter';

interface OrderReviewScreenProps {
  order?: Order;
  onBack?: () => void;
}

export const OrderReviewScreen: React.FC<OrderReviewScreenProps> = ({ order, onBack }) => {
  const { addOrder, brandColor } = useOrderStore();
  
  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No order to review</Text>
      </View>
    );
  }

  const handleConfirm = async () => {
    try {
      // Send to POS system
      const response = await posAdapter.sendOrder({
        items: order.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          modifiers: item.modifiers,
          price: item.price,
        })),
        totalPrice: order.totalPrice,
      });

      if (response.success) {
        // Add to order history
        addOrder({ ...order, status: 'completed' });
        alert(`✅ Order confirmed!\nPOS Order ID: ${response.orderId}`);
        onBack?.();
      } else {
        alert(`❌ Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Order confirmation error:', error);
      alert('Failed to send order to POS');
    }
  };

  const handleEdit = () => {
    alert('Edit functionality coming soon!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: brandColor }]}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Order Review</Text>
        <Text style={styles.orderId}>Order #{order.id}</Text>
      </View>

      {order.transcription && (
        <View style={styles.transcriptionCard}>
          <Text style={styles.sectionTitle}>🎤 Voice Transcription</Text>
          <Text style={styles.transcriptionText}>"{order.transcription}"</Text>
        </View>
      )}

      <View style={styles.itemsCard}>
        <Text style={styles.sectionTitle}>📝 Order Items</Text>
        {order.items.map((item, index) => (
          <View key={item.id || index} style={styles.orderItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemQuantity}>{item.quantity}×</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            
            {item.modifiers && item.modifiers.length > 0 && (
              <View style={styles.modifiersContainer}>
                {item.modifiers.map((modifier, idx) => (
                  <Text key={idx} style={styles.modifierText}>
                    • {modifier}
                  </Text>
                ))}
              </View>
            )}
            
            {item.notes && (
              <Text style={styles.notesText}>Note: {item.notes}</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={[styles.totalAmount, { color: brandColor }]}>
          ${order.totalPrice.toFixed(2)}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>✏️ Edit Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.confirmButton, { backgroundColor: brandColor }]}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>✓ Confirm & Send to POS</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 0,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  orderId: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  transcriptionCard: {
    backgroundColor: '#f8f8f8',
    margin: 24,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  transcriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  itemsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  orderItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    width: 45,
    letterSpacing: -0.2,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    letterSpacing: -0.1,
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.2,
  },
  modifiersContainer: {
    marginLeft: 45,
    marginBottom: 6,
  },
  modifierText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  notesText: {
    marginLeft: 45,
    fontSize: 13,
    color: '#aaa',
    fontStyle: 'italic',
  },
  totalCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.2,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  editButton: {
    backgroundColor: '#f8f8f8',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.2,
  },
  confirmButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 60,
    letterSpacing: 0.2,
  },
});
