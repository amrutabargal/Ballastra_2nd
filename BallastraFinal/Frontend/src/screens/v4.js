// // // import React, { useRef, useEffect, useState } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Animated,
// // //   ScrollView,
// // //   Image,
// // //   Dimensions,
// // //   StatusBar,
// // //   SafeAreaView,
// // //   Platform,
// // // } from "react-native";
// // // import { useNavigation } from "@react-navigation/native";

// // // const { width, height } = Dimensions.get("window");

// // // export default function LanguageSelection() {
// // //   const navigation = useNavigation();

// // //   const rightAnim = useRef(new Animated.Value(100)).current;
// // //   const leftAnim = useRef(new Animated.Value(-100)).current;

// // //   const [selectedLang, setSelectedLang] = useState("English (uk)");

// // //   useEffect(() => {
// // //     Animated.timing(rightAnim, {
// // //       toValue: 0,
// // //       duration: 800,
// // //       useNativeDriver: true,
// // //     }).start();

// // //     Animated.timing(leftAnim, {
// // //       toValue: 0,
// // //       duration: 800,
// // //       useNativeDriver: true,
// // //     }).start();
// // //   }, []);

// // //   const languages = [
// // //     { flag: "🇬🇧", name: "English (uk)", native: "(English)" },
// // //     { flag: "🇮🇳", name: "India", native: "(हिन्दी)" },
// // //     { flag: "🇪🇬", name: "Egypt (Syria)", native: "(العربية)" },
// // //     { flag: "🇧🇩", name: "Bangladesh", native: "(বাংলাদেশ)" },
// // //     { flag: "🇳🇵", name: "Nepal", native: "(नेपाल)" },
// // //   ];

// // //   return (
// // //     <SafeAreaView style={styles.safe}>
// // //       <StatusBar hidden />

// // //       <View style={styles.container}>
// // //         {/* WELCOME IMAGE */}
// // //         <View style={styles.logoWrapper}>
// // //           <Image
// // //             source={require("../../assets/Text.png")}
// // //             style={styles.welcomeLabel}
// // //             resizeMode="contain"
// // //           />
// // //         </View>

// // //         {/* RIGHT character + bubble */}
// // //         <Animated.View
// // //           style={[
// // //             styles.rightCharacter,
// // //             { transform: [{ translateX: rightAnim }] },
// // //           ]}
// // //         >
// // //           <View style={styles.rightBubbleWrap}>
// // //             <Text style={styles.rightBubble}>Sprache</Text>
// // //           </View>
// // //           <Image
// // //             source={require("../../assets/Frame 68.png")}
// // //             style={styles.characterImgRight}
// // //             resizeMode="contain"
// // //           />
// // //         </Animated.View>

// // //         {/* LANGUAGE LIST */}
// // //         <ScrollView
// // //           style={styles.languageList}
// // //           contentContainerStyle={{
// // //             paddingBottom: height * 0.32,
// // //           }}
// // //           showsVerticalScrollIndicator={false}
// // //         >
// // //           {languages.map((item, index) => {
// // //             const isSelected = selectedLang === item.name;
// // //             return (
// // //               <TouchableOpacity
// // //                 key={item.name}
// // //                 activeOpacity={0.85}
// // //                 onPress={() => setSelectedLang(item.name)}
// // //                 style={[
// // //                   styles.languageItem,
// // //                   index === 0 && styles.languageItemFirst,
// // //                   isSelected && styles.languageItemSelected,
// // //                 ]}
// // //               >
// // //                 <View style={styles.languageLeft}>
// // //                   <Text style={styles.flag}>{item.flag}</Text>
// // //                   <Text style={styles.languageName}>{item.name}</Text>
// // //                 </View>
// // //                 <Text style={styles.languageNative}>{item.native}</Text>
// // //               </TouchableOpacity>
// // //             );
// // //           })}
// // //         </ScrollView>

// // //         {/* LEFT character + bubble */}
// // //         <Animated.View
// // //           style={[styles.leftCharacter, { transform: [{ translateX: leftAnim }] }]}
// // //         >
// // //           <View style={styles.leftBubbleWrap}>
// // //             <Text style={styles.leftBubble}>Language</Text>
// // //           </View>
// // //           <Image
// // //             source={require("../../assets/Frame 67.png")}
// // //             style={styles.characterImgLeft}
// // //             resizeMode="contain"
// // //           />
// // //         </Animated.View>

// // //         {/* BOTTOM area – Next button */}
// // //         <View style={styles.bottomArea}>
// // //           <TouchableOpacity
// // //             activeOpacity={0.9}
// // //             style={styles.nextButton}
// // //             onPress={() => navigation.navigate("signin_up")}
// // //           >
// // //             <Text style={styles.nextText}>Next</Text>
// // //             <Text style={styles.arrow}>→</Text>
// // //           </TouchableOpacity>

// // //           <Text style={styles.helperText}>
// // //             Choose how Ballastra speaks to you.
// // //           </Text>
// // //         </View>
// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   safe: {
// // //     flex: 1,
// // //     backgroundColor: "#050B18",
// // //   },

// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#050B18",
// // //     paddingHorizontal: 26,
// // //     overflow: "hidden",
// // //   },

// // //   /* WELCOME IMAGE */
// // //   logoWrapper: {
// // //     marginTop: height * 0.025,
// // //     alignItems: "center",
// // //   },
// // //   welcomeLabel: {
// // //     width: width * 0.70,
// // //     height: height * 0.085,
// // //   },

// // //   /* RIGHT CHARACTER */
// // //   rightCharacter: {
// // //     position: "absolute",
// // //     top: height * 0.10,
// // //     right: -12,
// // //     alignItems: "center",
// // //     zIndex: 10,
// // //   },
// // //   rightBubbleWrap: {
// // //     marginRight: 8,
// // //   },
// // //   rightBubble: {
// // //     backgroundColor: "#1B3C73",
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 7,
// // //     borderRadius: 20,
// // //     fontSize: 13,
// // //     color: "#fff",
// // //   },
// // //   characterImgRight: {
// // //     width: width * 0.30,
// // //     height: width * 0.30,
// // //     marginTop: 4,
// // //   },

// // //   /* LEFT CHARACTER */
// // //   leftCharacter: {
// // //     position: "absolute",
// // //     bottom: height * 0.14,
// // //     left: -10,
// // //     alignItems: "center",
// // //     zIndex: 10,
// // //   },
// // //   leftBubbleWrap: {
// // //     marginLeft: 8,
// // //   },
// // //   leftBubble: {
// // //     backgroundColor: "#1B3C73",
// // //     paddingHorizontal: 18,
// // //     paddingVertical: 7,
// // //     borderRadius: 20,
// // //     fontSize: 13,
// // //     color: "#fff",
// // //   },
// // //   characterImgLeft: {
// // //     width: width * 0.34,
// // //     height: width * 0.34,
// // //     marginTop: 4,
// // //   },

// // //   /* LANGUAGE LIST */
// // //   languageList: {
// // //     marginTop: height * 0.17,
// // //   },

// // //   languageItem: {
// // //     width: "100%",
// // //     borderRadius: 20,
// // //     paddingVertical: 15,
// // //     paddingHorizontal: 20,
// // //     marginBottom: 14,
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",

// // //     borderWidth: 1,
// // //     borderColor: "rgba(41,113,255,0.25)",
// // //     backgroundColor: "rgba(38,78,138,0.20)",
// // //   },

// // //   languageItemFirst: {
// // //     marginTop: 6,
// // //   },

// // //   languageItemSelected: {
// // //     backgroundColor: "rgba(16,33,73,0.90)",
// // //     borderColor: "#2D57C8",
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 6 },
// // //     shadowOpacity: 0.20,
// // //     shadowRadius: 8,
// // //     elevation: 8,
// // //   },

// // //   languageLeft: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   flag: {
// // //     fontSize: 26,
// // //     marginRight: 14,
// // //   },
// // //   languageName: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //   },
// // //   languageNative: {
// // //     color: "rgba(255,255,255,0.80)",
// // //     fontSize: 14,
// // //   },

// // //   /* BOTTOM */
// // //   bottomArea: {
// // //     position: "absolute",
// // //     bottom: height * 0.04,
// // //     width: "100%",
// // //     alignItems: "center",
// // //   },
// // //   nextButton: {
// // //     width: width * 0.44,
// // //     height: height * 0.06,
// // //     borderRadius: 30,
// // //     backgroundColor: "#316BFF",
// // //     flexDirection: "row",
// // //     justifyContent: "center",
// // //     alignItems: "center",

