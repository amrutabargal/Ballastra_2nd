
// ReportScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ReportScreen({ navigation }) {
  const handleSubmit = () => {
    // Navigate to Done screen
    navigation.navigate("Done", { reportType: "General Report" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1A3A" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.reportTitleWrap}>
            <Ionicons name="flag" size={16} color="red" />
            <Text style={styles.reportTitle}> Report</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.heading}>Everyone deserves to feel safe</Text>

          <Text style={styles.subText}>
            If you can’t see your problem listed, you can still report the
            chat.
          </Text>

          <Text style={styles.bulletText}>
            • We’ll use automation or a review team to check recent messages for
            anything not allowed on Ballastra.
          </Text>

          <Text style={styles.bulletText}>
            • If you or someone that you know is in immediate danger, call local
            emergency services. Don’t wait.
          </Text>
        </View>

        {/* Button */}
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1A3A",
    padding:10,
  },

  container: {
    flex: 1,
    backgroundColor: "#06112A",
    borderRadius:30,
    marginTop: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
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
    paddingVertical: 10,
  },

  reportTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  reportTitle: {
    color: "red",
    fontSize: 15,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#1C2F55",
    marginVertical: 10,
  },

  content: {
    flex: 1,
  },

  heading: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  subText: {
    color: "#C6D0E0",
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 19,
  },

  bulletText: {
    color: "#C6D0E0",
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 18,
  },

  buttonWrap: {
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },

  button: {
   width: 134,
    height: 52,
    backgroundColor: "#06112A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height:52,
    width:134,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
    // marginTop:300,
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
