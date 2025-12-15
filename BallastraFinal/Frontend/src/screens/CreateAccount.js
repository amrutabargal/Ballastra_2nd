// // // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   TouchableOpacity,
// // // // // // //   StyleSheet,
// // // // // // //   TextInput,
// // // // // // //   Animated,
// // // // // // //   Dimensions,
// // // // // // //   StatusBar,
// // // // // // //   KeyboardAvoidingView,
// // // // // // //   Platform,
// // // // // // //   ScrollView,
// // // // // // // } from "react-native";
// // // // // // // import { Ionicons } from "@expo/vector-icons";

// // // // // // // const { width, height } = Dimensions.get("window");

// // // // // // // export default function RegisterScreen({ navigation }) {
// // // // // // //   const [firstName, setFirstName] = useState("");
// // // // // // //   const [lastName, setLastName] = useState("");
// // // // // // //   const [email, setEmail] = useState("");
// // // // // // //   const [password, setPassword] = useState("");
// // // // // // //   const [showPassword, setShowPassword] = useState(false);

// // // // // // //   // Animation values
// // // // // // //   const avatarAnim = useRef(new Animated.Value(0)).current;
// // // // // // //   const formAnim = useRef(new Animated.Value(50)).current;
// // // // // // //   const buttonAnim = useRef(new Animated.Value(50)).current;

// // // // // // //   useEffect(() => {
// // // // // // //     Animated.parallel([
// // // // // // //       Animated.spring(avatarAnim, {
// // // // // // //         toValue: 1,
// // // // // // //         tension: 50,
// // // // // // //         friction: 7,
// // // // // // //         useNativeDriver: true,
// // // // // // //       }),
// // // // // // //       Animated.timing(formAnim, {
// // // // // // //         toValue: 0,
// // // // // // //         duration: 600,
// // // // // // //         delay: 200,
// // // // // // //         useNativeDriver: true,
// // // // // // //       }),
// // // // // // //       Animated.timing(buttonAnim, {
// // // // // // //         toValue: 0,
// // // // // // //         duration: 600,
// // // // // // //         delay: 400,
// // // // // // //         useNativeDriver: true,
// // // // // // //       }),
// // // // // // //     ]).start();
// // // // // // //   }, []);

// // // // // // //   const handleCreateAccount = () => {
// // // // // // //     console.log("Create Account:", { firstName, lastName, email, password });
// // // // // // //     // navigation.navigate("Home");
// // // // // // //   };

// // // // // // //   const handleSkip = () => {
// // // // // // //     console.log("Skip");
// // // // // // //     // navigation.navigate("Home");
// // // // // // //   };

// // // // // // //   const handleClose = () => {
// // // // // // //     navigation.goBack();
// // // // // // //   };

// // // // // // //   const handleChangeAvatar = () => {
// // // // // // //     console.log("Change avatar");
// // // // // // //     // Open image picker
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <KeyboardAvoidingView
// // // // // // //       style={styles.container}
// // // // // // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // // // // // //     >
// // // // // // //       <StatusBar barStyle="light-content" />

// // // // // // //       {/* Grid Background */}
// // // // // // //       <View style={styles.gridPattern} />

// // // // // // //       <ScrollView
// // // // // // //         contentContainerStyle={styles.scrollContent}
// // // // // // //         showsVerticalScrollIndicator={false}
// // // // // // //         keyboardShouldPersistTaps="handled"
// // // // // // //       >
// // // // // // //         {/* Status Bar */}
// // // // // // //         <View style={styles.statusBar}>
// // // // // // //           <Text style={styles.time}>9:41</Text>
// // // // // // //           <View style={styles.statusIcons}>
// // // // // // //             <Text style={styles.icon}>📶</Text>
// // // // // // //             <Text style={styles.icon}>📡</Text>
// // // // // // //             <Text style={styles.icon}>🔋</Text>
// // // // // // //           </View>
// // // // // // //         </View>

// // // // // // //         {/* Header */}
// // // // // // //         <View style={styles.header}>
// // // // // // //           <TouchableOpacity
// // // // // // //             style={styles.closeButton}
// // // // // // //             onPress={handleClose}
// // // // // // //             activeOpacity={0.7}
// // // // // // //           >
// // // // // // //             <Ionicons name="close" size={28} color="white" />
// // // // // // //           </TouchableOpacity>

// // // // // // //           <TouchableOpacity
// // // // // // //             style={styles.skipButton}
// // // // // // //             onPress={handleSkip}
// // // // // // //             activeOpacity={0.7}
// // // // // // //           >
// // // // // // //             <Text style={styles.skipText}>Skip</Text>
// // // // // // //             <Ionicons name="chevron-forward" size={18} color="white" />
// // // // // // //           </TouchableOpacity>
// // // // // // //         </View>

// // // // // // //         {/* Avatar Section */}
// // // // // // //         <Animated.View
// // // // // // //           style={[
// // // // // // //             styles.avatarSection,
// // // // // // //             {
// // // // // // //               opacity: avatarAnim,
// // // // // // //               transform: [
// // // // // // //                 {
// // // // // // //                   scale: avatarAnim.interpolate({
// // // // // // //                     inputRange: [0, 1],
// // // // // // //                     outputRange: [0.5, 1],
// // // // // // //                   }),
// // // // // // //                 },
// // // // // // //               ],
// // // // // // //             },
// // // // // // //           ]}
// // // // // // //         >
// // // // // // //           <TouchableOpacity
// // // // // // //             style={styles.avatarContainer}
// // // // // // //             onPress={handleChangeAvatar}
// // // // // // //             activeOpacity={0.8}
// // // // // // //           >
// // // // // // //             <View style={styles.avatar}>
// // // // // // //               <Text style={styles.avatarEmoji}>🤠</Text>
// // // // // // //             </View>
// // // // // // //           </TouchableOpacity>
// // // // // // //           <TouchableOpacity onPress={handleChangeAvatar}>
// // // // // // //             <Text style={styles.changeAvatarText}>Change avatar</Text>
// // // // // // //           </TouchableOpacity>
// // // // // // //         </Animated.View>

// // // // // // //         {/* Form Section */}
// // // // // // //         <Animated.View
// // // // // // //           style={[
// // // // // // //             styles.formSection,
// // // // // // //             {
// // // // // // //               opacity: formAnim.interpolate({
// // // // // // //                 inputRange: [0, 50],
// // // // // // //                 outputRange: [1, 0],
// // // // // // //               }),
// // // // // // //               transform: [{ translateY: formAnim }],
// // // // // // //             },
// // // // // // //           ]}
// // // // // // //         >
// // // // // // //           {/* First Name */}
// // // // // // //           <View style={styles.inputGroup}>
// // // // // // //             <Text style={styles.label}>First Name</Text>
// // // // // // //             <TextInput
// // // // // // //               style={styles.input}
// // // // // // //               placeholder="Enter Your Name"
// // // // // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // // //               value={firstName}
// // // // // // //               onChangeText={setFirstName}
// // // // // // //             />
// // // // // // //           </View>

// // // // // // //           {/* Last Name */}
// // // // // // //           <View style={styles.inputGroup}>
// // // // // // //             <Text style={styles.label}>Last Name</Text>
// // // // // // //             <TextInput
// // // // // // //               style={styles.input}
// // // // // // //               placeholder="Enter Your Last Name"
// // // // // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // // //               value={lastName}
// // // // // // //               onChangeText={setLastName}
// // // // // // //             />
// // // // // // //           </View>

// // // // // // //           {/* Email Address */}
// // // // // // //           <View style={styles.inputGroup}>
// // // // // // //             <Text style={styles.label}>Email Address</Text>
// // // // // // //             <TextInput
// // // // // // //               style={styles.input}
// // // // // // //               placeholder="Enter Your Email Id"
// // // // // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // // //               value={email}
// // // // // // //               onChangeText={setEmail}
// // // // // // //               keyboardType="email-address"
// // // // // // //               autoCapitalize="none"
// // // // // // //             />
// // // // // // //           </View>

// // // // // // //           {/* Password */}
// // // // // // //           <View style={styles.inputGroup}>
// // // // // // //             <View style={styles.passwordHeader}>
// // // // // // //               <Text style={styles.label}>Password</Text>
// // // // // // //               <TouchableOpacity>
// // // // // // //                 <Text style={styles.forgotPassword}>Forget Password</Text>
// // // // // // //               </TouchableOpacity>
// // // // // // //             </View>
// // // // // // //             <View style={styles.passwordInputContainer}>
// // // // // // //               <TextInput
// // // // // // //                 style={[styles.input, styles.passwordInput]}
// // // // // // //                 placeholder="Enter Your Password"
// // // // // // //                 placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // // //                 value={password}
// // // // // // //                 onChangeText={setPassword}
// // // // // // //                 secureTextEntry={!showPassword}
// // // // // // //               />
// // // // // // //               <TouchableOpacity
// // // // // // //                 style={styles.eyeIcon}
// // // // // // //                 onPress={() => setShowPassword(!showPassword)}
// // // // // // //               >
// // // // // // //                 <Ionicons
// // // // // // //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// // // // // // //                   size={22}
// // // // // // //                   color="rgba(255, 255, 255, 0.5)"
// // // // // // //                 />
// // // // // // //               </TouchableOpacity>
// // // // // // //             </View>
// // // // // // //           </View>
// // // // // // //         </Animated.View>

// // // // // // //         {/* Create Account Button */}
// // // // // // //         <Animated.View
// // // // // // //           style={[
// // // // // // //             styles.buttonContainer,
// // // // // // //             {
// // // // // // //               opacity: buttonAnim.interpolate({
// // // // // // //                 inputRange: [0, 50],
// // // // // // //                 outputRange: [1, 0],
// // // // // // //               }),
// // // // // // //               transform: [{ translateY: buttonAnim }],
// // // // // // //             },
// // // // // // //           ]}
// // // // // // //         >
// // // // // // //           <TouchableOpacity
// // // // // // //             style={styles.createButton}
// // // // // // //             onPress={handleCreateAccount}
// // // // // // //             activeOpacity={0.8}
// // // // // // //           >
// // // // // // //             <Text style={styles.createButtonText}>Create Account</Text>
// // // // // // //           </TouchableOpacity>
// // // // // // //         </Animated.View>