// // //     shadowColor: "#316BFF",
// // //     shadowOffset: { width: 0, height: 8 },
// // //     shadowOpacity: 0.2,
// // //     shadowRadius: 12,
// // //     elevation: 10,
// // //   },
// // //   nextText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "700",
// // //   },
// // //   arrow: {
// // //     color: "#fff",
// // //     fontSize: 18,
// // //     marginLeft: 8,
// // //   },
// // //   helperText: {
// // //     marginTop: 10,
// // //     color: "rgba(255,255,255,0.70)",
// // //     fontSize: 13,
// // //   },
// // // });
// // // LanguageSelectionWithFilter.js
// // // import React, { useRef, useEffect, useState } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Animated,
// // //   ScrollView,
// // //   Image,
// // //   Dimensions,
// // //   StatusBar,
// // //   SafeAreaView,
// // //   Platform,
// // //   Modal,
// // // } from "react-native";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { Ionicons } from "@expo/vector-icons";

// // // const { width, height } = Dimensions.get("window");

// // // export default function LanguageSelection() {
// // //   const navigation = useNavigation();

// // //   const rightAnim = useRef(new Animated.Value(100)).current;
// // //   const leftAnim = useRef(new Animated.Value(-100)).current;

// // //   const [selectedLang, setSelectedLang] = useState("English (uk)");

// // //   // Filter popup state
// // //   const [filterVisible, setFilterVisible] = useState(false);
// // //   const [newMembers, setNewMembers] = useState(true);
// // //   const [oldMembers, setOldMembers] = useState(false);

// // //   useEffect(() => {
// // //     Animated.timing(rightAnim, {
// // //       toValue: 0,
// // //       duration: 800,
// // //       useNativeDriver: true,
// // //     }).start();

// // //     Animated.timing(leftAnim, {
// // //       toValue: 0,
// // //       duration: 800,
// // //       useNativeDriver: true,
// // //     }).start();
// // //   }, []);

// // //   const languages = [
// // //     { flag: "🇬🇧", name: "English (uk)", native: "(English)" },
// // //     { flag: "🇮🇳", name: "India", native: "(हिन्दी)" },
// // //     { flag: "🇪🇬", name: "Egypt (Syria)", native: "(العربية)" },
// // //     { flag: "🇧🇩", name: "Bangladesh", native: "(বাংলাদেশ)" },
// // //     { flag: "🇳🇵", name: "Nepal", native: "(नेपाल)" },
// // //   ];

// // //   return (
// // //     <SafeAreaView style={styles.safe}>
// // //       <StatusBar hidden />
// // //       <View style={styles.container}>
// // //         {/* FILTER BUTTON (top-right) */}
// // //         <TouchableOpacity
// // //           activeOpacity={0.9}
// // //           style={styles.filterBtn}
// // //           onPress={() => setFilterVisible(true)}
// // //         >
// // //           <Ionicons name="funnel" size={18} color="#CFE0FF" />
// // //         </TouchableOpacity>

// // //         {/* WELCOME IMAGE */}
// // //         <View style={styles.logoWrapper}>
// // //           <Image
// // //             source={require("../../assets/Text.png")}
// // //             style={styles.welcomeLabel}
// // //             resizeMode="contain"
// // //           />
// // //         </View>

// // //         {/* RIGHT character + bubble */}
// // //         <Animated.View
// // //           style={[
// // //             styles.rightCharacter,
// // //             { transform: [{ translateX: rightAnim }] },
// // //           ]}
// // //         >
// // //           <View style={styles.rightBubbleWrap}>
// // //             <Text style={styles.rightBubble}>Sprache</Text>
// // //           </View>
// // //           <Image
// // //             source={require("../../assets/Frame 68.png")}
// // //             style={styles.characterImgRight}
// // //             resizeMode="contain"
// // //           />
// // //         </Animated.View>

// // //         {/* LANGUAGE LIST */}
// // //         <ScrollView
// // //           style={styles.languageList}
// // //           contentContainerStyle={{
// // //             paddingBottom: height * 0.32,
// // //           }}
// // //           showsVerticalScrollIndicator={false}
// // //         >
// // //           {languages.map((item, index) => {
// // //             const isSelected = selectedLang === item.name;
// // //             return (
// // //               <TouchableOpacity
// // //                 key={item.name}
// // //                 activeOpacity={0.85}
// // //                 onPress={() => setSelectedLang(item.name)}
// // //                 style={[
// // //                   styles.languageItem,
// // //                   index === 0 && styles.languageItemFirst,
// // //                   isSelected && styles.languageItemSelected,
// // //                 ]}
// // //               >
// // //                 <View style={styles.languageLeft}>
// // //                   <Text style={styles.flag}>{item.flag}</Text>
// // //                   <Text style={styles.languageName}>{item.name}</Text>
// // //                 </View>
// // //                 <Text style={styles.languageNative}>{item.native}</Text>
// // //               </TouchableOpacity>
// // //             );
// // //           })}
// // //         </ScrollView>

// // //         {/* LEFT character + bubble */}
// // //         <Animated.View
// // //           style={[styles.leftCharacter, { transform: [{ translateX: leftAnim }] }]}
// // //         >
// // //           <View style={styles.leftBubbleWrap}>
// // //             <Text style={styles.leftBubble}>Language</Text>
// // //           </View>
// // //           <Image
// // //             source={require("../../assets/Frame 67.png")}
// // //             style={styles.characterImgLeft}
// // //             resizeMode="contain"
// // //           />
// // //         </Animated.View>

// // //         {/* BOTTOM area – Next button */}
// // //         <View style={styles.bottomArea}>
// // //           <TouchableOpacity
// // //             activeOpacity={0.9}
// // //             style={styles.nextButton}
// // //             onPress={() => navigation.navigate("signin_up")}
// // //           >
// // //             <Text style={styles.nextText}>Next</Text>
// // //             <Text style={styles.arrow}>→</Text>
// // //           </TouchableOpacity>

// // //           <Text style={styles.helperText}>
// // //             Choose how Ballastra speaks to you.
// // //           </Text>
// // //         </View>

// // //         {/* --- FILTER POPUP --- */}
// // //         <FilterPopup
// // //           visible={filterVisible}
// // //           onClose={() => setFilterVisible(false)}
// // //           newMembers={newMembers}
// // //           oldMembers={oldMembers}
// // //           setNewMembers={setNewMembers}
// // //           setOldMembers={setOldMembers}
// // //         />
// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // /* -------------------------
// // //    FilterPopup component
// // //    ------------------------- */
// // // function FilterPopup({
// // //   visible,
// // //   onClose,
// // //   newMembers,
// // //   oldMembers,
// // //   setNewMembers,
// // //   setOldMembers,
// // // }) {
// // //   const fadeAnim = useRef(new Animated.Value(0)).current;
// // //   const translateY = useRef(new Animated.Value(20)).current;

// // //   useEffect(() => {
// // //     if (visible) {
// // //       Animated.parallel([
// // //         Animated.timing(fadeAnim, {
// // //           toValue: 1,
// // //           duration: 220,
// // //           useNativeDriver: true,
// // //         }),
// // //         Animated.timing(translateY, {
// // //           toValue: 0,
// // //           duration: 220,
// // //           useNativeDriver: true,
// // //         }),
// // //       ]).start();
// // //     } else {
// // //       Animated.parallel([
// // //         Animated.timing(fadeAnim, {
// // //           toValue: 0,
// // //           duration: 180,
// // //           useNativeDriver: true,
// // //         }),
// // //         Animated.timing(translateY, {
// // //           toValue: 20,
// // //           duration: 180,
// // //           useNativeDriver: true,
// // //         }),
// // //       ]).start();
// // //     }
// // //   }, [visible]);

// // //   return (
// // //     <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
// // //       <View style={fpStyles.overlay}>
// // //         <TouchableOpacity style={fpStyles.backdrop} activeOpacity={1} onPress={onClose} />
// // //         <Animated.View
// // //           style={[
// // //             fpStyles.card,
// // //             {
// // //               opacity: fadeAnim,
// // //               transform: [{ translateY }],
// // //             },
// // //           ]}
// // //         >
// // //           <View style={fpStyles.header}>
// // //             <Text style={fpStyles.headerTitle}>Filters</Text>
// // //             <TouchableOpacity onPress={onClose} style={fpStyles.closeBtn}>
// // //               <Ionicons name="close" size={18} color="#B8C6FF" />
// // //             </TouchableOpacity>
// // //           </View>

