import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AddPhoneNumberScreen({ navigation }) {
  const [phone, setPhone] = useState("+91 93237 38283");
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    // ✅ simulate verification success
    setVerified(true);
  };

  const handleRemove = () => {
    setVerified(false);
    setPhone("");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />
        <View>
          <Text style={styles.title}>Add a phone number</Text>
          <Text style={styles.sub}>Shusshi Clan</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* PHONE INPUT CARD */}
      <View style={styles.content}>
        <View
          style={[
            styles.inputWrap,
            verified && styles.verifiedBorder,
          ]}
        >
          <TextInput
            value={phone}
            onChangeText={setPhone}
            editable={!verified}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="+91 XXXXX XXXXX"
            placeholderTextColor="#6B7280"
          />

          {verified ? (
            <View style={styles.verifiedRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#22C55E"
              />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleVerify}>
              <Text style={styles.verifyBtn}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* REMOVE NUMBER */}
        {verified && (
          <TouchableOpacity
            style={styles.removeRow}
            onPress={handleRemove}
          >
            <Ionicons name="trash" size={16} color="#EF4444" />
            <Text style={styles.removeText}>Remove Number</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#060B1E",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  sub: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
  cancel: {
    color: "#3B82F6",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#1F2937",
  },
  content: {
    padding: 20,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F1E46",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  verifiedBorder: {
    borderColor: "#22C55E",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  verifyBtn: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    color: "#22C55E",
    marginLeft: 6,
    fontWeight: "600",
  },
  removeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  removeText: {
    color: "#EF4444",
    marginLeft: 6,
    fontSize: 14,
  },
});
