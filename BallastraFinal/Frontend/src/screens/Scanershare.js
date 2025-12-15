import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CONTACTS = [
  { id: "1", name: "!7SUll_Notashish15", image: require("../../assets/user2.png") },
  { id: "2", name: "Lofi#8098", image: require("../../assets/user2.png") },
  {
    id: "3",
    name: "Max gamer58588, Faysal_gaming143\nDevil Gaming",
    image: require("../../assets/user2.png"),
  },
  { id: "4", name: "Gaming Piro Yug", image: require("../../assets/user2.png") },
  { id: "5", name: "SHERNI", image: require("../../assets/user2.png") },
];

export default function InviteFriendScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem item={item} />}
        ListHeaderComponent={<HeaderContent />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ---------------- HEADER CONTENT ---------------- */

const HeaderContent = () => (
  <>
    <Text style={styles.title}>Invite a friend</Text>

    {/* Share Icons */}
    <View style={styles.iconRow}>
      <ShareIcon name="logo-whatsapp" bg="#22c55e" />
      <ShareIcon name="link-outline" bg="#020c2b" />
      <ShareIcon name="chatbubble" bg="#22c55e" />
      <ShareIcon name="logo-messenger" bg="#2563eb" />
      <ShareIcon name="logo-facebook" bg="#3b82f6" />
      <ShareIcon name="mail" bg="#2563eb" />
    </View>

    {/* Cards */}
    <View style={styles.cardRow}>
      {/* QR Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Invite by QR Code</Text>
        <Image source={require("../../assets/qr.png")} style={styles.qr} />
        <Text style={styles.cardSub}>
          Scan the QR code to join Sushi’s clan
        </Text>
      </View>

      {/* Orbit Card */}
      <View style={styles.card}>
        <View style={styles.orbitContainer}>
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.top]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.left]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.right]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.bottomLeft]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.bottomRight]} />

          <View style={styles.centerCircle}>
            <Ionicons name="paper-plane" size={26} color="#fff" />
          </View>
        </View>

        <TouchableOpacity style={styles.orbitBtn}>
          <Text style={styles.orbitBtnText}>Send 25 Orbit</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Search */}
    <View style={styles.searchBox}>
      <Ionicons name="search" size={18} color="#9ca3af" />
      <TextInput
        placeholder="Search contacts..."
        placeholderTextColor="#9ca3af"
        style={styles.searchInput}
      />
    </View>
  </>
);

/* ---------------- COMPONENTS ---------------- */

const ShareIcon = ({ name, bg }) => (
  <TouchableOpacity style={[styles.shareIcon, { backgroundColor: bg }]}>
    <Ionicons name={name} size={22} color="#fff" />
  </TouchableOpacity>
);

const ContactItem = ({ item }) => (
  <View style={styles.contactRow}>
    <View style={styles.contactLeft}>
      <Image source={item.image} style={styles.avatar} />
      <Text style={styles.contactName}>{item.name}</Text>
    </View>

    <TouchableOpacity style={styles.inviteBtn}>
      <Ionicons name="person-add" size={18} color="#fff" />
    </TouchableOpacity>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  /* ✅ ONLY THIS PART FIXED */
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,   // 👈 image jaisa edge gap
    marginBottom: 20,
  },

  shareIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#020c2b",
    borderRadius: 22,
    padding: 14,
    alignItems: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 10,
  },

  qr: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },

  cardSub: {
    color: "#9ca3af",
    fontSize: 12,
    textAlign: "center",
  },

  orbitContainer: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  orbitAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    position: "absolute",
  },

  top: { top: 0 },
  left: { left: 0 },
  right: { right: 0 },
  bottomLeft: { bottom: 8, left: 20 },
  bottomRight: { bottom: 8, right: 20 },

  centerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#365acb",
    alignItems: "center",
    justifyContent: "center",
  },

  orbitBtn: {
    backgroundColor: "#365acb",
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 16,
  },

  orbitBtnText: {
    color: "#fff",
    fontSize: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020c2b",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  contactName: {
    color: "#fff",
    fontSize: 15,
  },

  inviteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    justifyContent: "center",
  },
});import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CONTACTS = [
  { id: "1", name: "!7SUll_Notashish15", image: require("../../assets/user2.png") },
  { id: "2", name: "Lofi#8098", image: require("../../assets/user2.png") },
  {
    id: "3",
    name: "Max gamer58588, Faysal_gaming143\nDevil Gaming",
    image: require("../../assets/user2.png"),
  },
  { id: "4", name: "Gaming Piro Yug", image: require("../../assets/user2.png") },
  { id: "5", name: "SHERNI", image: require("../../assets/user2.png") },
];

