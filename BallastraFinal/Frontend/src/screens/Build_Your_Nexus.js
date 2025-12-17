


// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   Modal,
// //   FlatList,
// //   StatusBar,
// //   Image,
// //   ScrollView,
// // } from "react-native";
// // import * as ImagePicker from "expo-image-picker";

// // export default function BuildNexusScreen({ navigation }) {
// //   const [selectedEmoji, setSelectedEmoji] = useState("🤠");
// //   const [avatarImage, setAvatarImage] = useState(null);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [nexusName, setNexusName] = useState("");

// //   const EMOJIS = ["🤠","😎","👑","🔥","⚡","🌟","🚀","🐉","🎯","🌐","🎮","🧠","🤖","💎","💫","🍀","🏆","🐺","🦁","🐯"];

// //   // 🔥 backend icons संबंधित state
// //   const [serverIcons, setServerIcons] = useState([]);
// //   const [iconsLoading, setIconsLoading] = useState(false);
// //   const [uploadingIcon, setUploadingIcon] = useState(false);
// //   const [selectedServerIcon, setSelectedServerIcon] = useState(null); // { id, filename, ... }

// //   // const EMOJIS = [
// //   //   "🤠",
// //   //   "😎",
// //   //   "👑",
// //   //   "🔥",
// //   //   "⚡",
// //   //   "🌟",
// //   //   "🚀",
// //   //   "🐉",
// //   //   "🎯",
// //   //   "🌐",
// //   //   "🎮",
// //   //   "🧠",
// //   //   "🤖",
// //   //   "💎",
// //   //   "💫",
// //   //   "🍀",
// //   //   "🏆",
// //   //   "🐺",
// //   //   "🦁",
// //   //   "🐯",
// //   // ];

// //   // backend icon साठी URL तयार करणे
// //   const getIconUrl = (icon) => {
// //     if (!icon) return null;
// //     // जर icon मध्ये direct url असेल तर ते वापर
// //     if (icon.url) return icon.url;
// //     // नाहीतर filename वापरून path तयार कर (server static route नुसार बदलू शकतोस)
// //     return `${BASE_URL.replace(/\/api$/, "")}/icons/${icon.filename}`;
// //   };

// //   // ✅ GET /icons - server saved icons
// //   const fetchIcons = async () => {
// //     try {
// //       setIconsLoading(true);
// //       const token = await AsyncStorage.getItem("token");

// //       const res = await fetch(`${BASE_URL}/api/nexus/icons/`, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //       });

// //       const json = await res.json().catch(() => ({}));

// //       if (!res.ok || !json.success) {
// //         console.log("listIcons error =>", json.message);
// //         return;
// //       }

// //       setServerIcons(json.data || []);
// //     } catch (err) {
// //       console.log("fetchIcons error =>", err);
// //     } finally {
// //       setIconsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchIcons();
// //   }, []);

// //   // 📤 icon upload => POST /icons
// //   const uploadIconToServer = async (uri) => {
// //     try {
// //       setUploadingIcon(true);
// //       const token = await AsyncStorage.getItem("token");
// //       if (!token) {
// //         Alert.alert("Session expired", "Please log in again.");
// //         return;
// //       }

// //       const formData = new FormData();
// //       formData.append("icon", {
// //         uri,
// //         name: "nexus-icon.jpg",
// //         type: "image/jpeg",
// //       });
// //       formData.append(
// //         "displayName",
// //         nexusName.trim() || "Custom Nexus Icon"
// //       );

// //       const res = await fetch(`${BASE_URL}/icons`, {
// //         method: "POST",
// //         headers: {
// //           // ❗ इथे Content-Type manually सेट करू नकोस (FormData use करताना RN स्वतः boundary लावतो)
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: formData,
// //       });

// //       const json = await res.json().catch(() => ({}));

// //       if (!res.ok || !json.success) {
// //         throw new Error(json.message || "Failed to upload icon.");
// //       }

// //       const icon = json.data;
// //       setSelectedServerIcon(icon);
// //       setAvatarImage(getIconUrl(icon)); // preview ला server url

