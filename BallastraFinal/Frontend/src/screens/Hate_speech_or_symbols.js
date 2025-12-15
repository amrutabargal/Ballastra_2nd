
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const BULLETS = [
//   "Messages promoting hate speech or symbols.",
//   "Messages that encourage violence or attack anyone based on who they are.",
//   "Specific threats of physical harm, theft or vandalism.",
// ];

// export default function Hate_speech_or_symbols({ navigation, route }) {
//   const message = route?.params?.message;

//   const handleSubmit = () => {
//     console.log("REPORT (hate speech):", {
//       messageId: message?.id,
//     });

//     // Navigate to Done screen after submitting
//     navigation.navigate("Done", {
//       messageId: message?.id,
//       reportType: "Hate Speech or Symbols",
//     });
//   };

//   return (
//     <View style={styles.root}>
//       {/* background overlay */}
//       <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />

//       {/* main card */}
//       <SafeAreaView style={styles.sheet}>
//         {/* handle bar */}
//         <View style={styles.handle} />

//         {/* header */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={22} color="#E5E7EB" />
//           </TouchableOpacity>

//           <View style={styles.headerCenter}>
//             <Ionicons name="flag" size={16} color="#F97373" />
//             <Text style={styles.headerTitle}>Report</Text>
//           </View>

//           <View style={{ width: 22 }} />
//         </View>

//         {/* top divider */}
//         <View style={styles.divider} />

//         {/* title + subtitle */}
//         <Text style={styles.title}>Hate speech or symbols</Text>
//         <Text style={styles.subtitle}>
//           Send recent messages from this conversation to ballastra for review.
//           If someone is in immediate danger, call the local emergency services.
//         </Text>

//         {/* middle divider */}
//         <View style={[styles.divider, { marginTop: 8, marginBottom: 10 }]} />

//         {/* body text + bullets */}
//         <Text style={styles.sectionTitle}>We take actions if we find :-</Text>

//         <View style={styles.bulletsWrapper}>
//           {BULLETS.map((t) => (
//             <View key={t} style={styles.bulletRow}>
//               <Text style={styles.bulletDot}>•</Text>
//               <Text style={styles.bulletText}>{t}</Text>
//             </View>
//           ))}
//         </View>

//         {/* submit button */}
//         <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
//           <Text style={styles.submitText}>Submit report</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "flex-end",
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(15,23,42,0.55)",
//   },
//   sheet: {
//     width: "92%",
//     alignSelf: "center",
//     backgroundColor: "#051028",
//     borderRadius: 28,
//     paddingHorizontal: 18,
//     paddingBottom: 24,
//     paddingTop: 4,
//     marginBottom: 18,
//     height:710,
//      shadowColor: "#3154BA",
//     borderWidth:1,
//     borderColor:"#3154BA",
//     shadowOpacity: 0.45,
//     shadowOffset: { width: 0, height: 8 },
//     shadowRadius: 20,
//     elevation: 12,
//   },
//   handle: {
//     alignSelf: "center",
//     width: 42,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: "#4B5563",
//     marginBottom: 12,
//   },

//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   headerCenter: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerTitle: {
//     marginLeft: 6,
//     color: "#F97373",
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   divider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "#111827",
//     marginBottom: 10,
//   },

//   title: {
//     color: "#F9FAFB",
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 6,
//   },
//   subtitle: {
//     color: "#9CA3AF",
//     fontSize: 12,
//   },

//   sectionTitle: {
//     color: "#F9FAFB",
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 6,
//   },

//   bulletsWrapper: {
//     marginBottom: 24,
//   },
//   bulletRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 6,
//   },
//   bulletDot: {
//     color: "#E5E7EB",
//     fontSize: 14,
//     marginRight: 6,
//     lineHeight: 18,
//   },
//   bulletText: {
//     flex: 1,
//     color: "#E5E7EB",
//     fontSize: 13,
//     lineHeight: 18,
//   },

//   submitBtn: {
//     alignSelf: "center",
//     paddingHorizontal: 40,
//     paddingVertical: 12,
//     borderRadius: 999,
//     backgroundColor: "#2563EB",
//   },
//   submitText: {
//     color: "#F9FAFB",
//     fontSize: 15,
//     fontWeight: "600",
//   },
// });
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const BULLETS = [
  "Messages promoting hate speech or symbols.",
  "Messages that promote violence or target people for who they are.",
  "Direct threats of harm, theft, or vandalism.",
];

export default function Hate_speech_or_symbols({ navigation, route }) {
  const message = route?.params?.message;

  const handleSubmit = () => {
    navigation.navigate("Done", {
      messageId: message?.id,
      reportType: "Hate Speech or Symbols",
    });
  };

  return (
    <View style={styles.root}>
      {/* Background overlay */}
      <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />

      {/* Main floating sheet */}
      <SafeAreaView style={styles.sheet}>
        {/* Handle bar */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Ionicons name="flag" size={16} color="#EF4444" />
            <Text style={styles.headerTitle}> Report</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.divider} />

        {/* Title + Subtitle */}
        <Text style={styles.title}>Hate speech or symbols</Text>

        <Text style={styles.subtitle}>
          Send recent messages from this conversation to Ballastra for review.
          For immediate danger, contact emergency services.
        </Text>

        <View style={[styles.divider, { marginVertical: 14 }]} />

        {/* Section title */}
        <Text style={styles.sectionTitle}>We take actions if we find :-</Text>

        {/* Bullet points */}
        <View style={styles.bulletContainer}>
          {BULLETS.map((t) => (
            <View key={t} style={styles.bulletRow}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.bulletText}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Submit button */}
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,20,40,0.55)",
  },

  sheet: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: "#06112A",
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingBottom: 30,
    paddingTop: 4,
    marginBottom: 18,
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
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#06112A",
    alignSelf: "center",
    marginVertical: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#1E335C",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
  },

  subtitle: {
    color: "#AAB8CF",
    fontSize: 12,
    lineHeight: 18,
    paddingRight: 4,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },

  bulletContainer: {
    marginBottom: 26,
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  dot: {
    color: "#E5E7EB",
    fontSize: 14,
    marginRight: 8,
    marginTop: 2,
  },

  bulletText: {
    flex: 1,
    color: "#E5E7EB",
    fontSize: 13.5,
    lineHeight: 18,
  },

  buttonWrap: {
    alignItems: "center",
  },

  submitBtn: {
    width: 134,
    height: 52,
    backgroundColor: "#06112A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height:52,
    width:134,
     shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,
    marginTop:300,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
