// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Feather from "react-native-vector-icons/Feather";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// export default function HomeCommunityDashboard({ navigation }) {
//   const [showText, setShowText] = useState(true);
//   const [showVoice, setShowVoice] = useState(true);

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftMenu}>
//         <TouchableOpacity style={styles.serverBtn}>
//           <Ionicons name="compass-outline" size={22} color="#fff" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.serverBtnPlus}>
//           <Ionicons name="add" size={22} color="#fff" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.serverIconWrap}>
//           <Image
//             source={require("./avatar.png")} // change path
//             style={styles.serverImg}
//           />
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.main}>
//         <LinearGradient
//           colors={["#0E1A34", "#091325"]}
//           style={styles.headerCard}
//         >
//           <View style={styles.row}>
//             <Image
//               source={require("./avatar.png")}
//               style={styles.profileImg}
//             />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={styles.serverName}>Sushis City</Text>
//               <Text style={styles.subText}>0 Members • Community</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <TouchableOpacity style={styles.topIcon}>
//                 <Feather name="search" size={18} color="#fff" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.topIcon}>
//                 <Ionicons name="people-outline" size={18} color="#fff" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.topIcon}>
//                 <Ionicons name="settings-outline" size={18} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.btn}>
//             <Text style={styles.btnTxt}>Nexus Guide</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.btn}>
//             <Text style={styles.btnTxt}>Ident</Text>
//           </TouchableOpacity>
//         </LinearGradient>

//         {/* Text Channel */}
//         <View style={styles.section}>
//           <TouchableOpacity onPress={() => setShowText(!showText)} style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Text channel</Text>
//             <Ionicons name={showText ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#fff" />
//           </TouchableOpacity>

//           {showText && (
//             <View>
//               <TouchableOpacity style={styles.channelItem}>
//                 <Feather name="hash" size={18} color="#72A3FF" />
//                 <Text style={styles.channelText}>general</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.channelItem}>
//                 <MaterialCommunityIcons name="bullhorn-outline" size={18} color="#00E4FF" />
//                 <Text style={styles.channelText}>announcement</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* Voice Channel */}
//         <View style={styles.section}>
//           <TouchableOpacity onPress={() => setShowVoice(!showVoice)} style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Voice channel</Text>
//             <Ionicons name={showVoice ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#fff" />
//           </TouchableOpacity>

//           {showVoice && (
//             <View>
//               <TouchableOpacity style={styles.channelItem}>
//                 <MaterialCommunityIcons name="microphone-outline" size={18} color="#7CEFFF" />
//                 <Text style={styles.channelText}>Lounge</Text>
//               </TouchableOpacity>

//               {["Team Talk", "Chill Zone", "Game VC", "Hangout"].map((name, i) => (
//                 <TouchableOpacity key={i} style={styles.voiceSubItem}>
//                   <MaterialCommunityIcons name="microphone-outline" size={16} color="#5F87F0" />
//                   <Text style={styles.voiceText}>{name}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>
//       </ScrollView>

//       <TouchableOpacity style={styles.floatingBtn}>
//         <Ionicons name="add" size={28} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// // ------------------------------------------------------------------

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#06101F", flexDirection: "row" },
//   leftMenu: { width: 60, alignItems: "center", paddingTop: 50 },
//   serverBtn: {
//     height: 45,
//     width: 45,
//     borderRadius: 14,
//     backgroundColor: "#0D1B36",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   serverBtnPlus: {
//     height: 45, width: 45, borderRadius: 14,
//     backgroundColor: "#1F4FFF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   serverIconWrap: {
//     height: 45, width: 45, borderRadius: 14, overflow: "hidden",
//   },
//   serverImg: { height: "100%", width: "100%" },

//   main: { flex: 1, },

//   headerCard: {
//     margin: 15,
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: "#1A3C78",
//     shadowOpacity: 0.4,
//     shadowRadius: 15,
//   },

//   row: { flexDirection: "row", alignItems: "center" },
//   profileImg: { height: 55, width: 55, borderRadius: 40 },
//   serverName: { color: "#fff", fontSize: 18, fontWeight: "700" },
//   subText: { color: "#9AA8C7", fontSize: 12 },

//   iconRow: { flexDirection: "row", marginLeft: "auto" },

//   topIcon: {
//     height: 32, width: 32, borderRadius: 16,
//     backgroundColor: "#142546",
//     justifyContent: "center", alignItems: "center",
//     marginLeft: 10,
//   },

//   btn: {
//     marginTop: 12,
//     height: 38,
//     borderRadius: 14,
//     backgroundColor: "#142546",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnTxt: { color: "#fff", fontWeight: "700" },

//   section: { marginHorizontal: 15, marginTop: 15 },
//   sectionHeader: { flexDirection: "row", justifyContent: "space-between" },
//   sectionTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
//   channelItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: 45,
//     borderRadius: 14,
//     backgroundColor: "#0B1B32",
//     paddingHorizontal: 15,
//     marginTop: 10,
//   },
//   channelText: { color: "#fff", fontSize: 15, marginLeft: 10 },

//   voiceSubItem: { flexDirection: "row", alignItems: "center", marginTop: 10, marginLeft: 20 },
//   voiceText: { color: "#7EA6FF", fontSize: 14, marginLeft: 10 },

