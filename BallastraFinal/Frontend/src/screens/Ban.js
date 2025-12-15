// BanScreenWithDropdown.js
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const MAX_CHARS = 600;

export default function BanScreenWithDropdown({ navigation }) {
  const [reason, setReason] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // options for dropdown toggles
  const [options, setOptions] = useState([
    { id: "dont", label: "Don't Delete Any", value: true }, // top special item
    { id: "1h", label: "Previous Hour", value: false },
    { id: "6h", label: "Previous 6 Hour", value: false },
    { id: "12h", label: "Previous 12 Hour", value: false },
    { id: "24h", label: "Previous 24 Hour", value: false },
    { id: "3d", label: "Previous 3 Days", value: false },
    { id: "7d", label: "Previous 7 Days", value: false },
  ]);

  // animation for dropdown card
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: dropdownVisible ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [dropdownVisible]);

  const toggleOption = (id) => {
    // special handling: selecting "Don't Delete Any" clears others and sets it true
    setOptions((prev) =>
      prev.map((opt) => {
        if (opt.id === "dont") {
          if (id === "dont") {
            // toggle dont - if turning on, turn others off; if turning off, keep it off
            const newVal = !opt.value;
            return { ...opt, value: newVal };
          }
          return { ...opt, value: false };
        }
        if (id === "dont") {
          // turning on dont => others false
          return { ...opt, value: false };
        }
        if (opt.id === id) {
          // toggle that option; also ensure "dont" becomes false
          return { ...opt, value: !opt.value };
        }
        return opt;
      })
    );
  };

  // computed translate for dropdown
  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] });
  const opacity = anim;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack?.()}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={20} color="#CFE0FF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Ban</Text>

          <View style={styles.iconPlaceholder} />
        </View>

        {/* Top selectable bar with pill and dropdown trigger */}
        <View style={styles.topSelectRow}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => setDropdownVisible((s) => !s)}
              style={styles.selectPill}
            >
              <Text style={styles.selectPillText}>Delete Message History</Text>
              <Ionicons
                name={dropdownVisible ? "chevron-up" : "chevron-down"}
                size={14}
                color="#CFE0FF"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>

            {/* Dropdown card anchored under the pill */}
            {/*
              We render the Animated card absolutely positioned relative to the pill.
              It's simple and works across screens; adjust top margin if needed.
            */}
            {dropdownVisible && (
              <Animated.View
                style={[
                  ddStyles.card,
                  {
                    opacity,
                    transform: [{ translateY }],
                  },
                ]}
              >
                {/* list items */}
                {options.map((opt, idx) => (
                  <View key={opt.id} style={ddStyles.row}>
                    <Text style={idx === 0 ? ddStyles.rowPrimaryText : ddStyles.rowText}>
                      {opt.label}
                    </Text>

                    {/* small circular toggle for each row */}
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => toggleOption(opt.id)}
                      style={ddStyles.toggleTouchable}
                    >
                      <View
                        style={[
                          ddStyles.toggleTrack,
                          opt.value ? ddStyles.toggleTrackOn : ddStyles.toggleTrackOff,
                        ]}
                      >
                        <Animated.View
                          style={[
                            ddStyles.toggleKnob,
                            opt.value ? ddStyles.toggleKnobOn : ddStyles.toggleKnobOff,
                          ]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </Animated.View>
            )}
          </View>

          {/* Right small item (unchanged) */}
          <TouchableOpacity activeOpacity={0.9} style={styles.selectRight}>
            <Text style={styles.selectRightText}>Don't Delete Any</Text>
            <Ionicons name="chevron-forward" size={14} color="rgba(207,224,255,0.34)" />
          </TouchableOpacity>
        </View>

        {/* helper confirmation text */}
        <Text style={styles.confirmText}>
          Are you sure you want to ban <Text style={styles.username}>"7SUIL_Natashah15"</Text>? They won't be able to return unless you unban them.{" "}
          <Text style={styles.learn}>Learn more</Text>
        </Text>

        {/* Reason for ban */}
        <Text style={styles.label}>Reason for ban</Text>

        {/* text area */}
        <View style={styles.textAreaWrapper}>
          <TextInput
            style={styles.textArea}
            value={reason}
            onChangeText={setReason}
            placeholder="Write a reason..."
            placeholderTextColor="rgba(207,224,255,0.18)"
            multiline
            maxLength={MAX_CHARS}
            textAlignVertical="top"
          />
          <Text style={styles.counter}>{`${reason.length}/${MAX_CHARS}`}</Text>
        </View>

        <View style={{ height: 40 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- styles ---------- */
const styles = {
  safe: {
    flex: 1,
    backgroundColor: "#071025",
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  topRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPlaceholder: { width: 44, height: 44 },
  headerTitle: {
    color: "#E6EEFF",
    fontSize: 18,
    fontWeight: "700",
  },
  topSelectRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  selectPill: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(37,63,110,0.95)",
    borderWidth: 1,
    borderColor: "rgba(45,87,200,0.22)",
    shadowColor: "#001428",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  selectPillText: { color: "#CFE0FF", fontSize: 14, fontWeight: "600" },
  selectRight: {
    width: width * 0.30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(207,224,255,0.06)",
    backgroundColor: "rgba(8,16,32,0.32)",
    flexDirection: "row",
  },
  selectRightText: {
    color: "rgba(207,224,255,0.64)",
    fontSize: 12,
    marginRight: 6,
  },
  confirmText: {
    marginTop: 10,
    color: "rgba(207,224,255,0.46)",
    fontSize: 11,
    lineHeight: 16,
  },
  username: { color: "#CFE0FF", fontWeight: "600" },
  learn: {
    color: "rgba(207,224,255,0.64)",
    textDecorationLine: "underline",
  },
  label: { marginTop: 16, color: "#CFE0FF", fontSize: 13, marginBottom: 8 },
  textAreaWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(45,87,200,0.16)",
    backgroundColor: "rgba(9,18,36,0.48)",
    padding: 14,
    height: Math.round(height * 0.24),
    position: "relative",
  },
  textArea: { flex: 1, color: "#E6EEFF", fontSize: 15, padding: 0, margin: 0, lineHeight: 20 },
  counter: { position: "absolute", right: 12, bottom: 10, color: "rgba(207,224,255,0.5)", fontSize: 12 },
};

/* ---------- dropdown styles ---------- */
const ddStyles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 58, // appears under the pill; adjust if needed
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "#071129",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(58,88,160,0.18)",
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 14,
    zIndex: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  rowPrimaryText: { color: "#E6EEFF", fontSize: 14, fontWeight: "600" },
  rowText: { color: "rgba(207,224,255,0.84)", fontSize: 13 },
  toggleTouchable: { padding: 6 },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  toggleTrackOn: {
    backgroundColor: "#6b5bff", // gradient-like primary; choose desired color
    alignItems: "flex-end",
  },
  toggleTrackOff: {
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "flex-start",
  },
  toggleKnob: {
    width: 18,
    height: 18,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 4 : 0,
  },
  toggleKnobOn: {
    // knob on right
  },
  toggleKnobOff: {
    // knob on left
  },
});

