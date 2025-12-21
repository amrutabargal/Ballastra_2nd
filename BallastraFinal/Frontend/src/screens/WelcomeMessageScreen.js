import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeMessageScreen({ navigation }) {
  const [nexusText, setNexusText] = useState("");
  const [spaceText, setSpaceText] = useState("");
  const [dmText, setDmText] = useState("");

  const MAX = 500;

  const renderBox = (label, value, setValue) => (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={setValue}
          multiline
          maxLength={MAX}
          placeholder=""
          placeholderTextColor="#64748b"
          style={styles.input}
        />

        <Text style={styles.counter}>
          {value.length}/{MAX}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#020617", "#020816"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* ---------- HEADER ---------- */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Welcome message</Text>

            <TouchableOpacity>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* ---------- CONTENT ---------- */}
          {renderBox("Nexus Welcome text", nexusText, setNexusText)}
          {renderBox("Space Welcome text", spaceText, setSpaceText)}
          {renderBox("DM Welcome text", dmText, setDmText)}

          {/* ---------- FOOTER ---------- */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.resetText}>Reset to Default</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
        backgroundColor: "#0C142A",

  },

  /* GLOBAL CONTAINER (RESPONSIVE) */
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
            paddingTop: 30,

  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    color: "#60a5fa",
    fontSize: 14,
  },

  /* INPUT SECTIONS */
  section: {
    marginTop: 18,
  },
  label: {
    color: "#ffff",
    fontSize: 13,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#172554",
    borderRadius: 14,
    padding: 14,
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#3154BA",
  },
  input: {
    color: "#fff",
    fontSize: 14,
    minHeight: 70,
    textAlignVertical: "top",
  },
  counter: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "right",
    marginTop: 6,
  },

  /* FOOTER */
  footer: {
    marginTop: 28,
    alignItems: "center",
  },
 saveBtn: {
  backgroundColor: "#3154BA",
  paddingVertical: 14,
  paddingHorizontal: 49, // 👈 controls button width
  borderRadius: 14,
  alignItems: "center",
},

  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  resetText: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 12,
  },
});