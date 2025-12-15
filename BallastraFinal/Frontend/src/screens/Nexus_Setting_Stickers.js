
import React, { useState } from "react";
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
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Try to require expo-image-manipulator at runtime.
 * If it's not installed, we won't crash — we'll use fallback behavior.
 */
let ImageManipulator = null;
try {
  ImageManipulator = require("expo-image-manipulator");
} catch (e) {
  ImageManipulator = null;
}

const STORAGE_KEY = "@app:stickers";
const MAX_BYTES = 1 * 1024 * 1024; // 1 MB
const TARGET_SIZE = 320; // px

export default function StickersScreen({ navigation }) {
  const [stickerName, setStickerName] = useState("Suss hi Clean");
  const [description, setDescription] = useState(
    "See our help Center for tips on writing sticker descriptions."
  );

  const [stickerUri, setStickerUri] = useState(null);
  const [stickerInfo, setStickerInfo] = useState(null); // { size, type, name }
  const [processing, setProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // animation value for modal fade/slide
  const modalAnim = React.useRef(new Animated.Value(0)).current;

  const handleBack = () => navigation?.goBack && navigation.goBack();

  const animateOpen = () => {
    modalAnim.setValue(0);
    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };
  const animateClose = (cb) => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => cb && cb());
  };

  // Helper to get file size and try to detect mime type via fetch blob
  const getFileInfo = async (uri) => {
    try {
      const info = await FileSystem.getInfoAsync(uri, { size: true });
      let size = info.size || 0;
      let type = null;
      try {
        const res = await fetch(uri);
        const blob = await res.blob();
        type = blob.type || null;
        if (!size && blob.size) size = blob.size;
      } catch (e) {
        // ignore fetch failures
      }
      return { size, type };
    } catch (e) {
      return { size: 0, type: null };
    }
  };

  // Compress/resize with ImageManipulator if available
  const compressAndResizeIfAvailable = async (uri) => {
    if (!ImageManipulator) return null;
    try {
      let quality = 0.9;
      let lastResult = null;
      for (let i = 0; i < 5; i++) {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: TARGET_SIZE, height: TARGET_SIZE } }],
          { compress: quality, format: ImageManipulator.SaveFormat.PNG }
        );
        lastResult = manipResult;
        const info = await getFileInfo(manipResult.uri);
        if (info.size && info.size <= MAX_BYTES) {
          return { uri: manipResult.uri, info };
        }
        quality -= 0.2;
        if (quality <= 0 && i >= 2) {
          // last attempt use JPEG moderate quality
          const jpegRes = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: TARGET_SIZE, height: TARGET_SIZE } }],
            { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
          );
          const jpegInfo = await getFileInfo(jpegRes.uri);
          if (jpegInfo.size && jpegInfo.size <= MAX_BYTES) return { uri: jpegRes.uri, info: jpegInfo };
          lastResult = jpegRes;
        }
      }
      if (lastResult) {
        const info = await getFileInfo(lastResult.uri);
        return { uri: lastResult.uri, info };
      }
      return null;
    } catch (e) {
      console.warn("compressAndResizeIfAvailable error", e);
      return null;
    }
  };

  // ===== Updated: open gallery directly (no explicit requestMediaLibraryPermissionsAsync) =====
  const handleUploadPress = async () => {
    try {
      // launch image library directly — system will prompt for permission if needed
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result) return;

      // support both newer ({ canceled, assets }) and older ({ cancelled, uri })
      if (result.canceled === true || result.cancelled === true) {
        return; // user dismissed
      }

      let asset = null;
      if (result.assets && result.assets.length > 0) {
        asset = result.assets[0];
      } else if (result.uri) {
        asset = { uri: result.uri, fileName: result.fileName || null, type: result.type || "image" };
      }

      if (!asset || !asset.uri) {
        Alert.alert("No image", "Couldn't get the selected image. Try again.");
        return;
      }

      setProcessing(true);
      const uri = asset.uri;
      const lc = uri.toLowerCase();
      const isGif =
        lc.endsWith(".gif") ||
        (asset.fileName && asset.fileName.toLowerCase().endsWith(".gif")) ||
        (asset.type && asset.type === "image/gif");

      const initial = await getFileInfo(uri);
      const initialSize = initial.size || 0;

      // basic extension/type check
      const allowedExt = [".png", ".jpg", ".jpeg", ".gif"];
      const hasAllowed = allowedExt.some((ext) => lc.endsWith(ext));
      if (!hasAllowed && !initial.type) {
        Alert.alert("Invalid file", "Please select a PNG, JPG or GIF file.");
        setProcessing(false);
        return;
      }

      // GIF: preserve animation — reject if too large
      if (isGif) {
        if (initialSize > MAX_BYTES) {
          Alert.alert("File too large", "Animated GIFs must be smaller than 1MB. Please choose a smaller GIF.");
          setProcessing(false);
          return;
        }
        setStickerUri(uri);
        setStickerInfo({ size: initialSize, type: initial.type || "image/gif", name: asset.fileName || null });
        setProcessing(false);
        return;
      }

      // Static image
      if (initialSize <= MAX_BYTES) {
        // normalize size if manipulator present
        if (ImageManipulator) {
          try {
            const manip = await ImageManipulator.manipulateAsync(
              uri,
              [{ resize: { width: TARGET_SIZE, height: TARGET_SIZE } }],
              { compress: 1, format: ImageManipulator.SaveFormat.PNG }
            );
            const info = await getFileInfo(manip.uri);
            setStickerUri(manip.uri);
            setStickerInfo({ size: info.size, type: info.type || "image/png", name: asset.fileName || null });
            setProcessing(false);
            return;
          } catch (e) {
            // fallback to original
            setStickerUri(uri);
            setStickerInfo({ size: initialSize, type: initial.type || "image", name: asset.fileName || null });
            setProcessing(false);
            return;
          }
        } else {
          // manipulator not installed — accept original if <= 1MB
          setStickerUri(uri);
          setStickerInfo({ size: initialSize, type: initial.type || "image", name: asset.fileName || null });
          setProcessing(false);
          return;
        }
      }

      // initialSize > MAX_BYTES: try compress/resizing if possible
      if (ImageManipulator) {
        const compressed = await compressAndResizeIfAvailable(uri);
        if (compressed && compressed.info && compressed.info.size <= MAX_BYTES) {
          setStickerUri(compressed.uri);
          setStickerInfo({ size: compressed.info.size, type: compressed.info.type || "image", name: asset.fileName || null });
          setProcessing(false);
          return;
        } else {
          Alert.alert("Couldn't compress", "We couldn't compress the image below 1MB. Choose a smaller image or install expo-image-manipulator for automatic compression.");
          setProcessing(false);
          return;
        }
      } else {
        Alert.alert(
          "File too large",
          "Selected image is larger than 1MB. Install 'expo-image-manipulator' for automatic compression OR pick a smaller image."
        );
        setProcessing(false);
        return;
      }
    } catch (err) {
      console.error("Image pick error", err);
      Alert.alert("Error", "Something went wrong while picking or processing the image.");
      setProcessing(false);
    }
  };

  const handlePreview = () => {
    if (!stickerUri) {
      Alert.alert("No file", "Please upload a sticker first to preview.");
      return;
    }
    animateOpen();
    setShowPreview(true);
  };

  const closePreview = () => {
    animateClose(() => setShowPreview(false));
  };

  const handleSave = async () => {
    if (!stickerUri) {
      Alert.alert("No sticker", "Please upload a sticker before saving.");
      return;
    }
    if (!stickerName || stickerName.trim().length === 0) {
      Alert.alert("Enter name", "Please enter a sticker name.");
      return;
    }

    const item = {
      id: `st_${Date.now()}`,
      name: stickerName.trim(),
      description,
      uri: stickerUri,
      info: stickerInfo,
      createdAt: Date.now(),
    };

    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(item);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      Alert.alert("Saved", "Sticker saved locally.");
    } catch (e) {
      console.warn("Failed to save sticker", e);
      Alert.alert("Save failed", "Couldn't save sticker locally.");
    }
  };

  const humanSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // interpolation for animation
  const modalScale = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] });
  const modalOpacity = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const backdropOpacity = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stickers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Upload row */}
        <View style={styles.uploadRow}>
          <TouchableOpacity
            style={[
              styles.uploadCircle,
              stickerUri && { borderStyle: "solid", borderColor: "#4C7CFF" },
            ]}
            onPress={handleUploadPress}
            activeOpacity={0.8}
          >
            {processing ? (
              <ActivityIndicator color="#9FB4FF" />
            ) : stickerUri ? (
              <Image source={{ uri: stickerUri }} style={styles.uploadPreviewThumb} />
            ) : (
              <Ionicons name="add" size={30} color="#9FB4FF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.previewButton} onPress={handlePreview} activeOpacity={0.8}>
            <Ionicons name="eye-outline" size={18} color="#9FB4FF" />
            <Text style={styles.previewText}>Preview</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.uploadMainLabel}>Upload a File</Text>
        <Text style={styles.uploadSubLabel}>
          File should be png, jpg, jpeg, or GIF{"\n"}
          <Text style={{ fontSize: 11 }}>(less than 1mb Max)</Text>
        </Text>

        {/* show selected file info */}
        {stickerInfo && (
          <View style={styles.fileInfo}>
            <Text style={styles.fileInfoText}>
              {stickerInfo.name ? stickerInfo.name : "Selected file"} • {humanSize(stickerInfo.size)}{" "}
              {stickerInfo.type ? `• ${String(stickerInfo.type).split("/").pop()}` : ""}
            </Text>
          </View>
        )}

        {/* Upload Instructions */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Upload Instructions</Text>
            <Ionicons name="information-circle-outline" size={14} color="#9FB4FF" />
          </View>

          <View style={styles.instructionsCard}>
            <Text style={styles.instructionsText}>
              Stickers can be static (jpg, png) or animated (png, GIF). Stickers must
              be exactly 320x320 pixels and no larger than 1mb. Static images will be
              resized/compressed automatically if 'expo-image-manipulator' is installed.
            </Text>
          </View>
        </View>

        {/* Sticker Name */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Sticker Name</Text>
          <View style={styles.fieldInputWrapper}>
            <TextInput
              value={stickerName}
              onChangeText={setStickerName}
              placeholder="Sticker Name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.singleLineInput}
            />
            <Ionicons name="create-outline" size={18} color="#9FB4FF" style={{ marginLeft: 8 }} />
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Descriptions</Text>
          <View style={styles.multiInputWrapper}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.multiLineInput}
              multiline
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={styles.charCount}>{`${description.length}/500`}</Text>
          </View>
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={styles.saveButtonWrapper}
          activeOpacity={0.9}
          onPress={handleSave}
        >
          <LinearGradient colors={["#0B1530", "#0B1530"]} style={styles.saveGradient}>
            <Text style={styles.saveText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ---------- Preview Popup (styled like screenshot) ---------- */}
      {showPreview && (
        <View style={styles.previewRoot}>
          <Animated.View style={[styles.previewBackdrop, { opacity: backdropOpacity }]} />

          <Animated.View
            style={[
              styles.previewWrapper,
              { transform: [{ scale: modalScale }], opacity: modalOpacity },
            ]}
          >
            {/* close icon top-right (outside card look) */}
            <TouchableOpacity
              style={styles.previewClose}
              onPress={closePreview}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.previewHeaderTitle}>Preview</Text>

            <View style={styles.previewImageOuter}>
              <View style={styles.previewImageInner}>
                {stickerUri ? (
                  <Image source={{ uri: stickerUri }} style={styles.previewImage} resizeMode="cover" />
                ) : (
                  <View style={styles.previewPlaceholder}>
                    <Ionicons name="image-outline" size={36} color="#9FB4FF" />
                    <Text style={styles.previewPlaceholderText}>No image</Text>
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

/* Styles */
const UPLOAD_SIZE = 90;
const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020821" },

  headerRow: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "600" },

  scrollContent: { paddingBottom: 32, paddingHorizontal: 18 },

  uploadRow: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadCircle: {
    width: UPLOAD_SIZE,
    height: UPLOAD_SIZE,
    borderRadius: UPLOAD_SIZE / 2,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#264BFF",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#071739",
  },
  uploadPreviewThumb: { width: UPLOAD_SIZE - 8, height: UPLOAD_SIZE - 8, borderRadius: (UPLOAD_SIZE - 8) / 2 },

  previewButton: {
    position: "absolute",
    right: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  previewText: { marginLeft: 6, color: "#9FB4FF", fontSize: 12 },

  uploadMainLabel: { marginTop: 12, textAlign: "center", color: "#ffffff", fontSize: 14, fontWeight: "500" },
  uploadSubLabel: { marginTop: 6, textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 16 },

  fileInfo: { marginTop: 10, alignItems: "center" },
  fileInfoText: { color: "rgba(159,180,255,0.9)", fontSize: 12 },

  section: { marginTop: 24

   },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  sectionTitle: { color: "#ffffff", fontSize: 13, marginRight: 6 },
  instructionsCard: { borderRadius: 15, backgroundColor: "#071739", borderWidth: 1, borderColor: "#2849D8", paddingHorizontal: 14, paddingVertical: 12 },
  instructionsText: { color: "rgba(255,255,255,0.8)", fontSize: 12, lineHeight: 17 },

  fieldLabel: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 8 },
  fieldInputWrapper: {
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#2849D8",
    paddingHorizontal: 14,
    paddingVertical: 10,
    height:52,
    flexDirection: "row",
    alignItems: "center",
  },
  singleLineInput: { flex: 1, color: "#ffffff", fontSize: 14 },

  multiInputWrapper: {
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#2849D8",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    minHeight: 120,
  },
  multiLineInput: { color: "#ffffff", fontSize: 13, lineHeight: 18, flex: 1 },
  charCount: { marginTop: 4, textAlign: "right", fontSize: 11, color: "rgba(159,180,255,0.9)" },
saveButtonWrapper: {
  marginTop: 26,
  borderRadius: 15,
  overflow: "hidden",
  height: 52,                 // ✔ corrected spelling
  alignSelf: "center",
  width: 134,
  borderColor: "#2849D8",
  borderWidth: 1,

  // ⭐ SHADOW
  shadowColor: "#2849D8",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 6,               // Android shadow
},

  saveGradient: { paddingVertical: 13, justifyContent: "center", alignItems: "center" },
  saveText: { color: "#ffffff", fontSize: 15, fontWeight: "600" },

  /* preview popup styles */
  previewRoot: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  previewBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  previewWrapper: {
    width: "86%",
    maxWidth: 420,
    borderRadius: 15,
    backgroundColor: "#05091A",
    paddingTop: 18,
    paddingBottom: 26,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#23305A",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },

  previewClose: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#0B1530",
    borderRadius: 15,
    padding: 6,
    borderWidth: 1,
    borderColor: "#2C4AFF",
  },

  previewHeaderTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },

  previewImageOuter: {
    width: "100%",
    alignItems: "center",
  },
  previewImageInner: {
    width: 220,
    height: 220,
    borderRadius: 15,
    backgroundColor: "#08173A",
    borderWidth: 1,
    borderColor: "#273A7A",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 6,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewPlaceholder: { justifyContent: "center", alignItems: "center" },
  previewPlaceholderText: { marginTop: 8, color: "#9FB4FF" },
});
