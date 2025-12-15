import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

/* ----------- DUMMY ACTIVITY DATA ----------- */
const ACTIVITIES = [
  {
    id: "1",
    user: "!7SUII_Notashish15",
    target: "Sushisclan",
    time: "2hr ago",
    icon: "layers-outline",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    expanded: false,
  },
  {
    id: "2",
    user: "!7SUII_Notashish15",
    target: "Sushisclan",
    time: "3hr ago",
    icon: "send-outline",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    user: "!7SUII_Notashish15",
    target: "Sushisclan",
    time: "4hr ago",
    icon: "layers-outline",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function ActivityHistoryScreen({ navigation }) {
  const [expandedId, setExpandedId] = useState("1");

  const renderItem = ({ item }) => {
    const expanded = expandedId === item.id;

    return (
      <View>
        {/* MAIN ROW */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.row}
          onPress={() =>
            setExpandedId(expanded ? null : item.id)
          }
        >
          <View style={styles.left}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={item.icon}
                size={14}
                color="#fff"
              />
            </View>

            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.rowText}>
                {item.user}{" "}
                <Text style={styles.redDot}>⦿</Text>{" "}
                {item.target}
              </Text>
              <Text style={styles.time}>
                {item.time}
              </Text>
            </View>
          </View>

          {expanded && (
            <Ionicons
              name="chevron-up"
              size={16}
              color="#9FB0FF"
            />
          )}
        </TouchableOpacity>

        {/* EXPANDED DETAIL */}
        {expanded && (
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>
              1. Removed their nickname of Sushisclan
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#050B1A", "#0A1330", "#050B1A"]}
        style={styles.container}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons
              name="chevron-back"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Activity History
          </Text>
          <View style={{ width: 22 }} />
        </View>

        {/* SEARCH */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons
              name="search"
              size={16}
              color="#9FB0FF"
            />
            <TextInput
              placeholder="Search Members"
              placeholderTextColor="#9FB0FF"
              style={styles.searchInput}
            />
          </View>
          <Text style={styles.filterText}>
            Filter
          </Text>
        </View>

        {/* FILTER CHIPS */}
        <View style={styles.chipsRow}>
          {["Update Nexus", "Update Channel", "Ban Member"].map(
            (chip, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>
                  {chip}
                </Text>
                <Ionicons
                  name="close"
                  size={12}
                  color="#9FB0FF"
                />
              </View>
            )
          )}
        </View>

        {/* LIST */}
        <FlatList
          data={ACTIVITIES}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050B1A" },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C1638",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "#1E2A5A",
  },

  searchInput: {
    marginLeft: 8,
    color: "#fff",
    flex: 1,
    fontSize: 14,
  },

  filterText: {
    marginLeft: 10,
    color: "#7C5CFF",
    fontSize: 13,
  },

  chipsRow: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 8,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C1638",
    borderWidth: 1,
    borderColor: "#2A3C7A",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },

  chipText: {
    color: "#E4EBFF",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#3C5BFF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },

  rowText: {
    color: "#E4EBFF",
    fontSize: 13,
  },

  redDot: {
    color: "#FF4D4D",
  },

  time: {
    color: "#7E8DCB",
    fontSize: 11,
    marginTop: 2,
  },

  detailBox: {
    marginLeft: 60,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2A3C7A",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#0B1730",
  },

  detailText: {
    color: "#E4EBFF",
    fontSize: 12,
  },
});
