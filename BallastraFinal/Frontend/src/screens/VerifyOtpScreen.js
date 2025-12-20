
// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   ImageBackground,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// export default function V4({ navigation }) {
//   const [code, setCode] = useState(["", "", "", ""]);
//   const inputs = useRef([]);

//   const handleChange = (text, index) => {
//     if (!/^\d?$/.test(text)) return;

//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);

//     if (text && index < 3) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   const handleVerify = () => {
//     if (code.join("").length !== 4) {
//       Alert.alert("Error", "Please enter verification code");
//       return;
//     }
//     navigation.navigate("Login_Successful");
//   };

//   return (
//     <ImageBackground
//       source={require("../../assets/image1.png")}
//       style={styles.container}
//       resizeMode="cover"
//     >
//       <StatusBar hidden />

//       {/* ❌ Close */}
//       <TouchableOpacity
//         style={styles.closeBtn}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="close" size={22} color="#fff" />
//       </TouchableOpacity>

//       {/* Content */}
//       <View style={styles.centerBox}>
//         <Text style={styles.title}>Verifications</Text>

//         <Text style={styles.subTitle}>
//           Check your Email and enter the verification code.
//         </Text>

//         {/* Code Inputs */}
//         <View style={styles.codeRow}>
//           {code.map((item, index) => (
//             <TextInput
//               key={index}
//               ref={(ref) => (inputs.current[index] = ref)}
//               style={styles.codeBox}
//               value={item}
//               onChangeText={(t) => handleChange(t, index)}
//               keyboardType="number-pad"
//               maxLength={1}
//               textAlign="center"
//             />
//           ))}
//         </View>

//         <TouchableOpacity>
//           <Text style={styles.resend}>
//             If you don’t receive a code ?{" "}
//             <Text style={styles.resendLink}>Resend</Text>
//           </Text>
//         </TouchableOpacity>

//         <Text style={styles.loading}>⌛ Loading</Text>
//       </View>

//       {/* Verify Button */}
//       <TouchableOpacity style={styles.nextBtn} onPress={handleVerify}>
//         <Text style={styles.nextText}>Verify</Text>
//       </TouchableOpacity>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     backgroundColor: "#050B18",
//   },

//   closeBtn: {
//     position: "absolute",
//     top: 54,
//     left: 20,
//     zIndex: 10,
//   },

//   centerBox: {
//     marginTop: height * 0.30, // 🔥 image-match spacing
//     alignItems: "center",
//   },

//   title: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "500",
//     marginBottom: 8,
//   },

//   subTitle: {
//     color: "#8A94B8",
//     fontSize: 12,
//     textAlign: "center",
//     marginBottom: 28, // 🔥 more breathing space
//     lineHeight: 16,
//   },

//   codeRow: {
//     flexDirection: "row",
//     gap: 14, // 🔥 even spacing between boxes
//     marginBottom: 22,
//   },

//   codeBox: {
//     width: 46,
//     height: 46,
//     borderRadius: 12,
//     backgroundColor: "#142048",
//     borderWidth: 1,
//     borderColor: "#3154BA",
//     color: "#fff",
//     fontSize: 16,
//   },

//   resend: {
//     color: "#8A94B8",
//     fontSize: 11,
//     marginBottom: 12,
//   },

//   resendLink: {
//     color: "#4F6EF7",
//   },

//   loading: {
//     color: "#8A94B8",
//     fontSize: 11,
//     marginTop: 4,
//   },

//   nextBtn: {
//     alignSelf: "center",
//     backgroundColor: "#3255BA",
//     borderRadius: 15,
//     paddingVertical: 12,
//     paddingHorizontal: 44,
//    marginBottom: 90,
//     marginTop:10,
//   },

