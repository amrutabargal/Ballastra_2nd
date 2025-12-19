// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const { width } = Dimensions.get("window");

// export default function ProfileAdminScreen() {
//   return (
//     <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
//       <StatusBar barStyle="light-content" />

//       {/* 🔹 HEADER */}
//       <View style={styles.header}>
//         <Image
//           source={require("../../assets/profile card.jpg")}
//           style={styles.headerImage}
//         />

//         {/* Back */}
//         <TouchableOpacity style={styles.backBtn}>
//           <Ionicons name="chevron-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         {/* Title */}
//         <Text style={styles.headerTitle}>Shusshi Clan</Text>

//         {/* Settings */}
//         <TouchableOpacity style={styles.settingBtn}>
//           <Ionicons name="settings-outline" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* 🔹 PROFILE */}
//       <View style={styles.profileWrap}>
//         <View style={styles.avatarRing}>
//           <Image
//             source={{ uri: "https://i.imgur.com/7k12EPD.png" }}
//             style={styles.avatar}
//           />

//           {/* Camera icon */}
//           <View style={styles.cameraIcon}>
//             <Ionicons name="camera-outline" size={14} color="#fff" />
//           </View>
//         </View>

//         <Text style={styles.name}>Shusshi Clan</Text>

//         <Text style={styles.bio}>
//           I don’t just play games I study them, master them, and break the limits
//           everyone else fears. Skilled aim, smart plays, and a mindset built for
//           clutch moments.
//         </Text>

//         <Text style={styles.username}>@shusshiclan</Text>

//         {/* 🔹 MANAGE PROFILE BUTTON */}
//         <TouchableOpacity style={styles.manageBtn}>
//           <Ionicons name="pencil-outline" size={16} color="#fff" />
//           <Text style={styles.manageText}>Manage Profile</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 🔹 BOTTOM TAB */}
//       <LinearGradient
//         colors={["transparent", "#020617"]}
//         style={styles.bottomBar}
//       >
//         <Tab icon="home-outline" label="Home" />
//         <Tab icon="chatbubble-outline" label="Chat" />
//         <Tab icon="notifications-outline" label="Notifications" />
//         <Tab
//           label="You"
//           active
//           avatar
//         />
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// /* ---------- TAB COMPONENT ---------- */
// const Tab = ({ icon, label, active, avatar }) => (
//   <View style={styles.tabItem}>
//     {avatar ? (
//       <Image
//         source={{ uri: "https://i.imgur.com/7k12EPD.png" }}
//         style={styles.tabAvatar}
//       />
//     ) : (
//       <Ionicons
//         name={icon}
//         size={22}
//         color={active ? "#22C55E" : "#94A3B8"}
//       />
//     )}
//     <Text
//       style={[
//         styles.tabLabel,
//         active && { color: "#22C55E" },
//       ]}
//     >
//       {label}
//     </Text>
//   </View>
// );

// /* ---------- STYLES ---------- */
// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#020617",
//   },

