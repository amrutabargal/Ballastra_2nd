
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


import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

export default function V4({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const [avatar, setAvatar] = useState(
    "https://i.imgur.com/7k12EPD.png"
  );

  /* Change Avatar */
  const handleChangeAvatar = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Gallery access is needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar hidden />

      {/* Close */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity onPress={handleChangeAvatar}>
          <Text style={styles.changeAvatar}>Change avatar</Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* Username */}
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Choose a unique username"
            placeholderTextColor="#7C8DB5"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <Text style={styles.helper}>
          This will be your identity on Ballastra.
        </Text>

        {/* Email */}
        <Text style={[styles.label, { marginTop: 20 }]}>
          Email Address
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#7C8DB5"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <Text style={[styles.label, { marginTop: 20 }]}>
          Password
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Create a password"
            placeholderTextColor="#7C8DB5"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
          />
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={18}
              color="#8A94B8"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Create Account */}
      <TouchableOpacity style={styles.nextBtn}>
        <Text style={styles.nextText}>Create Account</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#050B18",
  },

  closeBtn: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
  },

  avatarWrapper: {
    marginTop: height * 0.16,
    alignItems: "center",
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
  },

  changeAvatar: {
    color: "#C7D2FF",
    fontSize: 13,
    fontWeight: "400",
  },

  form: {
    marginTop: 38,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "400",
  },

  inputBox: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3154BA",
    backgroundColor: "#142048",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  input: {
    color: "#fff",
    fontSize: 14,
  },

  helper: {
    marginTop: 8,
    fontSize: 11,
    color: "#8A94B8",
  },

  nextBtn: {
    alignSelf: "center",
    backgroundColor: "#3255BA",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 42,
    marginBottom: 110,
  },

  nextText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
