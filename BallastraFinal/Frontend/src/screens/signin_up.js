
// // import React, { useEffect, useRef } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Animated,
// //   Dimensions,
// //   StatusBar,
// //   Platform,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";

// // const { width, height } = Dimensions.get("window");

// // export default function SigninUp({ navigation }) {
// //   // Animation values
// //   const avatarAnims = useRef([
// //     new Animated.Value(0),
// //     new Animated.Value(0),
// //     new Animated.Value(0),
// //     new Animated.Value(0),
// //     new Animated.Value(0),
// //     new Animated.Value(0),
// //   ]).current;

// //   const titleAnim = useRef(new Animated.Value(0)).current;
// //   const buttonAnims = useRef([
// //     new Animated.Value(50),
// //     new Animated.Value(50),
// //     new Animated.Value(50),
// //     new Animated.Value(50),
// //   ]).current;

// //   useEffect(() => {
// //     const avatarAnimations = avatarAnims.map((anim, index) =>
// //       Animated.timing(anim, {
// //         toValue: 1,
// //         duration: 600,
// //         delay: index * 100,
// //         useNativeDriver: true,
// //       })
// //     );

// //     const titleAnimation = Animated.timing(titleAnim, {
// //       toValue: 1,
// //       duration: 800,
// //       delay: 600,
// //       useNativeDriver: true,
// //     });

// //     const buttonAnimations = buttonAnims.map((anim, index) =>
// //       Animated.timing(anim, {
// //         toValue: 0,
// //         duration: 500,
// //         delay: 1000 + index * 100,
// //         useNativeDriver: true,
// //       })
// //     );

// //     Animated.parallel([
// //       ...avatarAnimations,
// //       titleAnimation,
// //       ...buttonAnimations,
// //     ]).start();
// //   }, []);

// //   const avatarPositions = [
// //     { top: 160, left: width / 2 - 25, bg: "#E8D4F8", emoji: "👤", size: 50 },
// //     { top: 170, right: width / 2 - 10, bg: "#FFD4D4", emoji: "👧", size: 55 },
// //     { top: 195, right: width / 2 - 80, bg: "#D4F4F4", emoji: "🚗", size: 50 },
// //     { top: 230, left: width / 2 - 80, bg: "#FFF4D4", emoji: "😊", size: 50 },
// //     { top: 235, left: width / 2 + 10, bg: "#FFB4D4", emoji: "🔒", size: 60 },
// //     { top: 230, right: width / 2 - 50, bg: "#D4E4F4", emoji: "🐻", size: 50 },
// //   ];

// //   // ------------- UPDATED NAVIGATION -----------------

// //   const handleGoogleSignIn = () => {
// //     navigation.navigate("GoogleAuth");
// //   };

// //   const handleAppleSignIn = () => {
// //     navigation.navigate("AppleAuth");
// //   };

// //   const handleLogIn = () => {
// //     navigation.navigate("Loginscreen"); // ✔ Login screen
// //   };

// //   const handleCreateAccount = () => {
// //     navigation.navigate("CreateAccount"); // ✔ V7 register screen
// //   };

// //   // ----------------------------------------------------

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="light-content" />

// //       <View style={styles.gridPattern} />

// //       {/* STATUS BAR */}
// //       <View style={styles.statusBar}>
// //         <Text style={styles.time}>9:41</Text>
// //         <View style={styles.statusIcons}>
// //           <Text style={styles.icon}>📶</Text>
// //           <Text style={styles.icon}>📡</Text>
// //           <Text style={styles.icon}>🔋</Text>
// //         </View>
// //       </View>

// //       {/* Welcome */}
// //       <View style={styles.welcomeContainer}>
// //         <View style={styles.welcomeBadge}>
// //           <Text style={styles.welcomeText}>Welcome To Ballastra</Text>
// //         </View>
// //       </View>

// //       {/* Avatar circle */}
// //       <View style={styles.avatarContainer}>
// //         {avatarPositions.map((pos, index) => (
// //           <Animated.View
// //             key={index}
// //             style={[
// //               styles.avatar,
// //               {
// //                 top: pos.top,
// //                 left: pos.left,
// //                 right: pos.right,
// //                 backgroundColor: pos.bg,
// //                 width: pos.size,
// //                 height: pos.size,
// //                 borderRadius: pos.size / 2,
// //                 opacity: avatarAnims[index],
// //                 transform: [
// //                   {
// //                     scale: avatarAnims[index].interpolate({
// //                       inputRange: [0, 1],
// //                       outputRange: [0, 1],
// //                     }),
// //                   },
// //                 ],
// //               },
// //             ]}
// //           >
// //             <Text style={[styles.avatarEmoji, { fontSize: pos.size * 0.5 }]}>
// //               {pos.emoji}
// //             </Text>
// //           </Animated.View>
// //         ))}
// //       </View>

