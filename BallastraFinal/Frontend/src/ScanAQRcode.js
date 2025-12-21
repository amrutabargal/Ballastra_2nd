import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ScanQRScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* BODY */}
      <View style={styles.body}>
        {/* SCAN FRAME */}
        <View style={styles.scanFrame}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
            }}
            style={styles.preview}
          />
        </View>

        {/* INFO TEXT */}
        <Text style={styles.infoText}>
          Point your camera at a QR code and{"\n"}capture it.
        </Text>
      </View>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },
  cancelText: {
    color: "#3B82F6",
    fontSize: 13,
    fontWeight: "500",
  },

  /* BODY */
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: 60,
  },

  /* SCAN FRAME */
  scanFrame: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#2563EB",
    overflow: "hidden",
    backgroundColor: "#020617",
    shadowColor: "#2563EB",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  /* TEXT */
  infoText: {
    marginTop: 26,
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
  },
});
