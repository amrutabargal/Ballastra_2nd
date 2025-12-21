import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const users = Array(7).fill({
    name: "Perfecto",
    avatar: "https://i.pravatar.cc/150?img=12",
});

export default function MessagesScreen() {
    const navigation = useNavigation();

    const handleAccept = (user) => {
        navigation.navigate("ChatScreen", { user });
    };

    const handleDecline = () => {
        Alert.alert(
            "Request Declined",
            "Sorry, you have declined the friend request.",
            [{ text: "OK" }]
        );
    };

    return (
        <LinearGradient colors={["#060B18", "#0B1228"]} style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <Text style={styles.heading}>Messages</Text>

                {/* SEARCH */}
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={16} color="#BDBDBD" />
                    <TextInput
                        placeholder="Search Friends"
                        placeholderTextColor="#FFFFFF"
                        style={styles.searchInput}
                    />
                </View>

                {/* INCOMING FRIEND */}
                <Text style={styles.section}>Incoming Friend</Text>
                <View style={styles.divider} />

                {users.slice(0, 2).map((item, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.left}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <Text style={styles.name}>{item.name}</Text>
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={styles.acceptBtn}
                                onPress={() => handleAccept(item)}
                            >
                                <Ionicons name="checkmark" size={16} color="#fff" />
                                <Text style={styles.acceptText}>Accept</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.declineBtn}
                                onPress={handleDecline}
                            >
                                <Ionicons name="close" size={16} color="#fff" />
                                <Text style={styles.declineText}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* SUGGESTED ORBITS */}
                <Text style={styles.section}>Suggested Orbits</Text>
                <View style={styles.divider} />

                {users.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.left}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <Text style={styles.name}>{item.name}</Text>
                        </View>

                        <TouchableOpacity style={styles.addBtn}>
                            <Ionicons name="person-add-outline" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 20,
    },
    heading: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 14,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3154BA4D",
        borderWidth: 1,
        borderColor: "#3154BA",
        borderRadius: 20,
        paddingHorizontal: 14,
        height: 40,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        marginLeft: 8,
        fontSize: 13,
    },
    section: {
        color: "#FFFFFF",
        fontSize: 13,
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#3255BA4D",
        marginTop: 8,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
    },
    name: {
        color: "#fff",
        fontSize: 14,
    },
    actions: {
        flexDirection: "row",
        gap: 8,
    },
    acceptBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3255BA",
        paddingHorizontal: 8,
        paddingVertical: 6,
        height: 32,
        borderRadius: 6,
        gap: 4,
    },
    acceptText: {
        color: "#fff",
        fontSize: 12,
    },
    declineBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#B4B4B4",
        paddingHorizontal: 8,
        paddingVertical: 6,
        height: 32,
        borderRadius: 6,
        gap: 4,
    },
    declineText: {
        color: "#fff",
        fontSize: 12,
    },
    addBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#3255BA",
        alignItems: "center",
        justifyContent: "center",
    },
});

































































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   Image,
//   ImageBackground,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const BG_IMAGE = require("../../assets/bgchat.jpg");

// /* Dummy chat data */
// const CHATS = [
//   {
//     id: "1",
//     name: "Perfecto",
//     message: "You: https://discord.gg/KH3gsJKCD",
//     time: "2d",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     online: true,
//     bg: true,
//     userId: "u1"
//   },
//   {
//     id: "2",
//     name: "Perfecto",
//     message: "perfecto: https://discord.gg/KH3gsJKCD",
//     time: "2d",
//     avatar: "https://i.pravatar.cc/150?img=12",
//       userId: "u2"
//   },
//   {
//     id: "3",
//     name: "Perfecto",
//     message: "perfecto: https://discord.gg/KH3gsJKCD",
//     time: "2d",
//     avatar: "https://i.pravatar.cc/150?img=8",
//       userId: "u3"
//   },
//   {
//     id: "4",
//     name: "Perfecto",
//     message: "perfecto: https://discord.gg/KH3gsJKCD",
//     time: "7d",
//     avatar: "https://i.pravatar.cc/150?img=8",
//       userId: "u4"
//   }, {
//     id: "5",
//     name: "Perfecto",
//     message: "perfecto: https://discord.gg/KH3gsJKCD",
//     time: "9d",
//     avatar: "https://i.pravatar.cc/150?img=8",
//       userId: "u5"
//   }, {
//     id: "6",
//     name: "Perfecto",
//     message: "perfecto: https://discord.gg/KH3gsJKCD",
//     time: "8d",
//     avatar: "https://i.pravatar.cc/150?img=8",
//       userId: "u6"
//   },
// ];

