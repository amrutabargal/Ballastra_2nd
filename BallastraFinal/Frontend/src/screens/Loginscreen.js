

import React, { useState } from "react";
import { Linking } from "react-native";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import Svg, { Path } from "react-native-svg";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        return Alert.alert(
          "Login Failed",
          data?.message || `Something went wrong (${response.status})`
        );
      }

      if (data?.token) {
        await AsyncStorage.setItem("token", data.token);
      }
      if (data?.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
      }

      Alert.alert("Success", data?.message || "Login successful!");
      navigation.replace("Home");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        return Alert.alert(
          "Error",
          data?.message || "Failed to send reset OTP"
        );
      }

      Alert.alert(
        "Success",
        data?.message || "OTP has been sent to your email.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("ResetPasswordScreen"), // ✅ Changed here
          },
        ]
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <ImageBackground
        source={require("../../assets/image1.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../assets/Text.png")}
                  style={styles.welcomeLabel}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.content}>
                <Text style={styles.title}>Log In</Text>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Username or Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your username or email"
                    placeholderTextColor="#6D7B9A"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordWrapper}>
                    <TextInput
                      style={[styles.input, { paddingRight: 40 }]}
                      placeholder="Enter Your Password"
                      placeholderTextColor="#6D7B9A"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />

                    <TouchableOpacity
                      style={styles.passwordIconWrapper}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                        <Path
                          d="M11.25 13.5L10.7085 11.0625"
                          stroke="#BDBDBD"
                          strokeWidth={1.2}
                          strokeLinecap="round"
                        />
                        <Path
                          d="M1.5 6C2.06 7.53 3.09 8.87 4.42 9.8C5.76 10.74 7.36 11.24 9 11.24C10.64 11.24 12.24 10.74 13.58 9.8C14.92 8.87 15.94 7.53 16.5 6"
                          stroke="#BDBDBD"
                          strokeWidth={1.2}
                          strokeLinecap="round"
                        />
                        <Path
                          d="M15 11.25L13.7 9.71"
                          stroke="#BDBDBD"
                          strokeWidth={1.2}
                          strokeLinecap="round"
                        />
                        <Path
                          d="M3 11.25L4.29 9.71"
                          stroke="#BDBDBD"
                          strokeWidth={1.2}
                          strokeLinecap="round"
                        />
                        <Path
                          d="M6.75 13.5L7.29 11.06"
                          stroke="#BDBDBD"
                          strokeWidth={1.2}
                          strokeLinecap="round"
                        />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleForgetPassword}
                  style={styles.forgotWrapper}
                >
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.loginBtn, loading && { opacity: 0.7 }]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.loginText}>
                    {loading ? "Please wait..." : "Log In"}
                  </Text>
                </TouchableOpacity>

                <View style={styles.bottomRow}>
                  <Text style={styles.bottomText}>
                    Don't have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CreateAccount")}
                  >
                    <Text style={styles.bottomLink}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footerContainer}>
               <TouchableOpacity
  onPress={() => Linking.openURL("https://your-privacy-policy-url.com")}
>
  <Text style={styles.footerText}>Privacy Policy</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => Linking.openURL("https://your-terms-url.com")}
>
  <Text style={styles.footerText}>Terms of Services</Text>
</TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const { width, height } = require("react-native").Dimensions.get("window");

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#050B18",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoWrapper: {
    marginTop: height * 0.06,
    alignItems: "center",
  },
  welcomeLabel: {
    width: width * 0.92,
    height: height * 0.1,
  },
  content: {
    marginTop: height * 0.08,
  },
  title: {
    fontSize: 35,
    color: "#FFFFFF",
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 28,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "500",
  },
  input: {
    paddingVertical: 14,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: "#3154BA4D",
    borderWidth: 1,
    borderColor: "#3154BA",
    color: "#BDBDBD",
    fontWeight: "500",
    fontSize: 12,
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  passwordIconWrapper: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  forgotWrapper: {
    alignItems: "flex-end",
    marginBottom: 60,
  },
  forgot: {
    color: "#BDBDBD",
    fontSize: 10,
    fontWeight: "500",
  },
  loginBtn: {
    backgroundColor: "#3255BA",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 15,
    alignSelf: "center",
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  bottomLink: {
    color: "#3255BA",
    fontSize: 12,
    fontWeight: "700",
  },
  footerContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#BDBDBD",
    fontSize: 10,
    fontWeight: "500",
    textDecorationLine: "underline",
    paddingLeft: 10,
  },
});