// TimeoutScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const MAX_CHARS = 500;

export default function TimeoutScreen({ navigation }) {
  const [duration, setDuration] = useState("1 Min");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reason, setReason] = useState("");
  const anim = useRef(new Animated.Value(0)).current;

  const durations = [
    "1 Min",
    "5 Min",
    "10 Min",
    "30 Min",
    "1 Hour",
    "6 Hour",
    "12 Hour",
    "24 Hour",
    "3 Days",
    "7 Days",
  ];

  useEffect(() => {
    Animated.timing(anim, {
      toValue: dropdownOpen ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [dropdownOpen]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] });
  const opacity = anim;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack?.()}>
            <Ionicons name="close" size={20} color="#CFE0FF" />
          </TouchableOpacity>

          <Text style={styles.title}>Timeout</Text>

          <View style={styles.iconPlaceholder} />
        </View>

        {/* Duration pill (with dropdown) */}
        <View style={styles.section}>
          <View style={styles.pillRow}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => setDropdownOpen((s) => !s)}
              style={styles.durationPill}
            >
              <Text style={styles.durationText}>Duration</Text>
              <View style={styles.pillRight}>
                <Text style={styles.durationValue}>{duration}</Text>
                <Ionicons
                  name={dropdownOpen ? "chevron-up" : "chevron-down"}
                  size={14}
                  color="#CFE0FF"
                  style={{ marginLeft: 8 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* dropdown card */}
          {dropdownOpen && (
            <Animated.View style={[ddStyles.card, { opacity, transform: [{ translateY }] }]}>
              {durations.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={ddStyles.row}
                  activeOpacity={0.9}
                  onPress={() => {
                    setDuration(d);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={ddStyles.rowText}>{d}</Text>
                  <View style={d === duration ? ddStyles.radioOn : ddStyles.radioOff} />
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          {/* helper description */}
          <Text style={styles.helper}>
            Members who are in timeout are temporarily not allowed to chat or react in text channels.
            They are also not allowed connect to voice or stage channels.{" "}
            <Text style={styles.learn}>Learn more.</Text>
          </Text>
        </View>

        {/* Reason textarea */}
        <View style={styles.section}>
          <Text style={styles.label}>Reason</Text>

          <View style={styles.textAreaWrap}>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Enter a reason. This will only be visible in the Audit Log and will not be shown to the member."
              placeholderTextColor="rgba(207,224,255,0.18)"
              style={styles.textArea}
              multiline
              maxLength={MAX_CHARS}
              textAlignVertical="top"
            />
            <Text style={styles.counter}>{`${reason.length}/${MAX_CHARS}`}</Text>
          </View>
        </View>

        {/* Timeout button */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => {
              // perform timeout action
              console.log("Timeout:", { duration, reason });
              // navigation.goBack?.();
            }}
            disabled={!reason.trim()}
          >
            <LinearGradient
              colors={!reason.trim() ? ["#16233C", "#16263D"] : ["#2D57C8", "#316BFF"]}
              start={[0, 0]}
              end={[1, 1]}
              style={[styles.timeoutBtn, !reason.trim() && styles.timeoutBtnDisabled]}
            >
              <Text style={styles.timeoutText}>Timeout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050B18" },
  container: { flex: 1, paddingHorizontal: 18, paddingTop: 12 },

  header: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  iconBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  iconPlaceholder: { width: 44, height: 44 },
  title: { color: "#E6EEFF", fontSize: 16, fontWeight: "700" },

  section: { marginTop: 8 },

  pillRow: { marginTop: 8 },
  durationPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(26,44,77,0.95)",
    borderWidth: 1,
    borderColor: "rgba(58,88,160,0.18)",
    shadowColor: "#001428",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
  durationText: { color: "rgba(207,224,255,0.84)", fontSize: 13, fontWeight: "600" },
  pillRight: { flexDirection: "row", alignItems: "center" },
  durationValue: { color: "#CFE0FF", fontSize: 13, fontWeight: "700" },

  helper: { marginTop: 8, color: "rgba(207,224,255,0.44)", fontSize: 11, lineHeight: 16 },
  learn: { color: "rgba(207,224,255,0.64)", textDecorationLine: "underline" },

  label: { marginTop: 16, color: "#CFE0FF", fontSize: 13, marginBottom: 8 },

  textAreaWrap: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(45,87,200,0.16)",
    backgroundColor: "rgba(9,18,36,0.48)",
    padding: 14,
    height: Math.round(height * 0.23),
    position: "relative",
  },
  textArea: { flex: 1, color: "#E6EEFF", fontSize: 15, padding: 0, margin: 0, lineHeight: 20 },
  counter: { position: "absolute", right: 12, bottom: 10, color: "rgba(207,224,255,0.5)", fontSize: 12 },

  footer: { marginTop: 20, alignItems: "center" },
  timeoutBtn: {
    width: width * 0.44,
    height: 48,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#316BFF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  timeoutBtnDisabled: {
    opacity: 0.7,
  },
  timeoutText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

/* dropdown styles */
const ddStyles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 58,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#071129",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(58,88,160,0.18)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 14,
    zIndex: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  rowText: { color: "rgba(207,224,255,0.88)", fontSize: 13 },
  radioOn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#316BFF",
    borderWidth: 1,
    borderColor: "#CFE0FF",
  },
  radioOff: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(207,224,255,0.18)",
    backgroundColor: "transparent",
  },
});
