// // // screens/VerifyOtpScreen.js
// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   Dimensions,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";

// // const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
// // const guidelineBaseWidth = 375;
// // const scale = (size) => (SCREEN_W / guidelineBaseWidth) * size;

// // export default function VerifyOtpScreen({ route, navigation }) {
// //   const phone = route?.params?.phone ?? "";
// //   const [code, setCode] = useState("");

// //   const submit = () => {
// //     if (code.length < 4) {
// //       Alert.alert("Enter code", "Please enter the 4-digit code.");
// //       return;
// //     }
// //     // mock success
// //     Alert.alert("Verified", `Phone ${phone} verified successfully`);
// //     // navigate back or to next screen
// //     navigation?.popToTop?.();
// //   };

// //   return (
// //     <SafeAreaView style={styles.safe}>
// //       <View style={styles.container}>
// //         <Text style={styles.title}>Enter verification code</Text>
// //         <Text style={styles.sub}>We sent a code to {phone}</Text>

// //         <TextInput
// //           style={styles.input}
// //           keyboardType="number-pad"
// //           placeholder="1234"
// //           placeholderTextColor="rgba(255,255,255,0.35)"
// //           value={code}
// //           onChangeText={(t) => setCode(t.replace(/[^\d]/g, "").slice(0, 6))}
// //           maxLength={6}
// //         />

// //         <TouchableOpacity style={styles.btn} onPress={submit}>
// //           <Text style={styles.btnText}>Confirm</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safe: { flex: 1, backgroundColor: "#0c0f1a" },
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     alignItems: "center",
// //   },
// //   title: {
// //     fontSize: scale(20),
// //     color: "#fff",
// //     fontWeight: "600",
// //     marginTop: 30,
// //   },
// //   sub: {
// //     color: "rgba(255,255,255,0.5)",
// //     marginTop: 12,
// //     textAlign: "center",
// //   },
// //   input: {
// //     marginTop: 28,
// //     width: "70%",
// //     paddingVertical: 12,
// //     paddingHorizontal: 14,
// //     borderRadius: 10,
// //     backgroundColor: "rgba(255,255,255,0.03)",
// //     color: "#fff",
// //     fontSize: scale(18),
// //     textAlign: "center",
// //   },
// //   btn: {
// //     marginTop: 26,
// //     backgroundColor: "#2b3b79",
// //     paddingVertical: 12,
// //     width: "50%",
// //     alignItems: "center",
// //     borderRadius: 30,
// //   },
// //   btnText: { color: "#fff", fontWeight: "600" },
// // });
// // screens/VerifyOtpScreen.js
// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   Dimensions,
// //   KeyboardAvoidingView,
// //   Platform,
// //   TouchableWithoutFeedback,
// //   Keyboard,
// //   ActivityIndicator,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { LinearGradient } from "expo-linear-gradient";

// // const { width: SCREEN_W } = Dimensions.get("window");
// // const guidelineBaseWidth = 375;
// // const scale = (size) => (SCREEN_W / guidelineBaseWidth) * size;

// // export default function VerifyOtpScreen({ route, navigation }) {
// //   const phone = route?.params?.phone ?? "+91 ••• ••• •••";
// //   const CODE_LENGTH = 4;

// //   const [code, setCode] = useState(""); // raw digits string
// //   const [loading, setLoading] = useState(false);
// //   const [resendTimer, setResendTimer] = useState(30); // seconds
// //   const [isResendDisabled, setIsResendDisabled] = useState(true);

// //   const inputRef = useRef(null);

// //   // Start countdown for resend
// //   useEffect(() => {
// //     setIsResendDisabled(true);
// //     setResendTimer(30);
// //     const tick = setInterval(() => {
// //       setResendTimer((t) => {
// //         if (t <= 1) {
// //           clearInterval(tick);
// //           setIsResendDisabled(false);
// //           return 0;
// //         }
// //         return t - 1;
// //       });
// //     }, 1000);

// //     return () => clearInterval(tick);
// //   }, []);

