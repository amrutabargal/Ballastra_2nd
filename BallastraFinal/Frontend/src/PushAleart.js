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

// export default function PushAlertsScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Push Alerts</Text>
//           <Text style={styles.headerSub}>Shusshi Clan</Text>
//         </View>

//         <View style={{ width: 22 }} />
//       </View>

//       {/* CONTENT */}
//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* PUSH ALERTS */}
//         <OptionRow
//           label="Push Alerts"
//           value="Mentions and replies"
//           dropdown
//         />

//         <OptionRow label="New Orbits" value="On" dropdown />
//         <OptionRow label="Emoji Reactions" value="On" dropdown />
//         <OptionRow label="New Orbit Nexus Join" value="On" dropdown />

//         {/* NAVIGATION ITEMS */}
//         <NavRow label="User Settings" onPress={() => navigation.navigate("UserSettings")} />
//         <NavRow label="Nexus notifications" onPress={() => navigation.navigate("NexusNotifications")} />
//         <NavRow label="Nexus Hide Notifications" onPress={() => navigation.navigate("NexusHideNotifications")} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// /* ---------- ROW COMPONENTS ---------- */

// const OptionRow = ({ label, value, dropdown }) => (
//   <TouchableOpacity style={styles.card} activeOpacity={0.85}>
//     <View style={styles.row}>
//       <Text style={styles.cardTitle}>{label}</Text>

//       <View style={styles.rowRight}>
//         <Text style={styles.cardValue}>{value}</Text>
//         <Ionicons
//           name={dropdown ? "chevron-down" : "chevron-forward"}
//           size={16}
//           color="#9CA3AF"
//         />
//       </View>
//     </View>
//   </TouchableOpacity>
// );

// const NavRow = ({ label, onPress }) => (
//   <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
//     <View style={styles.row}>
//       <Text style={styles.cardTitle}>{label}</Text>
//       <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//     </View>
//   </TouchableOpacity>
// );

// /* ================= STYLES ================= */

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
//     marginBottom: 26,
//   },
//   headerCenter: {
//     flex: 1,
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   headerSub: {
//     marginTop: 2,
//     fontSize: 11,
//     color: "#94A3B8",
//   },

//   /* CONTENT */
//   content: {
//     gap: 14,
//     paddingBottom: 40,
//   },

//   /* CARD */
//   card: {
//     height: 52,
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     backgroundColor: "#0B1C3D",
//     borderWidth: 1,
//     borderColor: "#1E3A8A",

//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

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
//     width: "100%",
//   },

//   rowRight: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
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
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function PushAlertsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Push Alerts</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* PUSH ALERTS */}
        <OptionRow
          label="Push Alerts"
          value="Mentions and replies"
          dropdown
        />

        <OptionRow label="New Orbits" value="On" dropdown />
        <OptionRow label="Emoji Reactions" value="On" dropdown />
        <OptionRow label="New Orbit Nexus Join" value="On" dropdown />

        {/* NAVIGATION ITEMS */}
        <NavRow
          label="User Settings"
          onPress={() => navigation.navigate("UserSettings")}
        />

        {/* ✅ CHANGE HERE */}
        <NavRow
          label="Nexus notifications"
          onPress={() => navigation.navigate("Nexusnotifications")}
        />

        <NavRow
          label="Nexus Hide Notifications"
          onPress={() => navigation.navigate("NexusHideNotifications")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- ROW COMPONENTS ---------- */

const OptionRow = ({ label, value, dropdown }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.85}>
    <View style={styles.row}>
      <Text style={styles.cardTitle}>{label}</Text>

      <View style={styles.rowRight}>
        <Text style={styles.cardValue}>{value}</Text>
        <Ionicons
          name={dropdown ? "chevron-down" : "chevron-forward"}
          size={16}
          color="#9CA3AF"
        />
      </View>
    </View>
  </TouchableOpacity>
);

const NavRow = ({ label, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.row}>
      <Text style={styles.cardTitle}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    </View>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 18,
  },

  /* HEADER */
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
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },

  /* CONTENT */
  content: {
    gap: 14,
    paddingBottom: 40,
  },

  /* CARD */
  card: {
    height: 52,
    borderRadius: 18,
    paddingHorizontal: 16,
    backgroundColor: "#0B1C3D",
    borderWidth: 1,
    borderColor: "#1E3A8A",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#1E40AF",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cardTitle: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "500",
  },

  cardValue: {
    color: "#9CA3AF",
    fontSize: 11,
  },
});
