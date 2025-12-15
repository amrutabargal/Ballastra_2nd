
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const VERIFICATION_OPTIONS = [
  { id: "none", label: "None", desc: "Unrestricted" },
  { id: "low", label: "Low", desc: "Must have verified email on their ballastra account." },
  { id: "medium", label: "Medium", desc: "Must also be registered on ballastra for longer than 5 minutes." },
  { id: "high", label: "High", desc: "Must also be a member of this nexus for longer than 10 minutes." },
  { id: "highest", label: "Highest", desc: "Must have a verified phone on their ballastra account." },
];

const SENSITIVE_OPTIONS = [
  { id: "none", label: "None", desc: "No filtering" },
  { id: "scan_media", label: "Scan media for sensitive content", desc: "Automatically scan images & videos for NSFW" },
  { id: "hide_on_match", label: "Hide media on match", desc: "Hide automatically when content flagged" },
  { id: "require_age", label: "Require age verification", desc: "Members must verify age before viewing" },
];

export default function V26({ navigation }) {
  const [verifyExpanded, setVerifyExpanded] = useState(false);
  const [sensitiveExpanded, setSensitiveExpanded] = useState(false);

  const [selectedVerification, setSelectedVerification] = useState("none");

  const [sensitiveState, setSensitiveState] = useState({
    none: true,
    scan_media: false,
    hide_on_match: false,
    require_age: false,
  });

  const [ageRestricted, setAgeRestricted] = useState(false);

  // modal fallback (optional): if you prefer a bottom modal selector instead of inline expand
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFor, setModalFor] = useState(null);

  const handleBack = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const toggleVerify = () => {
    setVerifyExpanded((p) => !p);
    // close sensitive if open for cleaner UI
    if (sensitiveExpanded) setSensitiveExpanded(false);
  };
  const toggleSensitive = () => {
    setSensitiveExpanded((p) => !p);
    if (verifyExpanded) setVerifyExpanded(false);
  };

  const selectVerification = (id) => {
    setSelectedVerification(id);
  };

  const toggleSensitiveOption = (id) => {
    if (id === "none") {
      setSensitiveState({
        none: true,
        scan_media: false,
        hide_on_match: false,
        require_age: false,
      });
      return;
    }
    setSensitiveState((prev) => {
      const next = { ...prev, none: false, [id]: !prev[id] };
      const anyOn = Object.keys(next).some((k) => k !== "none" && next[k]);
      if (!anyOn) next.none = true;
      return next;
    });
  };

  const getVerifyLabel = () =>
    VERIFICATION_OPTIONS.find((o) => o.id === selectedVerification)?.label || "None";
  const getVerifyDesc = () =>
    VERIFICATION_OPTIONS.find((o) => o.id === selectedVerification)?.desc || "";

  const getSensitiveLabel = () => {
    if (sensitiveState.none) return "None";
    // if multiple on, show "Custom"
    const active = Object.keys(sensitiveState).filter((k) => k !== "none" && sensitiveState[k]);
    return active.length === 1
      ? SENSITIVE_OPTIONS.find((o) => o.id === active[0])?.label || "Custom"
      : "Custom";
  };

  // Optional bottom modal for selection (not required, but implemented)
  const openModal = (forKey) => {
    setModalFor(forKey);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalFor(null);
  };

  const renderVerifyOption = ({ item }) => {
    const active = selectedVerification === item.id;
    return (
      <TouchableOpacity
        style={[styles.optionRow, active ? styles.optionActive : null]}
        onPress={() => selectVerification(item.id)}
      >
        <View style={styles.optionLeft}>
          <View style={[styles.radioOuter, active ? styles.radioOuterActive : null]}>
            {active && <View style={styles.radioInner} />}
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.optionTitle, active ? styles.optionTitleActive : null]}>{item.label}</Text>
            <Text style={styles.optionDesc}>{item.desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fake status bar */}
      <View style={styles.fakeStatusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.fakeStatusIcons}>
          <Ionicons name="cellular" size={16} color="#ffffff" style={styles.fakeIcon} />
          <Ionicons name="wifi" size={16} color="#ffffff" style={styles.fakeIcon} />
          <Ionicons name="battery-full" size={20} color="#ffffff" style={styles.fakeIcon} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Moderation</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Verifications pill */}
        <View style={{ marginTop: 18 }}>
          <TouchableOpacity style={styles.pill} activeOpacity={0.85} onPress={toggleVerify}>
            <Text style={styles.pillLabel}>Verifications Level</Text>
            <View style={styles.pillRight}>
              <Text style={styles.pillValue}>{getVerifyLabel()}</Text>
              <Ionicons name={verifyExpanded ? "chevron-up" : "chevron-down"} size={16} color="#9FB4FF" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>

          <Text style={styles.pillDesc}>
            Members of the nexus must meet the following criteria before they can send messages in text Space or initiate a direct message conversation. If a member has an assigned role and nexus onboarding is not enabled, this does not apply.
          </Text>

          <Text style={styles.smallNote}>{getVerifyDesc()}</Text>

          {verifyExpanded && (
            <View style={styles.expandedContainer}>
              {VERIFICATION_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.optionRow, selectedVerification === opt.id ? styles.optionActive : null]}
                  activeOpacity={0.85}
                  onPress={() => selectVerification(opt.id)}
                >
                  <View style={styles.optionLeft}>
                    <View style={[styles.radioOuter, selectedVerification === opt.id ? styles.radioOuterActive : null]}>
                      {selectedVerification === opt.id && <View style={styles.radioInner} />}
                    </View>
                    <View style={{ marginLeft: 12 }}>
                      <Text style={[styles.optionTitle, selectedVerification === opt.id ? styles.optionTitleActive : null]}>
                        {opt.label}
                      </Text>
                      <Text style={styles.optionDesc}>{opt.desc}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Sensitive content pill */}
        <View style={{ marginTop: 22 }}>
          <TouchableOpacity style={styles.pill} activeOpacity={0.85} onPress={toggleSensitive}>
            <Text style={styles.pillLabel}>Sensitive content filters</Text>
            <View style={styles.pillRight}>
              <Text style={styles.pillValue}>{getSensitiveLabel()}</Text>
              <Ionicons name={sensitiveExpanded ? "chevron-up" : "chevron-down"} size={16} color="#9FB4FF" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>

          <Text style={styles.pillDesc}>
            Choose if nexus members can share image-based media detected by Ballastra sensitive content filters. This setting will apply to Space that are not age-restricted.
          </Text>

          <Text style={styles.smallNote}>
            {sensitiveState.none ? "No filtering is active." : "Custom filtering is enabled."}
          </Text>

          {sensitiveExpanded && (
            <View style={styles.expandedContainer}>
              {/* None toggle */}
              <View style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.optionTitle, sensitiveState.none ? styles.optionTitleActive : null]}>None</Text>
                  <Text style={styles.optionDesc}>No filtering</Text>
                </View>
                <Switch
                  value={sensitiveState.none}
                  onValueChange={() => toggleSensitiveOption("none")}
                   trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
                />
              </View>

              {/* other toggles */}
              <View style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.optionTitle, sensitiveState.scan_media ? styles.optionTitleActive : null]}>Scan media for sensitive content</Text>
                  <Text style={styles.optionDesc}>Automatically scan images & videos for NSFW</Text>
                </View>
                <Switch
                  value={sensitiveState.scan_media}
                  onValueChange={() => toggleSensitiveOption("scan_media")}
                   trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
                />
              </View>

              <View style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.optionTitle, sensitiveState.hide_on_match ? styles.optionTitleActive : null]}>Hide media on match</Text>
                  <Text style={styles.optionDesc}>Hide automatically when content flagged</Text>
                </View>
                <Switch
                  value={sensitiveState.hide_on_match}
                  onValueChange={() => toggleSensitiveOption("hide_on_match")}
                   trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
                />
              </View>

              <View style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.optionTitle, sensitiveState.require_age ? styles.optionTitleActive : null]}>Require age verification</Text>
                  <Text style={styles.optionDesc}>Members must verify age before viewing</Text>
                </View>
                <Switch
                  value={sensitiveState.require_age}
                  onValueChange={() => toggleSensitiveOption("require_age")}
                  trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
                />
              </View>
            </View>
          )}
        </View>

        {/* Age-Restricted Nexus card */}
        <View style={{ marginTop: 22 }}>
          <View style={styles.switchCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchTitle}>Age-Restricted Nexus</Text>
              {/* <Text style={styles.switchDesc}>Users will need to confirm they are over the legal age to view the content in this Nexus. Learn more.</Text> */}
            </View>
            <Switch
              value={ageRestricted}
             trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
            />
            
          </View>
          <Text style={styles.pillDesc}>
            Users will need to confirm they are over the legal age to view the content in this Nexus. Learn more.
          </Text>
        </View>

        <View style={{ height: 36 }} />
      </ScrollView>

      {/* Optional modal for picking options (not required; can be disabled) */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {modalFor === "verify" ? "Select Verification Level" : "Select Sensitive Filter"}
            </Text>

            <FlatList
              data={modalFor === "verify" ? VERIFICATION_OPTIONS : SENSITIVE_OPTIONS}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => {
                const isSelected = modalFor === "verify" ? selectedVerification === item.id : !!sensitiveState[item.id];
                return (
                  <TouchableOpacity style={[styles.modalRow, isSelected ? styles.modalRowSelected : null]} onPress={() => {
                    if (modalFor === "verify") selectVerification(item.id);
                    else toggleSensitiveOption(item.id);
                    closeModal();
                  }}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                      <View style={[styles.radioOuter, isSelected ? styles.radioOuterActive : null]}>
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <View style={{ marginLeft: 12 }}>
                        <Text style={[styles.modalRowTitle, isSelected ? styles.modalRowTitleActive : null]}>{item.label}</Text>
                        <Text style={styles.modalRowDesc}>{item.desc}</Text>
                      </View>
                    </View>
                    {isSelected && <Ionicons name="checkmark" size={18} color="#9FB4FF" />}
                  </TouchableOpacity>
                );
              }}
            />

            <TouchableOpacity style={styles.modalClose} onPress={closeModal}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

