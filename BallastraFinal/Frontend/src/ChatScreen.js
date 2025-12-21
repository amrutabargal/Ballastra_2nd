
// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   Platform,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import Svg, { Path, Circle } from "react-native-svg";

// /* --- Dummy Data --- */
// const MESSAGES = [
//   { id: "1", name: "Perfecto", message: "You: https://discord.gg/KH3g", time: "2d", avatarColor: "#326BFF", userId: "u1" },
//   { id: "2", name: "Asha", message: "hey — check this out", time: "2d", avatarColor: "#37C8FF", userId: "u2" },
//   { id: "3", name: "Ravi", message: "new guide uploaded", time: "2d", avatarColor: "#00E37D", userId: "u3" },
//   { id: "4", name: "Maya", message: "Let's collab", time: "4d", avatarColor: "#FF37EC", userId: "u4" },
//   { id: "5", name: "Leo", message: "party tonight", time: "12d", avatarColor: "#37F0FF", userId: "u5" },
// ];

// /* Icons */
// const SearchIcon = ({ size = 16 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path
//       d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L18.5 20 20 18.5 15.5 14zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"
//       fill="#64748B"
//     />
//   </Svg>
// );

// const PeopleIcon = () => (
//   <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C13.7909 3 12 4.79086 12 7C12 9.20914 13.7909 11 16 11Z"
//       fill="#fff"
//     />
//     <Path
//       d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11Z"
//       fill="#fff"
//     />
//     <Path
//       d="M8 13C4.68629 13 2 15.6863 2 19V20H14V19C14 15.6863 11.3137 13 8 13Z"
//       fill="#fff"
//     />
//     <Path
//       d="M16 13C15.3677 13 14.7574 13.1029 14.1844 13.2914C15.9076 14.7667 17 16.7553 17 19V20H22V19C22 15.6863 19.3137 13 16 13Z"
//       fill="#fff"
//     />
//   </Svg>
// );

// const MenuDots = () => (
//   <Svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
//     <Circle cx="5" cy="12" r="2" />
//     <Circle cx="12" cy="12" r="2" />
//     <Circle cx="19" cy="12" r="2" />
//   </Svg>
// );

// /* Message Item Component */
// const MessageItem = ({ item, onPress, isActive }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={onPress}
//       style={[styles.itemContainer, isActive && styles.itemActive]}
//     >
//       <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
//         <Text style={styles.avatarText}>{item.name[0]}</Text>
//       </View>

//       <View style={styles.textCol}>
//         <Text style={styles.nameText}>{item.name}</Text>
//         <Text style={styles.messageText} numberOfLines={1}>
//           {item.message}
//         </Text> 
//       </View>

//       <Text style={styles.timeText}>{item.time}</Text>
//     </TouchableOpacity>
//   );
// };

// /* Main Screen */
// export default function ChatChannelScreen({ navigation }) {
//   const [query, setQuery] = useState("");
//   const [activeId, setActiveId] = useState(null);

//   const filtered = MESSAGES.filter((m) => {
//     if (!query) return true;
//     return (m.name + " " + m.message).toLowerCase().includes(query.toLowerCase());
//   });

//   const onSelect = (item) => {
//     setActiveId(item.id);
//     navigation.navigate("Channel", { contact: item });
//   };

//   return (
//     <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
//       <View style={styles.container}>

//           {/* HEADER WITH ICONS */}
//           <View style={styles.headerRow}>
//             <Text style={styles.title}>Messages</Text>

//             <View style={styles.headerIcons}>
//               <TouchableOpacity style={styles.iconBtn}>
//                 <PeopleIcon />
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.iconBtn}>
//                 <MenuDots />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search + Filter */}
//           <View style={styles.searchRow}>
//             <View style={styles.searchBoxBlue}>
//               <SearchIcon />
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search"
//                 placeholderTextColor="#94A3B8"
//                 value={query}
//                 onChangeText={setQuery}
//               />
//             </View>
//   {/* temporary navigation Filter */}

