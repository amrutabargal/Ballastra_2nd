import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CallScreen() {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* ---------- TOP BAR ---------- */}
      <View style={styles.topBar}>
        <View style={styles.leftTop}>
          <TouchableOpacity onPress={() => Alert.alert("Back pressed")}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.clanPill}>
            <Text style={styles.clanText}>Shusshi clan</Text>
            <Ionicons name="chevron-forward" size={14} color="#9ca3af" />
          </View>
        </View>

        <View style={styles.rightTop}>
          <TopIcon
            name={speakerOn ? "volume-high" : "volume-mute"}
            onPress={() => setSpeakerOn(!speakerOn)}
          />
          <TopIcon
            name="person"
            onPress={() => Alert.alert("Participants")}
          />
          <TopIcon
            name="settings"
            onPress={() => Alert.alert("Settings")}
          />
        </View>
      </View>

      {/* ---------- TOP CONTAINER ---------- */}
      <View style={styles.topCard}>
        <Text style={styles.aloneText}>You're alone in this call.</Text>

        <View style={styles.avatarRow}>
          <Image
            source={require("../../assets/Frame 99.png")}
            style={styles.smallAvatar}
          />
          <Image
            source={require("../../assets/Frame10.png")}
            style={[styles.smallAvatar, { opacity: 0.3 }]}
          />
        </View>
      </View>

      {/* ---------- BOTTOM CONTAINER ---------- */}
      <View style={styles.videoCard}>
        <View style={styles.youTag}>
          <Text style={styles.youText}>You</Text>
        </View>

        {videoOn ? (
          <Image
            source={require("../../assets/Frame 99.png")}
            style={styles.centerAvatar}
          />
        ) : (
          <Ionicons name="videocam-off" size={60} color="#9ca3af" />
        )}

        <View style={styles.controls}>
          {/* VIDEO */}
          <ControlBtn
            icon={videoOn ? "videocam" : "videocam-off"}
            onPress={() => setVideoOn(!videoOn)}
          />

          {/* MIC */}
          <ControlBtn
            icon={micOn ? "mic" : "mic-off"}
            onPress={() => setMicOn(!micOn)}
          />

          {/* CHAT */}
          <ControlBtn
            icon="chatbubble"
            onPress={() => Alert.alert("Chat opened")}
          />

          {/* END CALL */}
          <ControlBtn
            icon="call"
            danger
            onPress={() => Alert.alert("Call ended")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------- COMPONENTS ---------- */

const TopIcon = ({ name, onPress }) => (
  <TouchableOpacity style={styles.topIcon} onPress={onPress}>
    <Ionicons name={name} size={18} color="#fff" />
  </TouchableOpacity>
);

const ControlBtn = ({ icon, danger, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.controlBtn,
      danger && { backgroundColor: "#ef4444" },
    ]}
  >
    <Ionicons name={icon} size={20} color="#fff" />
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 16,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  leftTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  clanPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020c2b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },

  clanText: {
    color: "#fff",
    fontSize: 14,
  },

  rightTop: {
    flexDirection: "row",
    gap: 10,
  },

  topIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    justifyContent: "center",
  },

  topCard: {
    backgroundColor: "#020c2b",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    minHeight: 300,
    width: "100%",
    paddingTop: 120,
  },

  aloneText: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 14,
  },

  avatarRow: {
    flexDirection: "row",
    gap: 20,
  },

  smallAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  videoCard: {
    flex: 1,
    backgroundColor: "#1f2933",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
    width: "100%",
  },

  youTag: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#020c2b",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  youText: {
    color: "#fff",
    fontSize: 12,
  },

  centerAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 40,
  },

  controls: {
    position: "absolute",
    bottom: 16,
    flexDirection: "row",
    backgroundColor: "#020c2b",
    padding: 10,
    borderRadius: 24,
    gap: 12,
  },

  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    justifyContent: "center",
  },
});