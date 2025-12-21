
// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

// export default function V34Screen() {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor="#06112A"
//         translucent={false}
//       />

//       <View style={styles.container}>
//         {/* ---------- Header ---------- */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={24} color="#fff" />
//           </TouchableOpacity>

//           <View style={styles.centerTitle}>
//             <Ionicons name="flag" size={18} color="red" />
//             <Text style={styles.titleText}> Report</Text>
//           </View>

//           <View style={{ width: 24 }} />
//         </View>

//         <View style={styles.divider} />

//         {/* ---------- Content ---------- */}
//         <View style={styles.content}>
//           <Text style={styles.mainText}>
//             You're about to create a legal report for content that you believe
//             doesn’t comply with your local laws.
//           </Text>

//           <Text style={styles.subText}>
//             Go back if you'd like to report something that goes against
//             Community Standards.
//           </Text>
//         </View>

//         {/* ---------- Button ---------- */}
//         <View style={styles.buttonWrap}>
//           <TouchableOpacity style={styles.submitBtn}>
//             <Text style={styles.submitText}>Submit report</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#06112A",
//   },

//   container: {
//     flex: 1,
//     backgroundColor: "#06112A",
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 10,
//   },

//   centerTitle: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   titleText: {
//     color: "red",
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "#20345C",
//     marginVertical: 10,
//   },

//   content: {
//     flex: 1,
//     paddingTop: 10,
//   },

//   mainText: {
//     color: "#ffffff",
//     fontSize: 15,
//     lineHeight: 22,
//     marginBottom: 14,
//   },

//   subText: {
//     color: "#C7D0E0",
//     fontSize: 13,
//     lineHeight: 20,
//   },

//   buttonWrap: {
//     alignItems: "center",
//     paddingBottom: Platform.OS === "ios" ? 20 : 10,
//   },

//   submitBtn: {
//     width: width * 0.6,
//     height: 48,
//     backgroundColor: "#2E5BFF",
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   submitText: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//   },
// });
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function V34Screen() {
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Navigate to Done screen
    navigation.navigate("Done", { reportType: "Legal content" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#06112A"
        translucent={false}
      />

      <View style={styles.container}>
        {/* ---------- Header ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.centerTitle}>
            <Ionicons name="flag" size={18} color="red" />
            <Text style={styles.titleText}> Report</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {/* ---------- Content ---------- */}
        <View style={styles.content}>
          <Text style={styles.mainText}>
            You're about to create a legal report for content that you believe
            doesn’t comply with your local laws.
          </Text>

          <Text style={styles.subText}>
            Go back if you'd like to report something that goes against
            Community Standards.
          </Text>
        </View>

        {/* ---------- Button ---------- */}
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#06112A",
  },

  container: {
    flex: 1,
    backgroundColor: "#06112A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  centerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  titleText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#20345C",
    marginVertical: 10,
  },

  content: {
    flex: 1,
    paddingTop: 10,
  },

  mainText: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },

  subText: {
    color: "#C7D0E0",
    fontSize: 13,
    lineHeight: 20,
  },

  buttonWrap: {
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },

  submitBtn: {
    width: width * 0.6,
    height: 48,
    backgroundColor: "#2E5BFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
