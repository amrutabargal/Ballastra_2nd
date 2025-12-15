
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const OPTIONS = [
  {
    id: "highRisk",
    label: "High-risk drugs, such as cocaine, heroin or fentanyl.",
  },
  { id: "otherDrugs", label: "Other drugs" },
  { id: "firearms", label: "Firearms" },
  { id: "animals", label: "Endangered animals" },
];

export default function ReportIllegalGoodsScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState("highRisk"); // first selected

  const handleBack = () => {
    navigation?.goBack && navigation.goBack();
  };

  const toggleOption = (id) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  const handleSubmit = () => {
    console.log("Submit report with option:", selectedId);

    // Navigate to Done screen after submitting
    navigation.navigate("Done", {
      reportType: "Illegal or Regulated Goods",
      selectedOption: selectedId,
    });
  };

  // 👉 OPEN V44 SCREEN HERE
  const handleGuidelines = () => {
    navigation?.navigate && navigation.navigate("Sale_popup");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.background} />

      <View style={styles.cardContainer}>
        <View style={styles.handle} />

        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Ionicons
              name="flag-outline"
              size={18}
              color="#FF4B5C"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.headerTitle}>Report</Text>
          </View>

          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>What is being sold or promoted?</Text>

          <Text style={styles.description}>
            Send recent messages from this conversation to ballastra for review.
            If someone is in immediate danger, call the local emergency
            services.
          </Text>

          <View style={styles.divider} />

          {OPTIONS.map((item, index) => {
            const isSelected = item.id === selectedId;
            return (
              <View key={item.id}>
                {index > 0 && <View style={styles.rowDivider} />}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.optionRow}
                  onPress={() => toggleOption(item.id)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={15} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}

          <View style={styles.rowDivider} />
          <TouchableOpacity
            style={[styles.optionRow, { paddingVertical: 16 }]}
            activeOpacity={0.8}
            onPress={handleGuidelines} // 👈 this opens Sale_popup
          >
            <Text style={styles.optionText}>
              Sale of illegal or regulated goods guidelines
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#C5CAD6" />
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.submitButton}
            onPress={handleSubmit} // 👈 navigates to Done
          >
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 28;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#02071A",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 8,
    marginTop: Platform.OS === "ios" ? 12 : 24,
    backgroundColor: "#050F24",
    borderRadius: CARD_RADIUS,
    paddingTop: 8,
    paddingBottom: 12,
   shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#24304A",
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF4B5C",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#C5CAD6",
    marginBottom: 18,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#2B3550",
    marginBottom: 10,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#2B3550",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: "#E1E5F0",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#7D88A7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: "#7B61FF",
    backgroundColor: "#7B61FF",
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  submitButton: {
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf:"center",
    backgroundColor: "#06112A",
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  
    height:52,
    width:134,
  },
  submitText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