// //       {/* Title */}
// //       <Animated.View
// //         style={[
// //           styles.titleContainer,
// //           {
// //             opacity: titleAnim,
// //             transform: [
// //               {
// //                 translateY: titleAnim.interpolate({
// //                   inputRange: [0, 1],
// //                   outputRange: [20, 0],
// //                 }),
// //               },
// //             ],
// //           },
// //         ]}
// //       >
// //         <Text style={styles.title}>Let's Go</Text>
// //       </Animated.View>

// //       {/* Buttons Section */}
// //       <View style={styles.buttonsContainer}>
// //         {/* LOGIN */}
// //         <Animated.View style={{ transform: [{ translateY: buttonAnims[0] }] }}>
// //           <TouchableOpacity
// //             style={[styles.button, styles.loginButton]}
// //             onPress={handleLogIn}
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.loginButtonText}>Log In</Text>
// //           </TouchableOpacity>
// //         </Animated.View>

// //         {/* GOOGLE */}
// //         <Animated.View style={{ transform: [{ translateY: buttonAnims[1] }] }}>
// //           <TouchableOpacity
// //             style={[styles.button, styles.socialButton]}
// //             onPress={handleGoogleSignIn}
// //             activeOpacity={0.8}
// //           >
// //             <View style={styles.socialButtonContent}>
// //               <Text style={styles.googleIcon}>G</Text>
// //               <Text style={styles.socialButtonText}>Continue With Google</Text>
// //             </View>
// //           </TouchableOpacity>
// //         </Animated.View>

// //         {/* APPLE */}
// //         <Animated.View style={{ transform: [{ translateY: buttonAnims[2] }] }}>
// //           <TouchableOpacity
// //             style={[styles.button, styles.socialButton]}
// //             onPress={handleAppleSignIn}
// //             activeOpacity={0.8}
// //           >
// //             <View style={styles.socialButtonContent}>
// //               <Ionicons name="logo-apple" size={24} color="#000" />
// //               <Text style={styles.socialButtonText}>Continue With Apple</Text>
// //             </View>
// //           </TouchableOpacity>
// //         </Animated.View>

// //         {/* CREATE ACCOUNT */}
// //         <Animated.View style={{ transform: [{ translateY: buttonAnims[3] }] }}>
// //           <TouchableOpacity
// //             style={[styles.button, styles.createButton]}
// //             onPress={handleCreateAccount}
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.createButtonText}>Create Account</Text>
// //           </TouchableOpacity>
// //         </Animated.View>
// //       </View>

// //       {/* Footer */}
// //       <View style={styles.footer}>
// //         <TouchableOpacity>
// //           <Text style={styles.footerLink}>Privacy Policy</Text>
// //         </TouchableOpacity>
// //         <View style={styles.footerDivider} />
// //         <TouchableOpacity>
// //           <Text style={styles.footerLink}>Terms of Services</Text>
// //         </TouchableOpacity>
// //       </View>

