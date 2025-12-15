
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function V3({ navigation }) {
  const [permissions, setPermissions] = useState({
    mic: false,
    camera: false,
    notification: false,
  });

  const togglePermission = (type) => {
    setPermissions((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleNext = () => navigation.navigate("v4");

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar hidden />

      {/* Welcome Label FIXED */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/Text.png")}
          style={styles.welcomeLabel}
          resizeMode="contain"
        />
      </View>

      {/* Cards Wrapper */}
      <View style={styles.cardsWrapper}>
        {/* Mic */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.leftWrap}>
              <View style={styles.iconCircle}>
                <Ionicons name="mic-outline" size={18} color="#FFFFFF" />
              </View>

              <View>
                <Text style={styles.cardTitle}>Mic</Text>
                <Text style={styles.cardDesc}>Talk in real time.</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => togglePermission("mic")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggle,
                  permissions.mic && styles.toggleOn,
                ]}
              >
                <View
                  style={[
                    styles.knob,
                    permissions.mic && styles.knobOn,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Camera */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.leftWrap}>
              <View style={styles.iconCircle}>
                <Ionicons name="camera-outline" size={18} color="#FFFFFF" />
              </View>

              <View>
                <Text style={styles.cardTitle}>Camera</Text>
                <Text style={styles.cardDesc}>Video calls made simple.</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => togglePermission("camera")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggle,
                  permissions.camera && styles.toggleOn,
                ]}
              >
                <View
                  style={[
                    styles.knob,
                    permissions.camera && styles.knobOn,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.leftWrap}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="#FFFFFF"
                />
              </View>

              <View>
                <Text style={styles.cardTitle}>Notification</Text>
                <Text style={styles.cardDesc}>Never miss a moment.</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => togglePermission("notification")}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggle,
                  permissions.notification && styles.toggleOn,
                ]}
              >
                <View
                  style={[
                    styles.knob,
                    permissions.notification && styles.knobOn,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* NEXT BUTTON */}
      <TouchableOpacity
  style={styles.nextBtn}
  onPress={() => navigation.navigate("signin_up")}
>
  <Text style={styles.nextText}>Next   →</Text>
</TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    backgroundColor: "#050B18",
  },

  /* 🔥 FIXED Welcome Badge */
  logoWrapper: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
  },
  welcomeLabel: {
    width: width * 0.78,
    height: height * 0.1,
  },

  /* Push cards downward below fixed label */
  cardsWrapper: {
    width: "100%",
    marginTop: height * 0.22,
  },

  /* Card Styles */
  card: {
    backgroundColor: "#3154BA4D",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3154BA",
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconCircle: {
    width: 36,
    height: 36,
    marginRight: 12,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },

  cardDesc: {
    color: "#BDBDBD",
    fontSize: 10,
    fontWeight: "400",
  },

  /* Toggle Button */
  toggle: {
    width: 32,
    height: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingHorizontal: 3,
    justifyContent: "center",
  },

  toggleOn: {
    backgroundColor: "#3B82F6",
    borderColor: "transparent",
  },

  knob: {
    width: 10,
    height: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },

  knobOn: {
    transform: [{ translateX: 15 }],
  },

  nextBtn: {
    backgroundColor: "#3255BA",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 29,
    marginBottom: 140,
  },

  nextText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