// //       // list मध्ये ही नवी icon add कर
// //       setServerIcons((prev) => [icon, ...(prev || [])]);
// //     } catch (err) {
// //       console.log("uploadIcon error =>", err);
// //       Alert.alert("Icon upload error", err.message || "Upload failed.");
// //     } finally {
// //       setUploadingIcon(false);
// //     }
// //   };

// //   // 📷 gallery मधून image pick + upload
// //   const pickFromGallery = async () => {
// //     const result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       quality: 1,
// //       allowsEditing: true,
// //     });

// //     if (!result.canceled) {
// //       setAvatarImage(result.assets[0].uri);
// //       setModalVisible(false);
// //     }
// //   };

// //   const handleCreateNexus = () => {
// //     if (!nexusName.trim()) return;

// // <<<<<<< HEAD
// //     navigation.navigate("Share_Profile", {
// //       name: nexusName,
// //       icon: selectedEmoji,
// //       image: avatarImage,
// //     });
// // =======
// //     try {
// //       setLoading(true);

// //       const token = await AsyncStorage.getItem("token");
// //       if (!token) {
// //         Alert.alert("Session expired", "Please log in again.");
// //         setLoading(false);
// //         return;
// //       }

// //       // 👉 backend ला कोणता icon पाठवायचा?
// //       let iconToSend;
// //       if (selectedServerIcon) {
// //         // तुझ्या nexusModel मध्ये icon काय expect करतो त्यानुसार:
// //         // filename store करायचा असेल तर:
// //         iconToSend = selectedServerIcon.filename;
// //         // id store करायचा असेल तर पुढची line use कर:
// //         // iconToSend = selectedServerIcon.id || selectedServerIcon._id;
// //       } else if (avatarImage) {
// //         // fallback – जर काही कारणाने server icon नसेल पण image select असेल
// //         iconToSend = avatarImage;
// //       } else {
// //         // फक्त emoji
// //         iconToSend = selectedEmoji;
// //       }

// //       const url = `${BASE_URL}/api/nexus/`; // BASE_URL मध्ये आधीच /api आहे, म्हणून इथे /api पुन्हा नको
// //       console.log("Create nexus URL =>", url);

// //       const response = await fetch(url, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           name: nexusName.trim(),
// //           type: DEFAULT_TYPE,
// //           icon: iconToSend,
// //           description: DEFAULT_DESCRIPTION,
// //           is_public: DEFAULT_IS_PUBLIC,
// //         }),
// //       });

// //       let json;
// //       try {
// //         json = await response.json();
// //       } catch (e) {
// //         console.log("JSON PARSE ERROR =>", e);
// //         throw new Error(
// //           "Server response is not valid JSON. Check BASE_URL / route / backend error."
// //         );
// //       }

// //       if (!response.ok || !json.success) {
// //         throw new Error(
// //           json.message || `Failed to create nexus (status ${response.status})`
// //         );
// //       }

// //       const createdNexus = json.data;

// //       navigation.navigate("Share_Profile", {
// //         name: createdNexus.name,
// //         icon: createdNexus.icon,
// //         image: avatarImage,
// //         nexusId: createdNexus.id || createdNexus._id,
// //       });
// //     } catch (err) {
// //       console.log("Create nexus error:", err);
// //       Alert.alert(
// //         "Error",
// //         err.message || "Something went wrong. Please try again."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// // >>>>>>> 3c327d12c69018976526da846a7a33cd0922d73d
// //   };

// //   return (
// //     <View style={styles.container}>
// //        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
// //               <Text style={{ color: "#fff", fontSize: 30 }}>‹</Text>
// //             </TouchableOpacity>
// //       <StatusBar barStyle="light-content" backgroundColor="#0B1527" />

// //       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
// //         <Text style={styles.title}>Build Your Nexus</Text>
// //         <Text style={styles.subtitle}>
// //           Your Nexus is your space. Shape it, name it, and{"\n"}make it yours.
// //         </Text>