// //       <View style={styles.homeIndicator} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#0a1628",
// //   },
// //   gridPattern: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //   },
// //   statusBar: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     height: 44,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     paddingTop: 10,
// //     zIndex: 100,
// //   },
// //   time: {
// //     color: "white",
// //     fontSize: 15,
// //     fontWeight: "600",
// //   },
// //   statusIcons: {
// //     flexDirection: "row",
// //     gap: 5,
// //   },
// //   icon: {
// //     fontSize: 14,
// //   },
// //   welcomeContainer: {
// //     position: "absolute",
// //     top: 80,
// //     left: 0,
// //     right: 0,
// //     alignItems: "center",
// //     zIndex: 10,
// //   },
// //   welcomeBadge: {
// //     borderWidth: 1.5,
// //     borderColor: "rgba(255, 255, 255, 0.3)",
// //     borderRadius: 25,
// //     paddingVertical: 8,
// //     paddingHorizontal: 24,
// //     backgroundColor: "rgba(255, 255, 255, 0.05)",
// //   },
// //   welcomeText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "400",
// //     letterSpacing: 0.5,
// //   },
// //   avatarContainer: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     height: 350,
// //     zIndex: 5,
// //   },
// //   avatar: {
// //     position: "absolute",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 5,
// //   },
// //   avatarEmoji: {
// //     textAlign: "center",
// //   },
// //   titleContainer: {
// //     position: "absolute",
// //     top: 300,
// //     left: 0,
// //     right: 0,
// //     alignItems: "center",
// //     zIndex: 20,
// //   },
// //   title: {
// //     color: "white",
// //     fontSize: 56,
// //     fontWeight: "400",
// //     fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
// //     letterSpacing: 2,
// //   },
// //   buttonsContainer: {
// //     position: "absolute",
// //     bottom: 180,
// //     left: 20,
// //     right: 20,
// //     zIndex: 30,
// //   },
// //   button: {
// //     height: 56,
// //     borderRadius: 28,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: 12,
// //     elevation: 5,
// //   },
// //   loginButton: {
// //     backgroundColor: "#1c4cff",
// //     borderWidth: 1,
// //     borderColor: "#2d5cff",
// //   },
// //   loginButtonText: {
// //     color: "white",
// //     fontSize: 17,
// //     fontWeight: "600",
// //   },
// //   socialButton: {
// //     backgroundColor: "white",
// //   },
// //   socialButtonContent: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 12,
// //   },
// //   googleIcon: {
// //     fontSize: 20,
// //     fontWeight: "700",
// //     color: "#4285F4",
// //   },
// //   socialButtonText: {
// //     color: "#000",
// //     fontSize: 16,
// //     fontWeight: "500",
// //   },
// //   createButton: {
// //     backgroundColor: "#1a3a6b",
// //     borderWidth: 1,
// //     borderColor: "rgba(28, 76, 255, 0.5)",
// //   },
// //   createButtonText: {
// //     color: "white",
// //     fontSize: 17,
// //     fontWeight: "600",
// //   },
// //   footer: {
// //     position: "absolute",
// //     bottom: 120,
// //     left: 0,
// //     right: 0,
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     gap: 12,
// //     zIndex: 30,
// //   },
// //   footerLink: {
// //     color: "rgba(255, 255, 255, 0.7)",
// //     fontSize: 14,
// //     textDecorationLine: "underline",
// //   },
// //   footerDivider: {
// //     width: 1,
// //     height: 14,
// //     backgroundColor: "rgba(255, 255, 255, 0.3)",
// //   },
// //   homeIndicator: {
// //     position: "absolute",
// //     bottom: 8,
// //     alignSelf: "center",
// //     left: width / 2 - 67,
// //     width: 134,
// //     height: 5,
// //     backgroundColor: "white",
// //     borderRadius: 3,
// //     opacity: 0.3,
// //   },
// // });













// // dummy loging











// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Image,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

// const { width, height } = Dimensions.get("window");

// // layout helpers
// const LABEL_WIDTH = width * 0.7;
// const TITLE_TOP = height * 0.38;

// export default function SigninUp({ navigation }) {
//   const [loading, setLoading] = useState(false);

//   const avatarAnims = useRef([
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//   ]).current;

//   const titleAnim = useRef(new Animated.Value(0)).current;
//   const buttonAnims = useRef([
//     new Animated.Value(50),
//     new Animated.Value(50),
//     new Animated.Value(50),
//     new Animated.Value(50),
//   ]).current;

//   useEffect(() => {
//     const avatarAnimations = avatarAnims.map((anim, index) =>
//       Animated.timing(anim, {
//         toValue: 1,
//         duration: 600,
//         delay: index * 100,
//         useNativeDriver: true,
//       })
//     );

//     Animated.parallel([
//       ...avatarAnimations,
//       Animated.timing(titleAnim, {
//         toValue: 1,
//         duration: 800,
//         delay: 600,
//         useNativeDriver: true,
//       }),
//       ...buttonAnims.map((anim, index) =>
//         Animated.timing(anim, {
//           toValue: 0,
//           duration: 500,
//           delay: 1000 + index * 100,
//           useNativeDriver: true,
//         })
//       ),
//     ]).start();
//   }, []);

//   // ⭐ Avatars aligned close to screenshot
//   const centerX = width / 2;
//   const baseTop = height * 0.19;

//   const avatarPositions = [
//     // top-left
//     {
//       top: baseTop,
//       left: centerX - 70,
//       bg: "#E8D4F8",
//       src: require("../../assets/avatar1.png"),
//       size: 50,
//     },
//     // top-right
//     {
//       top: baseTop + 4,
//       left: centerX + 15,
//       bg: "#FFD4D4",
//       src: require("../../assets/avatar2.png"),
//       size: 52,
//     },
//     // middle-right
//     {
//       top: baseTop + 44,
//       left: centerX + 65,
//       bg: "#D4F4F4",
//       src: require("../../assets/avatar3.png"),
//       size: 54,
//     },
//     // bottom-left
//     {
//       top: baseTop + 82,
//       left: centerX - 80,
//       bg: "#FFF4D4",
//       src: require("../../assets/avatar4.png"),
//       size: 56,
//     },
//     // big center bottom
//     {
//       top: baseTop + 60,
//       left: centerX - 34,
//       bg: "#FFB4D4",
//       src: require("../../assets/avatar5.png"),
//       size: 70,
//     },
//     // middle-left
//     {
//       top: baseTop + 30,
//       left: centerX - 100,
//       bg: "#D4E4F4",
//       src: require("../../assets/avatar6.png"),
//       size: 52,
//     },
//   ];

//   const handleGoogleSignIn = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate("Home");
//     }, 800);
//   };

