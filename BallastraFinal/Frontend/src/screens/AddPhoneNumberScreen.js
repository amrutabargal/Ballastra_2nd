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

export default function AddPhoneNumberScreen({ navigation }) {
  const [phone, setPhone] = useState("+91 93237 38283");

  const handleVerify = () => {
    navigation.navigate("ProfileVerificationScreen", { phone });
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

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.label}>Your phone number</Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#060B1E" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  sub: { color: "#9CA3AF", fontSize: 12, textAlign: "center" },
  cancel: { color: "#3B82F6" },
  divider: { height: 1, backgroundColor: "#1F2937" },
  content: { padding: 20 },
  label: { color: "#9CA3AF", marginBottom: 8 },
  input: {
    backgroundColor: "#0F1E46",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    padding: 14,
    color: "#fff",
  },
  verifyBtn: {
    marginTop: 24,
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  verifyText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