//   floatingBtn: {
//     position: "absolute",
//     right: 25,
//     bottom: 80,
//     backgroundColor: "#1F4FFF",
//     height: 55,
//     width: 55,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeCommunityDashboard({ navigation }) {
  const [showText, setShowText] = useState(true);
  const [showVoice, setShowVoice] = useState(true);

  const TEMP_IMAGE = "https://i.pravatar.cc/150?img=3"; // ⭐ temporary avatar image

  return (
    <View style={styles.container}>
      <View style={styles.leftMenu}>
        <TouchableOpacity style={styles.serverBtn}>
          <Ionicons name="compass-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.serverBtnPlus}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.serverIconWrap}>
          <Image
            source={{ uri: TEMP_IMAGE }} // ⭐ online temporary image
            style={styles.serverImg}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.main}>
        <LinearGradient
          colors={["#0E1A34", "#091325"]}
          style={styles.headerCard}
        >
          <View style={styles.row}>
            <Image source={{ uri: TEMP_IMAGE }} style={styles.profileImg} />

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.serverName}>Sushis City</Text>
              <Text style={styles.subText}>0 Members • Community</Text>
            </View>

            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.topIcon}>
                <Feather name="search" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.topIcon}>
                <Ionicons name="people-outline" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.topIcon}>
                <Ionicons name="settings-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Nexus Guide</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Ident</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* -------- TEXT CHANNEL SECTION -------- */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setShowText(!showText)} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Text channel</Text>
            <Ionicons name={showText ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#fff" />
          </TouchableOpacity>

          {showText && (
            <View>
              <TouchableOpacity style={styles.channelItem}>
                <Feather name="hash" size={18} color="#72A3FF" />
                <Text style={styles.channelText}>general</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.channelItem}>
                <MaterialCommunityIcons name="bullhorn-outline" size={18} color="#00E4FF" />
                <Text style={styles.channelText}>announcement</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* -------- VOICE CHANNEL SECTION -------- */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setShowVoice(!showVoice)} style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Voice channel</Text>
            <Ionicons name={showVoice ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#fff" />
          </TouchableOpacity>

          {showVoice && (
            <View>
              <TouchableOpacity style={styles.channelItem}>
                <MaterialCommunityIcons name="microphone-outline" size={18} color="#7CEFFF" />
                <Text style={styles.channelText}>Lounge</Text>
              </TouchableOpacity>

              {["Team Talk", "Chill Zone", "Game VC", "Hangout"].map((name, i) => (
                <TouchableOpacity key={i} style={styles.voiceSubItem}>
                  <MaterialCommunityIcons name="microphone-outline" size={16} color="#5F87F0" />
                  <Text style={styles.voiceText}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingBtn}
        onPress={() => navigation.navigate("Create_Nexus")} // ⭐ navigate example
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#06101F", flexDirection: "row" },
  leftMenu: { width: 60, alignItems: "center", paddingTop: 50 },
  serverBtn: {
    height: 45, width: 45, borderRadius: 14,
    backgroundColor: "#0D1B36",
    justifyContent: "center", alignItems: "center",
    marginBottom: 20,
  },
  serverBtnPlus: {
    height: 45, width: 45, borderRadius: 14,
    backgroundColor: "#1F4FFF",
    justifyContent: "center", alignItems: "center",
    marginBottom: 25,
  },
  serverIconWrap: {
    height: 45, width: 45, borderRadius: 14, overflow: "hidden",
  },
  serverImg: { height: "100%", width: "100%" },

  main: { flex: 1 },

  headerCard: {
    margin: 15,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#1A3C78",
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },

  row: { flexDirection: "row", alignItems: "center" },
  profileImg: { height: 55, width: 55, borderRadius: 40 },
  serverName: { color: "#fff", fontSize: 18, fontWeight: "700" },
  subText: { color: "#9AA8C7", fontSize: 12 },

  iconRow: { flexDirection: "row", marginLeft: "auto" },
  topIcon: {
    height: 32, width: 32, borderRadius: 16,
    backgroundColor: "#142546",
    justifyContent: "center", alignItems: "center",
    marginLeft: 10,
  },

  btn: {
    marginTop: 12,
    height: 38,
    borderRadius: 14,
    backgroundColor: "#142546",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: { color: "#fff", fontWeight: "700" },

  section: { marginHorizontal: 15, marginTop: 15 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between" },
  sectionTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },

  channelItem: {
    flexDirection: "row", alignItems: "center",
    height: 45, borderRadius: 14,
    backgroundColor: "#0B1B32",
    paddingHorizontal: 15, marginTop: 10,
  },
  channelText: { color: "#fff", fontSize: 15, marginLeft: 10 },

  voiceSubItem: { flexDirection: "row", alignItems: "center", marginTop: 10, marginLeft: 20 },
  voiceText: { color: "#7EA6FF", fontSize: 14, marginLeft: 10 },

  floatingBtn: {
    position: "absolute",
    right: 25, bottom: 80,
    backgroundColor: "#1F4FFF",
    height: 55, width: 55,
    borderRadius: 30,
    justifyContent: "center", alignItems: "center"
  }
});
