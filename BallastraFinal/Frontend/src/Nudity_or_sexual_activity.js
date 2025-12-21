
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
//   Dimensions,
//   StatusBar,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

// const REASONS = [
//   "Nudity or pornography",
//   "Sexual exploitation or solicitation",
//   "Threatening to share private images",
//   "Child nudity",
// ];

// export default function Nudity_or_sexual_activity({ navigation, route }) {
//   const message = route?.params?.message;
//   const [selectedReason, setSelectedReason] = useState(REASONS[0]);

//   const handleSubmit = () => {
//     console.log("REPORT (nudity flow):", {
//       messageId: message?.id,
//       reason: selectedReason,
//     });

//     // Navigate to Done screen after submitting
//     navigation.navigate("Done", {
//       messageId: message?.id,
//       reason: selectedReason,
//     });
//   };

//   return (
//     <View style={styles.root}>
//       <StatusBar barStyle="light-content" backgroundColor="#06112A" />

//       {/* Background Overlay */}
//       <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />

//       {/* Main Card */}
//       <SafeAreaView style={styles.sheet}>
//         {/* Header */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={24} color="#fff" />
//           </TouchableOpacity>

//           <View style={styles.headerCenter}>
//             <Ionicons name="flag" size={16} color="red" />
//             <Text style={styles.headerTitle}> Report</Text>
//           </View>

//           <View style={{ width: 24 }} />
//         </View>

//         <View style={styles.divider} />

//         {/* Title + Description */}
//         <Text style={styles.title}>Which best describes this problem?</Text>
//         <Text style={styles.subtitle}>
//           Send recent messages from this conversation to ballastra for review.
//           If someone is in immediate danger, call the local emergency services.
//         </Text>

//         {/* Options */}
//         <View style={styles.listWrapper}>
//           {REASONS.map((reason, index) => {
//             const selected = reason === selectedReason;
//             return (
//               <TouchableOpacity
//                 key={reason}
//                 style={[
//                   styles.row,
//                   index === REASONS.length - 1 && { borderBottomWidth: 0 },
//                 ]}
//                 activeOpacity={0.8}
//                 onPress={() => setSelectedReason(reason)}
//               >
//                 <Text style={styles.rowText}>{reason}</Text>

//                 <View
//                   style={[
//                     styles.checkboxOuter,
//                     selected && styles.checkboxSelected,
//                   ]}
//                 >
//                   {selected && (
//                     <Ionicons name="checkmark" size={14} color="#00C2FF" />
//                   )}
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* Submit Button */}
//         <View style={styles.buttonWrap}>
//           <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
//             <Text style={styles.submitText}>Submit report</Text>
//           </TouchableOpacity>
//         </View>
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
//     backgroundColor: "rgba(10, 20, 40, 0.65)",
//   },

//   sheet: {
//     width: "92%",
//     alignSelf: "center",
//     backgroundColor: "#06112A",
//     borderRadius: 28,
//     paddingHorizontal: 20,
//     paddingTop: 8,
//     paddingBottom: 22,
//     marginBottom: Platform.OS === "ios" ? 20 : 10,
//   },

//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 12,
//   },

//   headerCenter: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   headerTitle: {
//     color: "red",
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "#1E335C",
//     marginBottom: 14,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//     marginBottom: 6,
//   },

//   subtitle: {
//     color: "#B6C2D3",
//     fontSize: 12,
//     lineHeight: 18,
//     marginBottom: 16,
//   },

//   listWrapper: {
//     marginTop: 4,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#1E335C",
//   },

//   rowText: {
//     color: "#fff",
//     fontSize: 14,
//     flex: 1,
//   },

//   checkboxOuter: {
//     width: 22,
//     height: 22,
//     borderRadius: 6,
//     borderWidth: 1.4,
//     borderColor: "#2E5BFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 10,
//   },

//   checkboxSelected: {
//     backgroundColor: "rgba(46, 91, 255, 0.15)",
//   },

//   buttonWrap: {
//     alignItems: "center",
//     marginTop: 24,
//   },

//   submitBtn: {
//     width: width * 0.55,
//     height: 44,
//     backgroundColor: "#2E5BFF",
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   submitText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const REASONS = [
  "Nudity or pornography",
  "Sexual exploitation or solicitation",
  "Threatening to share private images",
  "Child nudity",
];

export default function Nudity_or_sexual_activity({ navigation, route }) {
  const message = route?.params?.message;
  const [selectedReason, setSelectedReason] = useState(REASONS[0]);

  const handleSubmit = () => {
    navigation.navigate("Done", {
      messageId: message?.id,
      reason: selectedReason,
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.2)" />

      {/* Background Overlay */}
      <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />

      {/* Main Floating Sheet */}
      <SafeAreaView style={styles.sheet}>
        {/* Handle bar */}
        <View style={styles.handle} />

        {/* Header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#E5E7EB" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Ionicons name="flag" size={16} color="#EF4444" />
            <Text style={styles.headerTitle}> Report</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.line} />

        {/* Title + Subtitle */}
        <Text style={styles.title}>Which best describes this problem?</Text>

        <Text style={styles.subtitle}>
          Send recent messages to Ballastra for review. For immediate danger,
          contact emergency services.
        </Text>

        {/* Options list */}
        <View style={{ marginTop: 4 }}>
          {REASONS.map((reason, index) => {
            const selected = reason === selectedReason;
            return (
              <TouchableOpacity
                key={reason}
                activeOpacity={0.8}
                onPress={() => setSelectedReason(reason)}
              >
                <View
                  style={[
                    styles.row,
                    index === REASONS.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.rowText}>{reason}</Text>

                  <View
                    style={[
                      styles.checkbox,
                      selected && styles.checkboxSelected,
                    ]}
                  >
                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color="#3BA0FF"
                        style={{ marginTop: 1 }}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit report</Text>
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
    backgroundColor: "06112A",
  },

  sheet: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: "#051028",
    borderRadius: 28,
    paddingHorizontal: 15,
    paddingBottom: 24,
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
    backgroundColor: "#4B5563",
    alignSelf: "center",
    marginVertical: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },

  line: {
    height: 1,
    backgroundColor: "#1E335C",
    marginBottom: 16,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  subtitle: {
    color: "#AAB8CF",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1E335C",
  },

  rowText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.4,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxSelected: {
    backgroundColor: "rgba(59,130,246,0.15)",
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 26,
  },

  submitButton: {
   width: width * 0.6,
    height: 44,
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

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