// //   // auto submit when code complete
// //   useEffect(() => {
// //     if (code.length === CODE_LENGTH) {
// //       // small delay to show last digit before submitting
// //       const id = setTimeout(() => handleVerify(), 300);
// //       return () => clearTimeout(id);
// //     }
// //   }, [code]);

// //   const handleChange = (text) => {
// //     // keep only digits & limit to CODE_LENGTH
// //     const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
// //     setCode(digits);
// //   };

// //   const handleVerify = async () => {
// //     if (code.length < CODE_LENGTH) {
// //       Alert.alert("Enter code", `Please enter the ${CODE_LENGTH}-digit code.`);
// //       return;
// //     }

// //     setLoading(true);
// //     // simulate network request
// //     try {
// //       await new Promise((res) => setTimeout(res, 1200));
// //       setLoading(false);
// //       Alert.alert("Verified", `Phone ${phone} verified successfully.`);
// //       // navigate where needed - example pop to top
// //       navigation?.popToTop?.();
// //     } catch (err) {
// //       setLoading(false);
// //       Alert.alert("Error", "Failed to verify. Try again.");
// //     }
// //   };

// //   const handleResend = () => {
// //     if (isResendDisabled) return;
// //     // simulate resend flow
// //     setIsResendDisabled(true);
// //     setResendTimer(30);
// //     const tick = setInterval(() => {
// //       setResendTimer((t) => {
// //         if (t <= 1) {
// //           clearInterval(tick);
// //           setIsResendDisabled(false);
// //           return 0;
// //         }
// //         return t - 1;
// //       });
// //     }, 1000);

// //     // mock sending
// //     Alert.alert("Resend", `A new code has been sent to ${phone}`);
// //     setCode("");
// //     inputRef.current?.focus();
// //   };

// //   const renderBoxes = () => {
// //     const digits = code.split("");
// //     const boxes = [];
// //     for (let i = 0; i < CODE_LENGTH; i += 1) {
// //       boxes.push(
// //         <View key={i} style={styles.boxWrapper}>
// //           <View style={[styles.box, code.length > i ? styles.boxFilled : null]}>
// //             <Text style={styles.boxText}>{digits[i] ?? ""}</Text>
// //           </View>
// //         </View>
// //       );
// //     }
// //     return boxes;
// //   };

// //   return (
// //     <SafeAreaView style={styles.safe}>
// //       <KeyboardAvoidingView
// //         style={styles.flex}
// //         behavior={Platform.OS === "ios" ? "padding" : undefined}
// //       >
// //         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
// //           <View style={styles.container}>
// //             <TouchableOpacity
// //               style={styles.closeBtn}
// //               onPress={() => navigation?.goBack?.()}
// //             >
// //               <Text style={styles.closeText}>✕</Text>
// //             </TouchableOpacity>

// //             <Text style={styles.headerTitle}>Security</Text>

// //             <Text style={styles.title}>Verifications</Text>
// //             <Text style={styles.subtitle}>
// //               Check your SMS and enter the verification code.
// //             </Text>

// //             <TouchableOpacity
// //               activeOpacity={1}
// //               style={styles.boxRowTouchable}
// //               onPress={() => inputRef.current?.focus()}
// //             >
// //               <View style={styles.boxRow}>{renderBoxes()}</View>
// //             </TouchableOpacity>

// //             {/* Hidden text input */}
// //             <TextInput
// //               ref={inputRef}
// //               value={code}
// //               onChangeText={handleChange}
// //               keyboardType="number-pad"
// //               returnKeyType="done"
// //               textContentType="oneTimeCode"
// //               maxLength={CODE_LENGTH}
// //               style={styles.hiddenInput}
// //               accessible={false}
// //               importantForAutofill="no"
// //               autoFocus
// //             />

// //             <View style={styles.resendRow}>
// //               <Text style={styles.ifText}>If you don't receive a code ?</Text>
// //               <TouchableOpacity
// //                 onPress={handleResend}
// //                 disabled={isResendDisabled}
// //                 hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
// //               >
// //                 <Text
// //                   style={[
// //                     styles.resendText,
// //                     isResendDisabled ? styles.resendDisabled : null,
// //                   ]}
// //                 >
// //                   {isResendDisabled ? `Resend (${resendTimer}s)` : "Resend"}
// //                 </Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View style={styles.loadingRow}>
// //               {loading ? (
// //                 <ActivityIndicator size="small" color="#cbd5ff" />
// //               ) : null}
// //               {!loading ? <Text style={styles.loadingText}>Loading</Text> : null}
// //             </View>

