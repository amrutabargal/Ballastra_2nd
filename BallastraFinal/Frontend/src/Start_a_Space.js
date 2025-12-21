import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    setTimeout(() => setLoading(false), 1200); // mock
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Start a Space</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Space name */}
        <Text style={styles.label}>Space name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={spaceName}
            onChangeText={setSpaceName}
            placeholder="Enter space name"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        {/* Space Mode */}
        <Text style={[styles.label, { marginTop: 22 }]}>Space Mode</Text>

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

        {/* Private Space */}
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
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>

        <TouchableOpacity style={styles.learnMoreRow}>
          <Text style={styles.learnMoreText}>Learn more about Space Modes</Text>
          <Ionicons name="arrow-forward" size={14} color="#9FB4FF" />
        </TouchableOpacity>

        {/* CREATE */}
        <TouchableOpacity
          style={[styles.createButton, loading && { opacity: 0.7 }]}
          activeOpacity={0.85}
          onPress={handleCreate}
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

/* ---------------- MODE CARD ---------------- */

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

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050B18" },

  headerRow: {
    paddingHorizontal: 20,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 44,
  },

  label: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },

  inputWrapper: {
    borderRadius: 22,
    backgroundColor: "#0B1730",
    borderWidth: 1,
    borderColor: "#2D57C8",
  },

  input: {
    height: 54,
    paddingHorizontal: 16,
    color: "#ffffff",
    fontSize: 14,
  },

  /* MODE CARD */
  modeCard: {
    marginTop: 12,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#071428",
    borderWidth: 1,
    borderColor: "rgba(63,104,255,0.45)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#3F68FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },

  modeCardSelected: {
    backgroundColor: "#0C1C3A",
    borderColor: "#4A7FE8",
  },

  modeLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },

  modeIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0E2348",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  modeTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },

  modeDesc: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 8,
    lineHeight: 15,
  },

  toggleOuter: {
    width: 38,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#4B5674",
    justifyContent: "center",
    paddingHorizontal: 2,
  },

  toggleOuterOn: {
    backgroundColor: "#4A7FE8",
    borderColor: "#4A7FE8",
  },

  toggleInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
  },

  toggleInnerOn: {
    alignSelf: "flex-end",
  },

  privateInfo: {
    marginTop: 20,
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 14,
  },

  privateCard: {
    marginTop: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#071428",
    borderWidth: 1,
    borderColor: "rgba(63,104,255,0.45)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#3F68FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
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

  privateTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },

  learnMoreRow: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },

  learnMoreText: {
    color: "#9FB4FF",
    fontSize: 12,
    marginRight: 4,
  },

  createButton: {
    marginTop: 28,
    alignSelf: "center",
    width: 150,
    height: 54,
    borderRadius: 16,
    overflow: "hidden",
  },

  gradientButton: {
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
