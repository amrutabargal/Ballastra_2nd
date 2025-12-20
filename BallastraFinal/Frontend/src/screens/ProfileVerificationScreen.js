import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileVerificationScreen({ navigation, route }) {
  const { phone } = route.params;

  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  /* OTP change handler */
  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  /* VERIFY OTP → GO TO v66 */
  const handleVerifyOTP = () => {
    if (code.join("").length !== 4) {
      Alert.alert("Error", "Please enter valid OTP");
      return;
    }

    // ✅ SUCCESS → v66 SCREEN
    navigation.replace("VerificationSuccessScreen");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />
        <View>
          <Text style={styles.title}>Verifications</Text>
          <Text style={styles.sub}>Shusshi Clan</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.heading}>Verifications</Text>
        <Text style={styles.desc}>
          Enter the code sent to {phone}
        </Text>

        {/* OTP BOXES */}
        <View style={styles.otpRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpBox}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* VERIFY BUTTON */}
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={handleVerifyOTP}
        >
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
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
    alignItems: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  desc: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 6,
  },
  otpRow: {
    flexDirection: "row",
    marginTop: 24,
  },
  otpBox: {
    width: 56,
    height: 56,
    backgroundColor: "#0F1E46",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    marginHorizontal: 6,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  verifyBtn: {
    marginTop: 28,
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
