import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ACTIVITIES = [
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
  "Open Source & Dev Communities",
  "Health & Mental Wellbeing",
  "Relationships & Dating",
  "Religion & Spirituality",
  "Photography & Videography",
  "Fashion & Beauty",
  "Food & Cooking",
  "Automobiles & Bikes",
  "Pets & Animals",
  "Local Communities",
  "Events & Meetups",
  "Roleplay & Fiction",
  "Fan Clubs",
];

export default function ChooseNexusActivities({ navigation, route }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState([]);

  const { name, icon, image, description } = route.params || {};

  const toggleSelect = (item) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleNext = () => {
    navigation.navigate("Share_Profile", {
      name,
      icon,
      image,
      description,
      activities: selected,
    });
  };

  const handleSkip = () => {
    navigation.navigate("Share_Profile", {
      name,
      icon,
      image,
      description,
      activities: [],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1224" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Choose Your Nexus Activities</Text>
      <Text style={styles.subtitle}>
        Choose activities that define what your nexus is{"\n"}about.
      </Text>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarEmoji}>{icon || "🤠"}</Text>
        )}
      </View>

      <Text style={styles.chooseIcon}>Choose an Icon</Text>

      {/* Dropdown */}
      <View style={styles.dropdown}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setOpen(!open)}
        >
          <Text style={styles.dropdownHeaderText}>
            {selected.length > 0
              ? `${selected.length} activities selected`
              : "Choose your nexus activities"}
          </Text>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color="#9AA4C7"
          />
        </TouchableOpacity>

        {open && (
          <ScrollView
            style={styles.optionsList}
            showsVerticalScrollIndicator={false}
          >
            {ACTIVITIES.map((item, index) => {
              const isSelected = selected.includes(item);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                  ]}
                  onPress={() => toggleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={18} color="#6DFFB2" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          selected.length === 0 && styles.buttonDisabled,
        ]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1224",
    paddingHorizontal: 22,
    paddingTop: 50,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 60,
  },

  skip: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#9AA4C7",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 32,
  },

  avatarWrapper: {
    alignSelf: "center",
    backgroundColor: "#6DFFB2",
    width: 92,
    height: 92,
    borderRadius: 46,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  avatarImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },

  avatarEmoji: {
    fontSize: 50,
  },

  chooseIcon: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 24,
  },

  dropdown: {
    backgroundColor: "#1B2A55",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2E4CBF",
    overflow: "hidden",
    marginBottom: 10,
  },

  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    alignItems: "center",
  },

  dropdownHeaderText: {
    color: "#9AA4C7",
    fontSize: 13,
  },

  /* 🎯 EXACT 4 OPTIONS HEIGHT (IMAGE MATCH) */
  optionsList: {
    maxHeight: 187,
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#3154BA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionSelected: {
    backgroundColor: "#243A7A",
  },

  optionText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  button: {
    alignSelf: "center",
    backgroundColor: "#3E63DD",
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 14,
    marginTop: 61,
    marginBottom: 30,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});