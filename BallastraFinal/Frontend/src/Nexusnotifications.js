import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function NexusNotificationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Nexus Notifications</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* EMPTY CONTENT (AS PER IMAGE) */}
      <View style={styles.emptyArea} />
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
    marginBottom: 10,
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
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },

  /* EMPTY CONTENT */
  emptyArea: {
    flex: 1,
  },
});
