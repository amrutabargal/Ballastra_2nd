
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export default function V23({ navigation }) {
  const [spaceName, setSpaceName] = useState("# General");

  const [joinMessage, setJoinMessage] = useState(true);
  const [sendMessageVoice, setSendMessageVoice] = useState(true);

  const [showJoinLeave, setShowJoinLeave] = useState(true);
  const [showRoleChanges, setShowRoleChanges] = useState(true);
  const [showUsernameChanges, setShowUsernameChanges] = useState(true);

  const handleBack = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const handleSave = () => {
    // TODO: save logic
    console.log("Saved");
  };

  const handleReset = () => {
    // TODO: reset logic
    console.log("Reset to default");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

     

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
<View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Spaces</Text>
            <Text style={styles.headerSubtitle}>Manage spaces in this Nexus</Text>
          </View>

          <View style={{ width: 28 }} />
        </View>
        {/* Subtitle */}
        <Text style={styles.subtitle}>Manage spaces in this Nexus</Text> */}

        {/* Space name input */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Spaces name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={spaceName}
              onChangeText={setSpaceName}
              placeholder="# General"
              placeholderTextColor="rgba(255,255,255,0.5)"
              style={styles.input}
            />
          </View>
          <Text style={styles.helperText}>
            Controls who can do what inside this specific space.
          </Text>
        </View>

        {/* Inactive Settings */}
        <SectionCard title="Inactive Settings">
          <SettingRow
            label="Inactive Space"
            value="No Inactive Space"
            onPress={() => {}}
          />
          <SettingRow
            label="Timeout"
            value="5 minutes"
            onPress={() => {}}
            isLast
          />
        </SectionCard>

        {/* System & Community Signals */}
        <SectionCard title="System & Community Signals">
          <SettingRow
            label="System Space"
            value="General"
            onPress={() => {}}
          />
          <SettingSwitchRow
            label="Join Message"
            value={joinMessage}
            onValueChange={setJoinMessage}
            isLast
          />
        </SectionCard>

        {/* Single toggle card */}
        <SingleSwitchCard
          label="Send Message / Send Voice Notes"
          value={sendMessageVoice}
          onValueChange={setSendMessageVoice}
        />

        {/* List of single-option cards */}
        <SingleSelectCard
          label="Send Attachments & Media"
          value="None"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Thread Creation"
          value="Everyone"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Slow Mode Override"
          value="Off"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Mention Level"
          value="No mentions"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Pin Message"
          value="Allow pin"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Ghost Mode Reading"
          value="On"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Space-Specific Idents"
          value="On"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Auto-message Deletion Timer"
          value="1 Hour"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Content Filter"
          value="Normal"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Invite Permission"
          value="On"
          onPress={() => {}}
        />
        <SingleSelectCard
          label="Reactions & Emoji Access"
          value="Anyone"
          onPress={() => {}}
        />

        {/* Member Visibility & History */}
        <SectionCard title="Member Visibility & History">
          <SettingSwitchRow
            label="Show join/leave events"
            value={showJoinLeave}
            onValueChange={setShowJoinLeave}
          />
          <SettingSwitchRow
            label="Show role changes"
            value={showRoleChanges}
            onValueChange={setShowRoleChanges}
          />
          <SettingSwitchRow
            label="Show username changes"
            value={showUsernameChanges}
            onValueChange={setShowUsernameChanges}
            isLast
          />
        </SectionCard>
        <Text style={styles.footnoteText}>Changes apply only to this Nexus.</Text>

        {/* Delete */}
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Ionicons name="trash-outline" size={18} color="#FFD3D3" />
          <Text style={styles.deleteText}>Delete Nexus</Text>
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                 <Text style={styles.saveLabel}>Save</Text>
               </TouchableOpacity>

        <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
          <Text style={styles.resetText}>Reset to Default</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ---------- Small components ---------- */

function SectionCard({ title, children }) {
  return (
    <View style={styles.sectionCardContainer}>
      <View style={styles.sectionTabLabel}>
        <Text style={styles.sectionTabLabelText}>{title}</Text>
      </View>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function SettingRow({ label, value, onPress, isLast }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.settingRow,
        !isLast && styles.settingRowBorder,
      ]}
    >
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingRight}>
        <Text style={styles.settingValue}>{value}</Text>
        <Ionicons name="chevron-forward" size={14} color="#9FB4FF" />
      </View>
    </TouchableOpacity>
  );
}

