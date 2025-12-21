import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ICONS = [
  {
    id: "whatsapp",
    uri: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    bg: "#22c55e",
  },
  {
    id: "link",
    uri: "https://cdn-icons-png.flaticon.com/512/455/455691.png",
    bg: "#0B1730",
  },
  {
    id: "message",
    uri: "https://cdn-icons-png.flaticon.com/512/2462/2462719.png",
    bg: "#22c55e",
  },
  {
    id: "messenger",
    uri: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg",
    bg: "#ffffff",
  },
  {
    id: "facebook",
    uri: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg",
    bg: "#1877F2",
  },
  {
    id: "mail",
    uri: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
    bg: "#0B1730",
  },
];

const CONTACTS = [
  {
    id: "1",
    name: "! 7 SUII _Notashish15",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "2",
    name: "Lofi#8098",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    name: "Max gamer58588, Faysal_gaming143 Devil Gaming",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "4",
    name: "Gaming Piro Yug",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    id: "5",
    name: "SHERNI",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "6",
    name: "SHERNI025",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

export default function InvitePeopleScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>

      <View style={styles.sentBtn}>
        <Text style={styles.sentText}>Sent</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1228" />

      <View style={styles.card}>
        {/* ICON ROW */}
        <View style={styles.iconRow}>
          {ICONS.map((icon) => (
            <View
              key={icon.id}
              style={[styles.iconWrap, { backgroundColor: icon.bg }]}
            >
              <Image
                source={{ uri: icon.uri }}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          ))}
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search contacts..."
            placeholderTextColor="#64748b"
            style={styles.searchInput}
          />
        </View>

        {/* CONTACT LIST */}
        <FlatList
          data={CONTACTS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A1228",
  },

  card: {
    flex: 1,
    margin: 14,
    borderRadius: 26,
    backgroundColor: "#0C142A",
    padding: 16,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 22,
    height: 22,
  },

  searchBox: {
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 999,
    paddingHorizontal: 14,
    height: 42,
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#020617",
  },

  searchInput: {
    color: "#e5e7eb",
    fontSize: 13,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  name: {
    flex: 1,
    color: "#e5e7eb",
    fontSize: 14,
  },

  sentBtn: {
    borderWidth: 1,
    borderColor: "#1f3a8a",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },

  sentText: {
    color: "#93c5fd",
    fontSize: 12,
  },
});
