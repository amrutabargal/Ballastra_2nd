import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default function UsabilityScreen({ navigation }) {
  const [contrast, setContrast] = useState(40);
  const [saturation, setSaturation] = useState(70);
  const [matchTheme, setMatchTheme] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Usability</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>
      </View>

      {/* 🔹 IDENT COLOR THEME */}
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Idents color theme</Text>

        <View style={styles.rowRight}>
          <Text style={styles.cardValue}>
            Display indents color in names
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="#9CA3AF"
          />
        </View>
      </View>

      {/* 🔹 COLOR ENHANCEMENT */}
      <View style={styles.enhanceCard}>
        <Text style={styles.enhanceTitle}>Color Enhancement</Text>

        <View style={styles.sliderRow}>
          {/* Contrast */}
          <View style={styles.sliderBlock}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={contrast}
              onValueChange={setContrast}
              minimumTrackTintColor="#4F7DFF"
              maximumTrackTintColor="#1E3A8A"
              thumbTintColor="#4F7DFF"
            />
            <Text style={styles.sliderLabel}>Contrast</Text>
          </View>

          {/* Saturation */}
          <View style={styles.sliderBlock}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={saturation}
              onValueChange={setSaturation}
              minimumTrackTintColor="#4F7DFF"
              maximumTrackTintColor="#1E3A8A"
              thumbTintColor="#4F7DFF"
            />
            <Text style={styles.sliderLabel}>Saturation</Text>
          </View>
        </View>

        <Text style={styles.enhanceDesc}>
          Modify the visual contrast between text and background colors.
          Reduces UI color saturation for better comfort without affecting
          images, videos, or user content.
        </Text>
      </View>

      {/* 🔹 MATCH PROFILE THEME */}
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Match profile theme</Text>
        <Switch
          value={matchTheme}
          onValueChange={setMatchTheme}
          trackColor={{ false: "#1E293B", true: "#2563EB" }}
          thumbColor="#ffffff"
        />
      </View>

      {/* 🔹 MOTION REDUCTION */}
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Motion Reduction</Text>

        <View style={styles.rowRight}>
          <Text style={styles.cardValue}>Fewer Animations</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="#9CA3AF"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 18,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 26,
  },
  backBtn: {
    padding: 6,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    marginRight: 28,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },

  /* SIMPLE CARD ROW */
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0B1C3D",
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: "#1E3A8A",

    shadowColor: "#1E40AF",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardLabel: {
    fontSize: 13,
    color: "#E5E7EB",
    fontWeight: "500",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardValue: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  /* ENHANCEMENT CARD */
  enhanceCard: {
    backgroundColor: "#020617",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: "#1E3A8A",

    shadowColor: "#1E40AF",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  enhanceTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 18,
  },
  sliderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderBlock: {
    width: "45%",
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 120,
    transform: [{ rotate: "-90deg" }],
  },
  sliderLabel: {
    marginTop: 12,
    fontSize: 11,
    color: "#E5E7EB",
  },
  enhanceDesc: {
    marginTop: 16,
    fontSize: 10,
    lineHeight: 14,
    color: "#94A3B8",
    textAlign: "center",
  },
});
