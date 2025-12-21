import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function BuildNexusScreen({ navigation }) {
  const [selectedEmoji, setSelectedEmoji] = useState("🤠");
  const [avatarImage, setAvatarImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nexusName, setNexusName] = useState("");
  const [description, setDescription] = useState(""); // ✅ NEW

  const ICON_OPTIONS = [
    { type: "add", id: "add" },
    { type: "emoji", emoji: "🏀", bgColor: "#00E5FF" },
    { type: "emoji", emoji: "🌍", bgColor: "#00E5FF" },
    { type: "image", image: require("../../assets/avatar1.png"), bgColor: "#FF00FF" },
    { type: "emoji", emoji: "🏀", bgColor: "#00E5FF" },
    { type: "emoji", emoji: "🏀", bgColor: "#00E5FF" },
    { type: "emoji", emoji: "🌍", bgColor: "#00E5FF" },
    { type: "image", image: require("../../assets/avatar1.png"), bgColor: "#FF00FF" },
    { type: "image", image: require("../../assets/avatar1.png"), bgColor: "#FF00FF" },
    { type: "emoji", emoji: "🏀", bgColor: "#00E5FF" },
    { type: "emoji", emoji: "🌍", bgColor: "#00E5FF" },
    { type: "image", image: require("../../assets/avatar1.png"), bgColor: "#FF00FF" },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setAvatarImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const handleCreateNexus = () => {
    if (!nexusName.trim()) return;

    navigation.navigate("ChooseNexusActivities", {
      name: nexusName,
      icon: selectedEmoji,
      image: avatarImage,
      description,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ color: "#fff", fontSize: 30 }}>‹</Text>
      </TouchableOpacity>

      <StatusBar barStyle="light-content" backgroundColor="#0B1527" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Build Your Nexus</Text>

        <Text style={styles.subtitle}>
          Your Nexus is your space. Shape it, name it, and{"\n"}make it yours.
        </Text>

        <TouchableOpacity
          style={styles.emojiCircle}
          onPress={() => setModalVisible(true)}
        >
          {avatarImage ? (
            <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.emoji}>{selectedEmoji}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.chooseIcon}>Choose an Icon</Text>

        {/* Nexus Name */}
        <Text style={styles.label}>Nexus Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose your nexus name"
          placeholderTextColor="#BDBDBD"
          value={nexusName}
          onChangeText={setNexusName}
        />

        {/* ✅ DESCRIPTION SECTION (NEW) */}
        <Text style={[styles.label, { marginTop: 16 }]}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Tell people what this Nexus is about"
          placeholderTextColor="#BDBDBD"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.guideline}>
          By creating a nexus, you agree to ballastra.{" "}
          <Text style={styles.link}>Community Guidelines.</Text>
        </Text>

        {/* Create Button */}
        <TouchableOpacity
          style={[
            styles.createBtn,
            !nexusName.trim() && styles.createBtnDisabled,
          ]}
          onPress={handleCreateNexus}
          disabled={!nexusName.trim()}
        >
          <Text style={styles.createText}>Create Nexus</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Icon Picker Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.iconPickerContainer}>
            <View style={styles.iconGrid}>
              {ICON_OPTIONS.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.iconItem,
                    item.type === "add" && styles.iconItemAdd,
                    item.type !== "add" && { backgroundColor: item.bgColor },
                  ]}
                  onPress={() => {
                    if (item.type === "add") {
                      pickFromGallery();
                    } else if (item.type === "emoji") {
                      setSelectedEmoji(item.emoji);
                      setAvatarImage(null);
                      setModalVisible(false);
                    } else if (item.type === "image") {
                      setAvatarImage(Image.resolveAssetSource(item.image).uri);
                      setModalVisible(false);
                    }
                  }}
                >
                  {item.type === "add" ? (
                    <Text style={styles.addIcon}>+</Text>
                  ) : item.type === "emoji" ? (
                    <Text style={styles.iconEmoji}>{item.emoji}</Text>
                  ) : (
                    <Image source={item.image} style={styles.iconImage} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Pagination dots */}
            <View style={styles.paginationDots}>
              <View style={[styles.dot, currentPage === 0 && styles.dotActive]} />
              <View style={[styles.dot, currentPage === 1 && styles.dotActive]} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C142A",
    paddingHorizontal: 23,
    paddingTop: 60,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 28,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    color: "#BDBDBD",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 16,
    marginBottom: 40,
  },

  emojiCircle: {
    width: 90,
    height: 90,
    borderRadius: 55,
    backgroundColor: "#8CFFC2",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  backButton: {
    width: 50,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  emoji: { fontSize: 62 },

  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  chooseIcon: {
    color: "#BDBDBD",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 20,
    fontWeight: "500",
  },

  label: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#3154BA4D",
    borderRadius: 14,
    padding: 14,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#3154BA",
  },

  descriptionInput: {
    height: 132, // ✅ only height added
  },

  guideline: {
    fontSize: 8,
    fontWeight: "500",
    color: "#BDBDBD",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 18,
  },

  link: {
    color: "#3255BA",
    fontSize: 8,
    fontWeight: "500",
  },

  createBtn: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 14,
    marginTop: 51,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#3154BA",
  },

  createBtnDisabled: { opacity: 0.5 },

  createText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  iconPickerContainer: {
    backgroundColor: "#0C142A",
    borderRadius: 20,
    padding: 20,
    width: "85%",
  },

  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  iconItem: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  iconItemAdd: {
    backgroundColor: "#1D2A44",
    borderWidth: 2,
    borderColor: "#3D4A64",
    borderStyle: "dashed",
  },

  addIcon: {
    color: "#9AA4C7",
    fontSize: 30,
    fontWeight: "300",
  },

  iconEmoji: {
    fontSize: 40,
  },

  iconImage: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
  },

  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },

  dot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3D4A64",
  },

  dotActive: {
    backgroundColor: "#9AA4C7",
  },
});