// // // // // // //         {/* Home Indicator */}
// // // // // // //         <View style={styles.homeIndicator} />
// // // // // // //       </ScrollView>
// // // // // // //     </KeyboardAvoidingView>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: {
// // // // // // //     flex: 1,
// // // // // // //     backgroundColor: "#0a1628",
// // // // // // //   },
// // // // // // //   gridPattern: {
// // // // // // //     position: "absolute",
// // // // // // //     top: 0,
// // // // // // //     left: 0,
// // // // // // //     right: 0,
// // // // // // //     bottom: 0,
// // // // // // //     backgroundColor: "transparent",
// // // // // // //   },
// // // // // // //   scrollContent: {
// // // // // // //     flexGrow: 1,
// // // // // // //     paddingBottom: 40,
// // // // // // //   },
// // // // // // //   statusBar: {
// // // // // // //     height: 44,
// // // // // // //     flexDirection: "row",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "center",
// // // // // // //     paddingHorizontal: 20,
// // // // // // //     paddingTop: 10,
// // // // // // //   },
// // // // // // //   time: {
// // // // // // //     color: "white",
// // // // // // //     fontSize: 15,
// // // // // // //     fontWeight: "600",
// // // // // // //   },
// // // // // // //   statusIcons: {
// // // // // // //     flexDirection: "row",
// // // // // // //     gap: 5,
// // // // // // //   },
// // // // // // //   icon: {
// // // // // // //     fontSize: 14,
// // // // // // //   },
// // // // // // //   header: {
// // // // // // //     flexDirection: "row",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "center",
// // // // // // //     paddingHorizontal: 20,
// // // // // // //     paddingTop: 10,
// // // // // // //     marginBottom: 20,
// // // // // // //   },
// // // // // // //   closeButton: {
// // // // // // //     width: 40,
// // // // // // //     height: 40,
// // // // // // //     justifyContent: "center",
// // // // // // //     alignItems: "center",
// // // // // // //   },
// // // // // // //   skipButton: {
// // // // // // //     flexDirection: "row",
// // // // // // //     alignItems: "center",
// // // // // // //     gap: 4,
// // // // // // //   },
// // // // // // //   skipText: {
// // // // // // //     color: "white",
// // // // // // //     fontSize: 16,
// // // // // // //     fontWeight: "400",
// // // // // // //   },
// // // // // // //   avatarSection: {
// // // // // // //     alignItems: "center",
// // // // // // //     marginBottom: 30,
// // // // // // //   },
// // // // // // //   avatarContainer: {
// // // // // // //     marginBottom: 12,
// // // // // // //   },
// // // // // // //   avatar: {
// // // // // // //     width: 100,
// // // // // // //     height: 100,
// // // // // // //     borderRadius: 50,
// // // // // // //     backgroundColor: "#7FE8C8",
// // // // // // //     justifyContent: "center",
// // // // // // //     alignItems: "center",
// // // // // // //     shadowColor: "#000",
// // // // // // //     shadowOffset: { width: 0, height: 4 },
// // // // // // //     shadowOpacity: 0.3,
// // // // // // //     shadowRadius: 12,
// // // // // // //     elevation: 8,
// // // // // // //   },
// // // // // // //   avatarEmoji: {
// // // // // // //     fontSize: 50,
// // // // // // //   },
// // // // // // //   changeAvatarText: {
// // // // // // //     color: "rgba(255, 255, 255, 0.7)",
// // // // // // //     fontSize: 15,
// // // // // // //     fontWeight: "400",
// // // // // // //   },
// // // // // // //   formSection: {
// // // // // // //     paddingHorizontal: 20,
// // // // // // //     marginBottom: 30,
// // // // // // //   },
// // // // // // //   inputGroup: {
// // // // // // //     marginBottom: 20,
// // // // // // //   },
// // // // // // //   label: {
// // // // // // //     color: "white",
// // // // // // //     fontSize: 15,
// // // // // // //     fontWeight: "500",
// // // // // // //     marginBottom: 10,
// // // // // // //   },
// // // // // // //   input: {
// // // // // // //     height: 56,
// // // // // // //     backgroundColor: "rgba(28, 58, 107, 0.5)",
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: "rgba(28, 76, 255, 0.3)",
// // // // // // //     borderRadius: 16,
// // // // // // //     paddingHorizontal: 20,
// // // // // // //     color: "white",
// // // // // // //     fontSize: 15,
// // // // // // //   },
// // // // // // //   passwordHeader: {
// // // // // // //     flexDirection: "row",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "center",
// // // // // // //     marginBottom: 10,
// // // // // // //   },
// // // // // // //   forgotPassword: {
// // // // // // //     color: "rgba(255, 255, 255, 0.6)",
// // // // // // //     fontSize: 14,
// // // // // // //     fontWeight: "400",
// // // // // // //   },
// // // // // // //   passwordInputContainer: {
// // // // // // //     position: "relative",
// // // // // // //   },
// // // // // // //   passwordInput: {
// // // // // // //     paddingRight: 50,
// // // // // // //   },
// // // // // // //   eyeIcon: {
// // // // // // //     position: "absolute",
// // // // // // //     right: 18,
// // // // // // //     top: 17,
// // // // // // //     zIndex: 10,
// // // // // // //   },
// // // // // // //   buttonContainer: {
// // // // // // //     paddingHorizontal: 20,
// // // // // // //     alignItems: "center",
// // // // // // //   },
// // // // // // //   createButton: {
// // // // // // //     width: "70%",
// // // // // // //     height: 56,
// // // // // // //     backgroundColor: "#4A7FE8",
// // // // // // //     borderRadius: 28,
// // // // // // //     justifyContent: "center",
// // // // // // //     alignItems: "center",
// // // // // // //     shadowColor: "#4A7FE8",
// // // // // // //     shadowOffset: { width: 0, height: 6 },
// // // // // // //     shadowOpacity: 0.4,
// // // // // // //     shadowRadius: 15,
// // // // // // //     elevation: 10,
// // // // // // //   },
// // // // // // //   createButtonText: {
// // // // // // //     color: "white",
// // // // // // //     fontSize: 17,
// // // // // // //     fontWeight: "600",
// // // // // // //   },
// // // // // // //   homeIndicator: {
// // // // // // //     width: 134,
// // // // // // //     height: 5,
// // // // // // //     backgroundColor: "white",
// // // // // // //     borderRadius: 3,
// // // // // // //     opacity: 0.3,
// // // // // // //     alignSelf: "center",
// // // // // // //     marginTop: 30,
// // // // // // //   },
// // // // // // // });






// // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   TouchableOpacity,
// // // // // //   StyleSheet,
// // // // // //   TextInput,
// // // // // //   Animated,
// // // // // //   Dimensions,
// // // // // //   StatusBar,
// // // // // //   KeyboardAvoidingView,
// // // // // //   Platform,
// // // // // //   ScrollView,
// // // // // //   Alert,
// // // // // // } from "react-native";
// // // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // // import AsyncStorage from "@react-native-async-storage/async-storage";

// // // // // // const { width, height } = Dimensions.get("window");

// // // // // // // 🔗 Base URL for backend (change IP/port if needed)
// // // // // // const BASE_URL =
// // // // // //   Platform.OS === "android"
// // // // // //     ? "http://10.0.2.2:5000/api" // Android emulator
// // // // // //     : "http://localhost:5000/api"; // iOS simulator

// // // // // // export default function RegisterScreen({ navigation }) {
// // // // // //   const [firstName, setFirstName] = useState("");
// // // // // //   const [lastName, setLastName] = useState("");
// // // // // //   const [email, setEmail] = useState("");
// // // // // //   const [password, setPassword] = useState("");
// // // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // Animation values
// // // // // //   const avatarAnim = useRef(new Animated.Value(0)).current;
// // // // // //   const formAnim = useRef(new Animated.Value(50)).current;
// // // // // //   const buttonAnim = useRef(new Animated.Value(50)).current;

// // // // // //   useEffect(() => {
// // // // // //     Animated.parallel([
// // // // // //       Animated.spring(avatarAnim, {
// // // // // //         toValue: 1,
// // // // // //         tension: 50,
// // // // // //         friction: 7,
// // // // // //         useNativeDriver: true,
// // // // // //       }),
// // // // // //       Animated.timing(formAnim, {
// // // // // //         toValue: 0,
// // // // // //         duration: 600,
// // // // // //         delay: 200,
// // // // // //         useNativeDriver: true,
// // // // // //       }),
// // // // // //       Animated.timing(buttonAnim, {
// // // // // //         toValue: 0,
// // // // // //         duration: 600,
// // // // // //         delay: 400,
// // // // // //         useNativeDriver: true,
// // // // // //       }),
// // // // // //     ]).start();
// // // // // //   }, [avatarAnim, formAnim, buttonAnim]);

// // // // // //   // 🔐 CREATE ACCOUNT → calls backend /auth/signup
// // // // // //   const handleCreateAccount = async () => {
// // // // // //     if (!firstName || !lastName || !email || !password) {
// // // // // //       Alert.alert("Error", "Please fill all fields");
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       setLoading(true);

// // // // // //       const body = {
// // // // // //         name: `${firstName} ${lastName}`,
// // // // // //         email,
// // // // // //         password,
// // // // // //         avatar_url: null, // or a default avatar URL if you have one
// // // // // //       };

// // // // // //       const response = await fetch(`${BASE_URL}/auth/signup`, {
// // // // // //         method: "POST",
// // // // // //         headers: {
// // // // // //           "Content-Type": "application/json",
// // // // // //         },
// // // // // //         body: JSON.stringify(body),
// // // // // //       });

// // // // // //       const data = await response.json();

// // // // // //       if (!response.ok) {
// // // // // //         return Alert.alert("Sign Up Failed", data.message || "Something went wrong");
// // // // // //       }

// // // // // //       // data = { message, user, token }
// // // // // //       await AsyncStorage.setItem("token", data.token);
// // // // // //       await AsyncStorage.setItem("user", JSON.stringify(data.user));

// // // // // //       Alert.alert("Success", "Account created successfully!");
// // // // // //       navigation.replace("Home"); // or navigation.navigate("Login");
// // // // // //     } catch (error) {
// // // // // //       console.error("Signup Error:", error);
// // // // // //       Alert.alert("Error", "Unable to connect to server. Please try again.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSkip = () => {
// // // // // //     navigation.goBack();
// // // // // //   };

// // // // // //   const handleClose = () => {
// // // // // //     navigation.goBack();
// // // // // //   };

// // // // // //   const handleChangeAvatar = () => {
// // // // // //     console.log("Change avatar");
// // // // // //     // TODO: open image picker here
// // // // // //   };

// // // // // //   return (
// // // // // //     <KeyboardAvoidingView
// // // // // //       style={styles.container}
// // // // // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // // // // //     >
// // // // // //       <StatusBar barStyle="light-content" />

// // // // // //       {/* Grid Background */}
// // // // // //       <View style={styles.gridPattern} />

// // // // // //       <ScrollView
// // // // // //         contentContainerStyle={styles.scrollContent}
// // // // // //         showsVerticalScrollIndicator={false}
// // // // // //         keyboardShouldPersistTaps="handled"
// // // // // //       >
// // // // // //         {/* Status Bar Mock */}
// // // // // //         <View style={styles.statusBar}>
// // // // // //           <Text style={styles.time}>9:41</Text>
// // // // // //           <View style={styles.statusIcons}>
// // // // // //             <Text style={styles.icon}>📶</Text>
// // // // // //             <Text style={styles.icon}>📡</Text>
// // // // // //             <Text style={styles.icon}>🔋</Text>
// // // // // //           </View>
// // // // // //         </View>

// // // // // //         {/* Header */}
// // // // // //         <View style={styles.header}>
// // // // // //           <TouchableOpacity
// // // // // //             style={styles.closeButton}
// // // // // //             onPress={handleClose}
// // // // // //             activeOpacity={0.7}
// // // // // //           >
// // // // // //             <Ionicons name="close" size={28} color="white" />
// // // // // //           </TouchableOpacity>

// // // // // //           <TouchableOpacity
// // // // // //             style={styles.skipButton}
// // // // // //             onPress={handleSkip}
// // // // // //             activeOpacity={0.7}
// // // // // //           >
// // // // // //             <Text style={styles.skipText}>Skip</Text>
// // // // // //             <Ionicons name="chevron-forward" size={18} color="white" />
// // // // // //           </TouchableOpacity>
// // // // // //         </View>

// // // // // //         {/* Avatar Section */}
// // // // // //         <Animated.View
// // // // // //           style={[
// // // // // //             styles.avatarSection,
// // // // // //             {
// // // // // //               opacity: avatarAnim,
// // // // // //               transform: [
// // // // // //                 {
// // // // // //                   scale: avatarAnim.interpolate({
// // // // // //                     inputRange: [0, 1],
// // // // // //                     outputRange: [0.5, 1],
// // // // // //                   }),
// // // // // //                 },
// // // // // //               ],
// // // // // //             },
// // // // // //           ]}
// // // // // //         >
// // // // // //           <TouchableOpacity
// // // // // //             style={styles.avatarContainer}
// // // // // //             onPress={handleChangeAvatar}
// // // // // //             activeOpacity={0.8}
// // // // // //           >
// // // // // //             <View style={styles.avatar}>
// // // // // //               <Text style={styles.avatarEmoji}>🤠</Text>
// // // // // //             </View>
// // // // // //           </TouchableOpacity>
// // // // // //           <TouchableOpacity onPress={handleChangeAvatar}>
// // // // // //             <Text style={styles.changeAvatarText}>Change avatar</Text>
// // // // // //           </TouchableOpacity>
// // // // // //         </Animated.View>

