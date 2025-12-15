
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
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const API_BASE_URL = "http://192.168.1.5:3000/api/nexus";

export default function Nexus_Overview({ navigation, route }) {
  const nexusId = route?.params?.nexusId;
  const initialName = route?.params?.nexusName || "Shusshi Clean";

  const [nexusName, setNexusName] = useState(initialName);
  const [inactiveSpace, setInactiveSpace] = useState("No Inactive Space");
  const [timeoutValue, setTimeoutValue] = useState("5 minutes");
  const [systemSpace, setSystemSpace] = useState("General");
  const [joinMessageEnabled, setJoinMessageEnabled] = useState(true);

  const [showJoinLeave, setShowJoinLeave] = useState(true);
  const [showRoleChanges, setShowRoleChanges] = useState(true);
  const [showUsernameChanges, setShowUsernameChanges] = useState(true);

  const [deleting, setDeleting] = useState(false);

  const handleBack = () => navigation.goBack();

  const handleSave = () => {
    Alert.alert("Saved", "Settings saved successfully.");
  };

  const handleReset = () => {
    setNexusName(initialName);
    setInactiveSpace("No Inactive Space");
    setTimeoutValue("5 minutes");
    setSystemSpace("General");
    setJoinMessageEnabled(true);
    setShowJoinLeave(true);
    setShowRoleChanges(true);
    setShowUsernameChanges(true);
    Alert.alert("Reset", "Defaults restored.");
  };

  const deleteNexusFromServer = async () => {
    if (!nexusId) return Alert.alert("Error", "Missing Nexus ID");

    try {
      setDeleting(true);

      const res = await fetch(`${API_BASE_URL}/${nexusId}`, { method: "DELETE" });
      const json = await res.json();

      if (!json.success) {
        Alert.alert("Error", json.message || "Delete failed");
        return;
      }

      Alert.alert("Deleted", "Nexus deleted", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (e) {
      Alert.alert("Network Error", "Could not delete Nexus.");
    } finally {
      setDeleting(false);
    }
  };

  const selectOption = (title, setter, values) => {
    Alert.alert(
      title,
      "",
      values.map((v) => ({
        text: v,
        onPress: () => setter(v),
      }))
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-light-content" />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 18, paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Nexus Overview</Text>
            <Text style={styles.headerSubtitle}>Settings for this Nexus only.</Text>
          </View>

          <View style={{ width: 28 }} />
        </View>

        {/* Section: Nexus Name */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionLabel}>Nexus name</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              value={nexusName}
              onChangeText={setNexusName}
              placeholder="Enter Nexus name"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={styles.input}
            />
          </View>
        </View>

        {/* ---- Inactive Settings ---- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Inactive Settings</Text>

          <TouchableOpacity
            style={styles.rowItem}
            onPress={() =>
              selectOption("Inactive Space", setInactiveSpace, [
                "No Inactive Space",
                "Archive After 7 Days",
              ])
            }
          >
            <Text style={styles.rowLabel}>Inactive Space</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{inactiveSpace}</Text>
              <Ionicons name="chevron-forward" size={18} color="#8892B0" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rowItem}
            onPress={() =>
              selectOption("Timeout", setTimeoutValue, ["5 minutes", "15 minutes", "30 minutes"])
            }
          >
            <Text style={styles.rowLabel}>Timeout</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{timeoutValue}</Text>
              <Ionicons name="chevron-forward" size={18} color="#8892B0" />
            </View>
          </TouchableOpacity>
        </View>

        {/* ---- System Signals ---- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>System & Community Signals</Text>

          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => selectOption("System Space", setSystemSpace, ["General", "Announcements"])}
          >
            <Text style={styles.rowLabel}>System Space</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{systemSpace}</Text>
              <Ionicons name="chevron-forward" size={18} color="#8892B0" />
            </View>
          </TouchableOpacity>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Join Message</Text>
            <Switch
              value={joinMessageEnabled}
              onValueChange={setJoinMessageEnabled}
              trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* ---- Member Visibility ---- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Member Visibility & History</Text>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Show join/leave events</Text>
            <Switch
              value={showJoinLeave}
              onValueChange={setShowJoinLeave}
              trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Show role changes</Text>
            <Switch
              value={showRoleChanges}
              onValueChange={setShowRoleChanges}
              trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>Show username changes</Text>
            <Switch
              value={showUsernameChanges}
              onValueChange={setShowUsernameChanges}
              trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
            />
          </View>

          <Text style={styles.footerNote}>Changes apply only to this Nexus.</Text>
        </View>

        {/* ---- Delete ---- */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteNexusFromServer}
          disabled={deleting}
        >
          <Ionicons name="trash-outline" size={18} color="#FF7777" />
          <Text style={styles.deleteText}>{deleting ? "Deleting..." : "Delete Nexus"}</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveLabel}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetText}>Reset to Default</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const CARD_RADIUS = 22;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050B18" },

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

  sectionWrapper: { marginBottom: 20 },
  sectionLabel: { color: "#fff", fontSize: 14, marginBottom: 8 },

  inputWrapper: {
    backgroundColor: "#3154BA",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#3154BA",
  },
  input: {
     height: 50,
      color: "#fff",
       paddingHorizontal: 16
       },

  card: {
  backgroundColor: "#071224",
  borderRadius: 15,
  padding: 18,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "#3154BA",

  // ⭐ Shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,

  // ⭐ Shadow for Android
  elevation: 8,
},


  cardTitle: {
    color: "#E2E8F0",
    fontSize: 14,
    marginBottom: 12,
    fontWeight: "600",
  },

  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    alignItems: "center",
  },

  rowLabel: { color: "#CBD5E1", fontSize: 13 },
  rowRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowValue: { color: "#94A3B8", fontSize: 13 },

  footerNote: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 10,
    textAlign: "right",
  },

  deleteButton: {
    width: "100%",
    alignSelf: "center",
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FF5555",
    backgroundColor: "#FF3B3029",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  deleteText: { marginLeft: 8, color: "#FF7777", fontSize: 14 },

  saveButton: {
  width: 142,
  height: 50,
  borderRadius: 15,
  borderColor: "#3154BA",
  backgroundColor: "#0C142A",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginBottom: 12,
   borderWidth: 1,

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
    color: "#ffffff",
    textAlign: "center",
    marginTop: 6,
    fontSize: 13,
  },
});
