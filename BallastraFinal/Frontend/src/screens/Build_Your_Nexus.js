
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
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

  const EMOJIS = ["🤠","😎","👑","🔥","⚡","🌟","🚀","🐉","🎯","🌐","🎮","🧠","🤖","💎","💫","🍀","🏆","🐺","🦁","🐯"];

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

    navigation.navigate("Share_Profile", {
      name: nexusName,
      icon: selectedEmoji,
      image: avatarImage,
    });
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={{ color: "#fff", fontSize: 30 }}>‹</Text>
            </TouchableOpacity>
      <StatusBar barStyle="light-content" backgroundColor="#0B1527" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Build Your Nexus</Text>
        <Text style={styles.subtitle}>
          Your Nexus is your space. Shape it, name it, and{"\n"}make it yours.
        </Text>

        <TouchableOpacity style={styles.emojiCircle} onPress={() => setModalVisible(true)}>
          {avatarImage ? (
            <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.emoji}>{selectedEmoji}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.chooseIcon}>Choose an Icon</Text>

        <Text style={styles.label}>Nexus Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose your nexus name"
          placeholderTextColor="#6B7196"
          value={nexusName}
          onChangeText={setNexusName}
        />

        <Text style={styles.guideline}>
          By creating a nexus, you agree to ballastra.{" "}
          <Text style={styles.link}>Community Guidelines.</Text>
        </Text>

        {/* Create Button */}
        <TouchableOpacity 
          style={[styles.createBtn, !nexusName.trim() && styles.createBtnDisabled]} 
          onPress={handleCreateNexus}
          disabled={!nexusName.trim()}
        >
          <Text style={styles.createText}>Create Nexus</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Emoji / Gallery Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose an Icon</Text>

            <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery}>
              <Text style={styles.galleryText}>📷 Add from Gallery</Text>
            </TouchableOpacity>

            <FlatList
              data={EMOJIS}
              numColumns={5}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emojiItem}
                  onPress={() => {
                    setSelectedEmoji(item);
                    setAvatarImage(null);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.emojiSelect}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.emojiGrid}
            />

            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#020b22',
    paddingHorizontal: 23,
    paddingTop: 50,
  },  
  
  scrollContent: { flexGrow: 1, 
    paddingTop: 28, 
  },


  title: { color: "#FFFFFF", 
    fontSize: 18, 
    fontWeight: "700",
     textAlign: "center", 
     marginBottom: 5
    },


  subtitle: {
     color: "#BDBDBD", fontSize: 12, 
     textAlign: "center", 
         fontWeight: "400",
     lineHeight: 16,
      marginBottom: 40 
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
  width: 50,     // ⭐ increase width
  justifyContent: "start",
  alignItems: "start",
},

  emoji: {
     fontSize: 62 
    },

  avatarImage: {
     width: 110,
      height: 110,
       borderRadius: 55 
      },
      
  chooseIcon: { color: "#BDBDBD",
     textAlign: "center", 
     fontSize: 12, 
     marginBottom: 20,
         fontWeight: "500"
     },
     
  label: { 
    color: "#FFFFFF", 
    fontSize: 12, 
    fontWeight: "500", 
    marginBottom: 10
   },
   
  input: {
    backgroundColor: "#3154BA4D",
     borderRadius: 14,
      padding: 14,
       color: "#FFFFFF",
    fontSize: 12, 
        fontWeight: "500", 
    borderWidth: 1, 
    borderColor: "#030B2499",
  },

  guideline: {
     fontSize: 8, 
             fontWeight: "500", 
     color: "#BDBDBD", 
     marginTop: 10,
      textAlign: "center", 
      lineHeight: 18 
    },

  link: { color: "#3255BA",
  fontSize: 8, 
  fontWeight: "500", 
   },


  createBtn: {
  backgroundColor: "#2F4E9E",
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 14,
  marginTop: 60,
  shadowColor: "#030B2466",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  alignSelf: "center",   
},

  createBtnDisabled: { opacity: 0.5 },
  createText: { 
    color: "#FFFFFF", textAlign: "center",
     fontSize: 14, 
     fontWeight: "500" },
  modalBg: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "center", alignItems: "center",
  },
  modalBox: { width: "88%", maxHeight: "70%", backgroundColor: "#1E2B47", borderRadius: 24, padding: 24 },
  modalTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  galleryBtn: { backgroundColor: "#2F4E9E", padding: 16, borderRadius: 14, alignItems: "center", marginBottom: 20 },
  galleryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  emojiItem: { flex: 1, padding: 12, alignItems: "center", justifyContent: "center" },
  emojiSelect: { fontSize: 34 },
  closeBtn: { marginTop: 16, padding: 16, backgroundColor: "#2A3852", borderRadius: 14 },
  closeText: { color: "#FFFFFF", textAlign: "center", fontSize: 15, fontWeight: "600" },
});
