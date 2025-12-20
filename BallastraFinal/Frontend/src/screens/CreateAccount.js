import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function V4({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState(
    "https://i.imgur.com/7k12EPD.png"
  );

  /* Change Avatar */
  const handleChangeAvatar = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Gallery access is needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  /* Create Account - Integrate POST /auth/signup */
  const handleCreateAccount = async () => {
    // Validation
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Username validation (3-20 characters, alphanumeric with _ and .)
    if (username.length < 3 || username.length > 20) {
      Alert.alert("Error", "Username must be between 3 and 20 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      Alert.alert("Error", "Username can only contain letters, numbers, underscore (_) and dot (.)");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Password validation (minimum 8 characters)
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      // Optional: Test backend server connectivity
      try {
        const healthUrl = `${BASE_URL}/api/health`;
        console.log("Testing backend server connectivity:", healthUrl);
        const healthController = new AbortController();
        const healthTimeout = setTimeout(() => healthController.abort(), 3000);
        
        const healthResponse = await fetch(healthUrl, {
          method: "GET",
          signal: healthController.signal,
        });
        clearTimeout(healthTimeout);
        
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          console.log("✅ Backend server is reachable:", healthData.message || "OK");
        } else {
          console.warn("⚠️ Backend health check returned status:", healthResponse.status);
        }
      } catch (healthError) {
        console.warn("⚠️ Backend health check skipped:", healthError.message);
        // Don't show alert - just log and continue with signup
      }

      // Use correct endpoint: /api/auth/signup (backend mounts at /api/auth)
      const apiUrl = `${BASE_URL}/api/auth/signup`;
      console.log("Calling signup API:", apiUrl);

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          name: username.trim(),
          email: email.trim().toLowerCase(),
          password: password,
          avatar_url: avatar,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      let data = null;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        if (responseText.trim().startsWith("<")) {
          return Alert.alert(
            "Server Error",
            `The server returned an error page (Status: ${response.status}).\n\nURL: ${apiUrl}\n\nPlease check:\n1. Server is running\n2. Correct IP address\n3. Network connection`
          );
        }
        return Alert.alert(
          "Error",
          `Invalid response from server (Status: ${response.status})\n\nURL: ${apiUrl}`
        );
      }

      if (!response.ok) {
        return Alert.alert(
          "Signup Failed",
          data?.message || `Server error (${response.status}). Please try again.`
        );
      }

      // Store email for OTP verification
      await AsyncStorage.setItem("signupEmail", email.trim().toLowerCase());

      Alert.alert(
        "Success",
        data?.message || "OTP has been sent to your email. Please verify to complete signup.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("VerifyOtp", {
                purpose: "signup",
                email: email.trim().toLowerCase(),
              });
            },
          },
        ]
      );
    } catch (error) {
      console.error("Signup error:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      
      // Provide more specific error messages
      let errorMessage = "Unable to connect to server.";
      
      if (error.name === "AbortError" || error.message.includes("timeout") || error.message.includes("aborted")) {
        errorMessage = `Request timed out.\n\nPlease check:\n1. Server is running at ${BASE_URL}\n2. Server is accessible from your device\n3. Network connection is stable\n\nTry:\n- Restart the backend server\n- Verify IP address: ${BASE_URL}\n- Check if server is listening on port 3000`;
      } else if (error.message === "Network request failed" || error.message.includes("Network request failed")) {
        errorMessage = `Network request failed.\n\nTroubleshooting:\n1. ✅ Server is running? Check backend terminal\n2. ✅ Correct IP? Current: ${BASE_URL}\n3. ✅ Same network? Device and server must be on same WiFi\n4. ✅ Firewall? Allow port 3000\n5. ✅ Test URL: Open ${BASE_URL}/api/auth/signup in browser\n\nFor Android Emulator, try: 10.0.2.2:3000\nFor iOS Simulator, use: localhost:3000 or your Mac's IP`;
      } else {
        errorMessage = `Error: ${error.message}\n\nURL: ${BASE_URL}/api/auth/signup\n\nPlease check your connection and server status.`;
      }
      
      Alert.alert("Connection Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar hidden />

      {/* Close */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity onPress={handleChangeAvatar}>
          <Text style={styles.changeAvatar}>Change avatar</Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* Username */}
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Choose a unique username"
            placeholderTextColor="#7C8DB5"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <Text style={styles.helper}>
          This will be your identity on Ballastra.
        </Text>

        {/* Email */}
        <Text style={[styles.label, { marginTop: 20 }]}>
          Email Address
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#7C8DB5"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <Text style={[styles.label, { marginTop: 20 }]}>
          Password
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Create a password"
            placeholderTextColor="#7C8DB5"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
          />
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={18}
              color="#8A94B8"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Create Account */}
      <TouchableOpacity
        style={[styles.nextBtn, loading && { opacity: 0.7 }]}
        onPress={handleCreateAccount}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextText}>Create Account</Text>
        )}
      </TouchableOpacity>
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

  avatarWrapper: {
    marginTop: height * 0.16,
    alignItems: "center",
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
  },

  changeAvatar: {
    color: "#C7D2FF",
    fontSize: 13,
    fontWeight: "400",
  },

  form: {
    marginTop: 38,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "400",
  },

  inputBox: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3154BA",
    backgroundColor: "#142048",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  input: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },

  eyeBtn: {
    position: "absolute",
    right: 14,
  },

  helper: {
    marginTop: 8,
    fontSize: 11,
    color: "#8A94B8",
  },

  nextBtn: {
    alignSelf: "center",
    backgroundColor: "#3255BA",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 42,
    marginBottom: 110,
  },

  nextText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});