// // //           <View style={fpStyles.list}>
// // //             {/* New Members row */}
// // //             <View style={fpStyles.row}>
// // //               <View style={fpStyles.left}>
// // //                 <View style={fpStyles.iconWrap}>
// // //                   <Ionicons name="person-add" size={16} color="#CFE0FF" />
// // //                 </View>
// // //                 <Text style={fpStyles.label}>New Members</Text>
// // //               </View>
// // //               <CustomToggle value={newMembers} onToggle={setNewMembers} />
// // //             </View>

// // //             {/* Old Members row */}
// // //             <View style={fpStyles.row}>
// // //               <View style={fpStyles.left}>
// // //                 <View style={fpStyles.iconWrap}>
// // //                   <Ionicons name="people" size={16} color="#CFE0FF" />
// // //                 </View>
// // //                 <Text style={fpStyles.label}>Old Members</Text>
// // //               </View>
// // //               <CustomToggle value={oldMembers} onToggle={setOldMembers} />
// // //             </View>
// // //           </View>
// // //         </Animated.View>
// // //       </View>
// // //     </Modal>
// // //   );
// // // }

// // // /* --- Custom animated toggle (pill) --- */
// // // function CustomToggle({ value = false, onToggle = () => {} }) {
// // //   const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

// // //   useEffect(() => {
// // //     Animated.timing(anim, {
// // //       toValue: value ? 1 : 0,
// // //       duration: 200,
// // //       useNativeDriver: false,
// // //     }).start();
// // //   }, [value]);

// // //   const translateX = anim.interpolate({
// // //     inputRange: [0, 1],
// // //     outputRange: [2, 24],
// // //   });
// // //   const bg = anim.interpolate({
// // //     inputRange: [0, 1],
// // //     outputRange: ["rgba(255,255,255,0.06)", "#2D57C8"],
// // //   });

// // //   return (
// // //     <TouchableOpacity activeOpacity={0.9} onPress={() => onToggle(!value)} style={fpStyles.toggleTouchable}>
// // //       <Animated.View style={[fpStyles.toggleTrack, { backgroundColor: bg }]}>
// // //         <Animated.View style={[fpStyles.toggleKnob, { transform: [{ translateX }] }]} />
// // //       </Animated.View>
// // //     </TouchableOpacity>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   safe: {
// // //     flex: 1,
// // //     backgroundColor: "#050B18",
// // //   },

// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#050B18",
// // //     paddingHorizontal: 26,
// // //     overflow: "hidden",
// // //   },

// // //   /* FILTER BUTTON */
// // //   filterBtn: {
// // //     position: "absolute",
// // //     top: height * 0.03,
// // //     right: 22,
// // //     zIndex: 20,
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 10,
// // //     backgroundColor: "rgba(11,24,45,0.6)",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     borderWidth: 1,
// // //     borderColor: "rgba(58,88,160,0.12)",
// // //   },

// // //   /* WELCOME IMAGE */
// // //   logoWrapper: {
// // //     marginTop: height * 0.025,
// // //     alignItems: "center",
// // //   },
// // //   welcomeLabel: {
// // //     width: width * 0.70,
// // //     height: height * 0.085,
// // //   },

// // //   /* RIGHT CHARACTER */
// // //   rightCharacter: {
// // //     position: "absolute",
// // //     top: height * 0.10,
// // //     right: -12,
// // //     alignItems: "center",
// // //     zIndex: 10,
// // //   },
// // //   rightBubbleWrap: {
// // //     marginRight: 8,
// // //   },
// // //   rightBubble: {
// // //     backgroundColor: "#1B3C73",
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 7,
// // //     borderRadius: 20,
// // //     fontSize: 13,
// // //     color: "#fff",
// // //   },
// // //   characterImgRight: {
// // //     width: width * 0.30,
// // //     height: width * 0.30,
// // //     marginTop: 4,
// // //   },

// // //   /* LEFT CHARACTER */
// // //   leftCharacter: {
// // //     position: "absolute",
// // //     bottom: height * 0.14,
// // //     left: -10,
// // //     alignItems: "center",
// // //     zIndex: 10,
// // //   },
// // //   leftBubbleWrap: {
// // //     marginLeft: 8,
// // //   },
// // //   leftBubble: {
// // //     backgroundColor: "#1B3C73",
// // //     paddingHorizontal: 18,
// // //     paddingVertical: 7,
// // //     borderRadius: 20,
// // //     fontSize: 13,
// // //     color: "#fff",
// // //   },
// // //   characterImgLeft: {
// // //     width: width * 0.34,
// // //     height: width * 0.34,
// // //     marginTop: 4,
// // //   },

// // //   /* LANGUAGE LIST */
// // //   languageList: {
// // //     marginTop: height * 0.17,
// // //   },

// // //   languageItem: {
// // //     width: "100%",
// // //     borderRadius: 20,
// // //     paddingVertical: 15,
// // //     paddingHorizontal: 20,
// // //     marginBottom: 14,
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",

// // //     borderWidth: 1,
// // //     borderColor: "rgba(41,113,255,0.25)",
// // //     backgroundColor: "rgba(38,78,138,0.20)",
// // //   },

// // //   languageItemFirst: {
// // //     marginTop: 6,
// // //   },

// // //   languageItemSelected: {
// // //     backgroundColor: "rgba(16,33,73,0.90)",
// // //     borderColor: "#2D57C8",
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 6 },
// // //     shadowOpacity: 0.20,
// // //     shadowRadius: 8,
// // //     elevation: 8,
// // //   },

// // //   languageLeft: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   flag: {
// // //     fontSize: 26,
// // //     marginRight: 14,
// // //   },
// // //   languageName: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //   },
// // //   languageNative: {
// // //     color: "rgba(255,255,255,0.80)",
// // //     fontSize: 14,
// // //   },

// // //   /* BOTTOM */
// // //   bottomArea: {
// // //     position: "absolute",
// // //     bottom: height * 0.04,
// // //     width: "100%",
// // //     alignItems: "center",
// // //   },
// // //   nextButton: {
// // //     width: width * 0.44,
// // //     height: height * 0.06,
// // //     borderRadius: 30,
// // //     backgroundColor: "#316BFF",
// // //     flexDirection: "row",
// // //     justifyContent: "center",
// // //     alignItems: "center",

// // //     shadowColor: "#316BFF",
// // //     shadowOffset: { width: 0, height: 8 },
// // //     shadowOpacity: 0.2,
// // //     shadowRadius: 12,
// // //     elevation: 10,
// // //   },
// // //   nextText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "700",
// // //   },
// // //   arrow: {
// // //     color: "#fff",
// // //     fontSize: 18,
// // //     marginLeft: 8,
// // //   },
// // //   helperText: {
// // //     marginTop: 10,
// // //     color: "rgba(255,255,255,0.70)",
// // //     fontSize: 13,
// // //   },
// // // });

// // // /* --- Filter popup styles --- */
// // // const fpStyles = StyleSheet.create({
// // //   overlay: {
// // //     flex: 1,
// // //     backgroundColor: "transparent",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   backdrop: {
// // //     ...StyleSheet.absoluteFillObject,
// // //     backgroundColor: "rgba(3,6,12,0.6)",
// // //   },

// // //   card: {
// // //     width: Math.min(width * 0.9, 360),
// // //     borderRadius: 14,
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 12,
// // //     backgroundColor: "#071129",
// // //     borderWidth: 1,
// // //     borderColor: "rgba(58,88,160,0.18)",
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 8 },
// // //     shadowOpacity: 0.35,
// // //     shadowRadius: 16,
// // //     elevation: 12,
// // //   },

// // //   header: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     paddingHorizontal: 6,
// // //     marginBottom: 6,
// // //   },
// // //   headerTitle: {
// // //     color: "#CFE0FF",
// // //     fontSize: 14,
// // //     fontWeight: "700",
// // //   },
// // //   closeBtn: {
// // //     padding: 6,
// // //     borderRadius: 8,
// // //   },

// // //   list: {
// // //     marginTop: 8,
// // //   },

// // //   row: {
// // //     width: "100%",
// // //     borderRadius: 12,
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 10,
// // //     marginBottom: 10,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     backgroundColor: "rgba(9,20,40,0.6)",
// // //     borderWidth: 1,
// // //     borderColor: "rgba(41,113,255,0.06)",
// // //   },

// // //   left: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   iconWrap: {
// // //     width: 34,
// // //     height: 34,
// // //     borderRadius: 10,
// // //     backgroundColor: "rgba(47,78,140,0.18)",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     marginRight: 10,
// // //   },
// // //   label: {
// // //     color: "#E6EEFF",
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //   },