// //             <TouchableOpacity
// //               activeOpacity={0.9}
// //               onPress={handleVerify}
// //               disabled={loading || code.length < CODE_LENGTH}
// //               style={{ width: "100%", alignItems: "center" }}
// //             >
// //               <LinearGradient
// //                 colors={
// //                   code.length === CODE_LENGTH && !loading
// //                     ? ["#2f3b81", "#1f2a57"]
// //                     : ["#23273f", "#151826"]
// //                 }
// //                 start={[0, 0]}
// //                 end={[1, 1]}
// //                 style={[
// //                   styles.verifyBtn,
// //                   loading || code.length < CODE_LENGTH ? styles.btnDisabled : null,
// //                 ]}
// //               >
// //                 {loading ? (
// //                   <ActivityIndicator color="#fff" />
// //                 ) : (
// //                   <Text style={styles.verifyBtnText}>Verify</Text>
// //                 )}
// //               </LinearGradient>
// //             </TouchableOpacity>
// //           </View>
// //         </TouchableWithoutFeedback>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safe: { flex: 1, backgroundColor: "#0b0f1a" },
// //   flex: { flex: 1 },
// //   container: {
// //     flex: 1,
// //     paddingHorizontal: scale(20),
// //     alignItems: "center",
// //     paddingTop: scale(20),
// //   },
// //   closeBtn: {
// //     position: "absolute",
// //     left: scale(18),
// //     top: scale(18),
// //     zIndex: 3,
// //   },
// //   closeText: {
// //     color: "rgba(255,255,255,0.85)",
// //     fontSize: scale(20),
// //   },
// //   headerTitle: {
// //     color: "rgba(255,255,255,0.85)",
// //     fontSize: scale(12),
// //     marginTop: scale(4),
// //     marginBottom: scale(8),
// //   },
// //   title: {
// //     fontSize: scale(22),
// //     color: "#fff",
// //     fontWeight: "600",
// //     marginTop: scale(10),
// //   },
// //   subtitle: {
// //     color: "rgba(255,255,255,0.55)",
// //     marginTop: scale(12),
// //     textAlign: "center",
// //     paddingHorizontal: scale(12),
// //   },
// //   boxRowTouchable: {
// //     marginTop: scale(28),
// //     width: "100%",
// //     alignItems: "center",
// //   },
// //   boxRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     width: "72%",
// //   },
// //   boxWrapper: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   box: {
// //     width: scale(58),
// //     height: scale(58),
// //     borderRadius: scale(12),
// //     backgroundColor: "rgba(255,255,255,0.02)",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     // inner soft shadow / glow effect:
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.4,
// //     shadowRadius: 12,
// //     elevation: 6,
// //     borderWidth: 1,
// //     borderColor: "rgba(255,255,255,0.03)",
// //   },
// //   boxFilled: {
// //     // subtle inner gradient feel by increasing opacity
// //     backgroundColor: "rgba(50,65,120,0.25)",
// //     borderColor: "rgba(90,110,220,0.12)",
// //   },
// //   boxText: {
// //     color: "#fff",
// //     fontSize: scale(20),
// //     fontWeight: "600",
// //   },
// //   hiddenInput: {
// //     // hide visually but keep functional
// //     position: "absolute",
// //     opacity: 0,
// //     height: 1,
// //     width: 1,
// //   },
// //   resendRow: {
// //     marginTop: scale(20),
// //     alignItems: "center",
// //   },
// //   ifText: {
// //     color: "rgba(255,255,255,0.5)",
// //     fontSize: scale(13),
// //     marginBottom: scale(6),
// //   },
// //   resendText: {
// //     color: "#9fb0ff",
// //     textDecorationLine: "underline",
// //   },
// //   resendDisabled: {
// //     color: "rgba(159,176,255,0.45)",
// //     textDecorationLine: "none",
// //   },
// //   loadingRow: {
// //     marginTop: scale(18),
// //     alignItems: "center",
// //     flexDirection: "row",
// //     gap: scale(8),
// //     height: scale(20),
// //   },
// //   loadingText: {
// //     color: "rgba(255,255,255,0.6)",
// //     marginTop: 2,
// //   },
// //   verifyBtn: {
// //     marginTop: scale(22),
// //     width: "72%",
// //     paddingVertical: scale(14),
// //     borderRadius: scale(28),
// //     alignItems: "center",
// //     justifyContent: "center",
// //     // shadow
// //     shadowColor: "#2f3b81",
// //     shadowOffset: { width: 0, height: 8 },
// //     shadowOpacity: 0.28,
// //     shadowRadius: 12,
// //     elevation: 6,
// //   },
// //   verifyBtnText: {
// //     color: "#fff",
// //     fontWeight: "700",
// //     fontSize: scale(16),
// //   },
// //   btnDisabled: {
// //     opacity: 0.7,
// //   },
// // });
// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const { width: SCREEN_W } = Dimensions.get("window");
// const scale = (size) => (SCREEN_W / 375) * size;