// /* Notes data */
// const NOTES = [
//   { id: "1", title: "Add Note" },
//   { id: "2", title: "Happy Life" },
//   { id: "3", title: "Best game\nValorant" },
//   { id: "4", title: "I Love\nMusic" },
// ];

// export default function ChatChannelScreen() {
//   const [search, setSearch] = useState("");

//   // const renderChat = ({ item }) => {
//   //   const Container = item.bg ? ImageBackground : View;

//   //   return (
//   //     <TouchableOpacity activeOpacity={0.9}>
//   //       <Container
//   //         source={item.bg ? BG_IMAGE : null}
//   //         imageStyle={{ borderRadius: 18 }}
//   //         style={[styles.chatItem, item.bg && styles.chatItemWithBg]}
//   //       >
//   //         <View style={styles.avatarWrap}>
//   //           {/* <LinearGradient
//   //             colors={["#22C55E", "#16A34A"]}
//   //             style={styles.avatarRing}
//   //           > */}
//   //             <Image source={{ uri: item.avatar }} style={styles.avatar} />
//   //           {/* </LinearGradient> */}
//   //           {item.online && <View style={styles.onlineDot} />}
//   //         </View>

//   //         <View style={styles.chatText}>
//   //           <Text style={styles.chatName}>{item.name}</Text>
//   //           <Text numberOfLines={1} style={styles.chatMsg}>
//   //             {item.message}
//   //           </Text>
//   //         </View>

//   //         <Text style={styles.chatTime}>{item.time}</Text>
//   //       </Container>
//   //     </TouchableOpacity>
//   //   );
//   // };
//   const renderChat = ({ item }) => {
//     return (
//       <TouchableOpacity activeOpacity={0.9}>
//         {item.bg ? (
//           <ImageBackground
//             source={BG_IMAGE}
//             style={styles.chatItem}
//             imageStyle={{ borderRadius: 18 }}
//           >
//             {/* 🔥 Gradient Overlay */}
//             <LinearGradient
//               colors={["rgba(10,14,26,0.9)", "rgba(49,84,186,0.65)"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.chatGradient}
//             >
//               {/* Avatar */}
//               <View style={styles.avatarWrap}>
//                 <Image source={{ uri: item.avatar }} style={styles.avatar} />
//                 {item.online && <View style={styles.onlineDot} />}
//               </View>

//               {/* Text */}
//               <View style={styles.chatText}>
//                 <Text style={styles.chatName}>{item.name}</Text>
//                 <Text numberOfLines={1} style={styles.chatMsg}>
//                   {item.message}
//                 </Text>
//               </View>

//               <Text style={styles.chatTime}>{item.time}</Text>
//             </LinearGradient>
//           </ImageBackground>
//         ) : (
//           <View style={styles.chatItemNormal}>
//             <View style={styles.avatarWrap}>
//               <Image source={{ uri: item.avatar }} style={styles.avatar} />
//             </View>

//             <View style={styles.chatText}>
//               <Text style={styles.chatName}>{item.name}</Text>
//               <Text numberOfLines={1} style={styles.chatMsg}>
//                 {item.message}
//               </Text>
//             </View>

//             <Text style={styles.chatTime}>{item.time}</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <LinearGradient colors={["#060B18", "#0B1228"]} style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <View style={styles.titleRow}>
//             <Text style={styles.title}>Messages</Text>