// //         <TouchableOpacity style={styles.emojiCircle} onPress={() => setModalVisible(true)}>
// //           {avatarImage ? (
// //             <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
// //           ) : (
// //             <Text style={styles.emoji}>{selectedEmoji}</Text>
// //           )}
// //         </TouchableOpacity>

// //         <Text style={styles.chooseIcon}>Choose an Icon</Text>

// //         <Text style={styles.label}>Nexus Name</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Choose your nexus name"
// //           placeholderTextColor="#6B7196"
// //           value={nexusName}
// //           onChangeText={setNexusName}
// //         />

// //         <Text style={styles.guideline}>
// //           By creating a nexus, you agree to ballastra.{" "}
// //           <Text style={styles.link}>Community Guidelines.</Text>
// //         </Text>

// //         {/* Create Button */}
// //         <TouchableOpacity 
// //           style={[styles.createBtn, !nexusName.trim() && styles.createBtnDisabled]} 
// //           onPress={handleCreateNexus}
// //           disabled={!nexusName.trim()}
// //         >
// //           <Text style={styles.createText}>Create Nexus</Text>
// //         </TouchableOpacity>
// //       </ScrollView>

// //       {/* Emoji / Gallery Modal */}
// //       <Modal visible={modalVisible} animationType="slide" transparent>
// //         <View style={styles.modalBg}>
// //           <View style={styles.modalBox}>
// //             <Text style={styles.modalTitle}>Choose an Icon</Text>

// //             <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery}>
// //               <Text style={styles.galleryText}>📷 Add from Gallery</Text>
// //             </TouchableOpacity>

// //             <FlatList
// //               data={EMOJIS}
// //               numColumns={5}
// //               renderItem={({ item }) => (
// //                 <TouchableOpacity
// //                   style={styles.emojiItem}
// //                   onPress={() => {
// //                     setSelectedEmoji(item);
// //                     setAvatarImage(null);
// //                     setModalVisible(false);
// //                   }}
// //                 >
// //                   <Text style={styles.emojiSelect}>{item}</Text>
// //                 </TouchableOpacity>
// //               )}
// //               keyExtractor={(item, index) => index.toString()}
// //               contentContainerStyle={styles.emojiGrid}
// //             />

// //             <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
// //               <Text style={styles.closeText}>Close</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //  container: {
// //     flex: 1,
// //     backgroundColor: '#020b22',
// //     paddingHorizontal: 23,
// //     paddingTop: 50,
// //   },  
  
// //   scrollContent: { flexGrow: 1, 
// //     paddingTop: 28, 
// //   },


// //   title: { color: "#FFFFFF", 
// //     fontSize: 18, 
// //     fontWeight: "700",
// //      textAlign: "center", 
// //      marginBottom: 5
// //     },


// //   subtitle: {
// //      color: "#BDBDBD", fontSize: 12, 
// //      textAlign: "center", 
// //          fontWeight: "400",
// //      lineHeight: 16,
// //       marginBottom: 40 
// //     },

// //   emojiCircle: {
// //     width: 90, 
// //     height: 90, 
// //     borderRadius: 55, 
// //     backgroundColor: "#8CFFC2",
// //     alignSelf: "center", 
// //     justifyContent: "center", 
// //     alignItems: "center", 
// //     marginBottom: 8,
// //   },

// //   backButton: {
// //   width: 50,     // ⭐ increase width
// //   justifyContent: "start",
// //   alignItems: "start",
// // },

// //   emoji: {
// //      fontSize: 62 
// //     },

// //   avatarImage: {
// //      width: 110,
// //       height: 110,
// //        borderRadius: 55 
// //       },
      
// //   chooseIcon: { color: "#BDBDBD",
// //      textAlign: "center", 
// //      fontSize: 12, 
// //      marginBottom: 20,
// //          fontWeight: "500"
// //      },
     
// //   label: { 
// //     color: "#FFFFFF", 
// //     fontSize: 12, 
// //     fontWeight: "500", 
// //     marginBottom: 10
// //    },
   
