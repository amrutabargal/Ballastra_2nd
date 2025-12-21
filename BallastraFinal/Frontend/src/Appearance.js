// // import React from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   StatusBar,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Ionicons } from "@expo/vector-icons";

// // export default function AppearanceScreen({ navigation }) {
// //   return (
// //     <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
// //       <StatusBar barStyle="light-content" />

// //       {/* 🔹 HEADER */}
// //       <View style={styles.header}>
// //         <TouchableOpacity
// //           style={styles.backBtn}
// //           onPress={() => navigation.goBack()}
// //         >
// //           <Ionicons name="chevron-back" size={22} color="#fff" />
// //         </TouchableOpacity>

// //         <View style={styles.headerCenter}>
// //           <Text style={styles.headerTitle}>Appearance</Text>
// //           <Text style={styles.headerSub}>Shusshi Clan</Text>
// //         </View>
// //       </View>

// //       {/* 🔹 OPTIONS */}
// //       <View style={styles.listWrap}>
// //         <OptionRow label="App Theme" value="Dark" />
// //         <OptionRow label="Message preview control" value="All" />
// //         <OptionRow label="Eye comfort" value="Less warm" />
// //         <OptionRow label="DM Message Previews" value="All Messages & Chats" />
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // /* ---------- REUSABLE ROW ---------- */
// // const OptionRow = ({ label, value }) => (
// //   <TouchableOpacity style={styles.item}>
// //     <Text style={styles.itemLabel}>{label}</Text>

// //     <View style={styles.itemRight}>
// //       <Text style={styles.itemValue}>{value}</Text>
// //       <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
// //     </View>
// //   </TouchableOpacity>
// // );

// // /* ================= STYLES ================= */

// // const styles = StyleSheet.create({
// //   safe: {
// //     flex: 1,
// //     backgroundColor: "#020617",
// //     paddingHorizontal: 18,
// //   },

// //   /* HEADER */
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginTop: 6,
// //     marginBottom: 26,
// //   },
// //   backBtn: {
// //     padding: 6,
// //   },
// //   headerCenter: {
// //     flex: 1,
// //     alignItems: "center",
// //     marginRight: 28, // balance for back icon
// //   },
// //   headerTitle: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
// //   headerSub: {
// //     marginTop: 2,
// //     fontSize: 11,
// //     color: "#94A3B8",
// //   },

// //   /* LIST */
// //   listWrap: {
// //     gap: 18,
// //   },

// //   /* OPTION ROW */
// //   item: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     backgroundColor: "#0B1C3D",
// //     borderRadius: 18,
// //     paddingHorizontal: 16,
// //     height: 56,

// //     borderWidth: 1,
// //     borderColor: "#1E3A8A",

// //     // 🔹 Soft shadow (same as image)
// //     shadowColor: "#1E40AF",
// //     shadowOpacity: 0.22,
// //     shadowRadius: 8,
// //     shadowOffset: { width: 0, height: 4 },
// //     elevation: 4,
// //   },
// //   itemLabel: {
// //     fontSize: 13,
// //     color: "#E5E7EB",
// //     fontWeight: "500",
// //   },
// //   itemRight: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 8,
// //   },
// //   itemValue: {
// //     fontSize: 11,
// //     color: "#9CA3AF",
// //   },
// // });
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   Switch,
//   LayoutAnimation,
//   Platform,
//   UIManager,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";

// /* Enable animation on Android */
// if (Platform.OS === "android") {
//   UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function AppearanceScreen({ navigation }) {
//   /* ---------------- STATES ---------------- */

//   const [open, setOpen] = useState(null);

//   // App Theme
//   const [theme, setTheme] = useState("Dark");

//   // Message preview control
//   const [preview, setPreview] = useState("All");

//   // Eye comfort
//   const [eye, setEye] = useState("Less warm");

//   // DM preview
//   const [dm, setDm] = useState("All Messages & Chats");

//   const animate = (key) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setOpen(open === key ? null : key);
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Appearance</Text>
//           <Text style={styles.headerSub}>Shusshi Clan</Text>
//         </View>

//         <View style={{ width: 22 }} />
//       </View>

