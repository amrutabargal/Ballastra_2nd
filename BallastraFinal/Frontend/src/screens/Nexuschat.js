import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Hashtag from '../../assets/Frame.png'
const { width: SCREEN_W } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size) => (SCREEN_W / guidelineBaseWidth) * size;

const SIDE_AVATARS = [
  { id: "1", avatar: "https://i.pravatar.cc/150?img=12", color: "#06b6d4", badge: 1 },
  { id: "2", avatar: "https://i.pravatar.cc/150?img=33", color: "#f97316", badge: 1 },
  { id: "3", avatar: "https://i.pravatar.cc/150?img=45", color: "#a855f7", badge: 1 },
  { id: "4", avatar: "https://i.pravatar.cc/150?img=8", color: "#ec4899", badge: 1 },
  { id: "5", avatar: "https://i.pravatar.cc/150?img=25", color: "#22c55e", badge: 1 },
  { id: "6", avatar: "https://i.pravatar.cc/150?img=67", color: "#06b6d4", badge: 1 },
  { id: "7", avatar: "https://i.pravatar.cc/150?img=19", color: "#a855f7", badge: 1 },
];

const COVER = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80";

export default function NexusChat({ route, navigation }) {
  const communityName = route?.params?.name || "Sushis City";
  const members = route?.params?.members || 14879;
  const [chatOpen, setChatOpen] = useState(true);
  const [activeRoom, setActiveRoom] = useState("Lounge");

  const [voiceOpen, setVoiceOpen] = useState(true);
  const routeAvatar = route?.params?.avatar;
  const routeJoined = route?.params?.joined;
  const sideAvatars = useMemo(() => {
    const arr = [...SIDE_AVATARS];
    // only show the navigated community on the left if the user has joined it
    if (routeAvatar && routeJoined) {
      arr.unshift({ id: `r-${Date.now()}`, avatar: routeAvatar, color: "#22c55e", badge: 0 });
    }
    return arr;
  }, [routeAvatar, routeJoined]);

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* CONTENT + SIDEBAR */}
      <View style={styles.mainRow}>
        {/* LEFT VERTICAL AVATAR BAR */}
        {/* <View style={styles.sidebar}>
         
          <TouchableOpacity style={styles.sideIconBig} onPress={() => navigation?.navigate?.('Discover')}>
            <Ionicons name="compass-outline" size={scale(22)} color="#94a3b8" />
          </TouchableOpacity>

         
          <TouchableOpacity
            style={[styles.sideIconBig, styles.sideIconPlus]}
            onPress={() => navigation?.navigate?.("Create_Nexus")}
          >
            <Ionicons name="add" size={scale(28)} color="#fff" />
          </TouchableOpacity>

          
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.sideAvatarScroll}
            contentContainerStyle={{ paddingBottom: scale(16) }}
          >
            {sideAvatars.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.sideAvatarWrapper}
                onPress={() => navigation?.navigate?.('UserProfile', { userId: item.id })}
              >
                <LinearGradient
                  colors={[item.color, item.color + "99"]}
                  style={styles.sideAvatarBorder}
                >
                  <Image source={{ uri: item.avatar }} style={styles.sideAvatar} />
                </LinearGradient>
                {item.badge > 0 && (
                  <View style={styles.sideBadge}>
                    <Text style={styles.sideBadgeText}>
                      {item.badge > 9 ? "9+" : item.badge}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}
        <View style={styles.sidebar}>

          <TouchableOpacity style={styles.sideIconBig}>
            <TouchableOpacity
              style={styles.compassWrapper}
              onPress={() => navigation?.navigate?.('Discover')}
            >
              {/* Blue rectangle */}
              <View style={styles.compassRect} />

              {/* Curve cut overlay */}
              <View style={styles.compassCurve} />

              {/* Circle */}
              <View style={styles.compassCircle}>
                <Ionicons name="compass" size={scale(20)} color="#fff" />
              </View>
            </TouchableOpacity>


          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sideIconBig, styles.sideIconPlus]}
            onPress={() => navigation.navigate("Create_Nexus")}
          >
            <Ionicons name="add" size={scale(30)} color="#fff" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {sideAvatars.map(item => (
              <TouchableOpacity key={item.id} style={styles.sideAvatarWrapper}>
                <LinearGradient
                  colors={[item.color, item.color + "99"]}
                  style={styles.sideAvatarBorder}
                >
                  <Image source={{ uri: item.avatar }} style={styles.sideAvatar} />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>

        {/* RIGHT MAIN AREA */}
        <View style={styles.mainContentWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* COVER / HEADER */}
            <View style={styles.mainrow1}>
              <View style={styles.headerCard}>
                <ImageBackground
                  source={{ uri: COVER }}
                  style={styles.headerBg}
                  imageStyle={styles.headerBgImage}
                >
                  {/* Dark overlay */}
                  <View style={styles.headerOverlay} />

                  {/* TOP HEADER ICONS */}
                  <View style={styles.headerTopRow}>
                    <View style={styles.headerIconRow}>
                      {[
                        { icon: "search", screen: "Search" },
                        { icon: "people", screen: "Members" },
                        { icon: "shield-checkmark", screen: "CommunitySettings" },
                      ].map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => navigation?.navigate?.(item.screen)}
                        >
                          <LinearGradient
                            colors={["#3154BA", "rgba(49,84,186,0.4)", "#3154BA"]}
                            style={styles.roundHeaderBtn}
                          >
                            <Ionicons name={item.icon} size={18} color="#fff" />
                          </LinearGradient>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* AVATAR + NAME */}
                  <View style={styles.headerBottomRow}>
                    <View style={styles.headerAvatarWrapper}>
                      <Image
                        source={{ uri: "https://i.pravatar.cc/150?img=68" }}
                        style={styles.headerAvatar}
                      />
                    </View>

                    <View style={styles.headerInfo}>
                      <Text style={styles.headerTitle}>{communityName}</Text>
                      <Text style={styles.headerSub}>
                        {members.toLocaleString()} Members · Community
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

                {/* 🔥 BOTTOM GRADIENT BORDER */}
                <View style={styles.bottomBorderWrapper}>
                  <LinearGradient
                    colors={["rgba(49,84,186,0.2)", "#3154BA", "rgba(49,84,186,0.2)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bottomBorder}
                  />
                </View>
              </View>


              {/* CHANNEL LIST SECTION */}
              <View style={styles.channelCard}>
                {/* TEXT CHANNELS TOP TWO */}
                <TouchableOpacity
                  style={styles.channelRow}
                  onPress={() => navigation.navigate("", { channelName: "# general" })}
                >
                  <View style={styles.channelLeft}>
                    <View style={styles.channelBorder} />
                    {/* <Ionicons name="hashtag" size={scale(18)} color="#94a3b8" style={styles.channelIcon} /> */}
                    <Image
                      source={Hashtag}
                      style={styles.channelIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.channelTitle}>general</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.channelRow}
                  onPress={() => navigation.navigate("", { channelName: "# announcement" })}
                >
                  <View style={styles.channelLeft}>
                    <View style={styles.channelBorder} />
                    <Ionicons name="megaphone-outline" size={scale(18)} color="#94a3b8" style={styles.channelIcon} />
                    <Text style={styles.channelTitle}>announcement</Text>
                  </View>
                </TouchableOpacity>

                {/* CHAT SPACE */}
                <LinearGradient
                  colors={["#3255BA", "rgba(50,85,186,0)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                >
                  <View style={styles.sectionWrapper1}>
                    <TouchableOpacity
                      style={styles.sectionHeaderRow1}
                      onPress={() => setChatOpen((p) => !p)}
                    >
                      <Text style={styles.sectionHeaderText}>Chat Space</Text>
                      <Ionicons
                        name={chatOpen ? "chevron-down" : "chevron-forward"}
                        size={scale(16)}
                        color="#e2e8f0"
                      />
                    </TouchableOpacity>
                    <View style={styles.sectionDivider} />

                    {chatOpen && (
                      // <View style={styles.innerCard}>
                      //   <TouchableOpacity
                      //     style={styles.innerChannelRow}
                      //     onPress={() =>
                      //       navigation.navigate("MediaViewer", {
                      //         channelName: "# < media, >",
                      //       })
                      //     }
                      //   >
                      //     <View style={styles.channelLeft}>
                      //       <View style={styles.innerChannelBorder} />
                      //       <Image
                      //         source={Hashtag}
                      //         style={styles.channelIcon}
                      //         resizeMode="contain"
                      //       />
                      //       <Text style={styles.innerChannelTitle}>{`< media, >`}</Text>
                      //     </View>
                      //   </TouchableOpacity>
                      // </View>
                      <View style={styles.innerCard}>
                        <TouchableOpacity
                          style={styles.innerChannelRow}
                          onPress={() =>
                            navigation.navigate("MediaViewer", {
                              channelName: "# < media, >",
                            })
                          }
                        >
                          <View style={styles.channelLeft}>
                            <View style={styles.innerChannelBorder} />

                            <Image
                              source={Hashtag}
                              style={styles.channelIcon}
                              resizeMode="contain"
                            />

                            <Text style={styles.innerChannelTitle}>{`< media, >`}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                    )}
                  </View>
                </LinearGradient>


                {/* VOICE SPACE */}
                <LinearGradient
                  colors={["#3255BA", "rgba(50,85,186,0)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                >
                  <View style={styles.sectionWrapper1}>
                    <TouchableOpacity
                      style={styles.sectionHeaderRow1}
                      onPress={() => setVoiceOpen((p) => !p)}
                    >
                      <Text style={styles.sectionHeaderText}>Voice space</Text>
                      <Ionicons
                        name={voiceOpen ? "chevron-down" : "chevron-forward"}
                        size={scale(16)}
                        color="#e2e8f0"
                      />
                    </TouchableOpacity>
                    <View style={styles.sectionDivider} />

                    {voiceOpen && (
                      <View style={styles.innerVoiceCard}>
                        <TouchableOpacity
                          style={[
                            styles.voiceMainRow,
                            activeRoom === "Lounge" && styles.voiceActiveRow,
                          ]}
                          onPress={() => {
                            setActiveRoom("Lounge");
                            navigation?.navigate?.("VoiceRoom", { roomName: "Lounge" });
                          }}
                        >
                          <View style={styles.channelLeft}>
                            <View style={styles.activeLeftBorder} />
                            <Ionicons
                              name="mic"
                              size={scale(18)}
                              color="#e2e8f0"
                              style={styles.voiceSubIcon}
                            />
                            <Text style={styles.voiceMainTitle}>Lounge</Text>
                          </View>
                        </TouchableOpacity>
                        {["Team Talk", "Chill Zone", "Game VC", "Hangout"].map((label) => {
                          const isActive = activeRoom === label;

                          return (
                            <TouchableOpacity
                              key={label}
                              style={styles.voiceSubRow}
                              onPress={() => {
                                setActiveRoom(label);
                                navigation?.navigate?.("VoiceRoom", { roomName: label });
                              }}
                            >
                              <View style={styles.channelLeft}>
                                {/* Circle indicator */}
                                <View style={styles.inactiveDot} />

                                <Ionicons
                                  name="mic-outline"
                                  size={scale(16)}
                                  color="#64748b"
                                  style={styles.voiceSubIcon}
                                />
                                <Text style={styles.voiceSubText}>{label}</Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}

                      </View>
                    )}
                  </View></LinearGradient>
              </View></View>
          </ScrollView>
        </View>
      </View>

      {/* BOTTOM TAB BAR */}
      <View style={styles.bottomBarWrapper}>
        <LinearGradient
          colors={["#1e293b", "#0f172a"]}
          style={styles.bottomBar}
        >
          <TouchableOpacity style={styles.tabItem}>
            <View style={[styles.homeIconBg, { backgroundColor: "#2563eb" }]}>
              <Ionicons name="home" size={scale(20)} color="#fff" />
            </View>
            <Text style={styles.tabLabelActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="chatbubble-outline" size={scale(24)} color="#9ca3af" />
            <Text style={styles.tabLabel}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="notifications-outline" size={scale(24)} color="#9ca3af" />
            <Text style={styles.tabLabel}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={scale(24)} color="#9ca3af" />
            <Text style={styles.tabLabel}>You</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0f172a" },
  mainRow: {
    flex: 1,
    flexDirection: "row",
    paddingTop: scale(30),
    paddingBottom: scale(70)
  },
  sidebar: { width: scale(64), alignItems: "center", paddingTop: scale(8) },
  // sideIconBig: {
  //   width: scale(40),
  //   height: scale(40),
  //   borderRadius: scale(12),
  //   backgroundColor: "#1e293b",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: scale(12)
  // },
  sideIconBig: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(12),

    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10
  },
  compassWrapper: {
    width: scale(48),
    height: scale(64),
    position: "relative",

    marginBottom: scale(16),
  },

  /* Rectangle */
  compassRect: {
    position: "absolute",
    bottom: 0,
    width: scale(48),
    height: scale(48),
    backgroundColor: "#3255BA", // primary blue
    borderRadius: scale(12),
  },

  /* Circle */
  compassCircle: {
    position: "absolute",
    top: scale(-2),               // THIS creates overlap
    left: scale(4),
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#0f172a",   // dark bg
    justifyContent: "center",
    alignItems: "center",
  },

  sideIconPlus: {
    backgroundColor: "#3255BA",
    width: scale(40),
    height: scale(40),
    borderRadius: scale(22),
  },
  sideBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 18,
    justifyContent: "center",
    alignItems: "center"
  }
  ,
  sideAvatarWrapper: {
    marginBottom: scale(14),
    alignItems: "center"
  }
  ,
  sideAvatarBorder: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center"
  }
  ,
  sideAvatar: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(14),
  },
  sideIconPlus: {
    backgroundColor: "#3255BA",
    marginBottom: scale(16),
    borderRadius: scale(10)
  },
  sideAvatarScroll: { flex: 1 },
  sideAvatarWrapper: {
    marginBottom: scale(12),
    alignItems: "center"
  },
  sideAvatarBorder: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(16),
    padding: 2.5,
    justifyContent: "center",
    alignItems: "center"
  },
  sideAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: scale(13)
  },
  sideBadge: {
    position: "absolute",
    right: -4,
    top: -4,
    backgroundColor: "#ef4444",
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0f172a"
  },
  sideBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700"
  },
  mainContentWrapper: {
    flex: 1,
    paddingLeft: scale(12),
    // paddingRight: scale(12)
  },
  scrollContent: { paddingBottom: scale(24) },
  headerCard: {
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 16,
  },

  bottomBorderWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,                    // border thickness
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",           // 🔥 THIS CLIPS THE GRADIENT
  },

  bottomBorder: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerBg: {
    height: scale(160),
    paddingHorizontal: scale(18),
    paddingTop: scale(16),
    paddingBottom: scale(16)
  },
  headerBgImage: { borderRadius: 15 },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.6)"
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  headerIconRow: {
    flexDirection: "row",
    gap: scale(10)
  },
  replyHeart:{
    display:'flex',
    flexDirection:'column',
  },
  roundHeaderBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#3154BA",

    shadowColor: "#3255BA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 18,

    elevation: 6, // Android
  },

  headerBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(36)
  },
  // headerAvatarWrapper: {
  //   width: scale(64),
  //   height: scale(64),
  //   borderRadius: scale(32),
  //   borderWidth: 3,
  //   borderColor: "#06b6d4",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: scale(12),
  //   backgroundColor: "#0f172a"
  // },
  headerAvatar: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23)
  },
  headerInfo: { flex: 1 },
  headerTitle: {
    color: "#ffffff",
    fontSize: scale(22),
    fontWeight: "700",
    letterSpacing: -0.5
  },
  headerSub: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: scale(13),
    fontWeight: "500"
  },
  channelCard: {

  },
  mainrow1: {
    backgroundColor: '#0C142A',
  },
  channelRow: {
    paddingVertical: scale(7),
    // paddingHorizontal: scale(8),
    marginBottom: scale(12),
    backgroundColor: '#3255BA4D',
    borderLeftColor: '#3255BA',
    borderLeftWidth: 3,

  },
  channelLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  channelIcon: {
    height: 60,
    width: 60,
  },
  channelBorder: {
    width: 3,
    height: scale(29),
    // backgroundColor: "#3255BA",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginRight: scale(10)
  },
  channelIcon: { marginRight: scale(10) },
  channelTitle: {
    color: "#e2e8f0",
    fontSize: scale(15),
    fontWeight: "500",
    letterSpacing: -0.1
  },
  gradientBorder: {
    borderRadius: 20,

    padding: 1,               // border thickness (1px like Figma)
    marginBottom: 12,
  },

  sectionWrapper1: {
    backgroundColor: "#0C142A", // inner background
    borderRadius: 19,           // radius - padding
    overflow: "hidden",
  },

  sectionHeaderRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(8),
    paddingHorizontal: scale(29),
    marginBottom: scale(8),

  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#3255BA",
    // marginHorizontal: scale(20),
    // marginBottom: scale(10),
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
    marginBottom: scale(8)
  },
  sectionHeaderText: {
    color: "#e2e8f0",
    fontSize: scale(14),
    fontWeight: "600",
    letterSpacing: 0.3
  },
  innerCard: {
    backgroundColor: "#3255BA4D",
    // paddingHorizontal: scale(8),
    marginVertical: 11,


  },
  innerChannelRow: {
    borderLeftColor: '#3255BA',
    borderLeftWidth: 3,

    backgroundColor: "rgba(50,85,186,0.25)", // soft blue
    paddingVertical: scale(7),

    paddingHorizontal: scale(12),
  },



  innerChannelTitle: {
    color: "#cbd5e1",
    fontSize: scale(14),
    fontWeight: "500"
  },
  innerVoiceCard: {
    // borderRadius: scale(16),
    // paddingHorizontal: scale(8),
    paddingVertical: scale(6),


  },
  voiceMainRow: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(8),
    marginBottom: scale(4)
  },
  voiceMainTitle: {
    color: "#e2e8f0",
    fontSize: scale(15),
    fontWeight: "500"
  },
  voiceSubRow: {
    paddingLeft: scale(8),
    paddingRight: scale(8),
    paddingVertical: scale(8)
  },
  voiceActiveRow: {
    backgroundColor: "#3255BA4D",
    borderLeftWidth: 3,
    borderLeftColor: "#3255BA",
    // borderRadius: scale(12),
  },
  voiceMainRow: {
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    marginBottom: scale(6),
  },
  voiceSubRow: {
    paddingVertical: scale(10),
    // paddingHorizontal: scale(12),
    overflow: "hidden", // 👈 IMPORTANT

  },
  activeLeftBorder: {
    // width: 3,
    // height: scale(22),
    // backgroundColor: "#3255BA",
    // borderRadius: 2,
    // marginRight: scale(10),
  },
  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: "#3255BA",

    marginLeft: -7,        // 👈 hides half outside
    marginRight: scale(12),
  },


  voiceSubIcon: { marginRight: scale(10) },
  voiceSubText: {
    color: "#94a3b8",
    fontSize: scale(14),
    fontWeight: "400"
  },
  bottomBarWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  bottomBar: {
    height: scale(70),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(28),
    paddingTop: scale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#1e293b"
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(4)
  },
  homeIconBg: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4
  },
  tabLabelActive: {
    color: "#ffffff",
    fontSize: scale(11),
    fontWeight: "700"
  },
  tabLabel: {
    color: "#64748b",
    fontSize: scale(11),
    fontWeight: "500",
    marginTop: 4
  },
});