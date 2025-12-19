import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Pressable,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  PanResponder,
  TextInput,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const STORY_HEIGHT = width * (16 / 9);

const COLORS = [
  "#ffffff",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#f97316",
  "#ef4444",
];
const MENTIONS = [
  { id: "1", name: "john_doe" },
  { id: "2", name: "jane_smith" },
  { id: "3", name: "react_native" },
  { id: "4", name: "expo_dev" },
];

const ALIGN_ORDER = ["center", "left", "right"];

export default function InstagramStoryEditor({ navigation }) {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const [showEditor, setShowEditor] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showMention, setShowMention] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync();
    ImagePicker.requestCameraPermissionsAsync();
  }, []);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setShowColors(false);
      setShowMention(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  /* ---------------- IMAGE PICK ---------------- */
  const openGallery = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
      setShowEditor(true);
    }
  };

  const openCamera = async () => {
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
      setShowEditor(true);
    }
  };

  /* ---------------- ADD TEXT ---------------- */
  // const addText = () => {
  //   if (!image) return;

  //   const id = Date.now().toString();
  //   const pan = new Animated.ValueXY({
  //     x: width / 2 - 60,
  //     y: STORY_HEIGHT / 2 - 20,
  //   });

  //   const panResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: () => !isEditing,
  //     onMoveShouldSetPanResponder: () => !isEditing,
  //     onPanResponderGrant: () => {
  //       setActiveId(id);
  //       pan.extractOffset();
  //     },
  //     onPanResponderMove: Animated.event(
  //       [null, { dx: pan.x, dy: pan.y }],
  //       { useNativeDriver: false }
  //     ),
  //     onPanResponderRelease: () => {
  //       pan.flattenOffset();
  //     },
  //   });

  //   setTexts(prev => [
  //     ...prev,
  //     {
  //       id,
  //       text: "",
  //       color: "#ffffff",
  //       align: "center",
  //       pan,
  //       panResponder,
  //     },
  //   ]);

  //   setActiveId(id);
  //   setIsEditing(true);
  // };


  const addText = () => {
    const id = Date.now().toString();

    const pan = new Animated.ValueXY({
      x: width / 2 - 60,
      y: STORY_HEIGHT / 2 - 20,
    });

    const scale = new Animated.Value(1);
    const rotate = new Animated.Value(0); // radians

    const panResponder = PanResponder.create({
      // onStartShouldSetPanResponder: () => !isEditing,
      onStartShouldSetPanResponder: (_, g) => {
        // allow rotate handle to take control
        return Math.abs(g.dx) > 2 || Math.abs(g.dy) > 2;
      },

      onPanResponderGrant: () => {
        setActiveId(id);
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => pan.flattenOffset(),
    });

    setTexts(prev => [
      ...prev,
      {
        id,
        text: "Tap to edit",
        color: "#fff",
        align: "center",
        pan,
        scale,
        rotate,
        baseRotate: 0,
        panResponder,
      },
    ]);

    setActiveId(id);
    setIsEditing(true);

    // ⬇️ open keyboard automatically
    setTimeout(() => {
      Keyboard.show();
    }, 100);

  };
  const deleteText = (id) => {
    setTexts(prev => prev.filter(t => t.id !== id));
    setActiveId(null);
  };
  const createRotateResponder = (item) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        item._rotateStart = item.baseRotate || 0;
      },

      onPanResponderMove: (_, g) => {
        const angle = Math.atan2(
          g.moveY - g.y0,
          g.moveX - g.x0
        );
        item.rotate.setValue(item._rotateStart + angle);
      },

      onPanResponderRelease: () => {
        item.baseRotate = item.rotate.__getValue();
      },
    });


  // const createScaleResponder = (scale) =>
  //   PanResponder.create({
  //     onPanResponderMove: (_, g) => {
  //       const next = Math.max(0.5, 1 + g.dx / 150);
  //       scale.setValue(next);
  //     },
  //   });
  const scaleUp = (item) => {
    item.scale.setValue(Math.min(3, item.scale.__getValue() + 0.1));
  };

  const scaleDown = (item) => {
    item.scale.setValue(Math.max(0.4, item.scale.__getValue() - 0.1));
  };

  const updateText = (id, value) => {
    setTexts(prev =>
      prev.map(t => (t.id === id ? { ...t, text: value } : t))
    );
  };

  const updateTextColor = color => {
    setTexts(prev =>
      prev.map(t => (t.id === activeId ? { ...t, color } : t))
    );
    setShowColors(false);
  };

  /* ---------------- ALIGNMENT ---------------- */
  const changeAlignment = () => {
    if (!activeId) return;

    setTexts(prev =>
      prev.map(t => {
        if (t.id !== activeId) return t;
        const next =
          ALIGN_ORDER[(ALIGN_ORDER.indexOf(t.align) + 1) % ALIGN_ORDER.length];
        return { ...t, align: next };
      })
    );
  };

  const closeEditing = () => {
    Keyboard.dismiss();
    setIsEditing(false);
    setActiveId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (showEditor ? setShowExit(true) : navigation.goBack())}
        >
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Blips</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon} onPress={openCamera}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={openGallery}>
            <Ionicons name="images" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CANVAS */}
      <Pressable style={styles.canvas} onPress={closeEditing}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.image} />

            {texts.map(item => (
              <Animated.View
                key={item.id}
                style={{
                  position: "absolute",
                  transform: [
                    ...item.pan.getTranslateTransform(),
                    { scale: item.scale },
                    {
                      rotate: item.rotate.interpolate({
                        inputRange: [-3.14, 3.14],
                        outputRange: ["-180deg", "180deg"],
                      }),
                    },
                  ],
                }}
                {...item.panResponder.panHandlers}
              >
                {/* SELECTION BOX */}
                {activeId === item.id && (
                  <View style={styles.selectionBox} pointerEvents="box-none">
                    {/* DELETE */}
                    <TouchableOpacity
                      style={styles.controlTL}
                      onPress={() => deleteText(item.id)}
                    >

                      <Ionicons name="close" size={14} color="#fff" />
                    </TouchableOpacity>

                    {/* ROTATE */}
                    <Animated.View
                      style={styles.controlTR}
                      {...createRotateResponder(item).panHandlers}
                    >
                      <Ionicons name="sync" size={14} color="#fff" />
                    </Animated.View>

                    {/* SCALE */}
                    <TouchableOpacity
                      style={styles.controlBR}
                      onPress={() => scaleUp(item)}
                    >
                      <Ionicons name="add" size={14} color="#fff" />
                    </TouchableOpacity>

                    {/* SCALE − */}
                    <TouchableOpacity
                      style={styles.controlBL}
                      onPress={() => scaleDown(item)}
                    >
                      <Ionicons name="remove" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}

                <TextInput
                  value={item.text}
                  onChangeText={val => updateText(item.id, val)}
                  multiline
                  style={[
                    styles.textInput,
                    { color: item.color, textAlign: item.align },
                  ]}
                  onFocus={() => {
                    setActiveId(item.id);
                    setIsEditing(true);
                  }}

                />
              </Animated.View>

            ))}

            <TouchableOpacity style={styles.textPill} onPress={addText}>
              <Text style={styles.textPillText}>Aa</Text>
              <View style={styles.textPillDivider} />
              <Text style={styles.textPillLabel}>Text</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Pressable style={styles.empty} onPress={openGallery}>
            <Ionicons name="images-outline" size={56} color="#475569" />
            <Text style={styles.emptyText}>Choose a photo</Text>
          </Pressable>
        )}
      </Pressable>

      {/* EDITOR */}
      {showEditor && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.editorWrap}
        >
          <View style={styles.curveWrap}>
            <View style={styles.curveLine} />
          </View>

          <View style={styles.floatingToolbar}>
            <TouchableOpacity style={styles.toolBtn} onPress={addText}>
              <Text style={styles.toolAa}>Aa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => setShowColors(!showColors)}
            >
              <MaterialCommunityIcons
                name="format-color-text"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolBtn} onPress={changeAlignment}>
              <MaterialCommunityIcons
                name="format-align-center"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => setShowMention(true)}
            >
              <MaterialCommunityIcons name="at" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {showColors && (
            <View style={styles.colorRow}>
              {COLORS.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.colorDot, { backgroundColor: c }]}
                  onPress={() => updateTextColor(c)}
                />
              ))}
            </View>
          )}
        </KeyboardAvoidingView>
      )}

      {/* EXIT */}
      {/* <Modal visible={showExit} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setShowExit(false)}>
          <View style={styles.exitCard}>
            <Text style={styles.exitTitle}>Exit Editing?</Text>
            <TouchableOpacity style={styles.keepBtn} onPress={() => setShowExit(false)}>
              <Ionicons name="pencil" size={18} color="#93c5fd" />
              <Text style={styles.keepText}>Keep Editing</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal> */}
      {/* MENTION POPUP */}
      <Modal visible={showMention} transparent animationType="fade">
        <Pressable
          style={styles.overlay}
          onPress={() => setShowMention(false)}
        >
          <View style={styles.mentionCard}>
            <Text style={styles.mentionTitle}>Mention</Text>

            {MENTIONS.map(user => (
              <TouchableOpacity
                key={user.id}
                style={styles.mentionItem}
                onPress={() => {
                  if (!activeId) return;

                  setTexts(prev =>
                    prev.map(t =>
                      t.id === activeId
                        ? { ...t, text: `${t.text} @${user.name} ` }
                        : t
                    )
                  );

                  setShowMention(false);
                }}
              >
                <Ionicons
                  name="person-circle"
                  size={22}
                  color="#93c5fd"
                />
                <Text style={styles.mentionText}>
                  @{user.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  headerTitle: { color: "#c7d2fe", fontWeight: "600" },
  headerActions: { flexDirection: "row", gap: 10 },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: { flex: 1 },
  image: { width, height: STORY_HEIGHT },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#64748b", marginTop: 8 },
  textInput: {
    fontSize: 28,
    fontWeight: "700",
    minWidth: 80,
    maxWidth: width - 40,
  },
  textPill: {
    position: "absolute",
    top: 24,
    left: 16,
    flexDirection: "row",
    backgroundColor: "#2563eb",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
  },
  textPillText: { color: "#fff", fontWeight: "700" },
  textPillDivider: {
    width: 1,
    height: 14,
    backgroundColor: "#93c5fd",
    marginHorizontal: 8,
  },
  textPillLabel: { color: "#fff", fontSize: 12 },
  editorWrap: { backgroundColor: "#020617", paddingBottom: 24 },
  curveWrap: { height: 36, overflow: "hidden", alignItems: "center" },
  curveLine: {
    width: width * 1.3,
    height: 36,
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
    borderTopWidth: 1,
    borderColor: "#3255BA",
  },
  floatingToolbar: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#0b1220",
    borderRadius: 24,
    padding: 12,
    gap: 12,
    // borderWidth: 1,
    // borderColor: "#1e3a8a",
  },
  toolBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  toolAa: { color: "#fff", fontWeight: "700" },
  colorRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 12,
  },
  colorDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#fff",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  exitCard: {
    width: "80%",
    backgroundColor: "#020617",
    borderRadius: 20,
    padding: 20,
  },
  exitTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  keepBtn: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e3a8a",
  },
  keepText: { color: "#93c5fd", fontWeight: "600" },
  selectionBox: {
    position: "absolute",
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderWidth: 1,
    borderColor: "#60a5fa",
    borderStyle: "dashed",
  },

  controlTL: {
    position: "absolute",
    top: -12,
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
  },

  controlTR: {
    position: "absolute",
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f59e0b",
    justifyContent: "center",
    alignItems: "center",
  },

  controlBR: {
    position: "absolute",
    bottom: -12,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBL: {
    position: "absolute",
    bottom: -12,
    left: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
  mentionCard: {
    position: "absolute",
    bottom: 90,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#020617",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1e3a8a",
  },

  mentionTitle: {
    color: "#c7d2fe",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  mentionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },

  mentionText: {
    color: "#fff",
    fontSize: 16,
  },

});