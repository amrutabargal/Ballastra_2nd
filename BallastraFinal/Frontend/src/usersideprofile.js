import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function UserProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* 🔹 HEADER IMAGE */}
      <View style={styles.headerWrap}>
        <Image
          source={require("../../assets/profile card.jpg")}
          style={styles.headerImage}
        />

        {/* Back */}
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Shusshi Clan</Text>
      </View>

      {/* 🔹 PROFILE SECTION */}
      <View style={styles.profileSection}>
        <View style={styles.avatarRing}>
          <Image
            source={{
              uri: "https://i.imgur.com/7k12EPD.png",
            }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.name}>Shusshi Clan</Text>

        <Text style={styles.bio}>
          I don’t just play games I study them, master them, and break the limits
          everyone else fears. Skilled aim, smart plays, and a mindset built for
          clutch moments.
        </Text>

        <Text style={styles.username}>@shusshiclan</Text>

        {/* 🔹 ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <ActionBtn
            icon="person-add-outline"
            label="Add Orbits"
            color="#3B82F6"
          />
          <ActionBtn
            icon="chatbubble-outline"
            label="Chat"
            color="#2563EB"
          />
          <ActionBtn icon="information-circle-outline" label="Info" />
          <ActionBtn icon="ban-outline" label="Block" danger />
        </View>
      </View>

      {/* 🔹 BOTTOM TAB */}
      <LinearGradient
        colors={["transparent", "#020617"]}
        style={styles.bottomBar}
      >
        <BottomTab icon="home-outline" label="Home" />
        <BottomTab icon="chatbubble-outline" label="Chat" />
        <BottomTab icon="notifications-outline" label="Notifications" />
        <BottomTab
          icon="person-circle"
          label="You"
          active
          avatar
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const ActionBtn = ({ icon, label, color, danger }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <View
      style={[
        styles.actionIcon,
        danger && { backgroundColor: "#2A0E0E" },
        color && { backgroundColor: color },
      ]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={danger ? "#EF4444" : "#fff"}
      />
    </View>
    <Text style={[styles.actionLabel, danger && { color: "#EF4444" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BottomTab = ({ icon, label, active, avatar }) => (
  <View style={styles.tabItem}>
    {avatar ? (
      <Image
        source={{ uri: "https://i.imgur.com/7k12EPD.png" }}
        style={styles.tabAvatar}
      />
    ) : (
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#22C55E" : "#94A3B8"}
      />
    )}
    <Text
      style={[
        styles.tabLabel,
        active && { color: "#22C55E" },
      ]}
    >
      {label}
    </Text>
  </View>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  /* HEADER */
  headerWrap: {
    height: 240,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  headerTitle: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  /* PROFILE */
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: -40,
  },
  avatarRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  bio: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    color: "#CBD5F5",
    textAlign: "center",
  },
  username: {
    marginTop: 6,
    fontSize: 12,
    color: "#94A3B8",
  },

  /* ACTIONS */
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 24,
  },
  actionBtn: {
    alignItems: "center",
    width: width / 4 - 16,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    marginTop: 6,
    fontSize: 10,
    color: "#E5E7EB",
    textAlign: "center",
  },

  /* BOTTOM BAR */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 12,
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 4,
  },
  tabAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#22C55E",
  },
});
