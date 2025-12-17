
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function V4({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const handleReset = () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // success → go to login / home
    navigation.replace("Loginscreen");
  };

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar hidden />

      {/* ❌ Close */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Center Card */}
      <View style={styles.centerWrapper}>
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Ionicons name="key-outline" size={26} color="#fff" />
          </View>

          {/* Info Text */}
          <Text style={styles.infoText}>
            Your password reset request was verified. Now create a
            new password to continue securely.
          </Text>

          {/* New Password */}
          <Text style={styles.label}>New password</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter your new password"
              placeholderTextColor="#7C8DB5"
              style={styles.input}
              secureTextEntry={secure1}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecure1(!secure1)}>
              <Ionicons
                name={secure1 ? "eye-off" : "eye"}
                size={18}
                color="#8A94B8"
              />
            </TouchableOpacity>
          </View>

          {/* Re-type Password */}
          <Text style={[styles.label, { marginTop: 16 }]}>
            Re-type password
          </Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter re-type new password"
              placeholderTextColor="#7C8DB5"
              style={styles.input}
              secureTextEntry={secure2}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setSecure2(!secure2)}>
              <Ionicons
                name={secure2 ? "eye-off" : "eye"}
                size={18}
                color="#8A94B8"
              />
            </TouchableOpacity>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#050B18",
  },

  closeBtn: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.86,
    backgroundColor: "#0C1E4A",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(90,120,255,0.35)",
  },

  iconWrapper: {
    alignSelf: "center",
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#3255BA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  infoText: {
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "400",
  },

  inputBox: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3154BA",
    backgroundColor: "#142048",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },

  resetBtn: {
    marginTop: 22,
    alignSelf: "center",
    backgroundColor: "#3255BA",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 42,
  },

  resetText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
