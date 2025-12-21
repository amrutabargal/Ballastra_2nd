
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ReportSubmittedScreen({ navigation, route }) {
  // जर नाव route मधून आलेलं असेल तर इथे वापर
  const reportedName = route?.params?.name || "Susshi clan";

  const handleBack = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleDone = () => {
    // तू इथे Home / Chat list / इतर screen ला पण पाठवू शकतोस:
    // navigation.navigate("Home");
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleBlock = () => {
    Alert.alert(
      "Block user",
      `You blocked ${reportedName}.`,
      [
        {
          text: "OK",
          onPress: () => {
            // इथे actual logic / API / navigation वापर
            // navigation.navigate("Home");
          },
        },
      ]
    );
  };

  const handleRestrict = () => {
    Alert.alert(
      "Restrict user",
      `${reportedName} has been restricted.`,
      [
        {
          text: "OK",
          onPress: () => {
            // इथे restrict logic
          },
        },
      ]
    );
  };

  const handleGetSupport = () => {
    Alert.alert(
      "Get Support",
      "We’ll show you tools and resources that can help you.",
      [
        {
          text: "Open Support",
          onPress: () => {
            // इथे support screen ला घेऊन जा:
            // navigation.navigate("SupportScreen");
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1A3A" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.reportTitleWrap}>
            <Ionicons name="flag" size={16} color="red" />
            <Text style={styles.reportTitle}> Report</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {/* Message Section */}
        <View style={styles.messageBox}>
          <Text style={styles.thankText}>Thanks for reporting</Text>
          <Text style={styles.infoText}>
            While you wait for our decision, there are other steps that you can
            take now.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Options */}
        <Text style={styles.sectionTitle}>Other steps that you can take</Text>
        <Text style={styles.noteText}>
          We won’t notify {reportedName} if you take any of these actions.
        </Text>

        {/* Option 1 */}
        <TouchableOpacity style={styles.optionRow} onPress={handleBlock}>
          <View style={styles.optionLeft}>
            <Ionicons name="ban" size={20} color="red" />
            <Text style={styles.optionTextRed}> Block {reportedName}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Option 2 */}
        <TouchableOpacity style={styles.optionRow} onPress={handleRestrict}>
          <View style={styles.optionLeft}>
            <Ionicons name="person-remove-outline" size={20} color="#fff" />
            <Text style={styles.optionText}> Restrict {reportedName}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Option 3 */}
        <TouchableOpacity style={styles.optionRow} onPress={handleGetSupport}>
          <View style={styles.optionLeft}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
            <View>
              <Text style={styles.optionText}> Get Support</Text>
              <Text style={styles.optionSubText}>
                There are tools and resources to help you in tough times.
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Button */}
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.button} onPress={handleDone}>
            <Text style={styles.buttonText}>Done</Text>
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
    paddingHorizontal: 15,
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  reportTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  reportTitle: {
    color: "red",
    fontSize: 14,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#1B2B4A",
    marginVertical: 10,
  },

  messageBox: {
    alignItems: "center",
    paddingVertical: 10,
  },

  thankText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  infoText: {
    color: "#C7D1E0",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },

  noteText: {
    color: "#C7D1E0",
    fontSize: 12,
    marginBottom: 15,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1B2B4A",
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },

  optionText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 8,
  },

  optionTextRed: {
    color: "red",
    fontSize: 13,
    marginLeft: 8,
  },

  optionSubText: {
    color: "#AAB6CC",
    fontSize: 11,
    marginLeft: 8,
    marginTop: 3,
    lineHeight: 16,
  },

  buttonWrap: {
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 20,
  },

  button: {
    width: width * 0.6,
    height: 44,
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
    marginTop:200,
    
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
