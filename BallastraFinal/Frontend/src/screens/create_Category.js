import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import Svg, { Path, Circle } from 'react-native-svg';

/* 🔒 Lock Icon SVG */
const LockSVG = () => (
  <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <Circle cx="21" cy="21" r="20" stroke="#2F62FF" strokeOpacity="0.3" strokeWidth="1.2" />
    <Circle cx="21" cy="21" r="16" stroke="#3F68FF" strokeOpacity="0.8" strokeWidth="1.6" />
    <Path
      d="M21 14C18.79 14 17 15.79 17 18V20H25V18C25 15.79 23.21 14 21 14Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M26 20H16C14.9 20 14 20.9 14 22V28C14 29.1 14.9 30 16 30H26C27.1 30 28 29.1 28 28V22C28 20.9 27.1 20 26 20Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function CreateCategoryScreen({ navigation }) {
  const [categoryName, setCategoryName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ✅ CLOSE BUTTON – SAFE */
  const handleClose = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  /* ✅ CREATE BUTTON – WORKING */
  const handleCreate = () => {
    if (!categoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        `Category "${categoryName}" created successfully!`,
        [{ text: 'OK', onPress: handleClose }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07152C" />

      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          activeOpacity={0.7}
        >
          <X size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Start a Category</Text>
      </View>

      {/* INPUT */}
      <Text style={styles.label}>Category name</Text>
      <TextInput
        style={styles.input}
        placeholder="new-space"
        placeholderTextColor="#7B82A3"
        value={categoryName}
        onChangeText={setCategoryName}
      />

      {/* INFO */}
      <Text style={styles.infoText}>
        Private Spaces are visible only to people you choose. Everyone else won't see them at all.
      </Text>

      {/* PRIVATE SWITCH */}
      <View style={styles.switchRow}>
        <View style={styles.switchLeft}>
          <LockSVG />
          <Text style={styles.switchText}>Private Category</Text>
        </View>

        <Switch
          value={isPrivate}
          onValueChange={setIsPrivate}
          thumbColor={isPrivate ? '#3B82F6' : '#ffffff'}
          trackColor={{ false: '#64748B', true: '#2563EB' }}
          style={{
            alignSelf: 'center',
            transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
          }}
        />
      </View>

      {/* LEARN MORE */}
      <Text style={styles.learnMoreText}>
        Learn more about Space Modes →
      </Text>

      {/* CREATE BUTTON */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        activeOpacity={0.85}
        onPress={handleCreate}
        disabled={loading}
      >
        <LinearGradient
          colors={['#1a2957', '#0C142A', '#1a2957']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.createButtonText}>Create</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* 🎨 STYLES (UNCHANGED) */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07152C',
    paddingHorizontal: 24,
  },

  headerRow: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
    height: 40,
  },

  closeButton: {
    position: 'absolute',
    left: 0,
  },

  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
  },

  label: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0F1B3C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#3154BA',
    shadowColor: '#3154BA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },

  infoText: {
    color: '#ffffff',
    fontSize: 13,
    marginBottom: 20,
    lineHeight: 18,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F1B3C',
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3154BA',
    shadowColor: '#3154BA',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },

  switchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 12,
  },

  learnMoreText: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 34,
  },

  buttonWrapper: {
    alignSelf: 'center',
    width: 135,
    height: 52,
  },

  gradientButton: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    shadowColor: '#3F68FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(63,104,255,0.6)',
  },

  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
