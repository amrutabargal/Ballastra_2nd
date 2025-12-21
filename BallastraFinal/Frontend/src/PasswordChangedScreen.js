// src/screens/PasswordChangedScreen.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PasswordChangedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Center card */}
      <View style={styles.card}>
        <Text style={styles.text}>Password Changed{"\n"}Successfully</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    backgroundColor: "#10224A",
    borderWidth: 1,
    borderColor: "#294BFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    width: "60%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4A7FE8",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
