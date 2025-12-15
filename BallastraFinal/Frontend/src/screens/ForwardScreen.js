
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CONTACTS = [
  { id: "1", name: "! 7 SUII _Notashish15" },
  { id: "2", name: "Lofi#8098" },
  { id: "3", name: "Max gamer58858, Faysal_gaming143 Devil Gaming" },
  { id: "4", name: "Gaming Piro Yug" },
  { id: "5", name: "SHERNI" },
  { id: "6", name: "! 7 SUII _Notashish15" },
  { id: "7", name: "Devil Gaming" },
];

const AVATAR_COLORS = [
  "#fb7185",
  "#22c55e",
  "#6366f1",
  "#f97316",
  "#06b6d4",
  "#a855f7",
  "#facc15",
];

export default function ForwardScreen({ navigation, route }) {
  const message = route.params?.message;
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    console.log("FORWARD:", message?.text, "TO:", selected);
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => {
    const sel = selected.includes(item.id);
    const initial = item.name[0]?.toUpperCase() || "?";
    const color = AVATAR_COLORS[index % AVATAR_COLORS.length];

    return (
      <View style={styles.row}>
        {/* avatar circle */}
        <View style={[styles.avatar, { backgroundColor: color }]}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        {/* checkbox with border and gradient fill */}
        <TouchableOpacity onPress={() => toggle(item.id)}>
          {sel ? (
            <LinearGradient
              colors={["#6366f1", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.checkboxOuter}
            >
              <View style={styles.checkboxInner} />
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.checkboxOuter,
                { borderWidth: 1.5, borderColor: "#6B7280", backgroundColor: "transparent" },
              ]}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {/* blurred dark overlay */}
      <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />

      {/* floating card */}
      <SafeAreaView style={styles.sheet} edges={["bottom"]}>
        {/* handle bar */}
        <View style={styles.handle} />

        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="link-outline" size={20} color="#E5E7EB" />
          </TouchableOpacity>

          <Text style={styles.title}>Forward</Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={20} color="#E5E7EB" />
          </TouchableOpacity>
        </View>

        {/* search – gradient pill */}
        <LinearGradient
          colors={["#1d2a3f", "#111827"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.searchOuter}
        >
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Orbit"
              placeholderTextColor="#6B7280"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </LinearGradient>

        {/* contacts */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        />

        {/* bottom Send button */}
        <TouchableOpacity style={styles.sendWrapper} onPress={handleSend}>
          <LinearGradient
            colors={["#0C142A", "#0C142A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sendBtn}
          >
            <Ionicons name="send" size={18} color="#FFFFFF" />
            <Text style={styles.sendText}>Send</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.55)",
  },
  sheet: {
    marginHorizontal: 12,
    marginVertical: 32,
    borderRadius: 24,
    backgroundColor: "#0C142A",
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingBottom: 24,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
  },
  handle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#0C142A",
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: { color: "#E5E7EB", fontSize: 18, fontWeight: "600" },

  searchOuter: {
    borderRadius: 999,
    padding: 1.5,
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "#0C142A",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: "#E5E7EB",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: { color: "#F9FAFB", fontWeight: "700", fontSize: 18 },
  name: { flex: 1, color: "#E5E7EB", fontSize: 14 },

  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 7,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#0C142A",
  },

  sendWrapper: {
    position: "absolute",
    bottom: 18,
    alignSelf: "center",
  },
  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 999,
  },
  sendText: {
    color: "#F9FAFB",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
});

