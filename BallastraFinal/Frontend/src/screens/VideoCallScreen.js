// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function VideoCallScreen({ navigation, route }) {
//   const { contact } = route.params || {};
//   const name = contact?.name || "Perfecto";

//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#000000" />

//       {/* Remote video placeholder */}
//       <View style={styles.remoteVideo}>
//         {!isVideoOff ? (
//           <Text style={styles.remoteText}>Remote video</Text>
//         ) : (
//           <Text style={styles.remoteText}>Video off</Text>
//         )}
//       </View>

//       {/* Local video thumbnail (bottom-right) */}
//       <View style={styles.localVideo}>
//         <Text style={styles.localText}>You</Text>
//       </View>

//       {/* Controls */}
//       <LinearGradient
//         colors={["rgba(15,23,42,0.9)", "rgba(15,23,42,1)"]}
//         style={styles.controls}
//       >
//         <Text style={styles.name}>{name}</Text>

//         <View style={styles.controlsRow}>
//           <TouchableOpacity
//             style={styles.roundBtn}
//             onPress={() => setIsMuted((m) => !m)}
//           >
//             <Text style={styles.iconText}>{isMuted ? "🔇" : "🎙️"}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.roundBtn}
//             onPress={() => setIsVideoOff((v) => !v)}
//           >
//             <Text style={styles.iconText}>{isVideoOff ? "🎥❌" : "🎥"}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.endCallBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.endCallIcon}>📞</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000",
//   },
//   remoteVideo: {
//     flex: 1,
//     backgroundColor: "#020617",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   remoteText: {
//     color: "#E2E8F0",
//     fontSize: 16,
//   },
//   localVideo: {
//     position: "absolute",
//     right: 16,
//     bottom: 120,
//     width: 100,
//     height: 140,
//     borderRadius: 16,
//     backgroundColor: "#1E293B",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   localText: {
//     color: "#E2E8F0",
//     fontSize: 12,
//   },
//   controls: {
//     paddingHorizontal: 24,
//     paddingTop: 12,
//     paddingBottom: 24,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//   },
//   name: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   controlsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   roundBtn: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#0F172A",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   iconText: {
//     fontSize: 22,
//   },
//   endCallBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "#EF4444",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   endCallIcon: {
//     fontSize: 26,
//     transform: [{ rotate: "135deg" }],
//   },
// });
// src/screens/VideoCallScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

export default function VideoCallScreen({ navigation, route }) {
  const { contact } = route.params || {};
  const name = contact?.name || "Perfecto";

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.remoteVideo}>
        {!isVideoOff ? (
          <Text style={styles.remoteText}>Remote video</Text>
        ) : (
          <Text style={styles.remoteText}>Video off</Text>
        )}
      </View>

      <View style={styles.localVideo}>
        <Text style={styles.localText}>You</Text>
      </View>

      <View style={styles.controls}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.roundBtn}
            onPress={() => setIsMuted((m) => !m)}
          >
            <Text style={styles.iconText}>{isMuted ? "🔇" : "🎙️"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roundBtn}
            onPress={() => setIsVideoOff((v) => !v)}
          >
            <Text style={styles.iconText}>{isVideoOff ? "🎥❌" : "🎥"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.endBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.endIcon}>📞</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  remoteVideo: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },
  remoteText: { color: "#E2E8F0", fontSize: 16 },
  localVideo: {
    position: "absolute",
    right: 16,
    bottom: 120,
    width: 100,
    height: 140,
    borderRadius: 16,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
  },
  localText: { color: "#E2E8F0", fontSize: 12 },
  controls: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#020617",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roundBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 22 },
  endBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  endIcon: { fontSize: 26, transform: [{ rotate: "135deg" }] },
});
