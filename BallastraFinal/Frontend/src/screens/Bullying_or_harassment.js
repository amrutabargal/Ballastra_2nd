
// src/screens/Bullying_or_harassment.js
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

export default function Bullying_or_harassment({ navigation, route }) {
  const message = route?.params?.message;
  const reason = route?.params?.reason;

  const handleBack = () => {
    navigation?.goBack && navigation.goBack();
  };

  const handleSelect = (value) => {
    navigation?.navigate &&
      navigation.navigate("Bullying_or_harassment_popup", {
        selected: value,
        message,
        reason,
      });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.background} />

      <View style={styles.cardContainer}>
        <View style={styles.handle} />

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

          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>
            Who is being bullied or harassed?
          </Text>

          <Text style={styles.description}>
            Send recent messages from this conversation to ballastra for review.
            If someone is in immediate danger, call the local emergency
            services.
          </Text>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => handleSelect("Me")}
          >
            <Text style={styles.rowText}>Me</Text>
            <Ionicons name="chevron-forward" size={18} color="#C5CAD6" />
          </TouchableOpacity>
          <View style={styles.rowDivider} />

          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => handleSelect("Someone I know")}
          >
            <Text style={styles.rowText}>Someone I know</Text>
            <Ionicons name="chevron-forward" size={18} color="#C5CAD6" />
          </TouchableOpacity>
          <View style={styles.rowDivider} />

          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => handleSelect("Someone else")}
          >
            <Text style={styles.rowText}>Someone else</Text>
            <Ionicons name="chevron-forward" size={18} color="#C5CAD6" />
          </TouchableOpacity>

          <View style={styles.bottomDivider} />
        </ScrollView>
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
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  rowText: {
    flex: 1,
    fontSize: 14,
    color: "#E1E5F0",
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#2B3550",
  },
  bottomDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#2B3550",
    marginTop: 2,
  },
});
