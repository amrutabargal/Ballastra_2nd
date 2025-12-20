import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const FILTERS = [
  "Gaming",
  "Technology & Coding",
  "Education & Learning",
  "Entertainment",
  "Music & Audio",
  "Sports & Fitness",
  "Art & Design",
  "Business & Finance",
  "Lifestyle & Wellness",
  "Social & Community",
  "Content Creators & Streaming",
  "Memes & Fun",
  "Anime, Movies & TV",
  "Crypto & Web3",
  "Startups & Entrepreneurship",
  "Jobs & Career",
  "Study Groups",
  "News & Discussions",
  "Language & Culture",
  "Travel & Adventure",
  "AI & Machine Learning",
  "Religion & Spirituality",
  "Open Source & Dev Communities",
  "Fan Clubs",
  "Health & Mental Wellbeing",
  "Food & Cooking",
];

export default function FilterBottomSheet({ navigation }) {
  const [selected, setSelected] = useState([]);

  const toggleFilter = (item) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* BACKDROP */}
      <View style={styles.backdrop} />

      {/* SHEET */}
      <View style={styles.sheet}>
        {/* Drag Indicator */}
        <View style={styles.dragIndicator} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Filter</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          <View style={styles.chipsWrap}>
            {FILTERS.map((item, index) => {
              const isActive = selected.includes(item);
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.85}
                  onPress={() => toggleFilter(item)}
                  style={[
                    styles.chip,
                    isActive && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isActive && styles.chipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyText}>Applied Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  sheet: {
    height: height * 0.9,
    backgroundColor: "#0B1228",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  dragIndicator: {
    width: 46,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#3A4365",
    alignSelf: "center",
    marginVertical: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },

  chipsContainer: {
    paddingBottom: 20,
  },

  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#2E6BFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  chipActive: {
    backgroundColor: "#2E6BFF",
  },

  chipText: {
    fontSize: 13,
    color: "#C7D2FF",
  },

  chipTextActive: {
    color: "#fff",
    fontWeight: "500",
  },

  applyBtn: {
    marginTop: 10,
    backgroundColor: "#3D63DD",
    borderRadius: 14,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
