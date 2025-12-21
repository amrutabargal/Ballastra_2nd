
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function EditMemberScreen({ route, navigation }) {
  const member = route?.params?.member || { id: "0", name: "", avatar: null };
  const [nickname, setNickname] = useState(member.name || "");

  // action sheet state + animations
  const [sheetVisible, setSheetVisible] = useState(false);
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const sheetAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (sheetVisible) {
      // open
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(sheetAnim, {
          toValue: 0,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // close
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(sheetAnim, {
          toValue: height,
          duration: 240,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [sheetVisible, backdropAnim, sheetAnim]);

  const openSheet = () => setSheetVisible(true);
  const closeSheet = () => setSheetVisible(false);

  // Action handlers — navigate to specified screens
  const onTimeout = () => {
    closeSheet();
    navigation.navigate("Timeout", { member });
  };
  const onKick = () => {
    closeSheet();
    navigation.navigate("Kick", { member });
  };
  const onBan = () => {
    closeSheet();
    navigation.navigate("Ban", { member });
  };
  const onTransfer = () => {
  closeSheet();
  navigation.navigate("TransferOwnership", { member });
};


  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="chevron-back" size={22} color="#CFE0FF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit</Text>

          <TouchableOpacity onPress={openSheet} style={styles.headerBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#CFE0FF" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              {member.avatar ? (
                <Image source={{ uri: member.avatar }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarEmoji}>👤</Text>
              )}
            </View>
          </View>

          {/* Form / Nickname pill */}
          <View style={styles.form}>
            <Text style={styles.label}>Nickname</Text>

            <View style={styles.pill}>
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                placeholder="Tap to add a nick name"
                placeholderTextColor="rgba(255,255,255,0.38)"
                style={styles.pillInput}
                underlineColorAndroid="transparent"
                returnKeyType="done"
              />
            </View>
          </View>
        </View>

        {/* Action sheet (backdrop + sheet) */}
        <Animated.View pointerEvents={sheetVisible ? "auto" : "none"} style={[styles.backdrop, { opacity: backdropAnim }]} />
        {sheetVisible && <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />}

        <Animated.View style={[styles.actionSheet, { transform: [{ translateY: sheetAnim }] }]} pointerEvents={sheetVisible ? "auto" : "none"}>
          <View style={styles.sheetInner}>
            <View style={styles.sheetHandle} />

            <TouchableOpacity style={styles.actionRow} activeOpacity={0.8} onPress={onTimeout}>
              <View style={styles.actionLeft}>
                <View style={styles.actionIconWrap}>
                  <Ionicons name="timer-outline" size={20} color="#FF3B30" />
                </View>
                <Text style={styles.actionLabel}>Timeout</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow} activeOpacity={0.8} onPress={onKick}>
              <View style={styles.actionLeft}>
                <View style={styles.actionIconWrap}>
                  <Ionicons name="person-remove-outline" size={20} color="#FF3B30" />
                </View>
                <Text style={styles.actionLabel}>Kick</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow} activeOpacity={0.8} onPress={onBan}>
              <View style={styles.actionLeft}>
                <View style={styles.actionIconWrap}>
                  <Ionicons name="close-circle-outline" size={20} color="#FF3B30" />
                </View>
                <Text style={styles.actionLabel}>Ban</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow} activeOpacity={0.8} onPress={onTransfer}>
              <View style={styles.actionLeft}>
                <View style={styles.actionIconWrap}>
                  <Ionicons name="swap-horizontal-outline" size={20} color="#FF3B30" />
                </View>
                <Text style={styles.actionLabel}>Transfer Ownership</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* Styles */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#071028" },

  /* Header */
  header: { height: 56, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#E6F0FF", fontSize: 16, fontWeight: "700" },

  /* Content */
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 18 },

  avatarWrap: { alignItems: "center", marginTop: 6, marginBottom: 20 },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F7C8C0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.04)",
  },
  avatarImage: { width: "100%", height: "100%" },
  avatarEmoji: { fontSize: 38 },

  form: { marginTop: 8 },
  label: { color: "#DCE8FF", fontSize: 13, marginBottom: 8, marginLeft: 6, fontWeight: "600" },
  pill: {
    height: 46,
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#2849D8",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  pillInput: { color: "#fff", 
    fontSize: 14,
     padding: 0, 
     margin: 0 },

  /* Backdrop + sheet */
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },

  actionSheet: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 18,
    zIndex: 20,
  },
  sheetInner: {
    backgroundColor: "#071028",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#2849D8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 16,
  },
  sheetHandle: { width: 46, height: 4, borderRadius: 2, backgroundColor: "#0C3A5F", alignSelf: "center", marginBottom: 8 },

  actionRow: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF3B3029",
    borderWidth: 1,
    borderColor: "#071739",
  },
  actionLeft: { flexDirection: "row", alignItems: "center" },
  actionIconWrap: {
    width: 40,
    height: 40,
  
    backgroundColor: "",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
 
  },
  actionLabel: { color: "#FF3B30", fontSize: 14, fontWeight: "600" },
});
