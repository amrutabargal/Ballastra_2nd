// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";

// export default function NotificationsScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safe} edges={["top"]}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Notifications</Text>
//           <Text style={styles.headerSub}>Shusshi Clan</Text>
//         </View>

//         <View style={{ width: 22 }} />
//       </View>

//       {/* CONTENT */}
//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* QUALITY FILTER */}
//         <View style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.cardTitle}>Quality Level Filter</Text>

//             <View style={styles.rowRight}>
//               <Text style={styles.cardValue}>Quality Filter</Text>
//               <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
//             </View>
//           </View>

//           <Text style={styles.desc}>
//             Filter lower-quality content from your notifications. This won’t
//             filter out notifications from people you follow or accounts you’ve
//             interacted with recently.{" "}
//             <Text style={styles.link}>Learn more.</Text>
//           </Text>
//         </View>

//         {/* SILENCED */}
//         <TouchableOpacity style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.cardTitle}>Silenced Notifications</Text>

//             <View style={styles.rowRight}>
//               <Text style={styles.cardValue}>You have no orbits</Text>
//               <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
//             </View>
//           </View>
//         </TouchableOpacity>

//         {/* EYE COMFORT */}
//         <TouchableOpacity style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.cardTitle}>Eye comfort</Text>

//             <View style={styles.rowRight}>
//               <Text style={styles.cardValue}>Less warm</Text>
//               <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
//             </View>
//           </View>
//         </TouchableOpacity>

//         {/* DM PREVIEWS */}
//         <TouchableOpacity style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.cardTitle}>DM Message Previews</Text>

//             <View style={styles.rowRight}>
//               <Text style={styles.cardValue}>All Messages & Chats</Text>
//               <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
//             </View>
//           </View>
//         </TouchableOpacity>

//         {/* USER SETTINGS */}
//         <TouchableOpacity style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.cardTitle}>User Settings</Text>
//             <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//           </View>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// /* ---------- STYLES ---------- */
// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#020617",
//   },

//   /* HEADER */
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 18,
//     paddingBottom: 12,
//   },
//   headerCenter: {
//     flex: 1,
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//   },
//   headerSub: {
//     marginTop: 2,
//     fontSize: 11,
//     color: "#94A3B8",
//   },

//   /* CONTENT */
//   content: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 40,
//     gap: 14,
//   },

//   /* CARD */
//   card: {
//     backgroundColor: "#0B1C3D",
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderWidth: 1,
//     borderColor: "#1E3A8A",

//     shadowColor: "#1E40AF",
//     shadowOpacity: 0.22,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 4,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   rowRight: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   cardTitle: {
//     color: "#E5E7EB",
//     fontSize: 13,
//     fontWeight: "500",
//   },

//   cardValue: {
//     color: "#9CA3AF",
//     fontSize: 11,
//   },

//   desc: {
//     marginTop: 10,
//     fontSize: 11,
//     lineHeight: 16,
//     color: "#9CA3AF",
//   },

//   link: {
//     color: "#3B82F6",
//     fontWeight: "500",
//   },
// });








// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   StatusBar,
// //   TouchableOpacity,
// //   ScrollView,
// //   Switch,
// //   LayoutAnimation,
// //   Platform,
// //   UIManager,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Ionicons } from "@expo/vector-icons";

// // /* Enable animation on Android */
// // if (Platform.OS === "android") {
// //   UIManager.setLayoutAnimationEnabledExperimental &&
// //     UIManager.setLayoutAnimationEnabledExperimental(true);
// // }

// // export default function NotificationsScreen({ navigation }) {
// //   const [openSilenced, setOpenSilenced] = useState(false);

// //   const [silenced, setSilenced] = useState("You have no orbits");

// //   const toggleSilenced = () => {
// //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
// //     setOpenSilenced(!openSilenced);
// //   };

// //   const options = [
// //     "You have no orbits",
// //     "Not your orbits",
// //     "On a new account",
// //     "People with default avatar",
// //     "Users who haven’t verified their email",
// //     "Users pending phone verification",
// //   ];

// //   return (
// //     <SafeAreaView style={styles.safe} edges={["top"]}>
// //       <StatusBar barStyle="light-content" />