// // //   /* Toggle */
// // //   toggleTouchable: {
// // //     padding: 6,
// // //   },
// // //   toggleTrack: {
// // //     width: 48,
// // //     height: 26,
// // //     borderRadius: 20,
// // //     padding: 2,
// // //     justifyContent: "center",
// // //   },
// // //   toggleKnob: {
// // //     width: 20,
// // //     height: 20,
// // //     borderRadius: 12,
// // //     backgroundColor: "#FFF",
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.18,
// // //     shadowRadius: 4,
// // //     elevation: Platform.OS === "android" ? 4 : 0,
// // //   },
// // // });
// // // LanguageSelectionWithFilter.js
// // import React, { useRef, useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Animated,
// //   ScrollView,
// //   Image,
// //   Dimensions,
// //   StatusBar,
// //   SafeAreaView,
// //   Platform,
// //   Modal,
// // } from "react-native";
// // import { useNavigation } from "@react-navigation/native";
// // import { Ionicons } from "@expo/vector-icons";
// // import DateTimePicker from "@react-native-datetimepicker/datetimepicker";

// // const { width, height } = Dimensions.get("window");

// // export default function LanguageSelection() {
// //   const navigation = useNavigation();

// //   const rightAnim = useRef(new Animated.Value(100)).current;
// //   const leftAnim = useRef(new Animated.Value(-100)).current;

// //   const [selectedLang, setSelectedLang] = useState("English (uk)");

// //   // Filter popup state
// //   const [filterVisible, setFilterVisible] = useState(false);
// //   const [newMembers, setNewMembers] = useState(true);
// //   const [oldMembers, setOldMembers] = useState(false);
// //   const [selectedDate, setSelectedDate] = useState(null);

// //   useEffect(() => {
// //     Animated.timing(rightAnim, {
// //       toValue: 0,
// //       duration: 800,
// //       useNativeDriver: true,
// //     }).start();

// //     Animated.timing(leftAnim, {
// //       toValue: 0,
// //       duration: 800,
// //       useNativeDriver: true,
// //     }).start();
// //   }, []);

// //   const languages = [
// //     { flag: "🇬🇧", name: "English (uk)", native: "(English)" },
// //     { flag: "🇮🇳", name: "India", native: "(हिन्दी)" },
// //     { flag: "🇪🇬", name: "Egypt (Syria)", native: "(العربية)" },
// //     { flag: "🇧🇩", name: "Bangladesh", native: "(বাংলাদেশ)" },
// //     { flag: "🇳🇵", name: "Nepal", native: "(नेपाल)" },
// //   ];

// //   return (
// //     <SafeAreaView style={styles.safe}>
// //       <StatusBar hidden />
// //       <View style={styles.container}>
// //         {/* FILTER BUTTON (top-right) */}
// //         <TouchableOpacity
// //           activeOpacity={0.9}
// //           style={styles.filterBtn}
// //           onPress={() => setFilterVisible(true)}
// //         >
// //           <Ionicons name="filter" size={18} color="#CFE0FF" />
// //         </TouchableOpacity>

// //         {/* WELCOME IMAGE */}
// //         <View style={styles.logoWrapper}>
// //           <Image
// //             source={require("../../assets/Text.png")}
// //             style={styles.welcomeLabel}
// //             resizeMode="contain"
// //           />
// //         </View>

// //         {/* RIGHT character + bubble */}
// //         <Animated.View
// //           style={[
// //             styles.rightCharacter,
// //             { transform: [{ translateX: rightAnim }] },
// //           ]}
// //         >
// //           <View style={styles.rightBubbleWrap}>
// //             <Text style={styles.rightBubble}>Sprache</Text>
// //           </View>
// //           <Image
// //             source={require("../../assets/Frame 68.png")}
// //             style={styles.characterImgRight}
// //             resizeMode="contain"
// //           />
// //         </Animated.View>

// //         {/* LANGUAGE LIST */}
// //         <ScrollView
// //           style={styles.languageList}
// //           contentContainerStyle={{
// //             paddingBottom: height * 0.32,
// //           }}
// //           showsVerticalScrollIndicator={false}
// //         >
// //           {languages.map((item, index) => {
// //             const isSelected = selectedLang === item.name;
// //             return (
// //               <TouchableOpacity
// //                 key={item.name}
// //                 activeOpacity={0.85}
// //                 onPress={() => setSelectedLang(item.name)}
// //                 style={[
// //                   styles.languageItem,
// //                   index === 0 && styles.languageItemFirst,
// //                   isSelected && styles.languageItemSelected,
// //                 ]}
// //               >
// //                 <View style={styles.languageLeft}>
// //                   <Text style={styles.flag}>{item.flag}</Text>
// //                   <Text style={styles.languageName}>{item.name}</Text>
// //                 </View>
// //                 <Text style={styles.languageNative}>{item.native}</Text>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </ScrollView>

// //         {/* LEFT character + bubble */}
// //         <Animated.View
// //           style={[styles.leftCharacter, { transform: [{ translateX: leftAnim }] }]}
// //         >
// //           <View style={styles.leftBubbleWrap}>
// //             <Text style={styles.leftBubble}>Language</Text>
// //           </View>
// //           <Image
// //             source={require("../../assets/Frame 67.png")}
// //             style={styles.characterImgLeft}
// //             resizeMode="contain"
// //           />
// //         </Animated.View>

// //         {/* BOTTOM area – Next button */}
// //         <View style={styles.bottomArea}>
// //           <TouchableOpacity
// //             activeOpacity={0.9}
// //             style={styles.nextButton}
// //             onPress={() => navigation.navigate("signin_up")}
// //           >
// //             <Text style={styles.nextText}>Next</Text>
// //             <Text style={styles.arrow}>→</Text>
// //           </TouchableOpacity>

// //           <Text style={styles.helperText}>
// //             Choose how Ballastra speaks to you.
// //           </Text>
// //         </View>

// //         {/* --- FILTER POPUP --- */}
// //         <FilterPopup
// //           visible={filterVisible}
// //           onClose={() => setFilterVisible(false)}
// //           newMembers={newMembers}
// //           oldMembers={oldMembers}
// //           setNewMembers={setNewMembers}
// //           setOldMembers={setOldMembers}
// //           selectedDate={selectedDate}
// //           setSelectedDate={setSelectedDate}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // /* -------------------------
// //    FilterPopup component
// //    ------------------------- */
// // function FilterPopup({
// //   visible,
// //   onClose,
// //   newMembers,
// //   oldMembers,
// //   setNewMembers,
// //   setOldMembers,
// //   selectedDate,
// //   setSelectedDate,
// // }) {
// //   const fadeAnim = useRef(new Animated.Value(0)).current;
// //   const translateY = useRef(new Animated.Value(20)).current;

// //   // Date picker state
// //   const [showDatePicker, setShowDatePicker] = useState(false);

// //   useEffect(() => {
// //     if (visible) {
// //       Animated.parallel([
// //         Animated.timing(fadeAnim, {
// //           toValue: 1,
// //           duration: 220,
// //           useNativeDriver: true,
// //         }),
// //         Animated.timing(translateY, {
// //           toValue: 0,
// //           duration: 220,
// //           useNativeDriver: true,
// //         }),
// //       ]).start();
// //     } else {
// //       Animated.parallel([
// //         Animated.timing(fadeAnim, {
// //           toValue: 0,
// //           duration: 180,
// //           useNativeDriver: true,
// //         }),
// //         Animated.timing(translateY, {
// //           toValue: 20,
// //           duration: 180,
// //           useNativeDriver: true,
// //         }),
// //       ]).start();
// //     }
// //   }, [visible]);

// //   const onChangeDate = (event, date) => {
// //     // On Android, event.type === "dismissed" when closed
// //     setShowDatePicker(false);
// //     if (date) {
// //       setSelectedDate(date);
// //     }
// //   };

// //   const resetFilters = () => {
// //     setNewMembers(false);
// //     setOldMembers(false);
// //     setSelectedDate(null);
// //   };

// //   // friendly formatted date
// //   const formatDate = (d) => {
// //     if (!d) return "Any date";
// //     return d.toLocaleDateString();
// //   };

// //   return (
// //     <Modal
// //       visible={visible}
// //       transparent
// //       animationType="none"
// //       onRequestClose={onClose}
// //     >
// //       <View style={fpStyles.overlay}>
// //         {/* Backdrop (touch outside to close) */}
// //         <TouchableOpacity
// //           style={fpStyles.backdrop}
// //           activeOpacity={1}
// //           onPress={onClose}
// //         />

// //         <Animated.View
// //           style={[
// //             fpStyles.card,
// //             {
// //               opacity: fadeAnim,
// //               transform: [{ translateY }],
// //             },
// //           ]}
// //         >
// //           <View style={fpStyles.header}>
// //             <Text style={fpStyles.headerTitle}>Filters</Text>

