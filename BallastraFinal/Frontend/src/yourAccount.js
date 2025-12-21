// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";

// export default function YourAccountScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
//       <StatusBar barStyle="light-content" />

//       {/* 🔹 HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="chevron-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Your Account</Text>
//           <Text style={styles.headerSub}>Shusshi Clan</Text>
//         </View>
//       </View>

//       {/* 🔹 CONTENT */}
//       <View style={styles.content}>
//         <TouchableOpacity style={styles.card}>
//           <View style={styles.cardLeft}>
//             <Ionicons
//               name="person-outline"
//               size={18}
//               color="#E5E7EB"
//             />
//             <Text style={styles.cardText}>Account overview</Text>
//           </View>

//           <Ionicons
//             name="chevron-forward"
//             size={18}
//             color="#9CA3AF"
//           />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

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
//     marginBottom: 26,
//   },
//   backBtn: {
//     padding: 6,
//   },
//   headerCenter: {
//     flex: 1,
//     alignItems: "center",
//     marginRight: 28, // back icon balance
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

//   /* CONTENT */
//   content: {
//     marginTop: 6,
//   },

//   /* CARD */
//   card: {
//    flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "##3154BA",
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     height: 56,
//     borderWidth: 1,
//     borderColor: "#1E3A8A",
//     backgroundColor:"#3154BA",
//     shadowColor: "#1E40AF",
//     shadowOpacity: 0.22,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 4,
//   },
//   cardLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   cardText: {
//     fontSize: 13,
//     color: "#E5E7EB",
//     fontWeight: "500",
//   },
// });


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function YourAccountScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Your Account</Text>
          <Text style={styles.headerSub}>Shusshi Clan</Text>
        </View>
      </View>

      {/* 🔹 CONTENT */}
      <View style={styles.content}>
        {/* ✅ Account overview → v55 */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Account_overview")}
          activeOpacity={0.85}
        >
          <View style={styles.cardLeft}>
            <Ionicons
              name="person-outline"
              size={18}
              color="#E5E7EB"
            />
            <Text style={styles.cardText}>Account overview</Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
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

  /* CONTENT */
  content: {
    marginTop: 6,
  },

  /* CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3154BA", // ✅ cleaned duplicate
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#1E3A8A",

    shadowColor: "#1E40AF",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardText: {
    fontSize: 13,
    color: "#E5E7EB",
    fontWeight: "500",
  },
});
