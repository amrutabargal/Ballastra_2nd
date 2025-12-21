import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangeEmailAddressScreen({ navigation }) {
  const [currentEmail] = useState(
    "kzaxw28423@privaterelay.appleid.com"
  );
  const [newEmail, setNewEmail] = useState("");

  const handleSave = () => {
    if (!newEmail.trim()) {
      Alert.alert("Error", "Please enter new email address");
      return;
    }

    if (!newEmail.includes("@")) {
      Alert.alert("Invalid Email", "Enter a valid email address");
      return;
    }

    // ✅ success action
    Alert.alert("Success", "Email updated successfully", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Change email address</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* 🔹 CONTENT */}
      <View style={styles.content}>
        {/* Current Email */}
        <Text style={styles.label}>Current email address</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.readOnlyText}>{currentEmail}</Text>
        </View>

        {/* New Email */}
        <Text style={[styles.label, { marginTop: 18 }]}>
          New email address
        </Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={newEmail}
            onChangeText={setNewEmail}
            style={styles.input}
            placeholder="email address"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          activeOpacity={0.85}
        >
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
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  headerSub: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 2,
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
    marginTop: 4,
  },
  label: {
    color: "#E5E7EB",
    fontSize: 12,
    marginBottom: 8,
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
  input: {
    color: "#ffffff",
    fontSize: 13,
  },
  readOnlyText: {
    color: "#D1D5DB",
    fontSize: 13,
  },

  /* SAVE BUTTON */
  saveBtn: {
    marginTop: 30,
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
