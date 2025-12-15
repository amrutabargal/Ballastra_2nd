
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const UPLOAD_SIZE = 92;
const EMOJI_SIZE = 56;

export default function EmojiScreen({ navigation }) {
  const [emoji, setEmoji] = useState(null);
  const [name, setName] = useState("Shusshi");
  const [isEditing, setIsEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const nameRef = useRef(null);

  const openGallery = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (res.canceled) return;

    const asset = res.assets[0];
    setEmoji(asset.uri);

    setIsEditing(true);
    setTimeout(() => nameRef.current?.focus(), 150);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Emoji</Text>

            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }}
          >
            {/* Upload Row */}
            <View style={styles.uploadRow}>
              <TouchableOpacity
                style={[
                  styles.uploadCircle,
                  emoji && { borderColor: "#4C7CFF", borderStyle: "solid" },
                ]}
                onPress={openGallery}
                activeOpacity={0.8}
              >
                {emoji ? (
                  <Image
                    source={{ uri: emoji }}
                    style={styles.uploadImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="add" size={32} color="#9FB4FF" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.previewButton}
                onPress={() => setPreviewOpen(true)}
              >
                <Ionicons name="eye-outline" size={18} color="#9FB4FF" />
                <Text style={styles.previewText}>Preview</Text>
              </TouchableOpacity>
            </View>

            {/* Upload Text */}
            <Text style={styles.uploadTitle}>Upload a File</Text>
            <Text style={styles.uploadSub}>
              File should be png, jpg, png, or GIF{"\n"}
              <Text style={{ fontSize: 11 }}>(less than 1mb Max)</Text>
            </Text>

            {/* LIMITS */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Limits & Usage</Text>
                <Ionicons name="information-circle-outline" size={14} color="#9FB4FF" />
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                  Add up to 50 custom emoji for all Nexus members. Animated GIF emoji
                  are restricted to members with Ballastra.
                </Text>
              </View>
            </View>

            {/* REQUIREMENTS */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>

              <View style={styles.infoCard}>
                <Text style={styles.infoBullet}>• File type : JPEG, PNG, GIF, WEBP, AVIF</Text>
                <Text style={styles.infoBullet}>
                  • Recommended file size : {"<"} 256 KB (We'll compress it for you)
                </Text>
                <Text style={styles.infoBullet}>• Recommended: 128x128</Text>
                <Text style={styles.infoBullet}>
                  • Naming : at least 2 characters. Only alphanumeric & underscores.
                </Text>
              </View>
            </View>

            {/* EMOJI ITEM */}
            {emoji && (
              <View style={styles.emojiCard}>
                <Image
                  source={{ uri: emoji }}
                  style={styles.emojiThumb}
                  resizeMode="cover"
                />

                {isEditing ? (
                  <TextInput
                    ref={nameRef}
                    value={name}
                    onChangeText={setName}
                    style={styles.nameInput}
                    placeholder="Name"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                  />
                ) : (
                  <Text style={styles.emojiName}>{name}</Text>
                )}

                {isEditing && (
                  <TouchableOpacity onPress={() => setName("")}>
                    <Ionicons name="close" size={18} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Update & Delete */}
            {emoji && !isEditing && (
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.updateBtn]}
                  onPress={() => {
                    setIsEditing(true);
                    setTimeout(() => nameRef.current?.focus(), 150);
                  }}
                >
                  <Ionicons
                    name="create-outline"
                    size={18}
                    color="#9FB4FF"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.updateText}>Update GIF Name</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={() => setEmoji(null)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#FFD3D3"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.deleteText}>Delete GIF</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* SAVE BUTTON */}
            <TouchableOpacity style={styles.saveWrapper}>
              <LinearGradient colors={["#0B1730", "#0B1730"]} style={styles.saveGradient}>
                <Text style={styles.saveText}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>

          {/* PREVIEW MODAL */}
          <Modal visible={previewOpen} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setPreviewOpen(false)}>
              <View style={styles.modalBg}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalCard}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Preview</Text>
                      <TouchableOpacity onPress={() => setPreviewOpen(false)}>
                        <Ionicons name="close" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.modalImageWrap}>
                      {emoji && (
                        <Image
                          source={{ uri: emoji }}
                          style={styles.modalImage}
                          resizeMode="cover"
                        />
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/* ------------------------------------ */
/*               STYLES                */
/* ------------------------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020821" },

  header: {
    marginTop: 60,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    
  },

  uploadRow: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  uploadCircle: {
    width: UPLOAD_SIZE,
    height: UPLOAD_SIZE,
    borderRadius: UPLOAD_SIZE / 2,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#264BFF",
    backgroundColor: "#071739",
    justifyContent: "center",
    alignItems: "center",
    marginLeft:130,
  },

  uploadImage: {
    width: UPLOAD_SIZE - 8,
    height: UPLOAD_SIZE - 8,
    borderRadius: (UPLOAD_SIZE - 8) / 2,
    
  },

  previewButton: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    marginRight:40,
  },

  previewText: { marginLeft: 6, color: "#9FB4FF", fontSize: 12 },

  uploadTitle: {
    marginTop: 12,
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  uploadSub: {
    marginTop: 6,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    fontSize: 12,
  },

  section: { marginTop: 24 },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  sectionTitle: { color: "#fff", 
    fontSize: 13, 
    marginRight: 6,
    marginBottom:10 
  },

  infoCard: {
    backgroundColor: "#071739",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3154BA",
    padding: 14,
  },

  infoText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    lineHeight: 17,
  },

  infoBullet: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },

  emojiCard: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B1730 ",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3154BA",
    padding: 12,
    
  // ⭐ Shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,

  // ⭐ Shadow for Android
  elevation: 8,
  },

  emojiThumb: {
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    borderRadius: 12,
    marginRight: 12,
  },

  emojiName: { flex: 1, color: "#fff", fontSize: 14 },

  nameInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    paddingVertical: 0,
  },

  actionBtn: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 15,
    paddingVertical: 12,
    marginBottom: 12,
  },

  updateBtn: { backgroundColor: "#071739", borderWidth: 1, borderColor: "#2849D8" },
  deleteBtn: { backgroundColor: "#2A0C16", borderWidth: 1, borderColor: "#FF4B5C" },

  updateText: { color: "#9FB4FF", fontSize: 14, fontWeight: "500" },
  deleteText: { color: "#FFD3D3", fontSize: 14, fontWeight: "500" },

  // saveWrapper: { marginTop: 26, 
  //   borderRadius: 15, 
  //   overflow: "hidden",
  // width:134,
  // alignSelf: "center",
  //  borderColor: "#3154BA",
  // },
saveWrapper: { 
  marginTop: 26, 
  borderRadius: 15, 
  overflow: "hidden",
  width: 134,
  alignSelf: "center",
   borderWidth: 1,
  borderColor: "#3154BA",

  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  // Android shadow
  elevation: 5, 
},

  saveGradient: {
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: { color: "#fff", fontSize: 15, fontWeight: "600" },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#05091A",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#23305A",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  modalTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },

  modalImageWrap: {
    width: 220,
    height: 220,
    backgroundColor: "#08173A",
    borderColor: "#273A7A",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  modalImage: { width: "100%", height: "100%" },
});
