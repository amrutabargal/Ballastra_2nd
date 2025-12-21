import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/* Enable animation on Android */
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function GmailAlertsScreen({ navigation }) {
  const [open, setOpen] = useState(null);

  const [nowNotifications, setNowNotifications] = useState(true);
  const [recommendations, setRecommendations] = useState(true);
  const [monthlySummary, setMonthlySummary] = useState(true);

  const toggle = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === key ? null : key);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Gmail Alerts</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* NOW NOTIFICATIONS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => toggle("now")}
        >
          <Row
            title="Now Notifications"
            value={nowNotifications ? "On" : "Off"}
            open={open === "now"}
          />
        </TouchableOpacity>

        {open === "now" && (
          <Popup>
            <PopupRow label="Now Notifications">
              <Switch
                value={nowNotifications}
                onValueChange={setNowNotifications}
                trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                thumbColor="#fff"
              />
            </PopupRow>
          </Popup>
        )}

        {/* RECOMMENDATIONS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => toggle("recommend")}
        >
          <Row
            title="Recommendations from your recent orbits"
            value={recommendations ? "On" : "Off"}
            open={open === "recommend"}
          />
        </TouchableOpacity>

        {open === "recommend" && (
          <Popup>
            <PopupRow label="Recommendations">
              <Switch
                value={recommendations}
                onValueChange={setRecommendations}
                trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                thumbColor="#fff"
              />
            </PopupRow>
          </Popup>
        )}

        {/* MONTHLY SUMMARY */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => toggle("monthly")}
        >
          <Row
            title="Monthly Account Summary"
            value={monthlySummary ? "On" : "Off"}
            open={open === "monthly"}
          />
        </TouchableOpacity>

        {open === "monthly" && (
          <Popup>
            <PopupRow label="Monthly Account Summary">
              <Switch
                value={monthlySummary}
                onValueChange={setMonthlySummary}
                trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                thumbColor="#fff"
              />
            </PopupRow>
          </Popup>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const Row = ({ title, value, open }) => (
  <View style={styles.row}>
    <Text style={styles.cardTitle}>{title}</Text>

    <View style={styles.rowRight}>
      <Text style={styles.cardValue}>{value}</Text>
      <Ionicons
        name={open ? "chevron-up" : "chevron-down"}
        size={16}
        color="#9CA3AF"
      />
    </View>
  </View>
);

const Popup = ({ children }) => (
  <View style={styles.popup}>{children}</View>
);

const PopupRow = ({ label, children }) => (
  <View style={styles.popupRow}>
    <Text style={styles.popupText}>{label}</Text>
    {children}
  </View>
);

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
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },

  /* CONTENT */
  content: {
    gap: 14,
    paddingBottom: 40,
  },

  /* CARD */
  card: {
    height: 52,
    borderRadius: 18,
    paddingHorizontal: 16,
    backgroundColor: "#0B1C3D",
    borderWidth: 1,
    borderColor: "#1E3A8A",

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#1E40AF",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cardTitle: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  cardValue: {
    color: "#9CA3AF",
    fontSize: 11,
  },

  /* DROPDOWN */
  popup: {
    backgroundColor: "#0B1C3D",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    paddingVertical: 6,
  },
  popupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  popupText: {
    color: "#E5E7EB",
    fontSize: 13,
  },
});
