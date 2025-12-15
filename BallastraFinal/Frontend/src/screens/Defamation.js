
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const BG = "#020816";

export default function ReportScreen() {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // Navigate to Done screen after submitting
    navigation.navigate("Done", { reportType: "General report" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.8)" />

      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handleWrapper}>
            <View style={styles.handleBar} />
          </View>

          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.closeHit}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.titleCenter}>
              <Ionicons
                name="flag-outline"
                size={18}
                color="#FF4B4B"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.titleText}>Report</Text>
            </View>

            <View style={styles.closeHit} />
          </View>

          <View style={styles.headerDivider} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <Text style={styles.mainHeading}>Everyone deserves to feel safe</Text>

            <Text style={styles.subHeading}>
              If you can’t see your problem listed, you can still report the chat.
            </Text>

            <View style={styles.bulletList}>
              <View style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>
                  We’ll use automation or a review team to check recent messages for anything not allowed on ballastra.
                </Text>
              </View>

              <View style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>
                  If you or someone that you know is in immediate danger, call local emergency services. Don’t wait.
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.9}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)" },
  overlay: { flex: 1, justifyContent: "flex-end" },
  sheet: {
    backgroundColor: BG,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 6,
    paddingHorizontal: 18,
    paddingBottom: 14,
    minHeight: height * 0.7,
  },
  handleWrapper: { alignItems: "center", marginBottom: 6 },
  handleBar: { width: 44, height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.35)" },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4, marginBottom: 8 },
  closeHit: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  titleCenter: { flexDirection: "row", alignItems: "center" },
  titleText: { color: "#FF4B4B", fontSize: width * 0.038, fontWeight: "600" },
  headerDivider: { height: StyleSheet.hairlineWidth, backgroundColor: "rgba(255,255,255,0.18)", marginBottom: 16 },
  mainHeading: { color: "#FFFFFF", fontSize: width * 0.043, fontWeight: "700", marginBottom: 8 },
  subHeading: { color: "#C0C9E6", fontSize: width * 0.034, marginBottom: 16 },
  bulletList: { marginTop: 4 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, marginRight: 10, backgroundColor: "#FFFFFF" },
  bulletText: { flex: 1, color: "#E4E9FF", fontSize: width * 0.033, lineHeight: width * 0.048 },
  buttonWrapper: { paddingTop: 6, paddingBottom: 4 },
  submitButton: { alignSelf: "center", width: "70%", paddingVertical: 12, borderRadius: 999, backgroundColor: "#2E5BFF", alignItems: "center", justifyContent: "center" },
  submitText: { color: "#FFFFFF", fontSize: width * 0.037, fontWeight: "600" },
});
