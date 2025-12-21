import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SpaceDiscoveryScreen({ navigation }) {
  const [popupType, setPopupType] = useState(null);

  const [readValue, setReadValue] = useState("Read");
  const [postValue, setPostValue] = useState("Owner");

  return (
    <LinearGradient colors={["#020617", "#020816"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* ---------- HEADER ---------- */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Space discovery</Text>

            <View style={{ width: 22 }} />
          </View>

          {/* ---------- SETTINGS ---------- */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={() => setPopupType("read")}
          >
            <Text style={styles.settingTitle}>Read-Only for Members</Text>

            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{readValue}</Text>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingCard}
            onPress={() => setPopupType("post")}
          >
            <Text style={styles.settingTitle}>Who can post?</Text>

            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{postValue}</Text>
              <Ionicons name="chevron-down" size={16} color="#94a3b8" />
            </View>
          </TouchableOpacity>

          {/* ---------- FOOTER ---------- */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.resetText}>Reset to Default</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ---------- READ POPUP ---------- */}
        <Modal transparent visible={popupType === "read"} animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setPopupType(null)}
          />

          <View style={styles.popup}>
            {["Read", "React"].map((item) => (
              <PopupRow
                key={item}
                label={item}
                active={readValue === item}
                onPress={() => {
                  setReadValue(item);
                  setPopupType(null);
                }}
              />
            ))}
          </View>
        </Modal>

        {/* ---------- POST POPUP ---------- */}
        <Modal transparent visible={popupType === "post"} animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setPopupType(null)}
          />

          <View style={styles.popup}>
            {["Owner", "Admins", "Moderators"].map((item) => (
              <PopupRow
                key={item}
                label={item}
                active={postValue === item}
                onPress={() => {
                  setPostValue(item);
                  setPopupType(null);
                }}
              />
            ))}
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ---------- POPUP ROW (SMALL TOGGLE) ---------- */
const PopupRow = ({ label, active, onPress }) => (
  <TouchableOpacity style={styles.popupRow} onPress={onPress}>
    <Text style={styles.popupText}>{label}</Text>

    <Switch
      value={active}
      onValueChange={onPress}
      trackColor={{ false: "#1e293b", true: "#6366f1" }}
      thumbColor="#ffffff"
      style={{
        transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }], // ✅ TOGGLE SMALL
      }}
    />
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 30,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* SETTINGS */
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#172554",
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#1e3a8a",
  },
  settingTitle: {
    color: "#e5e7eb",
    fontSize: 14,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    color: "#94a3b8",
    fontSize: 13,
    marginRight: 6,
  },

  /* FOOTER */
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 49,
    borderRadius: 14,
  },
  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  resetText: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 12,
  },

  /* POPUP */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    position: "absolute",
    top: "70%",
    left: 20,
    right: 20,
    transform: [{ translateY: -140 }],
    backgroundColor: "#0f172a",
    borderRadius: 18,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#1e3a8a",
  },
  popupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10, // ✅ compact row
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderColor: "#1e3a8a",
  },
  popupText: {
    color: "#fff",
    fontSize: 14,
  },
});