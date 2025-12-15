// screens/SecurityScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";   // ✅ FIXED FOR EXPO

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// Scaling for responsiveness
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const scale = (size) => (SCREEN_W / guidelineBaseWidth) * size;
const verticalScale = (size) => (SCREEN_H / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default function SecurityScreen({ navigation }) {
  const [phone, setPhone] = useState("+91 ");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/[^\d+]/g, "");
    setPhone(cleaned);
  };

  const digits = (v) => v.replace(/[^\d]/g, "");

  const validatePhone = (v) => {
    const d = digits(v);
    return d.length >= 9 && d.length <= 15;
  };

  const handleVerify = () => {
    if (!validatePhone(phone)) {
      Alert.alert("Invalid Number", "Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("VerifyOtp", { phone });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {/* Header */}
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chevron-back"
                  size={moderateScale(22)}
                  color="#fff"
                />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Security</Text>

              <View style={{ width: moderateScale(40) }} />
            </View>

            <View style={{ height: verticalScale(24) }} />

            {/* Label */}
            <Text style={styles.label}>Phone Number</Text>

            {/* Input */}
            <View style={styles.inputWrapper}>
              <LinearGradient
                colors={["rgba(89,102,255,0.14)", "rgba(0,0,0,0)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <View style={styles.inputInner}>
                  <TextInput
                    value={phone}
                    keyboardType="phone-pad"
                    placeholder="+91 98765 43210"
                    placeholderTextColor="rgba(255,255,255,0.35)"
                    onChangeText={handlePhoneChange}
                    style={styles.textInput}
                    maxLength={20}
                    returnKeyType="done"
                  />
                </View>
              </LinearGradient>
            </View>

            {/* Helper */}
            <Text style={styles.helper}>
              We'll send a verification code to this number. You'll need it for
              the next step.
            </Text>

            <Text style={[styles.helper, styles.helperMuted]}>
              Your phone number helps us keep your account secure by adding an
              additional layer of verification.{" "}
              <Text style={styles.linkText}>Learn more</Text>
            </Text>

            <View style={{ flex: 1 }} />

            {/* Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.verifyTouch}
              onPress={handleVerify}
            >
              <LinearGradient
                colors={["#172053", "#2b3b79"]}
                style={styles.verifyButton}
              >
                <Text style={styles.verifyText}>
                  {loading ? "Sending..." : "Verify"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

//============================
// Styles
//============================
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020a25ff",
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(18),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  label: {
    color: "#9aa3d2",
    fontSize: moderateScale(13),
    marginBottom: verticalScale(10),
  },
  inputWrapper: {
    width: "100%",
    marginBottom: verticalScale(18),
  },
  gradientBorder: {
    borderRadius: moderateScale(14),
    padding: 1.5,
  },
  inputInner: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(16),
  },
  textInput: {
    color: "#EAF0FF",
    fontSize: moderateScale(15),
  },
  helper: {
    color: "rgba(255,255,255,0.42)",
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
    marginTop: verticalScale(6),
    maxWidth: "96%",
  },
  helperMuted: {
    marginTop: verticalScale(8),
  },
  linkText: {
    color: "#A7C0FF",
    textDecorationLine: "underline",
  },
  verifyTouch: {
    alignSelf: "center",
    width: "60%",
    marginBottom: verticalScale(32),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  verifyButton: {
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(28),
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
});