// // // // // //         {/* Form Section */}
// // // // // //         <Animated.View
// // // // // //           style={[
// // // // // //             styles.formSection,
// // // // // //             {
// // // // // //               opacity: formAnim.interpolate({
// // // // // //                 inputRange: [0, 50],
// // // // // //                 outputRange: [1, 0],
// // // // // //               }),
// // // // // //               transform: [{ translateY: formAnim }],
// // // // // //             },
// // // // // //           ]}
// // // // // //         >
// // // // // //           {/* First Name */}
// // // // // //           <View style={styles.inputGroup}>
// // // // // //             <Text style={styles.label}>First Name</Text>
// // // // // //             <TextInput
// // // // // //               style={styles.input}
// // // // // //               placeholder="Enter Your Name"
// // // // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // //               value={firstName}
// // // // // //               onChangeText={setFirstName}
// // // // // //             />
// // // // // //           </View>

// // // // // //           {/* Last Name */}
// // // // // //           <View style={styles.inputGroup}>
// // // // // //             <Text style={styles.label}>Last Name</Text>
// // // // // //             <TextInput
// // // // // //               style={styles.input}
// // // // // //               placeholder="Enter Your Last Name"
// // // // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // //               value={lastName}
// // // // // //               onChangeText={setLastName}
// // // // // //             />
// // // // // //           </View>

// // // // // //           {/* Email Address */}
// // // // // //           <View style={styles.inputGroup}>
// // // // // //             <Text style={styles.label}>Email Address</Text>
// // // // // //             <TextInput
// // // // // //               style={styles.input}
// // // // // //               placeholder="Enter Your Email Id"
// // // // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // //               value={email}
// // // // // //               onChangeText={setEmail}
// // // // // //               keyboardType="email-address"
// // // // // //               autoCapitalize="none"
// // // // // //             />
// // // // // //           </View>

// // // // // //           {/* Password */}
// // // // // //           <View style={styles.inputGroup}>
// // // // // //             <View className="statusBar" style={styles.passwordHeader}>
// // // // // //               <Text style={styles.label}>Password</Text>
// // // // // //               <TouchableOpacity
// // // // // //                 onPress={() =>
// // // // // //                   Alert.alert("Info", "Please use login screen to reset password")
// // // // // //                 }
// // // // // //               >
// // // // // //                 <Text style={styles.forgotPassword}>Forget Password</Text>
// // // // // //               </TouchableOpacity>
// // // // // //             </View>
// // // // // //             <View style={styles.passwordInputContainer}>
// // // // // //               <TextInput
// // // // // //                 style={[styles.input, styles.passwordInput]}
// // // // // //                 placeholder="Enter Your Password"
// // // // // //                 placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // // // //                 value={password}
// // // // // //                 onChangeText={setPassword}
// // // // // //                 secureTextEntry={!showPassword}
// // // // // //               />
// // // // // //               <TouchableOpacity
// // // // // //                 style={styles.eyeIcon}
// // // // // //                 onPress={() => setShowPassword(!showPassword)}
// // // // // //               >
// // // // // //                 <Ionicons
// // // // // //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// // // // // //                   size={22}
// // // // // //                   color="rgba(255, 255, 255, 0.5)"
// // // // // //                 />
// // // // // //               </TouchableOpacity>
// // // // // //             </View>
// // // // // //           </View>
// // // // // //         </Animated.View>

// // // // // //         {/* Create Account Button */}
// // // // // //         <Animated.View
// // // // // //           style={[
// // // // // //             styles.buttonContainer,
// // // // // //             {
// // // // // //               opacity: buttonAnim.interpolate({
// // // // // //                 inputRange: [0, 50],
// // // // // //                 outputRange: [1, 0],
// // // // // //               }),
// // // // // //               transform: [{ translateY: buttonAnim }],
// // // // // //             },
// // // // // //           ]}
// // // // // //         >
// // // // // //           <TouchableOpacity
// // // // // //             style={[styles.createButton, loading && { opacity: 0.7 }]}
// // // // // //             onPress={handleCreateAccount}
// // // // // //             activeOpacity={0.8}
// // // // // //             disabled={loading}
// // // // // //           >
// // // // // //             <Text style={styles.createButtonText}>
// // // // // //               {loading ? "Creating..." : "Create Account"}
// // // // // //             </Text>
// // // // // //           </TouchableOpacity>
// // // // // //         </Animated.View>