export default function InviteFriendScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem item={item} />}
        ListHeaderComponent={<HeaderContent />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ---------------- HEADER CONTENT ---------------- */

const HeaderContent = () => (
  <>
    <Text style={styles.title}>Invite a friend</Text>

    {/* Share Icons */}
    <View style={styles.iconRow}>
      <ShareIcon name="logo-whatsapp" bg="#22c55e" />
      <ShareIcon name="link-outline" bg="#020c2b" />
      <ShareIcon name="chatbubble" bg="#22c55e" />
      <ShareIcon name="logo-messenger" bg="#2563eb" />
      <ShareIcon name="logo-facebook" bg="#3b82f6" />
      <ShareIcon name="mail" bg="#2563eb" />
    </View>

    {/* Cards */}
    <View style={styles.cardRow}>
      {/* QR Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Invite by QR Code</Text>
        <Image source={require("../../assets/qr.png")} style={styles.qr} />
        <Text style={styles.cardSub}>
          Scan the QR code to join Sushi’s clan
        </Text>
      </View>

      {/* Orbit Card */}
      <View style={styles.card}>
        <View style={styles.orbitContainer}>
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.top]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.left]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.right]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.bottomLeft]} />
          <Image source={require("../../assets/user1.png")} style={[styles.orbitAvatar, styles.bottomRight]} />

          <View style={styles.centerCircle}>
            <Ionicons name="paper-plane" size={26} color="#fff" />
          </View>
        </View>

        <TouchableOpacity style={styles.orbitBtn}>
          <Text style={styles.orbitBtnText}>Send 25 Orbit</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Search */}
    <View style={styles.searchBox}>
      <Ionicons name="search" size={18} color="#9ca3af" />
      <TextInput
        placeholder="Search contacts..."
        placeholderTextColor="#9ca3af"
        style={styles.searchInput}
      />
    </View>
  </>
);

/* ---------------- COMPONENTS ---------------- */

const ShareIcon = ({ name, bg }) => (
  <TouchableOpacity style={[styles.shareIcon, { backgroundColor: bg }]}>
    <Ionicons name={name} size={22} color="#fff" />
  </TouchableOpacity>
);

const ContactItem = ({ item }) => (
  <View style={styles.contactRow}>
    <View style={styles.contactLeft}>
      <Image source={item.image} style={styles.avatar} />
      <Text style={styles.contactName}>{item.name}</Text>
    </View>

    <TouchableOpacity style={styles.inviteBtn}>
      <Ionicons name="person-add" size={18} color="#fff" />
    </TouchableOpacity>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  /* ✅ ONLY THIS PART FIXED */
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,   // 👈 image jaisa edge gap
    marginBottom: 20,
  },

  shareIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#020c2b",
    borderRadius: 22,
    padding: 14,
    alignItems: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 10,
  },

  qr: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },

  cardSub: {
    color: "#9ca3af",
    fontSize: 12,
    textAlign: "center",
  },

  orbitContainer: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  orbitAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    position: "absolute",
  },

  top: { top: 0 },
  left: { left: 0 },
  right: { right: 0 },
  bottomLeft: { bottom: 8, left: 20 },
  bottomRight: { bottom: 8, right: 20 },

  centerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#365acb",
    alignItems: "center",
    justifyContent: "center",
  },

  orbitBtn: {
    backgroundColor: "#365acb",
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 16,
  },

  orbitBtnText: {
    color: "#fff",
    fontSize: 12,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020c2b",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  contactName: {
    color: "#fff",
    fontSize: 15,
  },

  inviteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    justifyContent: "center",
  },
});