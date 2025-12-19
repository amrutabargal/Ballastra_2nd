import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Update password</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          {/* CURRENT PASSWORD */}
          <Text style={styles.label}>Current password</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholder="••••••••••••"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>

          {/* NEW PASSWORD */}
          <Text style={[styles.label, { marginTop: 18 }]}>
            New password
          </Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          </View>

          {/* CONFIRM PASSWORD */}
          <Text style={[styles.label, { marginTop: 18 }]}>
            Confirm password
          </Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm password"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: 18,
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
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },
  cancelText: {
    color: "#3B82F6",
    fontSize: 13,
    fontWeight: "500",
  },

  /* CONTENT */
  content: {
    marginTop: 8,
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
    backgroundColor: "#1E2A55",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  input: {
    color: "#ffffff",
    fontSize: 13,
  },

  /* FORGOT */
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: 6,
  },
  forgotText: {
    color: "#9CA3AF",
    fontSize: 11,
  },

  /* SAVE */
  saveBtn: {
    marginTop: 32,
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
