import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatActionsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#060B1E" />

      {/* Background */}
      <LinearGradient
        colors={["#050916", "#070C1F", "#060B1E"]}
        style={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          {/* Left */}
          <View style={styles.leftSection}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation?.goBack()}
            >
              <Ionicons name="chevron-back" size={22} color="#E5EDFF" />
            </TouchableOpacity>

            <Image
              source={{ uri: "https://i.pravatar.cc/100?img=12" }}
              style={styles.avatar}
            />

            <Text style={styles.username}>Perfecto</Text>
          </View>

          {/* Right */}
          <View style={styles.rightSection}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="call" size={18} color="#E5EDFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="videocam" size={18} color="#E5EDFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#060B1E",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 4 : 10,
  },

  /* LEFT */
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    marginRight: 6,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 8,
  },
  username: {
    color: "#E5EDFF",
    fontSize: 15,
    fontWeight: "600",
  },

  /* RIGHT */
  rightSection: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
  },
});
