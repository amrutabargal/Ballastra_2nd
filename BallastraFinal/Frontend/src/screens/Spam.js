
// ReportSpamScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ReportSpamScreen({ navigation }) {
  const handleSubmit = () => {
    // Navigate to Done screen
    navigation.navigate("Done", { reportType: "Spam" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#021027" />

      <View style={styles.background} />
      <View style={styles.overlay} />

      <View style={styles.sheetContainer}>
        <View style={styles.sheetHandle} />

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <MaterialCommunityIcons name="flag" size={16} color="#FF4B4B" />
            <Text style={styles.headerText}> Report</Text>
          </View>

          <View style={{ width: 22 }} />
        </View>

        <View style={styles.headerDivider} />

        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Spam</Text>

            <Text style={styles.description}>
              Send recent messages from this conversation to ballastra for
              review.
            </Text>

            <Text style={styles.subtitle}>We take action if we find :-</Text>

            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                Buying, selling or giving away accounts, roles or permissions.
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                Encouraging people to engage with content under false
                pretenses.
              </Text>
            </View>

            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                Directing people away from ballastra through the misleading use
                of links.
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#021027" },
  background: { flex: 1, backgroundColor: "#f1e4c9" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  sheetContainer: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 70,
    bottom: 12,
    backgroundColor: "#021634",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  },
  sheetHandle: { alignSelf: "center", width: 40, height: 4, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.3)", marginBottom: 12 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 4 },
  headerCenter: { flexDirection: "row", alignItems: "center" },
  headerText: { color: "#FF4B4B", fontSize: width * 0.043, fontWeight: "600" },
  headerDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)", marginTop: 10, marginBottom: 18 },
  contentWrapper: { flex: 1 },
  scrollArea: { flex: 1 },
  scrollContent: { paddingBottom: 16 },
  title: { color: "#FFFFFF", fontSize: width * 0.047, fontWeight: "700", marginBottom: 10 },
  description: { color: "#9AA8C5", fontSize: width * 0.037, lineHeight: height * 0.028, marginBottom: 20 },
  subtitle: { color: "#FFFFFF", fontSize: width * 0.04, fontWeight: "500", marginBottom: 12 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  bulletDot: { width: 5, height: 5, borderRadius: 999, backgroundColor: "#FFFFFF", marginTop: 7, marginRight: 10 },
  bulletText: { flex: 1, color: "#9AA8C5", fontSize: width * 0.037, lineHeight: height * 0.028 },
  submitButton: {width: 134,
    height: 52,
    backgroundColor: "#06112A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    height:52,
    width:134,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
    marginTop:300, },
  submitButtonText: { color: "#FFFFFF", fontSize: width * 0.04, fontWeight: "600" },
});