//   const handleAppleSignIn = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate("Home");
//     }, 800);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Top badge: "Welcome To Ballastra" image */}
//       <View style={styles.logoWrapper}>
//         <Image
//           source={require("../../assets/Text.png")}
//           style={styles.welcomeLabel}
//           resizeMode="contain"
//         />
//       </View>

//       {/* Avatar Images */}
//       <View style={styles.avatarContainer}>
//         {avatarPositions.map((pos, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               styles.avatar,
//               {
//                 top: pos.top,
//                 left: pos.left,
//                 backgroundColor: pos.bg,
//                 width: pos.size,
//                 height: pos.size,
//                 borderRadius: pos.size / 2,
//                 opacity: avatarAnims[index],
//                 transform: [
//                   {
//                     scale: avatarAnims[index].interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [0, 1],
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           >
//             <Image
//               source={pos.src}
//               style={{
//                 width: pos.size * 0.75,
//                 height: pos.size * 0.75,
//                 borderRadius: pos.size,
//               }}
//               resizeMode="cover"
//             />
//           </Animated.View>
//         ))}
//       </View>

//       {/* Title */}
//       <Animated.View
//         style={[
//           styles.titleContainer,
//           {
//             opacity: titleAnim,
//             transform: [
//               {
//                 translateY: titleAnim.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [20, 0],
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         <Text style={styles.title}>Let’s Go</Text>
//       </Animated.View>

//       {/* Buttons */}
//       <View style={styles.buttonsContainer}>
//         {/* Login Button */}
//         <Animated.View style={{ transform: [{ translateY: buttonAnims[0] }] }}>
//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={() => navigation.navigate("Loginscreen")}
//           >
//             <Text style={styles.loginText}>Log In</Text>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Google Button */}
//         <Animated.View style={{ transform: [{ translateY: buttonAnims[1] }] }}>
//           <TouchableOpacity
//             style={styles.googleButton}
//             onPress={handleGoogleSignIn}
//           >
//             <View style={styles.googleContent}>
//               <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
//                 <G clipPath="url(#clip0)">
//                   <Path d="M4.43242 12.0863L3.73625 14.6852L1.19176 14.739C0.431328 13.3286 0 11.7149 0 10C0 8.34179 0.403281 6.77804 1.11812 5.40112H1.11867L3.38398 5.81644L4.37633 8.06815C4.16863 8.67366 4.05543 9.32366 4.05543 10C4.05551 10.7341 4.18848 11.4374 4.43242 12.0863Z" fill="#FBBB00" />
//                   <Path d="M19.8253 8.13184C19.9401 8.73676 20 9.36148 20 9.99996C20 10.7159 19.9247 11.4143 19.7813 12.0879C19.2945 14.3802 18.0225 16.3818 16.2605 17.7983L16.2599 17.7978L13.4066 17.6522L13.0028 15.1313C14.172 14.4456 15.0858 13.3725 15.5671 12.0879H10.2198V8.13184H19.8253Z" fill="#518EF8" />
//                   <Path d="M16.2599 17.7978L16.2604 17.7984C14.5467 19.1758 12.3698 20 10 20C6.19177 20 2.8808 17.8715 1.19177 14.739L4.43244 12.0863C5.27693 14.3401 7.45111 15.9445 10 15.9445C11.0956 15.9445 12.122 15.6484 13.0027 15.1313L16.2599 17.7978Z" fill="#28B446" />
//                   <Path d="M16.383 2.30219L13.1434 4.95437C12.2319 4.38461 11.1544 4.05547 10 4.05547C7.39344 4.05547 5.17859 5.73348 4.37641 8.06812L1.11871 5.40109H1.11816C2.78246 2.1923 6.1352 0 10 0C12.4264 0 14.6511 0.864297 16.383 2.30219Z" fill="#F14336" />
//                 </G>
//                 <Defs>
//                   <ClipPath id="clip0">
//                     <Rect width="20" height="20" fill="white" />
//                   </ClipPath>
//                 </Defs>
//               </Svg>

//               <Text style={styles.googleText}>Continue With Google</Text>
//             </View>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Apple Button */}
//         <Animated.View style={{ transform: [{ translateY: buttonAnims[2] }] }}>
//           <TouchableOpacity
//             style={styles.appleButton}
//             onPress={handleAppleSignIn}
//           >
//             <View style={styles.appleContent}>
//               <Ionicons name="logo-apple" size={24} color="#000" />
//               <Text style={styles.appleText}>Continue With Apple</Text>
//             </View>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Create Account Button */}
//         <Animated.View style={{ transform: [{ translateY: buttonAnims[3] }] }}>
//           <TouchableOpacity
//             style={styles.createButton}
//             onPress={() => navigation.navigate("CreateAccount")}
//           >
//             <Text style={styles.createText}>Create Account</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>

