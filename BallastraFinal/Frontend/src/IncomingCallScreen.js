// src/screens/IncomingCallScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IncomingCallScreen({ navigation, route }) {
  const contact = route?.params?.contact || {};

  const handleReject = () => {
    // इथे नंतर backend ला "reject" event पाठवू शकतोस
    navigation.goBack();
  };

  const handleAccept = () => {
    // Accept केल्यावर VoiceCall screen वर
    navigation.replace("VoiceCall", {
      contact,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.container}>
        <Text style={styles.small}>Incoming voice call</Text>
        <Text style={styles.name}>{contact.name || "Perfecto"}</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 8,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 32,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rejectButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: "#4B5563",
    marginRight: 16,
  },
  rejectText: {
    color: "#F9FAFB",
    fontWeight: "600",
    fontSize: 14,
  },
  acceptButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: "#22C55E",
  },
  acceptText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
