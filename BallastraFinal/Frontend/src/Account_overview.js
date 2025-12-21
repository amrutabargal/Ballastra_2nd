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

// export default function AccountOverviewScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safe} edges={["top"]}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Account Overview</Text>
//           <Text style={styles.headerSub}>Shusshi Clan</Text>
//         </View>

//         <View style={{ width: 22 }} />
//       </View>

//       {/* CONTENT */}
//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* USERNAME */}
//         <Text style={styles.label}>Username</Text>
//         <TouchableOpacity style={styles.card}>
//           <Text style={styles.cardValue}>@Sushshiclan</Text>
//           <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//         </TouchableOpacity>

//         {/* PHONE */}
//         <Text style={styles.label}>Phone</Text>
//         <TouchableOpacity style={styles.card}>
//           <Text style={[styles.cardValue, styles.placeholder]}>Add</Text>
//           <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//         </TouchableOpacity>

//         {/* EMAIL */}
//         <Text style={styles.label}>Email</Text>
//         <TouchableOpacity style={styles.card}>
//           <Text style={styles.cardValue}>
//             kzaxw28423@privaterelay.appleid.com
//           </Text>
//           <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
//         </TouchableOpacity>

//         {/* LOGOUT */}
//         <TouchableOpacity
//           style={styles.logoutBtn}
//           onPress={() => navigation.replace("Login")}
//         >
//           <Ionicons name="log-out-outline" size={16} color="#EF4444" />
//           <Text style={styles.logoutText}>Log Out</Text>
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
//   },

//   label: {
//     color: "#E5E7EB",
//     fontSize: 12,
//     marginBottom: 6,
//     marginTop: 16,
//   },

//   /* CARD */
//   card: {
//     height: 52,
//     backgroundColor: "#3154BA",
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     borderWidth: 1,
//     borderColor: "#1E3A8A",

//     shadowColor: "#1E40AF",
//     shadowOpacity: 0.22,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 4,
//   },

//   cardValue: {
//     color: "#E5E7EB",
//     fontSize: 13,
//     fontWeight: "500",
//   },

//   placeholder: {
//     color: "#9CA3AF",
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
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AccountOverviewScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Account Overview</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* USERNAME */}
        <Text style={styles.label}>Username</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("profileuserId")}
        >
          <Text style={styles.cardValue}>@Sushshiclan</Text>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </TouchableOpacity>

        {/* PHONE */}
        <Text style={styles.label}>Phone</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AddPhoneNumberScreen")}
        >
          <Text style={[styles.cardValue, styles.placeholder]}>Add</Text>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </TouchableOpacity>

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("profileEmail")}
        >
          <Text style={styles.cardValue}>
            kzaxw28423@privaterelay.appleid.com
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace("Login")}
        >
          <Ionicons name="log-out-outline" size={16} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  headerSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#94A3B8",
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 40,
  },

  label: {
    color: "#E5E7EB",
    fontSize: 12,
    marginBottom: 6,
    marginTop: 16,
  },

  /* CARD */
  card: {
    height: 52,
    backgroundColor: "#3154BA",
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "#1E3A8A",

    shadowColor: "#1E40AF",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  cardValue: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "500",
  },

  placeholder: {
    color: "#9CA3AF",
  },

  /* LOGOUT */
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
