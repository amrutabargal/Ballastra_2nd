
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// TODO: हा path तुझ्या प्रोजेक्टनुसार change कर
import { BASE_URL } from "../config";

const { width, height } = Dimensions.get("window");

// layout helpers
const TITLE_TOP = height * 0.38;

export default function SigninUp({ navigation }) {
  const [loading, setLoading] = useState(false);

  const avatarAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const titleAnim = useRef(new Animated.Value(0)).current;

  const buttonAnims = useRef([
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
  ]).current;

  useEffect(() => {
    const avatarAnimations = avatarAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.parallel([
      ...avatarAnimations,
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 800,
        delay: 600,
        useNativeDriver: true,
      }),
      ...buttonAnims.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 0,
          duration: 500,
          delay: 1000 + index * 100,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  // Avatar positions (exact same)
  const centerX = width / 2;
  const baseTop = height * 0.17;

  const avatarPositions = [
    {
      top: baseTop,
      left: centerX - 40,
      bg: "#E8D4F8",
      src: require("../../assets/avatar1.png"),
      size: 42,
    },
    {
      top: baseTop - 8,
      left: centerX + 8,
      bg: "#FFD4D4",
      src: require("../../assets/avatar2.png"),
      size: 46,
    },
    {
      top: baseTop + 38,
      left: centerX + 55,
      bg: "#D4F8F4",
      src: require("../../assets/avatar3.png"),
      size: 50,
    },
    {
      top: baseTop + 80,
      left: centerX - 80,
      bg: "#FFF4D4",
      src: require("../../assets/avatar4.png"),
      size: 54,
    },
    {
      top: baseTop + 50,
      left: centerX - 18,
      bg: "#FFB4D4",
      src: require("../../assets/avatar5.png"),
      size: 62,
    },
    {
      top: baseTop + 25,
      left: centerX - 90,
      bg: "#D4E4F8",
      src: require("../../assets/avatar6.png"),
      size: 48,
    },
  ];

  // ===================== GOOGLE (फिलहाल dummy / no backend) =====================
  const handleGoogleSignIn = () => {
    // इथे तुझ्याकडे backend google route नसेल तर fallback navigate करा
    try {
      const state = navigation.getState && navigation.getState();
      const names = state?.routeNames || [];
      if (names.includes("GoogleLogin")) {
        navigation.replace("GoogleLogin");
      } else {
        navigation.replace("Home");
      }
    } catch (err) {
      navigation.replace("Home");
    }
    // नंतर backend route तयार केल्यावर इथे axios.post("/google-login") वगैरे करू शकतो.
  };

  // ===================== APPLE LOGIN → /apple-login =====================
  const handleAppleSignIn = async () => {
    try {
      setLoading(true);

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error("No identity token from Apple");
      }

      // Call backend appleLogin controller
      const res = await axios.post(`${BASE_URL}/api/auth/apple-login`, {
        id_token: credential.identityToken,
      });

      const { token, user, message } = res.data || {};

      // Store token and user data
      if (token) {
        await AsyncStorage.setItem("token", token);
      }
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }

      Alert.alert("Success", message || "Apple login success");
      // Navigate to home after successful login
      navigation.replace("Home");
    } catch (err) {
      console.log("Apple login error:", err?.response?.data || err?.message);
      Alert.alert("Apple Login Failed", "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Welcome Label Image */}
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/Text.png")}
            style={styles.welcomeLabel}
            resizeMode="contain"
          />
        </View>

        {/* Avatar Images */}
        <View style={styles.avatarContainer}>
          {avatarPositions.map((pos, index) => (
            <Animated.View
              key={index}
              style={[
                styles.avatar,
                {
                  top: pos.top,
                  left: pos.left,
                  backgroundColor: pos.bg,
                  width: pos.size,
                  height: pos.size,
                  borderRadius: pos.size / 2,
                  opacity: avatarAnims[index],
                  transform: [
                    {
                      scale: avatarAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image
                source={pos.src}
                style={{
                  width: pos.size * 0.75,
                  height: pos.size * 0.75,
                  borderRadius: pos.size,
                }}
                resizeMode="cover"
              />
            </Animated.View>
          ))}
        </View>

        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleAnim,
              transform: [
                {
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>Let’s Go</Text>
        </Animated.View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Login */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[0] }] }}>
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={() => navigation.navigate("Loginscreen")}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Google */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[1] }] }}>
            <TouchableOpacity
              style={[styles.googleButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={handleGoogleSignIn}
            >
              <View style={styles.googleContent}>
                <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <G clipPath="url(#clip0)">
                    <Path
                      fill="#FBBB00"
                      d="M4.43 12.086L3.736 14.685l-2.544.054A9.99 9.99 0 010 10c0-1.658.403-3.222 1.118-4.599h.001l2.266.415 1 2.252A5.97 5.97 0 004.056 10c0 .734.133 1.437.376 2.086z"
                    />
                    <Path
                      fill="#518EF8"
                      d="M19.825 8.132A9.96 9.96 0 0120 10c0 .716-.075 1.414-.219 2.088a10.013 10.013 0 01-3.52 5.71l-2.854-.146-.403-2.52a5.98 5.98 0 002.564-3.311h-5.347V8.132h9.604z"
                    />
                    <Path
                      fill="#28B446"
                      d="M16.26 17.798A9.96 9.96 0 0110 20C6.192 20 2.88 17.871 1.192 14.739l3.24-2.653A5.975 5.975 0 0010 15.945c1.096 0 2.122-.296 3.003-.813l3.257 2.666z"
                    />
                    <Path
                      fill="#F14336"
                      d="M16.383 2.302L13.143 4.954A5.947 5.947 0 0010 4.055a5.98 5.98 0 00-5.624 3.47L1.118 5.401C2.782 2.192 6.135 0 10 0c2.426 0 4.65.864 6.383 2.302z"
                    />
                  </G>
                  <Defs>
                    <ClipPath id="clip0">
                      <Rect width="20" height="20" fill="#fff" />
                    </ClipPath>
                  </Defs>
                </Svg>
                <Text style={styles.googleText}>Continue With Google</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Apple */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[2] }] }}>
            <TouchableOpacity
              style={[styles.appleButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={handleAppleSignIn}
            >
              <View style={styles.appleContent}>
                <Ionicons name="logo-apple" size={24} color="#000" />
                {loading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text style={styles.appleText}>Continue With Apple</Text>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Create Account */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[3] }] }}>
            <TouchableOpacity
              style={[styles.createButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Text style={styles.createText}>Create Account</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={{ width: 16 }} />
          <TouchableOpacity>
            <Text style={styles.footerText}>Terms of Services</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050B18",
  },

  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#050B18",
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.0)",
  },

  logoWrapper: {
    position: "absolute",
    top: height * 0.06,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  welcomeLabel: {
    width: width * 0.95,
    height: height * 0.1,
  },

  avatarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  avatar: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    position: "absolute",
    top: TITLE_TOP,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "400",
    letterSpacing: 2,
  },

  buttonsContainer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 130,
  },

  loginButton: {
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#3154BA4D",
    borderWidth: 1,
    borderColor: "rgba(49,84,186,1)",
    paddingVertical: 20,
  },
  loginText: { color: "#fff", fontSize: 14, fontWeight: "700" },

  googleButton: {
    paddingVertical: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  googleContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  googleText: { color: "#000", fontSize: 14, fontWeight: "700" },

  appleButton: {
    paddingVertical: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  appleContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  appleText: { color: "#000", fontSize: 14, fontWeight: "700" },

  createButton: {
    paddingVertical: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#1a3a6b",
  },
  createText: { color: "#fff", fontSize: 14, fontWeight: "700" },

  footerContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: { color: "#A0A7C2", fontSize: 11 },
});
