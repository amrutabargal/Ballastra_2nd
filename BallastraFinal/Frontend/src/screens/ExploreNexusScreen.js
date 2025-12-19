
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ExploreNexusScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#060B1E" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- MAIN CARD ---------- */}
        <View style={styles.card}>
          {/* Banner */}
          <Image
            source={require("../../assets/baner.gif")}
            style={styles.banner}
          />

          {/* Profile */}
          <View style={styles.profileWrap}>
            <View style={styles.avatarRing}>
              <Image
                source={{ uri: "https://i.imgur.com/7k12EPD.png" }}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.title}>Sushi’s City</Text>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Ionicons
                  name="people-outline"
                  size={14}
                  color="#9CA3FF"
                />
                <Text style={styles.statText}>
                  14,879 Total Members
                </Text>
              </View>

              <View style={styles.dot} />

              <View style={styles.stat}>
                <View style={styles.greenDot} />
                <Text style={styles.statText}>
                  568 Active today
                </Text>
              </View>
            </View>

            {/* Join Button */}
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => navigation.navigate("Nexuschat")} // ✅ NAVIGATION
            >
              <Ionicons
                name="person-add-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.descWrap}>
            <Text style={styles.descTitle}>Descriptions :-</Text>

            <Text style={styles.descText}>
              🌙 Night grind + neon vibes ✨ 🎮 Chill gamers.
              Cozy lobbies 🎧
            </Text>

            <Text style={styles.descText}>
              🌙 Night grind + neon vibes ✨ 🎮 Chill gamers.
              Cozy lobbies 🎧
            </Text>
          </View>

          {/* Created On */}
          <View style={styles.createdWrap}>
            <Text style={styles.createdLabel}>Created On</Text>
            <View style={styles.createdRow}>
              <Ionicons
                name="person-outline"
                size={14}
                color="#9CA3FF"
              />
              <Text style={styles.createdDate}>
                Jan 4, 2023
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#060B1E",
  },

  card: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 26,
    backgroundColor: "#0C142A",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3255BA",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 18,

    // Android shadow
    elevation: 20,
  },

  banner: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },

  profileWrap: {
    alignItems: "center",
    marginTop: -42,
  },

  avatarRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#0C1433",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },

  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  statText: {
    fontSize: 12,
    color: "#ffffff",
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
    marginHorizontal: 8,
  },

  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
  },

  joinBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#3255BA",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 15,
    width: 134,
    height: 52,
    justifyContent: "center",
  },

  joinText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#1F2A5C",
    marginVertical: 16,
  },

  descWrap: {
    paddingHorizontal: 15,
  },

  descTitle: {
    fontSize: 13,
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
    alignSelf: "center",
  },

  descText: {
    fontSize: 10,
    color: "#ffffff",
    marginBottom: 6,
  },

  createdWrap: {
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 15,
    marginBottom: 15,
  },

  createdLabel: {
    fontSize: 11,
    color: "#ffffff",
    marginBottom: 10,
  },

  createdRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  createdDate: {
    fontSize: 12,
    color: "#ffffff",
  },
});
