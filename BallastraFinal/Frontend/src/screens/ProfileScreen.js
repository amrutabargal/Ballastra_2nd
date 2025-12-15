
// src/screens/ProfileScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

/* ---------- RESPONSIVE HELPERS ---------- */
const { width, height } = Dimensions.get("window");

// iPhone 11 base sizes
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isSmall = width < 360;

/* ---------- DUMMY DATA ---------- */

const MEMBERS = Array.from({ length: 10 }).map((_, i) => ({
  id: i.toString(),
  name: "! 7SUll_Notashish15",
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

const MEDIA_ITEMS = Array.from({ length: 15 }).map((_, i) => ({
  id: `media-${i}`,
  url: `https://picsum.photos/600/800?random=${i + 1}`,
}));

const PIN_ITEMS = [
  {
    id: "1",
    author: "Chala",
    avatar: "https://i.pravatar.cc/150?img=12",
    timeAgo: "1mins ago",
    message: "Hi @everyone",
    pinned: true,
    hasImage: false,
  },
  {
    id: "2",
    author: "Chala",
    avatar: "https://i.pravatar.cc/150?img=13",
    timeAgo: "1mins ago",
    message: "Hi @everyone",
    pinned: true,
    hasImage: false,
  },
  {
    id: "3",
    author: "Chala",
    avatar: "https://i.pravatar.cc/150?img=14",
    timeAgo: "1mins ago",
    message: "Hi @everyone",
    pinned: true,
    hasImage: false,
  },
  {
    id: "4",
    author: "NicholasChan",
    avatar: "https://i.pravatar.cc/150?img=15",
    timeAgo: "2h ago",
    message:
      "Hi @everyone Please Check It Out My Nexus Member List sushii @sushishlive corrected my mistake there from last week.",
    pinned: true,
    hasImage: true,
    imageUrl: "https://picsum.photos/600/400?random=99",
  },
];

const LINK_ITEMS = [
  {
    id: "l1",
    author: "NicholasChan",
    avatar: "https://i.pravatar.cc/150?img=20",
    url: "https://tenor.com/en-IN/view/allgamingz-vedy-gud",
    previewImage: "https://picsum.photos/800/400?random=31",
    channelTag: "#  < media, >",
  },
  {
    id: "l2",
    author: "NicholasChan",
    avatar: "https://i.pravatar.cc/150?img=21",
    url: "https://example.com/some-awesome-link",
    previewImage: "https://picsum.photos/800/400?random=32",
    channelTag: "#  < media, >",
  },
];

const FILE_ITEMS = [
  {
    id: "f1",
    author: "NicholasChan",
    avatar: "https://i.pravatar.cc/150?img=22",
    filename: "Game_Assets.zip",
    size: "12.3 MB",
    url: "https://example.com/files/game_assets.zip",
    previewImage: "https://picsum.photos/800/400?random=41",
  },
  {
    id: "f2",
    author: "NicholasChan",
    avatar: "https://i.pravatar.cc/150?img=23",
    filename: "Rules_and_Guide.pdf",
    size: "1.1 MB",
    url: "https://example.com/files/rules_guide.pdf",
    previewImage: "https://picsum.photos/800/400?random=42",
  },
];

const TABS = ["Members", "Media", "Pins", "Links", "Files"];

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("Members");

  // current profile avatar (local + remote)
  const [profileAvatar, setProfileAvatar] = useState(
    "https://i.pravatar.cc/200?img=8"
  );

  /* ---------- HELPERS ---------- */

  const openUrl = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Cannot open", "This URL can't be opened on device.");
      }
    } catch (err) {
      Alert.alert("Error", "Unable to open link.");
    }
  };

  const handleChangeAvatar = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please allow photo library access to change your profile picture."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      setProfileAvatar(uri);

      // TODO: इथे backend वर upload करा
      // await uploadProfileAvatar(uri);
    } catch (e) {
      console.log("Avatar change error:", e);
      Alert.alert("Error", "Couldn't change profile picture.");
    }
  };

  /* ---------- RENDERERS ---------- */

  const renderMember = ({ item }) => (
    <TouchableOpacity style={styles.memberRow} activeOpacity={0.85}>
      <View style={styles.memberLeft}>
        <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
        <Text style={styles.memberName} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={moderateScale(16)} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const renderMediaItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.mediaCard}
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("MediaViewer", {
          mediaList: MEDIA_ITEMS,
          initialIndex: index,
        })
      }
    >
      <Ionicons name="image-outline" size={moderateScale(24)} color="#4B5563" />
    </TouchableOpacity>
  );

  const renderPinItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pinRow}
      activeOpacity={0.85}
      onPress={() => Alert.alert("Pinned", item.message)}
    >
      <View style={styles.pinLeft}>
        <Image source={{ uri: item.avatar }} style={styles.pinAvatar} />
        <View style={styles.pinContent}>
          <View style={styles.pinHeaderRow}>
            <Text style={styles.pinAuthor}>{item.author}</Text>
            <Text style={styles.pinDot}> • </Text>
            <Text style={styles.pinTime}>{item.timeAgo}</Text>
            {item.pinned && (
              <View style={styles.pinBadge}>
                <Ionicons
                  name="pin-outline"
                  size={moderateScale(10)}
                  color="#FACC15"
                  style={{ marginRight: moderateScale(3) }}
                />
                <Text style={styles.pinBadgeText}>Pinned</Text>
              </View>
            )}
          </View>

          <Text style={styles.pinMessage} numberOfLines={2}>
            {item.message}
          </Text>

          {item.hasImage && (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.pinImage}
              resizeMode="cover"
            />
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => Alert.alert("More", "Options coming soon")}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Feather name="more-horizontal" size={moderateScale(16)} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderLinkItem = ({ item }) => (
    <View style={styles.linkCard}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => openUrl(item.url)}>
        <Image
          source={{ uri: item.previewImage }}
          style={styles.linkPreview}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.linkContent}>
        <View style={styles.linkHeaderRow}>
          <View style={styles.linkHeaderLeft}>
            <Image source={{ uri: item.avatar }} style={styles.linkAvatar} />
            <View>
              <Text style={styles.linkAuthor}>{item.author}</Text>
              <Text style={styles.linkChannelTag}>{item.channelTag}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => openUrl(item.url)}>
            <Ionicons
              name="open-outline"
              size={moderateScale(18)}
              color="#E5E7EB"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.linkUrlRow}
          onPress={() => openUrl(item.url)}
          activeOpacity={0.8}
        >
          <Ionicons name="link-outline" size={moderateScale(13)} color="#60A5FA" />
          <Text style={styles.linkUrlText} numberOfLines={1}>
            {item.url}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFileItem = ({ item }) => (
    <View style={styles.linkCard}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => openUrl(item.url)}>
        <Image
          source={{ uri: item.previewImage }}
          style={styles.linkPreview}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.linkContent}>
        <View style={styles.linkHeaderRow}>
          <View style={styles.linkHeaderLeft}>
            <Image source={{ uri: item.avatar }} style={styles.linkAvatar} />
            <View>
              <Text style={styles.linkAuthor}>{item.author}</Text>
              <Text style={styles.linkChannelTag}>{item.filename}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => openUrl(item.url)}>
            <Ionicons
              name="download-outline"
              size={moderateScale(18)}
              color="#E5E7EB"
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.linkUrlRow, { marginTop: verticalScale(4) }]}>
          <Ionicons
            name="document-text-outline"
            size={moderateScale(13)}
            color="#60A5FA"
          />
          <Text style={styles.linkUrlText}>{item.size}</Text>
        </View>
      </View>
    </View>
  );

  /* ---------- UI ---------- */

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.root}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="chevron-back"
              size={moderateScale(22)}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Shusshi Clan</Text>

          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Feather name="more-horizontal" size={moderateScale(20)} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(24) }}
        >
          {/* PROFILE TOP */}
          <View style={styles.profileTop}>
            {/* Tappable avatar */}
            <TouchableOpacity
              style={styles.avatarWrapper}
              activeOpacity={0.8}
              onPress={handleChangeAvatar}
            >
              <View style={styles.avatarBorder}>
                <Image
                  source={{ uri: profileAvatar }}
                  style={styles.avatar}
                />
              </View>

              <View style={styles.imageIconWrap}>
                <Ionicons
                  name="camera-outline"
                  size={moderateScale(13)}
                  color="#020617"
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.profileName}>Shusshi Clan</Text>

            <Text style={styles.bioText}>
              I don’t just play games I study them, master them, and break the
              limits everyone else fears. Skilled aim, smart plays, and a
              mindset built for clutch moments.
            </Text>

            <Text style={styles.handleText}>@shusshiclan</Text>
          </View>

          {/* STATS CARD */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>223.5k</Text>
              <Text style={styles.statLabel}>Orbits</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>689</Text>
              <Text style={styles.statLabel}>Orbitors</Text>
            </View>
          </View>

          {/* TABS */}
          <View style={styles.tabsRow}>
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={styles.tabItem}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isActive && styles.tabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                  {isActive && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* TAB CONTENTS */}
          {activeTab === "Members" && (
            <View style={styles.membersListWrap}>
              <FlatList
                data={MEMBERS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                renderItem={renderMember}
              />
            </View>
          )}

          {activeTab === "Media" && (
            <View style={styles.mediaGridWrap}>
              <FlatList
                data={MEDIA_ITEMS}
                keyExtractor={(i) => i.id}
                numColumns={3}
                scrollEnabled={false}
                renderItem={renderMediaItem}
                columnWrapperStyle={styles.mediaRow}
              />
            </View>
          )}

          {activeTab === "Pins" && (
            <View style={styles.pinsListWrap}>
              <FlatList
                data={PIN_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                renderItem={renderPinItem}
              />
            </View>
          )}

          {activeTab === "Links" && (
            <View style={styles.linksListWrap}>
              <FlatList
                data={LINK_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                renderItem={renderLinkItem}
              />
            </View>
          )}

          {activeTab === "Files" && (
            <View style={styles.linksListWrap}>
              <FlatList
                data={FILE_ITEMS}
                keyExtractor={(i) => i.id}
                scrollEnabled={false}
                renderItem={renderFileItem}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */

const BG = "#020617";
const CARD = "#050B24";
const CARD_DARK = "#020517";

const MEDIA_CARD_SIZE =
  (width - scale(18) * 2 - scale(12) * 2) / 3; // 3-column grid

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(6),
    paddingBottom: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  profileTop: {
    alignItems: "center",
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  avatarWrapper: {
    marginBottom: verticalScale(6),
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBorder: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: (width * 0.22) / 2,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: scale(3),
    borderColor: "#16A34A",
  },
  avatar: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: (width * 0.18) / 2,
  },
  imageIconWrap: {
    position: "absolute",
    bottom: verticalScale(4),
    right: -scale(10),
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  profileName: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "700",
    marginTop: verticalScale(4),
  },
  bioText: {
    marginTop: verticalScale(8),
    color: "#CBD5F5",
    fontSize: moderateScale(isSmall ? 11 : 12),
    lineHeight: moderateScale(isSmall ? 16 : 18),
    textAlign: "center",
    maxWidth: width * 0.8,
  },
  handleText: {
    marginTop: verticalScale(6),
    color: "#ffffff",
    fontSize: moderateScale(11),
    fontWeight: "600",
  },

  statsCard: {
    marginHorizontal: scale(18),
marginTop: verticalScale(10),
borderRadius: moderateScale(20),
backgroundColor: "#0C142A",
borderColor: "#3255BA",
borderWidth: 1,
flexDirection: "row",
paddingVertical: verticalScale(12),

// ⭐ Shadow (iOS + Android)
shadowColor: "#3255BA",
shadowOffset: { width: 0, height: 6 },
shadowOpacity: 0.35,
shadowRadius: 10,
elevation: 12,

  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: moderateScale(17),
    fontWeight: "700",

  },
  statLabel: {
    color: "#9CA3AF",
    fontSize: moderateScale(10),
    marginTop: verticalScale(3),
  },
  statDivider: {
    width: 1,
    backgroundColor: "#111827",
    opacity: 0.8,
  },

  tabsRow: {
    marginTop: verticalScale(14),
    marginHorizontal: scale(18),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    color: "#9CA3AF",
    fontSize: moderateScale(11),
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#ffffff",
  },
  tabIndicator: {
    marginTop: verticalScale(4),
    width: scale(28),
    height: verticalScale(3),
    borderRadius: 999,
    backgroundColor: "#3B82F6",
  },

  membersListWrap: {
    marginTop: verticalScale(12),
    marginHorizontal: scale(18),
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0C142A",
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: "#3255BA",
  },
  memberLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  memberAvatar: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    marginRight: scale(10),
  },
  memberName: {
    color: "#ffffff",
    fontSize: moderateScale(12),
    fontWeight: "500",
    maxWidth: width * 0.55,
  },

  mediaGridWrap: {
    marginTop: verticalScale(16),
    marginHorizontal: scale(18),
    marginBottom: verticalScale(8),
  },
  mediaRow: {
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  mediaCard: {
    width: MEDIA_CARD_SIZE,
    aspectRatio: 1,
    borderRadius: moderateScale(18),
    backgroundColor: CARD_DARK,
    borderWidth: 1,
    borderColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  pinsListWrap: {
    marginTop: verticalScale(12),
    marginHorizontal: scale(18),
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(6),
  },
  pinLeft: {
    flexDirection: "row",
    flex: 1,
  },
  pinAvatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    marginRight: scale(10),
  },
  pinContent: {
    flex: 1,
  },
  pinHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(2),
    flexWrap: "wrap",
  },
  pinAuthor: {
    color: "#ffffff",
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
  pinDot: {
    color: "#9CA3AF",
    fontSize: moderateScale(10),
  },
  pinTime: {
    color: "#9CA3AF",
    fontSize: moderateScale(10),
  },
  pinBadge: {
    marginLeft: scale(6),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FACC15",
    backgroundColor: "rgba(250, 204, 21, 0.07)",
  },
  pinBadgeText: {
    color: "#FACC15",
    fontSize: moderateScale(9),
    fontWeight: "500",
  },
  pinMessage: {
    color: "#E5E7EB",
    fontSize: moderateScale(11),
    lineHeight: moderateScale(16),
    marginBottom: verticalScale(4),
  },
  pinImage: {
    width: "100%",
    borderRadius: moderateScale(16),
    height: verticalScale(150),
    marginTop: verticalScale(2),
    backgroundColor: "#020617",
  },

  linksListWrap: {
    marginTop: verticalScale(12),
    marginHorizontal: scale(18),
  },
  linkCard: {
    backgroundColor: CARD_DARK,
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(10),
    borderWidth: 1,
    borderColor: "#111827",
    overflow: "hidden",
  },
  linkPreview: {
    width: "100%",
    height: verticalScale(130),
    backgroundColor: "#020617",
  },
  linkContent: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
  },
  linkHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  linkAvatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    marginRight: scale(8),
  },
  linkAuthor: {
    color: "#ffffff",
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
  linkChannelTag: {
    color: "#9CA3AF",
    fontSize: moderateScale(10),
    marginTop: verticalScale(1),
  },
  linkUrlRow: {
    marginTop: verticalScale(6),
    flexDirection: "row",
    alignItems: "center",
  },
  linkUrlText: {
    marginLeft: scale(6),
    color: "#60A5FA",
    fontSize: moderateScale(10),
    flex: 1,
  },
});