//       {/* Footer links like screenshot */}
//       <View style={styles.footerContainer}>
//         <TouchableOpacity>
//           <Text style={styles.footerText}>Privacy Policy</Text>
//         </TouchableOpacity>
//         <View style={{ width: 16 }} />
//         <TouchableOpacity>
//           <Text style={styles.footerText}>Terms of Services</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0a1628" },

//   // top pill label
//   logoWrapper: {
//     position: "absolute",
//     top: height * 0.06,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//     zIndex: 2,
//   },
//   welcomeLabel: {
//     width: width * 0.95,
//     height: height * 0.10,
//   },

//   avatarContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 360,
//   },
//   avatar: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   titleContainer: {
//     position: "absolute",
//     top: TITLE_TOP,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//   },
//   title: {
//     color: "#FFFFFF",
//     fontSize: 50,
//     fontWeight: "400",
//     letterSpacing: 2,
//   },

//   buttonsContainer: {
//     position: "absolute",
//     left: 24,
//     right: 24,
//     bottom: 130, // thoda upar so it matches mock
//   },

//   // ----- Login Button -----
//   loginButton: {
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//     backgroundColor: "#3154BA4D",
//     borderWidth: 1,
//     borderColor: "rgba(49, 84, 186, 1)",
//     paddingVertical: 20,
//   },
//   loginText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   // ----- Google Button -----
//   googleButton: {
//     paddingVertical: 20,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//     backgroundColor: "#FFFFFF",
//   },
//   googleContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   googleText: {
//     color: "#000000",
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   // ----- Apple Button -----
//   appleButton: {
//     paddingVertical: 20,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//     backgroundColor: "#FFFFFF",
//   },
//   appleContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   appleText: {
//     color: "#000000",
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   // ----- Create Account Button -----
//   createButton: {
//     paddingVertical: 20,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//     backgroundColor: "#1a3a6b",
//   },
//   createText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   // bottom links
//   footerContainer: {
//     position: "absolute",
//     bottom: 40,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   footerText: {
//     color: "#A0A7C2",
//     fontSize: 11,
//   },
// });
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Image,
//   ImageBackground,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

// const { width, height } = Dimensions.get("window");

// // layout helpers
// const TITLE_TOP = height * 0.38;

// export default function SigninUp({ navigation }) {
//   const [loading, setLoading] = useState(false);

//   const avatarAnims = useRef([
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//   ]).current;

//   const titleAnim = useRef(new Animated.Value(0)).current;

//   const buttonAnims = useRef([
//     new Animated.Value(50),
//     new Animated.Value(50),
//     new Animated.Value(50),
//     new Animated.Value(50),
//   ]).current;

//   useEffect(() => {
//     const avatarAnimations = avatarAnims.map((anim, index) =>
//       Animated.timing(anim, {
//         toValue: 1,
//         duration: 600,
//         delay: index * 100,
//         useNativeDriver: true,
//       })
//     );

//     Animated.parallel([
//       ...avatarAnimations,
//       Animated.timing(titleAnim, {
//         toValue: 1,
//         duration: 800,
//         delay: 600,
//         useNativeDriver: true,
//       }),
//       ...buttonAnims.map((anim, index) =>
//         Animated.timing(anim, {
//           toValue: 0,
//           duration: 500,
//           delay: 1000 + index * 100,
//           useNativeDriver: true,
//         })
//       ),
//     ]).start();
//   }, []);

//   // Avatar positions (exact same)
//   const centerX = width / 2;
//   const baseTop = height * 0.17;

//   const avatarPositions = [
//     { top: baseTop, left: centerX - 40, bg: "#E8D4F8", src: require("../../assets/avatar1.png"), size: 42 },
//     { top: baseTop - 8, left: centerX + 8, bg: "#FFD4D4", src: require("../../assets/avatar2.png"), size: 46 },
//     { top: baseTop + 38, left: centerX + 55, bg: "#D4F8F4", src: require("../../assets/avatar3.png"), size: 50 },
//     { top: baseTop + 80, left: centerX - 80, bg: "#FFF4D4", src: require("../../assets/avatar4.png"), size: 54 },
//     { top: baseTop + 50, left: centerX - 18, bg: "#FFB4D4", src: require("../../assets/avatar5.png"), size: 62 },
//     { top: baseTop + 25, left: centerX - 90, bg: "#D4E4F8", src: require("../../assets/avatar6.png"), size: 48 },
//   ];

//   const handleGoogleSignIn = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate("Home");
//     }, 800);
//   };

//   const handleAppleSignIn = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigation.navigate("Home");
//     }, 800);
//   };

//   return (
//     <ImageBackground
//       source={require("../../assets/image1.png")}
//       style={styles.bg}
//       resizeMode="cover"
//     >
//       <View style={styles.container}>

