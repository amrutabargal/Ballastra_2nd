// // screens/ReportTerrorismScreen.tsx
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";

// interface Props {
//   navigation: any;
// }

// const ReportTerrorismScreen: React.FC<Props> = ({ navigation }) => {
//   const handleBack = () => {
//     navigation.goBack && navigation.goBack();
//   };

//   const handleSubmit = () => {
//     // TODO: your submit logic
//     console.log("Submit report pressed");
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
//       <StatusBar
//         barStyle="light-content"
//         translucent={true}
//         backgroundColor="transparent"
//       />

//       {/* Background – you can replace this with map/image if you want */}
//       <View style={styles.background} />

//       {/* Foreground card (bottom sheet style) */}
//       <View style={styles.cardContainer}>
//         {/* drag handle like in screenshot */}
//         <View style={styles.handle} />

//         {/* Header */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             onPress={handleBack}
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//             style={styles.backButton}
//           >
//             <Ionicons name="chevron-back" size={22} color="#ffffff" />
//           </TouchableOpacity>

//           <View style={styles.headerCenter}>
//             <Ionicons
//               name="flag-outline"
//               size={18}
//               color="#FF4B5C"
//               style={{ marginRight: 6 }}
//             />
//             <Text style={styles.headerTitle}>Report</Text>
//           </View>

//           {/* dummy view to balance flex for true center title */}
//           <View style={{ width: 32 }} />
//         </View>

//         {/* Content */}
//         <ScrollView
//           style={styles.scroll}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={styles.sectionTitle}>Terrorism</Text>

//           <Text style={styles.description}>
//             Send recent messages from this conversation to ballastra for review.
//             If someone is in immediate danger, call the local emergency
//             services.
//           </Text>

//           <View style={styles.divider} />

//           <Text style={styles.subHeading}>We take action if we find :</Text>

//           <View style={styles.bulletRow}>
//             <Text style={styles.bulletDot}>•</Text>
//             <Text style={styles.bulletText}>
//               Messages celebrating or promoting a terrorist group.
//             </Text>
//           </View>

//           <View style={styles.bulletRow}>
//             <Text style={styles.bulletDot}>•</Text>
//             <Text style={styles.bulletText}>
//               Messages that encourage violence or attacks on anyone based on
//               their religious, ethnic or sexual background.
//             </Text>
//           </View>
//         </ScrollView>

//         {/* Bottom button */}
//         <View style={styles.bottomArea}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.submitButton}
//             onPress={handleSubmit}
//           >
//             <Text style={styles.submitText}>Submit report</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ReportTerrorismScreen;

// const CARD_RADIUS = 28;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#02071A", // dark behind the card
//   },
//   background: {
//     ...StyleSheet.absoluteFillObject,
//     // Add your map/image background here if you want:
//     // backgroundColor: "#123",
//   },
//   cardContainer: {
//     flex: 1,
//     marginHorizontal: 12,
//     marginBottom: 8,
//     marginTop: Platform.OS === "ios" ? 12 : 24,
//     backgroundColor: "#050F24",
//     borderRadius: CARD_RADIUS,
//     paddingTop: 8,
//     paddingBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.4,
//     shadowRadius: 18,
//     elevation: 14,
//   },
//   handle: {
//     alignSelf: "center",
//     width: 44,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: "#24304A",
//     marginBottom: 8,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 18,
//     paddingBottom: 10,
//   },
//   backButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerCenter: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#FF4B5C",
//   },
//   scroll: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   scrollContent: {
//     paddingBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: "#C5CAD6",
//     marginBottom: 18,
//   },
//   divider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "#2B3550",
//     marginBottom: 16,
//   },
//   subHeading: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#C5CAD6",
//     marginBottom: 10,
//   },
//   bulletRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   bulletDot: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     marginRight: 8,
//     marginTop: 1,
//   },
//   bulletText: {
//     flex: 1,
//     color: "#E1E5F0",
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   bottomArea: {
//     paddingHorizontal: 24,
//     paddingTop: 4,
//   },
//   submitButton: {
//     borderRadius: 30,
//     paddingVertical: 14,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#3F70FF",
//   },
//   submitText: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },
// });
// screens/ReportTerrorismScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

const ReportTerrorismScreen: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.goBack && navigation.goBack();
  };

  const handleSubmit = () => {
    // Navigate to Done screen
    navigation.navigate("Done", {
      reportType: "Terrorism",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={styles.background} />

      <View style={styles.cardContainer}>
        <View style={styles.handle} />

        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Ionicons
              name="flag-outline"
              size={18}
              color="#FF4B5C"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.headerTitle}>Report</Text>
          </View>

          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Terrorism</Text>

          <Text style={styles.description}>
            Send recent messages from this conversation to ballastra for review.
            If someone is in immediate danger, call the local emergency
            services.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.subHeading}>We take action if we find :</Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Messages celebrating or promoting a terrorist group.
            </Text>
          </View>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Messages that encourage violence or attacks on anyone based on
              their religious, ethnic or sexual background.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.submitButton}
            onPress={handleSubmit} // 👈 navigates to Done
          >
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportTerrorismScreen;

const CARD_RADIUS = 28;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#02071A",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 12,
    
    marginTop:20,
    marginTop: Platform.OS === "ios" ? 12 : 24,
    backgroundColor: "#050F24",
    borderRadius: CARD_RADIUS,
    paddingTop: 8,
    paddingBottom: 12,
    height:750,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#24304A",
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF4B5C",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#C5CAD6",
    marginBottom: 18,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#2B3550",
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#C5CAD6",
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 8,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    color: "#E1E5F0",
    fontSize: 14,
    lineHeight: 20,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  submitButton: {
    width: 134,
    height: 52,
    backgroundColor: "#06112A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    height:52,
    width:134,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
   
  },
  submitText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