// export default function VerifyOtpScreen({ route, navigation }) {
//   const phone = route?.params?.phone ?? "+91 93237 38283";

//   const [screen, setScreen] = useState("otp"); // otp | verified  
//   const CODE_LENGTH = 4;

//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendTimer, setResendTimer] = useState(30);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (screen !== "otp") return;
//     setIsResendDisabled(true);
//     setResendTimer(30);
//     const tick = setInterval(() => {
//       setResendTimer((t) => {
//         if (t <= 1) {
//           clearInterval(tick);
//           setIsResendDisabled(false);
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);

//     return () => clearInterval(tick);
//   }, [screen]);

//   useEffect(() => {
//     if (code.length === CODE_LENGTH) {
//       const id = setTimeout(() => handleVerify(), 300);
//       return () => clearTimeout(id);
//     }
//   }, [code]);

//   const handleChange = (t) => {
//     const d = t.replace(/\D/g, "").slice(0, CODE_LENGTH);
//     setCode(d);
//   };

//   const handleVerify = async () => {
//     if (code.length < CODE_LENGTH) return;

//     setLoading(true);
//     try {
//       await new Promise((res) => setTimeout(res, 1200));
//       setLoading(false);

//       setScreen("verified"); // UI change here
//     } catch (e) {
//       setLoading(false);
//       Alert.alert("Error", "Failed to verify");
//     }
//   };

//   const handleRemove = () => {
//     Alert.alert(
//       "Remove Number",
//       "Are you sure?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Remove",
//           style: "destructive",
//           onPress: () => {
//             Alert.alert("Removed", "Your number has been removed.");
//             navigation.goBack();
//           },
//         },
//       ]
//     );
//   };

//   // --------------------------
//   // VERIFIED UI
//   // --------------------------
//   if (screen === "verified") {
//     return (
//       <SafeAreaView style={styles.safe}>
//         <View style={styles.container}>
//           <TouchableOpacity
//             style={styles.backBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Ionicons name="chevron-back" color="#fff" size={24} />
//           </TouchableOpacity>

//           <Text style={styles.headerTitle2}>Security</Text>

//           <View style={styles.phoneBox}>
//             <Text style={styles.phoneText}>{phone}</Text>

//             <View style={styles.verifyRight}>
//               <Ionicons name="checkmark-circle" size={20} color="#6df28d" />
//               <Text style={styles.verifyText}>Verify</Text>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.removeBtn} onPress={handleRemove}>
//             <Ionicons name="trash-outline" size={18} color="red" />
//             <Text style={styles.removeText}>Remove Number</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // --------------------------
//   // OTP UI
//   // --------------------------

