import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useOrderStore } from '../store/orderStore';
import { coffeeShopMenu, quickServiceMenu } from '../data/sampleMenus';

interface SettingsScreenProps {
  onBack?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { 
    businessName, 
    brandColor, 
    demoMode, 
    menu,
    setBusinessName, 
    setBrandColor, 
    setDemoMode,
    setMenu,
  } = useOrderStore();

  const [tempBusinessName, setTempBusinessName] = useState(businessName);
  const [tempBrandColor, setTempBrandColor] = useState(brandColor);

  const handleSave = () => {
    setBusinessName(tempBusinessName);
    setBrandColor(tempBrandColor);
    Alert.alert('✅ Saved', 'Settings updated successfully!');
    onBack?.();
  };

  const handleLoadCoffeeMenu = () => {
    setMenu(coffeeShopMenu);
    setTempBusinessName(coffeeShopMenu.businessName);
    setTempBrandColor(coffeeShopMenu.brandColor || '#8B4513');
    Alert.alert('✅ Menu Loaded', 'Coffee shop menu loaded!');
  };

  const handleLoadQSRMenu = () => {
    setMenu(quickServiceMenu);
    setTempBusinessName(quickServiceMenu.businessName);
    setTempBrandColor(quickServiceMenu.brandColor || '#E63946');
    Alert.alert('✅ Menu Loaded', 'Quick service menu loaded!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: brandColor }]}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure for pitches & demos</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Demo Mode</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Enable Demo Mode</Text>
            <Text style={styles.settingDescription}>
              Simulates AI processing without backend
            </Text>
          </View>
          <Switch
            value={demoMode}
            onValueChange={setDemoMode}
            trackColor={{ false: '#d0d0d0', true: '#333' }}
            thumbColor={demoMode ? '#000' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏢 Business Information</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={tempBusinessName}
            onChangeText={setTempBusinessName}
            placeholder="Enter business name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Brand Color (Hex)</Text>
          <View style={styles.colorInputRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={tempBrandColor}
              onChangeText={setTempBrandColor}
              placeholder="#000000"
              placeholderTextColor="#999"
              maxLength={7}
            />
            <View style={[styles.colorPreview, { backgroundColor: tempBrandColor }]} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Menu Templates</Text>
        <Text style={styles.sectionDescription}>
          Load pre-configured menus for quick demos
        </Text>

        <TouchableOpacity 
          style={[styles.menuButton, menu.businessId === coffeeShopMenu.businessId && styles.menuButtonActive]}
          onPress={handleLoadCoffeeMenu}
        >
          <View>
            <Text style={styles.menuButtonTitle}>☕ Coffee Shop Menu</Text>
            <Text style={styles.menuButtonDescription}>
              {coffeeShopMenu.items.length} items • Lattes, Cappuccinos, Pastries
            </Text>
          </View>
          {menu.businessId === coffeeShopMenu.businessId && (
            <Text style={styles.activeIndicator}>✓</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, menu.businessId === quickServiceMenu.businessId && styles.menuButtonActive]}
          onPress={handleLoadQSRMenu}
        >
          <View>
            <Text style={styles.menuButtonTitle}>🍔 Quick Service Menu</Text>
            <Text style={styles.menuButtonDescription}>
              {quickServiceMenu.items.length} items • Burgers, Sides, Drinks
            </Text>
          </View>
          {menu.businessId === quickServiceMenu.businessId && (
            <Text style={styles.activeIndicator}>✓</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Current Menu</Text>
        <View style={styles.menuStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{menu.items.length}</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{menu.categories.length}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {menu.items.filter(i => i.available).length}
            </Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>
        
        <View style={styles.categoryList}>
          {menu.categories.map((category, index) => (
            <View key={index} style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Pitch Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            • Set the business name to match your prospect
          </Text>
          <Text style={styles.tipText}>
            • Use their brand color for personalization
          </Text>
          <Text style={styles.tipText}>
            • Demo mode works without internet
          </Text>
          <Text style={styles.tipText}>
            • Show 2-3 voice orders to demonstrate accuracy
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, { backgroundColor: tempBrandColor }]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>💾 Save Settings</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>SpeechFlow AI v1.0.0</Text>
        <Text style={styles.footerText}>Built for $10k/month target</Text>
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
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  section: {
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 18,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  settingDescription: {
    fontSize: 13,
    color: '#888',
    letterSpacing: 0.1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#000',
    letterSpacing: 0.1,
  },
  colorInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorPreview: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  menuButtonActive: {
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
  },
  menuButtonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  menuButtonDescription: {
    fontSize: 13,
    color: '#888',
    letterSpacing: 0.1,
  },
  activeIndicator: {
    fontSize: 22,
    color: '#000',
  },
  menuStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tipCard: {
    backgroundColor: '#f8f8f8',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  saveButton: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
});
