
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
//   StatusBar,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// export default function ReportEatingDisorder({ navigation }) {
//   const handleSubmit = () => {
//     Alert.alert(
//       "Report submitted",
//       "Thanks for letting us know. We'll review this conversation.",
//       [
//         {
//           text: "OK",
//           onPress: () => navigation.goBack(),
//         },
//       ]
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

//       {/* Dark Rounded Card */}
//       <View style={styles.card}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>

//           <View style={styles.headerCenter}>
//             <MaterialCommunityIcons name="flag" size={16} color="#ff3b3b" />
//             <Text style={styles.headerTitle}> Report</Text>
//           </View>

//           {/* dummy view to balance space */}
//           <View style={{ width: 22 }} />
//         </View>

//         <View style={styles.divider} />

//         {/* Scrollable Content */}
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           style={styles.content}
//         >
//           <Text style={styles.title}>Eating disorder</Text>

//           <Text style={styles.desc}>
//             Send recent messages from this conversation to ballastra for review.
//             If someone is in immediate danger, call the local emergency
//             services.
//           </Text>

//           <Text style={styles.subTitle}>We take action if we find :-</Text>

//           <Text style={styles.bullet}>
//             • Messages encouraging or promoting eating disorders.
//           </Text>

//           <Text style={styles.bullet}>
//             • Messages mocking someone with an eating disorder.
//           </Text>
//         </ScrollView>

//         {/* Submit Button */}
//         <View style={styles.btnWrapper}>
//           <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
//             <Text style={styles.submitText}>Submit report</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#071A3D",
//   },

//   card: {
//     flex: 1,
//     margin: 8,
//     borderRadius: 22,
//     backgroundColor: "#061634",
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 16,
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingVertical: 6,
//   },

//   headerCenter: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   headerTitle: {
//     color: "#ff3b3b",
//     fontSize: width * 0.043,
//     fontWeight: "600",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "rgba(255,255,255,0.12)",
//     marginBottom: 12,
//   },

//   content: {
//     flex: 1,
//   },

//   title: {
//     color: "#fff",
//     fontSize: width * 0.045,
//     fontWeight: "600",
//     marginBottom: 10,
//   },

//   desc: {
//     color: "#9AA8C5",
//     fontSize: width * 0.037,
//     lineHeight: height * 0.028,
//     marginBottom: 16,
//   },

//   subTitle: {
//     color: "#fff",
//     fontSize: width * 0.04,
//     fontWeight: "500",
//     marginBottom: 8,
//   },

//   bullet: {
//     color: "#9AA8C5",
//     fontSize: width * 0.037,
//     lineHeight: height * 0.028,
//     marginBottom: 10,
//   },

//   btnWrapper: {
//     paddingTop: 10,
//   },

//   submitBtn: {
//     backgroundColor: "#2E5BFF",
//     borderRadius: 16,
//     paddingVertical: height * 0.018,
//     alignItems: "center",
//   },

//   submitText: {
//     color: "#fff",
//     fontSize: width * 0.04,
//     fontWeight: "600",
//   },
// });
// ReportEatingDisorder.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ReportEatingDisorder({ navigation }) {
  const handleSubmit = () => {
    // Navigate to Done screen and pass the report type
    navigation.navigate("Done", { reportType: "Eating disorder" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

      {/* Dark Rounded Card */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <MaterialCommunityIcons name="flag" size={16} color="#ff3b3b" />
            <Text style={styles.headerTitle}> Report</Text>
          </View>

          {/* dummy view to balance space */}
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.divider} />

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.content}
        >
          <Text style={styles.title}>Eating disorder</Text>

          <Text style={styles.desc}>
            Send recent messages from this conversation to ballastra for review.
            If someone is in immediate danger, call the local emergency services.
          </Text>

          <Text style={styles.subTitle}>We take action if we find :-</Text>

          <Text style={styles.bullet}>
            • Messages encouraging or promoting eating disorders.
          </Text>

          <Text style={styles.bullet}>
            • Messages mocking someone with an eating disorder.
          </Text>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  card: {
    flex: 1,
    margin: 8,
    borderRadius: 22,
    backgroundColor: "#061634",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 16,
  },

  header: {
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
    color: "#ff3b3b",
    fontSize: width * 0.043,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginBottom: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "600",
    marginBottom: 10,
  },

  desc: {
    color: "#9AA8C5",
    fontSize: width * 0.037,
    lineHeight: height * 0.028,
    marginBottom: 16,
  },

  subTitle: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "500",
    marginBottom: 8,
  },

  bullet: {
    color: "#9AA8C5",
    fontSize: width * 0.037,
    lineHeight: height * 0.028,
    marginBottom: 10,
  },

  btnWrapper: {
    paddingTop: 10,
  },

  submitBtn: {
    backgroundColor: "#2E5BFF",
    borderRadius: 16,
    paddingVertical: height * 0.018,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
});
