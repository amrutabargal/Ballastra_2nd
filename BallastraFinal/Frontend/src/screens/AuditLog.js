
import React, { useState, useRef, useEffect } from "react";
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
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// sample data
const SAMPLE = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  username: "!7SUII_Notashish15",
  nickname: "Sussichlan",
  time: "Last Wednesday at 3:50 AM",
  avatarColor: i % 2 === 0 ? "#FFB6C7" : "#8EEBD8",
  actions: [
    "Removed their nickname of Sussichlan",
    "Removed their nickname of Sussichlan",
    "Removed their nickname of Sussichlan",
  ],
}));

export default function AuditLog({ navigation }) {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const rotateMap = useRef({}).current;

  const [filterVisible, setFilterVisible] = useState(false);
  const modalAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(modalAnim, {
      toValue: filterVisible ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [filterVisible]);

  const toggleExpand = (id) => {
    if (!rotateMap[id]) rotateMap[id] = new Animated.Value(0);
    Animated.timing(rotateMap[id], {
      toValue: expandedId === id ? 0 : 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = SAMPLE.filter((item) =>
    `${item.username} ${item.nickname}`.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    if (!rotateMap[item.id]) rotateMap[item.id] = new Animated.Value(isExpanded ? 1 : 0);

    const rotate = rotateMap[item.id].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    return (
      <View style={styles.cardWrap}>
        <TouchableOpacity activeOpacity={0.95} onPress={() => toggleExpand(item.id)} style={styles.card}>
          <View style={styles.left}>
            <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
              <Text style={styles.avatarLetter}>{item.nickname[0]}</Text>
            </View>

            <View>
              <View style={styles.rowCenter}>
                <Text style={styles.username}>{item.username}</Text>
                <View style={styles.dot} />
                <Text style={styles.nickname}>{item.nickname}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>

          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons name="chevron-down" size={18} color="#CFE0FF" />
          </Animated.View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandBox}>
            <View style={styles.timelineCol}>
              <View style={styles.circleDot} />
              <View style={styles.verticalLine} />
            </View>

            <View style={styles.actionBox}>
              {item.actions.map((txt, idx) => (
                <View key={idx} style={styles.actionRow}>
                  <Text style={styles.actionIndex}>{idx + 1}.</Text>
                  <Text style={styles.actionText}>{txt}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const translateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });
  const backdropOpacity = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Audit Log</Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="rgba(207,224,255,0.52)" style={{ marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Members"
            placeholderTextColor="rgba(207,224,255,0.34)"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* FILTER MODAL */}
      <Modal visible={filterVisible} transparent animationType="none">
        <TouchableOpacity activeOpacity={1} onPress={() => setFilterVisible(false)} style={styles.backdropTouch}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableOpacity>

        <Animated.View style={[styles.modalCard, { transform: [{ translateY }] }]}>
          <View style={styles.modalHandle} />

          <TouchableOpacity
            style={styles.modalRow}
            onPress={() => {
              setFilterVisible(false);
              navigation.navigate("FilterUser");
            }}
          >
            <View style={styles.modalLeft}>
              <View style={styles.modalIconBox}>
                <MaterialCommunityIcons name="account-search-outline" size={18} color="#CFE0FF" />
              </View>
              <Text style={styles.modalText}>Filter User</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CFE0FF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalRow}
            onPress={() => {
              setFilterVisible(false);
              navigation.navigate("FilterAction");
            }}
          >
            <View style={styles.modalLeft}>
              <View style={styles.modalIconBox}>
                <Ionicons name="list" size={18} color="#CFE0FF" />
              </View>
              <Text style={styles.modalText}>Filter Action</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CFE0FF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={() => setFilterVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

/* ============================================================= */
/*                         STYLES (cleaned)                      */
/* ============================================================= */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050B18",
    paddingHorizontal: 14,
  },

  /* HEADER */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 20,
    marginBottom: 25,
  },
  headerIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    
    justifyContent: "center",
    alignItems: "center",
  },

  /* SEARCH */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    backgroundColor: "rgba(9,19,38,0.55)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(59,90,160,0.18)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 46,

    // SHADOW
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#E8F0FF",
  },
  filterBtn: {
    marginLeft: 10,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(11,24,45,0.55)",
    borderWidth: 1,
    borderColor: "rgba(59,90,160,0.18)",
  },
  filterText: { color: "#CFE0FF", fontSize: 14 },

  /* CARD */
  cardWrap: {
    marginTop: 12,
  },
  card: {
    backgroundColor: "#3255BA",
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#001428",

    // Shadow
    shadowColor: "#001428",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 5,
  },
  left: { flexDirection: "row", alignItems: "center" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarLetter: {
    fontSize: 18,
    fontWeight: "700",
    color: "#071125",
  },
  username: { fontSize: 13, color: "#F4F6FF", fontWeight: "700" },
  nickname: { fontSize: 13, color: "#fff", opacity: 0.85 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  time: { color: "rgba(250,250,255,0.45)", fontSize: 11, marginTop: 3 },

  /* EXPANDED */
  expandBox: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 6,
  },
  timelineCol: {
    width: 30,
    alignItems: "center",
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 2,
    marginTop: 6,
  },
  circleDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  actionBox: {
    flex: 1,
    backgroundColor: "rgba(9,19,38,0.55)",
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(59,90,160,0.18)",
  },
  actionRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  actionIndex: {
    width: 22,
    color: "rgba(200,215,255,0.9)",
    fontWeight: "700",
  },
  actionText: {
    flex: 1,
    color: "rgba(230,240,255,0.95)",
    fontSize: 13,
  },

  /* MODAL */
  backdropTouch: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "#000",
  },
  // modalCard: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   padding: 20,
  //   borderTopLeftRadius: 18,
  //   borderTopRightRadius: 18,
  //   backgroundColor: "#071224",
  //       borderColor: "#2D57C8",


  //   // shadow
  //   shadowColor: "#3154FF",
  //   shadowOpacity: 0.25,
  //   shadowRadius: 12,
  //   shadowOffset: { width: 0, height: 4 },
  //   elevation: 6,
  // },
  modalCard: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 20,
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
  backgroundColor: "#071224",
  borderColor: "#2D57C8",
  borderWidth: 1,

  // 🔥 Premium shadow (iOS)
  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: -4 },

  // 🔥 Android shadow
  elevation: 18,
},

  modalHandle: {
    width: 38,
    height: 5,
    alignSelf: "center",
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginBottom: 18,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  modalLeft: { flexDirection: "row", alignItems: "center" },
  modalIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(22,38,71,0.65)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  modalText: {
    color: "#CFE0FF",
    fontSize: 15,
  },
  closeBtn: {
    marginTop: 18,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#020821",
    hight:52,
    width:134,
     borderColor: "#2D57C8",
     // shadow
    shadowColor: "#3154FF",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
 closeText: {
  color: "#fff",
  fontSize: 14,
  textAlign: "center",
},

});