//   nextText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function V4({ navigation, route }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputs = useRef([]);

  // Get purpose and email from route params or AsyncStorage
  const purpose = route?.params?.purpose || "signup"; // "signup" or "password_reset"
  const [email, setEmail] = useState(route?.params?.email || "");

  useEffect(() => {
    // If email not in params, get from AsyncStorage
    const getEmail = async () => {
      if (!email) {
        const storedEmail =
          (await AsyncStorage.getItem("signupEmail")) ||
          (await AsyncStorage.getItem("resetEmail"));
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }
    };
    getEmail();
  }, []);

  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    if (code.join("").length !== 4) {
      Alert.alert("Error", "Please enter the complete 4-digit verification code");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Email not found. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const otpCode = code.join("");

      let endpoint = "";
      if (purpose === "signup") {
        endpoint = `${BASE_URL}/api/auth/verify-signup-otp`;
      } else {
        endpoint = `${BASE_URL}/api/auth/verify-otp`;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code: otpCode,
        }),
      });

      const responseText = await response.text();
      let data = null;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        if (responseText.trim().startsWith("<")) {
          return Alert.alert(
            "Server Error",
            `The server returned an error page (Status: ${response.status})`
          );
        }
        return Alert.alert(
          "Error",
          `Invalid response from server (Status: ${response.status})`
        );
      }

      if (!response.ok) {
        return Alert.alert(
          "Verification Failed",
          data?.message || "Invalid or expired OTP. Please try again."
        );
      }

      // If signup verification, store token and user
      if (purpose === "signup" && data?.token) {
        await AsyncStorage.setItem("token", data.token);
        if (data?.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }
        await AsyncStorage.removeItem("signupEmail");

        Alert.alert(
          "Success",
          data?.message || "Account verified successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.replace("Loginscreen"),
            },
          ]
        );
      } else {
        // Password reset OTP verification - navigate to reset password screen
        await AsyncStorage.setItem("resetEmail", email);
        await AsyncStorage.setItem("resetToken", otpCode);

        Alert.alert(
          "Success",
          data?.message || "OTP verified successfully!",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("ResetPasswordScreen", {
                  email,
                  token: otpCode,
                }),
            },
          ]
        );
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Alert.alert(
        "Error",
        "Unable to connect to server. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      Alert.alert("Error", "Email not found. Please try again.");
      return;
    }

    try {
      setResending(true);

      if (purpose === "signup") {
        Alert.alert(
          "Info",
          "Please go back and create account again to resend OTP."
        );
        return;
      } else {
        // For password reset, call forgot-password
        const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim().toLowerCase() }),
        });

        const responseText = await response.text();
        let data = null;
        try {
          data = JSON.parse(responseText);
        } catch {
          data = null;
        }

        if (response.ok) {
          Alert.alert(
            "Success",
            data?.message || "OTP has been resent to your email."
          );
        } else {
          Alert.alert("Error", data?.message || "Failed to resend OTP.");
        }
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      Alert.alert("Error", "Unable to connect to server. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar hidden />

      {/* ❌ Close */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.centerBox}>
        <Text style={styles.title}>Verifications</Text>

        <Text style={styles.subTitle}>
          Check your Email and enter the verification code.
        </Text>

        {/* Code Inputs */}
        <View style={styles.codeRow}>
          {code.map((item, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.codeBox}
              value={item}
              onChangeText={(t) => handleChange(t, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleResend} disabled={resending}>
          <Text style={styles.resend}>
            If you don't receive a code ?{" "}
            <Text style={styles.resendLink}>
              {resending ? "Resending..." : "Resend"}
            </Text>
          </Text>
        </TouchableOpacity>

        {loading && <Text style={styles.loading}>⌛ Verifying...</Text>}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.nextBtn, loading && { opacity: 0.7 }]}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextText}>Verify</Text>
        )}
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
    top: 54,
    left: 20,
    zIndex: 10,
  },

  centerBox: {
    marginTop: height * 0.30,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },

  subTitle: {
    color: "#8A94B8",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 16,
  },

  codeRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 22,
  },

  codeBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#142048",
    borderWidth: 1,
    borderColor: "#3154BA",
    color: "#fff",
    fontSize: 16,
  },

  resend: {
    color: "#8A94B8",
    fontSize: 11,
    marginBottom: 12,
  },

  resendLink: {
    color: "#4F6EF7",
  },

  loading: {
    color: "#8A94B8",
    fontSize: 11,
    marginTop: 4,
  },

  nextBtn: {
    alignSelf: "center",
    backgroundColor: "#3255BA",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 44,
    marginBottom: 90,
    marginTop: 10,
  },

  nextText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
