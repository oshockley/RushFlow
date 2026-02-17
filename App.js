import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { VoiceOrderScreen } from './src/screens/VoiceOrderScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return (
      <>
        <SettingsScreen onBack={() => setShowSettings(false)} />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <>
      <VoiceOrderScreen />
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => setShowSettings(true)}
      >
        <Text style={styles.settingsButtonText}>⚙️</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  settingsButtonText: {
    fontSize: 26,
  },
});
