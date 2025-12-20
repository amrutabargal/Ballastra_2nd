
// import React, { useMemo, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ImageBackground,
//   StatusBar,
//   Alert,
// } from "react-native";
// import Icon from "react-native-vector-icons/Feather";

// // 👉 fallback static data (नेट नसेल / API fail झाला तर)
// const COMMUNITIES = [
//   {
//     id: "1",
//     name: "Sushis City",
//     members: 14879,
//     type: "Community",
//     description: "Night grind + neon vibes",
//     description2: "Chill gamers. Cozy lobbies",
//     image:
//       "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: "2",
//     name: "Sushis City",
//     members: 14879,
//     type: "Community",
//     description: "Night grind + neon vibes",
//     description2: "Chill gamers. Cozy lobbies",
//     image:
//       "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: "3",
//     name: "Sushis City",
//     members: 14879,
//     type: "Community",
//     description: "Night grind + neon vibes",
//     description2: "Chill gamers. Cozy lobbies",
//     image:
//       "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: "4",
//     name: "Sushis City",
//     members: 14879,
//     type: "Community",
//     description: "Night grind + neon vibes",
//     description2: "Chill gamers. Cozy lobbies",
//     image:
//       "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
// ];

// export default function HomeScreen({ navigation }) {
//   const [search, setSearch] = useState("");
//   const [joined, setJoined] = useState(new Set());

//   const [communities, setCommunities] = useState(COMMUNITIES);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPublicNexus = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "http://YOUR_BACKEND_URL_HERE/api/public-nexus"
//         );
//         const json = await res.json();

//         if (json.success && Array.isArray(json.data)) {
//           const mapped = json.data.map((item, index) => ({
//             id:
//               (item._id && item._id.toString()) ||
//               (item.id && item.id.toString()) ||
//               String(index),
//             name: item.name || "Untitled",
//             members: item.members || item.membersCount || 0,
//             type: item.type || "Community",
//             description: item.description || "",
//             description2: item.description2 || item.shortDescription || "",
//             image:
//               item.image ||
//               item.imageUrl ||
//               "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
//           }));

//           setCommunities(mapped);
//         } else {
//           Alert.alert("Error", "Could not load public nexus list.");
//         }
//       } catch (err) {
//         Alert.alert("Network Error", "Failed to load public nexus.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPublicNexus();
//   }, []);

//   const filtered = useMemo(() => {
//     if (!search.trim()) return communities;
//     const s = search.toLowerCase();
//     return communities.filter(
//       (c) =>
//         c.name?.toLowerCase().includes(s) ||
//         c.description?.toLowerCase().includes(s)
//     );
//   }, [search, communities]);

//   const renderCard = ({ item }) => {
//     const isJoined = joined.has(item.id);
//     return (
//       <TouchableOpacity
//         style={styles.cardWrapper}
//         activeOpacity={0.8}
//         onPress={() =>
//           navigation?.navigate("ExploreNexusScreen", { communityId: item.id })
//         }
//       >
//         <ImageBackground
//           source={{ uri: item.image }}
//           style={styles.cardContainer}
//           imageStyle={styles.cardImageStyle}
//         >
//           <View style={styles.cardOverlay} />
//           <View style={styles.cardContent}>
//             <View style={styles.cardHeader}>
//               <View style={styles.avatar} />
//               <View style={styles.cardInfo}>
//                 <Text style={styles.cardTitle}>{item.name}</Text>
//                 <Text style={styles.cardSub}>
//                   {Number(item.members || 0).toLocaleString()} Members ·{" "}
//                   {item.type}
//                 </Text>
//               </View>

//               <TouchableOpacity style={styles.peopleBtn} activeOpacity={0.8}>
//                 <Icon
//                   name={isJoined ? "check" : "users"}
//                   size={16}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//             </View>

//             <View>
//               <Text style={styles.cardDesc}>
//                 🎮 {item.description} ✨🎮
//               </Text>
//               <Text style={styles.cardDesc}>
//                 😎 {item.description2} 🎮🔥
//               </Text>
//             </View>
//           </View>
//         </ImageBackground>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.root}>
//       <StatusBar barStyle="light-content" />

//       <View style={styles.mainContainer}>
//         <View style={styles.sidebar}>
//           <TouchableOpacity
//             style={[styles.sideButton, styles.sideButtonActive]}
//           >
//             <Icon name="compass" size={20} color="#fff" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.sideButton}
//             onPress={() => navigation?.navigate("Create_Nexus")}
//           >
//             <Icon name="plus" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.contentArea}>
//           {/* ✅ ONLY CHANGE: Add Blips → v56 */}
//           <TouchableOpacity
//             style={styles.addBlipCard}
//             activeOpacity={0.8}
//             onPress={() => navigation.navigate("CreateBlipsScreen")}
//           >
//             <Icon name="plus" size={32} color="#fff" />
//             <Text style={styles.addBlipText}>Add Blips</Text>
//           </TouchableOpacity>

