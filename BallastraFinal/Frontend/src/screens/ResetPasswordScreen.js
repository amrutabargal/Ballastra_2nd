// // src/screens/ResetPasswordScreen.js

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { BASE_URL } from "../config";

// export default function ResetPasswordScreen({ route, navigation }) {
//   const passedEmail = route?.params?.email || ""; // Login se aaya email
//   const [email, setEmail] = useState(passedEmail); // optional: user edit kar sakta hai
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleResetPassword = async () => {
//     if (!email || !password || !confirm) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }

//     if (password !== confirm) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Simple version: email + new password
//       const response = await fetch(`${BASE_URL}/auth/reset-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       let data = null;
//       try {
//         data = await response.json();
//       } catch {
//         data = null;
//       }

//       if (!response.ok) {
//         return Alert.alert(
//           "Reset Failed",
//           data?.message || `Something went wrong (${response.status})`
//         );
//       }

//       Alert.alert(
//         "Success",
//         data?.message || "Password changed successfully!",
//         [
//           {
//             text: "OK",
//             onPress: () => navigation.replace("PasswordChanged"),
//           },
//         ]
//       );
//     } catch (error) {
//       console.log("Reset password error:", error);
//       Alert.alert(
//         "Error",
//         error?.message || "Could not connect to server. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Fake status bar time area tumchya UI sarkhi banवायची असेल तर add karu शकतेस */}

//         <View style={styles.card}>
//           <Text style={styles.infoText}>
//             Your password reset request was verified. Now create a new password
//             to continue securely.
//           </Text>

//           {/* Email (optional field – hide karaycha asel tar काढून टाक) */}
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             placeholderTextColor="rgba(255,255,255,0.6)"
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//             keyboardType="email-address"
//           />

//           <Text style={styles.label}>New password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your new password"
//             placeholderTextColor="rgba(255,255,255,0.6)"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />

//           <Text style={styles.label}>Re-type password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter re-type new password"
//             placeholderTextColor="rgba(255,255,255,0.6)"
//             secureTextEntry
//             value={confirm}
//             onChangeText={setConfirm}
//           />

//           <TouchableOpacity
//             style={[styles.button, loading && { opacity: 0.7 }]}
//             onPress={handleResetPassword}
//             disabled={loading}
//           >
//             <Text style={styles.buttonText}>
//               {loading ? "Please wait..." : "Reset Password"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#050816", // dark bg
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#10224A",
//     borderRadius: 24,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: "#294BFF",
//   },
//   infoText: {
//     color: "white",
//     textAlign: "center",
//     marginBottom: 24,
//     fontSize: 14,
//   },
//   label: {
//     color: "rgba(255,255,255,0.8)",
//     marginBottom: 6,
//     marginTop: 10,
//     fontSize: 14,
//   },
//   input: {
//     height: 50,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: "rgba(41, 75, 255, 0.5)",
//     paddingHorizontal: 16,
//     color: "white",
//     backgroundColor: "rgba(15, 32, 70, 0.9)",
//   },
//   button: {
//     marginTop: 24,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#4A7FE8",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });
// screens/ResetPasswordScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { BASE_URL } from "../config";

export default function ResetPasswordScreen({ route, navigation }) {
  const passedEmail = route?.params?.email || "";
  const [email, setEmail] = useState(passedEmail);
  const [code, setCode] = useState("");          // OTP code
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email || !code || !password || !confirm) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,                 // OTP
          newPassword: password // backend ला हवाय हा नाव
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        return Alert.alert(
          "Reset Failed",
          data?.message || `Something went wrong (${response.status})`
        );
      }

      Alert.alert(
        "Success",
        data?.message || "Password changed successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"), // किंवा "PasswordChanged"
          },
        ]
      );
    } catch (error) {
      console.log("Reset password error:", error);
      Alert.alert(
        "Error",
        error?.message || "Could not connect to server. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.infoText}>
            Enter the OTP you received on your email and set a new password to
            continue securely.
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>OTP Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP code"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />

          <Text style={styles.label}>New password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Re-type password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter re-type new password"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Please wait..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#10224A",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#294BFF",
  },
  infoText: {
    color: "white",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 14,
  },
  label: {
    color: "rgba(255,255,255,0.8)",
    marginBottom: 6,
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(41, 75, 255, 0.5)",
    paddingHorizontal: 16,
    color: "white",
    backgroundColor: "rgba(15, 32, 70, 0.9)",
  },
  button: {
    marginTop: 24,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4A7FE8",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
