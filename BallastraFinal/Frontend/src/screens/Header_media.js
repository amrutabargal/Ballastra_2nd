
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const MEMBERS = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i),
  name: "! 7SUII_Notashish15",
  avatar: "https://i.pravatar.cc/100?img=32",
}));

export default function ChannelMembersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#060B1E" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#C7D2FF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.channelRow}>
            <View style={styles.hashBox}>
              <Text style={styles.hashText}>#</Text>
            </View>
            <Text style={styles.channelName}>Media</Text>
          </View>
          <Text style={styles.subText}>&lt; media &gt;</Text>
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ padding: 6 }}>
            <Ionicons name="search" size={18} color="#E5EDFF" />
          </TouchableOpacity>
          <Ionicons name="notifications-outline" size={18} color="#E5EDFF" />
          <Ionicons name="people-outline" size={18} color="#E5EDFF" />
          <Ionicons name="settings-outline" size={18} color="#E5EDFF" />
        </View>
      </View>

      {/* MEMBERS */}
      <Text style={styles.membersTitle}>Members</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {MEMBERS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("Header_media_memeberprofile")}
            activeOpacity={0.85}
          >
            <View style={styles.leftRow}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#C7D2FF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#060B1E",
    paddingHorizontal: 16,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 6 : 10,
    marginBottom: 14,
  },
  backBtn: {
    width: 36,
    alignItems: "flex-start",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  hashBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  hashText: {
    color: "#E5EDFF",
    fontSize: 16,
    fontWeight: "600",
  },
  channelName: {
    color: "#E5EDFF",
    fontSize: 15,
    fontWeight: "600",
  },
  subText: {
    color: "#9FB2FF",
    fontSize: 11,
    marginTop: 2,
  },
  iconRow: {
    flexDirection: "row",
    gap: 14,
  },

  /* MEMBERS */
  membersTitle: {
    color: "#E5EDFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },

  /* CARD */
  card: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3B82F6",
    backgroundColor: "#070E2A",
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  name: {
    color: "#E5EDFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