// //             <View style={{ flexDirection: "row", alignItems: "center" }}>
// //               <TouchableOpacity
// //                 onPress={resetFilters}
// //                 style={[fpStyles.smallBtn, { marginRight: 8 }]}
// //                 accessibilityLabel="Reset filters"
// //               >
// //                 <Text style={fpStyles.smallBtnText}>Reset</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity onPress={onClose} style={fpStyles.closeBtn}>
// //                 <Ionicons name="close" size={18} color="#B8C6FF" />
// //               </TouchableOpacity>
// //             </View>
// //           </View>

// //           <View style={fpStyles.list}>
// //             {/* New Members row */}
// //             <View style={fpStyles.row}>
// //               <View style={fpStyles.left}>
// //                 <View style={fpStyles.iconWrap}>
// //                   <Ionicons name="person-add" size={16} color="#CFE0FF" />
// //                 </View>
// //                 <Text style={fpStyles.label}>New Members</Text>
// //               </View>
// //               <CustomToggle value={newMembers} onToggle={setNewMembers} />
// //             </View>

// //             {/* Old Members row */}
// //             <View style={fpStyles.row}>
// //               <View style={fpStyles.left}>
// //                 <View style={fpStyles.iconWrap}>
// //                   <Ionicons name="people" size={16} color="#CFE0FF" />
// //                 </View>
// //                 <Text style={fpStyles.label}>Old Members</Text>
// //               </View>
// //               <CustomToggle value={oldMembers} onToggle={setOldMembers} />
// //             </View>

// //             {/* Date selector row */}
// //             <TouchableOpacity
// //               activeOpacity={0.9}
// //               onPress={() => setShowDatePicker(true)}
// //               style={[fpStyles.row, { justifyContent: "space-between" }]}
// //             >
// //               <View style={fpStyles.left}>
// //                 <View style={fpStyles.iconWrap}>
// //                   <Ionicons name="calendar" size={16} color="#CFE0FF" />
// //                 </View>
// //                 <Text style={fpStyles.label}>Date</Text>
// //               </View>

// //               <View style={{ alignItems: "flex-end" }}>
// //                 <Text style={fpStyles.dateText}>{formatDate(selectedDate)}</Text>
// //                 <Text style={fpStyles.subText}>
// //                   Tap to choose {selectedDate ? "or change" : ""}
// //                 </Text>
// //               </View>
// //             </TouchableOpacity>
// //           </View>

// //           {/* DateTimePicker (platform aware) */}
// //           {showDatePicker && (
// //             <DateTimePicker
// //               value={selectedDate || new Date()}
// //               mode="date"
// //               display={Platform.OS === "ios" ? "spinner" : "calendar"}
// //               onChange={onChangeDate}
// //               maximumDate={new Date(2100, 12, 31)}
// //               minimumDate={new Date(2000, 1, 1)}
// //             />
// //           )}
// //         </Animated.View>
// //       </View>
// //     </Modal>
// //   );
// // }

// // /* --- Custom animated toggle (pill) --- */
// // function CustomToggle({ value = false, onToggle = () => {} }) {
// //   const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

// //   useEffect(() => {
// //     Animated.timing(anim, {
// //       toValue: value ? 1 : 0,
// //       duration: 200,
// //       useNativeDriver: false,
// //     }).start();
// //   }, [value]);

// //   const translateX = anim.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: [2, 24],
// //   });
// //   const bg = anim.interpolate({
// //     inputRange: [0, 1],
// //     outputRange: ["rgba(255,255,255,0.06)", "#2D57C8"],
// //   });

// //   return (
// //     <TouchableOpacity
// //       activeOpacity={0.9}
// //       onPress={() => onToggle(!value)}
// //       style={fpStyles.toggleTouchable}
// //     >
// //       <Animated.View style={[fpStyles.toggleTrack, { backgroundColor: bg }]}>
// //         <Animated.View
// //           style={[fpStyles.toggleKnob, { transform: [{ translateX }] }]}
// //         />
// //       </Animated.View>
// //     </TouchableOpacity>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safe: {
// //     flex: 1,
// //     backgroundColor: "#050B18",
// //   },

// //   container: {
// //     flex: 1,
// //     backgroundColor: "#050B18",
// //     paddingHorizontal: 26,
// //     overflow: "hidden",
// //   },

// //   /* FILTER BUTTON */
// //   filterBtn: {
// //     position: "absolute",
// //     top: height * 0.03,
// //     right: 22,
// //     zIndex: 20,
// //     width: 40,
// //     height: 40,
// //     borderRadius: 10,
// //     backgroundColor: "rgba(11,24,45,0.6)",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderWidth: 1,
// //     borderColor: "rgba(58,88,160,0.12)",
// //   },

// //   /* WELCOME IMAGE */
// //   logoWrapper: {
// //     marginTop: height * 0.025,
// //     alignItems: "center",
// //   },
// //   welcomeLabel: {
// //     width: width * 0.70,
// //     height: height * 0.085,
// //   },

// //   /* RIGHT CHARACTER */
// //   rightCharacter: {
// //     position: "absolute",
// //     top: height * 0.10,
// //     right: -12,
// //     alignItems: "center",
// //     zIndex: 10,
// //   },
// //   rightBubbleWrap: {
// //     marginRight: 8,
// //   },
// //   rightBubble: {
// //     backgroundColor: "#1B3C73",
// //     paddingHorizontal: 20,
// //     paddingVertical: 7,
// //     borderRadius: 20,
// //     fontSize: 13,
// //     color: "#fff",
// //   },
// //   characterImgRight: {
// //     width: width * 0.30,
// //     height: width * 0.30,
// //     marginTop: 4,
// //   },

// //   /* LEFT CHARACTER */
// //   leftCharacter: {
// //     position: "absolute",
// //     bottom: height * 0.14,
// //     left: -10,
// //     alignItems: "center",
// //     zIndex: 10,
// //   },
// //   leftBubbleWrap: {
// //     marginLeft: 8,
// //   },
// //   leftBubble: {
// //     backgroundColor: "#1B3C73",
// //     paddingHorizontal: 18,
// //     paddingVertical: 7,
// //     borderRadius: 20,
// //     fontSize: 13,
// //     color: "#fff",
// //   },
// //   characterImgLeft: {
// //     width: width * 0.34,
// //     height: width * 0.34,
// //     marginTop: 4,
// //   },

// //   /* LANGUAGE LIST */
// //   languageList: {
// //     marginTop: height * 0.17,
// //   },

// //   languageItem: {
// //     width: "100%",
// //     borderRadius: 20,
// //     paddingVertical: 15,
// //     paddingHorizontal: 20,
// //     marginBottom: 14,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",

// //     borderWidth: 1,
// //     borderColor: "rgba(41,113,255,0.25)",
// //     backgroundColor: "rgba(38,78,138,0.20)",
// //   },

// //   languageItemFirst: {
// //     marginTop: 6,
// //   },

// //   languageItemSelected: {
// //     backgroundColor: "rgba(16,33,73,0.90)",
// //     borderColor: "#2D57C8",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 6 },
// //     shadowOpacity: 0.20,
// //     shadowRadius: 8,
// //     elevation: 8,
// //   },

// //   languageLeft: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   flag: {
// //     fontSize: 26,
// //     marginRight: 14,
// //   },
// //   languageName: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// //   languageNative: {
// //     color: "rgba(255,255,255,0.80)",
// //     fontSize: 14,
// //   },

// //   /* BOTTOM */
// //   bottomArea: {
// //     position: "absolute",
// //     bottom: height * 0.04,
// //     width: "100%",
// //     alignItems: "center",
// //   },
// //   nextButton: {
// //     width: width * 0.44,
// //     height: height * 0.06,
// //     borderRadius: 30,
// //     backgroundColor: "#316BFF",
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     alignItems: "center",

// //     shadowColor: "#316BFF",
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 12,
// //     elevation: 10,
// //   },
// //   nextText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "700",
// //   },
// //   arrow: {
// //     color: "#fff",
// //     fontSize: 18,
// //     marginLeft: 8,
// //   },
// //   helperText: {
// //     marginTop: 10,
// //     color: "rgba(255,255,255,0.70)",
// //     fontSize: 13,
// //   },
// // });

// // /* --- Filter popup styles --- */
// // const fpStyles = StyleSheet.create({
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: "transparent",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   backdrop: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: "rgba(3,6,12,0.6)",
// //   },

