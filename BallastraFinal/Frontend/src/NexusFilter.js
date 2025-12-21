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

const { height } = Dimensions.get("window");

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
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
      />

      {/* SHEET */}
      <View style={styles.sheet}>
        {/* Drag */}
        <View style={styles.dragIndicator} />

        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ width: 24 }} />
          <Text style={styles.title}>Filter</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* SELECTED TABS */}
        {selected.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.selectedRow}
          >
            {selected.map((item, index) => (
              <View key={index} style={styles.selectedTab}>
                <Text style={styles.selectedText}>{item}</Text>
                <TouchableOpacity onPress={() => toggleFilter(item)}>
                  <Ionicons name="close" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* FILTER CHIPS */}
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
        <View style={styles.divider} />

        {/* APPLY BUTTON */}
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyText}>Applied Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

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
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingBottom: 18,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#3255BA",
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },

  divider: {
    height: 1,
    backgroundColor: "#3255BA4D",
    marginBottom: 12,
  },

  selectedRow: {
    flexGrow: 0,
    marginBottom: 18,
  },

  selectedTab: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E2E6F",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    height: 39,
    marginRight: 8,
    marginBottom: 10,
    gap: 6,

  },

  selectedText: {
    color: "#fff",
    fontSize: 13,
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
    borderColor: "#3154BA",
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
  },

  chipActive: {
    backgroundColor: "#3255BA",
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
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: "#3D63DD",
    borderRadius: 14,
    height: 52,
    width: 135,
    alignSelf: "center",   // ✅ THIS LINE ADD
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});