// //       {/* HEADER */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Ionicons name="chevron-back" size={22} color="#fff" />
// //         </TouchableOpacity>

// //         <View style={styles.headerCenter}>
// //           <Text style={styles.headerTitle}>Notifications</Text>
// //           <Text style={styles.headerSub}>Shusshi Clan</Text>
// //         </View>

// //         <View style={{ width: 22 }} />
// //       </View>

// //       {/* CONTENT */}
// //       <ScrollView
// //         contentContainerStyle={styles.content}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {/* SILENCED NOTIFICATIONS */}
// //         <TouchableOpacity style={styles.card} onPress={toggleSilenced}>
// //           <View style={styles.row}>
// //             <Text style={styles.cardTitle}>Silenced Notifications</Text>

// //             <View style={styles.rowRight}>
// //               <Text style={styles.cardValue}>{silenced}</Text>
// //               <Ionicons
// //                 name={openSilenced ? "chevron-up" : "chevron-down"}
// //                 size={16}
// //                 color="#9CA3AF"
// //               />
// //             </View>
// //           </View>
// //         </TouchableOpacity>

// //         {/* 🔽 DROPDOWN */}
// //         {openSilenced && (
// //           <View style={styles.popup}>
// //             {options.map((item) => (
// //               <SilencedRow
// //                 key={item}
// //                 label={item}
// //                 active={silenced === item}
// //                 onToggle={() => setSilenced(item)}
// //               />
// //             ))}
// //           </View>
// //         )}
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // /* ---------- ROW ---------- */
// // const SilencedRow = ({ label, active, onToggle }) => (
// //   <View style={styles.popupRow}>
// //     <Text style={styles.popupText}>{label}</Text>
// //     <Switch
// //       value={active}
// //       onValueChange={onToggle}
// //       trackColor={{ false: "#1E293B", true: "#7C3AED" }}
// //       thumbColor="#fff"
// //     />
// //   </View>
// // );

// // /* ---------- STYLES ---------- */
// // const styles = StyleSheet.create({
// //   safe: {
// //     flex: 1,
// //     backgroundColor: "#020617",
// //   },

// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: 18,
// //     paddingBottom: 12,
// //   },
// //   headerCenter: {
// //     flex: 1,
// //     alignItems: "center",
// //   },
// //   headerTitle: {
// //     color: "#fff",
// //     fontSize: 15,
// //     fontWeight: "600",
// //   },
// //   headerSub: {
// //     marginTop: 2,
// //     fontSize: 11,
// //     color: "#94A3B8",
// //   },

// //   content: {
// //     paddingHorizontal: 18,
// //     paddingTop: 10,
// //     paddingBottom: 40,
// //     gap: 14,
// //   },

// //   card: {
// //     backgroundColor: "#0B1C3D",
// //     borderRadius: 18,
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //     borderWidth: 1,
// //     borderColor: "#1E3A8A",
// //   },

// //   row: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //   },
// //   rowRight: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 6,
// //   },

// //   cardTitle: {
// //     color: "#E5E7EB",
// //     fontSize: 13,
// //     fontWeight: "500",
// //   },
// //   cardValue: {
// //     color: "#9CA3AF",
// //     fontSize: 11,
// //   },