//           <View style={styles.exploreContainer}>
//             <Text style={styles.exploreTitle}>Explore</Text>

//             <View style={styles.searchRow}>
//               <View style={styles.searchBox}>
//                 <Icon name="search" size={16} color="#64748b" />
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search"
//                   placeholderTextColor="#64748b"
//                   value={search}
//                   onChangeText={setSearch}
//                 />
//               </View>
//               <TouchableOpacity style={styles.filterBtn}>
//                 <Text style={styles.filterText}>Filter</Text>
//               </TouchableOpacity>
//             </View>

//             {loading ? (
//               <Text style={{ color: "#fff", fontSize: 12 }}>Loading...</Text>
//             ) : (
//               <FlatList
//                 data={filtered}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderCard}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.listContent}
//               />
//             )}
//           </View>
//         </View>
//       </View>

//       <View style={styles.bottomTabBar}>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="home" size={22} color="#3b82f6" />
//           <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="message-circle" size={22} color="#64748b" />
//           <Text style={styles.tabLabel}>Chat</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="bell" size={22} color="#64748b" />
//           <Text style={styles.tabLabel}>Notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="user" size={22} color="#64748b" />
//           <Text style={styles.tabLabel}>You</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: "#0A0E1A" },
//   mainContainer: {
//     flex: 1,
//     flexDirection: "row",
//     paddingTop: 50,
//     paddingHorizontal: 12,
//   },
//   sidebar: { width: 50, alignItems: "center", marginRight: 8 },
//   sideButton: {
//     padding: 9,
//     borderRadius: 10,
//     backgroundColor: "#3255BA",
//     marginBottom: 10,
//   },
//   sideButtonActive: {},
//   contentArea: { flex: 1 },
//   addBlipCard: {
//     width: 70,
//     height: 102,
//     borderRadius: 15,
//     backgroundColor: "#1a2332",
//     borderWidth: 4,
//     borderColor: "#3154BA4D",
//     borderStyle: "dashed",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   addBlipText: { color: "#fff", fontSize: 8, marginTop: 12 },
//   exploreContainer: {
//     flex: 1,
//     backgroundColor: "#0C142A",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 21,
//   },
//   exploreTitle: { color: "#fff", fontSize: 12, marginBottom: 17 },
//   searchRow: { flexDirection: "row", marginBottom: 15 },
//   searchBox: {
//     flex: 1,
//     height: 40,
//     borderRadius: 100,
//     backgroundColor: "#3154BA4D",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 14,
//   },
//   searchInput: { flex: 1, marginLeft: 18, color: "#fff" },
//   filterBtn: { marginLeft: 10, justifyContent: "center" },
//   filterText: { color: "#3255BA", fontSize: 10 },
//   listContent: { paddingBottom: 20 },
//   cardWrapper: { marginBottom: 12 },
//   cardContainer: { height: 110, borderRadius: 16 },
//   cardImageStyle: { borderRadius: 16 },
//   cardOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(15,23,42,0.6)",
//   },
//   cardContent: { padding: 12 },
//   cardHeader: { flexDirection: "row", marginBottom: 8 },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#ec4899",
//   },
//   cardInfo: { marginLeft: 10, flex: 1 },
//   cardTitle: { color: "#fff", fontSize: 12 },
//   cardSub: { color: "#BDBDBD", fontSize: 8 },
//   peopleBtn: {
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: "#3255BA",
//   },
//   cardDesc: { color: "#fff", fontSize: 8, lineHeight: 16 },
//   bottomTabBar: {
//     flexDirection: "row",
//     height: 70,
//     backgroundColor: "#0f1729",
//     borderTopWidth: 1,
//     borderTopColor: "#1e293b",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   tabItem: { alignItems: "center" },
//   tabLabel: { color: "#64748b", fontSize: 11 },
//   tabLabelActive: { color: "#3b82f6" },
// });
import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

