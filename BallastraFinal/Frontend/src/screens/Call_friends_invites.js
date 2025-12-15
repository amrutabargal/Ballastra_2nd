

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

/* ----------- DUMMY USERS (ONLINE PROFILE IMAGES) ----------- */
const CONTACTS = [
  { id: "1", name: "! 7 SUII _Notashish15", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "2", name: "Lofi#8098", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { id: "3", name: "Max gamer58858, Faysal_gaming143 Devil Gaming", avatar: "https://randomuser.me/api/portraits/men/65.jpg" },
  { id: "4", name: "Gaming Piro Yug", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
  { id: "5", name: "SHERNI", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: "6", name: "! 7 SUII _Notashish15", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
  { id: "7", name: "! 7 SUII _Notashish15", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: "8", name: "Lofi#8098", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
];

export default function NewGroupModal({ navigation }) {
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [callPopupVisible, setCallPopupVisible] = useState(false);

  /* ----------- TOGGLE USER SELECTION ----------- */
  const toggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* ----------- FILTER SEARCH ----------- */
  const filteredContacts = useMemo(() => {
    return CONTACTS.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* ----------- SELECTED USERS ----------- */
  const selectedUsers = CONTACTS.filter((u) => selected[u.id]);
  const selectedCount = selectedUsers.length;

  /* ----------- SEND BUTTON ACTION ----------- */
  const handleSend = () => {
    if (!selectedUsers.length) {
      Alert.alert("Select users", "Please select at least one member");
      return;
    }
    setCallPopupVisible(true);
  };

  /* ----------- RENDER ITEM ----------- */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.8}
      onPress={() => toggleSelect(item.id)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>

      <LinearGradient
        colors={["#7C5CFF", "#3BE7FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.checkboxBorder}
      >
        <View style={styles.checkboxInner}>
          {selected[item.id] && (
            <Ionicons name="checkmark" size={14} color="#3BE7FF" />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#050B1A", "#0A1330", "#050B1A"]}
        style={styles.overlay}
      >
        <View style={styles.container}>
          {/* Drag Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>New Group</Text>

            <View style={styles.countBubble}>
              <Text style={styles.countText}>{selectedCount}</Text>
            </View>

            <TouchableOpacity
              style={styles.close}
              onPress={() =>
                navigation ? navigation.goBack() : Alert.alert("Close pressed")
              }
            >
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color="#7A8BBE" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#7A8BBE"
              style={styles.searchInput}
            />
          </View>

          {/* Users List */}
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 110 }}
          />

          {/* Send Button */}
          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleSend}>
              <LinearGradient
                colors={["#3154BA", "#3154BA"]}
                style={styles.sendBtn}
              >
                <Ionicons name="paper-plane" size={18} color="#fff" />
                <Text style={styles.sendText}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== CALL POPUP ===== */}
        {callPopupVisible && (
          <View style={styles.popupOverlay}>
            <View style={styles.popupContainer}>
              <Text style={styles.popupTitle}>You're already in a call.</Text>

              <View style={styles.popupAvatarRow}>
                {selectedUsers.slice(0, 6).map((u, i) => (
                  <Image
                    key={u.id}
                    source={{ uri: u.avatar }}
                    style={[
                      styles.popupAvatar,
                      { marginLeft: i === 0 ? 0 : -12 },
                    ]}
                  />
                ))}
              </View>

              <Text numberOfLines={1} style={styles.popupNames}>
                {selectedUsers.map((u) => u.name).join(", ")}
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setCallPopupVisible(false)}
              >
                <LinearGradient
                  colors={["#3255BA", "#3255BA"]}
                  style={styles.popupPrimaryBtn}
                >
                  <Ionicons name="call" size={16} color="#fff" />
                  <Text style={styles.popupPrimaryText}>Okay</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setCallPopupVisible(false)}
                style={styles.popupCancelBtn}
              >
                <Text style={styles.popupCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050B1A" },

  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: width * 0.92,
    height: height * 0.86,
    backgroundColor: "#050B1A",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#1C2A5A",
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5E6B9A",
    alignSelf: "center",
    marginBottom: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom:20,
    marginTop:10,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  countBubble: {
    marginLeft: 8,
    backgroundColor: "#1E2A5A",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  countText: { color: "#8AA0FF", fontSize: 12 },

  close: { marginLeft: "auto" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C1638",
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 42,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1E2A5A",
  },

  searchInput: {
    marginLeft: 8,
    color: "#fff",
    flex: 1,
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  name: {
    flex: 1,
    color: "#E4EBFF",
    fontSize: 14,
  },

  checkboxBorder: {
    width: 22,
    height: 22,
    borderRadius: 6,
    padding: 1,
  },

  checkboxInner: {
    flex: 1,
    backgroundColor: "#050B1A",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    position: "absolute",
    bottom: 22,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 34,
    height: 44,
    borderRadius: 15,
  },

  sendText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "600",
  },

  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  popupContainer: {
    width: width * 0.78,
    backgroundColor: "#050B1A",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1C2A5A",
    alignItems: "center",
  },

  popupTitle: { color: "#fff", fontSize: 14, marginBottom: 14, fontWeight: "500" },
  popupAvatarRow: { flexDirection: "row", marginBottom: 10 },
  popupAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#050B1A",
  },
  popupNames: {
    color: "#B8C3FF",
    fontSize: 12,
    marginBottom: 18,
    textAlign: "center",
  },

  popupPrimaryBtn: {
    width: "140%",
    height: 44,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  popupPrimaryText: {
     color: "#fff",
     fontSize: 14,
    //   marginLeft: 6, 
      fontWeight: "600" ,
      alignItems: "center", justifyContent: "center",
      alignSelf: "center",
      marginRight:110,
    },

  popupCancelBtn: {
    marginTop: 12,
    width: "100%",
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2A3C7A",
    alignItems: "center",
    justifyContent: "center",
  },
  popupCancelText: { color: "#fff", fontSize: 14 },
});
