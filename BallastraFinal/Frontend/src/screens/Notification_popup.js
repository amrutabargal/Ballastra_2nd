
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const BG = "#020816";

const REACTION_OPTIONS = [
  { key: "all", label: "All Messages" },
  { key: "dm", label: "Only Direct Messages" },
  { key: "never", label: "Never" },
];

const SWITCH_GRADIENT = ["#7B2EFF", "#2F80FF"];

export default function Notification_popup({ navigation }) {
  const [roleMentions, setRoleMentions] = useState(true);
  const [indirectMentions, setIndirectMentions] = useState(true);
  const [ballastraNotifs, setBallastraNotifs] = useState(true);

  const [friendsStream, setFriendsStream] = useState(true);
  const [voiceActivity, setVoiceActivity] = useState(true);
  const [friendsReturn, setFriendsReturn] = useState(true);

  const [reactionFilter, setReactionFilter] = useState("all");
  const [reactionModalVisible, setReactionModalVisible] = useState(false);

  const getReactionLabel = () => {
    const found = REACTION_OPTIONS.find((o) => o.key === reactionFilter);
    return found ? found.label : "All Messages";
  };

  const handleSelectReaction = (key) => {
    setReactionFilter(key);
    setReactionModalVisible(false);
  };

  // ===== Custom SVG Icon for Role Mentions =====
  const RoleIcon = ({ size = 20, color = "#FFFFFF" }) => (
    <Svg height={size} width={size} viewBox="0 -960 960 960" fill={color}>
      <Path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
    </Svg>
  );
  const IndirectIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg height={size} width={size} viewBox="0 -960 960 960" fill={color}>
    <Path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
  </Svg>
);

const BallastraIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg height={size} width={size} viewBox="0 -960 960 960" fill={color}>
    <Path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
  </Svg>
);

  // ===== Gradient Switch =====
  const GradientSwitch = ({ value, onChange }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.switchOuterBorder}
      onPress={() => onChange(!value)}
    >
      <LinearGradient
        colors={value ? SWITCH_GRADIENT : ["#25314F", "#25314F"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientTrack}
      >
        <View
          style={[
            styles.gradientThumb,
            { alignSelf: value ? "flex-end" : "flex-start" },
          ]}
        />
      </LinearGradient>
    </TouchableOpacity>
  );

  // ===== Updated renderSwitchRow =====
  const renderSwitchRow = (label, value, onChange, icon) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.iconWrapper}>
          {typeof icon === "string" ? (
            <Ionicons name={icon} size={18} color="#FFFFFF" />
          ) : (
            icon
          )}
        </View>
        <Text style={styles.cardText}>{label}</Text>
      </View>
      <GradientSwitch value={value} onChange={onChange} />
    </View>
  );

  const renderReactionRow = (label, isOn, onPress) => (
    <TouchableOpacity style={styles.reactionOptionRow} onPress={onPress}>
      <Text style={styles.reactionOptionText}>{label}</Text>
      <GradientSwitch value={isOn} onChange={() => onPress()} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.closeHit}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.closeHit} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {renderSwitchRow(
          "Show Role Mentions",
          roleMentions,
          setRoleMentions,
          <RoleIcon />
        )}
        {/* {renderSwitchRow(
          "Show Indirect Mentions",
          indirectMentions,
          setIndirectMentions,
          "notifications-outline"
        )}
        {renderSwitchRow(
          "Get Notifications within Ballastra",
          ballastraNotifs,
          setBallastraNotifs,
          "chatbubble-ellipses-outline"
        )} */}
        {renderSwitchRow(
  "Show Indirect Mentions",
  indirectMentions,
  setIndirectMentions,
  <IndirectIcon />
)}
{renderSwitchRow(
  "Get Notifications within Ballastra",
  ballastraNotifs,
  setBallastraNotifs,
  <BallastraIcon />
)}

        <Text style={styles.descriptionText}>
          Don’t miss a thing! Setup notifications to know when your friends send
          you a message.
        </Text>

        <Text style={styles.sectionTitle}>Other notifications</Text>

        {renderSwitchRow(
          "Get Notifications when your friends stream",
          friendsStream,
          setFriendsStream,
          "tv-outline"
        )}
        {renderSwitchRow(
          "Voice Activity Notifications",
          voiceActivity,
          setVoiceActivity,
          "mic-outline"
        )}
        {renderSwitchRow(
          "Friends Return",
          friendsReturn,
          setFriendsReturn,
          "people-outline"
        )}

        <Text style={styles.sectionTitle}>Reaction Notifications</Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setReactionModalVisible(true)}
        >
          <View style={styles.reactionCard}>
            <Text style={styles.reactionLabel}>Notifications</Text>
            <View style={styles.reactionRight}>
              <Text style={styles.reactionValue}>{getReactionLabel()}</Text>
              <Ionicons name="chevron-down" size={16} color="#E4E9FF" />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.reactionSubText}>
          Get notified when your friend returns after a long break.
        </Text>
      </ScrollView>

      {/* Reaction Modal */}
      <Modal
        visible={reactionModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setReactionModalVisible(false)}
      >
        <View style={styles.reactionModalBackdrop}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setReactionModalVisible(false)}
          />
          <View style={styles.reactionModalCard}>
            {REACTION_OPTIONS.map((opt, index) => {
              const isOn = reactionFilter === opt.key;
              return (
                <View key={opt.key}>
                  {renderReactionRow(opt.label, isOn, () =>
                    handleSelectReaction(opt.key)
                  )}
                  {index !== REACTION_OPTIONS.length - 1 && (
                    <View style={styles.reactionOptionDivider} />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1, paddingHorizontal: 18 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  headerTitle: { color: "#FFFFFF", fontSize: width * 0.045, fontWeight: "600" },

  switchOuterBorder: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    padding: 1,
  },
  gradientTrack: {
    width: 48,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  gradientThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2e3036ff",
    backgroundColor: "#3154BA4D",
    marginTop: 10,
  },
  cardLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4E6FFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardText: { color: "#FFFFFF", fontSize: width * 0.036 },

  descriptionText: {
    color: "#8E9BC5",
    fontSize: width * 0.032,
    marginTop: 10,
  },
  sectionTitle: {
    color: "#8E9BC5",
    fontSize: width * 0.035,
    marginTop: 18,
  },

  reactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2e3036ff",
    backgroundColor: "#3154BA4D",
    marginTop: 8,
  },
  reactionLabel: { color: "#FFFFFF", fontSize: width * 0.036 },
  reactionRight: { flexDirection: "row", alignItems: "center", gap: 5 },
  reactionValue: { color: "#E4E9FF", fontSize: width * 0.031 },

  reactionSubText: {
    color: "#8E9BC5",
    fontSize: width * 0.031,
    marginTop: 6,
  },

  reactionModalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  reactionModalCard: {
    margin: 18,
    borderRadius: 18,
    backgroundColor: "#050F25",
    borderWidth: 1,
    borderColor: "#3154BA",
    paddingVertical: 8,
  },
  reactionOptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  reactionOptionText: { color: "#FFFFFF", fontSize: width * 0.036 },
  reactionOptionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
});