//         {/* Welcome Label Image */}
//         <View style={styles.logoWrapper}>
//           <Image
//             source={require("../../assets/Text.png")}
//             style={styles.welcomeLabel}
//             resizeMode="contain"
//           />
//         </View>

//         {/* Avatar Images */}
//         <View style={styles.avatarContainer}>
//           {avatarPositions.map((pos, index) => (
//             <Animated.View
//               key={index}
//               style={[
//                 styles.avatar,
//                 {
//                   top: pos.top,
//                   left: pos.left,
//                   backgroundColor: pos.bg,
//                   width: pos.size,
//                   height: pos.size,
//                   borderRadius: pos.size / 2,
//                   opacity: avatarAnims[index],
//                   transform: [
//                     {
//                       scale: avatarAnims[index].interpolate({
//                         inputRange: [0, 1],
//                         outputRange: [0, 1],
//                       }),
//                     },
//                   ],
//                 },
//               ]}
//             >
//               <Image
//                 source={pos.src}
//                 style={{
//                   width: pos.size * 0.75,
//                   height: pos.size * 0.75,
//                   borderRadius: pos.size,
//                 }}
//                 resizeMode="cover"
//               />
//             </Animated.View>
//           ))}
//         </View>

//         {/* Title */}
//         <Animated.View
//           style={[
//             styles.titleContainer,
//             {
//               opacity: titleAnim,
//               transform: [
//                 {
//                   translateY: titleAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [20, 0],
//                   }),
//                 },
//               ],
//             },
//           ]}
//         >
//           <Text style={styles.title}>Let’s Go</Text>
//         </Animated.View>

//         {/* Buttons */}
//         <View style={styles.buttonsContainer}>
//           {/* Login */}
//           <Animated.View style={{ transform: [{ translateY: buttonAnims[0] }] }}>
//             <TouchableOpacity
//               style={styles.loginButton}
//               onPress={() => navigation.navigate("Loginscreen")}
//             >
//               <Text style={styles.loginText}>Log In</Text>
//             </TouchableOpacity>
//           </Animated.View>

//           {/* Google */}
//           <Animated.View style={{ transform: [{ translateY: buttonAnims[1] }] }}>
//             <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
//               <View style={styles.googleContent}>
//                 <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
//                   <G clipPath="url(#clip0)">
//                     <Path fill="#FBBB00" d="M4.43 12.086L3.736 14.685l-2.544.054A9.99 9.99 0 010 10c0-1.658.403-3.222 1.118-4.599h.001l2.266.415 1 2.252A5.97 5.97 0 004.056 10c0 .734.133 1.437.376 2.086z"/>
//                     <Path fill="#518EF8" d="M19.825 8.132A9.96 9.96 0 0120 10c0 .716-.075 1.414-.219 2.088a10.013 10.013 0 01-3.52 5.71l-2.854-.146-.403-2.52a5.98 5.98 0 002.564-3.311h-5.347V8.132h9.604z"/>
//                     <Path fill="#28B446" d="M16.26 17.798A9.96 9.96 0 0110 20C6.192 20 2.88 17.871 1.192 14.739l3.24-2.653A5.975 5.975 0 0010 15.945c1.096 0 2.122-.296 3.003-.813l3.257 2.666z"/>
//                     <Path fill="#F14336" d="M16.383 2.302L13.143 4.954A5.947 5.947 0 0010 4.055a5.98 5.98 0 00-5.624 3.47L1.118 5.401C2.782 2.192 6.135 0 10 0c2.426 0 4.65.864 6.383 2.302z"/>
//                   </G>
//                   <Defs>
//                     <ClipPath id="clip0">
//                       <Rect width="20" height="20" fill="#fff" />
//                     </ClipPath>
//                   </Defs>
//                 </Svg>
//                 <Text style={styles.googleText}>Continue With Google</Text>
//               </View>
//             </TouchableOpacity>
//           </Animated.View>

//           {/* Apple */}
//           <Animated.View style={{ transform: [{ translateY: buttonAnims[2] }] }}>
//             <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
//               <View style={styles.appleContent}>
//                 <Ionicons name="logo-apple" size={24} color="#000" />
//                 <Text style={styles.appleText}>Continue With Apple</Text>
//               </View>
//             </TouchableOpacity>
//           </Animated.View>

//           {/* Create Account */}
//           <Animated.View style={{ transform: [{ translateY: buttonAnims[3] }] }}>
//             <TouchableOpacity
//               style={styles.createButton}
//               onPress={() => navigation.navigate("CreateAccount")}
//             >
//               <Text style={styles.createText}>Create Account</Text>
//             </TouchableOpacity>
//           </Animated.View>
//         </View>

//         {/* Footer */}
//         <View style={styles.footerContainer}>
//           <TouchableOpacity>
//             <Text style={styles.footerText}>Privacy Policy</Text>
//           </TouchableOpacity>
//           <View style={{ width: 16 }} />
//           <TouchableOpacity>
//             <Text style={styles.footerText}>Terms of Services</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({

