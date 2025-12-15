// // // VoiceCallScreen.js
// // import React from "react";
// // import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";

// // export default function VoiceCallScreen({ navigation, route }) {
// //   const contact = route?.params?.contact || {};
// //   return (
// //     <SafeAreaView style={styles.safe}>
// //       <StatusBar barStyle="light-content" backgroundColor="#020617" />
// //       <View style={styles.container}>
// //         <Text style={styles.label}>Voice call with</Text>
// //         <Text style={styles.name}>{contact.name || "Perfecto"}</Text>

// //         <Text style={styles.timer}>00:12</Text>

// //         <TouchableOpacity
// //           style={styles.endButton}
// //           onPress={() => navigation.goBack()}
// //         >
// //           <Text style={styles.endText}>End Call</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safe: { flex: 1, backgroundColor: "#020617" },
// //   container: { flex: 1, alignItems: "center", justifyContent: "center" },
// //   label: { color: "#94A3B8", fontSize: 14, marginBottom: 4 },
// //   name: { color: "#FFFFFF", fontSize: 24, fontWeight: "600" },
// //   timer: { color: "#E2E8F0", marginTop: 12, fontSize: 16 },
// //   endButton: {
// //     marginTop: 40,
// //     paddingHorizontal: 32,
// //     paddingVertical: 12,
// //     borderRadius: 999,
// //     backgroundColor: "#EF4444",
// //   },
// //   endText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
// // });
// // src/screens/VoiceCallScreen.js
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function VoiceCallScreen({ navigation, route }) {
//   const contact = route?.params?.contact || {};
//   const [seconds, setSeconds] = useState(0);
//   const [connected, setConnected] = useState(false);

//   // Simulate "connecting..." for 2 seconds, then start timer
//   useEffect(() => {
//     const connectTimeout = setTimeout(() => {
//       setConnected(true);
//     }, 2000);

//     return () => clearTimeout(connectTimeout);
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (connected) {
//       interval = setInterval(() => {
//         setSeconds((prev) => prev + 1);
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [connected]);

//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

//   const handleEndCall = () => {
//     // इथे नंतर तू backend / SDK वर "end call" event पाठवू शकतोस
//     navigation.goBack();
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="light-content" backgroundColor="#020617" />
//       <View style={styles.container}>
//         <Text style={styles.label}>
//           {connected ? "In call with" : "Calling"}
//         </Text>
//         <Text style={styles.name}>{contact.name || "Perfecto"}</Text>

//         <Text style={styles.timer}>
//           {connected ? formatTime(seconds) : "Connecting..."}
//         </Text>

//         <TouchableOpacity style={styles.endButton} onPress={handleEndCall}>
//           <Text style={styles.endText}>End Call</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#020617" },
//   container: { flex: 1, alignItems: "center", justifyContent: "center" },
//   label: { color: "#94A3B8", fontSize: 14, marginBottom: 4 },
//   name: { color: "#FFFFFF", fontSize: 24, fontWeight: "600" },
//   timer: { color: "#E2E8F0", marginTop: 12, fontSize: 16 },
//   endButton: {
//     marginTop: 40,
//     paddingHorizontal: 32,
//     paddingVertical: 12,
//     borderRadius: 999,
//     backgroundColor: "#EF4444",
//   },
//   endText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
// });
// src/screens/VoiceCallScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

export default function VoiceCallScreen({ navigation, route }) {
  const { contact } = route.params || {};
  const name = contact?.name || "Perfecto";
  const [isMuted, setIsMuted] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.center}>
        <View style={styles.avatar}>
          <Text style={styles.initial}>{name[0]}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>Calling…</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.roundBtn}
          onPress={() => setIsMuted((m) => !m)}
        >
          <Text style={styles.iconText}>{isMuted ? "🔇" : "🎙️"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.endBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.endIcon}>📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#0EA5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  initial: { color: "#F9FAFB", fontSize: 40, fontWeight: "700" },
  name: { color: "#F9FAFB", fontSize: 22, fontWeight: "600" },
  status: { color: "#9CA3AF", marginTop: 4 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 40,
  },
  roundBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 24 },
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
