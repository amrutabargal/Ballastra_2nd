// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";


// export default function SettingsScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn}>
//           <Ionicons name="chevron-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Settings</Text>
//           <Text style={styles.headerSub}>Shusshi Clan</Text>
//         </View>
//       </View>

//       {/* SEARCH */}
//       <View style={styles.searchBox}>
//         <Ionicons name="search" size={16} color="#9CA3AF" />
//         <TextInput
//           placeholder="Search Settings"
//           placeholderTextColor="#9CA3AF"
//           style={styles.searchInput}
//         />
//       </View>

//       {/* SETTINGS LIST */}
//       <View style={styles.listWrap}>
//         <SettingItem icon="person-outline" label="Your Account" />
//         <SettingItem icon="shield-checkmark-outline" label="Data & Privacy" />
//         <SettingItem icon="qr-code-outline" label="Scan QR Code" />
//         <SettingItem icon="mic-outline" label="Voice Setting" />
//         <SettingItem icon="accessibility-outline" label="Usability" />
//         <SettingItem icon="color-palette-outline" label="Appearance" />
//         <SettingItem icon="notifications-outline" label="Notifications" />
//       </View>

//       {/* LOGOUT */}
//       <TouchableOpacity style={styles.logoutBtn}>
//         <Ionicons name="log-out-outline" size={16} color="#EF4444" />
//         <Text style={styles.logoutText}>Log Out</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// /* ---------- REUSABLE ITEM ---------- */
// const SettingItem = ({ icon, label }) => (
//   <TouchableOpacity style={styles.item}>
//     <View style={styles.itemLeft}>
//       <Ionicons name={icon} size={18} color="#E5E7EB" />
//       <Text style={styles.itemText}>{label}</Text>
//     </View>

//     <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
//   </TouchableOpacity>
// );

// /* ---------- STYLES ---------- */
// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#020617",
//     paddingHorizontal: 18,
//   },

//   /* HEADER */
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//     marginBottom: 14,
//   },
//   backBtn: {
//     padding: 6,
//   },
//   headerCenter: {
//     flex: 1,
//     alignItems: "center",
//     marginRight: 28,
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

//   /* SEARCH */
//   searchBox: {
//   flexDirection: "row",
//   alignItems: "center",
//   backgroundColor: "#3154BA4",
//   borderRadius: 24,
//   paddingHorizontal: 14,
//   height: 44,
//   marginBottom: 22,

//   borderWidth: 1,
//   borderColor: "#1E3A8A",

//   // 🔽 SOFTER SHADOW
//   shadowColor: "#1E40AF",
//   shadowOpacity: 0.18,          // ⬇️ 0.35 → 0.18
//   shadowRadius: 6,              // ⬇️ 12 → 6
//   shadowOffset: { width: 0, height: 3 }, // ⬇️ 6 → 3
//   elevation: 3,                 // ⬇️ 6 → 3
// },

//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     color: "#fff",
//     fontSize: 12,
//   },

//   /* LIST */
//   listWrap: {
//     gap: 14,
//   },
//   item: {
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "space-between",
//   backgroundColor: "##3154BA",
//   borderRadius: 16,
//   paddingHorizontal: 16,
//   height: 56,

//   borderWidth: 1,
//   borderColor: "#1E3A8A",

//   // 🔽 SOFTER SHADOW
//   shadowColor: "#1E40AF",
//   shadowOpacity: 0.22,          // ⬇️ 0.4 → 0.22
//   shadowRadius: 8,              // ⬇️ 14 → 8
//   shadowOffset: { width: 0, height: 4 }, // ⬇️ 8 → 4
//   elevation: 4,                 // ⬇️ 8 → 4
// },

//   itemLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   itemText: {
//     fontSize: 13,
//     color: "#E5E7EB",
//     fontWeight: "500",
//   },

//   /* LOGOUT */
//   logoutBtn: {
//     marginTop: 32,
//     alignSelf: "center",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },
//   logoutText: {
//     color: "#EF4444",
//     fontSize: 12,
//     fontWeight: "500",
//   },
// });
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#9CA3AF" />
        <TextInput
          placeholder="Search Settings"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* SETTINGS LIST */}
      <View style={styles.listWrap}>
        <SettingItem
          icon="person-outline"
          label="Your Account"
          onPress={() => navigation.navigate("yourAccount")}
        />

        <SettingItem
          icon="shield-checkmark-outline"
          label="Data & Privacy"
          onPress={() => navigation.navigate("DataPrivacy")}
        />

        <SettingItem
          icon="qr-code-outline"
          label="Scan QR Code"
          onPress={() => navigation.navigate("ScScanAQRcode")}
        />

        <SettingItem
          icon="mic-outline"
          label="Voice Setting"
          onPress={() => navigation.navigate("Voice_Setting")}
        />

        <SettingItem
          icon="accessibility-outline"
          label="Usability"
          onPress={() => navigation.navigate("usability")}
        />

        <SettingItem
          icon="color-palette-outline"
          label="Appearance"
          onPress={() => navigation.navigate("Appearance")}
        />

        <SettingItem
          icon="notifications-outline"
          label="Notifications"
          onPress={() => navigation.navigate("Notifprofilenotification")}
        />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => navigation.replace("Login")}
      >
        <Ionicons name="log-out-outline" size={16} color="#EF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------- REUSABLE ITEM ---------- */
const SettingItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={18} color="#E5E7EB" />
      <Text style={styles.itemText}>{label}</Text>
    </View>

    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */
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
    marginBottom: 14,
  },
  backBtn: {
    padding: 6,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    marginRight: 28,
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3154BA4",
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    shadowColor: "#1E40AF",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
    fontSize: 12,
  },

  listWrap: {
    gap: 14,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "##3154BA",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    backgroundColor:"#3154BA",
    shadowColor: "#1E40AF",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemText: {
    fontSize: 13,
    color: "#E5E7EB",
    fontWeight: "500",
  },

  logoutBtn: {
    marginTop: 32,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "500",
  },
});
