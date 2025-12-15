          {/* PROFILE ROW */}

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function MemberProfileScreen({ navigation }) {
  const [callVisible, setCallVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#050B1E" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= MAIN PROFILE CARD ================= */}
        <View style={styles.mainCard}>
          <ImageBackground
            source={{
              uri: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg",
            }}
            style={styles.banner}
            imageStyle={styles.bannerImg}
          >
            <LinearGradient
              colors={["rgba(5,11,30,0.1)", "#050B1E"]}
              style={StyleSheet.absoluteFill}
            />

            {/* ACTION ICONS */}
            <View style={styles.actions}>
              <IconBtn
                name="call-outline"
                onPress={() => setCallVisible(true)}
              />
              <IconBtn name="videocam-outline" onPress={() => navigation.navigate('VideoCallScreen')} />
              <IconBtn name="person-outline" onPress={() => navigation.navigate('HEaderMediachat')} />
              <IconBtn
                name="information-circle-outline"
                onPress={() => setInfoVisible(true)}
              />
            </View>
          </ImageBackground>

          {/* PROFILE ROW */}
          <View style={styles.profileRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=32" }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                Sushis City <Text style={styles.tag}>3521</Text>
              </Text>
              <Text style={styles.subText}>
                fatsammmm • a country mouse
              </Text>
            </View>

            <TouchableOpacity style={styles.orbitBtn}>
              <Ionicons
                name="person-add-outline"
                size={14}
                color="#EAF1FF"
              />
              <Text style={styles.orbitText}>Add Orbits</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= ABOUT ================= */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>About me</Text>

          <Text style={styles.aboutText}>
            <Text style={styles.bold}>Sushi clan :</Text>{" "}
            <Text style={styles.link}>
              https://ballastra.gg/clansushi
            </Text>
          </Text>

          <Text style={styles.aboutText}>
            Grateful for everythings 💜
          </Text>
        </View>
      </ScrollView>

      {/* ================= CALL MODAL ================= */}
      <Modal transparent animationType="fade" visible={callVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.callCard}>
            <Text style={styles.callTitle}>
              Should we begin the call?
            </Text>

            <Image
              source={{ uri: "https://i.pravatar.cc/120?img=32" }}
              style={styles.callAvatar}
            />

            <Text style={styles.callName}>Sushis City</Text>

            <TouchableOpacity style={styles.primaryBtn}>
              <Ionicons name="call" size={16} color="#E5EDFF" />
              <Text style={styles.primaryText}>I’m prepared!</Text>
            </TouchableOpacity>

            <Pressable onPress={() => setCallVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ================= INFO MODAL ================= */}
      <Modal transparent animationType="fade" visible={infoVisible}>
        <View style={styles.infoOverlay}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Joined On</Text>

            <Image
              source={{ uri: "https://i.pravatar.cc/120?img=32" }}
              style={styles.infoAvatar}
            />

            <Text style={styles.infoName}>Shusshi City</Text>

            <View style={styles.dateRow}>
              <Ionicons
                name="walk-outline"
                size={16}
                color="#9FB2FF"
              />
              <Text style={styles.infoDate}>Jan 4, 2023</Text>
            </View>

            <Pressable
              onPress={() => setInfoVisible(false)}
              style={{ marginTop: 14 }}
            >
              <Text style={styles.cancelText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= SMALL ICON ================= */
const IconBtn = ({ name, onPress }) => (
  <TouchableOpacity style={styles.iconBtn} onPress={onPress}>
    <Ionicons name={name} size={18} color="#EAF1FF" />
  </TouchableOpacity>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050B1E",
    paddingHorizontal: 14,
  },

  mainCard: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#070E2A",
    marginTop: 12,
  },

  banner: { height: 170 },
  bannerImg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  actions: {
    position: "absolute",
    top: Platform.OS === "ios" ? 14 : 10,
    right: 12,
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(6,15,45,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#38BDF8",
  },
  name: {
    color: "#EAF1FF",
    fontSize: 16,
    fontWeight: "600",
  },
  tag: { color: "#9FB2FF", fontSize: 13 },
  subText: {
    color: "#9FB2FF",
    fontSize: 12,
    marginTop: 2,
  },

  orbitBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#38BDF8",
  },
  orbitText: {
    color: "#EAF1FF",
    fontSize: 12,
    fontWeight: "600",
  },

  aboutCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    backgroundColor: "#070E2A",
    padding: 14,
    marginTop: 14,
  },
  aboutTitle: {
    color: "#EAF1FF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  aboutText: {
    color: "#C7D2FF",
    fontSize: 13,
    marginBottom: 6,
  },
  bold: { color: "#EAF1FF", fontWeight: "600" },
  link: { color: "#60A5FA" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(6,11,30,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  callCard: {
    width: "78%",
    backgroundColor: "#0B1433",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E3A8A",
  },
  callTitle: {
    color: "#E5EDFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 14,
  },
  callAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  callName: {
    color: "#E5EDFF",
    fontSize: 14,
    marginBottom: 14,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B5CCC",
    paddingVertical: 12,
    borderRadius: 16,
    width: "100%",
    gap: 8,
    marginBottom: 10,
  },
  primaryText: {
    color: "#E5EDFF",
    fontSize: 14,
    fontWeight: "600",
  },
  cancelText: {
    color: "#9FB2FF",
    fontSize: 13,
  },

  /* INFO MODAL */
  infoOverlay: {
    flex: 1,
    backgroundColor: "rgba(6,11,30,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    width: "70%",
    backgroundColor: "#070E2A",
    borderRadius: 26,
    paddingVertical: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E3A8A",
  },
  infoTitle: {
    color: "#EAF1FF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 14,
  },
  infoAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginBottom: 8,
  },
  infoName: {
    color: "#EAF1FF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoDate: {
    color: "#9FB2FF",
    fontSize: 13,
  },
});