//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>15</Text>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.profileBtn}>
//             <Ionicons name="people-outline" size={20} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         {/* SEARCH */}
//         <View style={styles.searchBox}>
//           <Ionicons name="search" size={16} color="#94A3B8" />
//           <TextInput
//             placeholder="Search Friends"
//             placeholderTextColor="#94A3B8"
//             style={styles.searchInput}
//             value={search}
//             onChangeText={setSearch}
//           />
//         </View>

//         {/* 🔥 NOTES SECTION (UPDATED) */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.notesRow}
//         >
//           {NOTES.map((item) => (
//             <View key={item.id} style={styles.noteCard}>
//               <Text style={styles.noteTitle}>{item.title}</Text>

//               <View style={styles.noteAvatarWrapper}>
//                 {/* <LinearGradient
//                   colors={["#39FF14", "#2ECC71"]}
//                   style={styles.noteAvatarRing}
//                 > */}
//                 <Image
//                   source={{ uri: "https://i.pravatar.cc/150?img=5" }}
//                   style={styles.noteAvatar}
//                 />
//                 {/* </LinearGradient> */}
//               </View>
//             </View>
//           ))}
//         </ScrollView>

//         {/* CHAT LIST */}
//         <FlatList
//           data={CHATS}
//           keyExtractor={(item) => item.id}
//           renderItem={renderChat}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 30 }}
//         />
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 18,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//   },

//   titleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   badge: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: "#EF4444",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   badgeText: {
//     color: "#fff",
//     fontSize: 11,
//     fontWeight: "600",
//   },


//   profileBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#3255BA",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#3154BA4D",
//     borderWidth: 1,
//     borderColor: "#3154BA",
//     borderRadius: 22,
//     paddingHorizontal: 14,
//     height: 42,
//     marginBottom: 18,
//   },

//   searchInput: {
//     flex: 1,
//     color: "#fff",
//     marginLeft: 8,
//   },

//   /* NOTES */
//   notesRow: {
//     marginBottom: 22,
//   },

//   noteCard: {
//     width: 80,
//     height: 80,
//     backgroundColor: "#0B1430",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 14,
//     marginRight: 14,
//     justifyContent: "space-between",
//   },

//   noteTitle: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "600",
//     marginBottom: 18,
//   },

//   noteAvatarWrapper: {
//     alignItems: "center",
//   },

//   noteAvatarRing: {
//     padding: 3,
//     borderRadius: 32,
//   },

//   noteAvatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//   },

//   /* CHAT */
//   chatItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 14,
//     borderRadius: 18,
//     marginBottom: 14,
//     // backgroundColor: "rgba(255,255,255,0.03)",
//   },

//   chatItemWithBg: {
//     backgroundColor: "transparent",
//     overflow: "hidden",
//   },

//   avatarWrap: {
//     marginRight: 12,
//   },

//   avatarRing: {
//     padding: 2,
//     borderRadius: 18,
//   },

//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//   },

//   onlineDot: {
//     position: "absolute",
//     top: 30,
//     bottom: 0,
//     right: 0,
//     width: 10,
//     height: 10,
//     // backgroundColor: "#22C55E",
//     borderRadius: 5,
//     // borderWidth: 2,
//     // borderColor: "#020617",
//   },

//   chatText: {
//     flex: 1,
//   },

//   chatName: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   chatMsg: {
//     color: "#CBD5E1",
//     fontSize: 13,
//     marginTop: 2,
//   },

//   chatTime: {
//     color: "#94A3B8",
//     fontSize: 12,
//   },
//   chatItem: {
//     borderRadius: 18,
//     marginBottom: 14,
//     overflow: "hidden",
//   },

//   chatGradient: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 14,
//     borderRadius: 18,
//   },

//   chatItemNormal: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 14,
//     borderRadius: 18,
//     marginBottom: 14,

//   },

// });