// //   card: {
// //     width: Math.min(width * 0.9, 360),
// //     borderRadius: 14,
// //     paddingVertical: 12,
// //     paddingHorizontal: 12,
// //     backgroundColor: "#071129",
// //     borderWidth: 1,
// //     borderColor: "rgba(58,88,160,0.18)",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.35,
// //     shadowRadius: 16,
// //     elevation: 12,
// //   },

// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 6,
// //     marginBottom: 6,
// //   },
// //   headerTitle: {
// //     color: "#CFE0FF",
// //     fontSize: 14,
// //     fontWeight: "700",
// //   },
// //   closeBtn: {
// //     padding: 6,
// //     borderRadius: 8,
// //   },

// //   smallBtn: {
// //     paddingHorizontal: 8,
// //     paddingVertical: 6,
// //     borderRadius: 8,
// //     backgroundColor: "rgba(47,78,140,0.14)",
// //   },
// //   smallBtnText: {
// //     color: "#CFE0FF",
// //     fontSize: 12,
// //     fontWeight: "600",
// //   },

// //   list: {
// //     marginTop: 8,
// //   },

// //   row: {
// //     width: "100%",
// //     borderRadius: 12,
// //     paddingVertical: 10,
// //     paddingHorizontal: 10,
// //     marginBottom: 10,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     backgroundColor: "rgba(9,20,40,0.6)",
// //     borderWidth: 1,
// //     borderColor: "rgba(41,113,255,0.06)",
// //   },

// //   left: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   iconWrap: {
// //     width: 34,
// //     height: 34,
// //     borderRadius: 10,
// //     backgroundColor: "rgba(47,78,140,0.18)",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginRight: 10,
// //   },
// //   label: {
// //     color: "#E6EEFF",
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },

// //   /* Toggle */
// //   toggleTouchable: {
// //     padding: 6,
// //   },
// //   toggleTrack: {
// //     width: 48,
// //     height: 26,
// //     borderRadius: 20,
// //     padding: 2,
// //     justifyContent: "center",
// //   },
// //   toggleKnob: {
// //     width: 20,
// //     height: 20,
// //     borderRadius: 12,
// //     backgroundColor: "#FFF",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.18,
// //     shadowRadius: 4,
// //     elevation: Platform.OS === "android" ? 4 : 0,
// //   },

// //   dateText: {
// //     color: "#CFE0FF",
// //     fontSize: 13,
// //     fontWeight: "600",
// //   },
// //   subText: {
// //     color: "rgba(255,255,255,0.55)",
// //     fontSize: 11,
// //   },
// // });
// // LanguageSelectionNoDatePicker.js
// import React, { useRef, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   ScrollView,
//   Image,
//   Dimensions,
//   StatusBar,
//   SafeAreaView,
//   Platform,
//   Modal,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// export default function LanguageSelection() {
//   const navigation = useNavigation();

//   const rightAnim = useRef(new Animated.Value(100)).current;
//   const leftAnim = useRef(new Animated.Value(-100)).current;

//   const [selectedLang, setSelectedLang] = useState("English (uk)");

//   // Filter popup state
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [newMembers, setNewMembers] = useState(true);
//   const [oldMembers, setOldMembers] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null); // still kept; cleared by Reset

//   useEffect(() => {
//     Animated.timing(rightAnim, {
//       toValue: 0,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(leftAnim, {
//       toValue: 0,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const languages = [
//     { flag: "🇬🇧", name: "English (uk)", native: "(English)" },
//     { flag: "🇮🇳", name: "India", native: "(हिन्दी)" },
//     { flag: "🇪🇬", name: "Egypt (Syria)", native: "(العربية)" },
//     { flag: "🇧🇩", name: "Bangladesh", native: "(বাংলাদেশ)" },
//     { flag: "🇳🇵", name: "Nepal", native: "(नेपाल)" },
//   ];

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar hidden />
//       <View style={styles.container}>
//         {/* FILTER BUTTON (top-right) */}
//         <TouchableOpacity
//           activeOpacity={0.9}
//           style={styles.filterBtn}
//           onPress={() => setFilterVisible(true)}
//         >
//           <Ionicons name="filter" size={18} color="#CFE0FF" />
//         </TouchableOpacity>

//         {/* WELCOME IMAGE */}
//         <View style={styles.logoWrapper}>
//           <Image
//             source={require("../../assets/Text.png")}
//             style={styles.welcomeLabel}
//             resizeMode="contain"
//           />
//         </View>

//         {/* RIGHT character + bubble */}
//         <Animated.View
//           style={[
//             styles.rightCharacter,
//             { transform: [{ translateX: rightAnim }] },
//           ]}
//         >
//           <View style={styles.rightBubbleWrap}>
//             <Text style={styles.rightBubble}>Sprache</Text>
//           </View>
//           <Image
//             source={require("../../assets/Frame 68.png")}
//             style={styles.characterImgRight}
//             resizeMode="contain"
//           />
//         </Animated.View>

//         {/* LANGUAGE LIST */}
//         <ScrollView
//           style={styles.languageList}
//           contentContainerStyle={{
//             paddingBottom: height * 0.32,
//           }}
//           showsVerticalScrollIndicator={false}
//         >
//           {languages.map((item, index) => {
//             const isSelected = selectedLang === item.name;
//             return (
//               <TouchableOpacity
//                 key={item.name}
//                 activeOpacity={0.85}
//                 onPress={() => setSelectedLang(item.name)}
//                 style={[
//                   styles.languageItem,
//                   index === 0 && styles.languageItemFirst,
//                   isSelected && styles.languageItemSelected,
//                 ]}
//               >
//                 <View style={styles.languageLeft}>
//                   <Text style={styles.flag}>{item.flag}</Text>
//                   <Text style={styles.languageName}>{item.name}</Text>
//                 </View>
//                 <Text style={styles.languageNative}>{item.native}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>

//         {/* LEFT character + bubble */}
//         <Animated.View
//           style={[styles.leftCharacter, { transform: [{ translateX: leftAnim }] }]}
//         >
//           <View style={styles.leftBubbleWrap}>
//             <Text style={styles.leftBubble}>Language</Text>
//           </View>
//           <Image
//             source={require("../../assets/Frame 67.png")}
//             style={styles.characterImgLeft}
//             resizeMode="contain"
//           />
//         </Animated.View>

//         {/* BOTTOM area – Next button */}
//         <View style={styles.bottomArea}>
//           <TouchableOpacity
//             activeOpacity={0.9}
//             style={styles.nextButton}
//             onPress={() => navigation.navigate("signin_up")}
//           >
//             <Text style={styles.nextText}>Next</Text>
//             <Text style={styles.arrow}>→</Text>
//           </TouchableOpacity>

//           <Text style={styles.helperText}>
//             Choose how Ballastra speaks to you.
//           </Text>
//         </View>

//         {/* --- FILTER POPUP --- */}
//         <FilterPopup
//           visible={filterVisible}
//           onClose={() => setFilterVisible(false)}
//           newMembers={newMembers}
//           oldMembers={oldMembers}
//           setNewMembers={setNewMembers}
//           setOldMembers={setOldMembers}
//           selectedDate={selectedDate}
//           setSelectedDate={setSelectedDate}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// /* -------------------------
//    FilterPopup component (bottom-sheet style)
//    ------------------------- */
// function FilterPopup({
//   visible,
//   onClose,
//   newMembers,
//   oldMembers,
//   setNewMembers,
//   setOldMembers,
//   selectedDate,
//   setSelectedDate,
// }) {
//   const slide = useRef(new Animated.Value(0)).current; // 0 hidden, 1 visible
//   useEffect(() => {
//     Animated.timing(slide, {
//       toValue: visible ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [visible]);

//   const translateY = slide.interpolate({
//     inputRange: [0, 1],
//     outputRange: [height * 0.6, 0],
//   });
//   const opacity = slide.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 1],
//   });

//   const resetFilters = () => {
//     setNewMembers(false);
//     setOldMembers(false);
//     setSelectedDate(null);
//   };

//   const formatDate = (d) => {
//     if (!d) return "Any date";
//     return d.toLocaleDateString();
//   };

//   const onDatePress = () => {
//     // We removed the native DateTimePicker to avoid bundling errors.
//     // If you want the native picker, install:
//     // expo install @react-native-datetimepicker/datetimepicker
//     Alert.alert(
//       "Date Picker not installed",
//       "To enable native date selection install @react-native-datetimepicker/datetimepicker (expo or bare).",
//       [{ text: "OK" }]
//     );
//   };