//   const renderBoxes = () => {
//     const digits = code.split("");
//     return [...Array(CODE_LENGTH)].map((_, i) => (
//       <View key={i} style={styles.boxWrapper}>
//         <View style={[styles.box, code.length > i && styles.boxFilled]}>
//           <Text style={styles.boxText}>{digits[i] ?? ""}</Text>
//         </View>
//       </View>
//     ));
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.container}>
//             <TouchableOpacity
//               style={styles.closeBtn}
//               onPress={() => navigation.goBack()}
//             >
//               <Text style={styles.closeText}>✕</Text>
//             </TouchableOpacity>

//             <Text style={styles.headerTitle}>Security</Text>

//             <Text style={styles.title}>Verifications</Text>
//             <Text style={styles.subtitle}>
//               Check your SMS and enter the verification code.
//             </Text>

//             <TouchableOpacity
//               activeOpacity={1}
//               style={styles.boxRowTouchable}
//               onPress={() => inputRef.current?.focus()}
//             >
//               <View style={styles.boxRow}>{renderBoxes()}</View>
//             </TouchableOpacity>

//             <TextInput
//               ref={inputRef}
//               value={code}
//               onChangeText={handleChange}
//               keyboardType="number-pad"
//               maxLength={4}
//               autoFocus
//               style={styles.hiddenInput}
//             />

//             <View style={styles.resendRow}>
//               <Text style={styles.ifText}>If you don't receive a code ?</Text>
//               <TouchableOpacity onPress={() => {}} disabled={isResendDisabled}>
//                 <Text
//                   style={[
//                     styles.resendText,
//                     isResendDisabled && styles.resendDisabled,
//                   ]}
//                 >
//                   {isResendDisabled
//                     ? `Resend (${resendTimer}s)`
//                     : "Resend"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.loadingRow}>
//               {loading && (
//                 <ActivityIndicator size="small" color="#cbd5ff" />
//               )}
//               {!loading && (
//                 <Text style={styles.loadingText}>Loading</Text>
//               )}
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.8}
//               disabled={loading || code.length < 4}
//               onPress={handleVerify}
//             >
//               <LinearGradient
//                 colors={
//                   code.length === 4
//                     ? ["#2f3b81", "#1f2a57"]
//                     : ["#23273f", "#151826"]
//                 }
//                 style={styles.verifyBtn}
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.verifyBtnText}>Verify</Text>
//                 )}
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// // ------------------
// // STYLES
// // ------------------
// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#0b0f1a" },
//   flex: { flex: 1 },
//   container: {
//     flex: 1,
//     paddingHorizontal: scale(20),
//     alignItems: "center",
//     paddingTop: scale(20),
//   },

//   // OTP SCREEN HEADER
//   closeBtn: {
//     position: "absolute",
//     left: scale(18),
//     top: scale(18),
//   },
//   closeText: { color: "#fff", fontSize: 20 },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 14,
//     marginBottom: 8,
//     marginTop: 10,
//   },

//   // VERIFIED SCREEN HEADER
//   headerTitle2: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: scale(30),
//   },

//   title: {
//     color: "#fff",
//     fontSize: scale(22),
//     fontWeight: "600",
//     marginTop: 10,
//   },
//   subtitle: {
//     color: "rgba(255,255,255,0.5)",
//     textAlign: "center",
//     marginTop: 8,
//   },

//   boxRowTouchable: { marginTop: 30, alignItems: "center" },
//   boxRow: { flexDirection: "row", width: "70%", justifyContent: "space-between" },
//   boxWrapper: { alignItems: "center" },
//   box: {
//     width: scale(55),
//     height: scale(55),
//     borderRadius: 12,
//     backgroundColor: "rgba(255,255,255,0.05)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   boxFilled: { backgroundColor: "rgba(80,100,200,0.25)" },
//   boxText: { color: "#fff", fontSize: 20, fontWeight: "600" },
//   hiddenInput: { position: "absolute", opacity: 0 },

//   resendRow: { marginTop: 20, alignItems: "center" },
//   ifText: { color: "#ccc", marginBottom: 4 },
//   resendText: { color: "#9fb0ff", textDecorationLine: "underline" },
//   resendDisabled: { opacity: 0.4 },

