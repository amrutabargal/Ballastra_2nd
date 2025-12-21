import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DURATION_OPTIONS = [
  { label: "15 Minute", value: "15min" },
  { label: "30 Minute", value: "30min" },
  { label: "1 Hour", value: "1hour" },
  { label: "4 Hour", value: "4hour" },
  { label: "8 Hour", value: "8hour" },
  { label: "1 Day", value: "1day" },
  { label: "6 Day", value: "6day" },
  { label: "Never", value: "never" },
];

export default function MuteSpaceScreen({ navigation, route }) {
  const [selectedDuration, setSelectedDuration] = useState("15min");
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  const spaceName = route?.params?.spaceName || "Space";

  const getSelectedLabel = () => {
    const option = DURATION_OPTIONS.find((opt) => opt.value === selectedDuration);
    return option ? option.label.replace("Minute", "Minutes").replace("Hour", "Hours").replace("Day", "Days") : "15 Minutes";
  };

  const handleSelectDuration = (value) => {
    setSelectedDuration(value);
    setShowDurationPicker(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050B18" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mute Space</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Duration Selector */}
      <TouchableOpacity
        style={styles.durationSelector}
        onPress={() => setShowDurationPicker(true)}
      >
        <Text style={styles.durationLabel}>Duration</Text>
        <View style={styles.durationValueContainer}>
          <Text style={styles.durationValue}>{getSelectedLabel()}</Text>
          <Ionicons name="chevron-down" size={16} color="#9AA4C7" />
        </View>
      </TouchableOpacity>

      {/* Duration Picker Modal */}
      <Modal
        visible={showDurationPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDurationPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDurationPicker(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {DURATION_OPTIONS.map((option, index) => {
                const isSelected = selectedDuration === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionRow,
                      index < DURATION_OPTIONS.length - 1 && styles.optionBorder,
                    ]}
                    onPress={() => handleSelectDuration(option.value)}
                  >
                    <Text style={styles.optionText}>{option.label}</Text>
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },

  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  durationSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0C142A",
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1d3b7a",
  },

  durationLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  durationValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  durationValue: {
    color: "#9AA4C7",
    fontSize: 14,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#0C142A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom: 30,
    maxHeight: "60%",
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#1d3b7a",
  },

  optionText: {
    color: "#fff",
    fontSize: 15,
  },

  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4A5568",
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterSelected: {
    borderColor: "#6B7AFF",
    backgroundColor: "#6B7AFF",
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
});
