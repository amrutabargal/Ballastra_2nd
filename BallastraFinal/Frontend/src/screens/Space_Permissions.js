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
  Switch,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SpacePermissionsScreen({ navigation }) {
  const [sendMessages, setSendMessages] = useState(true);
  const [startLiveSession, setStartLiveSession] = useState(true);

  // Attachment popup state
  const [showAttachmentPopup, setShowAttachmentPopup] = useState(false);
  const [allowImage, setAllowImage] = useState(true);
  const [allowVideo, setAllowVideo] = useState(false);
  const [allowDoc, setAllowDoc] = useState(true);

  // Thread creation popup state
  const [showThreadPopup, setShowThreadPopup] = useState(false);
  const [threadChoice, setThreadChoice] = useState("Anyone"); // "Anyone" | "Members with Ident" | "Only Owner/Admin"

  // Pin message popup state
  const [showPinPopup, setShowPinPopup] = useState(false);
  const [pinChoice, setPinChoice] = useState("Allow pin"); // "Allow pin" | "Only Admin/Owner"

  // Slow mode popup state
  const [showSlowModePopup, setShowSlowModePopup] = useState(false);
  const [slowChoice, setSlowChoice] = useState("5 Min"); // Off | 30s | 1m | 5 Min | 10m

  // Mention popup state
  const [showMentionPopup, setShowMentionPopup] = useState(false);
  const [mentionChoice, setMentionChoice] = useState("No mentions"); // "No mentions" | "@member" | "@idents" | "@everyone"

  // Read messages invisibly & Space-specific idents states + popups
  const [showReadPopup, setShowReadPopup] = useState(false);
  const [readChoice, setReadChoice] = useState("On"); // "On" | "Off"

  const [showSpaceIdentPopup, setShowSpaceIdentPopup] = useState(false);
  const [spaceIdentChoice, setSpaceIdentChoice] = useState("On"); // "On" | "Off"

  // Auto-clean popup
  const [showAutoCleanPopup, setShowAutoCleanPopup] = useState(false);
  const [autoCleanChoice, setAutoCleanChoice] = useState("1 Hour"); // "1 Hour" | "1 Day" | "1 Week" | "Never"

  // Content filter popup
  const [showContentFilterPopup, setShowContentFilterPopup] = useState(false);
  const [contentFilterChoice, setContentFilterChoice] = useState("Normal"); // "Normal" | "Strict" | "NSFW Filter" | "Per-space Control"

  // Invite permission popup
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteChoice, setInviteChoice] = useState("On"); // "On" | "Off"

  // Custom Moderation Rules popup
  const [showModerationPopup, setShowModerationPopup] = useState(false);
  const [moderationChoice, setModerationChoice] = useState("5 messages in 10 sec");

  const handleBack = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const onPressRow = (label) => {
    if (label === "Send Attachments & Media") {
      setShowAttachmentPopup(true);
    } else if (label === "Thread Creation") {
      setShowThreadPopup(true);
    } else if (label === "Pin Message") {
      setShowPinPopup(true);
    } else if (label === "Slow Mode Override") {
      setShowSlowModePopup(true);
    } else if (label === "Mention Permission Levels") {
      setShowMentionPopup(true);
    } else if (label === "Read Messages Invisibly") {
      setShowReadPopup(true);
    } else if (label === "Space-Specific Idents") {
      setShowSpaceIdentPopup(true);
    } else if (label === "Auto Cleans Old Messages") {
      setShowAutoCleanPopup(true);
    } else if (label === "Content Filter") {
      setShowContentFilterPopup(true);
    } else if (label === "Invite Permission") {
      setShowInvitePopup(true);
    } else if (label === "Custom Moderation Rules") {
      setShowModerationPopup(true);
    } else {
      console.log("Pressed:", label);
    }
  };

  const renderValueRow = (label, value) => (
    <TouchableOpacity
      style={styles.cardRow}
      activeOpacity={0.85}
      onPress={() => onPressRow(label)}
    >
      <Text style={styles.cardText}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
      </View>
    </TouchableOpacity>
  );

  const renderSimpleRow = (label, value) => (
    <TouchableOpacity
      style={styles.cardRow}
      activeOpacity={0.85}
      onPress={() => onPressRow(label)}
    >
      <Text style={styles.cardText}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
        <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fake status bar row */}
      <View style={styles.fakeStatusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.fakeStatusIcons}>
          <Ionicons
            name="cellular"
            size={16}
            color="#ffffff"
            style={styles.fakeIcon}
          />
          <Ionicons name="wifi" size={16} color="#ffffff" style={styles.fakeIcon} />
          <Ionicons
            name="battery-full"
            size={20}
            color="#ffffff"
            style={styles.fakeIcon}
          />
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Space Permissions</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Send Message / Voice Notes */}
        <View style={styles.cardRow}>
          <Text style={styles.cardText}>Send Message / Send Voice Notes</Text>
          <Switch
            value={sendMessages}
            onValueChange={setSendMessages}
            trackColor={{ false: "#29314D", true: "#4A7FE8" }}
            thumbColor="#ffffff"
            ios_backgroundColor="#29314D"
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>

        {/* Start Live Session */}
        <View style={styles.cardRow}>
          <Text style={styles.cardText}>Start Live Session</Text>
          <Switch
            value={startLiveSession}
            onValueChange={setStartLiveSession}
            trackColor={{ false: "#29314D", true: "#4A7FE8" }}
            thumbColor="#ffffff"
            ios_backgroundColor="#29314D"
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>

        {/* Send Attachments & Media */}
        {renderValueRow("Send Attachments & Media", allowImage ? "Allow images" : "Blocked")}

        {/* Thread Creation */}
        {renderValueRow("Thread Creation", threadChoice)}

        {/* Pin Message */}
        {renderValueRow("Pin Message", pinChoice)}

        {/* Slow Mode Override */}
        {renderValueRow("Slow Mode Override", slowChoice)}

        {/* Mention Permission Levels */}
        {renderValueRow("Mention Permission Levels", mentionChoice)}

        {/* Read Messages Invisibly */}
        {renderSimpleRow("Read Messages Invisibly", readChoice)}

        {/* Space-Specific Idents */}
        {renderSimpleRow("Space-Specific Idents", spaceIdentChoice)}

        {/* Auto Cleans Old Messages */}
        {renderValueRow("Auto Cleans Old Messages", autoCleanChoice)}

        {/* Content Filter */}
        {renderValueRow("Content Filter", contentFilterChoice)}

        {/* Invite Permission */}
        {renderSimpleRow("Invite Permission", inviteChoice)}

        {/* Custom Moderation Rules */}
        {renderValueRow("Custom Moderation Rules", moderationChoice)}

        {/* AI Access Controls group */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderWrapper}>
            <Text style={styles.sectionHeaderText}>AI Access Controls</Text>
          </View>

          <TouchableOpacity
            style={styles.sectionRow}
            activeOpacity={0.85}
            onPress={() => onPressRow("AI reply")}
          >
            <Text style={styles.sectionRowText}>AI reply</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>On</Text>
              <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionRow}
            activeOpacity={0.85}
            onPress={() => onPressRow("AI summary")}
          >
            <Text style={styles.sectionRowText}>AI summary</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>On</Text>
              <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sectionRow, { borderBottomWidth: 0 }]}
            activeOpacity={0.85}
            onPress={() => onPressRow("AI moderation")}
          >
            <Text style={styles.sectionRowText}>AI moderation</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>On</Text>
              <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Manage Messages group */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderWrapper}>
            <Text style={styles.sectionHeaderText}>Manage Messages</Text>
          </View>

          <TouchableOpacity
            style={styles.sectionRow}
            activeOpacity={0.85}
            onPress={() => onPressRow("Delete")}
          >
            <Text style={styles.sectionRowText}>Delete</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>On</Text>
              <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sectionRow, { borderBottomWidth: 0 }]}
            activeOpacity={0.85}
            onPress={() => onPressRow("Edit")}
          >
            <Text style={styles.sectionRowText}>Edit</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>On</Text>
              <Ionicons name="chevron-down" size={16} color="#9FB4FF" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Attachment modal */}
      <Modal
        visible={showAttachmentPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAttachmentPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowAttachmentPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={styles.popupCard}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Send Attachments & Media</Text>
              <TouchableOpacity onPress={() => setShowAttachmentPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <View style={styles.popupRow}>
              <Text style={styles.popupRowText}>Image</Text>
              <Switch
                value={allowImage}
                onValueChange={(v) => {
                  setAllowImage(v);
                }}
                trackColor={{ false: "#29314D", true: "#4A7FE8" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#29314D"
                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
              />
            </View>

            <View style={styles.popupRow}>
              <Text style={styles.popupRowText}>Video</Text>
              <Switch
                value={allowVideo}
                onValueChange={setAllowVideo}
                trackColor={{ false: "#29314D", true: "#4A7FE8" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#29314D"
                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
              />
            </View>

            <View style={[styles.popupRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.popupRowText}>Doc</Text>
              <Switch
                value={allowDoc}
                onValueChange={setAllowDoc}
                trackColor={{ false: "#29314D", true: "#4A7FE8" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#29314D"
                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Thread Creation modal */}
      <Modal
        visible={showThreadPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowThreadPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowThreadPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Thread Creation</Text>
              <TouchableOpacity onPress={() => setShowThreadPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, threadChoice === "Anyone" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setThreadChoice("Anyone");
                setShowThreadPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Anyone</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.radioOuter, threadChoice === "Anyone" ? styles.radioChecked : null]}>
                  {threadChoice === "Anyone" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, threadChoice === "Members with Ident" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setThreadChoice("Members with Ident");
                setShowThreadPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Members with Ident</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.radioOuter, threadChoice === "Members with Ident" ? styles.radioChecked : null]}>
                  {threadChoice === "Members with Ident" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, threadChoice === "Only Owner/Admin" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setThreadChoice("Only Owner/Admin");
                setShowThreadPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Only Owner/Admin</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.radioOuter, threadChoice === "Only Owner/Admin" ? styles.radioChecked : null]}>
                  {threadChoice === "Only Owner/Admin" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Pin Message modal */}
      <Modal
        visible={showPinPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPinPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowPinPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Pin Message</Text>
              <TouchableOpacity onPress={() => setShowPinPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, pinChoice === "Allow pin" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setPinChoice("Allow pin");
                setShowPinPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Allow pin</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.radioOuter, pinChoice === "Allow pin" ? styles.radioChecked : null]}>
                  {pinChoice === "Allow pin" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, pinChoice === "Only Admin/Owner" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setPinChoice("Only Admin/Owner");
                setShowPinPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Only Admin/Owner</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.radioOuter, pinChoice === "Only Admin/Owner" ? styles.radioChecked : null]}>
                  {pinChoice === "Only Admin/Owner" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Slow Mode modal */}
      <Modal
        visible={showSlowModePopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSlowModePopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowSlowModePopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(380, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Slow Mode Override</Text>
              <TouchableOpacity onPress={() => setShowSlowModePopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, slowChoice === "Off" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setSlowChoice("Off");
                setShowSlowModePopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Off</Text>
              <View>
                <View style={[styles.radioOuter, slowChoice === "Off" ? styles.radioChecked : null]}>
                  {slowChoice === "Off" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, slowChoice === "30s" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setSlowChoice("30s");
                setShowSlowModePopup(false);
              }}
            >
              <Text style={styles.popupRowText}>30s</Text>
              <View>
                <View style={[styles.radioOuter, slowChoice === "30s" ? styles.radioChecked : null]}>
                  {slowChoice === "30s" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, slowChoice === "1m" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setSlowChoice("1m");
                setShowSlowModePopup(false);
              }}
            >
              <Text style={styles.popupRowText}>1m</Text>
              <View>
                <View style={[styles.radioOuter, slowChoice === "1m" ? styles.radioChecked : null]}>
                  {slowChoice === "1m" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, slowChoice === "5 Min" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setSlowChoice("5 Min");
                setShowSlowModePopup(false);
              }}
            >
              <Text style={styles.popupRowText}>5m</Text>
              <View>
                <View style={[styles.radioOuter, slowChoice === "5 Min" ? styles.radioChecked : null]}>
                  {slowChoice === "5 Min" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, slowChoice === "10m" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setSlowChoice("10m");
                setShowSlowModePopup(false);
              }}
            >
              <Text style={styles.popupRowText}>10m</Text>
              <View>
                <View style={[styles.radioOuter, slowChoice === "10m" ? styles.radioChecked : null]}>
                  {slowChoice === "10m" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Mention Permission Levels modal */}
      <Modal
        visible={showMentionPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMentionPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowMentionPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Mention Permission Levels</Text>
              <TouchableOpacity onPress={() => setShowMentionPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, mentionChoice === "No mentions" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setMentionChoice("No mentions");
                setShowMentionPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>No mentions</Text>
              <View>
                <View style={[styles.radioOuter, mentionChoice === "No mentions" ? styles.radioChecked : null]}>
                  {mentionChoice === "No mentions" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, mentionChoice === "@member" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setMentionChoice("@member");
                setShowMentionPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>@member</Text>
              <View>
                <View style={[styles.radioOuter, mentionChoice === "@member" ? styles.radioChecked : null]}>
                  {mentionChoice === "@member" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, mentionChoice === "@idents" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setMentionChoice("@idents");
                setShowMentionPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>@idents</Text>
              <View>
                <View style={[styles.radioOuter, mentionChoice === "@idents" ? styles.radioChecked : null]}>
                  {mentionChoice === "@idents" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, mentionChoice === "@everyone" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setMentionChoice("@everyone");
                setShowMentionPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>@everyone</Text>
              <View>
                <View style={[styles.radioOuter, mentionChoice === "@everyone" ? styles.radioChecked : null]}>
                  {mentionChoice === "@everyone" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Read Messages Invisibly modal */}
      <Modal
        visible={showReadPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReadPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowReadPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Read Messages Invisibly</Text>
              <TouchableOpacity onPress={() => setShowReadPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, readChoice === "On" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setReadChoice("On");
                setShowReadPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>On</Text>
              <View>
                <View style={[styles.radioOuter, readChoice === "On" ? styles.radioChecked : null]}>
                  {readChoice === "On" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, readChoice === "Off" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setReadChoice("Off");
                setShowReadPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Off</Text>
              <View>
                <View style={[styles.radioOuter, readChoice === "Off" ? styles.radioChecked : null]}>
                  {readChoice === "Off" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Space-Specific Idents modal */}
      <Modal
        visible={showSpaceIdentPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSpaceIdentPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowSpaceIdentPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Space-Specific Idents</Text>
              <TouchableOpacity onPress={() => setShowSpaceIdentPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, spaceIdentChoice === "On" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setSpaceIdentChoice("On");
                setShowSpaceIdentPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>On</Text>
              <View>
                <View style={[styles.radioOuter, spaceIdentChoice === "On" ? styles.radioChecked : null]}>
                  {spaceIdentChoice === "On" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, spaceIdentChoice === "Off" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setSpaceIdentChoice("Off");
                setShowSpaceIdentPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Off</Text>
              <View>
                <View style={[styles.radioOuter, spaceIdentChoice === "Off" ? styles.radioChecked : null]}>
                  {spaceIdentChoice === "Off" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Auto Clean modal */}
      <Modal
        visible={showAutoCleanPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAutoCleanPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowAutoCleanPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Auto Cleans Old Messages</Text>
              <TouchableOpacity onPress={() => setShowAutoCleanPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, autoCleanChoice === "1 Hour" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setAutoCleanChoice("1 Hour");
                setShowAutoCleanPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>1Hour</Text>
              <View>
                <View style={[styles.radioOuter, autoCleanChoice === "1 Hour" ? styles.radioChecked : null]}>
                  {autoCleanChoice === "1 Hour" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, autoCleanChoice === "1 Day" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setAutoCleanChoice("1 Day");
                setShowAutoCleanPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>1Day</Text>
              <View>
                <View style={[styles.radioOuter, autoCleanChoice === "1 Day" ? styles.radioChecked : null]}>
                  {autoCleanChoice === "1 Day" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, autoCleanChoice === "1 Week" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setAutoCleanChoice("1 Week");
                setShowAutoCleanPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>1Week</Text>
              <View>
                <View style={[styles.radioOuter, autoCleanChoice === "1 Week" ? styles.radioChecked : null]}>
                  {autoCleanChoice === "1 Week" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, autoCleanChoice === "Never" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setAutoCleanChoice("Never");
                setShowAutoCleanPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Never</Text>
              <View>
                <View style={[styles.radioOuter, autoCleanChoice === "Never" ? styles.radioChecked : null]}>
                  {autoCleanChoice === "Never" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Content Filter modal */}
      <Modal
        visible={showContentFilterPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowContentFilterPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowContentFilterPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Content Filter</Text>
              <TouchableOpacity onPress={() => setShowContentFilterPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, contentFilterChoice === "Normal" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setContentFilterChoice("Normal");
                setShowContentFilterPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Normal</Text>
              <View>
                <View style={[styles.radioOuter, contentFilterChoice === "Normal" ? styles.radioChecked : null]}>
                  {contentFilterChoice === "Normal" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, contentFilterChoice === "Strict" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setContentFilterChoice("Strict");
                setShowContentFilterPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Strict</Text>
              <View>
                <View style={[styles.radioOuter, contentFilterChoice === "Strict" ? styles.radioChecked : null]}>
                  {contentFilterChoice === "Strict" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, contentFilterChoice === "NSFW Filter" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setContentFilterChoice("NSFW Filter");
                setShowContentFilterPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>NSFW Filter</Text>
              <View>
                <View style={[styles.radioOuter, contentFilterChoice === "NSFW Filter" ? styles.radioChecked : null]}>
                  {contentFilterChoice === "NSFW Filter" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, contentFilterChoice === "Per-space Control" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setContentFilterChoice("Per-space Control");
                setShowContentFilterPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Per-space Control</Text>
              <View>
                <View style={[styles.radioOuter, contentFilterChoice === "Per-space Control" ? styles.radioChecked : null]}>
                  {contentFilterChoice === "Per-space Control" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Invite Permission modal */}
      <Modal
        visible={showInvitePopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInvitePopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowInvitePopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Invite Permission</Text>
              <TouchableOpacity onPress={() => setShowInvitePopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, inviteChoice === "On" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setInviteChoice("On");
                setShowInvitePopup(false);
              }}
            >
              <Text style={styles.popupRowText}>On</Text>
              <View>
                <View style={[styles.radioOuter, inviteChoice === "On" ? styles.radioChecked : null]}>
                  {inviteChoice === "On" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, inviteChoice === "Off" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setInviteChoice("Off");
                setShowInvitePopup(false);
              }}
            >
              <Text style={styles.popupRowText}>Off</Text>
              <View>
                <View style={[styles.radioOuter, inviteChoice === "Off" ? styles.radioChecked : null]}>
                  {inviteChoice === "Off" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Custom Moderation Rules modal */}
      <Modal
        visible={showModerationPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModerationPopup(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowModerationPopup(false)} />
        <View style={styles.modalCenter}>
          <View style={[styles.popupCard, { width: Math.min(360, width - 40) }]}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Custom Moderation Rules</Text>
              <TouchableOpacity onPress={() => setShowModerationPopup(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close" size={18} color="#9FB4FF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.popupRow, moderationChoice === "5 messages in 10 sec" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setModerationChoice("5 messages in 10 sec");
                setShowModerationPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>5 messages in 10 sec</Text>
              <View>
                <View style={[styles.radioOuter, moderationChoice === "5 messages in 10 sec" ? styles.radioChecked : null]}>
                  {moderationChoice === "5 messages in 10 sec" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, moderationChoice === "10 messages in 20 sec" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setModerationChoice("10 messages in 20 sec");
                setShowModerationPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>10 messages in 20 sec</Text>
              <View>
                <View style={[styles.radioOuter, moderationChoice === "10 messages in 20 sec" ? styles.radioChecked : null]}>
                  {moderationChoice === "10 messages in 20 sec" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.popupRow, { borderBottomWidth: 0 }, moderationChoice === "15 messages in 30 sec" ? { backgroundColor: "rgba(159,180,255,0.04)" } : null]}
              activeOpacity={0.8}
              onPress={() => {
                setModerationChoice("15 messages in 30 sec");
                setShowModerationPopup(false);
              }}
            >
              <Text style={styles.popupRowText}>15 messages in 30 sec</Text>
              <View>
                <View style={[styles.radioOuter, moderationChoice === "15 messages in 30 sec" ? styles.radioChecked : null]}>
                  {moderationChoice === "15 messages in 30 sec" && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CARD_BG = "#071736";
const CARD_BORDER = "#2D57C8";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020818",
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
    marginTop: 20,
    paddingHorizontal: 20,
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
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 32,
  },

  // single line card row
  cardRow: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },

  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    color: "#9FB4FF",
    fontSize: 12,
    marginRight: 4,
  },

  // grouped section card (AI Access / Manage Messages)
  sectionCard: {
    borderRadius: 22,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    marginTop: 18,
    overflow: "hidden",
  },
  sectionHeaderWrapper: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 6,
  },
  sectionHeaderText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
  },
  sectionRow: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.05)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionRowText: {
    color: "#ffffff",
    fontSize: 13,
    flexShrink: 1,
  },

  /* Modal / popup styles */
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalCenter: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  popupCard: {
    width: Math.min(360, width - 40),
    borderRadius: 14,
    backgroundColor: "#071736",
    borderWidth: 1,
    borderColor: "#2D57C8",
    overflow: "hidden",
    paddingBottom: 6,
  },
  popupHeader: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.04)",
  },
  popupTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  popupRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.03)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  popupRowText: {
    color: "#ffffff",
    fontSize: 13,
  },

  /* radio */
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(159,180,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#8EA8FF",
  },
  radioChecked: {
    borderColor: "#8EA8FF",
  },
});
