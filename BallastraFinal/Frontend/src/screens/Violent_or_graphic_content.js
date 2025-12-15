// screens/ReportViolentContent.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ReportViolentContent({ navigation }) {
  const handleSubmit = () => {
    // Navigate to Done screen with report type info
    navigation.navigate("Done", { reportType: "Violent or graphic content" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <MaterialCommunityIcons name="flag" size={16} color="#ff4d4d" />
            <Text style={styles.headerTitle}> Report</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Violent or graphic content</Text>

          <Text style={styles.desc}>
            Send recent messages from this conversation to ballastra for
            review. If someone is in immediate danger, call the local emergency
            services.
          </Text>

          <Text style={styles.subTitle}>
            We take action if we find :-
          </Text>

          <View style={styles.bulletWrapper}>
            <Text style={styles.bulletText}>
              • Photos or videos showing throat-slitting, cannibalism or
              internal organs.
            </Text>
          </View>
        </View>

        {/* Button */}
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#071A3D",
  },
  overlay: {
     width: "92%",
    alignSelf: "center",
    backgroundColor: "#06112A",
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingBottom: 30,
    paddingTop: 4,
    marginBottom: 18,
    height:750,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#ff4d4d",
    fontSize: width * 0.043,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 16,
  },
  content: { flex: 1 },
  title: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "600",
    marginBottom: 10,
  },
  desc: {
    color: "#9FAFCB",
    fontSize: width * 0.037,
    lineHeight: height * 0.028,
    marginBottom: 16,
  },
  subTitle: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "500",
    marginBottom: 6,
  },
  bulletWrapper: {
    marginLeft: 4,
  },
  bulletText: {
    color: "#9FAFCB",
    fontSize: width * 0.037,
    lineHeight: height * 0.027,
  },
  btnWrapper: {
    justifyContent: "flex-end",
    paddingBottom: 4,
  },
  submitBtn: {
    width: 134,
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
    marginTop:300,
  },
  submitText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
});
