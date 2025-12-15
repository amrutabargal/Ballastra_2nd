// screens/ReportOrganizedCrimeScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ReportOrganizedCrimeScreen({ navigation }) {
  const handleBack = () => {
    if (navigation && navigation.goBack) navigation.goBack();
  };

  const handleSubmit = () => {
    // Navigate to Done screen with report type info
    navigation.navigate("Done", { reportType: "Organized crime" });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Background (map / image can go here) */}
      <View style={styles.background} />

      {/* Foreground rounded sheet */}
      <View style={styles.cardContainer}>
        {/* drag handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Ionicons
              name="flag-outline"
              size={18}
              color="#FF4B5C"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.headerTitle}>Report</Text>
          </View>

          {/* spacer for perfect centering */}
          <View style={{ width: 32 }} />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Organized crime</Text>

          <Text style={styles.description}>
            Send recent messages from this conversation to ballastra for review.
            If someone is in immediate danger, call the local emergency
            services.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.subHeading}>We take action if we find :</Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Messages that encourage violence or attacks on anyone based on
              their religious, ethnic or sexual background.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Specific threats of physical harm, theft, vandalism or financial
              harm.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom button */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 28;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#02071A",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
     width: "92%",
    alignSelf: "center",
    backgroundColor: "#06112A",
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingBottom: 30,
    paddingTop: 4,
    marginBottom: 18,
    height:750,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#24304A",
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF4B5C",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#C5CAD6",
    marginBottom: 18,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#2B3550",
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#C5CAD6",
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 8,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    color: "#E1E5F0",
    fontSize: 14,
    lineHeight: 20,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingTop: 4,
  },
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
    marginTop:300,
  },
  submitText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