//   safe: { 
//     flex: 1, 
//     backgroundColor: "#050B18",
//    },

//   bg: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//         backgroundColor: "#050B18"

    
//   },

//   container: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.0)",
//   },

//   logoWrapper: {
//     position: "absolute",
//     top: height * 0.06,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//   },
//   welcomeLabel: {
//     width: width * 0.95,
//     height: height * 0.10,
//   },

//   avatarContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//   },
//   avatar: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   titleContainer: {
//     position: "absolute",
//     top: TITLE_TOP,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//   },
//   title: {
//     color: "#fff",
//     fontSize: 50,
//     fontWeight: "400",
//     letterSpacing: 2,
//   },

//   buttonsContainer: {
//     position: "absolute",
//     left: 24,
//     right: 24,
//     bottom: 130,
//   },

//   loginButton: {
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//     backgroundColor: "#3154BA4D",
//     borderWidth: 1,
//     borderColor: "rgba(49,84,186,1)",
//     paddingVertical: 20,
//   },
//   loginText: { color: "#fff", fontSize: 14, fontWeight: "700" },

//   googleButton: {
//     paddingVertical: 20,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   googleContent: { flexDirection: "row", alignItems: "center", gap: 12 },
//   googleText: { color: "#000", fontSize: 14, fontWeight: "700" },

//   appleButton: {
//     paddingVertical: 20,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   appleContent: { flexDirection: "row", alignItems: "center", gap: 12 },
//   appleText: { color: "#000", fontSize: 14, fontWeight: "700" },

//   createButton: {
//     paddingVertical: 20,
//     borderRadius: 18,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//     backgroundColor: "#1a3a6b",
//   },
//   createText: { color: "#fff", fontSize: 14, fontWeight: "700" },

//   footerContainer: {
//     position: "absolute",
//     bottom: 40,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   footerText: { color: "#A0A7C2", fontSize: 11 },
// });
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// TODO: हा path तुझ्या प्रोजेक्टनुसार change कर
import { BASE_URL } from "../config";

const { width, height } = Dimensions.get("window");

// layout helpers
const TITLE_TOP = height * 0.38;

