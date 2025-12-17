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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

export default function V4({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

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

  /* Create Account */
  const handleCreateAccount = () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // ✅ Navigate to VerifyOtpScreen
    navigation.navigate("VerifyOtpScreen");
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
        style={styles.nextBtn}
        onPress={handleCreateAccount}
      >
        <Text style={styles.nextText}>Create Account</Text>
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