// //   input: {
// //     backgroundColor: "#3154BA4D",
// //      borderRadius: 14,
// //       padding: 14,
// //        color: "#FFFFFF",
// //     fontSize: 12, 
// //         fontWeight: "500", 
// //     borderWidth: 1, 
// //     borderColor: "#030B2499",
// //   },

// //   guideline: {
// //      fontSize: 8, 
// //              fontWeight: "500", 
// //      color: "#BDBDBD", 
// //      marginTop: 10,
// //       textAlign: "center", 
// //       lineHeight: 18 
// //     },

// //   link: { color: "#3255BA",
// //   fontSize: 8, 
// //   fontWeight: "500", 
// //    },


// //   createBtn: {
// //   backgroundColor: "#2F4E9E",
// //   paddingVertical: 12,
// //   paddingHorizontal: 30,
// //   borderRadius: 14,
// //   marginTop: 60,
// //   shadowColor: "#030B2466",
// //   shadowOffset: { width: 0, height: 4 },
// //   shadowOpacity: 0.3,
// //   shadowRadius: 8,
// //   alignSelf: "center",   
// // },

// //   createBtnDisabled: { opacity: 0.5 },
// //   createText: { 
// //     color: "#FFFFFF", textAlign: "center",
// //      fontSize: 14, 
// //      fontWeight: "500" },
// //   modalBg: {
// //     flex: 1, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "center", alignItems: "center",
// //   },
// //   modalBox: { width: "88%", maxHeight: "70%", backgroundColor: "#1E2B47", borderRadius: 24, padding: 24 },
// //   modalTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: "center" },
// //   galleryBtn: { backgroundColor: "#2F4E9E", padding: 16, borderRadius: 14, alignItems: "center", marginBottom: 20 },
// //   galleryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
// //   emojiItem: { flex: 1, padding: 12, alignItems: "center", justifyContent: "center" },
// //   emojiSelect: { fontSize: 34 },
// //   closeBtn: { marginTop: 16, padding: 16, backgroundColor: "#2A3852", borderRadius: 14 },
// //   closeText: { color: "#FFFFFF", textAlign: "center", fontSize: 15, fontWeight: "600" },
// // });
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   StatusBar,
//   Image,
//   ScrollView,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function BuildNexusScreen({ navigation }) {
//   const [selectedEmoji, setSelectedEmoji] = useState("🤠");
//   const [avatarImage, setAvatarImage] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [nexusName, setNexusName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const EMOJIS = [
//     "🤠","😎","👑","🔥","⚡","🌟","🚀","🐉","🎯","🌐",
//     "🎮","🧠","🤖","💎","💫","🍀","🏆","🐺","🦁","🐯"
//   ];

//   // Backend icons
//   const [serverIcons, setServerIcons] = useState([]);
//   const [iconsLoading, setIconsLoading] = useState(false);
//   const [uploadingIcon, setUploadingIcon] = useState(false);
//   const [selectedServerIcon, setSelectedServerIcon] = useState(null);

//   const getIconUrl = (icon) => {
//     if (!icon) return null;
//     if (icon.url) return icon.url;
//     return `${BASE_URL.replace(/\/api$/, "")}/icons/${icon.filename}`;
//   };

//   const fetchIcons = async () => {
//     try {
//       setIconsLoading(true);
//       const token = await AsyncStorage.getItem("token");

//       const res = await fetch(`${BASE_URL}/api/nexus/icons/`, {
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       const json = await res.json().catch(() => ({}));
//       if (!res.ok || !json.success) {
//         console.log("listIcons error =>", json.message);
//         return;
//       }

//       setServerIcons(json.data || []);
//     } catch (err) {
//       console.log("fetchIcons error =>", err);
//     } finally {
//       setIconsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIcons();
//   }, []);

