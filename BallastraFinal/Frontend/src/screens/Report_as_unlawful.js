
// ReportUnlawfulScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function ReportUnlawfulScreen() {
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Navigate to Done screen
    navigation.navigate("Done", { reportType: "Unlawful content" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#06112A" />

      <View style={styles.container}>
        {/* ---------- Header ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.centerTitle}>
            <Ionicons name="flag" size={18} color="red" />
            <Text style={styles.reportText}> Report</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {/* ---------- Content ---------- */}
        <Text style={styles.title}>What type of unlawful content?</Text>

        <Text style={styles.description}>
          You can report this chat to ballastra if you think that it goes
          against our Community Standards. We won’t notify the account that you
          submitted this report.
        </Text>

        {/* ---------- Options ---------- */}
        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => navigation.navigate("Defamation")}
        >
          <Text style={styles.optionText}>Defamation</Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => navigation.navigate("Content")}
        >
          <Text style={styles.optionText}>
            Content is unlawful for another reason (e.g. hate speech,
            harassment)
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>

        {/* ---------- Submit Button ---------- */}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#06112A",
  },

  container: {
    flex: 1,
    backgroundColor: "#06112A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    height:750,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  centerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  reportText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#20345C",
    marginVertical: 10,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  description: {
    color: "#C7D0E0",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },

  optionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  optionText: {
    color: "#fff",
    fontSize: 14,
    width: "85%",
  },

  line: {
    height: 1,
    backgroundColor: "#20345C",
  },

  buttonWrap: {
    alignItems: "center",
    marginBottom: 10,
  },

  submitBtn: {
    width: width * 0.6,
    height: 48,
    backgroundColor: "#2E5BFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