//             <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('')}>   
//               <Text style={styles.filterText}>Filter</Text>
//             </TouchableOpacity>
//           </View>

//           {/* List */}
//           <FlatList
//             data={filtered}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <MessageItem
//                 item={item}
//                 onPress={() => onSelect(item)}
//                 isActive={activeId === item.id}
//               />
//             )}
//             contentContainerStyle={{ paddingBottom: 40 }}
//           />
//       </View>
//     </SafeAreaView>
//   );
// }

// /* Styles */
// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: "#020617" },
//   safe: { flex: 1 },
//   container: { flex: 1, padding: 20 },

//   /* Header */
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },

//   title: { fontSize: 22, color: "#fff", fontWeight: "700" },

//   headerIcons: { flexDirection: "row", gap: 12 },

//   iconBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: "#2952CC",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   /* Search */
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },

//   searchBoxBlue: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1E3A8A",
//     borderRadius: 50,
//     paddingHorizontal: 12,
//     height: 44,
//     flex: 1,
//   },

//   filterText: {
//     marginLeft: 10,
//     color: "#94A3B8",
//     fontSize: 14,
//   },

//   filterBtn: {
//     marginLeft: 10,
//   },

//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     color: "#E2E8F0",
//   },

//   /* List Item */
//   itemContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     marginBottom: 12,
//     backgroundColor: "rgba(255,255,255,0.02)",
//     borderRadius: 14,
//   },
//   itemActive: {
//     backgroundColor: "#1E3A8A",
//     borderWidth: 1,
//     borderColor: "#3B82F6",
//   },

//   avatar: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     marginRight: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarText: { color: "#fff", fontSize: 18, fontWeight: "700" },

//   textCol: { flex: 1 },
//   nameText: { color: "#fff", fontSize: 15, fontWeight: "600" },
//   messageText: { color: "#9CA3AF", fontSize: 13, marginTop: 4 },

//   timeText: { color: "#9CA3AF", fontSize: 12 },
// });
// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   Platform,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import Svg, { Path, Circle } from "react-native-svg";

// /* --- Dummy Data --- */
// const MESSAGES = [
//   { id: "1", name: "Perfecto", message: "You: https://discord.gg/KH3g", time: "2d", avatarColor: "#326BFF", userId: "u1" },
//   { id: "2", name: "Asha", message: "hey — check this out", time: "2d", avatarColor: "#37C8FF", userId: "u2" },
//   { id: "3", name: "Ravi", message: "new guide uploaded", time: "2d", avatarColor: "#00E37D", userId: "u3" },
//   { id: "4", name: "Maya", message: "Let's collab", time: "4d", avatarColor: "#FF37EC", userId: "u4" },
//   { id: "5", name: "Leo", message: "party tonight", time: "12d", avatarColor: "#37F0FF", userId: "u5" },
// ];

// /* Icons */
// const SearchIcon = ({ size = 16 }) => (
//   <Svg width={size} height={size} viewBox="0 0 24 24">
//     <Path
//       d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L18.5 20 20 18.5 15.5 14zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z"
//       fill="#64748B"
//     />
//   </Svg>
// );

// const PeopleIcon = () => (
//   <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
//     <Path
//       d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C13.7909 3 12 4.79086 12 7C12 9.20914 13.7909 11 16 11Z"
//       fill="#fff"
//     />
//     <Path
//       d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11Z"
//       fill="#fff"
//     />
//     <Path
//       d="M8 13C4.68629 13 2 15.6863 2 19V20H14V19C14 15.6863 11.3137 13 8 13Z"
//       fill="#fff"
//     />
//     <Path
//       d="M16 13C15.3677 13 14.7574 13.1029 14.1844 13.2914C15.9076 14.7667 17 16.7553 17 19V20H22V19C22 15.6863 19.3137 13 16 13Z"
//       fill="#fff"
//     />
//   </Svg>
// );

