import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function AnnouncementsSettingsScreen({ navigation }) {
  const [showPopup, setShowPopup] = useState(false);
  const [readEnabled, setReadEnabled] = useState(true);
  const [reactEnabled, setReactEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Announcements</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.container}>
        {/* Read Only */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowPopup(true)}
        >
          <Text style={styles.dropdownText}>Read-Only for Members</Text>
          <View style={styles.dropdownRight}>
            <Text style={styles.dropdownValue}>Read</Text>
            <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
          </View>
        </TouchableOpacity>

        {/* Who can post */}
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Who can post?</Text>
          <View style={styles.dropdownRight}>
            <Text style={styles.dropdownValue}>Owner</Text>
            <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
          </View>
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {/* Reset */}
        <TouchableOpacity>
          <Text style={styles.resetText}>Reset to Default</Text>
        </TouchableOpacity>
      </View>

      {/* 🔽 POPUP / BOTTOM CARD */}
      <Modal
        transparent
        animationType="fade"
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowPopup(false)}
        >
          <View style={styles.popupCard}>
            <View style={styles.popupRow}>
              <Text style={styles.popupText}>Read</Text>
              <Switch
                value={readEnabled}
                onValueChange={setReadEnabled}
                thumbColor="#fff"
                trackColor={{ false: "#334155", true: "#8b5cf6" }}
              />
            </View>

            <View style={styles.popupDivider} />

            <View style={styles.popupRow}>
              <Text style={styles.popupText}>React</Text>
              <Switch
                value={reactEnabled}
                onValueChange={setReactEnabled}
                thumbColor="#fff"
                trackColor={{ false: "#334155", true: "#8b5cf6" }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050B18",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  dropdown: {
    backgroundColor: "#0C142A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3255BA",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    color: "#fff",
    fontSize: 14,
  },

  dropdownRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  dropdownValue: {
    color: "#9FB4FF",
    fontSize: 13,
    marginRight: 6,
  },

  saveBtn: {
    marginTop: 28,
    backgroundColor: "#3255BA",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  resetText: {
    marginTop: 14,
    textAlign: "center",
    color: "#9FB4FF",
    fontSize: 13,
  },

  /* POPUP */
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  popupCard: {
    backgroundColor: "#0C142A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
  },

  popupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  popupText: {
    color: "#fff",
    fontSize: 14,
  },

  popupDivider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 6,
  },
});
