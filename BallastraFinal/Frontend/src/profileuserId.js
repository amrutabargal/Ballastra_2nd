import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateUserIDScreen({ navigation }) {
  const [currentUsername] = useState("@Sushshiclan");
  const [newUsername, setNewUsername] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />
        <Text style={styles.headerTitle}>Update User ID</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* CONTENT */}
      <View style={styles.content}>
        {/* CURRENT USERNAME */}
        <Text style={styles.label}>Current Username</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputText}>{currentUsername}</Text>
        </View>

        {/* NEW USERNAME */}
        <Text style={styles.label}>New</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={newUsername}
            onChangeText={setNewUsername}
            placeholder="Username"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 14,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelText: {
    color: "#3B82F6",
    fontSize: 13,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#1E293B",
    marginBottom: 24,
  },

  /* CONTENT */
  content: {
    marginTop: 6,
  },

  label: {
    color: "#E5E7EB",
    fontSize: 12,
    marginBottom: 8,
    marginTop: 16,
  },

  /* INPUT */
  inputWrap: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#0B1C3D",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1E3A8A",

    shadowColor: "#1E40AF",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  inputText: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "500",
  },

  input: {
    color: "#ffffff",
    fontSize: 13,
  },

  /* SAVE BUTTON */
  saveBtn: {
    marginTop: 28,
    alignSelf: "center",
    width: 120,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
  },
});
