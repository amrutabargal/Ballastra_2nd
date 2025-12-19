

import React, { useEffect } from "react"; 
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function V4({ navigation }) {

  // ✅ AUTO REDIRECT AFTER SUCCESS
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // ✅ open v66 after success
    }, 2000); // ⏱️ 2 seconds

    return () => clearTimeout(timer);
  }, []);

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
        onPress={() => navigation.replace("v66")} // manual skip
      >
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      {/* ✅ Success Card */}
      <View style={styles.centerWrapper}>
        <View style={styles.successCard}>
          <Text style={styles.successText}>
            Create Account{"\n"}Successfully
          </Text>
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

  successCard: {
    width: width * 0.78,
    height: height * 0.32,
    backgroundColor: "#162B5E",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(90,120,255,0.35)",
  },

  successText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 20,
  },
});
