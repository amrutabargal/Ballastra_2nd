
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

import GameIcon from "../../assets/Game.png";
import SchoolIcon from "../../assets/School.png";
import StudyGroupIcon from "../../assets/Study_Group.png";
import FriendsIcon from "../../assets/Friends.png";

const { width, height } = Dimensions.get("window");

/* ---------- RESPONSIVE HELPERS ---------- */
const scale = (size = 20) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/* ---------- SVG ICON ---------- */
const nexusSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
  <path d="M200-160v-80h560v80H200Zm0-140-51-321q-2 0-4.5.5t-4.5.5q-25 0-42.5-17.5T80-680q0-25 17.5-42.5T140-740q25 0 42.5 17.5T200-680q0 7-1.5 13t-3.5 11l125 56 125-171q-11-8-18-21t-7-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820q0 15-7 28t-18 21l125 171 125-56q-2-5-3.5-11t-1.5-13q0-25 17.5-42.5T820-740q25 0 42.5 17.5T880-680q0 25-17.5 42.5T820-620q-2 0-4.5-.5t-4.5-.5l-51 321H200Zm68-80h424l26-167-105 46-133-183-133 183-105-46 26 167Zm212 0Z"/>
</svg>
`;

export default function Create_Nexus({ navigation }) {
  const CARDS = [
    { id: 1, title: "Gaming" },
    { id: 2, title: "School" },
    { id: 3, title: "Study Group" },
    { id: 4, title: "Friends" },
  ];

  const getIcon = (title) => {
    const iconMap = {
      Gaming: GameIcon,
      School: SchoolIcon,
      "Study Group": StudyGroupIcon,
      Friends: FriendsIcon,
    };
    return iconMap[title];
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor="#0C142A" />

      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={scale(24)} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Create Your Nexus</Text>

        <Text style={styles.subtitle}>
          A Nexus is your space. Build your world with chat,{"\n"}channels and vibes.
        </Text>

        {/* Create Nexus Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("My_Own_Nexus")}
          activeOpacity={0.8}
        >
          <View style={{ marginTop: verticalScale(6) }}>
            <SvgXml xml={nexusSvg} width={scale(22)} height={scale(22)} />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.primaryButtonText}>Create My Own Nexus</Text>
          </View>
        </TouchableOpacity>

        {/* Cards */}
        <ScrollView
          style={styles.cardsScrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gridContainer}>
            {CARDS.map((item) => {
              const icon = getIcon(item.title);

              return (
              
                <ImageBackground
  key={item.id}
  source={require("../../assets/background.png")}
  resizeMode="cover"
  style={styles.card}
  imageStyle={{ width: "120%", height: "127%", borderRadius: 18 }}
>
                  <View style={styles.imageBox}>
                    <Image source={icon} style={styles.iconImage} />
                  </View>

                  <Text style={styles.cardTitle}>{item.title}</Text>

                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() =>
                      navigation.navigate("Create_Nexus_Profile", {
                        category: item.title,
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cardButtonText}>Create</Text>
                  </TouchableOpacity>
                </ImageBackground>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Text */}
        <Text style={styles.bottomText}>Don't have a Nexus to join?</Text>

        {/* Explore Button */}
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.exploreButtonText}>Explore Nexus</Text>
        </TouchableOpacity>

        <View style={{ height: verticalScale(20) }} />
      </View>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#02081A" },

  container: {
    flex: 1,
    backgroundColor: "#02081A",
    paddingHorizontal: scale(22),
  },

  closeButton: {
    width: scale(26),
    height: scale(26),
    justifyContent: "center",
    marginTop: verticalScale(25),
    marginBottom: verticalScale(25),
  },

  title: {
    color: "#FFFFFF",
    fontSize: moderateScale(18),
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#BDBDBD",
    fontSize: moderateScale(12),
    textAlign: "center",
    lineHeight: moderateScale(18),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(20),
  },

  primaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    backgroundColor: "#0B1B44",
    borderWidth: 1.2,
    borderColor: "#3B82F6",
    shadowColor: "#4F8BFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.4,
  },

  cardsScrollView: {
    maxHeight: height * 0.48,
    marginTop: verticalScale(30),
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

 card: {
  width: "47%",
  height: verticalScale(190),   // ✅ fixed height for proper fit
  borderRadius: moderateScale(18),
  paddingVertical: verticalScale(20),
  paddingHorizontal: scale(12),
  alignItems: "center",
  marginBottom: verticalScale(12),
  borderWidth: 1,
  borderColor: "#3255BA",
  overflow: "hidden",
},

  imageBox: {
    width: 0,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    
  },

  iconImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: moderateScale(10),
    fontWeight: "500",
    marginBottom: verticalScale(12),
    textAlign: "center",
  },

  cardButton: {
    backgroundColor: "#0D2151",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(26),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },

  cardButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: moderateScale(10),
  },

  bottomText: {
    color: "#fff",
    textAlign: "center",
    marginTop: verticalScale(10),
    fontSize: moderateScale(10),
    fontWeight: "500",
  },

  exploreButton: {
    backgroundColor: "#2563EB",
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(15),
    alignItems: "center",
    alignSelf: "center",
  },

  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
});
