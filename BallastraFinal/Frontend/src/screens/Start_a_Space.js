import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ ADDED
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function StartSpaceScreen() {
  const [spaceName, setSpaceName] = useState("new-space");
  const [selectedMode, setSelectedMode] = useState("chat");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectMode = (modeKey) => setSelectedMode(modeKey);

  const handleCreate = async () => {
    if (!spaceName.trim()) {
      return Alert.alert("Error", "Please enter a space name.");
    }

    setLoading(true);

    try {
      const response = await fetch("http://YOUR_BACKEND_URL/api/spaces/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: spaceName,
          mode: selectedMode,
          private: isPrivate,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert("Success", `Space created with ID: ${data?.data?.id || ""}`);
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  return (
    <SafeAreaView style={styles.container}> {/* ✅ ONLY CHANGE */}
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start a Space</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Space name */}
        <View style={styles.section}>
          <Text style={styles.label}>Space name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter space name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={spaceName}
              onChangeText={setSpaceName}
            />
          </View>
        </View>

        {/* Space Mode */}
        <View style={[styles.section, { marginTop: 18 }]}>
          <Text style={styles.label}>Space Mode</Text>
        </View>

        <ModeCard
          title="Chat Space"
          description="Simple text, memes, polls, and real-time conversations."
          icon={<Ionicons name="chatbubble-ellipses-outline" size={22} color="#9FB4FF" />}
          selected={selectedMode === "chat"}
          onPress={() => handleSelectMode("chat")}
        />

        <ModeCard
          title="Live Lounge"
          description="Talk with voice or video. Host live sessions."
          icon={<Ionicons name="mic-outline" size={22} color="#9FB4FF" />}
          selected={selectedMode === "live"}
          onPress={() => handleSelectMode("live")}
        />

        <ModeCard
          title="Discussion Deck"
          description="Organize topics into clean threads."
          icon={<Ionicons name="layers-outline" size={22} color="#9FB4FF" />}
          selected={selectedMode === "discussion"}
          onPress={() => handleSelectMode("discussion")}
        />

        <ModeCard
          title="Pulse"
          description="Fast updates and quick announcements."
          icon={<Ionicons name="flash-outline" size={22} color="#9FB4FF" />}
          selected={selectedMode === "pulse"}
          onPress={() => handleSelectMode("pulse")}
        />

        <Text style={styles.privateInfo}>
          Private Spaces are visible only to people you choose. Everyone else won't see them.
        </Text>

        <View style={styles.privateCard}>
          <View style={styles.privateLeft}>
            <View style={styles.privateIconWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#9FB4FF" />
            </View>
            <Text style={styles.privateTitle}>Private Space</Text>
          </View>

          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            trackColor={{ false: "#29314D", true: "#4A7FE8" }}
            thumbColor="#ffffff"
            ios_backgroundColor="#29314D"
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.learnMoreRow}>
          <Text style={styles.learnMoreText}>Learn more about Space Modes</Text>
          <Ionicons name="arrow-forward" size={14} color="#9FB4FF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.createButton, { opacity: loading ? 0.7 : 1 }]}
          activeOpacity={0.85}
          onPress={handleCreate}
          disabled={loading}
        >
          <LinearGradient
            colors={["#1a2957ff", "#0C142A", "#1a2957ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.createButtonText}>
              {loading ? "Creating..." : "Create"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ModeCard({ title, description, icon, selected, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.modeCard, selected && styles.modeCardSelected]}
    >
      <View style={styles.modeLeft}>
        <View style={styles.modeIconWrapper}>{icon}</View>
        <View style={{ flex: 1 }}>
          <Text style={styles.modeTitle}>{title}</Text>
          <Text style={styles.modeDesc}>{description}</Text>
        </View>
      </View>

      <View style={[styles.toggleOuter, selected && styles.toggleOuterOn]}>
        <View style={[styles.toggleInner, selected && styles.toggleInnerOn]} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050B18" },
 
  headerRow: {
    marginTop: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "600" },

  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 },

  section: { marginBottom: 4 },
  label: { color: "rgba(255,255,255,0.85)", fontSize: 13, marginBottom: 10, fontWeight: "500" },

  inputWrapper: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#0B1730",
    borderWidth: 1,
    borderColor: "#2D57C8",
  },
  input: { height: 52, paddingHorizontal: 16, color: "#ffffff", fontSize: 14 },

  modeCard: {
  marginTop: 10,
  borderRadius: 22,
  paddingHorizontal: 16,
  height:52,
  paddingVertical: 14,
  backgroundColor: "#071428",

  // ✅ Border
  borderWidth: 1,
  borderColor: "rgba(63,104,255,0.45)",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  // ✅ Light Shadow + Glow
  shadowColor: "#3F68FF",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.35,
  shadowRadius: 6,

  // ✅ Android shadow
  elevation: 4,
},


  modeCardSelected: { backgroundColor: "#0C1C3A", borderColor: "#4A7FE8" },

  modeLeft: { flexDirection: "row", alignItems: "flex-start", flex: 1, paddingRight: 12 },

  modeIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0E2348",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  modeTitle: { color: "#ffffff", fontSize: 14, fontWeight: "600", marginBottom: 4 },
  modeDesc: { color: "rgba(255,255,255,0.6)", fontSize: 11 },

  toggleOuter: {
    width: 38,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#4B5674",
    justifyContent: "center",
    paddingHorizontal: 2,
  },

  toggleOuterOn: { backgroundColor: "#4A7FE8", borderColor: "#4A7FE8" },

  toggleInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
  },

  toggleInnerOn: { backgroundColor: "#ffffff", alignSelf: "flex-end" },

  privateInfo: { marginTop: 18, fontSize: 11, color: "rgba(255,255,255,0.65)", lineHeight: 16 },

  privateCard: {
  marginTop: 14,
  borderRadius: 22,
  paddingHorizontal: 16,
  paddingVertical: 14,
  backgroundColor: "#071428",
  height:52,

  // ✅ Border
  borderWidth: 1,
  borderColor: "rgba(63,104,255,0.45)",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  // ✅ Light Shadow + Glow
  shadowColor: "#3F68FF",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.35,
  shadowRadius: 6,

  // ✅ Android shadow
  elevation: 4,
},


  privateLeft: { flexDirection: "row", alignItems: "center" },

  privateIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0E2348",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  privateTitle: { color: "#ffffff", fontSize: 14, fontWeight: "500" },

  learnMoreRow: { marginTop: 18, flexDirection: "row", alignItems: "center", alignSelf: "center" },

  learnMoreText: { color: "#9FB4FF", fontSize: 12 },

  createButton: {
    marginTop: 24,
    alignSelf: "center",
    width: 135,
    height: 52,
    borderRadius: 15,
    overflow: "hidden", // Needed for gradient rounding
  },

  gradientButton: {
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
