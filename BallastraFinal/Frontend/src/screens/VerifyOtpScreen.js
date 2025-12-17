
import React, { useState, useRef } from "react";
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
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    if (code.join("").length !== 4) {
      Alert.alert("Error", "Please enter verification code");
      return;
    }
    navigation.navigate("Login_Successful");
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

      {/* Content */}
      <View style={styles.centerBox}>
        <Text style={styles.title}>Verifications</Text>

        <Text style={styles.subTitle}>
          Check your Email and enter the verification code.
        </Text>

        {/* Code Inputs */}
        <View style={styles.codeRow}>
          {code.map((item, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.codeBox}
              value={item}
              onChangeText={(t) => handleChange(t, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity>
          <Text style={styles.resend}>
            If you don’t receive a code ?{" "}
            <Text style={styles.resendLink}>Resend</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.loading}>⌛ Loading</Text>
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleVerify}>
        <Text style={styles.nextText}>Verify</Text>
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
    top: 54,
    left: 20,
    zIndex: 10,
  },

  centerBox: {
    marginTop: height * 0.30, // 🔥 image-match spacing
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },

  subTitle: {
    color: "#8A94B8",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 28, // 🔥 more breathing space
    lineHeight: 16,
  },

  codeRow: {
    flexDirection: "row",
    gap: 14, // 🔥 even spacing between boxes
    marginBottom: 22,
  },

  codeBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#142048",
    borderWidth: 1,
    borderColor: "#3154BA",
    color: "#fff",
    fontSize: 16,
  },

  resend: {
    color: "#8A94B8",
    fontSize: 11,
    marginBottom: 12,
  },

  resendLink: {
    color: "#4F6EF7",
  },

  loading: {
    color: "#8A94B8",
    fontSize: 11,
    marginTop: 4,
  },

  nextBtn: {
    alignSelf: "center",
    backgroundColor: "#3255BA",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 44,
    marginBottom: 90,
    marginTop:10,

  },

  nextText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