//       {/* LIST */}
//       <View style={styles.listWrap}>

//         {/* APP THEME */}
//         <OptionRow
//           label="App Theme"
//           value={theme}
//           open={open === "theme"}
//           onPress={() => animate("theme")}
//         />
//         {open === "theme" && (
//           <Popup>
//             <ToggleRow label="Dark" active={theme === "Dark"} onPress={() => setTheme("Dark")} />
//             <ToggleRow label="Light" active={theme === "Light"} onPress={() => setTheme("Light")} />
//             <ToggleRow label="System" active={theme === "System"} onPress={() => setTheme("System")} />
//           </Popup>
//         )}

//         {/* MESSAGE PREVIEW CONTROL */}
//         <OptionRow
//           label="Message preview control"
//           value={preview}
//           open={open === "preview"}
//           onPress={() => animate("preview")}
//         />
//         {open === "preview" && (
//           <Popup>
//             <ToggleRow label="All" active={preview === "All"} onPress={() => setPreview("All")} />
//             <ToggleRow label="Unread" active={preview === "Unread"} onPress={() => setPreview("Unread")} />
//             <ToggleRow label="None" active={preview === "None"} onPress={() => setPreview("None")} />
//           </Popup>
//         )}

//         {/* EYE COMFORT */}
//         <OptionRow
//           label="Eye comfort"
//           value={eye}
//           open={open === "eye"}
//           onPress={() => animate("eye")}
//         />
//         {open === "eye" && (
//           <Popup>
//             <ToggleRow label="Less warm" active={eye === "Less warm"} onPress={() => setEye("Less warm")} />
//             <ToggleRow label="More warm" active={eye === "More warm"} onPress={() => setEye("More warm")} />
//           </Popup>
//         )}

//         {/* DM MESSAGE PREVIEWS */}
//         <OptionRow
//           label="DM Message Previews"
//           value={dm}
//           open={open === "dm"}
//           onPress={() => animate("dm")}
//         />
//         {open === "dm" && (
//           <Popup>
//             <ToggleRow
//               label="All Messages & Chats"
//               active={dm === "All Messages & Chats"}
//               onPress={() => setDm("All Messages & Chats")}
//             />
//             <ToggleRow
//               label="Unread Messages"
//               active={dm === "Unread Messages"}
//               onPress={() => setDm("Unread Messages")}
//             />
//             <ToggleRow
//               label="None"
//               active={dm === "None"}
//               onPress={() => setDm("None")}
//             />
//           </Popup>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// const OptionRow = ({ label, value, onPress, open }) => (
//   <TouchableOpacity style={styles.item} onPress={onPress}>
//     <Text style={styles.itemLabel}>{label}</Text>
//     <View style={styles.itemRight}>
//       <Text style={styles.itemValue}>{value}</Text>
//       <Ionicons
//         name={open ? "chevron-up" : "chevron-down"}
//         size={16}
//         color="#9CA3AF"
//       />
//     </View>
//   </TouchableOpacity>
// );

// const Popup = ({ children }) => (
//   <View style={styles.popup}>{children}</View>
// );