// 👉 fallback static data
const COMMUNITIES = [
  {
    id: "1",
    name: "Sushis City",
    members: 14879,
    type: "Community",
    description: "Night grind + neon vibes",
    description2: "Chill gamers. Cozy lobbies",
    image:
      "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Sushis City",
    members: 14879,
    type: "Community",
    description: "Night grind + neon vibes",
    description2: "Chill gamers. Cozy lobbies",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Sushis City",
    members: 14879,
    type: "Community",
    description: "Night grind + neon vibes",
    description2: "Chill gamers. Cozy lobbies",
    image:
      "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    name: "Sushis City",
    members: 14879,
    type: "Community",
    description: "Night grind + neon vibes",
    description2: "Chill gamers. Cozy lobbies",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [joined, setJoined] = useState(new Set());
  const [communities, setCommunities] = useState(COMMUNITIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPublicNexus = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "http://YOUR_BACKEND_URL_HERE/api/public-nexus"
        );
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((item, index) => ({
            id:
              (item._id && item._id.toString()) ||
              (item.id && item.id.toString()) ||
              String(index),
            name: item.name || "Untitled",
            members: item.members || item.membersCount || 0,
            type: item.type || "Community",
            description: item.description || "",
            description2: item.description2 || item.shortDescription || "",
            image:
              item.image ||
              item.imageUrl ||
              "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
          }));

          setCommunities(mapped);
        } else {
          Alert.alert("Error", "Could not load public nexus list.");
        }
      } catch (err) {
        Alert.alert("Network Error", "Failed to load public nexus.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicNexus();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return communities;
    const s = search.toLowerCase();
    return communities.filter(
      (c) =>
        c.name?.toLowerCase().includes(s) ||
        c.description?.toLowerCase().includes(s)
    );
  }, [search, communities]);

  const renderCard = ({ item }) => {
    const isJoined = joined.has(item.id);
    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("ExploreNexusScreen", {
            communityId: item.id,
          })
        }
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.cardContainer}
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSub}>
                  {Number(item.members || 0).toLocaleString()} Members ·{" "}
                  {item.type}
                </Text>
              </View>

              <TouchableOpacity style={styles.peopleBtn}>
                <Icon
                  name={isJoined ? "check" : "users"}
                  size={16}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.cardDesc}>
                🎮 {item.description} ✨🎮
              </Text>
              <Text style={styles.cardDesc}>
                😎 {item.description2} 🎮🔥
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.mainContainer}>
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={[styles.sideButton, styles.sideButtonActive]}
          >
            <Icon name="compass" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => navigation.navigate("Create_Nexus")}
          >
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentArea}>
          <TouchableOpacity
            style={styles.addBlipCard}
            onPress={() => navigation.navigate("CreateBlipsScreen")}
          >
            <Icon name="plus" size={32} color="#fff" />
            <Text style={styles.addBlipText}>Add Blips</Text>
          </TouchableOpacity>

          <View style={styles.exploreContainer}>
            <Text style={styles.exploreTitle}>Explore</Text>

            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <Icon name="search" size={16} color="#64748b" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search"
                  placeholderTextColor="#64748b"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              {/* ✅ ONLY CHANGE HERE */}
              <TouchableOpacity
                style={styles.filterBtn}
                onPress={() => navigation.navigate("NexusFilter")}
              >
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <Text style={{ color: "#fff", fontSize: 12 }}>
                Loading...
              </Text>
            ) : (
              <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            )}
          </View>
        </View>
      </View>

      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={22} color="#3b82f6" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="message-circle" size={22} color="#64748b" />
          <Text style={styles.tabLabel}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="bell" size={22} color="#64748b" />
          <Text style={styles.tabLabel}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="user" size={22} color="#64748b" />
          <Text style={styles.tabLabel}>You</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0A0E1A" },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  sidebar: { width: 50, alignItems: "center", marginRight: 8 },
  sideButton: {
    padding: 9,
    borderRadius: 10,
    backgroundColor: "#3255BA",
    marginBottom: 10,
  },
  sideButtonActive: {},
  contentArea: { flex: 1 },
  addBlipCard: {
    width: 70,
    height: 102,
    borderRadius: 15,
    backgroundColor: "#1a2332",
    borderWidth: 4,
    borderColor: "#3154BA4D",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  addBlipText: { color: "#fff", fontSize: 8, marginTop: 12 },
  exploreContainer: {
    flex: 1,
    backgroundColor: "#0C142A",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 21,
  },
  exploreTitle: { color: "#fff", fontSize: 12, marginBottom: 17 },
  searchRow: { flexDirection: "row", marginBottom: 15 },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#3154BA4D",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, marginLeft: 18, color: "#fff" },
  filterBtn: { marginLeft: 10, justifyContent: "center" },
  filterText: { color: "#3255BA", fontSize: 10 },
  listContent: { paddingBottom: 20 },
  cardWrapper: { marginBottom: 12 },
  cardContainer: { height: 110, borderRadius: 16 },
  cardImageStyle: { borderRadius: 16 },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.6)",
  },
  cardContent: { padding: 12 },
  cardHeader: { flexDirection: "row", marginBottom: 8 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ec4899",
  },
  cardInfo: { marginLeft: 10, flex: 1 },
  cardTitle: { color: "#fff", fontSize: 12 },
  cardSub: { color: "#BDBDBD", fontSize: 8 },
  peopleBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#3255BA",
  },
  cardDesc: { color: "#fff", fontSize: 8, lineHeight: 16 },
  bottomTabBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#0f1729",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: { alignItems: "center" },
  tabLabel: { color: "#64748b", fontSize: 11 },
  tabLabelActive: { color: "#3b82f6" },
});
