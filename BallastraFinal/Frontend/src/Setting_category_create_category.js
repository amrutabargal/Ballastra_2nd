// CreateCategoryScreen.js
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const HORIZONTAL_PADDING = Math.max(18, Math.round(width * 0.05));
const CARD_RADIUS = 14;

export default function CreateCategoryScreen({ navigation }) {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [creating, setCreating] = useState(false);

  const onCreate = () => {
    // Example create action (replace with API)
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      // close or navigate back
      if (navigation?.goBack) navigation.goBack();
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.inner, { paddingHorizontal: HORIZONTAL_PADDING }]}>
            {/* Top Row: Close (left) | Title (center) */}
            <View style={styles.topRow}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => navigation?.goBack && navigation.goBack()}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={22} color="#BFD3FF" />
              </TouchableOpacity>

              <Text style={styles.screenTitle}>Create Category</Text>

              {/* invisible placeholder to keep title centered */}
              <View style={styles.iconBtnPlaceholder} />
            </View>

            {/* Form Card */}
            <View style={styles.formWrap}>
              <Text style={styles.fieldLabel}>Category Name</Text>

              <View style={styles.inputCard}>
                <TextInput
                  placeholder="New Category Setup"
                  placeholderTextColor="rgba(255,255,255,0.18)"
                  value={name}
                  onChangeText={setName}
                  style={styles.textInput}
                  returnKeyType="done"
                />
              </View>

              {/* Private Space Row */}
              <View style={styles.privateRow}>
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
                />
              </View>

              <Text style={styles.helpText}>
                By making a category private, only select members and roles will be able
                to view this category. Linked Spaces in this category will automatically
                match to this setting.
              </Text>

              {/* Create Button */}
              <View style={styles.createBtnWrap}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={onCreate}
                  disabled={creating || name.trim().length === 0}
                >
                  <LinearGradient
                    colors={["#355DFF", "#7F5DFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.createButton,
                      (creating || name.trim().length === 0) && styles.createButtonDisabled,
                    ]}
                  >
                    <Text style={styles.createText}>
                      {creating ? "Creating…" : "Create"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* flexible spacer to push content up on tall screens */}
            <View style={{ flex: 1 }} />
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
  screenTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  formWrap: {
    marginTop: 10,
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

  privateRow: {
    marginTop: 18,
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
    marginTop: 28,
    alignItems: "center",
  },
  createButton: {
    width: Math.min(300, width - HORIZONTAL_PADDING * 2),
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
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