// //   /* DROPDOWN */
// //   popup: {
// //     backgroundColor: "#0B1C3D",
// //     borderRadius: 18,
// //     borderWidth: 1,
// //     borderColor: "#1E3A8A",
// //     paddingVertical: 6,
// //   },
// //   popupRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //   },
// //   popupText: {
// //     color: "#E5E7EB",
// //     fontSize: 13,
// //   },
// // });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/* Enable animation on Android */
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function NotificationsScreen({ navigation }) {
  const [open, setOpen] = useState(null);

  const [quality, setQuality] = useState(true);
  const [silenced, setSilenced] = useState("You have no orbits");
  const [eye, setEye] = useState("Less warm");
  const [dm, setDm] = useState("All Messages & Chats");

  const toggle = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === key ? null : key);
  };

  const silencedOptions = [
    "You have no orbits",
    "Not your orbits",
    "On a new account",
    "People with default avatar",
    "Users who haven’t verified their email",
    "Users pending phone verification",
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>

        {/* QUALITY LEVEL FILTER */}
        <TouchableOpacity style={styles.card} onPress={() => toggle("quality")}>
          <Row
            title="Quality Level Filter"
            value="Quality Filter"
            open={open === "quality"}
          />
          <Text style={styles.desc}>
            Filter lower-quality content from your notifications.{" "}
            <Text style={styles.link}>Learn more.</Text>
          </Text>
        </TouchableOpacity>

        {open === "quality" && (
          <Popup>
            <PopupRow label="Quality Filter">
              <Switch
                value={quality}
                onValueChange={setQuality}
                trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                thumbColor="#fff"
              />
            </PopupRow>
          </Popup>
        )}

        {/* SILENCED NOTIFICATIONS */}
        <TouchableOpacity style={styles.card} onPress={() => toggle("silenced")}>
          <Row
            title="Silenced Notifications"
            value={silenced}
            open={open === "silenced"}
          />
        </TouchableOpacity>

        {open === "silenced" && (
          <Popup>
            {silencedOptions.map((item) => (
              <PopupRow key={item} label={item}>
                <Switch
                  value={silenced === item}
                  onValueChange={() => setSilenced(item)}
                  trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                  thumbColor="#fff"
                />
              </PopupRow>
            ))}
          </Popup>
        )}

        {/* EYE COMFORT */}
        <TouchableOpacity style={styles.card} onPress={() => toggle("eye")}>
          <Row title="Eye comfort" value={eye} open={open === "eye"} />
        </TouchableOpacity>

        {open === "eye" && (
          <Popup>
            <PopupRow label="Less warm">
              <Switch
                value={eye === "Less warm"}
                onValueChange={() => setEye("Less warm")}
                trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                thumbColor="#fff"
              />
            </PopupRow>
            <PopupRow label="More warm">
              <Switch
                value={eye === "More warm"}
                onValueChange={() => setEye("More warm")}
                trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                thumbColor="#fff"
              />
            </PopupRow>
          </Popup>
        )}

        {/* DM MESSAGE PREVIEWS */}
        <TouchableOpacity style={styles.card} onPress={() => toggle("dm")}>
          <Row title="DM Message Previews" value={dm} open={open === "dm"} />
        </TouchableOpacity>

        {open === "dm" && (
          <Popup>
            {["All Messages & Chats", "Unread Messages", "None"].map((item) => (
              <PopupRow key={item} label={item}>
                <Switch
                  value={dm === item}
                  onValueChange={() => setDm(item)}
                  trackColor={{ false: "#1E293B", true: "#7C3AED" }}
                  thumbColor="#fff"
                />
              </PopupRow>
            ))}
          </Popup>
        )}

        {/* USER SETTINGS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("UserSettings")}
        >
          <View style={styles.row}>
            <Text style={styles.cardTitle}>User Settings</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const Row = ({ title, value, open }) => (
  <View style={styles.row}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.rowRight}>
      <Text style={styles.cardValue}>{value}</Text>
      <Ionicons
        name={open ? "chevron-up" : "chevron-down"}
        size={16}
        color="#9CA3AF"
      />
    </View>
  </View>
);

const Popup = ({ children }) => (
  <View style={styles.popup}>{children}</View>
);

const PopupRow = ({ label, children }) => (
  <View style={styles.popupRow}>
    <Text style={styles.popupText}>{label}</Text>
    {children}
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },
  headerSub: { marginTop: 2, fontSize: 11, color: "#94A3B8" },

  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 40,
    gap: 14,
  },

  card: {
    backgroundColor: "#0B1C3D",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#1E3A8A",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowRight: { flexDirection: "row", alignItems: "center", gap: 6 },

  cardTitle: { color: "#E5E7EB", fontSize: 13, fontWeight: "500" },
  cardValue: { color: "#9CA3AF", fontSize: 11 },

  desc: { marginTop: 10, fontSize: 11, lineHeight: 16, color: "#9CA3AF" },
  link: { color: "#3B82F6", fontWeight: "500" },

  popup: {
    backgroundColor: "#0B1C3D",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    paddingVertical: 6,
  },
  popupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  popupText: { color: "#E5E7EB", fontSize: 13 },
});