//   loadingRow: { marginTop: 20 },
//   loadingText: { color: "#aaa" },

//   verifyBtn: {
//     marginTop: 20,
//     width: scale(200),
//     paddingVertical: 14,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   verifyBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

//   // VERIFIED SCREEN
//   phoneBox: {
//     width: "88%",
//     backgroundColor: "#152149",
//     padding: scale(16),
//     borderRadius: scale(18),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   phoneText: { color: "#fff", fontSize: 15 },

//   verifyRight: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   verifyText: {
//     color: "#6df28d",
//     fontSize: 14,
//     fontWeight: "600",
//     marginLeft: 6,
//   },

//   removeBtn: {
//     marginTop: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   removeText: { color: "red", fontSize: 15, marginLeft: 6 },
// });


import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_W } = Dimensions.get("window");
const scale = (size) => (SCREEN_W / 375) * size;

export default function VerifyOtpScreen({ route, navigation }) {
  const phone = route?.params?.phone ?? "+91 93237 38283";

  const [screen, setScreen] = useState("otp"); // otp | verified
  const CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const [deletePopup, setDeletePopup] = useState(false);

  const inputRef = useRef(null);

  // OTP resend timer (only for otp screen)
  useEffect(() => {
    if (screen !== "otp") return;
    setResendTimer(30);
    setIsResendDisabled(true);
    const tick = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(tick);
          setIsResendDisabled(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [screen]);

  // auto verify when code complete
  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      const id = setTimeout(() => handleVerify(), 300);
      return () => clearTimeout(id);
    }
  }, [code]);

  const handleChange = (t) => {
    const d = t.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(d);
  };

  const handleVerify = async () => {
    if (code.length < CODE_LENGTH) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 900));
      setLoading(false);
      setScreen("verified");
    } catch (e) {
      setLoading(false);
    }
  };

  // show the custom modal (instead of Alert)
  const handleRemove = () => {
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    setDeletePopup(false);
    // TODO: call backend API here if needed
    // after delete success:
    navigation.goBack();
  };

  const cancelDelete = () => {
    setDeletePopup(false);
  };

  // VERIFIED UI
  if (screen === "verified") {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Security</Text>

          <View style={styles.phoneBox}>
            <Text style={styles.phoneText}>{phone}</Text>

            <View style={styles.verifyRight}>
              <Ionicons name="checkmark-circle" size={20} color="#6df28d" />
              <Text style={styles.verifyText}>Verify</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.removeBtn} onPress={handleRemove}>
            <Ionicons name="trash-outline" size={18} color="red" />
            <Text style={styles.removeText}>Remove Number</Text>
          </TouchableOpacity>

          {/* DELETE CONFIRM POPUP */}
          <Modal
            visible={deletePopup}
            transparent
            animationType="fade"
            onRequestClose={cancelDelete}
          >
            <TouchableWithoutFeedback onPress={cancelDelete}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContainer}>
              <View style={styles.popupOuter}>
                <View style={styles.popupInner}>
                  <Text style={styles.popupTitle}>
                    Are You Sure Want To Delete ?
                  </Text>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    activeOpacity={0.85}
                    onPress={confirmDelete}
                  >
                    <View style={styles.deleteBtnContent}>
                      <Ionicons name="trash-outline" size={18} color="#ff6b6b" />
                      <Text style={styles.deleteBtnText}>
                        Delete Mobile Number
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelBtn}
                    activeOpacity={0.85}
                    onPress={cancelDelete}
                  >
                    <LinearGradient
                      colors={["#1b2a5a", "#10204a"]}
                      style={styles.cancelGradient}
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }

  // OTP UI
  const renderBoxes = () => {
    const digits = code.split("");
    return [...Array(CODE_LENGTH)].map((_, i) => (
      <View key={i} style={styles.boxWrapper}>
        <View style={[styles.box, code.length > i && styles.boxFilled]}>
          <Text style={styles.boxText}>{digits[i] ?? ""}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Security</Text>

            <Text style={styles.title}>Verifications</Text>
            <Text style={styles.subtitle}>
              Check your SMS and enter the verification code.
            </Text>

            <TouchableOpacity
              activeOpacity={1}
              style={styles.boxRowTouchable}
              onPress={() => inputRef.current?.focus()}
            >
              <View style={styles.boxRow}>{renderBoxes()}</View>
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={4}
              autoFocus
              style={styles.hiddenInput}
            />

            <View style={styles.resendRow}>
              <Text style={styles.ifText}>If you don't receive a code ?</Text>
              <TouchableOpacity onPress={() => {}} disabled={isResendDisabled}>
                <Text
                  style={[
                    styles.resendText,
                    isResendDisabled && styles.resendDisabled,
                  ]}
                >
                  {isResendDisabled ? `Resend (${resendTimer}s)` : "Resend"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loadingRow}>
              {loading && <ActivityIndicator size="small" color="#cbd5ff" />}
              {!loading && <Text style={styles.loadingText}>Loading</Text>}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={loading || code.length < 4}
              onPress={handleVerify}
            >
              <LinearGradient
                colors={
                  code.length === 4 ? ["#2f3b81", "#1f2a57"] : ["#23273f", "#151826"]
                }
                style={styles.verifyBtn}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.verifyBtnText}>Verify</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1,     backgroundColor: "#020a25ff",
 },
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    alignItems: "center",
    paddingTop: scale(20),
  },

  // OTP HEADER
  closeBtn: {
    position: "absolute",
    left: scale(18),
    top: scale(18),
  },
  closeText: { color: "#fff", fontSize: 20 },
  headerTitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
  },

  // OTP CONTENT
  title: {
    color: "#fff",
    fontSize: scale(22),
    fontWeight: "600",
    marginTop: 10,
  },
  subtitle: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 8,
  },

  boxRowTouchable: { marginTop: 30, alignItems: "center" },
  boxRow: { flexDirection: "row", width: "70%", justifyContent: "space-between" },
  boxWrapper: { alignItems: "center" },
  box: {
    width: scale(55),
    height: scale(55),
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  boxFilled: { backgroundColor: "rgba(80,100,200,0.25)" },
  boxText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  hiddenInput: { position: "absolute", opacity: 0 },

  resendRow: { marginTop: 20, alignItems: "center" },
  ifText: { color: "#ccc", marginBottom: 4 },
  resendText: { color: "#9fb0ff", textDecorationLine: "underline" },
  resendDisabled: { opacity: 0.4 },

  loadingRow: { marginTop: 20 },
  loadingText: { color: "#aaa" },

  verifyBtn: {
    marginTop: 20,
    width: scale(200),
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  verifyBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  // VERIFIED SCREEN
  phoneBox: {
    width: "88%",
    backgroundColor: "#152149",
    padding: scale(16),
    borderRadius: scale(18),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(111,145,255,0.12)",
  },

  phoneText: { color: "rgba(255,255,255,0.9)", fontSize: 15 },

  verifyRight: { flexDirection: "row", alignItems: "center" },
  verifyText: {
    color: "#6df28d",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },

  removeBtn: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  removeText: { color: "red", fontSize: 15, marginLeft: 6 },

  // --------- MODAL ----------
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "30%",
    alignItems: "center",
  },

  popupOuter: {
    width: "86%",
    borderRadius: 26,
    padding: 2,
    // outer blue stroke
    borderColor: "rgba(90,120,240,0.25)",
    borderWidth: 1,
    backgroundColor: "transparent",
  },

  popupInner: {
    backgroundColor: "#0f1320",
    borderRadius: 24,
    paddingVertical: scale(20),
    paddingHorizontal: scale(18),
    alignItems: "center",
    overflow: "hidden",
  },

  popupTitle: {
    color: "#fff",
    fontSize: scale(15),
    marginBottom: scale(16),
    textAlign: "center",
  },

  deleteBtn: {
    width: "100%",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,80,80,0.6)",
    backgroundColor: "rgba(0,0,0,0)",
    paddingVertical: 14,
    marginBottom: 12,
  },
  deleteBtnContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#ff6b6b",
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
  },

  cancelBtn: {
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
  },
  cancelGradient: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
