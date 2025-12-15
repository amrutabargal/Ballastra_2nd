
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
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// 🔗 BACKEND BASE URL – इथे बदल
const API_BASE_URL = "http://192.168.1.5:5000/api";

const VERIFICATION_OPTIONS = [
  { id: "none", label: "None", desc: "Unrestricted" },
  {
    id: "low",
    label: "Low",
    desc: "Must have verified email on their ballastra account.",
  },
  {
    id: "medium",
    label: "Medium",
    desc: "Must also be registered on ballastra for longer than 5 minutes.",
  },
  {
    id: "high",
    label: "High",
    desc: "Must also be a member of this nexus for longer than 10 minutes.",
  },
  {
    id: "highest",
    label: "Highest",
    desc: "Must have a verified phone on their ballastra account.",
  },
];

const SENSITIVE_OPTIONS = [
  { id: "none", label: "None", desc: "No filtering" },
  {
    id: "scan_media",
    label: "All Members Filter",
    desc: "Automatically scan images & videos for NSFW",
  },
  {
    id: "hide_on_match",
    label: "Hide on Match",
    desc: "Hide automatically when content flagged",
  },
  {
    id: "require_age",
    label: "Age Verified Only",
    desc: "Require age verification to view content",
  },
];

export default function InvitesScreen({ navigation, route }) {
  // 👉 या nexus साठी invites आहेत, म्हणून nexusId route मधून घे
  const nexusId = route?.params?.nexusId;

  const [verifyExpanded, setVerifyExpanded] = useState(false);
  const [sensitiveExpanded, setSensitiveExpanded] = useState(false);

  const [selectedVerification, setSelectedVerification] = useState("none");

  const [sensitiveState, setSensitiveState] = useState({
    none: true,
    scan_media: false,
    hide_on_match: false,
    require_age: false,
  });

  const [ageRestricted, setAgeRestricted] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFor, setModalFor] = useState(null);

  // 🔥 INVITE PART
  const [inviteInfo, setInviteInfo] = useState(null); // { code, expiresAt }
  const [inviteGenerating, setInviteGenerating] = useState(false);

  const [inviteCodeInput, setInviteCodeInput] = useState(""); // accept साठी
  const [inviteAccepting, setInviteAccepting] = useState(false);

  const handleBack = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const toggleVerify = () => {
    setVerifyExpanded((p) => !p);
    if (sensitiveExpanded) setSensitiveExpanded(false);
  };

  const toggleSensitive = () => {
    setSensitiveExpanded((p) => !p);
    if (verifyExpanded) setVerifyExpanded(false);
  };

  const selectVerification = (id) => setSelectedVerification(id);

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
    VERIFICATION_OPTIONS.find((o) => o.id === selectedVerification)?.label ||
    "None";

  const getSensitiveLabel = () => {
    if (sensitiveState.none) return "None";
    const active = Object.keys(sensitiveState).filter(
      (k) => k !== "none" && sensitiveState[k]
    );
    return active.length === 1
      ? SENSITIVE_OPTIONS.find((o) => o.id === active[0])?.label || "Custom"
      : "Custom";
  };

  const openModal = (forKey) => {
    setModalFor(forKey);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalFor(null);
  };

  // ------------------ INVITE API HANDLERS ------------------ //

  // 🔹 Generate Invite
  const handleGenerateInvite = async () => {
    if (!nexusId) {
      Alert.alert(
        "Error",
        "Nexus ID not found. Please pass the nexusId while opening this screen."
      );
      return;
    }
    if (inviteGenerating) return;

    try {
      setInviteGenerating(true);

      const res = await fetch(`${API_BASE_URL}/invites/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // इथे Auth token असेल तर:
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nexusId,
          expiresInHours: 24, // 24 तास expiry – हवं तर बदल
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        Alert.alert("Error", json.message || "Could not generate invite.");
        return;
      }

      const data = json.data || {};
      setInviteInfo({
        code: data.code,
        // backend मध्ये field नाव expiresAt आहे (invite.expires_at पास केलंय)
        expiresAt: data.expiresAt,
      });

      Alert.alert("Invite Created", `Code: ${data.code}`);
    } catch (err) {
      console.log("generateInvite error =>", err);
      Alert.alert("Error", "Network error while generating invite.");
    } finally {
      setInviteGenerating(false);
    }
  };

  // 🔹 Accept Invite (join nexus using code)
  const handleAcceptInvite = async () => {
    const code = inviteCodeInput.trim();
    if (!code) {
      Alert.alert("Error", "Please enter an invite code.");
      return;
    }
    if (inviteAccepting) return;

    try {
      setInviteAccepting(true);

      const res = await fetch(`${API_BASE_URL}/invites/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        Alert.alert("Error", json.message || "Could not accept invite.");
        return;
      }

      Alert.alert("Success", "Invite accepted. You joined the nexus!");
      setInviteCodeInput("");
    } catch (err) {
      console.log("acceptInvite error =>", err);
      Alert.alert("Error", "Network error while accepting invite.");
    } finally {
      setInviteAccepting(false);
    }
  };

  // --------------------------------------------------------- //

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={styles.headerLeft}
          >
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </TouchableOpacity>

          <Text style={styles.title}>Invites</Text>

          <View style={{ width: 28 }} />
        </View>

        {/* Verifications pill */}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.pill}
            activeOpacity={0.85}
            onPress={toggleVerify}
          >
            <Text style={styles.pillLabel}>Verifications Level</Text>
            <View style={styles.pillRight}>
              <Text style={styles.pillValue}>{getVerifyLabel()}</Text>
              <Ionicons
                name={verifyExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color="#9FB4FF"
                style={{ marginLeft: 8 }}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.pillDesc}>
            Members of the nexus must meet the following criteria before they
            can send messages in text Space or initiate a direct message
            conversation.
          </Text>

          {verifyExpanded && (
            <View style={styles.expandedContainer}>
              {VERIFICATION_OPTIONS.map((opt) => {
                const active = selectedVerification === opt.id;
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[
                      styles.optionRow,
                      active ? styles.optionActive : null,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => selectVerification(opt.id)}
                  >
                    <View style={styles.optionLeft}>
                      <View
                        style={[
                          styles.radioOuter,
                          active ? styles.radioOuterActive : null,
                        ]}
                      >
                        {active && <View style={styles.radioInner} />}
                      </View>
                      <View style={{ marginLeft: 12 }}>
                        <Text
                          style={[
                            styles.optionTitle,
                            active ? styles.optionTitleActive : null,
                          ]}
                        >
                          {opt.label}
                        </Text>
                        <Text style={styles.optionDesc}>{opt.desc}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Sensitive content pill */}
        <View style={{ marginTop: 22 }}>
          <TouchableOpacity
            style={styles.pill}
            activeOpacity={0.85}
            onPress={toggleSensitive}
          >
            <Text style={styles.pillLabel}>Sensitive content filters</Text>
            <View style={styles.pillRight}>
              <Text style={styles.pillValue}>{getSensitiveLabel()}</Text>
              <Ionicons
                name={sensitiveExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color="#9FB4FF"
                style={{ marginLeft: 8 }}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.pillDesc}>
            Choose if nexus members can share image-based media detected by
            Ballastra sensitive content filters. This setting will apply to
            Space that are not age-restricted.
          </Text>

          {sensitiveExpanded && (
            <View style={styles.expandedContainer}>
              <View className="filterRow" style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.optionTitle,
                      sensitiveState.none ? styles.optionTitleActive : null,
                    ]}
                  >
                    None
                  </Text>
                  <Text style={styles.optionDesc}>No filtering</Text>
                </View>
                <Switch
                  value={sensitiveState.none}
                  onValueChange={() => toggleSensitiveOption("none")}
                  thumbColor={sensitiveState.none ? "#1BFFFF" : "#ffffff"}
                  trackColor={{ false: "#122347", true: "#2340A0" }}
                />
              </View>

              <View style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.optionTitle,
                      sensitiveState.scan_media
                        ? styles.optionTitleActive
                        : null,
                    ]}
                  >
                    All Members Filter
                  </Text>
                  <Text style={styles.optionDesc}>
                    Automatically scan images & videos for NSFW
                  </Text>
                </View>
                <Switch
                  value={sensitiveState.scan_media}
                  onValueChange={() => toggleSensitiveOption("scan_media")}
                  thumbColor={sensitiveState.scan_media ? "#1BFFFF" : "#ffffff"}
                  trackColor={{ false: "#122347", true: "#2340A0" }}
                />
              </View>

              <View style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.optionTitle,
                      sensitiveState.hide_on_match
                        ? styles.optionTitleActive
                        : null,
                    ]}
                  >
                    Hide media on match
                  </Text>
                  <Text style={styles.optionDesc}>
                    Hide automatically when content flagged
                  </Text>
                </View>
                <Switch
                  value={sensitiveState.hide_on_match}
                  onValueChange={() => toggleSensitiveOption("hide_on_match")}
                  thumbColor={
                    sensitiveState.hide_on_match ? "#1BFFFF" : "#ffffff"
                  }
                  trackColor={{ false: "#122347", true: "#2340A0" }}
                />
              </View>

              <View style={styles.filterRow}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.optionTitle,
                      sensitiveState.require_age
                        ? styles.optionTitleActive
                        : null,
                    ]}
                  >
                    Require age verification
                  </Text>
                  <Text style={styles.optionDesc}>
                    Members must verify age before viewing
                  </Text>
                </View>
                <Switch
                  value={sensitiveState.require_age}
                  onValueChange={() => toggleSensitiveOption("require_age")}
                  thumbColor={
                    sensitiveState.require_age ? "#1BFFFF" : "#ffffff"
                  }
                  trackColor={{ false: "#122347", true: "#2340A0" }}
                />
              </View>
            </View>
          )}
        </View>

        {/* Age-Restricted Nexus */}
        <View style={{ marginTop: 22 }}>
          <View style={styles.switchCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchTitle}>Age-Restricted Nexus</Text>
              <Text style={styles.switchDesc}>
                Users will need to confirm they are over the legal age to view
                the content in this nexus.
              </Text>
            </View>
            <Switch
              value={ageRestricted}
              onValueChange={setAgeRestricted}
               trackColor={{ false: "#1E293B", true: "#4479FF" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* 🔥 INVITE UI SECTION */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionHeader}>Invite Links</Text>

          {/* Generate Invite Card */}
          <View style={styles.inviteCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inviteTitle}>Generate invite</Text>
              <Text style={styles.inviteDesc}>
                Create a shareable invite code for this nexus. Code will expire
                after 24 hours by default.
              </Text>

              {inviteInfo?.code && (
                <View style={styles.inviteInfoBox}>
                  <Text style={styles.inviteInfoLabel}>
                    Current invite code
                  </Text>
                  <Text style={styles.inviteInfoCode}>{inviteInfo.code}</Text>
                  {inviteInfo.expiresAt && (
                    <Text style={styles.inviteInfoExpiry}>
                      Expires at:{" "}
                      {new Date(inviteInfo.expiresAt).toLocaleString()}
                    </Text>
                  )}
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.inviteButton}
              activeOpacity={0.8}
              onPress={handleGenerateInvite}
              disabled={inviteGenerating}
            >
              <Text style={styles.inviteButtonText}>
                {inviteGenerating ? "Generating..." : "Generate"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Accept Invite Card */}
          <View style={[styles.inviteCard, { marginTop: 14 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inviteTitle}>Join with invite code</Text>
              <Text style={styles.inviteDesc}>
                Have a code? Enter it here to accept an invite and join the
                nexus.
              </Text>

              <View style={styles.inviteInputWrapper}>
                <TextInput
                  style={styles.inviteInput}
                  placeholder="Enter invite code"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={inviteCodeInput}
                  onChangeText={setInviteCodeInput}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.inviteButton, { marginTop: 10 }]}
              activeOpacity={0.8}
              onPress={handleAcceptInvite}
              disabled={inviteAccepting}
            >
              <Text style={styles.inviteButtonText}>
                {inviteAccepting ? "Joining..." : "Accept Invite"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom modal (optional – ठेवले आहे design साठी) */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {modalFor === "verify"
                ? "Select Verification Level"
                : "Select Filter"}
            </Text>
            <FlatList
              data={modalFor === "verify" ? VERIFICATION_OPTIONS : SENSITIVE_OPTIONS}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => {
                const isSelected =
                  modalFor === "verify"
                    ? selectedVerification === item.id
                    : !!sensitiveState[item.id];
                return (
                  <TouchableOpacity
                    style={[
                      styles.modalRow,
                      isSelected ? styles.modalRowSelected : null,
                    ]}
                    onPress={() => {
                      if (modalFor === "verify") selectVerification(item.id);
                      else toggleSensitiveOption(item.id);
                      closeModal();
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <View
                        style={[
                          styles.radioOuter,
                          isSelected ? styles.radioOuterActive : null,
                        ]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <View style={{ marginLeft: 12 }}>
                        <Text
                          style={[
                            styles.modalRowTitle,
                            isSelected ? styles.modalRowTitleActive : null,
                          ]}
                        >
                          {item.label}
                        </Text>
                        <Text style={styles.modalRowDesc}>{item.desc}</Text>
                      </View>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark" size={18} color="#9FB4FF" />
                    )}
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

/* ---------------- Styles ---------------- */
const CARD_RADIUS = 18;
const PADDING = Math.max(18, Math.round(width * 0.04));

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020821" },
  content: {
    paddingHorizontal: PADDING,
    paddingTop: Platform.OS === "ios" ? 36 : 24,
    paddingBottom: 28,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { width: 40 },
  title: { color: "#ffffff", fontSize: 18, fontWeight: "600" },

  pill: {
    marginTop: 8,
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    height:52,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pillLabel: { color: "#CFE1FF", fontSize: 14, fontWeight: "600" },
  pillRight: { flexDirection: "row", alignItems: "center" },
  pillValue: { color: "#9FB4FF", fontSize: 13 },

  pillDesc: {
    marginTop: 10,
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    lineHeight: 18,
  },

  expandedContainer: {
    marginTop: 10,
    borderRadius: 15,
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
  radioOuterActive: {
    borderColor: "#72A0FF",
    backgroundColor: "rgba(114,160,255,0.06)",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#72A0FF",
  },

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

  sectionHeader: {
    color: "#CFE1FF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  inviteCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  inviteTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  inviteDesc: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginBottom: 10,
  },

  inviteInfoBox: {
    marginTop: 6,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#030c22",
    borderWidth: 1,
    borderColor: "#1b2f5d",
  },
  inviteInfoLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
  },
  inviteInfoCode: {
    color: "#CFE1FF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  inviteInfoExpiry: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    marginTop: 4,
  },

  inviteButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#2340A0",
  },
  inviteButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },

  inviteInputWrapper: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1b2f5d",
    backgroundColor: "#030c22",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  inviteInput: {
    color: "#ffffff",
    fontSize: 13,
    paddingVertical: 6,
  },

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

  modalRow: {
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalRowSelected: { backgroundColor: "rgba(159,180,255,0.04)" },
  modalRowTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
  modalRowTitleActive: { color: "#CFE1FF" },
  modalRowDesc: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 },

  modalClose: { marginTop: 12, alignItems: "center" },
  modalCloseText: { color: "#9FB4FF", fontSize: 15, fontWeight: "600" },
});
