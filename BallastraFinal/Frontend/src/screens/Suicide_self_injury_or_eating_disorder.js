import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReportProblemScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Background behind the sheet */}
      <View style={styles.background} />

      {/* Dim overlay */}
      <View style={styles.overlay} />

      {/* Center sheet */}
      <View style={styles.sheetContainer}>
        {/* Handle */}
        <View style={styles.sheetHandle} />

        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons name="flag-outline" size={18} color="#FF4B4B" />
          <Text style={styles.headerText}>Report</Text>
        </View>

        {/* Thin divider */}
        <View style={styles.headerDivider} />

        {/* Question + info */}
        <View style={styles.content}>
          <Text style={styles.title}>Which best describes this problem?</Text>

          <Text style={styles.description}>
            Send recent messages from this conversation to ballastra for review.
            If someone is in immediate danger, call the local emergency
            services.
          </Text>

          {/* Options */}
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Suicide_or_self_injury")}
          >
            <Text style={styles.optionText}>Suicide or self-injury</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Eating_disorder")}
          >
            <Text style={styles.optionText}>Eating disorder</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>

          <View style={styles.rowDividerBottom} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#021027", // status bar bg
  },
  background: {
    flex: 1,
    backgroundColor: "#f1e4c9", // fake chat/map background
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheetContainer: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 70,
    bottom: 12,
    backgroundColor: "#021634",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#FF4B4B",
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 22,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  rowDividerBottom: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginTop: 4,
  },
});
