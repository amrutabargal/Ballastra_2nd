


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Switch,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function ChannelSettingsScreen({ navigation }) {
  const [soundDisabled, setSoundDisabled] = useState(true);
  const [videoOnly, setVideoOnly] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1228" />

      <View style={styles.screen}>
        {/* ================= MAIN CARD ================= */}
        <View style={[styles.card, styles.elevated]}>
          {/* Small top handle */}
          <View style={styles.handle} />

          {/* Top right icons - Notice they're actually on the main card, not floating */}
          <View style={styles.topIcons}>
            <TouchableOpacity style={[styles.smallIcon, styles.elevated]}>
              <Text style={styles.iconText}>👥</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallIcon, styles.elevated]}>
              <Text style={styles.iconText}>⚙</Text>
            </TouchableOpacity>
          </View>

  

          {/* Channel info section */}
          <View style={styles.channelInfo}>
            {/* Avatars */}
            <View style={styles.avatarRow}>
              <View style={[styles.avatar, styles.elevated, { backgroundColor: "#34d399" }] }>
                <Text style={styles.avatarText}>🙂</Text>
              </View>
              <View
                style={[
                  styles.avatar,
                  styles.elevated,
                  { backgroundColor: "#38bdf8", marginLeft: -18 },
                ]}
              >
                <Text style={styles.avatarText}>😎</Text>
              </View>
            </View>

            {/* Channel Name */}
            <Text style={styles.title}>Shushi Clan & Sushi City</Text>
          </View>

          {/* Option Cards - Two separate cards as in the image */}
          <View style={styles.optionsContainer}>
            {/* Sound Disabled Card */}
            <View style={[styles.optionCard, styles.elevated, styles.firstOptionCard]}>
              <View style={styles.optionContent}>
                <View style={styles.optionLeft}>
                  <View style={styles.optionIconContainer}>
                    <Text style={styles.optionIcon}>🎧</Text>
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionLabel}>Sound Disabled</Text>
                    <Text style={styles.optionSubLabel}>Audio is muted</Text>
                  </View>
                </View>
                <Switch
                  value={soundDisabled}
                  onValueChange={setSoundDisabled}
                  trackColor={{ false: "#1e293b", true: "#3b82f6" }}
                  thumbColor="#fff"
                  ios_backgroundColor="#1e293b"
                />
              </View>
            </View>

            {/* Video-Only View Card */}
            <View style={[styles.optionCard, styles.elevated]}>
              <View style={styles.optionContent}>
                <View style={styles.optionLeft}>
                  <View style={styles.optionIconContainer}>
                    <Text style={styles.optionIcon}>🎥</Text>
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionLabel}>Video-Only View</Text>
                    <Text style={styles.optionSubLabel}>Video only, no audio</Text>
                  </View>
                </View>
                <Switch
                  value={videoOnly}
                  onValueChange={setVideoOnly}
                  trackColor={{ false: "#1e293b", true: "#3b82f6" }}
                  thumbColor="#fff"
                  ios_backgroundColor="#1e293b"
                />
              </View>
            </View>
          </View>

          {/* Footer buttons if needed */}
          <View style={styles.footer}>
            {/* Add any footer buttons here */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const BG = "#0A1228";
const CARD = "#0B1730";
const BORDER = "#1f3a8a";
const OPTION_CARD_BG = "#0A1433";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  screen: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  card: {
    width: width - 24,
    height: height * 0.88,
    backgroundColor: CARD,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: BORDER,
    paddingTop: 12,
    paddingHorizontal: 18,
    position: 'relative',
  },
  
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#94a3b8",
    alignSelf: "center",
    marginBottom: 20,
  },

  timeContainer: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timeText: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '500',
  },

  topIcons: {
    position: "absolute",
    right: 16,
    top: 8,
    flexDirection: "row",
    gap: 8,
    marginTop: 4, },

  smallIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#071739',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },

  iconText: {
    color: "#e5e7eb",
    fontSize: 16,
  },

  channelInfo: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },

  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: CARD,
  },

  avatarText: {
    fontSize: 28,
  },

  title: {
    textAlign: "center",
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  optionsContainer: {
    marginTop: 20,
  },

  optionCard: {
    backgroundColor: '#071739',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2340A0',
    marginBottom: 12,
    height: 52,
    justifyContent: 'center',
  },

  firstOptionCard: {
    marginTop: 0,
  },

  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 52,
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  optionIconContainer: {
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#203a7a',
  },

  optionIcon: {
    fontSize: 20,
  },

  optionTextContainer: {
    flex: 1,
  },

  optionLabel: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },

  optionSubLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },

  footer: {
    marginTop: 'auto',
    marginBottom: 30,
    alignItems: 'center',
  },
});