// const MenuDots = () => (
//   <Svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
//     <Circle cx="5" cy="12" r="2" />
//     <Circle cx="12" cy="12" r="2" />
//     <Circle cx="19" cy="12" r="2" />
//   </Svg>
// );

// /* Message Item Component */
// const MessageItem = ({ item, onPress, isActive }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={onPress}
//       style={[styles.itemContainer, isActive && styles.itemActive]}
//     >
//       <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
//         <Text style={styles.avatarText}>{item.name[0]}</Text>
//       </View>

//       <View style={styles.textCol}>
//         <Text style={styles.nameText}>{item.name}</Text>
//         <Text style={styles.messageText} numberOfLines={1}>
//           {item.message}
//         </Text>
//       </View>

//       <Text style={styles.timeText}>{item.time}</Text>
//     </TouchableOpacity>
//   );
// };

// /* Main Screen */
// export default function ChatChannelScreen({ navigation }) {
//   const [query, setQuery] = useState("");
//   const [activeId, setActiveId] = useState(null);

//   const filtered = MESSAGES.filter((m) => {
//     if (!query) return true;
//     return (m.name + " " + m.message).toLowerCase().includes(query.toLowerCase());
//   });

//   const onSelect = (item) => {
//     setActiveId(item.id);
//     navigation.navigate("Channel", { contact: item });
//   };

//   return (
//     <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
//       <View style={styles.container}>

//           {/* HEADER WITH ICONS */}
//           <View style={styles.headerRow}>
//             <Text style={styles.title}>Messages</Text>

//             <View style={styles.headerIcons}>
//               <TouchableOpacity style={styles.iconBtn}>
//                 <PeopleIcon />
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.iconBtn}>
//                 <MenuDots />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search + Filter */}
//           <View style={styles.searchRow}>
//             <View style={styles.searchBoxBlue}>
//               <SearchIcon />
//               <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search"
//                 placeholderTextColor="#94A3B8"
//                 value={query}
//                 onChangeText={setQuery}
//               />
//             </View>
//   {/* temporary navigation Filter */}

//             <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('')}>   
//               <Text style={styles.filterText}>Filter</Text>
//             </TouchableOpacity>
//           </View>

//           {/* List */}
//           <FlatList
//             data={filtered}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <MessageItem
//                 item={item}
//                 onPress={() => onSelect(item)}
//                 isActive={activeId === item.id}
//               />
//             )}
//             contentContainerStyle={{ paddingBottom: 40 }}
//           />
//       </View>
//     </SafeAreaView>
//   );
// }

// /* Styles */
// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: "#020617" },
//   safe: { flex: 1 },
//   container: { flex: 1, padding: 20 },

//   /* Header */
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },

//   title: { fontSize: 22, color: "#fff", fontWeight: "700" },

//   headerIcons: { flexDirection: "row", gap: 12 },

//   iconBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: "#2952CC",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   /* Search */
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },

//   searchBoxBlue: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1E3A8A",
//     borderRadius: 50,
//     paddingHorizontal: 12,
//     height: 44,
//     flex: 1,
//   },

//   filterText: {
//     marginLeft: 10,
//     color: "#94A3B8",
//     fontSize: 14,
//   },

//   filterBtn: {
//     marginLeft: 10,
//   },

//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     color: "#E2E8F0",
//   },

//   /* List Item */
//   itemContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     marginBottom: 12,
//     backgroundColor: "rgba(255,255,255,0.02)",
//     borderRadius: 14,
//   },
//   itemActive: {
//     backgroundColor: "#1E3A8A",
//     borderWidth: 1,
//     borderColor: "#3B82F6",
//   },

//   avatar: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     marginRight: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarText: { color: "#fff", fontSize: 18, fontWeight: "700" },

//   textCol: { flex: 1 },
//   nameText: { color: "#fff", fontSize: 15, fontWeight: "600" },
//   messageText: { color: "#9CA3AF", fontSize: 13, marginTop: 4 },

//   timeText: { color: "#9CA3AF", fontSize: 12 },
// });




import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const BG_IMAGE = require("../../assets/bgchat.jpg");