// // // // // //         {/* Home Indicator */}
// // // // // //         <View style={styles.homeIndicator} />
// // // // // //       </ScrollView>
// // // // // //     </KeyboardAvoidingView>
// // // // // //   );
// // // // // // }

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: {
// // // // // //     flex: 1,
// // // // // //     backgroundColor: "#0a1628",
// // // // // //   },
// // // // // //   gridPattern: {
// // // // // //     position: "absolute",
// // // // // //     top: 0,
// // // // // //     left: 0,
// // // // // //     right: 0,
// // // // // //     bottom: 0,
// // // // // //     backgroundColor: "transparent",
// // // // // //   },
// // // // // //   scrollContent: {
// // // // // //     flexGrow: 1,
// // // // // //     paddingBottom: 40,
// // // // // //   },
// // // // // //   statusBar: {
// // // // // //     height: 44,
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     alignItems: "center",
// // // // // //     paddingHorizontal: 20,
// // // // // //     paddingTop: 10,
// // // // // //   },
// // // // // //   time: {
// // // // // //     color: "white",
// // // // // //     fontSize: 15,
// // // // // //     fontWeight: "600",
// // // // // //   },
// // // // // //   statusIcons: {
// // // // // //     flexDirection: "row",
// // // // // //     gap: 5,
// // // // // //   },
// // // // // //   icon: {
// // // // // //     fontSize: 14,
// // // // // //   },
// // // // // //   header: {
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     alignItems: "center",
// // // // // //     paddingHorizontal: 20,
// // // // // //     paddingTop: 10,
// // // // // //     marginBottom: 20,
// // // // // //   },
// // // // // //   closeButton: {
// // // // // //     width: 40,
// // // // // //     height: 40,
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //   },
// // // // // //   skipButton: {
// // // // // //     flexDirection: "row",
// // // // // //     alignItems: "center",
// // // // // //     gap: 4,
// // // // // //   },
// // // // // //   skipText: {
// // // // // //     color: "white",
// // // // // //     fontSize: 16,
// // // // // //     fontWeight: "400",
// // // // // //   },
// // // // // //   avatarSection: {
// // // // // //     alignItems: "center",
// // // // // //     marginBottom: 30,
// // // // // //   },
// // // // // //   avatarContainer: {
// // // // // //     marginBottom: 12,
// // // // // //   },
// // // // // //   avatar: {
// // // // // //     width: 100,
// // // // // //     height: 100,
// // // // // //     borderRadius: 50,
// // // // // //     backgroundColor: "#7FE8C8",
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //     shadowColor: "#000",
// // // // // //     shadowOffset: { width: 0, height: 4 },
// // // // // //     shadowOpacity: 0.3,
// // // // // //     shadowRadius: 12,
// // // // // //     elevation: 8,
// // // // // //   },
// // // // // //   avatarEmoji: {
// // // // // //     fontSize: 50,
// // // // // //   },
// // // // // //   changeAvatarText: {
// // // // // //     color: "rgba(255, 255, 255, 0.7)",
// // // // // //     fontSize: 15,
// // // // // //     fontWeight: "400",
// // // // // //   },
// // // // // //   formSection: {
// // // // // //     paddingHorizontal: 20,
// // // // // //     marginBottom: 30,
// // // // // //   },
// // // // // //   inputGroup: {
// // // // // //     marginBottom: 20,
// // // // // //   },
// // // // // //   label: {
// // // // // //     color: "white",
// // // // // //     fontSize: 15,
// // // // // //     fontWeight: "500",
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   input: {
// // // // // //     height: 56,
// // // // // //     backgroundColor: "rgba(28, 58, 107, 0.5)",
// // // // // //     borderWidth: 1,
// // // // // //     borderColor: "rgba(28, 76, 255, 0.3)",
// // // // // //     borderRadius: 16,
// // // // // //     paddingHorizontal: 20,
// // // // // //     color: "white",
// // // // // //     fontSize: 15,
// // // // // //   },
// // // // // //   passwordHeader: {
// // // // // //     flexDirection: "row",
// // // // // //     justifyContent: "space-between",
// // // // // //     alignItems: "center",
// // // // // //     marginBottom: 10,
// // // // // //   },
// // // // // //   forgotPassword: {
// // // // // //     color: "rgba(255, 255, 255, 0.6)",
// // // // // //     fontSize: 14,
// // // // // //     fontWeight: "400",
// // // // // //   },
// // // // // //   passwordInputContainer: {
// // // // // //     position: "relative",
// // // // // //   },
// // // // // //   passwordInput: {
// // // // // //     paddingRight: 50,
// // // // // //   },
// // // // // //   eyeIcon: {
// // // // // //     position: "absolute",
// // // // // //     right: 18,
// // // // // //     top: 17,
// // // // // //     zIndex: 10,
// // // // // //   },
// // // // // //   buttonContainer: {
// // // // // //     paddingHorizontal: 20,
// // // // // //     alignItems: "center",
// // // // // //   },
// // // // // //   createButton: {
// // // // // //     width: "70%",
// // // // // //     height: 56,
// // // // // //     backgroundColor: "#4A7FE8",
// // // // // //     borderRadius: 28,
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //     shadowRadius: 15,
// // // // // //     shadowOpacity: 0.4,
// // // // // //     shadowOffset: { width: 0, height: 6 },
// // // // // //     elevation: 10,
// // // // // //   },
// // // // // //   createButtonText: {
// // // // // //     color: "white",
// // // // // //     fontSize: 17,
// // // // // //     fontWeight: "600",
// // // // // //   },
// // // // // //   homeIndicator: {
// // // // // //     width: 134,
// // // // // //     height: 5,
// // // // // //     backgroundColor: "white",
// // // // // //     borderRadius: 3,
// // // // // //     opacity: 0.3,
// // // // // //     alignSelf: "center",
// // // // // //     marginTop: 30,
// // // // // //   },
// // // // // // });

// // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   TouchableOpacity,
// // // // //   StyleSheet,
// // // // //   TextInput,
// // // // //   Animated,
// // // // //   Dimensions,
// // // // //   StatusBar,
// // // // //   KeyboardAvoidingView,
// // // // //   Platform,
// // // // //   ScrollView,
// // // // //   Alert,
// // // // // } from "react-native";
// // // // // import { Ionicons } from "@expo/vector-icons";
// // // // // import AsyncStorage from "@react-native-async-storage/async-storage";

// // // // // const { width, height } = Dimensions.get("window");

// // // // // // 🔗 CORRECT BASE URL (NO /api)
// // // // // const BASE_URL =
// // // // //   Platform.OS === "android"
// // // // //     ? "http://10.0.2.2:5000" // Android emulator
// // // // //     : "http://localhost:5000"; // iOS simulator

// // // // // export default function RegisterScreen({ navigation }) {
// // // // //   const [firstName, setFirstName] = useState("");
// // // // //   const [lastName, setLastName] = useState("");
// // // // //   const [email, setEmail] = useState("");
// // // // //   const [password, setPassword] = useState("");
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const avatarAnim = useRef(new Animated.Value(0)).current;
// // // // //   const formAnim = useRef(new Animated.Value(50)).current;
// // // // //   const buttonAnim = useRef(new Animated.Value(50)).current;

// // // // //   useEffect(() => {
// // // // //     Animated.parallel([
// // // // //       Animated.spring(avatarAnim, {
// // // // //         toValue: 1,
// // // // //         tension: 50,
// // // // //         friction: 7,
// // // // //         useNativeDriver: true,
// // // // //       }),
// // // // //       Animated.timing(formAnim, {
// // // // //         toValue: 0,
// // // // //         duration: 600,
// // // // //         delay: 200,
// // // // //         useNativeDriver: true,
// // // // //       }),
// // // // //       Animated.timing(buttonAnim, {
// // // // //         toValue: 0,
// // // // //         duration: 600,
// // // // //         delay: 400,
// // // // //         useNativeDriver: true,
// // // // //       }),
// // // // //     ]).start();
// // // // //   }, []);

// // // // //   // 🔐 CREATE ACCOUNT → POST /auth/signup
// // // // //   const handleCreateAccount = async () => {
// // // // //     if (!firstName || !lastName || !email || !password) {
// // // // //       Alert.alert("Error", "Please fill all fields");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setLoading(true);

// // // // //       const body = {
// // // // //         name: `${firstName} ${lastName}`,
// // // // //         email,
// // // // //         password,
// // // // //         avatar_url: null,
// // // // //       };

// // // // //       const response = await fetch(`${BASE_URL}/auth/signup`, {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //         },
// // // // //         body: JSON.stringify(body),
// // // // //       });

// // // // //       const data = await response.json();

// // // // //       if (!response.ok) {
// // // // //         return Alert.alert("Sign Up Failed", data.message || "Something went wrong");
// // // // //       }

// // // // //       await AsyncStorage.setItem("token", data.token);
// // // // //       await AsyncStorage.setItem("user", JSON.stringify(data.user));

// // // // //       Alert.alert("Success", "Account Created Successfully!");
// // // // //       navigation.replace("Home");

// // // // //     } catch (error) {
// // // // //       console.error("Signup Error:", error);
// // // // //       Alert.alert("Error", "Unable to connect to server. Check your backend.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <KeyboardAvoidingView
// // // // //       style={styles.container}
// // // // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // // // //     >
// // // // //       <StatusBar barStyle="light-content" />

// // // // //       <ScrollView
// // // // //         contentContainerStyle={styles.scrollContent}
// // // // //         showsVerticalScrollIndicator={false}
// // // // //         keyboardShouldPersistTaps="handled"
// // // // //       >
// // // // //         {/* Header */}
// // // // //         <View style={styles.header}>
// // // // //           <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
// // // // //             <Ionicons name="close" size={28} color="white" />
// // // // //           </TouchableOpacity>

// // // // //           <TouchableOpacity style={styles.skipButton} onPress={() => navigation.goBack()}>
// // // // //             <Text style={styles.skipText}>Skip</Text>
// // // // //             <Ionicons name="chevron-forward" size={18} color="white" />
// // // // //           </TouchableOpacity>
// // // // //         </View>

// // // // //         {/* Avatar */}
// // // // //         <Animated.View
// // // // //           style={[
// // // // //             styles.avatarSection,
// // // // //             {
// // // // //               opacity: avatarAnim,
// // // // //               transform: [
// // // // //                 {
// // // // //                   scale: avatarAnim.interpolate({
// // // // //                     inputRange: [0, 1],
// // // // //                     outputRange: [0.5, 1],
// // // // //                   }),
// // // // //                 },
// // // // //               ],
// // // // //             },
// // // // //           ]}
// // // // //         >
// // // // //           <TouchableOpacity style={styles.avatarContainer}>
// // // // //             <View style={styles.avatar}>
// // // // //               <Text style={styles.avatarEmoji}>🤠</Text>
// // // // //             </View>
// // // // //           </TouchableOpacity>
// // // // //           <Text style={styles.changeAvatarText}>Change avatar</Text>
// // // // //         </Animated.View>

// // // // //         {/* Form */}
// // // // //         <Animated.View
// // // // //           style={[
// // // // //             styles.formSection,
// // // // //             {
// // // // //               opacity: formAnim.interpolate({
// // // // //                 inputRange: [0, 50],
// // // // //                 outputRange: [1, 0],
// // // // //               }),
// // // // //               transform: [{ translateY: formAnim }],
// // // // //             },
// // // // //           ]}
// // // // //         >
// // // // //           {/* First Name */}
// // // // //           <View style={styles.inputGroup}>
// // // // //             <Text style={styles.label}>First Name</Text>
// // // // //             <TextInput
// // // // //               style={styles.input}
// // // // //               placeholder="Enter Your Name"
// // // // //               placeholderTextColor="rgba(255,255,255,0.4)"
// // // // //               value={firstName}
// // // // //               onChangeText={setFirstName}
// // // // //             />
// // // // //           </View>

// // // // //           {/* Last Name */}
// // // // //           <View style={styles.inputGroup}>
// // // // //             <Text style={styles.label}>Last Name</Text>
// // // // //             <TextInput
// // // // //               style={styles.input}
// // // // //               placeholder="Enter Your Last Name"
// // // // //               placeholderTextColor="rgba(255,255,255,0.4)"
// // // // //               value={lastName}
// // // // //               onChangeText={setLastName}
// // // // //             />
// // // // //           </View>

// // // // //           {/* Email */}
// // // // //           <View style={styles.inputGroup}>
// // // // //             <Text style={styles.label}>Email Address</Text>
// // // // //             <TextInput
// // // // //               style={styles.input}
// // // // //               placeholder="Enter Your Email Id"
// // // // //               placeholderTextColor="rgba(255,255,255,0.4)"
// // // // //               value={email}
// // // // //               onChangeText={setEmail}
// // // // //               keyboardType="email-address"
// // // // //               autoCapitalize="none"
// // // // //             />
// // // // //           </View>

// // // // //           {/* Password */}
// // // // //           <View style={styles.inputGroup}>
// // // // //             <View style={styles.passwordHeader}>
// // // // //               <Text style={styles.label}>Password</Text>
// // // // //               <TouchableOpacity>
// // // // //                 <Text style={styles.forgotPassword}>Forget Password</Text>
// // // // //               </TouchableOpacity>
// // // // //             </View>

// // // // //             <View style={styles.passwordInputContainer}>
// // // // //               <TextInput
// // // // //                 style={[styles.input, styles.passwordInput]}
// // // // //                 placeholder="Enter Your Password"
// // // // //                 placeholderTextColor="rgba(255,255,255,0.4)"
// // // // //                 secureTextEntry={!showPassword}
// // // // //                 value={password}
// // // // //                 onChangeText={setPassword}
// // // // //               />

// // // // //               <TouchableOpacity
// // // // //                 style={styles.eyeIcon}
// // // // //                 onPress={() => setShowPassword(!showPassword)}
// // // // //               >
// // // // //                 <Ionicons
// // // // //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// // // // //                   size={22}
// // // // //                   color="rgba(255,255,255,0.5)"
// // // // //                 />
// // // // //               </TouchableOpacity>
// // // // //             </View>
// // // // //           </View>
// // // // //         </Animated.View>

// // // // //         {/* Button */}
// // // // //         <Animated.View
// // // // //           style={[
// // // // //             styles.buttonContainer,
// // // // //             {
// // // // //               opacity: buttonAnim.interpolate({
// // // // //                 inputRange: [0, 50],
// // // // //                 outputRange: [1, 0],
// // // // //               }),
// // // // //               transform: [{ translateY: buttonAnim }],
// // // // //             },
// // // // //           ]}
// // // // //         >
// // // // //           <TouchableOpacity
// // // // //             style={[styles.createButton, loading && { opacity: 0.7 }]}
// // // // //             onPress={handleCreateAccount}
// // // // //             disabled={loading}
// // // // //           >
// // // // //             <Text style={styles.createButtonText}>
// // // // //               {loading ? "Creating..." : "Create Account"}
// // // // //             </Text>
// // // // //           </TouchableOpacity>
// // // // //         </Animated.View>
// // // // //       </ScrollView>
// // // // //     </KeyboardAvoidingView>
// // // // //   );
// // // // // }

// // // // // // Styles
// // // // // const styles = StyleSheet.create({
// // // // //   container: { flex: 1, backgroundColor: "#0a1628" },
// // // // //   scrollContent: { flexGrow: 1, paddingBottom: 40 },

// // // // //   header: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     paddingHorizontal: 20,
// // // // //     paddingTop: 20,
// // // // //   },

// // // // //   closeButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
// // // // //   skipButton: { flexDirection: "row", alignItems: "center", gap: 4 },
// // // // //   skipText: { color: "white", fontSize: 16 },

// // // // //   avatarSection: { alignItems: "center", marginVertical: 30 },
// // // // //   avatarContainer: { marginBottom: 12 },
// // // // //   avatar: {
// // // // //     width: 100,
// // // // //     height: 100,
// // // // //     borderRadius: 50,
// // // // //     backgroundColor: "#7FE8C8",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   avatarEmoji: { fontSize: 50 },
// // // // //   changeAvatarText: { color: "rgba(255,255,255,0.7)" },

// // // // //   formSection: { paddingHorizontal: 20, marginBottom: 20 },
// // // // //   inputGroup: { marginBottom: 16 },

// // // // //   label: { color: "white", fontSize: 15, marginBottom: 8 },
// // // // //   input: {
// // // // //     height: 56,
// // // // //     backgroundColor: "rgba(28,58,107,0.5)",
// // // // //     borderColor: "rgba(28,76,255,0.3)",
// // // // //     borderWidth: 1,
// // // // //     borderRadius: 16,
// // // // //     paddingHorizontal: 20,
// // // // //     color: "white",
// // // // //   },

// // // // //   passwordHeader: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     marginBottom: 8,
// // // // //   },

// // // // //   forgotPassword: { color: "rgba(255,255,255,0.6)" },

// // // // //   passwordInputContainer: { position: "relative" },
// // // // //   passwordInput: { paddingRight: 50 },
// // // // //   eyeIcon: { position: "absolute", right: 18, top: 18 },

// // // // //   buttonContainer: { alignItems: "center", marginTop: 10 },
// // // // //   createButton: {
// // // // //     width: "70%",
// // // // //     height: 56,
// // // // //     backgroundColor: "#4A7FE8",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //     borderRadius: 28,
// // // // //   },
// // // // //   createButtonText: { color: "white", fontSize: 17, fontWeight: "600" },
// // // // // });


// // // // // src/screens/CreateAccount.js (ya RegisterScreen.js)

// // // // import React, { useState, useRef, useEffect } from "react";
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   TextInput,
// // // //   Animated,
// // // //   Dimensions,
// // // //   StatusBar,
// // // //   KeyboardAvoidingView,
// // // //   Platform,
// // // //   ScrollView,
// // // //   Alert,
// // // // } from "react-native";
// // // // import { Ionicons } from "@expo/vector-icons";
// // // // import AsyncStorage from "@react-native-async-storage/async-storage";

// // // // const { width, height } = Dimensions.get("window");

// // // // // 🔗 BASE_URL: YAHI SABSE IMPORTANT HAI
// // // // // 👉 Apna PC ka IP yaha daalo (ipconfig se)
// // // // // Example: 192.168.1.7
// // // // const BASE_URL = "http://localhost:5000"; // 🔴 CHANGE THIS TO YOUR IP

// // // // export default function RegisterScreen({ navigation }) {
// // // //   const [firstName, setFirstName] = useState("");
// // // //   const [lastName, setLastName]   = useState("");
// // // //   const [email, setEmail]         = useState("");
// // // //   const [password, setPassword]   = useState("");
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [loading, setLoading]     = useState(false);

// // // //   const avatarAnim = useRef(new Animated.Value(0)).current;
// // // //   const formAnim   = useRef(new Animated.Value(50)).current;
// // // //   const buttonAnim = useRef(new Animated.Value(50)).current;

// // // //   useEffect(() => {
// // // //     Animated.parallel([
// // // //       Animated.spring(avatarAnim, {
// // // //         toValue: 1,
// // // //         tension: 50,
// // // //         friction: 7,
// // // //         useNativeDriver: true,
// // // //       }),
// // // //       Animated.timing(formAnim, {
// // // //         toValue: 0,
// // // //         duration: 600,
// // // //         delay: 200,
// // // //         useNativeDriver: true,
// // // //       }),
// // // //       Animated.timing(buttonAnim, {
// // // //         toValue: 0,
// // // //         duration: 600,
// // // //         delay: 400,
// // // //         useNativeDriver: true,
// // // //       }),
// // // //     ]).start();
// // // //   }, []);

// // // //   // 🔐 CREATE ACCOUNT → POST http://<IP>:5000/auth/signup
// // // //   const handleCreateAccount = async () => {
// // // //     if (!firstName || !lastName || !email || !password) {
// // // //       Alert.alert("Error", "Please fill all fields");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setLoading(true);

// // // //       const body = {
// // // //         name: `${firstName} ${lastName}`,
// // // //         email,
// // // //         password,
// // // //         avatar_url: null,
// // // //       };

// // // //       const url = `${BASE_URL}/auth/signup`;
// // // //       console.log("👉 Sending signup request to:", url, body);

// // // //       const response = await fetch(url, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify(body),
// // // //       });

// // // //       const data = await response.json();
// // // //       console.log("✅ Signup response:", data);

// // // //       if (!response.ok) {
// // // //         return Alert.alert("Sign Up Failed", data.message || "Something went wrong");
// // // //       }

// // // //       await AsyncStorage.setItem("token", data.token);
// // // //       await AsyncStorage.setItem("user", JSON.stringify(data.user));

// // // //       Alert.alert("Success", "Account created successfully!");
// // // //       navigation.replace("Home");
// // // //     } catch (error) {
// // // //       console.log("❌ Signup Error:", error);
// // // //       Alert.alert(
// // // //         "Network Error",
// // // //         "The server is not connecting. Please check the PC's IP and port 5000."
// // // //       );
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleSkip = () => {
// // // //     navigation.goBack();
// // // //   };

// // // //   const handleClose = () => {
// // // //     navigation.goBack();
// // // //   };

// // // //   const handleChangeAvatar = () => {
// // // //     console.log("Change avatar");
// // // //   };

// // // //   return (
// // // //     <KeyboardAvoidingView
// // // //       style={styles.container}
// // // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // // //     >
// // // //       <StatusBar barStyle="light-content" />

// // // //       <ScrollView
// // // //         contentContainerStyle={styles.scrollContent}
// // // //         showsVerticalScrollIndicator={false}
// // // //         keyboardShouldPersistTaps="handled"
// // // //       >
// // // //         {/* Status Bar Mock */}
// // // //         <View style={styles.statusBar}>
// // // //           <Text style={styles.time}>9:41</Text>
// // // //           <View style={styles.statusIcons}>
// // // //             <Text style={styles.icon}>📶</Text>
// // // //             <Text style={styles.icon}>📡</Text>
// // // //             <Text style={styles.icon}>🔋</Text>
// // // //           </View>
// // // //         </View>

// // // //         {/* Header */}
// // // //         <View style={styles.header}>
// // // //           <TouchableOpacity
// // // //             style={styles.closeButton}
// // // //             onPress={handleClose}
// // // //             activeOpacity={0.7}
// // // //           >
// // // //             <Ionicons name="close" size={28} color="white" />
// // // //           </TouchableOpacity>

// // // //           <TouchableOpacity
// // // //             style={styles.skipButton}
// // // //             onPress={handleSkip}
// // // //             activeOpacity={0.7}
// // // //           >
// // // //             <Text style={styles.skipText}>Skip</Text>
// // // //             <Ionicons name="chevron-forward" size={18} color="white" />
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         {/* Avatar Section */}
// // // //         <Animated.View
// // // //           style={[
// // // //             styles.avatarSection,
// // // //             {
// // // //               opacity: avatarAnim,
// // // //               transform: [
// // // //                 {
// // // //                   scale: avatarAnim.interpolate({
// // // //                     inputRange: [0, 1],
// // // //                     outputRange: [0.5, 1],
// // // //                   }),
// // // //                 },
// // // //               ],
// // // //             },
// // // //           ]}
// // // //         >
// // // //           <TouchableOpacity
// // // //             style={styles.avatarContainer}
// // // //             onPress={handleChangeAvatar}
// // // //             activeOpacity={0.8}
// // // //           >
// // // //             <View style={styles.avatar}>
// // // //               <Text style={styles.avatarEmoji}>🤠</Text>
// // // //             </View>
// // // //           </TouchableOpacity>
// // // //           <TouchableOpacity onPress={handleChangeAvatar}>
// // // //             <Text style={styles.changeAvatarText}>Change avatar</Text>
// // // //           </TouchableOpacity>
// // // //         </Animated.View>

// // // //         {/* Form Section */}
// // // //         <Animated.View
// // // //           style={[
// // // //             styles.formSection,
// // // //             {
// // // //               opacity: formAnim.interpolate({
// // // //                 inputRange: [0, 50],
// // // //                 outputRange: [1, 0],
// // // //               }),
// // // //               transform: [{ translateY: formAnim }],
// // // //             },
// // // //           ]}
// // // //         >
// // // //           {/* First Name */}
// // // //           <View style={styles.inputGroup}>
// // // //             <Text style={styles.label}>First Name</Text>
// // // //             <TextInput
// // // //               style={styles.input}
// // // //               placeholder="Enter Your Name"
// // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // //               value={firstName}
// // // //               onChangeText={setFirstName}
// // // //             />
// // // //           </View>

// // // //           {/* Last Name */}
// // // //           <View style={styles.inputGroup}>
// // // //             <Text style={styles.label}>Last Name</Text>
// // // //             <TextInput
// // // //               style={styles.input}
// // // //               placeholder="Enter Your Last Name"
// // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // //               value={lastName}
// // // //               onChangeText={setLastName}
// // // //             />
// // // //           </View>

// // // //           {/* Email Address */}
// // // //           <View style={styles.inputGroup}>
// // // //             <Text style={styles.label}>Email Address</Text>
// // // //             <TextInput
// // // //               style={styles.input}
// // // //               placeholder="Enter Your Email Id"
// // // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // //               value={email}
// // // //               onChangeText={setEmail}
// // // //               keyboardType="email-address"
// // // //               autoCapitalize="none"
// // // //             />
// // // //           </View>

// // // //           {/* Password */}
// // // //           <View style={styles.inputGroup}>
// // // //             <View style={styles.passwordHeader}>
// // // //               <Text style={styles.label}>Password</Text>
// // // //               <TouchableOpacity
// // // //                 onPress={() =>
// // // //                   Alert.alert("Info", "Please use login screen to reset password")
// // // //                 }
// // // //               >
// // // //                 <Text style={styles.forgotPassword}>Forget Password</Text>
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //             <View style={styles.passwordInputContainer}>
// // // //               <TextInput
// // // //                 style={[styles.input, styles.passwordInput]}
// // // //                 placeholder="Enter Your Password"
// // // //                 placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // // //                 value={password}
// // // //                 onChangeText={setPassword}
// // // //                 secureTextEntry={!showPassword}
// // // //               />
// // // //               <TouchableOpacity
// // // //                 style={styles.eyeIcon}
// // // //                 onPress={() => setShowPassword(!showPassword)}
// // // //               >
// // // //                 <Ionicons
// // // //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// // // //                   size={22}
// // // //                   color="rgba(255, 255, 255, 0.5)"
// // // //                 />
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //           </View>
// // // //         </Animated.View>

// // // //         {/* Create Account Button */}
// // // //         <Animated.View
// // // //           style={[
// // // //             styles.buttonContainer,
// // // //             {
// // // //               opacity: buttonAnim.interpolate({
// // // //                 inputRange: [0, 50],
// // // //                 outputRange: [1, 0],
// // // //               }),
// // // //               transform: [{ translateY: buttonAnim }],
// // // //             },
// // // //           ]}
// // // //         >
// // // //           <TouchableOpacity
// // // //             style={[styles.createButton, loading && { opacity: 0.7 }]}
// // // //             onPress={handleCreateAccount}
// // // //             activeOpacity={0.8}
// // // //             disabled={loading}
// // // //           >
// // // //             <Text style={styles.createButtonText}>
// // // //               {loading ? "Creating..." : "Create Account"}
// // // //             </Text>
// // // //           </TouchableOpacity>
// // // //         </Animated.View>

// // // //         {/* Home Indicator */}
// // // //         <View style={styles.homeIndicator} />
// // // //       </ScrollView>
// // // //     </KeyboardAvoidingView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: "#0a1628",
// // // //   },
// // // //   scrollContent: {
// // // //     flexGrow: 1,
// // // //     paddingBottom: 40,
// // // //   },
// // // //   statusBar: {
// // // //     height: 44,
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 20,
// // // //     paddingTop: 10,
// // // //   },
// // // //   time: {
// // // //     color: "white",
// // // //     fontSize: 15,
// // // //     fontWeight: "600",
// // // //   },
// // // //   statusIcons: {
// // // //     flexDirection: "row",
// // // //     gap: 5,
// // // //   },
// // // //   icon: {
// // // //     fontSize: 14,
// // // //   },
// // // //   header: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 20,
// // // //     paddingTop: 10,
// // // //     marginBottom: 20,
// // // //   },
// // // //   closeButton: {
// // // //     width: 40,
// // // //     height: 40,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //   },
// // // //   skipButton: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     gap: 4,
// // // //   },
// // // //   skipText: {
// // // //     color: "white",
// // // //     fontSize: 16,
// // // //     fontWeight: "400",
// // // //   },
// // // //   avatarSection: {
// // // //     alignItems: "center",
// // // //     marginBottom: 30,
// // // //   },
// // // //   avatarContainer: {
// // // //     marginBottom: 12,
// // // //   },
// // // //   avatar: {
// // // //     width: 100,
// // // //     height: 100,
// // // //     borderRadius: 50,
// // // //     backgroundColor: "#7FE8C8",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     shadowColor: "#000",
// // // //     shadowOffset: { width: 0, height: 4 },
// // // //     shadowOpacity: 0.3,
// // // //     shadowRadius: 12,
// // // //     elevation: 8,
// // // //   },
// // // //   avatarEmoji: {
// // // //     fontSize: 50,
// // // //   },
// // // //   changeAvatarText: {
// // // //     color: "rgba(255, 255, 255, 0.7)",
// // // //     fontSize: 15,
// // // //     fontWeight: "400",
// // // //   },
// // // //   formSection: {
// // // //     paddingHorizontal: 20,
// // // //     marginBottom: 30,
// // // //   },
// // // //   inputGroup: {
// // // //     marginBottom: 20,
// // // //   },
// // // //   label: {
// // // //     color: "white",
// // // //     fontSize: 15,
// // // //     fontWeight: "500",
// // // //     marginBottom: 10,
// // // //   },
// // // //   input: {
// // // //     height: 56,
// // // //     backgroundColor: "rgba(28, 58, 107, 0.5)",
// // // //     borderWidth: 1,
// // // //     borderColor: "rgba(28, 76, 255, 0.3)",
// // // //     borderRadius: 16,
// // // //     paddingHorizontal: 20,
// // // //     color: "white",
// // // //     fontSize: 15,
// // // //   },
// // // //   passwordHeader: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     marginBottom: 10,
// // // //   },
// // // //   forgotPassword: {
// // // //     color: "rgba(255, 255, 255, 0.6)",
// // // //     fontSize: 14,
// // // //     fontWeight: "400",
// // // //   },
// // // //   passwordInputContainer: {
// // // //     position: "relative",
// // // //   },
// // // //   passwordInput: {
// // // //     paddingRight: 50,
// // // //   },
// // // //   eyeIcon: {
// // // //     position: "absolute",
// // // //     right: 18,
// // // //     top: 17,
// // // //     zIndex: 10,
// // // //   },
// // // //   buttonContainer: {
// // // //     paddingHorizontal: 20,
// // // //     alignItems: "center",
// // // //   },
// // // //   createButton: {
// // // //     width: "70%",
// // // //     height: 56,
// // // //     backgroundColor: "#4A7FE8",
// // // //     borderRadius: 28,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     shadowRadius: 15,
// // // //     shadowOpacity: 0.4,
// // // //     shadowOffset: { width: 0, height: 6 },
// // // //     elevation: 10,
// // // //   },
// // // //   createButtonText: {
// // // //     color: "white",
// // // //     fontSize: 17,
// // // //     fontWeight: "600",
// // // //   },
// // // //   homeIndicator: {
// // // //     width: 134,
// // // //     height: 5,
// // // //     backgroundColor: "white",
// // // //     borderRadius: 3,
// // // //     opacity: 0.3,
// // // //     alignSelf: "center",
// // // //     marginTop: 30,
// // // //   },
// // // // });


// // // import React, { useState, useRef, useEffect } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   TextInput,
// // //   Animated,
// // //   Dimensions,
// // //   StatusBar,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   ScrollView,
// // //   Alert,
// // // } from "react-native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";

// // // const { width, height } = Dimensions.get("window");

// // // // 🔗 Backend base URL
// // // // Android emulator → 10.0.2.2
// // // // iOS simulator / web → localhost
// // // const BASE_URL =
// // //   Platform.OS === "android"
// // //     ? "http://10.0.2.2:5000"
// // //     : "http://localhost:5000";

// // // export default function RegisterScreen({ navigation }) {
// // //   const [firstName, setFirstName] = useState("");
// // //   const [lastName, setLastName]   = useState("");
// // //   const [email, setEmail]         = useState("");
// // //   const [password, setPassword]   = useState("");
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [loading, setLoading]     = useState(false);

// // //   const avatarAnim = useRef(new Animated.Value(0)).current;
// // //   const formAnim   = useRef(new Animated.Value(50)).current;
// // //   const buttonAnim = useRef(new Animated.Value(50)).current;

// // //   useEffect(() => {
// // //     Animated.parallel([
// // //       Animated.spring(avatarAnim, {
// // //         toValue: 1,
// // //         tension: 50,
// // //         friction: 7,
// // //         useNativeDriver: true,
// // //       }),
// // //       Animated.timing(formAnim, {
// // //         toValue: 0,
// // //         duration: 600,
// // //         delay: 200,
// // //         useNativeDriver: true,
// // //       }),
// // //       Animated.timing(buttonAnim, {
// // //         toValue: 0,
// // //         duration: 600,
// // //         delay: 400,
// // //         useNativeDriver: true,
// // //       }),
// // //     ]).start();
// // //   }, [avatarAnim, formAnim, buttonAnim]);

// // //   // 🔐 CREATE ACCOUNT → POST /auth/signup
// // //   const handleCreateAccount = async () => {
// // //     if (!firstName || !lastName || !email || !password) {
// // //       Alert.alert("Error", "Please fill all fields");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);

// // //       const body = {
// // //         name: `${firstName} ${lastName}`,
// // //         email,
// // //         password,
// // //         avatar_url: null,
// // //       };

// // //       const response = await fetch(`${BASE_URL}/auth/signup`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify(body),
// // //       });

// // //       // Safely handle non-JSON / empty responses
// // //       let data = null;
// // //       try {
// // //         data = await response.json();
// // //       } catch (_) {
// // //         data = null;
// // //       }

// // //       if (!response.ok) {
// // //         const message =
// // //           (data && data.message) ||
// // //           `Signup failed with status ${response.status}`;
// // //         Alert.alert("Sign Up Failed", message);
// // //         return;
// // //       }

// // //       // Expecting { message, user, token }
// // //       if (data && data.token) {
// // //         await AsyncStorage.setItem("token", data.token);
// // //       }
// // //       if (data && data.user) {
// // //         await AsyncStorage.setItem("user", JSON.stringify(data.user));
// // //       }

// // //       Alert.alert("Success", data?.message || "Account created successfully!");
// // //       navigation.replace("Home");
// // //     } catch (error) {
// // //       Alert.alert(
// // //         "Error",
// // //         error?.message || "Could not connect to the server."
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSkip = () => {
// // //     navigation.goBack();
// // //   };

// // //   const handleClose = () => {
// // //     navigation.goBack();
// // //   };

// // //   const handleChangeAvatar = () => {
// // //     // TODO: integrate image picker if needed
// // //   };

// // //   return (
// // //     <KeyboardAvoidingView
// // //       style={styles.container}
// // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // //     >
// // //       <StatusBar barStyle="light-content" />

// // //       <ScrollView
// // //         contentContainerStyle={styles.scrollContent}
// // //         showsVerticalScrollIndicator={false}
// // //         keyboardShouldPersistTaps="handled"
// // //       >
// // //         {/* Fake Status Bar */}
// // //         <View style={styles.statusBar}>
// // //           <Text style={styles.time}>9:41</Text>
// // //           <View style={styles.statusIcons}>
// // //             <Text style={styles.icon}>📶</Text>
// // //             <Text style={styles.icon}>📡</Text>
// // //             <Text style={styles.icon}>🔋</Text>
// // //           </View>
// // //         </View>

// // //         {/* Header */}
// // //         <View style={styles.header}>
// // //           <TouchableOpacity
// // //             style={styles.closeButton}
// // //             onPress={handleClose}
// // //             activeOpacity={0.7}
// // //           >
// // //             <Ionicons name="close" size={28} color="white" />
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={styles.skipButton}
// // //             onPress={handleSkip}
// // //             activeOpacity={0.7}
// // //           >
// // //             <Text style={styles.skipText}>Skip</Text>
// // //             <Ionicons name="chevron-forward" size={18} color="white" />
// // //           </TouchableOpacity>
// // //         </View>

// // //         {/* Avatar Section */}
// // //         <Animated.View
// // //           style={[
// // //             styles.avatarSection,
// // //             {
// // //               opacity: avatarAnim,
// // //               transform: [
// // //                 {
// // //                   scale: avatarAnim.interpolate({
// // //                     inputRange: [0, 1],
// // //                     outputRange: [0.5, 1],
// // //                   }),
// // //                 },
// // //               ],
// // //             },
// // //           ]}
// // //         >
// // //           <TouchableOpacity
// // //             style={styles.avatarContainer}
// // //             onPress={handleChangeAvatar}
// // //             activeOpacity={0.8}
// // //           >
// // //             <View style={styles.avatar}>
// // //               <Text style={styles.avatarEmoji}>🤠</Text>
// // //             </View>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity onPress={handleChangeAvatar}>
// // //             <Text style={styles.changeAvatarText}>Change avatar</Text>
// // //           </TouchableOpacity>
// // //         </Animated.View>

// // //         {/* Form Section */}
// // //         <Animated.View
// // //           style={[
// // //             styles.formSection,
// // //             {
// // //               opacity: formAnim.interpolate({
// // //                 inputRange: [0, 50],
// // //                 outputRange: [1, 0],
// // //               }),
// // //               transform: [{ translateY: formAnim }],
// // //             },
// // //           ]}
// // //         >
// // //           {/* First Name */}
// // //           <View style={styles.inputGroup}>
// // //             <Text style={styles.label}>First Name</Text>
// // //             <TextInput
// // //               style={styles.input}
// // //               placeholder="Enter Your Name"
// // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // //               value={firstName}
// // //               onChangeText={setFirstName}
// // //             />
// // //           </View>

// // //           {/* Last Name */}
// // //           <View style={styles.inputGroup}>
// // //             <Text style={styles.label}>Last Name</Text>
// // //             <TextInput
// // //               style={styles.input}
// // //               placeholder="Enter Your Last Name"
// // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // //               value={lastName}
// // //               onChangeText={setLastName}
// // //             />
// // //           </View>

// // //           {/* Email Address */}
// // //           <View style={styles.inputGroup}>
// // //             <Text style={styles.label}>Email Address</Text>
// // //             <TextInput
// // //               style={styles.input}
// // //               placeholder="Enter Your Email Id"
// // //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // //               value={email}
// // //               onChangeText={setEmail}
// // //               keyboardType="email-address"
// // //               autoCapitalize="none"
// // //             />
// // //           </View>

// // //           {/* Password */}
// // //           <View style={styles.inputGroup}>
// // //             <View style={styles.passwordHeader}>
// // //               <Text style={styles.label}>Password</Text>
// // //               <TouchableOpacity
// // //                 onPress={() =>
// // //                   Alert.alert("Info", "Please use login screen to reset password")
// // //                 }
// // //               >
// // //                 <Text style={styles.forgotPassword}>Forget Password</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //             <View style={styles.passwordInputContainer}>
// // //               <TextInput
// // //                 style={[styles.input, styles.passwordInput]}
// // //                 placeholder="Enter Your Password"
// // //                 placeholderTextColor="rgba(255, 255, 255, 0.4)"
// // //                 value={password}
// // //                 onChangeText={setPassword}
// // //                 secureTextEntry={!showPassword}
// // //               />
// // //               <TouchableOpacity
// // //                 style={styles.eyeIcon}
// // //                 onPress={() => setShowPassword(!showPassword)}
// // //               >
// // //                 <Ionicons
// // //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// // //                   size={22}
// // //                   color="rgba(255, 255, 255, 0.5)"
// // //                 />
// // //               </TouchableOpacity>
// // //             </View>
// // //           </View>
// // //         </Animated.View>

// // //         {/* Create Account Button */}
// // //         <Animated.View
// // //           style={[
// // //             styles.buttonContainer,
// // //             {
// // //               opacity: buttonAnim.interpolate({
// // //                 inputRange: [0, 50],
// // //                 outputRange: [1, 0],
// // //               }),
// // //               transform: [{ translateY: buttonAnim }],
// // //             },
// // //           ]}
// // //         >
// // //           <TouchableOpacity
// // //             style={[styles.createButton, loading && { opacity: 0.7 }]}
// // //             onPress={handleCreateAccount}
// // //             activeOpacity={0.8}
// // //             disabled={loading}
// // //           >
// // //             <Text style={styles.createButtonText}>
// // //               {loading ? "Creating..." : "Create Account"}
// // //             </Text>
// // //           </TouchableOpacity>
// // //         </Animated.View>

// // //         {/* Home Indicator */}
// // //         <View style={styles.homeIndicator} />
// // //       </ScrollView>
// // //     </KeyboardAvoidingView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#0a1628",
// // //   },
// // //   scrollContent: {
// // //     flexGrow: 1,
// // //     paddingBottom: 40,
// // //   },
// // //   statusBar: {
// // //     height: 44,
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //     paddingTop: 10,
// // //   },
// // //   time: {
// // //     color: "white",
// // //     fontSize: 15,
// // //     fontWeight: "600",
// // //   },
// // //   statusIcons: {
// // //     flexDirection: "row",
// // //     gap: 5,
// // //   },
// // //   icon: {
// // //     fontSize: 14,
// // //   },
// // //   header: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //     paddingTop: 10,
// // //     marginBottom: 20,
// // //   },
// // //   closeButton: {
// // //     width: 40,
// // //     height: 40,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   skipButton: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 4,
// // //   },
// // //   skipText: {
// // //     color: "white",
// // //     fontSize: 16,
// // //     fontWeight: "400",
// // //   },
// // //   avatarSection: {
// // //     alignItems: "center",
// // //     marginBottom: 30,
// // //   },
// // //   avatarContainer: {
// // //     marginBottom: 12,
// // //   },
// // //   avatar: {
// // //     width: 100,
// // //     height: 100,
// // //     borderRadius: 50,
// // //     backgroundColor: "#7FE8C8",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     shadowColor: "#000",
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 12,
// // //     elevation: 8,
// // //   },
// // //   avatarEmoji: {
// // //     fontSize: 50,
// // //   },
// // //   changeAvatarText: {
// // //     color: "rgba(255, 255, 255, 0.7)",
// // //     fontSize: 15,
// // //     fontWeight: "400",
// // //   },
// // //   formSection: {
// // //     paddingHorizontal: 20,
// // //     marginBottom: 30,
// // //   },
// // //   inputGroup: {
// // //     marginBottom: 20,
// // //   },
// // //   label: {
// // //     color: "white",
// // //     fontSize: 15,
// // //     fontWeight: "500",
// // //     marginBottom: 10,
// // //   },
// // //   input: {
// // //     height: 56,
// // //     backgroundColor: "rgba(28, 58, 107, 0.5)",
// // //     borderWidth: 1,
// // //     borderColor: "rgba(28, 76, 255, 0.3)",
// // //     borderRadius: 16,
// // //     paddingHorizontal: 20,
// // //     color: "white",
// // //     fontSize: 15,
// // //   },
// // //   passwordHeader: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },
// // //   forgotPassword: {
// // //     color: "rgba(255, 255, 255, 0.6)",
// // //     fontSize: 14,
// // //     fontWeight: "400",
// // //   },
// // //   passwordInputContainer: {
// // //     position: "relative",
// // //   },
// // //   passwordInput: {
// // //     paddingRight: 50,
// // //   },
// // //   eyeIcon: {
// // //     position: "absolute",
// // //     right: 18,
// // //     top: 17,
// // //     zIndex: 10,
// // //   },
// // //   buttonContainer: {
// // //     paddingHorizontal: 20,
// // //     alignItems: "center",
// // //   },
// // //   createButton: {
// // //     width: "70%",
// // //     height: 56,
// // //     backgroundColor: "#4A7FE8",
// // //     borderRadius: 28,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     shadowRadius: 15,
// // //     shadowOpacity: 0.4,
// // //     shadowOffset: { width: 0, height: 6 },
// // //     elevation: 10,
// // //   },
// // //   createButtonText: {
// // //     color: "white",
// // //     fontSize: 17,
// // //     fontWeight: "600",
// // //   },
// // //   homeIndicator: {
// // //     width: 134,
// // //     height: 5,
// // //     backgroundColor: "white",
// // //     borderRadius: 3,
// // //     opacity: 0.3,
// // //     alignSelf: "center",
// // //     marginTop: 30,
// // //   },
// // // });


// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   TextInput,
// //   Animated,
// //   Dimensions,
// //   StatusBar,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// //   Alert,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { BASE_URL } from "../config";  // 👈 yaha se IP aa raha hai

// // const { width, height } = Dimensions.get("window");

// // export default function RegisterScreen({ navigation }) {
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName]   = useState("");
// //   const [email, setEmail]         = useState("");
// //   const [password, setPassword]   = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading]     = useState(false);

// //   const avatarAnim = useRef(new Animated.Value(0)).current;
// //   const formAnim   = useRef(new Animated.Value(50)).current;
// //   const buttonAnim = useRef(new Animated.Value(50)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.spring(avatarAnim, {
// //         toValue: 1,
// //         tension: 50,
// //         friction: 7,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(formAnim, {
// //         toValue: 0,
// //         duration: 600,
// //         delay: 200,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(buttonAnim, {
// //         toValue: 0,
// //         duration: 600,
// //         delay: 400,
// //         useNativeDriver: true,
// //       }),
// //     ]).start();
// //   }, [avatarAnim, formAnim, buttonAnim]);

// //   // 🔐 CREATE ACCOUNT → POST /auth/signup
// //   const handleCreateAccount = async () => {
// //     if (!firstName || !lastName || !email || !password) {
// //       Alert.alert("Error", "Please fill all fields");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const body = {
// //         name: `${firstName} ${lastName}`,
// //         email,
// //         password,
// //         avatar_url: null,
// //       };

// //       const response = await fetch(`${BASE_URL}/auth/signup`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });

// //       let data = null;
// //       try {
// //         data = await response.json();
// //       } catch {
// //         data = null;
// //       }

// //       if (!response.ok) {
// //         const message =
// //           (data && data.message) ||
// //           `Signup failed with status ${response.status}`;
// //         Alert.alert("Sign Up Failed", message);
// //         return;
// //       }

// //       if (data?.token) {
// //         await AsyncStorage.setItem("token", data.token);
// //       }
// //       if (data?.user) {
// //         await AsyncStorage.setItem("user", JSON.stringify(data.user));
// //       }

// //       Alert.alert("Success", data?.message || "Account created successfully!");
// //       navigation.replace("Home");
// //     } catch (error) {
// //       Alert.alert(
// //         "Error",
// //         error?.message || "Could not connect to the server."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSkip = () => navigation.goBack();
// //   const handleClose = () => navigation.goBack();
// //   const handleChangeAvatar = () => {};

// //   return (
// //     <KeyboardAvoidingView
// //       style={styles.container}
// //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// //     >
// //       <StatusBar barStyle="light-content" />

// //       <ScrollView
// //         contentContainerStyle={styles.scrollContent}
// //         showsVerticalScrollIndicator={false}
// //         keyboardShouldPersistTaps="handled"
// //       >
// //         {/* Fake Status Bar */}
// //         <View style={styles.statusBar}>
// //           <Text style={styles.time}>9:41</Text>
// //           <View style={styles.statusIcons}>
// //             <Text style={styles.icon}>📶</Text>
// //             <Text style={styles.icon}>📡</Text>
// //             <Text style={styles.icon}>🔋</Text>
// //           </View>
// //         </View>

// //         {/* Header */}
// //         <View style={styles.header}>
// //           <TouchableOpacity
// //             style={styles.closeButton}
// //             onPress={handleClose}
// //             activeOpacity={0.7}
// //           >
// //             <Ionicons name="close" size={28} color="white" />
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={styles.skipButton}
// //             onPress={handleSkip}
// //             activeOpacity={0.7}
// //           >
// //             <Text style={styles.skipText}>Skip</Text>
// //             <Ionicons name="chevron-forward" size={18} color="white" />
// //           </TouchableOpacity>
// //         </View>

// //         {/* Avatar Section */}
// //         <Animated.View
// //           style={[
// //             styles.avatarSection,
// //             {
// //               opacity: avatarAnim,
// //               transform: [
// //                 {
// //                   scale: avatarAnim.interpolate({
// //                     inputRange: [0, 1],
// //                     outputRange: [0.5, 1],
// //                   }),
// //                 },
// //               ],
// //             },
// //           ]}
// //         >
// //           <TouchableOpacity
// //             style={styles.avatarContainer}
// //             onPress={handleChangeAvatar}
// //             activeOpacity={0.8}
// //           >
// //             <View style={styles.avatar}>
// //               <Text style={styles.avatarEmoji}>🤠</Text>
// //             </View>
// //           </TouchableOpacity>
// //           <TouchableOpacity onPress={handleChangeAvatar}>
// //             <Text style={styles.changeAvatarText}>Change avatar</Text>
// //           </TouchableOpacity>
// //         </Animated.View>

// //         {/* Form Section */}
// //         <Animated.View
// //           style={[
// //             styles.formSection,
// //             {
// //               opacity: formAnim.interpolate({
// //                 inputRange: [0, 50],
// //                 outputRange: [1, 0],
// //               }),
// //               transform: [{ translateY: formAnim }],
// //             },
// //           ]}
// //         >
// //           {/* First Name */}
// //           <View style={styles.inputGroup}>
// //             <Text style={styles.label}>First Name</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Enter Your Name"
// //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// //               value={firstName}
// //               onChangeText={setFirstName}
// //             />
// //           </View>

// //           {/* Last Name */}
// //           <View style={styles.inputGroup}>
// //             <Text style={styles.label}>Last Name</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Enter Your Last Name"
// //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// //               value={lastName}
// //               onChangeText={setLastName}
// //             />
// //           </View>

// //           {/* Email Address */}
// //           <View style={styles.inputGroup}>
// //             <Text style={styles.label}>Email Address</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Enter Your Email Id"
// //               placeholderTextColor="rgba(255, 255, 255, 0.4)"
// //               value={email}
// //               onChangeText={setEmail}
// //               keyboardType="email-address"
// //               autoCapitalize="none"
// //             />
// //           </View>

// //           {/* Password */}
// //           <View style={styles.inputGroup}>
// //             <View style={styles.passwordHeader}>
// //               <Text style={styles.label}>Password</Text>
// //               <TouchableOpacity
// //                 onPress={() =>
// //                   Alert.alert("Info", "Please use login screen to reset password")
// //                 }
// //               >
// //                 <Text style={styles.forgotPassword}>Forget Password</Text>
// //               </TouchableOpacity>
// //             </View>
// //             <View style={styles.passwordInputContainer}>
// //               <TextInput
// //                 style={[styles.input, styles.passwordInput]}
// //                 placeholder="Enter Your Password"
// //                 placeholderTextColor="rgba(255, 255, 255, 0.4)"
// //                 value={password}
// //                 onChangeText={setPassword}
// //                 secureTextEntry={!showPassword}
// //               />
// //               <TouchableOpacity
// //                 style={styles.eyeIcon}
// //                 onPress={() => setShowPassword(!showPassword)}
// //               >
// //                 <Ionicons
// //                   name={showPassword ? "eye-off-outline" : "eye-outline"}
// //                   size={22}
// //                   color="rgba(255, 255, 255, 0.5)"
// //                 />
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </Animated.View>

// //         {/* Create Account Button */}
// //         <Animated.View
// //           style={[
// //             styles.buttonContainer,
// //             {
// //               opacity: buttonAnim.interpolate({
// //                 inputRange: [0, 50],
// //                 outputRange: [1, 0],
// //               }),
// //               transform: [{ translateY: buttonAnim }],
// //             },
// //           ]}
// //         >
// //           <TouchableOpacity
// //             style={[styles.createButton, loading && { opacity: 0.7 }]}
// //             onPress={handleCreateAccount}
// //             activeOpacity={0.8}
// //             disabled={loading}
// //           >
// //             <Text style={styles.createButtonText}>
// //               {loading ? "Creating..." : "Create Account"}
// //             </Text>
// //           </TouchableOpacity>
// //         </Animated.View>

// //         {/* Home Indicator */}
// //         <View style={styles.homeIndicator} />
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#0a1628",
// //   },
// //   scrollContent: {
// //     flexGrow: 1,
// //     paddingBottom: 40,
// //   },
// //   statusBar: {
// //     height: 44,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     paddingTop: 10,
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
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     paddingTop: 10,
// //     marginBottom: 20,
// //   },
// //   closeButton: {
// //     width: 40,
// //     height: 40,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   skipButton: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 4,
// //   },
// //   skipText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "400",
// //   },
// //   avatarSection: {
// //     alignItems: "center",
// //     marginBottom: 30,
// //   },
// //   avatarContainer: {
// //     marginBottom: 12,
// //   },
// //   avatar: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     backgroundColor: "#7FE8C8",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 12,
// //     elevation: 8,
// //   },
// //   avatarEmoji: {
// //     fontSize: 50,
// //   },
// //   changeAvatarText: {
// //     color: "rgba(255, 255, 255, 0.7)",
// //     fontSize: 15,
// //     fontWeight: "400",
// //   },
// //   formSection: {
// //     paddingHorizontal: 20,
// //     marginBottom: 30,
// //   },
// //   inputGroup: {
// //     marginBottom: 20,
// //   },
// //   label: {
// //     color: "white",
// //     fontSize: 15,
// //     fontWeight: "500",
// //     marginBottom: 10,
// //   },
// //   input: {
// //     height: 56,
// //     backgroundColor: "rgba(28, 58, 107, 0.5)",
// //     borderWidth: 1,
// //     borderColor: "rgba(28, 76, 255, 0.3)",
// //     borderRadius: 16,
// //     paddingHorizontal: 20,
// //     color: "white",
// //     fontSize: 15,
// //   },
// //   passwordHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 10,
// //   },
// //   forgotPassword: {
// //     color: "rgba(255, 255, 255, 0.6)",
// //     fontSize: 14,
// //     fontWeight: "400",
// //   },
// //   passwordInputContainer: {
// //     position: "relative",
// //   },
// //   passwordInput: {
// //     paddingRight: 50,
// //   },
// //   eyeIcon: {
// //     position: "absolute",
// //     right: 18,
// //     top: 17,
// //     zIndex: 10,
// //   },
// //   buttonContainer: {
// //     paddingHorizontal: 20,
// //     alignItems: "center",
// //   },
// //   createButton: {
// //     width: "70%",
// //     height: 56,
// //     backgroundColor: "#4A7FE8",
// //     borderRadius: 28,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     shadowRadius: 15,
// //     shadowOpacity: 0.4,
// //     shadowOffset: { width: 0, height: 6 },
// //     elevation: 10,
// //   },
// //   createButtonText: {
// //     color: "white",
// //     fontSize: 17,
// //     fontWeight: "600",
// //   },
// //   homeIndicator: {
// //     width: 134,
// //     height: 5,
// //     backgroundColor: "white",
// //     borderRadius: 3,
// //     opacity: 0.3,
// //     alignSelf: "center",
// //     marginTop: 30,
// //   },
// // });
// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Animated,
//   Dimensions,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { BASE_URL } from "../config";

// const { width, height } = Dimensions.get("window");

// export default function RegisterScreen({ navigation }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName]   = useState("");
//   const [email, setEmail]         = useState("");
//   const [password, setPassword]   = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading]     = useState(false);

//   const avatarAnim = useRef(new Animated.Value(0)).current;
//   const formAnim   = useRef(new Animated.Value(50)).current;
//   const buttonAnim = useRef(new Animated.Value(50)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.spring(avatarAnim, {
//         toValue: 1,
//         tension: 50,
//         friction: 7,
//         useNativeDriver: true,
//       }),
//       Animated.timing(formAnim, {
//         toValue: 0,
//         duration: 600,
//         delay: 200,
//         useNativeDriver: true,
//       }),
//       Animated.timing(buttonAnim, {
//         toValue: 0,
//         duration: 600,
//         delay: 400,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [avatarAnim, formAnim, buttonAnim]);

//   // 🔐 CREATE ACCOUNT → POST /auth/signup
//   const handleCreateAccount = async () => {
//     if (!firstName || !lastName || !email || !password) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const body = {
//         name: `${firstName} ${lastName}`,
//         email,
//         password,
//         avatar_url: null,
//       };

//       const response = await fetch(`${BASE_URL}/auth/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       let data = null;
//       try {
//         data = await response.json();
//       } catch {
//         data = null;
//       }

//       if (!response.ok) {
//         const message =
//           (data && data.message) ||
//           `Signup failed with status ${response.status}`;
//         Alert.alert("Sign Up Failed", message);
//         return;
//       }

//       // ✅ Yaha token store NHI kar rahe
//       Alert.alert(
//         "Success",
//         data?.message || "Account created successfully! Please login.",
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               // Make sure Stack.Screen name is exactly "Login"
//               navigation.replace("Login");
//             },
//           },
//         ]
//       );
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         error?.message || "Could not connect to the server."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSkip = () => navigation.goBack();
//   const handleClose = () => navigation.goBack();
//   const handleChangeAvatar = () => {};

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <StatusBar barStyle="light-content" />

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Fake Status Bar */}
//         <View style={styles.statusBar}>
//           <Text style={styles.time}>9:41</Text>
//           <View style={styles.statusIcons}>
//             <Text style={styles.icon}>📶</Text>
//             <Text style={styles.icon}>📡</Text>
//             <Text style={styles.icon}>🔋</Text>
//           </View>
//         </View>

//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={handleClose}
//             activeOpacity={0.7}
//           >
//             <Ionicons name="close" size={28} color="white" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.skipButton}
//             onPress={handleSkip}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.skipText}>Skip</Text>
//             <Ionicons name="chevron-forward" size={18} color="white" />
//           </TouchableOpacity>
//         </View>

//         {/* Avatar Section */}
//         <Animated.View
//           style={[
//             styles.avatarSection,
//             {
//               opacity: avatarAnim,
//               transform: [
//                 {
//                   scale: avatarAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.5, 1],
//                   }),
//                 },
//               ],
//             },
//           ]}
//         >
//           <TouchableOpacity
//             style={styles.avatarContainer}
//             onPress={handleChangeAvatar}
//             activeOpacity={0.8}
//           >
//             <View style={styles.avatar}>
//               <Text style={styles.avatarEmoji}>🤠</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleChangeAvatar}>
//             <Text style={styles.changeAvatarText}>Change avatar</Text>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Form Section */}
//         <Animated.View
//           style={[
//             styles.formSection,
//             {
//               opacity: formAnim.interpolate({
//                 inputRange: [0, 50],
//                 outputRange: [1, 0],
//               }),
//               transform: [{ translateY: formAnim }],
//             },
//           ]}
//         >
//           {/* First Name */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>First Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Your Name"
//               placeholderTextColor="rgba(255, 255, 255, 0.4)"
//               value={firstName}
//               onChangeText={setFirstName}
//             />
//           </View>

//           {/* Last Name */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Last Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Your Last Name"
//               placeholderTextColor="rgba(255, 255, 255, 0.4)"
//               value={lastName}
//               onChangeText={setLastName}
//             />
//           </View>

//           {/* Email Address */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email Address</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Your Email Id"
//               placeholderTextColor="rgba(255, 255, 255, 0.4)"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           {/* Password */}
//           <View style={styles.inputGroup}>
//             <View style={styles.passwordHeader}>
//               <Text style={styles.label}>Password</Text>
//               <TouchableOpacity
//                 onPress={() =>
//                   Alert.alert(
//                     "Info",
//                     "Please use login screen to reset password"
//                   )
//                 }
//               >
//                 <Text style={styles.forgotPassword}>Forget Password</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.passwordInputContainer}>
//               <TextInput
//                 style={[styles.input, styles.passwordInput]}
//                 placeholder="Enter Your Password"
//                 placeholderTextColor="rgba(255, 255, 255, 0.4)"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowPassword(!showPassword)}
//               >
//                 <Ionicons
//                   name={showPassword ? "eye-off-outline" : "eye-outline"}
//                   size={22}
//                   color="rgba(255, 255, 255, 0.5)"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Animated.View>

//         {/* Create Account Button */}
//         <Animated.View
//           style={[
//             styles.buttonContainer,
//             {
//               opacity: buttonAnim.interpolate({
//                 inputRange: [0, 50],
//                 outputRange: [1, 0],
//               }),
//               transform: [{ translateY: buttonAnim }],
//             },
//           ]}
//         >
//           <TouchableOpacity
//             style={[styles.createButton, loading && { opacity: 0.7 }]}
//             onPress={handleCreateAccount}
//             activeOpacity={0.8}
//             disabled={loading}
//           >
//             <Text style={styles.createButtonText}>
//               {loading ? "Creating..." : "Create Account"}
//             </Text>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Home Indicator */}
//         <View style={styles.homeIndicator} />
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0a1628" },
//   scrollContent: { flexGrow: 1, paddingBottom: 40 },
//   statusBar: {
//     height: 44,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   time: { color: "white", fontSize: 15, fontWeight: "600" },
//   statusIcons: { flexDirection: "row", gap: 5 },
//   icon: { fontSize: 14 },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     marginBottom: 20,
//   },
//   closeButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
//   skipButton: { flexDirection: "row", alignItems: "center", gap: 4 },
//   skipText: { color: "white", fontSize: 16, fontWeight: "400" },
//   avatarSection: { alignItems: "center", marginBottom: 30 },
//   avatarContainer: { marginBottom: 12 },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#7FE8C8",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatarEmoji: { fontSize: 50 },
//   changeAvatarText: {
//     color: "rgba(255, 255, 255, 0.7)",
//     fontSize: 15,
//     fontWeight: "400",
//   },
//   formSection: { paddingHorizontal: 20, marginBottom: 30 },
//   inputGroup: { marginBottom: 20 },
//   label: { color: "white", fontSize: 15, fontWeight: "500", marginBottom: 10 },
//   input: {
//     height: 56,
//     backgroundColor: "rgba(28, 58, 107, 0.5)",
//     borderWidth: 1,
//     borderColor: "rgba(28, 76, 255, 0.3)",
//     borderRadius: 16,
//     paddingHorizontal: 20,
//     color: "white",
//     fontSize: 15,
//   },
//   passwordHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   forgotPassword: {
//     color: "rgba(255, 255, 255, 0.6)",
//     fontSize: 14,
//     fontWeight: "400",
//   },
//   passwordInputContainer: { position: "relative" },
//   passwordInput: { paddingRight: 50 },
//   eyeIcon: { position: "absolute", right: 18, top: 17, zIndex: 10 },
//   buttonContainer: { paddingHorizontal: 20, alignItems: "center" },
//   createButton: {
//     width: "70%",
//     height: 56,
//     backgroundColor: "#4A7FE8",
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   createButtonText: { color: "white", fontSize: 17, fontWeight: "600" },
//   homeIndicator: {
//     width: 134,
//     height: 5,
//     backgroundColor: "white",
//     borderRadius: 3,
//     opacity: 0.3,
//     alignSelf: "center",
//     marginTop: 30,
//   },
// });
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../config";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]     = useState(false);

  const avatarAnim = useRef(new Animated.Value(0)).current;
  const formAnim   = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(avatarAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 600,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [avatarAnim, formAnim, buttonAnim]);

  // 🔐 CREATE ACCOUNT → POST /auth/signup
  const handleCreateAccount = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        avatar_url: null,
      };

      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const message =
          (data && data.message) ||
          `Signup failed with status ${response.status}`;
        Alert.alert("Sign Up Failed", message);
        return;
      }

      // ✅ Yaha token store NHI kar rahe
      Alert.alert(
        "Success",
        data?.message || "Account created successfully! Please login.",
        [
          {
            text: "OK",
            onPress: () => {
              // Make sure Stack.Screen name is exactly "Login"
              navigation.replace("Login");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error?.message || "Could not connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => navigation.goBack();
  const handleClose = () => navigation.goBack();
  const handleChangeAvatar = () => {};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Fake Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.icon}>📶</Text>
            <Text style={styles.icon}>📡</Text>
            <Text style={styles.icon}>🔋</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <Animated.View
          style={[
            styles.avatarSection,
            {
              opacity: avatarAnim,
              transform: [
                {
                  scale: avatarAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleChangeAvatar}
            activeOpacity={0.8}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>🤠</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangeAvatar}>
            <Text style={styles.changeAvatarText}>Change avatar</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Form Section */}
        <Animated.View
          style={[
            styles.formSection,
            {
              opacity: formAnim.interpolate({
                inputRange: [0, 50],
                outputRange: [1, 0],
              }),
              transform: [{ translateY: formAnim }],
            },
          ]}
        >
          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Last Name"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email Id"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Info",
                    "Please use login screen to reset password"
                  )
                }
              >
                <Text style={styles.forgotPassword}>Forget Password</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter Your Password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="rgba(255, 255, 255, 0.5)"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Create Account Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim.interpolate({
                inputRange: [0, 50],
                outputRange: [1, 0],
              }),
              transform: [{ translateY: buttonAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.createButton, loading && { opacity: 0.7 }]}
            onPress={handleCreateAccount}
            activeOpacity={0.8}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? "Creating..." : "Create Account"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Home Indicator */}
        <View style={styles.homeIndicator} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a1628" },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  statusBar: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  time: { color: "white", fontSize: 15, fontWeight: "600" },
  statusIcons: { flexDirection: "row", gap: 5 },
  icon: { fontSize: 14 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  closeButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  skipButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  skipText: { color: "white", fontSize: 16, fontWeight: "400" },
  avatarSection: { alignItems: "center", marginBottom: 30 },
  avatarContainer: { marginBottom: 12 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#7FE8C8",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: { fontSize: 50 },
  changeAvatarText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    fontWeight: "400",
  },
  formSection: { paddingHorizontal: 20, marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { color: "white", fontSize: 15, fontWeight: "500", marginBottom: 10 },
  input: {
    height: 56,
    backgroundColor: "rgba(28, 58, 107, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(28, 76, 255, 0.3)",
    borderRadius: 16,
    paddingHorizontal: 20,
    color: "white",
    fontSize: 15,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  forgotPassword: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "400",
  },
  passwordInputContainer: { position: "relative" },
  passwordInput: { paddingRight: 50 },
  eyeIcon: { position: "absolute", right: 18, top: 17, zIndex: 10 },
  buttonContainer: { paddingHorizontal: 20, alignItems: "center" },
  createButton: {
    width: "70%",
    height: 56,
    backgroundColor: "#4A7FE8",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: { color: "white", fontSize: 17, fontWeight: "600" },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "white",
    borderRadius: 3,
    opacity: 0.3,
    alignSelf: "center",
    marginTop: 30,
  },
});