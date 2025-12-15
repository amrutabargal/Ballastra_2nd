import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function NexusCommunityScreen({ navigation }) {
  const activeTab = "community"; // fixed for this screen

  const handleBack = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const handleTabPress = (tab) => {
    if (tab === "setting") {
      navigation.navigate("NexusSettings"); // 🔁 Settings screen name
    } else if (tab === "management") {
      navigation.navigate("V31"); // 🔁 Management screen
    }
    // community = current screen, do nothing
  };

  const handleRowPress = (label) => {
    // TODO: replace with real navigation later
    console.log("Community row pressed:", label);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fake status bar row */}
      <View style={styles.fakeStatusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.fakeStatusIcons}>
          <Ionicons name="cellular" size={16} color="#ffffff" style={styles.fakeIcon} />
          <Ionicons name="wifi" size={16} color="#ffffff" style={styles.fakeIcon} />
          <Ionicons name="battery-full" size={20} color="#ffffff" style={styles.fakeIcon} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nexus Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Banner */}
        <View style={styles.banner} />

        {/* Avatar + name + stats */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>🤠</Text>
            </View>
            <TouchableOpacity style={styles.avatarEdit}>
              <Ionicons name="pencil" size={14} color="#050B18" />
            </TouchableOpacity>
          </View>

          <Text style={styles.spaceTitle}>Shusshi Clean</Text>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <Ionicons name="people-outline" size={16} color="#9FB4FF" />
              <Text style={styles.statsText}>3,568 Total Members</Text>
            </View>
            <View style={styles.dotDivider} />
            <View style={styles.statsItem}>
              <View style={styles.activeDot} />
              <Text style={styles.statsText}>568 Active today</Text>
            </View>
          </View>
        </View>

        {/* Main card with tabs and community list */}
        <View style={styles.mainCard}>
          {/* Tabs */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "setting" && styles.tabItemActive,
              ]}
              onPress={() => handleTabPress("setting")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "setting" && styles.tabTextActive,
                ]}
              >
                Setting
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "community" && styles.tabItemActive,
              ]}
              activeOpacity={1}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "community" && styles.tabTextActive,
                ]}
              >
                Community
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === "management" && styles.tabItemActive,
              ]}
              onPress={() => handleTabPress("management")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "management" && styles.tabTextActive,
                ]}
              >
                Management
              </Text>
            </TouchableOpacity>
          </View>

          {/* COMMUNITY LIST (no section headers in this screen) */}
          <View style={styles.communityList}>
            <CommunityRow
              icon="megaphone-outline"
              label="Announcements"
              onPress={() => handleRowPress("Announcements")}
            />
            <CommunityRow
              icon="compass-outline"
              label="Space Discovery"
              onPress={() => handleRowPress("Space Discovery")}
            />
            <CommunityRow
              icon="pricetags-outline"
              label="Community Tags"
              onPress={() => handleRowPress("Community Tags")}
            />
            <CommunityRow
              icon="mail-unread-outline"
              label="Welcome Message"
              onPress={() => handleRowPress("Welcome Message")}
            />
            <CommunityRow
              icon="log-in-outline"
              label="Auto-Ident on Join"
              onPress={() => handleRowPress("Auto-Ident on Join")}
            />
            <CommunityRow
              icon="book-outline"
              label="Rules & Guidelines"
              onPress={() => handleRowPress("Rules & Guidelines")}
            />
            <CommunityRow
              icon="bar-chart-outline"
              label="Community Insights"
              onPress={() => handleRowPress("Community Insights")}
              showBottomDivider={false}
            />
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

function CommunityRow({ icon, label, onPress, showBottomDivider = true }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.rowLeft}>
          <Ionicons name={icon} size={18} color="#9FB4FF" style={{ marginRight: 10 }} />
          <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9FB4FF" />
      </TouchableOpacity>
      {showBottomDivider && (
        <View style={styles.rowDivider} />
      )}
    </View>
  );
}

const CARD_RADIUS = 26;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
  },

  fakeStatusBar: {
    marginTop: 8 + (Platform.OS === "ios" ? 12 : StatusBar.currentHeight || 0),
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  fakeStatusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  fakeIcon: {
    marginLeft: 6,
  },

  scrollContent: {
    paddingBottom: 32,
  },

  headerRow: {
    marginTop: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },

  banner: {
    marginTop: 16,
    marginHorizontal: 16,
    height: height * 0.2,
    borderRadius: 24,
    backgroundColor: "#08152B",
    overflow: "hidden",
  },

  avatarSection: {
    marginTop: -40,
    alignItems: "center",
    paddingBottom: 16,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 8,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#7FE8C8",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: {
    fontSize: 48,
  },
  avatarEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  spaceTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    marginLeft: 4,
  },
  dotDivider: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 10,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3DE76E",
  },

  mainCard: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: CARD_RADIUS,
    backgroundColor: "#060F24",
    borderWidth: 1,
    borderColor: "#1F3057",
    paddingBottom: 12,
  },

  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabItemActive: {
    backgroundColor: "#08152B",
  },
  tabText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#ffffff",
  },

  communityList: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
});