//   return (
//     <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
//       {/* Backdrop */}
//       <Animated.View style={[bsStyles.backdrop, { opacity }]}>
//         <TouchableOpacity style={bsStyles.backdropTouchable} activeOpacity={1} onPress={onClose} />
//       </Animated.View>

//       {/* Bottom sheet */}
//       <Animated.View style={[bsStyles.sheet, { transform: [{ translateY }] }]}>
//         {/* Drag indicator */}
//         <View style={bsStyles.indicatorWrap}>
//           <View style={bsStyles.indicator} />
//         </View>

//         {/* Header */}
//         <View style={bsStyles.headerRow}>
//           <Text style={bsStyles.title}>Filters</Text>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <TouchableOpacity onPress={resetFilters} style={[fpStyles.smallBtn, { marginRight: 8 }]}>
//               <Text style={fpStyles.smallBtnText}>Reset</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={onClose} style={fpStyles.closeBtn}>
//               <Ionicons name="close" size={18} color="#B8C6FF" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={bsStyles.content}>
//           {/* New Members */}
//           <View style={bsStyles.filterRow}>
//             <View style={bsStyles.left}>
//               <View style={bsStyles.iconWrap}>
//                 <Ionicons name="person-add" size={18} color="#CFE0FF" />
//               </View>
//               <View>
//                 <Text style={bsStyles.filterTitle}>New Members</Text>
//                 <Text style={bsStyles.filterSub}>People who joined recently</Text>
//               </View>
//             </View>
//             <PillToggle value={newMembers} onToggle={setNewMembers} />
//           </View>

//           {/* Old Members */}
//           <View style={bsStyles.filterRow}>
//             <View style={bsStyles.left}>
//               <View style={bsStyles.iconWrap}>
//                 <Ionicons name="people" size={18} color="#CFE0FF" />
//               </View>
//               <View>
//                 <Text style={bsStyles.filterTitle}>Old Members</Text>
//                 <Text style={bsStyles.filterSub}>Long-time participants</Text>
//               </View>
//             </View>
//             <PillToggle value={oldMembers} onToggle={setOldMembers} />
//           </View>

//           {/* Date row - placeholder: shows alert and current date if set */}
//           <TouchableOpacity activeOpacity={0.9} onPress={onDatePress} style={[fpStyles.row, { justifyContent: "space-between", marginTop: 6 }]}>
//             <View style={fpStyles.left}>
//               <View style={fpStyles.iconWrap}>
//                 <Ionicons name="calendar" size={16} color="#CFE0FF" />
//               </View>
//               <Text style={fpStyles.label}>Date</Text>
//             </View>

//             <View style={{ alignItems: "flex-end" }}>
//               <Text style={fpStyles.dateText}>{formatDate(selectedDate)}</Text>
//               <Text style={fpStyles.subText}>Tap to choose</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     </Modal>
//   );
// }

// /* --- Pill toggle used in bottom sheet --- */
// function PillToggle({ value = false, onToggle = () => {} }) {
//   const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
//   useEffect(() => {
//     Animated.timing(anim, {
//       toValue: value ? 1 : 0,
//       duration: 220,
//       useNativeDriver: false,
//     }).start();
//   }, [value]);

//   const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [2, 26] });
//   const bgColor = anim.interpolate({ inputRange: [0, 1], outputRange: ["rgba(255,255,255,0.06)", "rgba(49,107,255,1)"] });

//   return (
//     <TouchableOpacity activeOpacity={0.9} onPress={() => onToggle(!value)}>
//       <Animated.View style={[bsStyles.pillTrack, { backgroundColor: bgColor }]}>
//         <Animated.View style={[bsStyles.pillKnob, { transform: [{ translateX }] }]} />
//       </Animated.View>
//     </TouchableOpacity>
//   );
// }

// /* --- Styles --- */
// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#050B18" },
//   container: { flex: 1, backgroundColor: "#050B18", paddingHorizontal: 26, overflow: "hidden" },

//   filterBtn: {
//     position: "absolute",
//     top: height * 0.03,
//     right: 22,
//     zIndex: 20,
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     backgroundColor: "rgba(11,24,45,0.6)",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "rgba(58,88,160,0.12)",
//   },

//   logoWrapper: { marginTop: height * 0.025, alignItems: "center" },
//   welcomeLabel: { width: width * 0.70, height: height * 0.085 },

//   rightCharacter: { position: "absolute", top: height * 0.10, right: -12, alignItems: "center", zIndex: 10 },
//   rightBubbleWrap: { marginRight: 8 },
//   rightBubble: { backgroundColor: "#1B3C73", paddingHorizontal: 20, paddingVertical: 7, borderRadius: 20, fontSize: 13, color: "#fff" },
//   characterImgRight: { width: width * 0.30, height: width * 0.30, marginTop: 4 },

//   leftCharacter: { position: "absolute", bottom: height * 0.14, left: -10, alignItems: "center", zIndex: 10 },
//   leftBubbleWrap: { marginLeft: 8 },
//   leftBubble: { backgroundColor: "#1B3C73", paddingHorizontal: 18, paddingVertical: 7, borderRadius: 20, fontSize: 13, color: "#fff" },
//   characterImgLeft: { width: width * 0.34, height: width * 0.34, marginTop: 4 },

//   languageList: { marginTop: height * 0.17 },
//   languageItem: {
//     width: "100%",
//     borderRadius: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     marginBottom: 14,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(41,113,255,0.25)",
//     backgroundColor: "rgba(38,78,138,0.20)",
//   },
//   languageItemFirst: { marginTop: 6 },
//   languageItemSelected: {
//     backgroundColor: "rgba(16,33,73,0.90)",
//     borderColor: "#2D57C8",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   languageLeft: { flexDirection: "row", alignItems: "center" },
//   flag: { fontSize: 26, marginRight: 14 },
//   languageName: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   languageNative: { color: "rgba(255,255,255,0.80)", fontSize: 14 },

//   bottomArea: { position: "absolute", bottom: height * 0.04, width: "100%", alignItems: "center" },
//   nextButton: {
//     width: width * 0.44,
//     height: height * 0.06,
//     borderRadius: 30,
//     backgroundColor: "#316BFF",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#316BFF",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.2,
//     shadowRadius: 12,
//     elevation: 10,
//   },
//   nextText: { color: "#fff", fontSize: 16, fontWeight: "700" },
//   arrow: { color: "#fff", fontSize: 18, marginLeft: 8 },
//   helperText: { marginTop: 10, color: "rgba(255,255,255,0.70)", fontSize: 13 },
// });

// const fpStyles = StyleSheet.create({
//   overlay: { flex: 1, backgroundColor: "transparent", justifyContent: "center", alignItems: "center" },
//   backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(3,6,12,0.6)" },

//   card: { width: Math.min(width * 0.9, 360), borderRadius: 14, paddingVertical: 12, paddingHorizontal: 12, backgroundColor: "#071129", borderWidth: 1, borderColor: "rgba(58,88,160,0.18)", shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 12 },

//   header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 6, marginBottom: 6 },
//   headerTitle: { color: "#CFE0FF", fontSize: 14, fontWeight: "700" },
//   closeBtn: { padding: 6, borderRadius: 8 },

//   smallBtn: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: "rgba(47,78,140,0.14)" },
//   smallBtnText: { color: "#CFE0FF", fontSize: 12, fontWeight: "600" },

//   list: { marginTop: 8 },

//   row: {
//     width: "100%",
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "rgba(9,20,40,0.6)",
//     borderWidth: 1,
//     borderColor: "rgba(41,113,255,0.06)",
//   },

//   left: { flexDirection: "row", alignItems: "center" },
//   iconWrap: { width: 34, height: 34, borderRadius: 10, backgroundColor: "rgba(47,78,140,0.18)", alignItems: "center", justifyContent: "center", marginRight: 10 },
//   label: { color: "#E6EEFF", fontSize: 14, fontWeight: "600" },

//   toggleTouchable: { padding: 6 },
//   toggleTrack: { width: 48, height: 26, borderRadius: 20, padding: 2, justifyContent: "center" },
//   toggleKnob: { width: 20, height: 20, borderRadius: 12, backgroundColor: "#FFF", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 4, elevation: Platform.OS === "android" ? 4 : 0 },

//   dateText: { color: "#CFE0FF", fontSize: 13, fontWeight: "600" },
//   subText: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
// });

// const bsStyles = StyleSheet.create({
//   backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(3,6,12,0.6)", zIndex: 998 },
//   backdropTouchable: { flex: 1 },

//   sheet: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 999,
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: Platform.OS === "ios" ? 28 : 18,
//     borderTopLeftRadius: 18,
//     borderTopRightRadius: 18,
//     backgroundColor: "#071129",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -8 },
//     shadowOpacity: 0.35,
//     shadowRadius: 18,
//     elevation: 20,
//     minHeight: height * 0.27,
//   },

