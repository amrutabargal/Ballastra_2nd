// src/screens/FilterUser.js
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SAMPLE_USERS = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  username: `!7SUII_Notashish${15 + i}`,
  nickname: "Sussichlan",
  time: "Last Wednesday at 3:50 AM",
  avatarColor: i % 2 === 0 ? "#FFB6C7" : "#8EEBD8",
  details: [
    "Joined nexus",
    "Given role Moderator",
    "Removed nickname 'Sussichlan'",
  ],
}));

export default function FilterUser({ navigation }) {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [allUsers, setAllUsers] = useState(true); // top toggle
  const rotateMap = useRef({}).current;

  const toggleExpand = (id) => {
    if (!rotateMap[id]) rotateMap[id] = new Animated.Value(0);
    const toVal = expandedId === id ? 0 : 1;
    Animated.timing(rotateMap[id], {
      toValue: toVal,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = SAMPLE_USERS.filter(
    (u) =>
      (u.username + " " + u.nickname).toLowerCase().includes(query.toLowerCase()) &&
      (allUsers ? true : true) // placeholder — if you want to hide some users when allUsers=false, add logic
  );

  const renderUser = ({ item }) => {
    const isExpanded = expandedId === item.id;
    if (!rotateMap[item.id]) rotateMap[item.id] = new Animated.Value(isExpanded ? 1 : 0);
    const rotate = rotateMap[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    return (
      <View style={styles.cardWrap}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => toggleExpand(item.id)}
          style={[styles.card, isExpanded && styles.cardExpanded]}
        >
          <View style={styles.left}>
            <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
              <Text style={styles.avatarInitial}>{item.nickname?.[0] || "U"}</Text>
            </View>

            <View style={styles.titleCol}>
              <View style={styles.rowTop}>
                <Text style={styles.usernameText}>{item.username}</Text>
                <View style={styles.dot} />
                <Text style={styles.nickText}>{item.nickname}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>

          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons name="chevron-down" size={18} color="#CFE0FF" />
          </Animated.View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandArea}>
            <View style={styles.connectorArea}>
              <View style={styles.connectorLine} />
              <View style={styles.connectorBubbleTop} />
            </View>

            <View style={styles.expandList}>
              {item.details.map((d, i) => (
                <View key={i} style={styles.expandRow}>
                  <View style={styles.stepNumWrap}>
                    <Text style={styles.stepNum}>{i + 1}.</Text>
                  </View>
                  <View style={styles.expandTextWrap}>
                    <Text style={styles.expandText}>{d}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack?.()} style={styles.headerIcon}>
            <Ionicons name="close" size={20} color="#CFE0FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter User</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* search */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="rgba(207,224,255,0.5)" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Members"
              placeholderTextColor="rgba(207,224,255,0.32)"
              value={query}
              onChangeText={setQuery}
            />
          </View>
        </View>

        {/* All Users pill with toggle */}
        <View style={styles.pillRow}>
          <View style={styles.pillLeft}>
            <Text style={styles.pillText}>All Users</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setAllUsers((s) => !s)}
            style={styles.toggleTouchable}
          >
            <View style={[styles.toggleTrack, allUsers ? styles.toggleOn : styles.toggleOff]}>
              <Animated.View
                style={[
                  styles.toggleKnob,
                  { transform: [{ translateX: allUsers ? 22 : 2 }] }, // simple position switch
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* users list */}
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={renderUser}
          contentContainerStyle={{ paddingVertical: 12, paddingBottom: 70 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050B18" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: Platform.OS === "android" ? 12 : 8 },

  header: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: "#E6EEFF", fontSize: 16, fontWeight: "700" },

  searchRow: { marginTop: 6, marginBottom: 10, flexDirection: "row", alignItems: "center" },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#0B1730",
    borderWidth: 1,
    borderColor: "#3154BA",
    // ⭐ Shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,

  // ⭐ Shadow for Android
  elevation: 8,
  },
  searchInput: { flex: 1, color: "#CFE0FF", fontSize: 14 },

  pillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0B1730",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#3154BA",
    marginBottom: 12,
    // ⭐ Shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,

  // ⭐ Shadow for Android
  elevation: 8,
  },
  pillLeft: { flexDirection: "row", alignItems: "center" },
  pillText: { color: "#E6EEFF", fontSize: 14, fontWeight: "700" },

  toggleTouchable: { padding: 4 },

toggleTrack: {
  width: 52,
  height: 28,
  borderRadius: 20,
  padding: 2,
  justifyContent: "center",
    backgroundColor: "#0B1730",
  borderWidth: 1,
    borderColor: "#3154BA",
},

toggleOn: {
  backgroundColor: "#4479FF",
    borderColor: "#3154BA",
},

toggleOff: {
    backgroundColor: "#0B1730",
  borderColor: "rgba(255,255,255,0.15)",
},

toggleKnob: {
  width: 24,
  height: 24,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 4,
},


  /* card list */
  cardWrap: { marginTop: 12 },
  card: {
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#3457B1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#001428",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
        borderColor: "#3154BA",

  },
  cardExpanded: {
    backgroundColor: "#2B4EB5",
  },

  left: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 44, height: 44, borderRadius: 10, marginRight: 12, alignItems: "center", justifyContent: "center" },
  avatarInitial: { fontWeight: "700", color: "#071025", fontSize: 18 },
  titleCol: { justifyContent: "center" },
  rowTop: { flexDirection: "row", alignItems: "center" },
  usernameText: { color: "#E6EEFF", fontWeight: "700", fontSize: 13 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.24)", marginHorizontal: 8 },
  nickText: { color: "rgba(255,255,255,0.9)", fontSize: 13 },
  timeText: { color: "rgba(255,255,255,0.46)", fontSize: 11, marginTop: 2 },

  expandArea: { marginTop: 10, marginLeft: 10, marginRight: 6, flexDirection: "row", alignItems: "flex-start" },
  connectorArea: { width: 28, alignItems: "center" },
  connectorLine: { width: 2, flex: 1, backgroundColor: "rgba(255,255,255,0.08)", marginTop: 4, marginBottom: 4, borderRadius: 1 },
  connectorBubbleTop: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.16)", marginBottom: 8 },
  expandList: { flex: 1, borderRadius: 12, padding: 10, backgroundColor: "rgba(7,18,36,0.5)", borderWidth: 1, borderColor: "rgba(58,88,160,0.12)" },
  expandRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  stepNumWrap: { width: 28, alignItems: "flex-start", marginRight: 6 },
  stepNum: { color: "rgba(207,224,255,0.7)", fontWeight: "700" },
  expandTextWrap: { flex: 1 },
  expandText: { color: "rgba(207,224,255,0.9)", fontSize: 13 },
});
