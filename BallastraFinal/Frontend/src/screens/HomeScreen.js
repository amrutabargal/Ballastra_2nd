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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "../config";

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

//   // 🔥 NEW: backend मधून येणारा डेटा इथे ठेवतो
//   const [communities, setCommunities] = useState(COMMUNITIES);
//   const [loading, setLoading] = useState(false);

//   // 🔥 NEW: getPublicNexus API call
//   useEffect(() => {
//     const fetchPublicNexus = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${BASE_URL}/api/nexus/public`);

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
//         console.log("fetchPublicNexus error =>", err);
//         Alert.alert("Network Error", "Failed to load public nexus.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPublicNexus();
//   }, []);

//   // 🔥 NEW: fetch current user's nexus (/api/nexus/my) and merge
//   useEffect(() => {
//     const fetchMyNexus = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (!token) return; // not logged in

//         const res = await fetch(`${BASE_URL}/api/nexus/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const json = await res.json();
//         if (json.success && Array.isArray(json.data) && json.data.length) {
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

//           // merge preserving uniqueness by id, prefer user's nexus first
//           setCommunities((prev) => {
//             const byId = new Map();
//             mapped.forEach((m) => byId.set(m.id, m));
//             prev.forEach((p) => {
//               if (!byId.has(p.id)) byId.set(p.id, p);
//             });
//             return Array.from(byId.values());
//           });
//         }
//       } catch (err) {
//         console.log("fetchMyNexus error =>", err);
//       }
//     };

//     fetchMyNexus();
//   }, []);

//   // 🔍 search आता `communities` वर होईल (static नाही)
//   const filtered = useMemo(() => {
//     if (!search.trim()) return communities;
//     const s = search.toLowerCase();
//     return communities.filter(
//       (c) =>
//         c.name?.toLowerCase().includes(s) ||
//         c.description?.toLowerCase().includes(s)
//     );
//   }, [search, communities]);

//   const toggleJoin = (id, name) => {
//     setJoined((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) {
//         next.delete(id);
//         Alert.alert("Left", `You left ${name}`);
//       } else {
//         next.add(id);
//         Alert.alert("Joined", `You joined ${name}`);
//       }
//       return next;
//     });
//   };

//   const renderCard = ({ item }) => {
//     const isJoined = joined.has(item.id);
//     return (
//       <TouchableOpacity
//         style={styles.cardWrapper}
//         activeOpacity={0.8}
//         onPress={() =>
//           navigation?.navigate("Channel", { communityId: item.id })
//         }
//       >
//         <ImageBackground
//           source={{ uri: item.image }}
//           style={styles.cardContainer}
//           imageStyle={styles.cardImageStyle}
//           resizeMode="cover"
//         >
//           <View style={styles.cardOverlay} />
//           <View style={styles.cardContent}>
//             {/* Header with avatar and info */}
//             <View style={styles.cardHeader}>
//               <View style={styles.avatar}></View>
//               <View style={styles.cardInfo}>
//                 <Text style={styles.cardTitle}>{item.name}</Text>
//                 <Text style={styles.cardSub}>
//                   {Number(item.members || 0).toLocaleString()} Members ·{" "}
//                   {item.type}
//                 </Text>
//               </View>
//               {/* People button */}
//               <TouchableOpacity
//                 style={styles.peopleBtn}
//                 onPress={() =>
//                   navigation.navigate("Nexuschat", {
//                     communityId: item.id,
//                     name: item.name,
//                   })
//                 }
//               >
//                 <Icon
//                   name={isJoined ? "check" : "users"}
//                   size={16}
//                   color="#fff"
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Description with emoji bullets */}
//             <View style={styles.descriptionContainer}>
//               <Text style={styles.cardDesc}>
//                 <Text style={styles.emoji}>🎮 </Text>
//                 {item.description}
//                 <Text style={styles.sparkle}> ✨🎮</Text>
//               </Text>
//               <Text style={styles.cardDesc}>
//                 <Text style={styles.emoji}>😎 </Text>
//                 {item.description2}
//                 <Text style={styles.sparkle}> 🎮🔥</Text>
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
//         {/* LEFT SIDEBAR */}
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
//             <Icon name="plus" size={20} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>

//         {/* RIGHT CONTENT AREA */}
//         <View style={styles.contentArea}>
//           {/* Add Blips Card */}
//           <View style={styles.addBlipCard}>
//             <Icon name="plus" size={32} color="#fff" />
//             <Text style={styles.addBlipText}>Add Blips</Text>
//           </View>

//           {/* Explore Container */}
//           <View style={styles.exploreContainer}>
//             <Text style={styles.exploreTitle}>Explore</Text>

//             {/* Search Row */}
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

//             {/* 🔥 NEW: loading + list */}
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