//   indicatorWrap: { width: "100%", alignItems: "center", marginBottom: 8 },
//   indicator: { width: 60, height: 6, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.06)" },

//   headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 6, marginBottom: 8 },
//   title: { color: "#CFE0FF", fontSize: 16, fontWeight: "700" },
//   closeIcon: { padding: 6, borderRadius: 8 },

//   content: { marginTop: 6 },

//   filterRow: {
//     width: "100%",
//     borderRadius: 14,
//     paddingVertical: 14,
//     paddingHorizontal: 12,
//     marginBottom: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "rgba(9,20,40,0.6)",
//     borderWidth: 1,
//     borderColor: "rgba(41,113,255,0.06)",
//   },

//   left: { flexDirection: "row", alignItems: "center" },
//   iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(47,78,140,0.18)", alignItems: "center", justifyContent: "center", marginRight: 12 },
//   filterTitle: { color: "#E6EEFF", fontSize: 15, fontWeight: "700" },
//   filterSub: { color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 },

//   pillTrack: { width: 56, height: 30, borderRadius: 20, padding: 3, justifyContent: "center" },
//   pillKnob: { width: 24, height: 24, borderRadius: 16, backgroundColor: "#FFF", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 6, elevation: 6 },
// });
// LanguageSelection.js

import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
  Modal,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");

/* ------------------------------------------------------------------
   🇸🇾 SYRIA FLAG SVG INLINE
--------------------------------------------------------------------*/
function SyriaFlag({ size = 28 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <G clipPath="url(#clip0)">
        <Path d="M14.0006 28C21.7323 28 28 21.7323 28 14.0006C28 6.26897 21.7323 0.0012207 14.0006 0.0012207C6.26897 0.0012207 0.0012207 6.26897 0.0012207 14.0006C0.0012207 21.7323 6.26897 28 14.0006 28Z" fill="white"/>
        <Path d="M27.2001 9.33228H18.5741C18.9488 12.3229 18.951 15.6181 18.5814 18.6126H27.2184C27.7363 17.13 28.0005 15.5707 27.9998 14.0003C28 12.3627 27.7164 10.7923 27.2001 9.33228Z" fill="#EFECEC"/>
        <Path d="M18.574 9.33229H27.1998C27.1986 9.32813 27.1971 9.32407 27.1953 9.32011C25.4039 4.2679 20.795 0.5509 15.2576 0.0574951C17.4002 1.23222 18.0262 4.95383 18.574 9.33229Z" fill="#C42B27"/>
        <Path d="M15.2576 27.9421C20.8051 27.4478 25.4205 23.718 27.2053 18.6523C27.21 18.6389 27.214 18.6256 27.2188 18.6125H18.5815C18.0379 23.0146 17.4093 26.7626 15.2576 27.9421Z" fill="#0B0B0B"/>
        <Path d="M0 14.0003C0 15.6168 0.277647 17.168 0.781397 18.6126H19.302C19.672 15.618 19.6693 12.3229 19.2951 9.33228H0.800017C0.283618 10.7923 0 12.3627 0 14.0003Z" fill="#EFEFEF"/>
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="28" height="28" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

/* ------------------------------------------------------------------
   🇳🇵 NEPAL FLAG SVG INLINE
--------------------------------------------------------------------*/
function NepalFlag({ size = 28 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <G clipPath="url(#clipN)">
        <Path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#F0F0F0"/>
        <Path d="M12.5642 0.0727539C11.8798 0.142405 11.2015 0.262572 10.5348 0.43227C4.4788 1.97418 0 14 0 14L21.8359 25.6027C22.2826 25.3004 22.7116 24.9725 23.1207 24.6209L14.0216 15.5217H27.9174L12.5642 0.0727539Z" fill="#0052B4"/>
        <Path d="M24.3478 14L10.7321 0.384399C4.57669 1.85642 0 7.39331 0 14C0 21.7319 6.26806 28 14 28C16.9328 28 19.6545 27.0975 21.9039 25.5561L10.3478 14H24.3478Z" fill="#D80027"/>
      </G>
      <Defs>
        <ClipPath id="clipN">
          <Rect width="28" height="28" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default function LanguageSelection() {
  const navigation = useNavigation();

  const rightAnim = useRef(new Animated.Value(100)).current;
  const leftAnim = useRef(new Animated.Value(-100)).current;

  const [selectedLang, setSelectedLang] = useState("English (uk)");

  useEffect(() => {
    Animated.timing(rightAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start();
    Animated.timing(leftAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start();
  }, []);

  const languages = [
    { flag: "🇬🇧", name: "English (uk)", native: "(English)" },
    { flag: "🇮🇳", name: "India", native: "(हिन्दी)" },

    // 🔥 Replace flag text with SVG component
    { flag: <SyriaFlag size={26} />, name: "Egypt (Syria)", native: "(العربية)" },
    { flag: <NepalFlag size={26} />, name: "Nepal", native: "(नेपाल)" },

    { flag: "🇧🇩", name: "Bangladesh", native: "(বাংলাদেশ)" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar hidden />
      <ImageBackground
        source={require("../../assets/image1.png")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/Text.png")}
              style={styles.welcomeLabel}
            />
          </View>

          <Animated.View style={[styles.rightCharacter, { transform: [{ translateX: rightAnim }] }]}>
            <Image
              source={require("../../assets/Frame 68.png")}
              style={styles.characterImgRight}
            />
          </Animated.View>

          <ScrollView style={styles.languageList}>
            {languages.map((item) => {
              const isSelected = selectedLang === item.name;
              return (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => setSelectedLang(item.name)}
                  style={[styles.languageItem, isSelected && styles.languageItemSelected]}
                >
                  <View style={styles.languageLeft}>
                    {typeof item.flag === "string" ? (
                      <Text style={styles.flag}>{item.flag}</Text>
                    ) : (
                      item.flag
                    )}
                    <Text style={styles.languageName}>{item.name}</Text>
                  </View>

                  <Text style={styles.languageNative}>{item.native}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Animated.View style={[styles.leftCharacter, { transform: [{ translateX: leftAnim }] }]}>
            <Image
              source={require("../../assets/Frame 67.png")}
              style={styles.characterImgLeft}
            />
          </Animated.View>

          <View style={styles.bottomArea}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate("signin_up")}
            >
              <Text style={styles.nextText}>Next</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <Text style={styles.helperText}>Choose how Ballastra speaks to you.</Text>
          </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

/* ----------------------  ALL YOUR ORIGINAL STYLES ----------------------- */
const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#050B18"
   },

  bgImage: { 
    flex: 1, 
    width: "100%", 
    height: "100%" },
  container: {
     flex: 1, 
     paddingHorizontal: 26
     },

  logoWrapper: { 
    alignItems: "center"
   },

 welcomeLabel: {
  width: width * 0.45,
  height: height * 0.05,
  marginTop: 20,
},


  rightCharacter: {
    position: "absolute",
    top: height * 0.08,
    right: -12,
    zIndex: 10,
  },

  characterImgRight: { width: width * 0.3, height: width * 0.3 },

  leftCharacter: {
    position: "absolute",
    bottom: height * 0.14,
    left: -10,
    zIndex: 10,
  },

  characterImgLeft: {
    width: width * 0.34,
    height: width * 0.38,
    marginTop: 25,
  },

  languageList: { marginTop: 115 },

  languageItem: {
    width: "100%",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3154BA4D",
    backgroundColor: "#3154BA00",
  },

  languageItemSelected: {
    backgroundColor: "rgba(16,33,73,0.90)",
    borderColor: "#2D57C8",
    elevation: 8,
  },

  languageLeft: { flexDirection: "row", alignItems: "center" },
  flag: { fontSize: 26, marginRight: 10 },
  languageName: { color: "#fff", fontSize: 14, marginLeft: 10 },
  languageNative: { color: "#fff", fontSize: 12 },

  bottomArea: {
  position: "absolute",
  bottom: height * 0.04,
  left: 0,
  right: 0,
  alignItems: "center",
  justifyContent: "center",
},


  nextButton: {
    paddingVertical: 11,
    paddingHorizontal: 29,
    borderRadius: 15,
    backgroundColor: "#3255BA",
    flexDirection: "row",
  },

  nextText: { color: "#fff", fontSize: 14 },
  arrow: { color: "#fff", fontSize: 18, marginLeft: 10 },
  helperText: { marginTop: 11, color: "#BDBDBD", fontSize: 12 },
});