/* ---------- Styles ---------- */
const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020821" },

  fakeStatusBar: {
    marginTop: 8 + (Platform.OS === "ios" ? 12 : StatusBar.currentHeight || 0),
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  fakeStatusIcons: { flexDirection: "row", alignItems: "center" },
  fakeIcon: { marginLeft: 6 },

  scrollContent: { paddingHorizontal: 18, paddingBottom: 28 },

  headerRow: { marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "600" },

  pill: {
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 14,
    paddingVertical: 12,
    height:52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  // ⭐ Shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,

  // ⭐ Shadow for Android
  elevation: 8,
  },
  pillLabel: { color: "#CFE1FF", fontSize: 14, fontWeight: "600" },
  pillRight: { flexDirection: "row", alignItems: "center" },
  pillValue: { color: "#9FB4FF", fontSize: 13 },

  pillDesc: { marginTop: 10, color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 18 },
  smallNote: { marginTop: 8, color: "rgba(255,255,255,0.6)", fontSize: 12 },

  expandedContainer: {
    marginTop: 10,
    borderRadius: CARD_RADIUS,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#132652",
    overflow: "hidden",
  },

  optionRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.04)",
  },

  optionLeft: { flexDirection: "row", alignItems: "center", flex: 1 },

  optionTitle: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  optionTitleActive: { color: "#CFE1FF" },
  optionDesc: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 6 },

  optionActive: { backgroundColor: "rgba(159,180,255,0.02)" },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#314B7F",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterActive: { borderColor: "#72A0FF", backgroundColor: "rgba(114,160,255,0.06)" },
  radioInner: { width: 10, height: 10, borderRadius: 6, backgroundColor: "#72A0FF" },

  filterRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.04)",
    justifyContent: "space-between",
  },

  switchCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchTitle: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  switchDesc: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 6 },

  /* modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(1,6,20,0.7)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#06152B",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "#132652",
  },
  modalTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 12 },

  modalRow: { padding: 12, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  modalRowSelected: { backgroundColor: "rgba(159,180,255,0.04)" },
  modalRowTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
  modalRowTitleActive: { color: "#CFE1FF" },
  modalRowDesc: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 },

  modalClose: { marginTop: 12, alignItems: "center" },
  modalCloseText: { color: "#9FB4FF", fontSize: 15, fontWeight: "600" },
});
