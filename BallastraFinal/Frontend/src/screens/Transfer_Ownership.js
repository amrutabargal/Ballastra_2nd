import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";  

export default function Chat() {
  const [enabled, setEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* ---------------- HEADER ROW ---------------- */}
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Transfer Ownership</Text>

          <View style={{ width: 28 }} />
        </View>
        {/* --------------------------------------------- */}

        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../../assets/user1.png")}
              style={styles.avatar}
            />
          </View>

          <View style={styles.arrow}>
            <Ionicons name="arrow-forward-circle" size={42} color="#73e29c" />
          </View>

          <View style={[styles.avatarWrapper, styles.glow]}>
            <Image
              source={require("../../assets/user2.png")}
              style={styles.avatar}
            />
          </View>
        </View>

        <Text style={styles.username}>Shusshi Clean Nexus</Text>

        {/* Description */}
        <Text style={styles.description}>
          This will transfer ownership of{" "}
          <Text style={{ fontWeight: "700" }}>Shusshi nexus</Text> to{" "}
          <Text style={{ fontWeight: "700" }}>!7SUII_Notashish15.</Text> This
          cannot be undone!
        </Text>

        {/* Toggle Section */}
        <View style={styles.toggleBox}>
          <Text style={styles.toggleLabel}>Transfer Ownership</Text>

          {/* ⭐⭐ CUSTOM GRADIENT TOGGLE ⭐⭐ */}
          <TouchableOpacity
            onPress={() => setEnabled(!enabled)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                enabled
                  ? ["#15CAF3", "#A81AF2"]
                  : ["#4D4D4D", "#3A3A3A"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientToggle}
            >
              <View
                style={[
                  styles.knob,
                  enabled && styles.knobActive,
                ]}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Acknowledge Text */}
        <Text style={styles.note}>
          I acknowledge that by transferring ownership of this nexus to{" "}
          <Text style={{ fontWeight: "bold" }}>!7SUII_Notashish15.</Text>, it
          officially belongs to them.{" "}
          <Text style={styles.learn}>Learn more.</Text>
        </Text>

        {/* Transfer Ownership Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: enabled ? "#4f46e5" : "#3154BA4D" },
          ]}
          disabled={!enabled}
        >
          <Text style={styles.buttonText}>Transfer Ownership</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f1a",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  /* HEADER STYLE */
  headerRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },

  avatarContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarWrapper: {
    width: 78,
    height: 78,
    borderRadius: 40,
    backgroundColor: "#1a1f2c",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  glow: {
    shadowColor: "#4f46e5",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  arrow: {
    marginHorizontal: 15,
  },

  username: {
    marginTop: 18,
    color: "#BDBDBD",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 16,
  },

  description: {
    marginTop: 57,
    fontWeight: "500",
    color: "#BDBDBD",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 16,
  },

  toggleBox: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#3154BA4D",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#3154BA",
    alignItems: "center",
  },

  toggleLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },

  /* ⭐⭐⭐ GRADIENT TOGGLE ⭐⭐⭐ */
  gradientToggle: {
    width: 56,
    height: 28,
    borderRadius: 20,
    padding: 3,
    justifyContent: "center",
  },

  knob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    transform: [{ translateX: 0 }],
  },

  knobActive: {
    transform: [{ translateX: 26 }],
  },

  /* ---------------------------------- */

  note: {
    marginTop: 20,
    color: "#BDBDBD",
    marginHorizontal: 22,
    fontSize: 10,
    textAlign: "left",
  },

  learn: {
    color: "#3255BA",
    fontWeight: "500",
  },


  button: {
  marginTop: 70,
  paddingVertical: 15,
  paddingHorizontal: 25,   // ⭐ new
  borderRadius: 12,
  alignSelf: "center",     // ⭐ center button
  borderColor: "#3154BA",
  borderWidth: 1,
    backgroundColor: "#3154BA4D",
},


buttonText: {
  color: "#fff",
  textAlign: "center",
  fontSize: 16,
  fontWeight: "600",
},

});