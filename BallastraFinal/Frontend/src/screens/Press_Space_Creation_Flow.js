
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const members = [
  { id: 1, name: "! 7 SUII _Notashish15", color: "#F9C4D2" },
  { id: 2, name: "Lofi#8008", color: "#8BF1D1" },
  {
    id: 3,
    name: "Max gamer58858, Faysal_gaming143\nDevil Gaming",
    color: "#F7B5FF",
  },
  { id: 4, name: "Gaming Piro Yug", color: "#FFE39A" },
  { id: 5, name: "SHERNI", color: "#FF9BD4" },
  { id: 6, name: "! 7 SUII _Notashish15", color: "#F9C4D2" },
];

export default function SpaceSettingsScreen({ navigation }) {
  // toggles / local state
  const [markRead, setMarkRead] = useState(false);
  const [muteSpace, setMuteSpace] = useState(false);

  const onPressMember = (m) => {
    Alert.alert(
      m.name.split("\n")[0],
      null,
      [
        { text: "Message", onPress: () => Alert.alert("Message", `Open DM with ${m.name}`) },
        { text: "Remove", style: "destructive", onPress: () => Alert.alert("Remove", `${m.name} removed (mock)`) },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleNotificationSettings = () => {
    // Example: open a modal or navigate — currently shows an alert
    Alert.alert(
      "Notification Settings",
      "Configure notification preferences for this space.",
      [
        { text: "Open Advanced", onPress: () => Alert.alert("Advanced", "Advanced settings (mock)") },
        { text: "Close", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background card */}
      <View style={styles.topCard} />

      {/* Bottom sheet */}
      <View style={styles.sheetWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sheetScrollContent}
        >
          {/* Top action buttons row */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate?.("Start_a_Space")}
            >
              <View style={styles.actionCircle}>
                <Ionicons name="add" size={22} color="#ffffff" />
              </View>
              <Text style={styles.actionLabel}>Create Space</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate?.("create_Category")}
            >
              <View style={styles.actionCircle}>
                <Ionicons name="albums-outline" size={22} color="#ffffff" />
              </View>
              <Text style={styles.actionLabel}>Create Category</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate?.("Space_Settings")}
            >
              <View style={styles.actionCircle}>
                <Ionicons name="settings-outline" size={22} color="#ffffff" />
              </View>
              <Text style={styles.actionLabel}>Space Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Settings items */}
          <View style={styles.settingsBlock}>
            {/* Mark As Read (toggle) */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsItem}
              onPress={() => setMarkRead((p) => !p)}
            >
              <Text style={styles.settingsText}>
                {markRead ? "Marked as Read" : "Mark As Read"}
              </Text>
              <Ionicons
                name={markRead ? "checkmark-circle" : "eye-outline"}
                size={20}
                color={markRead ? "#9FB4FF" : "#9FB4FF"}
              />
            </TouchableOpacity>

            {/* Mute Space (toggle) */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsItem}
              onPress={() => setMuteSpace((p) => !p)}
            >
              <Text style={styles.settingsText}>{muteSpace ? "Muted" : "Mute Space"}</Text>
              <Ionicons
                name={muteSpace ? "notifications-off" : "notifications-off-outline"}
                size={20}
                color="#9FB4FF"
              />
            </TouchableOpacity>

            {/* Notification Settings (action) */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.settingsItem}
              onPress={handleNotificationSettings}
            >
              <Text style={styles.settingsText}>Notification Settings</Text>
              <Ionicons name="notifications-outline" size={20} color="#9FB4FF" />
            </TouchableOpacity>
          </View>

          {/* Members list */}
          <View style={styles.membersList}>
            {members.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={styles.memberRow}
                activeOpacity={0.8}
                onPress={() => onPressMember(m)}
              >
                <View style={[styles.avatar, { backgroundColor: m.color }]}>
                  <Text style={styles.avatarInitial}>
                    {m.name.trim().charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.memberTextBox}>
                  <Text style={styles.memberName} numberOfLines={2}>
                    {m.name}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => Alert.alert("Sent", `Sent to ${m.name} (mock)`)}
                  style={styles.sentPill}
                >
                  <Text style={styles.sentPillText}>Sent</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const { width: W, height: H } = Dimensions.get("window");
const SHEET_TOP = H * 0.22; // how high the bottom sheet starts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
  },

  topCard: {
    position: "absolute",
    top: H * 0.13,
    left: W * 0.07,
    right: W * 0.07,
    height: H * 0.22,
    borderRadius: 28,
    backgroundColor: "#08152B",
    opacity: 0.95,
  },

  leftFloatingColumn: {
    position: "absolute",
    top: H * 0.2,
    left: 16,
    alignItems: "center",
    zIndex: 10,
  },
  fabSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1D3359",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  fabBig: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3255BA",
    justifyContent: "center",
    alignItems: "center",
  },

  sheetWrapper: {
    flex: 1,
    marginTop: SHEET_TOP,
    paddingHorizontal: 16,
    margin: 5,
  },
  sheetScrollContent: {
    paddingBottom: 28,
    backgroundColor: "#050B18",
    borderRadius: 20,
    borderColor: "#3255BA",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#050B18",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  actionCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#3255BA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: {
    color: "#FFFFFF",
    fontSize: 11,
    textAlign: "center",
  },

  settingsBlock: {
    backgroundColor: "#050B18",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0C142A",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#3154BA",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    shadowColor: "#3154BA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  membersList: {
    backgroundColor: "#050B18",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: "700",
    color: "#161622",
  },
  memberTextBox: {
    flex: 1,
    paddingRight: 8,
  },
  memberName: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  sentPill: {
    width:61,
    height:26,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#0c1933ff",
  },
  sentPillText: {
    color: "#9FB4FF",
    fontSize: 12,
    fontWeight: "500",
  },
});
