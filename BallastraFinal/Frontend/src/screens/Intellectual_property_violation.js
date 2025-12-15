
// src/screens/ReportIPGuidelinesScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReportIPGuidelinesScreen({ navigation }) {
  const handleSubmit = () => {
    // Optional: send report to backend here
    console.log("Submit IP violation report");

    // Navigate to Done screen
    navigation.navigate("Done", { reportType: "Intellectual Property" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.background} />
      <View style={styles.overlay} />

      <View style={styles.sheetContainer}>
        <View style={styles.sheetHandle} />

        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons name="flag-outline" size={18} color="#FF4B4B" />
          <Text style={styles.headerText}>Report</Text>
        </View>

        {/* Content */}
        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>
              Intellectual property violation guidelines
            </Text>

            <Text style={styles.description}>
              Send recent messages from this conversation to ballastra for
              review.
            </Text>

            <Text style={styles.subtitle}>
              We define intellectual property violations as :-
            </Text>

            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                Messages that include copyright or trademark infringement.
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                If someone is using your photos without your permission or
                impersonating you. We only review feedback sent to us from the
                person who’s being impersonated or a representative of that
                person.
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                Laws in different countries may vary. Visit our Help Centre to
                learn more about giving feedback on an intellectual property
                violation.
              </Text>
            </View>
          </ScrollView>

          {/* Submit button */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#021027" },
  background: { flex: 1, backgroundColor: "#f1e4c9" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
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
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  },
  sheetHandle: { alignSelf: "center", width: 40, height: 4, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.3)", marginBottom: 12 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  headerText: { marginLeft: 6, fontSize: 15, fontWeight: "600", color: "#FF4B4B" },
  contentWrapper: { flex: 1 },
  scrollArea: { flex: 1 },
  scrollContent: { paddingBottom: 16 },
  title: { fontSize: 18, fontWeight: "700", color: "#FFFFFF", marginBottom: 10 },
  description: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 14 },
  subtitle: { fontSize: 13, color: "rgba(255,255,255,0.85)", marginBottom: 10 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  bulletDot: { width: 5, height: 5, borderRadius: 999, backgroundColor: "#FFFFFF", marginTop: 6, marginRight: 10 },
  bulletText: { flex: 1, fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 18 },
  submitButton: {
     width: 134,
    height: 52,
    backgroundColor: "#06112A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    height:52,
    width:134,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
   
       },
  submitButtonText: { fontSize: 15, fontWeight: "600", color: "#FFFFFF" },
});