function SettingSwitchRow({ label, value, onValueChange, isLast }) {
  return (
    <View
      style={[
        styles.settingRow,
        !isLast && styles.settingRowBorder,
      ]}
    >
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
      />
    </View>
  );
}

function SingleSwitchCard({ label, value, onValueChange }) {
  return (
    <View style={styles.singleCard}>
      <View style={styles.singleRow}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
        />
      </View>
    </View>
  );
}

function SingleSelectCard({ label, value, onPress }) {
  return (
    <TouchableOpacity
      style={styles.singleCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.singleRow}>
        <Text style={styles.settingLabel}>{label}</Text>
        <View style={styles.settingRight}>
          <Text style={styles.settingValue}>{value}</Text>
          <Ionicons name="chevron-forward" size={14} color="#9FB4FF" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* ---------- Styles ---------- */

const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020821",
  },

  fakeStatusBar: {
    marginTop: 8 + (Platform.OS === "ios" ? 12 : StatusBar.currentHeight || 0),
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  fakeStatusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  fakeIcon: {
    marginLeft: 6,
  },

  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 18,
  },

  /* ---------- HEADER ---------- */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 50,
  },

  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "600",
     color: "#fff", 
     marginBottom:5,
     marginTop:10,
    },
  headerSubtitle: { 
    fontSize: 11,
     color: "rgba(255,255,255,0.6)" 
    },

  subtitle: {
    marginTop: 6,
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
  },

  /* ---------- INPUT ---------- */
  section: {
    marginTop: 22,
  },
  sectionLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginBottom: 10,
  },
  inputWrapper: {
    borderRadius: 15,
    backgroundColor: "#071224",
    borderWidth: 1,
    borderColor: "#2D57C8",
    paddingHorizontal: 16,
    paddingVertical: 12,

    // shadow
    shadowColor: "#3154FF",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  input: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  helperText: {
    marginTop: 6,
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
  },

  /* ---------- SECTION CARD ---------- */
  sectionCardContainer: {
    marginTop: 26,
  },
  sectionTabLabel: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#08183A",
    // fontSize:19,

    // glow
    shadowColor: "#3F65FF",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  sectionTabLabelText: {
    color: "#9FB4FF",
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    marginTop: -6,
    borderRadius: CARD_RADIUS,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#2D57C8",

    // depth card shadow
    shadowColor: "#0A1C3F",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,

    overflow: "hidden",
  },

  /* ---------- ROWS ---------- */
  settingRow: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  settingLabel: {
    color: "#ffffff",
    fontSize: 13.5,
    fontWeight: "500",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    color: "#ffffff",
    fontSize: 12.5,
    marginRight: 8,
  },

  /* ---------- SINGLE CARDS ---------- */
  singleCard: {
    marginTop: 16,
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#2D57C8",
    paddingHorizontal: 18,
    paddingVertical: 14,

    shadowColor: "#0A1C3F",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  singleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  footnoteText: {
    marginTop: 8,
    fontSize: 11,
    color: "rgba(255,255,255,0.52)",
  },

  /* ---------- DELETE BUTTON ---------- */
  deleteButton: {
    marginTop: 26,
    borderRadius: 15,
    backgroundColor: "#2A0C16",
    borderWidth: 1,
    borderColor: "#FF4B5C",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#FF4B5C",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
  },
    deleteText: { marginLeft: 8, color: "#FF7777", fontSize: 14 },


  /* ---------- SAVE BUTTON ---------- */
 
  saveButton: {
  width: 142,
  height: 50,
  borderRadius: 15,
  borderColor: "#3154BA",
  backgroundColor: "#0C142A",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  // marginBottom: 10,
   borderWidth: 1,
   marginTop:30,

  // ⭐ iOS Shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,

  // ⭐ Android Shadow
  elevation: 8,
},

  saveLabel: { color: "#fff", fontSize: 16, fontWeight: "600" },

  resetText: {
    marginTop: 12,
    textAlign: "center",
    color: "rgba(255,255,255,0.55)",
    fontSize: 12.5,
    fontWeight: "500",
  },
});


