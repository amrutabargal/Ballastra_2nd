import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CommunityInsightsScreen({ navigation }) {
  const MAX = 500;

  const [nexusText, setNexusText] = useState("");
  const [spaceText, setSpaceText] = useState("");
  const [dmText, setDmText] = useState("");

  const InsightItem = ({ icon, title }) => (
    <TouchableOpacity style={styles.insightCard} activeOpacity={0.8}>
      <View style={styles.insightLeft}>
        <Ionicons name={icon} size={18} color="#c7d2fe" />
        <Text style={styles.insightText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
    </TouchableOpacity>
  );

  const TextBox = ({ label, value, setValue }) => (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={setValue}
          multiline
          maxLength={MAX}
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
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Community Insights</Text>

            <TouchableOpacity>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <InsightItem icon="people-outline" title="Active members" />
          <InsightItem icon="chatbubble-outline" title="Messages / Day" />

          <TextBox
            label="Nexus Welcome text"
            value={nexusText}
            setValue={setNexusText}
          />
          <TextBox
            label="Space Welcome text"
            value={spaceText}
            setValue={setSpaceText}
          />
          <TextBox
            label="DM Welcome text"
            value={dmText}
            setValue={setDmText}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    marginBottom: 30,
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
  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#172554",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e3a8a",
  },
  insightLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  insightText: {
    color: "#e5e7eb",
    fontSize: 14,
    marginLeft: 10,
  },
  section: {
    marginTop: 10,
  },
  label: {
    color: "#cbd5f5",
    fontSize: 13,
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: "#172554",
    borderRadius: 14,
    padding: 14,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#1e3a8a",
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
});
