// KickScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const MAX_CHARS = 500;

export default function KickScreen({ navigation }) {
  const [reason, setReason] = useState("");

  const handleKick = () => {
    // Replace with your kick handler (API call / navigation)
    console.log("Kicked with reason:", reason);
    // Example: navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" translucent={false} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Top row: Close icon, title centered (visually like the screenshot) */}
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack?.()}>
            <Ionicons name="close" size={22} color="#CFE0FF" />
          </TouchableOpacity>

          <Text style={styles.title}>Kick</Text>

          {/* an invisible placeholder to keep title centered */}
          <View style={styles.iconPlaceholder} />
        </View>

        {/* Reason label */}
        <Text style={styles.label}>Reason for kick</Text>

        {/* Big rounded text input box */}
        <View style={styles.inputWrapper}>
          <TextInput
            value={reason}
            onChangeText={(t) => setReason(t)}
            placeholder="Write reason..."
            placeholderTextColor="rgba(207,224,255,0.18)"
            multiline
            maxLength={MAX_CHARS}
            style={styles.textInput}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{`${reason.length}/${MAX_CHARS}`}</Text>
        </View>

        {/* helper small text */}
        <Text style={styles.helperText}>
          Are you sure you want to kick {" "}
          <Text style={styles.username}>"7SUIL_Natashah15"</Text>
          {" "} from the nexus ?{'\n'}they will be able to rejoin again with a new invite.
        </Text>

        {/* Kick button */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleKick}
            disabled={reason.trim().length === 0}
          >
            <LinearGradient
              colors={reason.trim().length ? ["#2D57C8", "#316BFF"] : ["#162947", "#172A44"]}
              start={[0, 0]}
              end={[1, 1]}
              style={[
                styles.kickButton,
                reason.trim().length ? styles.kickButtonActive : styles.kickButtonDisabled,
              ]}
            >
              <Text style={[styles.kickText, reason.trim().length ? {} : { color: "rgba(255,255,255,0.5)" }]}>
                Kick
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050B18", // dark navy background matching image
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    alignItems: "stretch",
  },

  /* top */
  topRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
  },
  title: {
    fontSize: 18,
    color: "#E6EEFF",
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  /* label */
  label: {
    marginTop: 6,
    color: "#CFE0FF",
    fontSize: 13,
    marginBottom: 8,
  },

  /* input box */
  inputWrapper: {
    height: Math.round(height * 0.30), // gives that large textarea look
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(45,87,200,0.16)",
    backgroundColor: "rgba(26,44,77,0.55)", // slightly lighter panel
    padding: 14,
    position: "relative",
    overflow: "hidden",
  },
  textInput: {
    flex: 1,
    color: "#E6EEFF",
    fontSize: 15,
    padding: 0,
    margin: 0,
    lineHeight: 20,
  },
  charCount: {
    position: "absolute",
    right: 12,
    bottom: 10,
    color: "rgba(207,224,255,0.5)",
    fontSize: 12,
  },

  /* helper text under input */
  helperText: {
    marginTop: 12,
    color: "rgba(207,224,255,0.38)",
    fontSize: 11,
    lineHeight: 16,
  },
  username: {
    color: "#CFE0FF",
    fontWeight: "600",
  },

  /* footer / button */
  footer: {
    marginTop: 26,
    alignItems: "center",
  },
  kickButton: {
    width: width * 0.34,
    height: 46,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    // soft shadow to match the pill floating look
    shadowColor: "#316BFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  kickButtonActive: {
    // active gradient colors already set inline
  },
  kickButtonDisabled: {
    // darker muted gradient set inline when disabled
  },
  kickText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