//   /* HEADER */
//   header: {
//     height: 240,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     overflow: "hidden",
//   },
//   headerImage: {
//     width: "100%",
//     height: "100%",
//   },
//   backBtn: {
//     position: "absolute",
//     left: 16,
//     top: 70
//   },
//   settingBtn: {
//     position: "absolute",
//     right: 16,
//     top: 70,
//   },
//   headerTitle: {
//     position: "absolute",
//     top: 70,
//     alignSelf: "center",
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   /* PROFILE */
//   profileWrap: {
//     alignItems: "center",
//     paddingHorizontal: 24,
//     marginTop: -42,
//   },
//   avatarRing: {
//     width: 92,
//     height: 92,
//     borderRadius: 46,
//     backgroundColor: "#22C55E",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatar: {
//     width: 78,
//     height: 78,
//     borderRadius: 39,
//   },
//   cameraIcon: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     backgroundColor: "#3B82F6",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 2,
//     borderColor: "#020617",
//   },
//   name: {
//     marginTop: 35,
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   bio: {
//     marginTop: 10,
//     fontSize: 10,
//     lineHeight: 14,
//     color: "#CBD5F5",
//     textAlign: "center",
//   },
//   username: {
//     marginTop: 6,
//     fontSize: 12,
//         fontWeight: "700",

//     color: "#ffffff",
//   },

//   /* MANAGE BUTTON */
// manageBtn: {
//   flexDirection: "row",
//   alignItems: "center",        // vertical center
//   justifyContent: "center",    // 🔥 horizontal center (IMPORTANT)
//   gap: 8,
//   marginTop: 40,
//   backgroundColor: "#2563EB",
//   paddingHorizontal: 24,
//   paddingVertical: 12,
//   borderRadius: 14,
//   height: 52,
//   width: 148,
// },

// manageText: {
//   color: "#fff",
//   fontSize: 13,
//   fontWeight: "500",
//   textAlign: "center",
// },



//   /* BOTTOM BAR */
//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     height: 80,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingBottom: 12,

//   },
//   tabItem: {
//     alignItems: "center",
//   },
//   tabLabel: {
//     fontSize: 10,
//     color: "#94A3B8",
//     marginTop: 4,
//   },
//   tabAvatar: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     borderWidth: 2,
//     borderColor: "#22C55E",
//   },
// });
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function ProfileAdminScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/profile card.jpg")}
          style={styles.headerImage}
        />

        {/* Back */}
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Shusshi Clan</Text>

        {/* ✅ SETTINGS → v66 */}
        <TouchableOpacity
          style={styles.settingBtn}
          onPress={() => navigation.navigate("profileSetting")}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔹 PROFILE */}
      <View style={styles.profileWrap}>
        <View style={styles.avatarRing}>
          <Image
            source={{ uri: "https://i.imgur.com/7k12EPD.png" }}
            style={styles.avatar}
          />

          {/* Camera icon */}
          <View style={styles.cameraIcon}>
            <Ionicons name="camera-outline" size={14} color="#fff" />
          </View>
        </View>

        <Text style={styles.name}>Shusshi Clan</Text>

        <Text style={styles.bio}>
          I don’t just play games I study them, master them, and break the limits
          everyone else fears. Skilled aim, smart plays, and a mindset built for
          clutch moments.
        </Text>

        <Text style={styles.username}>@shusshiclan</Text>

        {/* 🔹 MANAGE PROFILE BUTTON */}
        <TouchableOpacity style={styles.manageBtn}>
          <Ionicons name="pencil-outline" size={16} color="#fff" />
          <Text style={styles.manageText}>Manage Profile</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 BOTTOM TAB */}
      <LinearGradient
        colors={["transparent", "#020617"]}
        style={styles.bottomBar}
      >
        <Tab icon="home-outline" label="Home" />
        <Tab icon="chatbubble-outline" label="Chat" />
        <Tab icon="notifications-outline" label="Notifications" />
        <Tab label="You" active avatar />
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ---------- TAB COMPONENT ---------- */
const Tab = ({ icon, label, active, avatar }) => (
  <View style={styles.tabItem}>
    {avatar ? (
      <Image
        source={{ uri: "https://i.imgur.com/7k12EPD.png" }}
        style={styles.tabAvatar}
      />
    ) : (
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#22C55E" : "#94A3B8"}
      />
    )}
    <Text
      style={[
        styles.tabLabel,
        active && { color: "#22C55E" },
      ]}
    >
      {label}
    </Text>
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  /* HEADER */
  header: {
    height: 240,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  backBtn: {
    position: "absolute",
    left: 16,
    top: 70,
  },
  settingBtn: {
    position: "absolute",
    right: 16,
    top: 70,
  },
  headerTitle: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  /* PROFILE */
  profileWrap: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: -42,
  },
  avatarRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#020617",
  },
  name: {
    marginTop: 35,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  bio: {
    marginTop: 10,
    fontSize: 10,
    lineHeight: 14,
    color: "#CBD5F5",
    textAlign: "center",
  },
  username: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },

  /* MANAGE BUTTON */
  manageBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 40,
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    height: 52,
    width: 148,
  },
  manageText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },

  /* BOTTOM BAR */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 12,
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 4,
  },
  tabAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#22C55E",
  },
});
