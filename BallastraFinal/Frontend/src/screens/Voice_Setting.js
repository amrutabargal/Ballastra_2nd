import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function VoiceSettingsScreen({ navigation }) {
  const [autoSensitivity, setAutoSensitivity] = useState(true);
  const [echoCancel, setEchoCancel] = useState(true);
  const [autoVolume, setAutoVolume] = useState(true);

  // 🔥 Common popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(null); // "input" | "noise"

  const [inputMode, setInputMode] = useState("Voice Activity");
  const [noiseMode, setNoiseMode] = useState("Standard");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#050B1A", "#0A1330", "#050B1A"]}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ width: 22 }} />
            <Text style={styles.headerTitle}>Voice Settings</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* INPUT MODE */}
          <TouchableOpacity
            style={styles.pillRow}
            onPress={() => {
              setPopupType("input");
              setShowPopup(true);
            }}
          >
            <Text style={styles.pillText}>Input Mode</Text>
            <View style={styles.rightValue}>
              <Text style={styles.valueText}>{inputMode}</Text>
              <Ionicons name="chevron-down" size={16} color="#9BA4FF" />
            </View>
          </TouchableOpacity>

          {/* Auto Sensitivity */}
          <View style={styles.pillRow}>
            <Text style={styles.pillText}>Auto Sensitivity</Text>
            <Switch
              value={autoSensitivity}
              onValueChange={setAutoSensitivity}
              trackColor={{ false: "#1E2A5A", true: "#6C7CFF" }}
              thumbColor="#fff"
            />
          </View>

          {/* OUTPUT */}
          <View style={styles.outputCard}>
            <Text style={styles.outputTitle}>Output</Text>

            <View style={styles.sliderRow}>
              <View style={styles.slider} />
              <View style={[styles.slider, styles.sliderActive]} />
              <View style={styles.slider} />
            </View>

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>Sensitivity</Text>
              <Text style={styles.sliderLabel}>Volume</Text>
              <Text style={styles.sliderLabel2}>Board Volume</Text>
            </View>

            <Text style={styles.helpText}>
              Having issues with voice or video?{" "}
              <Text style={styles.link}>troubleshooting guide</Text>.
            </Text>

            <Text style={styles.learnText}>
              Control your sound volume.{" "}
              <Text style={styles.link}>Learn more</Text>.
            </Text>
          </View>

          {/* Echo Cancellation */}
          <View style={styles.pillRow}>
            <Text style={styles.pillText}>Acoustic Echo Cancellation</Text>
            <Switch
              value={echoCancel}
              onValueChange={setEchoCancel}
              trackColor={{ false: "#1E2A5A", true: "#6C7CFF" }}
              thumbColor="#fff"
            />
          </View>

          {/* NOISE SUPPRESSION */}
          <TouchableOpacity
            style={styles.pillRow}
            onPress={() => {
              setPopupType("noise");
              setShowPopup(true);
            }}
          >
            <Text style={styles.pillText}>Noise Suppression</Text>
            <View style={styles.rightValue}>
              <Text style={styles.valueText}>{noiseMode}</Text>
              <Ionicons name="chevron-down" size={16} color="#9BA4FF" />
            </View>
          </TouchableOpacity>

          {/* Auto Volume */}
          <View style={styles.autoVolumeCard}>
            <View style={styles.autoVolumeRow}>
              <Text style={styles.pillText}>Auto Volume Control</Text>
              <Switch
                value={autoVolume}
                onValueChange={setAutoVolume}
                trackColor={{ false: "#1E2A5A", true: "#6C7CFF" }}
                thumbColor="#fff"
              />
            </View>

            <Text style={styles.subText}>
              Automatically keeps mic volume clear and balanced.
            </Text>
          </View>
        </View>

        {/* ================= COMMON BOTTOM POPUP ================= */}
        {showPopup && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setShowPopup(false)}
            />

            <View style={styles.inputModeSheet}>
              <View style={styles.handle} />

              {/* INPUT MODE OPTIONS */}
              {popupType === "input" && (
                <>
                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => {
                      setInputMode("Voice Activity");
                      setShowPopup(false);
                    }}
                  >
                    <Text style={styles.optionText}>Voice Activity</Text>
                    {inputMode === "Voice Activity" && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#6C7CFF"
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => {
                      setInputMode("Push to Talk");
                      setShowPopup(false);
                    }}
                  >
                    <Text style={styles.optionText}>Push to Talk</Text>
                    {inputMode === "Push to Talk" && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#6C7CFF"
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}

              {/* NOISE SUPPRESSION OPTIONS */}
              {popupType === "noise" && (
                <>
                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => {
                      setNoiseMode("Standard");
                      setShowPopup(false);
                    }}
                  >
                    <Text style={styles.optionText}>Standard</Text>
                    {noiseMode === "Standard" && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#6C7CFF"
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => {
                      setNoiseMode("None");
                      setShowPopup(false);
                    }}
                  >
                    <Text style={styles.optionText}>None</Text>
                    {noiseMode === "None" && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#6C7CFF"
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050B1A" },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center" },

  sheet: {
    width: width * 0.94,
    height: height * 0.92,
    backgroundColor: "#050B1A",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#2A3C7A",
    padding: 16,
  },

  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5E6B9A",
    alignSelf: "center",
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerTitle: { fontSize: 15, fontWeight: "600", color: "#fff" },

  pillRow: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#0D1B3D",
    borderWidth: 1,
    borderColor: "#2A3C7A",
    marginBottom: 14,
  },

  pillText: { fontSize: 14, color: "#fff", fontWeight: "500" },
  rightValue: { flexDirection: "row", alignItems: "center", gap: 6 },
  valueText: { fontSize: 13, color: "#9BA4FF" },

  autoVolumeCard: {
    borderRadius: 14,
    backgroundColor: "#0D1B3D",
    borderWidth: 1,
    borderColor: "#2A3C7A",
    paddingHorizontal: 16,
    paddingBottom: 6,
  },

  autoVolumeRow: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  subText: { fontSize: 11, color: "#9BA4FF", marginTop: -6 },

  outputCard: {
    borderRadius: 18,
    backgroundColor: "#07142F",
    borderWidth: 1,
    borderColor: "#2A3C7A",
    padding: 16,
    marginBottom: 16,
  },

  outputTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18,
  },

  sliderRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 40,
    height: 120,
    marginBottom: 12,
  },

  slider: {
    width: 12,
    height: "90%",
    borderRadius: 6,
    backgroundColor: "#1E2A5A",
  },

  sliderActive: { backgroundColor: "#4F7CFF" },

  sliderLabels: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -6,
    marginBottom: 12,
  },

  sliderLabel: {
    fontSize: 11,
    color: "#C7D2FF",
    width: 56,
    textAlign: "center",
  },

  sliderLabel2: {
    fontSize: 11,
    color: "#C7D2FF",
    width: 68,
    textAlign: "center",
  },

  helpText: { fontSize: 11, color: "#9BA4FF", textAlign: "center" },
  learnText: { fontSize: 11, color: "#9BA4FF", textAlign: "center" },
  link: { color: "#6C7CFF" },

  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  inputModeSheet: {
    backgroundColor: "#050B1A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "#2A3C7A",
  },

  optionRow: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    backgroundColor: "#0D1B3D",
    borderWidth: 1,
    borderColor: "#2A3C7A",
    paddingHorizontal: 16,
    marginTop: 12,
  },

  optionText: { fontSize: 14, color: "#fff", fontWeight: "500" },
});
