// screens/V44.js   (Sale of illegal or regulated goods guidelines)
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

export default function SalePopup({ navigation }) {
  const handleBack = () => {
    navigation?.goBack && navigation.goBack();
  };

  const handleSubmit = () => {
    // submit logic here
    console.log("Submit guidelines report");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Background (map / image can go here if you want) */}
      <View style={styles.background} />

      {/* Foreground rounded card */}
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

          {/* spacer for centered title */}
          <View style={{ width: 32 }} />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            Sale of illegal or regulated goods guidelines
          </Text>

          <Text style={styles.description}>
            Send recent messages from this conversation to ballastra for review.
            If someone is in immediate danger, call the local emergency
            services.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.subHeading}>
            We define illegal or regulated goods as things such as :-
          </Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Promoting the use of high-risk drugs, such as cocaine, heroin or
              fentanyl.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Buying or selling alcohol, tobacco, marijuana or medical drugs.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Selling or trading guns, ammunition, explosives, live animals or
              animal parts between people.
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
    backgroundColor: "#02071A", // dark behind card
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    // add map / image here if desired
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 8,
    marginTop: Platform.OS === "ios" ? 12 : 24,
    backgroundColor: "#050F24",
    borderRadius: CARD_RADIUS,
    paddingTop: 8,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 14,
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
    fontSize: 20,
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
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3F70FF",
  },
  submitText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