/* Dummy chat data */
const CHATS = [
  {
    id: "1",
    name: "Perfecto",
    message: "You: https://discord.gg/KH3gsJKCD",
    time: "2d",
    avatar: "https://i.pravatar.cc/150?img=3",
    online: true,
    bg: true,
    userId: "u1",
  },
  {
    id: "2",
    name: "Asha",
    message: "Hey — check this out",
    time: "2d",
    avatar: "https://i.pravatar.cc/150?img=12",
    userId: "u2",
  },
  {
    id: "3",
    name: "Ravi",
    message: "New guide uploaded",
    time: "2d",
    avatar: "https://i.pravatar.cc/150?img=8",
    userId: "u3",
  },
  {
    id: "4",
    name: "Maya",
    message: "New guide uploaded",
    time: "2d",
    avatar: "https://i.pravatar.cc/150?img=8",
    userId: "u4",
  },
  {
    id: "5",
    name: "Leo",
    message: "New guide uploaded",
    time: "2d",
    avatar: "https://i.pravatar.cc/150?img=8",
    userId: "u5",
  },
];

/* Notes */
const NOTES = [
  { id: "1", title: "Add Note" },
  { id: "2", title: "Happy Life" },
  { id: "3", title: "Best game\nValorant" },
  { id: "4", title: "I Love\nMusic" },
];

export default function ChatChannelScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const onSelectChat = (item) => {
    navigation.navigate("Channel", {
      contact: item,       // 👈 SAME AS OLD CODE
      userId: item.userId, // 👈 EXTRA SAFETY
    });
  };

  const renderChat = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => onSelectChat(item)}>
        {item.bg ? (
          <ImageBackground
            source={BG_IMAGE}
            style={styles.chatItem}
            imageStyle={{ borderRadius: 18 }}
          >
            <LinearGradient
              colors={["rgba(10,14,26,0.9)", "rgba(49,84,186,0.65)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.chatGradient}
            >
              <View style={styles.avatarWrap}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                {item.online && <View style={styles.onlineDot} />}
              </View>

              <View style={styles.chatText}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.chatMsg}>
                  {item.message}
                </Text>
              </View>

              <Text style={styles.chatTime}>{item.time}</Text>
            </LinearGradient>
          </ImageBackground>
        ) : (
          <View style={styles.chatItemNormal}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            </View>

            <View style={styles.chatText}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.chatMsg}>
                {item.message}
              </Text>
            </View>

            <Text style={styles.chatTime}>{item.time}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={["#060B18", "#0B1228"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Messages</Text>

            {/* 🔴 PERFECT CIRCULAR BADGE */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>15</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="people-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#94A3B8" />
          <TextInput
            placeholder="Search Friends"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* NOTES */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.notesRow}>
          {NOTES.map((item) => (
            <View key={item.id} style={styles.noteCard}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=5" }}
                style={styles.noteAvatar}
              />
            </View>
          ))}
        </ScrollView>

        {/* CHAT LIST */}
        <FlatList
          data={CHATS}
          keyExtractor={(item) => item.id}
          renderItem={renderChat}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3255BA",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3154BA4D",
    borderWidth: 1,
    borderColor: "#3154BA",
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 42,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },

  notesRow: {
    marginBottom: 22,
  },

  noteCard: {
    width: 80,
    height: 80,
    backgroundColor: "#0B1430",
    borderRadius: 12,
    padding: 10,
    marginRight: 14,
    justifyContent: "space-between",
  },

  noteTitle: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    textAlign: 'center',
  },

  noteAvatar: {
    position: 'relative',
    top: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: "center",
  },

  chatItem: {
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
  },

  chatGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },

  chatItemNormal: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  avatarWrap: {
    marginRight: 12,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
  },

  chatText: {
    flex: 1,
  },

  chatName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  chatMsg: {
    color: "#CBD5E1",
    fontSize: 13,
    marginTop: 2,
  },

  chatTime: {
    color: "#94A3B8",
    fontSize: 12,
  },
});