//   const uploadIconToServer = async (uri) => {
//     try {
//       setUploadingIcon(true);
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         Alert.alert("Session expired", "Please log in again.");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("icon", {
//         uri,
//         name: "nexus-icon.jpg",
//         type: "image/jpeg",
//       });
//       formData.append("displayName", nexusName.trim() || "Custom Nexus Icon");

//       const res = await fetch(`${BASE_URL}/icons`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const json = await res.json().catch(() => ({}));
//       if (!res.ok || !json.success) {
//         throw new Error(json.message || "Failed to upload icon.");
//       }

//       const icon = json.data;
//       setSelectedServerIcon(icon);
//       setAvatarImage(getIconUrl(icon));
//       setServerIcons((prev) => [icon, ...(prev || [])]);
//     } catch (err) {
//       console.log("uploadIcon error =>", err);
//       Alert.alert("Icon upload error", err.message || "Upload failed.");
//     } finally {
//       setUploadingIcon(false);
//     }
//   };

//   const pickFromGallery = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//       allowsEditing: true,
//     });

//     if (!result.canceled) {
//       setAvatarImage(result.assets[0].uri);
//       setModalVisible(false);
//     }
//   };

//   const handleCreateNexus = async () => {
//     if (!nexusName.trim()) return;

//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         Alert.alert("Session expired", "Please log in again.");
//         setLoading(false);
//         return;
//       }

//       let iconToSend;
//       if (selectedServerIcon) {
//         iconToSend = selectedServerIcon.filename;
//       } else if (avatarImage) {
//         iconToSend = avatarImage;
//       } else {
//         iconToSend = selectedEmoji;
//       }

//       const url = `${BASE_URL}/api/nexus/`;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: nexusName.trim(),
//           type: DEFAULT_TYPE,
//           icon: iconToSend,
//           description: DEFAULT_DESCRIPTION,
//           is_public: DEFAULT_IS_PUBLIC,
//         }),
//       });

//       const json = await response.json();
//       if (!response.ok || !json.success) {
//         throw new Error(json.message || `Failed to create nexus`);
//       }

//       const createdNexus = json.data;
//       navigation.navigate("Share_Profile", {
//         name: createdNexus.name,
//         icon: createdNexus.icon,
//         image: avatarImage,
//         nexusId: createdNexus.id || createdNexus._id,
//       });
//     } catch (err) {
//       console.log("Create nexus error:", err);
//       Alert.alert("Error", err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={{ color: "#fff", fontSize: 30 }}>‹</Text>
//       </TouchableOpacity>
//       <StatusBar barStyle="light-content" backgroundColor="#0B1527" />

//       <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>Build Your Nexus</Text>
//         <Text style={styles.subtitle}>
//           Your Nexus is your space. Shape it, name it, and{"\n"}make it yours.
//         </Text>

//         <TouchableOpacity style={styles.emojiCircle} onPress={() => setModalVisible(true)}>
//           {avatarImage ? (
//             <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
//           ) : (
//             <Text style={styles.emoji}>{selectedEmoji}</Text>
//           )}
//         </TouchableOpacity>

//         <Text style={styles.chooseIcon}>Choose an Icon</Text>

//         <Text style={styles.label}>Nexus Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Choose your nexus name"
//           placeholderTextColor="#6B7196"
//           value={nexusName}
//           onChangeText={setNexusName}
//         />

//         <Text style={styles.guideline}>
//           By creating a nexus, you agree to ballastra.{" "}
//           <Text style={styles.link}>Community Guidelines.</Text>
//         </Text>

//         <TouchableOpacity
//           style={[styles.createBtn, !nexusName.trim() && styles.createBtnDisabled]}
//           onPress={handleCreateNexus}
//           disabled={!nexusName.trim() || loading}
//         >
//           <Text style={styles.createText}>Create Nexus</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <View style={styles.modalBg}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalTitle}>Choose an Icon</Text>

//             <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery}>
//               <Text style={styles.galleryText}>📷 Add from Gallery</Text>
//             </TouchableOpacity>

//             <FlatList
//               data={EMOJIS}
//               numColumns={5}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.emojiItem}
//                   onPress={() => {
//                     setSelectedEmoji(item);
//                     setAvatarImage(null);
//                     setModalVisible(false);
//                   }}
//                 >
//                   <Text style={styles.emojiSelect}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               keyExtractor={(item, index) => index.toString()}
//               contentContainerStyle={styles.emojiGrid}
//             />

//             <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#020b22", paddingHorizontal: 23, paddingTop: 50 },
//   scrollContent: { flexGrow: 1, paddingTop: 28 },
//   title: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 5 },
//   subtitle: { color: "#BDBDBD", fontSize: 12, textAlign: "center", fontWeight: "400", lineHeight: 16, marginBottom: 40 },
//   emojiCircle: { width: 90, height: 90, borderRadius: 55, backgroundColor: "#8CFFC2", alignSelf: "center", justifyContent: "center", alignItems: "center", marginBottom: 8 },
//   backButton: { width: 50, justifyContent: "flex-start", alignItems: "flex-start" },
//   emoji: { fontSize: 62 },
//   avatarImage: { width: 110, height: 110, borderRadius: 55 },
//   chooseIcon: { color: "#BDBDBD", textAlign: "center", fontSize: 12, marginBottom: 20, fontWeight: "500" },
//   label: { color: "#FFFFFF", fontSize: 12, fontWeight: "500", marginBottom: 10 },
//   input: { backgroundColor: "#3154BA4D", borderRadius: 14, padding: 14, color: "#FFFFFF", fontSize: 12, fontWeight: "500", borderWidth: 1, borderColor: "#030B2499" },
//   guideline: { fontSize: 8, fontWeight: "500", color: "#BDBDBD", marginTop: 10, textAlign: "center", lineHeight: 18 },
//   link: { color: "#3255BA", fontSize: 8, fontWeight: "500" },
//   createBtn: { backgroundColor: "#2F4E9E", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 14, marginTop: 60, shadowColor: "#030B2466", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, alignSelf: "center" },
//   createBtnDisabled: { opacity: 0.5 },
//   createText: { color: "#FFFFFF", textAlign: "center", fontSize: 14, fontWeight: "500" },
//   modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "center", alignItems: "center" },
//   modalBox: { width: "88%", maxHeight: "70%", backgroundColor: "#1E2B47", borderRadius: 24, padding: 24 },
//   modalTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: "center" },
//   galleryBtn: { backgroundColor: "#2F4E9E", padding: 16, borderRadius: 14, alignItems: "center", marginBottom: 20 },
//   galleryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
//   emojiItem: { flex: 1, padding: 12, alignItems: "center", justifyContent: "center" },
//   emojiSelect: { fontSize: 34 },
//   closeBtn: { marginTop: 16, padding: 16, backgroundColor: "#2A3852", borderRadius: 14 },
//   closeText: { color: "#FFFFFF", textAlign: "center", fontSize: 15, fontWeight: "600" },
// });






import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function BuildNexusScreen({ navigation }) {
  const [selectedEmoji, setSelectedEmoji] = useState("🤠");
  const [avatarImage, setAvatarImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nexusName, setNexusName] = useState("");

  const EMOJIS = ["🤠","😎","👑","🔥","⚡","🌟","🚀","🐉","🎯","🌐","🎮","🧠","🤖","💎","💫","🍀","🏆","🐺","🦁","🐯"];

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setAvatarImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const handleCreateNexus = () => {
    if (!nexusName.trim()) return;

    navigation.navigate("Share_Profile", {
      name: nexusName,
      icon: selectedEmoji,
      image: avatarImage,
    });
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={{ color: "#fff", fontSize: 30 }}>‹</Text>
            </TouchableOpacity>
      <StatusBar barStyle="light-content" backgroundColor="#0B1527" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Build Your Nexus</Text>
        <Text style={styles.subtitle}>
          Your Nexus is your space. Shape it, name it, and{"\n"}make it yours.
        </Text>

        <TouchableOpacity style={styles.emojiCircle} onPress={() => setModalVisible(true)}>
          {avatarImage ? (
            <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.emoji}>{selectedEmoji}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.chooseIcon}>Choose an Icon</Text>

        <Text style={styles.label}>Nexus Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose your nexus name"
          placeholderTextColor="#6B7196"
          value={nexusName}
          onChangeText={setNexusName}
        />

        <Text style={styles.guideline}>
          By creating a nexus, you agree to ballastra.{" "}
          <Text style={styles.link}>Community Guidelines.</Text>
        </Text>

        {/* Create Button */}
        <TouchableOpacity 
          style={[styles.createBtn, !nexusName.trim() && styles.createBtnDisabled]} 
          onPress={handleCreateNexus}
          disabled={!nexusName.trim()}
        >
          <Text style={styles.createText}>Create Nexus</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Emoji / Gallery Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose an Icon</Text>

            <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery}>
              <Text style={styles.galleryText}>📷 Add from Gallery</Text>
            </TouchableOpacity>

            <FlatList
              data={EMOJIS}
              numColumns={5}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emojiItem}
                  onPress={() => {
                    setSelectedEmoji(item);
                    setAvatarImage(null);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.emojiSelect}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.emojiGrid}
            />

            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#020b22',
    paddingHorizontal: 23,
    paddingTop: 50,
  },  
  
  scrollContent: { flexGrow: 1, 
    paddingTop: 28, 
  },


  title: { color: "#FFFFFF", 
    fontSize: 18, 
    fontWeight: "700",
     textAlign: "center", 
     marginBottom: 5
    },


  subtitle: {
     color: "#BDBDBD", fontSize: 12, 
     textAlign: "center", 
         fontWeight: "400",
     lineHeight: 16,
      marginBottom: 40 
    },

  emojiCircle: {
    width: 90, 
    height: 90, 
    borderRadius: 55, 
    backgroundColor: "#8CFFC2",
    alignSelf: "center", 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 8,
  },

  backButton: {
  width: 50,     // ⭐ increase width
  justifyContent: "start",
  alignItems: "start",
},

  emoji: {
     fontSize: 62 
    },

  avatarImage: {
     width: 110,
      height: 110,
       borderRadius: 55 
      },
      
  chooseIcon: { color: "#BDBDBD",
     textAlign: "center", 
     fontSize: 12, 
     marginBottom: 20,
         fontWeight: "500"
     },
     
  label: { 
    color: "#FFFFFF", 
    fontSize: 12, 
    fontWeight: "500", 
    marginBottom: 10
   },
   
  input: {
    backgroundColor: "#3154BA4D",
     borderRadius: 14,
      padding: 14,
       color: "#FFFFFF",
    fontSize: 12, 
        fontWeight: "500", 
    borderWidth: 1, 
    borderColor: "#030B2499",
  },

  guideline: {
     fontSize: 8, 
             fontWeight: "500", 
     color: "#BDBDBD", 
     marginTop: 10,
      textAlign: "center", 
      lineHeight: 18 
    },

  link: { color: "#3255BA",
  fontSize: 8, 
  fontWeight: "500", 
   },


  createBtn: {
  backgroundColor: "#2F4E9E",
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 14,
  marginTop: 60,
  shadowColor: "#030B2466",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  alignSelf: "center",   
},

  createBtnDisabled: { opacity: 0.5 },
  createText: { 
    color: "#FFFFFF", textAlign: "center",
     fontSize: 14, 
     fontWeight: "500" },
  modalBg: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "center", alignItems: "center",
  },
  modalBox: { width: "88%", maxHeight: "70%", backgroundColor: "#1E2B47", borderRadius: 24, padding: 24 },
  modalTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  galleryBtn: { backgroundColor: "#2F4E9E", padding: 16, borderRadius: 14, alignItems: "center", marginBottom: 20 },
  galleryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  emojiItem: { flex: 1, padding: 12, alignItems: "center", justifyContent: "center" },
  emojiSelect: { fontSize: 34 },
  closeBtn: { marginTop: 16, padding: 16, backgroundColor: "#2A3852", borderRadius: 14 },
  closeText: { color: "#FFFFFF", textAlign: "center", fontSize: 15, fontWeight: "600" },
});
