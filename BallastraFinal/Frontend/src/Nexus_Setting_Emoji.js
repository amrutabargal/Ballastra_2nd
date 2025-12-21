
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function EmojiScreen({ navigation }) {
  const [emoji, setEmoji] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const nameRef = useRef(null);
  const emojiRef = useRef(null);
  const [actionPos, setActionPos] = useState({ top: null, left: null });

  const openActionAtEmoji = () => {
    const ref = emojiRef.current;
    if (ref && ref.measureInWindow) {
      ref.measureInWindow((x, y, w, h) => {
        // position the sheet near the emoji card; open slightly higher for better visibility
        const TOP_OFFSET = 100; // raise the sheet by this many pixels
        const top = Math.max(12, y + h - TOP_OFFSET);
        const left = x;
        setActionPos({ top, left, width: w });
        setActionModal(true);
      });
    } else {
      setActionModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" />

      {/* Background */}
      <LinearGradient
        colors={["#050B1A", "#0A1330", "#050B1A"]}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Emoji</Text>

          <TouchableOpacity>
            <Ionicons name="eye-outline" size={20} color="#9FB4FF" />
            <Text style={styles.previewLabel}>Preview</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Upload */}
          <View style={styles.uploadWrap}>
            <View style={styles.uploadCircle}>
              <Ionicons name="add" size={28} color="#9FB4FF" />
            </View>

            <Text style={styles.uploadTitle}>Upload a File</Text>
            <Text style={styles.uploadSub}>
              File should be png, jpg, png, or GIF{"\n"}
              <Text style={{ fontSize: 11 }}>(less than 1mb Max)</Text>
            </Text>
          </View>

          {/* Limits & Usage */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Limits & Usage</Text>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color="#9FB4FF"
              />
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                Add up to 50 custom emoji for all Nexus members.
                Animated GIF emoji are restricted to members with Ballastra.
              </Text>
            </View>
          </View>

          {/* Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoBullet}>
                • File type : JPEG, PNG, GIF, WEBP, AVIF
              </Text>
              <Text style={styles.infoBullet}>
                • Recommended file size : {"<"} 256 KB (We'll compress it for you)
              </Text>
              <Text style={styles.infoBullet}>• Recommended: 128x128</Text>
              <Text style={styles.infoBullet}>
                • Naming : Emoji names must be at least 2 characters long and
                can only contain alphanumeric characters and underscores
              </Text>
            </View>
          </View>

          {/* Emoji Item (tap to open actions) */}
          <TouchableOpacity ref={emojiRef} style={styles.emojiCard} activeOpacity={0.85} onPress={openActionAtEmoji}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
              }}
              style={styles.emojiImage}
            />
            <Text style={styles.emojiName}>Shusshi</Text>
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

          {/* ACTION BOTTOM SHEET (opens from bottom) */}
          <Modal visible={actionModal} transparent animationType="fade" onRequestClose={() => setActionModal(false)}>
            <TouchableWithoutFeedback onPress={() => setActionModal(false)}>
              <View style={styles.modalBg}>
                {/* positioned sheet near the emoji; fallback to bottom-centered */}
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      styles.bottomSheetCard,
                      actionPos.top
                        ? {
                            position: "absolute",
                            top: actionPos.top,
                            left: Math.max(12, (actionPos.left || 0) - 12),
                            right: 12,
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                          }
                        : { marginTop: "auto" },
                    ]}
                  >
                    <TouchableOpacity
                      style={[styles.pill, styles.updatePill]}
                      activeOpacity={0.85}
                      onPress={() => {
                        setActionModal(false);
                        setIsEditing(true);
                        setTimeout(() => nameRef.current?.focus(), 150);
                      }}
                    >
                      <Ionicons name="create-outline" size={16} color="#DDEBFF" style={{ marginRight: 10 }} />
                      <Text style={styles.updatePillText}>Update GIF Name</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.pill, styles.deletePill]}
                      activeOpacity={0.85}
                      onPress={() => {
                        setActionModal(false);
                        setEmoji(null);
                      }}
                    >
                      <Ionicons name="trash-outline" size={16} color="#FF8B8B" style={{ marginRight: 10 }} />
                      <Text style={styles.deletePillText}>Delete GIF</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050B1A",
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  previewLabel: {
    color: "#9FB4FF",
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },

  uploadWrap: {
    alignItems: "center",
    marginBottom: 28,
  },

  uploadCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#3154BA",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#071739",
  },

  uploadTitle: {
    marginTop: 14,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  uploadSub: {
    marginTop: 6,
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    textAlign: "center",
  },

  section: {
    marginBottom: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B1730",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3154BA",
    padding: 12,
  },

  emojiImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
  },

  emojiName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
    pill: {
      width: '100%',
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    updatePill: {
      backgroundColor: '#07205A',
      borderWidth: 1,
      borderColor: '#2340A0',
    },
    updatePillText: { color: '#EAF0FF', fontSize: 14 },
    deletePill: {
      backgroundColor: '#2A0C16',
      borderWidth: 1,
      borderColor: '#FF4B5C',
    },
    deletePillText: { color: '#FF8B8B', fontSize: 14 },
});