//       {/* Bottom Tab Bar */}
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
//   root: {
//     flex: 1,
//     backgroundColor: "#0A0E1A",
//   },
//   mainContainer: {
//     flex: 1,
//     flexDirection: "row",
//     paddingTop: 50,
//     paddingLeft: 12,
//     paddingRight: 12,
//   },
//   // Sidebar
//   sidebar: {
//     width: 50,
//     alignItems: "center",
//     paddingTop: 8,
//     marginRight: 8,
//   },
//   sideButton: {
//     paddingHorizontal: 9,
//     paddingVertical: 9,
//     borderRadius: 10,
//     backgroundColor: "#3255BA",
//     borderWidth: 1,
//     borderColor: "#3255BA",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "#ffff",
//     marginBottom: 10,
//   },
//   sideButtonActive: {
//     backgroundColor: "#3255BA",
//     borderColor: "#3255BA",
//     color: "#ffff",
//   },
//   // Content Area
//   contentArea: {
//     flex: 1,
//   },
//   // Add Blips Card
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
//   addBlipText: {
//     color: "#fff",
//     fontSize: 8,
//     fontWeight: "500",
//     marginTop: 12,
//   },
//   // Explore Container
//   exploreContainer: {
//     flex: 1,
//     backgroundColor: "#0C142A",
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//     padding: 21,
//   },
//   exploreTitle: {
//     color: "#ffff",
//     fontSize: 12,
//     fontWeight: "500",
//     marginBottom: 17,
//   },
//   // Search Row
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   searchBox: {
//     flex: 1,
//     height: 40,
//     borderRadius: 100,
//     paddingHorizontal: 14,
//     backgroundColor: "#3154BA4D",
//     borderWidth: 1,
//     borderColor: "#3154BA66",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 18,
//     color: "#Ffff",
//     fontSize: 14,
//   },
//   filterBtn: {
//     marginLeft: 10,
//     color: "#Ffff",
//     height: 40,
//     justifyContent: "center",
//   },
//   filterText: {
//     color: "#3255BA",
//     fontSize: 10,
//     fontWeight: "500",
//   },
//   // List
//   listContent: {
//     paddingBottom: 20,
//   },
//   // Card Styles
//   cardWrapper: {
//     marginBottom: 12,
//   },
//   cardContainer: {
//     height: 110,
//     borderRadius: 16,
//     overflow: "hidden",
//     justifyContent: "flex-end",
//   },
//   cardImageStyle: {
//     borderRadius: 16,
//   },
//   cardOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(15, 23, 42, 0.6)",
//     borderRadius: 16,
//   },
//   cardContent: {
//     padding: 12,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#ec4899",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   cardInfo: {
//     marginLeft: 10,
//     flex: 1,
//   },
//   cardTitle: {
//     color: "#FFFFFF",
//     fontSize: 12,
//     fontWeight: "500",
//     marginBottom: 1,
//   },
//   cardSub: {
//     color: "#BDBDBD",
//     fontSize: 8,
//     fontWeight: "500",
//     marginTop: 2,
//   },

//   peopleBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: "#3255BA",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   cardDesc: {
//     color: "#FFFFFF",
//     fontSize: 8,
//     fontWeight: "500",
//     lineHeight: 16,
//   },

//   emoji: {
//     fontSize: 8,
//   },
//   sparkle: {
//     fontSize: 8,
//   },

//   // Bottom Tab Bar
//   bottomTabBar: {
//     flexDirection: "row",
//     height: 70,
//     backgroundColor: "#0f1729",
//     borderTopWidth: 1,
//     borderTopColor: "#1e293b",
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   tabItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 8,
//   },
//   tabLabel: {
//     color: "#64748b",
//     fontSize: 11,
//     marginTop: 4,
//     fontWeight: "500",
//   },
//   tabLabelActive: {
//     color: "#3b82f6",
//   },
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

// 👉 fallback static data (नेट नसेल / API fail झाला तर)
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

  // 🔥 NEW: backend मधून येणारा डेटा इथे ठेवतो
  const [communities, setCommunities] = useState(COMMUNITIES);
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: getPublicNexus API call
  useEffect(() => {
    const fetchPublicNexus = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${BASE_URL}/api/nexus/public`);

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
        console.log("fetchPublicNexus error =>", err);
        Alert.alert("Network Error", "Failed to load public nexus.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicNexus();
  }, []);

  // 🔥 NEW: fetch current user's nexus (/api/nexus/my) and merge
  useEffect(() => {
    const fetchMyNexus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return; // not logged in

        const res = await fetch(`${BASE_URL}/api/nexus/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length) {
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

          // merge preserving uniqueness by id, prefer user's nexus first
          setCommunities((prev) => {
            const byId = new Map();
            mapped.forEach((m) => byId.set(m.id, m));
            prev.forEach((p) => {
              if (!byId.has(p.id)) byId.set(p.id, p);
            });
            return Array.from(byId.values());
          });
        }
      } catch (err) {
        console.log("fetchMyNexus error =>", err);
      }
    };

    fetchMyNexus();
  }, []);

  // 🔍 search आता `communities` वर होईल (static नाही)
  const filtered = useMemo(() => {
    if (!search.trim()) return communities;
    const s = search.toLowerCase();
    return communities.filter(
      (c) =>
        c.name?.toLowerCase().includes(s) ||
        c.description?.toLowerCase().includes(s)
    );
  }, [search, communities]);

  const toggleJoin = (id, name) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        Alert.alert("Left", `You left ${name}`);
      } else {
        next.add(id);
        Alert.alert("Joined", `You joined ${name}`);
      }
      return next;
    });
  };

  const renderCard = ({ item }) => {
    const isJoined = joined.has(item.id);
    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        activeOpacity={0.8}
        onPress={() =>
          navigation?.navigate("Channel", { communityId: item.id })
        }
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.cardContainer}
          imageStyle={styles.cardImageStyle}
          resizeMode="cover"
        >
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            {/* Header with avatar and info */}
            <View style={styles.cardHeader}>
              <View style={styles.avatar}></View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSub}>
                  {Number(item.members || 0).toLocaleString()} Members ·{" "}
                  {item.type}
                </Text>
              </View>
              {/* People button */}
              <TouchableOpacity
                style={styles.peopleBtn}
                onPress={() =>
                  navigation.navigate("Nexuschat", {
                    communityId: item.id,
                    name: item.name,
                  })
                }
              >
                <Icon
                  name={isJoined ? "check" : "users"}
                  size={16}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Description with emoji bullets */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.cardDesc}>
                <Text style={styles.emoji}>🎮 </Text>
                {item.description}
                <Text style={styles.sparkle}> ✨🎮</Text>
              </Text>
              <Text style={styles.cardDesc}>
                <Text style={styles.emoji}>😎 </Text>
                {item.description2}
                <Text style={styles.sparkle}> 🎮🔥</Text>
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
        {/* LEFT SIDEBAR */}
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={[styles.sideButton, styles.sideButtonActive]}
          >
            <Icon name="compass" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => navigation?.navigate("Create_Nexus")}
          >
            <Icon name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* RIGHT CONTENT AREA */}
        <View style={styles.contentArea}>
          {/* Add Blips Card */}
          <View style={styles.addBlipCard}>
            <Icon name="plus" size={32} color="#fff" />
            <Text style={styles.addBlipText}>Add Blips</Text>
          </View>

          {/* Explore Container */}
          <View style={styles.exploreContainer}>
            <Text style={styles.exploreTitle}>Explore</Text>

            {/* Search Row */}
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
              <TouchableOpacity style={styles.filterBtn}>
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>
            </View>

            {/* 🔥 NEW: loading + list */}
            {loading ? (
              <Text style={{ color: "#fff", fontSize: 12 }}>Loading...</Text>
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

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={22} color="#3b82f6" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
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
  root: {
    flex: 1,
    backgroundColor: "#0A0E1A",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 50,
    paddingLeft: 12,
    paddingRight: 12,
  },
  // Sidebar
  sidebar: {
    width: 50,
    alignItems: "center",
    paddingTop: 8,
    marginRight: 8,
  },
  sideButton: {
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#3255BA",
    borderWidth: 1,
    borderColor: "#3255BA",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffff",
    marginBottom: 10,
  },
  sideButtonActive: {
    backgroundColor: "#3255BA",
    borderColor: "#3255BA",
    color: "#ffff",
  },
  // Content Area
  contentArea: {
    flex: 1,
  },
  // Add Blips Card
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
  addBlipText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "500",
    marginTop: 12,
  },
  // Explore Container
  exploreContainer: {
    flex: 1,
    backgroundColor: "#0C142A",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 21,
  },
  exploreTitle: {
    color: "#ffff",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 17,
  },
  // Search Row
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 100,
    paddingHorizontal: 14,
    backgroundColor: "#3154BA4D",
    borderWidth: 1,
    borderColor: "#3154BA66",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 18,
    color: "#Ffff",
    fontSize: 14,
  },
  filterBtn: {
    marginLeft: 10,
    color: "#Ffff",
    height: 40,
    justifyContent: "center",
  },
  filterText: {
    color: "#3255BA",
    fontSize: 10,
    fontWeight: "500",
  },
  // List
  listContent: {
    paddingBottom: 20,
  },
  // Card Styles
  cardWrapper: {
    marginBottom: 12,
  },
  cardContainer: {
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  cardImageStyle: {
    borderRadius: 16,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderRadius: 16,
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ec4899",
    justifyContent: "center",
    alignItems: "center",
  },

  cardInfo: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 1,
  },
  cardSub: {
    color: "#BDBDBD",
    fontSize: 8,
    fontWeight: "500",
    marginTop: 2,
  },

  peopleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#3255BA",
    justifyContent: "center",
    alignItems: "center",
  },

  cardDesc: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "500",
    lineHeight: 16,
  },

  emoji: {
    fontSize: 8,
  },
  sparkle: {
    fontSize: 8,
  },

  // Bottom Tab Bar
  bottomTabBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#0f1729",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabLabel: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#3b82f6",
  },
});