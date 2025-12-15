// // Suicide_or_self_injury.js
// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function Suicide_or_self_injury({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" />

//       {/* Fake chat background behind sheet */}
//       <View style={styles.background} />

//       {/* Dark overlay */}
//       <View style={styles.overlay} />

//       {/* Center bottom-sheet */}
//       <View style={styles.sheetContainer}>
//         {/* Handle */}
//         <View style={styles.sheetHandle} />

//         {/* Header row */}
//         <View style={styles.headerRow}>
//           <Ionicons name="flag-outline" size={18} color="#FF4B4B" />
//           <Text style={styles.headerText}>Report</Text>
//         </View>

//         {/* Thin divider */}
//         <View style={styles.headerDivider} />

//         {/* Content + button */}
//         <View style={styles.contentWrapper}>
//           <ScrollView
//             style={styles.scrollArea}
//             contentContainerStyle={styles.scrollContent}
//             showsVerticalScrollIndicator={false}
//           >
//             <Text style={styles.title}>Suicide or self-injury</Text>

//             <Text style={styles.description}>
//               Send recent messages from this conversation to ballastra for
//               review. If someone is in immediate danger, call the local
//               emergency services.
//             </Text>

//             {/* Section divider */}
//             <View style={styles.sectionDivider} />

//             <Text style={styles.subtitle}>We take action if we find :-</Text>

//             {/* Bullet 1 */}
//             <View style={styles.bulletRow}>
//               <View style={styles.bulletDot} />
//               <Text style={styles.bulletText}>
//                 Messages encouraging or promoting self-injury, which includes
//                 suicide and cutting.
//               </Text>
//             </View>

//             {/* Bullet 2 */}
//             <View style={styles.bulletRow}>
//               <View style={styles.bulletDot} />
//               <Text style={styles.bulletText}>
//                 Messages identifying or promoting self-injury if the post
//                 attacks or makes fun of them.
//               </Text>
//             </View>
//           </ScrollView>

//           {/* Bottom primary button */}
//           <TouchableOpacity
//             style={styles.submitButton}
//             activeOpacity={0.8}
//             onPress={() => {
//               // handle submit here
//               // e.g., navigation.goBack();
//             }}
//           >
//             <Text style={styles.submitButtonText}>Submit report</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#021027", // for the status bar area
//   },
//   background: {
//     flex: 1,
//     backgroundColor: "#f1e4c9", // fake map/chat bg colour
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.35)",
//   },
//   sheetContainer: {
//     position: "absolute",
//     left: 12,
//     right: 12,
//     top: 70,
//     bottom: 12,
//     backgroundColor: "#021634",
//     borderRadius: 28,
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 20,
//   },
//   sheetHandle: {
//     alignSelf: "center",
//     width: 40,
//     height: 4,
//     borderRadius: 999,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     marginBottom: 12,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   headerText: {
//     marginLeft: 6,
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#FF4B4B",
//   },
//   headerDivider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     marginBottom: 18,
//   },
//   contentWrapper: {
//     flex: 1,
//   },
//   scrollArea: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 13,
//     color: "rgba(255,255,255,0.85)",
//     lineHeight: 18,
//     marginBottom: 18,
//   },
//   sectionDivider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 13,
//     color: "rgba(255,255,255,0.9)",
//     marginBottom: 10,
//   },
//   bulletRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 10,
//   },
//   bulletDot: {
//     width: 5,
//     height: 5,
//     borderRadius: 999,
//     backgroundColor: "#FFFFFF",
//     marginTop: 6,
//     marginRight: 10,
//   },
//   bulletText: {
//     flex: 1,
//     fontSize: 13,
//     color: "rgba(255,255,255,0.85)",
//     lineHeight: 18,
//   },
//   submitButton: {
//     alignSelf: "center",
//     width: "70%",
//     paddingVertical: 12,
//     borderRadius: 24,
//     backgroundColor: "#2F6BFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 12,
//   },
//   submitButtonText: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },
// });
// Suicide_or_self_injury.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Suicide_or_self_injury({ navigation }) {
  const handleSubmit = () => {
    // Navigate to Done screen and pass report type
    navigation.navigate("Done", { reportType: "Suicide or self-injury" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Fake chat background behind sheet */}
      <View style={styles.background} />

      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Center bottom-sheet */}
      <View style={styles.sheetContainer}>
        {/* Handle */}
        <View style={styles.sheetHandle} />

        {/* Header row */}
        <View style={styles.headerRow}>
          <Ionicons name="flag-outline" size={18} color="#FF4B4B" />
          <Text style={styles.headerText}>Report</Text>
        </View>

        {/* Thin divider */}
        <View style={styles.headerDivider} />

        {/* Content + button */}
        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Suicide or self-injury</Text>

            <Text style={styles.description}>
              Send recent messages from this conversation to ballastra for
              review. If someone is in immediate danger, call the local
              emergency services.
            </Text>

            {/* Section divider */}
            <View style={styles.sectionDivider} />

            <Text style={styles.subtitle}>We take action if we find :-</Text>

            {/* Bullet 1 */}
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                Messages encouraging or promoting self-injury, which includes
                suicide and cutting.
              </Text>
            </View>

            {/* Bullet 2 */}
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>
                Messages identifying or promoting self-injury if the post
                attacks or makes fun of them.
              </Text>
            </View>
          </ScrollView>

          {/* Bottom primary button */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit} // Navigate to Done screen
          >
            <Text style={styles.submitButtonText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#021027",
  },
  background: {
    flex: 1,
    backgroundColor: "#f1e4c9",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheetContainer: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 70,
    bottom: 12,
    backgroundColor: "#021634",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "600",
    color: "#FF4B4B",
  },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 18,
  },
  contentWrapper: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
    marginBottom: 18,
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    marginTop: 6,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
  },
  submitButton: {
    alignSelf: "center",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#2F6BFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
