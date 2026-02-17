import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { VoiceRecording } from '../types/Order';

interface VoiceRecorderProps {
  onRecordingComplete: (recording: VoiceRecording) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const startRecording = async () => {
    try {
      // Request permissions
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Permission to access microphone is required!');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      alert('Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsProcessing(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const status = await recording.getStatusAsync();
      
      if (uri) {
        const voiceRecording: VoiceRecording = {
          uri,
          duration: status.durationMillis ? status.durationMillis / 1000 : 0, // Convert to seconds
          timestamp: new Date(),
        };
        
        onRecordingComplete(voiceRecording);
      }
      
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
      alert('Failed to stop recording');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.recordButton}>
        {isProcessing ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity
            style={[styles.button, isRecording && styles.buttonRecording]}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.7}
          >
            <View style={styles.buttonInner}>
              {isRecording ? (
                <View style={styles.stopIcon} />
              ) : (
                <View style={styles.micIcon} />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.instructionText}>
        {isRecording ? 'Tap to stop recording' : 'Tap to start voice order'}
      </Text>
      
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <View style={styles.pulse} />
          <Text style={styles.recordingText}>Recording...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  recordButton: {
    width: 140,
    height: 140,
    marginBottom: 25,
  },
  button: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonRecording: {
    backgroundColor: '#1a1a1a',
  },
  buttonInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  micIcon: {
    width: 44,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 22,
  },
  stopIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  instructionText: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderRadius: 24,
  },
  pulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 12,
  },
  recordingText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
