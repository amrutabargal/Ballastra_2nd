
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const REASONS = [
  "Nudity or sexual activity",
  "Hate speech or symbols",
  "Scam or fraud",
  "Violence or dangerous organisations",
  "Sale of illegal or regulated goods",
  "Bullying or harassment",
  "Intellectual property violation",
  "Suicide, self-injury or eating disorder",
  "Spam",
  "The problem isn’t listed here",
  "Report as unlawful",
];

// reason → screen name map
const REASON_SCREEN_MAP = {
  "Nudity or sexual activity": "Nudity_or_sexual_activity",
  "Hate speech or symbols": "Hate_speech_or_symbols",
  "Scam or fraud": "Scam_or_fraud",
  "Violence or dangerous organisations": "Violence_or_dangerous_organisations",
  "Sale of illegal or regulated goods": "Sale_of_illegal_or_regulated_goods",
  "Bullying or harassment": "Bullying_or_harassment",
  "Intellectual property violation": "Intellectual_property_violation",
  "Suicide, self-injury or eating disorder": "Suicide_self_injury_or_eating_disorder",
  "Spam": "Spam",
  "The problem isn’t listed here": "Problem_not_listed",
  "Report as unlawful": "Report_as_unlawful",
};

export default function ReportScreen({ navigation, route }) {
  const message = route.params?.message;

  const onSelectReason = (reason) => {
    console.log("REPORT:", message?.id, "Reason:", reason);

    const targetScreen = REASON_SCREEN_MAP[reason];

    if (targetScreen) {
      // modal बंद ठेवून पुढचा स्क्रीन उघडण्यासाठी
      navigation.goBack();
      setTimeout(() => {
        navigation.navigate(targetScreen, { message, reason });
      }, 0);
    } else {
      // बाकी reasons साठी फक्त popup बंद
      navigation.goBack();
    }
  };

  return (
    <View style={styles.root}>
      {/* dark overlay – बाहेर tap केल्यावर बंद */}
      <Pressable style={styles.overlay} onPress={() => navigation.goBack()} />

      {/* floating card */}
      <SafeAreaView style={styles.sheet}>
        {/* handle bar */}
        <View style={styles.handle} />

        {/* header row */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Ionicons name="flag" size={18} color="#F87171" />
            <Text style={styles.headerTitle}>Report</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={20} color="#E5E7EB" />
          </TouchableOpacity>
        </View>

        {/* title + description */}
        <Text style={styles.title}>Select a problem to report</Text>
        <Text style={styles.subtitle}>
          You can report this chat to ballastra if you think that it goes
          against our Community Standards. We won’t notify the account that you
          submitted this report.
        </Text>

        {/* reasons list */}
        <View style={styles.listWrapper}>
          {REASONS.map((r, idx) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.row,
                idx === REASONS.length - 1 && { borderBottomWidth: 0 },
              ]}
              activeOpacity={0.7}
              onPress={() => onSelectReason(r)}
            >
              <Text style={styles.rowText}>{r}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#6B7280"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.55)",
  },
  sheet: {
    marginHorizontal: 10,
    marginBottom: 26,
    backgroundColor: "#0C142A",
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 18,
    maxHeight: "78%",
    shadowColor: "#3154BA",
    borderWidth:1,
    borderColor:"#3154BA",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 12,

  },
  handle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4B5563",
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 6,
    color: "#F87171",
    fontSize: 18,
    fontWeight: "600",
  },

  title: {
    color: "#F9FAFB",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 16,
  },

  listWrapper: {
    borderRadius: 18,
    overflow: "hidden",
  },
  row: {
  backgroundColor: "#0C142A",
  paddingVertical: 14,
  paddingHorizontal: 10,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: "#1f2937",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,

  // Android shadow
  elevation: 5,
},
  rowText: {
    flex: 1,
    color: "#E5E7EB",
    fontSize: 14,
  },
});
