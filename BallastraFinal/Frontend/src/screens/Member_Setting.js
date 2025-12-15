import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function SettingsScreen({ navigation }) {
  const [soundDisabled, setSoundDisabled] = useState(false);
  const [videoOnly, setVideoOnly] = useState(false);
  const [selfCamera, setSelfCamera] = useState(true);
  const [noiseStandard, setNoiseStandard] = useState(true);
  const [noiseNone, setNoiseNone] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#050B1A", "#0A1330", "#050B1A"]}
        style={styles.overlay}
      >
        <View style={styles.outerBorder}>
          <View style={styles.container}>
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Settings</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* ================= VOICE SETTINGS ================= */}
            <View style={styles.sectionWrapper}>
              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>Voice Settings</Text>
              </View>

              <View style={styles.sectionBox}>
                <TouchableOpacity style={styles.row}>
                  <View style={styles.rowLeft}>
                    <Ionicons
                      name="volume-medium-outline"
                      size={18}
                      color="#C7D2FF"
                    />
                    <Text style={styles.rowText}>
                      Manage Audio Output
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#5E6B9A"
                  />
                </TouchableOpacity>

                <View style={styles.divider} />

                <View style={styles.row}>
                  <View style={styles.rowLeft}>
                    <Ionicons
                      name="headset-outline"
                      size={18}
                      color="#C7D2FF"
                    />
                    <Text style={styles.rowText}>Sound Disabled</Text>
                  </View>
                  <Switch
                    value={soundDisabled}
                    onValueChange={setSoundDisabled}
                    trackColor={{ false: "#1E2A5A", true: "#6C7CFF" }}
                    thumbColor="#fff"
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                  <View style={styles.rowLeft}>
                    <Ionicons
                      name="videocam-outline"
                      size={18}
                      color="#C7D2FF"
                    />
                    <Text style={styles.rowText}>
                      Video-Only View
                    </Text>
                  </View>
                  <Switch
                    value={videoOnly}
                    onValueChange={setVideoOnly}
                    trackColor={{ false: "#1E2A5A", true: "#6C7CFF" }}
                    thumbColor="#fff"
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                  <Text style={styles.rowText}>
                    Self Camera View
                  </Text>
                  <Switch
                    value={selfCamera}
                    onValueChange={setSelfCamera}
                    trackColor={{ false: "#1E2A5A", true: "#7C5CFF" }}
                    thumbColor="#fff"
                  />
                </View>
              </View>
            </View>

            {/* ================= NOISE SUPPRESSION ================= */}
            <View style={styles.sectionWrapper}>
              <View style={styles.sectionTitleWrap}>
                <Text style={styles.sectionTitle}>
                  Noise Suppression
                </Text>
              </View>

              <View style={styles.sectionBox}>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Standard</Text>
                  <Switch
                    value={noiseStandard}
                    onValueChange={(v) => {
                      setNoiseStandard(v);
                      setNoiseNone(!v);
                    }}
                    trackColor={{ false: "#1E2A5A", true: "#7C5CFF" }}
                    thumbColor="#fff"
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                  <Text style={styles.rowText}>None</Text>
                  <Switch
                    value={noiseNone}
                    onValueChange={(v) => {
                      setNoiseNone(v);
                      setNoiseStandard(!v);
                    }}
                    trackColor={{ false: "#1E2A5A", true: "#7C5CFF" }}
                    thumbColor="#fff"
                  />
                </View>
              </View>
            </View>

            {/* ================= BOTTOM CARD ================= */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.bottomCard}
              onPress={() => navigation.navigate("Voice_Setting")}
            >
              <Ionicons name="settings" size={18} color="#fff" />

              <View style={styles.textWrapper}>
                <Text style={styles.bottomTitle}>
                  Voice Settings
                </Text>
                <Text style={styles.bottomSubtitle}>
                  Adjust Your Voice & Video Settings
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050B1A" },

  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  outerBorder: {
    width: width * 0.94,
    height: height * 0.92,
    borderRadius: 30,
    borderWidth: 1.2,
    borderColor: "#2A3C7A",
    padding: 2,
  },

  container: {
    flex: 1,
    backgroundColor: "#050B1A",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#0E1B3D",
    padding: 16,
  },

  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5E6B9A",
    alignSelf: "center",
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* ===== UNION / NOTCH SECTIONS ===== */

  sectionWrapper: {
    marginBottom: 20,
  },

  sectionTitleWrap: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#2A3C7A",
    borderBottomWidth: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#050B1A",
    marginLeft: 14,
    zIndex: 2,
  },

  sectionTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
  },

  sectionBox: {
    borderWidth: 1,
    borderColor: "#2A3C7A",
    borderRadius: 22,
    marginTop: -1,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rowText: {
    color: "#ffffff",
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#1E2A5A",
  },

  
bottomCard: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  alignSelf: "center",
  borderRadius: 14,
  paddingVertical: 14,
  width:"100%",
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: "#3154BA4D",
  backgroundColor: "#3154BA",
  marginHorizontal: 16,
},

iconWrapper: {
  width: 18,
  height: 18,

  alignItems: "center",
  justifyContent: "center",
  marginRight: 14,
},

textWrapper: {
  flex: 1,
  marginRight: 10,
},

bottomTitle: {
  fontSize: 15,
  fontWeight: "600",
  color: "#ffffff",
marginLeft:10,
},

bottomSubtitle: {
  marginTop: 3,
  fontSize: 12,
  color: "#ffffff",
  marginLeft:10,
},


  
});