// const ToggleRow = ({ label, active, onPress }) => (
//   <View style={styles.toggleRow}>
//     <Text style={styles.toggleLabel}>{label}</Text>
//     <Switch
//       value={active}
//       onValueChange={onPress}
//       trackColor={{ false: "#1E293B", true: "#7C3AED" }}
//       thumbColor="#fff"
//     />
//   </View>
// );

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#020617",
//     paddingHorizontal: 18,
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//     marginBottom: 26,
//   },
//   headerCenter: {
//     flex: 1,
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   headerSub: {
//     marginTop: 2,
//     fontSize: 11,
//     color: "#94A3B8",
//   },

//   listWrap: {
//     gap: 14,
//   },

//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#0B1C3D",
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     height: 56,
//     borderWidth: 1,
//     borderColor: "#1E3A8A",
//   },
//   itemLabel: {
//     fontSize: 13,
//     color: "#E5E7EB",
//     fontWeight: "500",
//   },
//   itemRight: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   itemValue: {
//     fontSize: 11,
//     color: "#9CA3AF",
//   },

//   popup: {
//     backgroundColor: "#0B1C3D",
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: "#1E3A8A",
//     paddingVertical: 6,
//   },

//   toggleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   toggleLabel: {
//     color: "#E5E7EB",
//     fontSize: 13,
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
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

export default function AppearanceScreen({ navigation }) {
  /* ---------------- STATES ---------------- */

  const [open, setOpen] = useState(null);

  // App Theme
  const [theme, setTheme] = useState("Dark");

  // Message preview control
  const [preview, setPreview] = useState("All");

  // Eye comfort
  const [eye, setEye] = useState("Less warm");

  // DM preview
  const [dm, setDm] = useState("All Messages & Chats");

  const animate = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === key ? null : key);
  };

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Appearance</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* LIST */}
      <View style={styles.listWrap}>

        {/* APP THEME */}
        <OptionRow
          label="App Theme"
          value={theme}
          open={open === "theme"}
          onPress={() => animate("theme")}
        />
        {open === "theme" && (
          <Popup>
            <ToggleRow label="Dark" active={theme === "Dark"} onPress={() => setTheme("Dark")} />
            <ToggleRow label="Light" active={theme === "Light"} onPress={() => setTheme("Light")} />
            <ToggleRow label="System" active={theme === "System"} onPress={() => setTheme("System")} />
          </Popup>
        )}

        {/* MESSAGE PREVIEW CONTROL */}
        <OptionRow
          label="Message preview control"
          value={preview}
          open={open === "preview"}
          onPress={() => animate("preview")}
        />
        {open === "preview" && (
          <Popup>
            <ToggleRow label="All" active={preview === "All"} onPress={() => setPreview("All")} />
            <ToggleRow label="Unread" active={preview === "Unread"} onPress={() => setPreview("Unread")} />
            <ToggleRow label="None" active={preview === "None"} onPress={() => setPreview("None")} />
          </Popup>
        )}

        {/* EYE COMFORT */}
        <OptionRow
          label="Eye comfort"
          value={eye}
          open={open === "eye"}
          onPress={() => animate("eye")}
        />
        {open === "eye" && (
          <Popup>
            <ToggleRow label="Less warm" active={eye === "Less warm"} onPress={() => setEye("Less warm")} />
            <ToggleRow label="More warm" active={eye === "More warm"} onPress={() => setEye("More warm")} />
          </Popup>
        )}

        {/* DM MESSAGE PREVIEWS */}
        <OptionRow
          label="DM Message Previews"
          value={dm}
          open={open === "dm"}
          onPress={() => animate("dm")}
        />
        {open === "dm" && (
          <Popup>
            <ToggleRow
              label="All Messages & Chats"
              active={dm === "All Messages & Chats"}
              onPress={() => setDm("All Messages & Chats")}
            />
            <ToggleRow
              label="Unread Messages"
              active={dm === "Unread Messages"}
              onPress={() => setDm("Unread Messages")}
            />
            <ToggleRow
              label="None"
              active={dm === "None"}
              onPress={() => setDm("None")}
            />
          </Popup>
        )}
      </View>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

const OptionRow = ({ label, value, onPress, open }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.itemLabel}>{label}</Text>
    <View style={styles.itemRight}>
      <Text style={styles.itemValue}>{value}</Text>
      <Ionicons
        name={open ? "chevron-up" : "chevron-down"}
        size={16}
        color="#9CA3AF"
      />
    </View>
  </TouchableOpacity>
);

const Popup = ({ children }) => (
  <View style={styles.popup}>{children}</View>
);

const ToggleRow = ({ label, active, onPress }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <Switch
      value={active}
      onValueChange={onPress}
      trackColor={{ false: "#1E293B", true: "#7C3AED" }}
      thumbColor="#fff"
    />
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 26,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },

  listWrap: {
    gap: 14,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0B1C3D",
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#1E3A8A",
  },
  itemLabel: {
    fontSize: 13,
    color: "#E5E7EB",
    fontWeight: "500",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemValue: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  popup: {
    backgroundColor: "#0B1C3D",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    paddingVertical: 6,
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleLabel: {
    color: "#E5E7EB",
    fontSize: 13,
  },
});
