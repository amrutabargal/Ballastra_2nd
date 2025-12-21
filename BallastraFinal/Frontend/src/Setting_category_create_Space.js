// CreateSpaceScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const H_PAD = Math.max(18, Math.round(width * 0.05));
const CARD_RADIUS = 14;
const STORAGE_KEY = "@app:spaces";

const SPACE_MODES = [
  {
    id: "chat",
    title: "Chat Space",
    desc: "Simple text, memes, polls, and real-time conversations.",
    icon: "chatbubble-ellipses-outline",
  },
  {
    id: "live",
    title: "Live Lounge",
    desc: "Talk with voice or video. Host live sessions.",
    icon: "mic-outline",
  },
  {
    id: "discussion",
    title: "Discussion Deck",
    desc: "Organize topics into clean threads.",
    icon: "list-outline",
  },
  {
    id: "pulse",
    title: "Pulse",
    desc: "Fast updates and quick announcements.",
    icon: "flash-outline",
  },
];

export default function CreateSpaceScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [selectedMode, setSelectedMode] = useState("chat");
  const [isPrivate, setIsPrivate] = useState(false);
  const [creating, setCreating] = useState(false);

  const validName = (s) => s && s.trim().length > 0;

  const readSpaces = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("readSpaces error", e);
      return [];
    }
  };

  const writeSpaces = async (arr) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return true;
    } catch (e) {
      console.warn("writeSpaces error", e);
      return false;
    }
  };

  const onCreate = async () => {
    const trimmed = name.trim();
    if (!validName(trimmed)) {
      Alert.alert("Invalid name", "Please enter a space name.");
      return;
    }
    if (!selectedMode) {
      Alert.alert("Select mode", "Please choose a space mode.");
      return;
    }

    setCreating(true);
    try {
      const now = Date.now();
      const newSpace = {
        id: `space_${now}`,
        name: trimmed,
        mode: selectedMode,
        private: !!isPrivate,
        createdAt: now,
      };

      const existing = await readSpaces();
      existing.push(newSpace);
      const ok = await writeSpaces(existing);

      setCreating(false);

      if (!ok) {
        Alert.alert("Save failed", "Couldn't save space locally.");
        return;
      }

      // prefer callback if passed
      if (route?.params?.onCreated && typeof route.params.onCreated === "function") {
        try {
          route.params.onCreated(newSpace);
        } catch (e) {
          console.warn("onCreated callback failed", e);
        }
        navigation.goBack();
        return;
      }

      // otherwise navigate back with params (merge)
      try {
        navigation.navigate({
          name: route?.params?.returnTo || "Categories",
          params: { newSpace },
          merge: true,
        });
      } catch (e) {
        navigation.goBack();
      }

      Alert.alert("Space created", `"${newSpace.name}" created successfully.`);
    } catch (err) {
      setCreating(false);
      console.error(err);
      Alert.alert("Error", "Something went wrong while creating the space.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.inner, { paddingHorizontal: H_PAD }]}>
            {/* Top Row */}
            <View style={styles.topRow}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => navigation?.goBack && navigation.goBack()}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={22} color="#BFD3FF" />
              </TouchableOpacity>

              <Text style={styles.title}>Create Space</Text>

              <View style={styles.iconBtnPlaceholder} />
            </View>

            {/* Space name */}
            <View style={{ marginTop: 8 }}>
              <Text style={styles.fieldLabel}>Space name</Text>
              <View style={styles.inputCard}>
                <TextInput
                  placeholder="new-space"
                  placeholderTextColor="rgba(255,255,255,0.18)"
                  value={name}
                  onChangeText={setName}
                  style={styles.textInput}
                  editable={!creating}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    if (validName(name) && !creating) onCreate();
                  }}
                />
              </View>
            </View>

            {/* Space modes */}
            <Text style={[styles.fieldLabel, { marginTop: 18 }]}>Space Mode</Text>

            <View style={{ marginTop: 8 }}>
              {SPACE_MODES.map((m) => {
                const active = selectedMode === m.id;
                return (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    key={m.id}
                    onPress={() => setSelectedMode(m.id)}
                    style={[
                      styles.modeCard,
                      active ? styles.modeCardActive : null,
                    ]}
                  >
                    <View style={styles.modeLeft}>
                      <View style={styles.modeIconWrap}>
                        <Ionicons name={m.icon} size={18} color="#BFD3FF" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.modeTitle}>{m.title}</Text>
                        <Text style={styles.modeDesc}>{m.desc}</Text>
                      </View>
                    </View>

                    {/* toggle indicator (looks like switch but single-select) */}
                    <View style={[styles.modeToggleOuter, active && styles.modeToggleOuterActive]}>
                      {active ? (
                        <View style={styles.modeToggleInner} />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Private Space */}
            <View style={[styles.privateRow, { marginTop: 16 }]}>
              <View style={styles.privateLeft}>
                <View style={styles.lockIconWrap}>
                  <Ionicons name="lock-closed" size={16} color="#BFD3FF" />
                </View>
                <Text style={styles.privateLabel}>Private Space</Text>
              </View>

              <Switch
                value={isPrivate}
                onValueChange={setIsPrivate}
                thumbColor={isPrivate ? "#1BFFFF" : "#ffffff"}
                trackColor={{ false: "#122347", true: "#2340A0" }}
                disabled={creating}
              />
            </View>

            <Text style={styles.helpText}>
              By making a space private, only select members and roles will be able to view
              this space. Linked categories will automatically match this setting.
            </Text>

            {/* Create button */}
            <View style={styles.createBtnWrap}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={onCreate}
                disabled={!validName(name) || creating}
              >
                <LinearGradient
                  colors={["#355DFF", "#7F5DFF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.createButton,
                    (!validName(name) || creating) && styles.createButtonDisabled,
                  ]}
                >
                  {creating ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.createText}>Create</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* Styles */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020821",
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },

  topRow: {
    marginTop: 8,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnPlaceholder: {
    width: 40,
    height: 40,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  fieldLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 6,
  },

  inputCard: {
    backgroundColor: "#071739",
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
  },
  textInput: {
    color: "#fff",
    fontSize: 14,
    padding: 0,
    minHeight: 20,
  },

  modeCard: {
    backgroundColor: "#071739",
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modeCardActive: {
    borderColor: "#355DFF",
    backgroundColor: "#0B2145",
  },
  modeLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(47,83,255,0.06)",
    borderWidth: 1,
    borderColor: "#213A98",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  modeTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  modeDesc: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
    marginTop: 2,
  },

  modeToggleOuter: {
    width: 36,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  modeToggleOuterActive: {
    borderColor: "#355DFF",
    backgroundColor: "#1C2C6A",
  },
  modeToggleInner: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#8EA7FF",
  },

  privateRow: {
    marginTop: 8,
    backgroundColor: "#071739",
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  privateLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  lockIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "rgba(47,83,255,0.08)",
    borderWidth: 1,
    borderColor: "#213A98",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  privateLabel: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },

  helpText: {
    marginTop: 12,
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 6,
    marginRight: 6,
  },

  createBtnWrap: {
    marginTop: 24,
    alignItems: "center",
  },
  createButton: {
    width: Math.min(320, width - H_PAD * 2),
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
