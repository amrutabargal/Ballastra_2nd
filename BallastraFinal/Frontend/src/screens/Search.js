import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HISTORY = [
  { id: "1", tag: "media", time: "23min ago" },
  { id: "2", tag: "media", time: "23min ago" },
  { id: "3", tag: "media", time: "23min ago" },
];

const MEMBERS = new Array(7).fill({
  name: "!7SUll_Notashish15",
  image: require("../../assets/user2.png"),
});

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={MEMBERS}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <MemberItem item={item} />}
        ListHeaderComponent={<HeaderAndSearch />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ---------------- HEADER + SEARCH + HISTORY ---------------- */

const HeaderAndSearch = () => (
  <>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity>
        <Ionicons name="chevron-back" size={26} color="#fff" />
      </TouchableOpacity>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#9ca3af" />
        <TextInput
          placeholder="Search in SUSHI'S CLAN"
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />
      </View>
    </View>

    {/* Search History */}
    <SectionHeader title="Search History" action="Clear all" />
    {HISTORY.map((item) => (
      <HistoryItem key={item.id} item={item} />
    ))}

    {/* Suggested */}
    <SectionHeader title="Suggested" />
    {HISTORY.map((item) => (
      <SuggestedItem key={item.id + "s"} item={item} />
    ))}

    {/* Members Title */}
    <SectionHeader title="Members" action="Clear all" />
  </>
);

/* ---------------- COMPONENTS ---------------- */

const SectionHeader = ({ title, action }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action && <Text style={styles.clear}>{action}</Text>}
  </View>
);

const HistoryItem = ({ item }) => (
  <View style={styles.row}>
    <Text style={styles.hash}>#</Text>
    <Text style={styles.rowText}>{item.tag}</Text>
    <Text style={styles.time}>{item.time}</Text>
    <Ionicons name="close" size={16} color="#9ca3af" />
  </View>
);

const SuggestedItem = ({ item }) => (
  <View style={styles.row}>
    <Text style={styles.hash}>#</Text>
    <Text style={styles.rowText}>{item.tag}</Text>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

const MemberItem = ({ item }) => (
  <TouchableOpacity style={styles.memberCard}>
    <Image source={item.image} style={styles.avatar} />
    <Text style={styles.memberName}>{item.name}</Text>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    marginTop: 8,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020c2b",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },

  sectionTitle: {
    color: "#9ca3af",
    fontSize: 14,
  },

  clear: {
    color: "#3b82f6",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  hash: {
    color: "#3b82f6",
    fontWeight: "700",
    fontSize: 16,
  },

  rowText: {
    color: "#fff",
    flex: 1,
    fontSize: 15,
  },

  time: {
    color: "#9ca3af",
    fontSize: 12,
    marginRight: 6,
  },

  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020c2b",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 12,
  },

  memberName: {
    color: "#fff",
    flex: 1,
    fontSize: 15,
  },
});