export default function SigninUp({ navigation }) {
  const [loading, setLoading] = useState(false);

  const avatarAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const titleAnim = useRef(new Animated.Value(0)).current;

  const buttonAnims = useRef([
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50),
  ]).current;

  useEffect(() => {
    const avatarAnimations = avatarAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.parallel([
      ...avatarAnimations,
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 800,
        delay: 600,
        useNativeDriver: true,
      }),
      ...buttonAnims.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 0,
          duration: 500,
          delay: 1000 + index * 100,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  // Avatar positions (exact same)
  const centerX = width / 2;
  const baseTop = height * 0.17;

  const avatarPositions = [
    {
      top: baseTop,
      left: centerX - 40,
      bg: "#E8D4F8",
      src: require("../../assets/avatar1.png"),
      size: 42,
    },
    {
      top: baseTop - 8,
      left: centerX + 8,
      bg: "#FFD4D4",
      src: require("../../assets/avatar2.png"),
      size: 46,
    },
    {
      top: baseTop + 38,
      left: centerX + 55,
      bg: "#D4F8F4",
      src: require("../../assets/avatar3.png"),
      size: 50,
    },
    {
      top: baseTop + 80,
      left: centerX - 80,
      bg: "#FFF4D4",
      src: require("../../assets/avatar4.png"),
      size: 54,
    },
    {
      top: baseTop + 50,
      left: centerX - 18,
      bg: "#FFB4D4",
      src: require("../../assets/avatar5.png"),
      size: 62,
    },
    {
      top: baseTop + 25,
      left: centerX - 90,
      bg: "#D4E4F8",
      src: require("../../assets/avatar6.png"),
      size: 48,
    },
  ];

  // ===================== GOOGLE (फिलहाल dummy / no backend) =====================
  const handleGoogleSignIn = () => {
    // इथे तुझ्याकडे backend google route नाही, म्हणून सध्या फक्त navigate:
    navigation.navigate("Home");
    // नंतर backend route तयार केल्यावर इथे axios.post("/google-login") वगैरे करू शकतो.
  };

  // ===================== APPLE LOGIN → /apple-login =====================
  const handleAppleSignIn = async () => {
    try {
      setLoading(true);

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error("No identity token from Apple");
      }

      // तुझ्या backend ला call: appleLogin controller
      const res = await axios.post(`${BASE_URL}/apple-login`, {
        id_token: credential.identityToken,
      });

      const { token, user, message } = res.data || {};

      // token/user मिळाला तर store कर
      if (token) {
        await AsyncStorage.setItem("token", token);
      }
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }

      Alert.alert("Success", message || "Apple login success");
      navigation.replace("Home"); // logged in user flow
    } catch (err) {
      console.log("Apple login error:", err?.response?.data || err?.message);
      Alert.alert("Apple Login Failed", "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Welcome Label Image */}
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/Text.png")}
            style={styles.welcomeLabel}
            resizeMode="contain"
          />
        </View>

        {/* Avatar Images */}
        <View style={styles.avatarContainer}>
          {avatarPositions.map((pos, index) => (
            <Animated.View
              key={index}
              style={[
                styles.avatar,
                {
                  top: pos.top,
                  left: pos.left,
                  backgroundColor: pos.bg,
                  width: pos.size,
                  height: pos.size,
                  borderRadius: pos.size / 2,
                  opacity: avatarAnims[index],
                  transform: [
                    {
                      scale: avatarAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image
                source={pos.src}
                style={{
                  width: pos.size * 0.75,
                  height: pos.size * 0.75,
                  borderRadius: pos.size,
                }}
                resizeMode="cover"
              />
            </Animated.View>
          ))}
        </View>

        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleAnim,
              transform: [
                {
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>Let’s Go</Text>
        </Animated.View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Login */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[0] }] }}>
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={() => navigation.navigate("Loginscreen")}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Google */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[1] }] }}>
            <TouchableOpacity
              style={[styles.googleButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={handleGoogleSignIn}
            >
              <View style={styles.googleContent}>
                <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <G clipPath="url(#clip0)">
                    <Path
                      fill="#FBBB00"
                      d="M4.43 12.086L3.736 14.685l-2.544.054A9.99 9.99 0 010 10c0-1.658.403-3.222 1.118-4.599h.001l2.266.415 1 2.252A5.97 5.97 0 004.056 10c0 .734.133 1.437.376 2.086z"
                    />
                    <Path
                      fill="#518EF8"
                      d="M19.825 8.132A9.96 9.96 0 0120 10c0 .716-.075 1.414-.219 2.088a10.013 10.013 0 01-3.52 5.71l-2.854-.146-.403-2.52a5.98 5.98 0 002.564-3.311h-5.347V8.132h9.604z"
                    />
                    <Path
                      fill="#28B446"
                      d="M16.26 17.798A9.96 9.96 0 0110 20C6.192 20 2.88 17.871 1.192 14.739l3.24-2.653A5.975 5.975 0 0010 15.945c1.096 0 2.122-.296 3.003-.813l3.257 2.666z"
                    />
                    <Path
                      fill="#F14336"
                      d="M16.383 2.302L13.143 4.954A5.947 5.947 0 0010 4.055a5.98 5.98 0 00-5.624 3.47L1.118 5.401C2.782 2.192 6.135 0 10 0c2.426 0 4.65.864 6.383 2.302z"
                    />
                  </G>
                  <Defs>
                    <ClipPath id="clip0">
                      <Rect width="20" height="20" fill="#fff" />
                    </ClipPath>
                  </Defs>
                </Svg>
                <Text style={styles.googleText}>Continue With Google</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Apple */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[2] }] }}>
            <TouchableOpacity
              style={[styles.appleButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={handleAppleSignIn}
            >
              <View style={styles.appleContent}>
                <Ionicons name="logo-apple" size={24} color="#000" />
                {loading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text style={styles.appleText}>Continue With Apple</Text>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Create Account */}
          <Animated.View style={{ transform: [{ translateY: buttonAnims[3] }] }}>
            <TouchableOpacity
              style={[styles.createButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Text style={styles.createText}>Create Account</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={{ width: 16 }} />
          <TouchableOpacity>
            <Text style={styles.footerText}>Terms of Services</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050B18",
  },

  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#050B18",
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.0)",
  },

  logoWrapper: {
    position: "absolute",
    top: height * 0.06,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  welcomeLabel: {
    width: width * 0.95,
    height: height * 0.1,
  },

  avatarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  avatar: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    position: "absolute",
    top: TITLE_TOP,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "400",
    letterSpacing: 2,
  },

  buttonsContainer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 130,
  },

  loginButton: {
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#3154BA4D",
    borderWidth: 1,
    borderColor: "rgba(49,84,186,1)",
    paddingVertical: 20,
  },
  loginText: { color: "#fff", fontSize: 14, fontWeight: "700" },

  googleButton: {
    paddingVertical: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  googleContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  googleText: { color: "#000", fontSize: 14, fontWeight: "700" },

  appleButton: {
    paddingVertical: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  appleContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  appleText: { color: "#000", fontSize: 14, fontWeight: "700" },

  createButton: {
    paddingVertical: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#1a3a6b",
  },
  createText: { color: "#fff", fontSize: 14, fontWeight: "700" },

  footerContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: { color: "#A0A7C2", fontSize: 11 },
});
