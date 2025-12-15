

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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function SpaceSettingsScreen({ navigation }) {
  const [spaceName, setSpaceName] = useState("Shusshi Clean");

  const handleSave = () => {
    Alert.alert("Save", `Space name saved as: ${spaceName}`);
  };

  
  const handlePermissions = () => {
    navigation.navigate("Space_Permissions"); 
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Space",
      "Are you sure you want to delete this Space?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ]
    );
  };

  const handleClose = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fake status bar row */}
      <View style={styles.fakeStatusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.fakeStatusIcons}>
          <Ionicons name="cellular" size={16} color="#ffffff" style={styles.fakeIcon} />
          <Ionicons name="wifi" size={16} color="#ffffff" style={styles.fakeIcon} />
          <Ionicons name="battery-full" size={20} color="#ffffff" style={styles.fakeIcon} />
        </View>
      </View>
input
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Space Settings</Text>
        {/* right spacer to balance layout */}
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
          <Text style={styles.helperText}>
            Manage the name and identity of this Space.
          </Text>
        </View>

        {/* Space Permissions card */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.permissionsCard}
          onPress={handlePermissions}
        >
          <View style={styles.permissionsLeft}>
            <View style={styles.permissionsIconWrapper}>
              <Ionicons name="people-outline" size={20} color="#9FB4FF" />
            </View>
            <Text style={styles.permissionsText}>Space Permissions</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9FB4FF" />
        </TouchableOpacity>

        {/* Delete Space row */}
        <TouchableOpacity
          style={styles.deleteRow}
          activeOpacity={0.85}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={18} color="#FF5C5C" />
          <Text style={styles.deleteText}>Delete Space</Text>
        </TouchableOpacity>

        {/* Info text */}
        <Text style={styles.infoText}>
          Changes apply only to this Space.
        </Text>

        {/* Save button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
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

  headerRow: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:10,
   
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
  },

  section: {
    marginBottom: 24,
  },
  label: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginBottom: 10,
    fontWeight: "500",
  },
inputWrapper: {
  borderRadius: 15,
  // overflow: "hidden", // ⚠️ iOS shadow साठी काढा
  backgroundColor: "#0B1730",
  borderWidth: 1,
  borderColor: "#2D57C8",

  // iOS shadow
    shadowColor: '#3154BA',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,

  // Android shadow
  elevation: 8,
  height:52,
},


  input: {
    height: 52,
    paddingHorizontal: 16,
    color: "#ffffff",
    fontSize: 14,
  },
  helperText: {
    marginTop: 8,
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    
  },

 permissionsCard: {
  borderRadius: 15,
  paddingHorizontal: 16,
  paddingVertical: 14,
  backgroundColor: "#102149",
  borderWidth: 1,
  borderColor: "#2D57C8",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
height:52,
  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,

  // Android shadow
  elevation: 8,
},

  permissionsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  permissionsIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0B1730",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  permissionsText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },

  deleteRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center", // row content center ला
  marginTop: 4,
  marginBottom: 32,
},

  deleteText: {
    marginLeft: 8,
    color: "#FF5C5C",
    fontSize: 13,
    fontWeight: "500",
  },

  infoText: {
    textAlign: "center",
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 20,
  },
saveButton: {
  alignSelf: "center",
  width: width * 0.45,
  height: 52,
  borderRadius: 15,
  backgroundColor: "#0C142A",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#3154BA",

  // iOS shadow
  shadowColor: "#3154BA",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.4,
  shadowRadius: 6,

  // Android shadow
  elevation: 8,
},

  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
