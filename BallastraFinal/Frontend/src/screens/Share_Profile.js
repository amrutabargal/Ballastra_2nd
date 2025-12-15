
import React, { useState } from "react";
import Svg, { Path, G } from "react-native-svg";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

const CONTACTS = [
  { id: "1", name: "! 7 SUII _Notashish15", subtitle: "", color: "#f97373" },
  { id: "2", name: "Lofi#8098", subtitle: "", color: "#6ee7b7" },
  {
    id: "3",
    name: "Max gamer58588, Faysal_gaming143",
    subtitle: "Devil Gaming",
    color: "#a855f7",
  },
  { id: "4", name: "Gaming Piro Yug", subtitle: "", color: "#facc15" },
  { id: "5", name: "SHERNI", subtitle: "", color: "#fb7185" },
];

export default function ShareNexusScreen({ navigation }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selectedIds.includes(id);

  // 🔥 If this screen was reached from the Build flow, create the Nexus on server
  const handleClose = async () => {
    try {
      const name = route?.params?.name;
      const icon = route?.params?.icon;
      const image = route?.params?.image;

      if (name) {
        const token = await AsyncStorage.getItem('token');
        const body = {
          name,
          type: 'Community',
          icon: icon || null,
          description: '',
          is_public: true,
        };

        try {
          await fetch(`${BASE_URL}/nexus`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(body),
          });
        } catch (e) {
          // ignore network error, continue navigation
          console.log('create nexus error', e);
        }
      }

      if (navigation && navigation.navigate) {
        navigation.navigate('CommunityDetails');
      }
    } catch (e) {
      if (navigation && navigation.navigate) navigation.navigate('CommunityDetails');
    }
  };

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.screen}>
        {/* ⭐ HEADER ROW (close + title) */}
        <View style={styles.topCard}>
          <View style={styles.topHeaderRow}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.shareTitle}>Invite people to your nexus</Text>
          </View>

          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatarInner} />
            </View>
          </View>

          <Text style={styles.avatarName}>Shusshi Clean</Text>

          {/* Share icons */}
          <View style={styles.shareRow}>
            {/* WA SVG ICON */}
            <View style={[styles.shareIcon, { backgroundColor: "#01B41F" }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M17.5069 14.3072L17.4979 14.3822C15.2989 13.2862 15.0689 13.1402 14.7849 13.5662C14.5879 13.8612 14.0139 14.5302 13.8409 14.7282C13.6659 14.9232 13.4919 14.9382 13.1949 14.8032C12.8949 14.6532 11.9319 14.3382 10.7919 13.3182C9.90389 12.5232 9.30789 11.5482 9.13189 11.2482C8.83889 10.7422 9.45189 10.6702 10.0099 9.61417C10.1099 9.40417 10.0589 9.23917 9.98489 9.09017C9.90989 8.94017 9.31289 7.47017 9.06289 6.88417C8.82289 6.30017 8.57589 6.37417 8.39089 6.37417C7.81489 6.32417 7.39389 6.33217 7.02289 6.71817C5.40889 8.49217 5.81589 10.3222 7.19689 12.2682C9.91089 15.8202 11.3569 16.4742 14.0009 17.3822C14.7149 17.6092 15.3659 17.5772 15.8809 17.5032C16.4549 17.4122 17.6479 16.7822 17.8969 16.0772C18.1519 15.3722 18.1519 14.7872 18.0769 14.6522C18.0029 14.5172 17.8069 14.4422 17.5069 14.3072Z"
                  fill="white"
                />
                <Path
                  d="M20.52 3.44919C12.831 -3.98381 0.106 1.40719 0.101 11.8932C0.101 13.9892 0.65 16.0332 1.696 17.8382L0 24.0002L6.335 22.3482C14.24 26.6182 23.996 20.9482 24 11.8992C24 8.72319 22.76 5.73419 20.505 3.48819L20.52 3.44919ZM22.002 11.8662C21.996 19.4992 13.617 24.2662 6.99 20.3702L6.63 20.1562L2.88 21.1312L3.885 17.4862L3.646 17.1112C-0.478 10.5462 4.26 1.96619 12.072 1.96619C13.3766 1.96291 14.6688 2.21841 15.874 2.71792C17.0791 3.21742 18.1733 3.951 19.093 4.87619C20.0178 5.78977 20.7513 6.8784 21.2507 8.07853C21.7502 9.27867 22.0056 10.5663 22.002 11.8662Z"
                  fill="white"
                />
              </Svg>
            </View>

            {/* Link Icon */}
            <View style={[styles.shareIcon, { backgroundColor: "#020617" }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M14 11C13.5705 10.4259 13.0226 9.9508 12.3934 9.60704C11.7642 9.26328 11.0684 9.05886 10.3533 9.00765C9.63816 8.95643 8.92037 9.05961 8.24861 9.3102C7.57685 9.56079 6.96684 9.95291 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.542 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9447 9.58694 21.4408 10.53 20.53L12.24 18.82"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>

            <View style={[styles.shareIcon, { backgroundColor: "#01B41F" }]}>
              <Svg width={24} height={22} viewBox="0 0 24 22" fill="none">
                <Path d="M9.65099 20.4178C10.4158 20.5308 11.1806 20.6062 11.9818 20.6062C18.61 20.6062 24 15.9726 24 10.2842C24 4.59589 18.6464 0 12.0182 0C5.38998 0 0 4.63356 0 10.3219C0 14.0514 2.29439 17.2911 5.71775 19.0993V19.476C5.71775 20.5685 3.96965 22 4.07891 22C5.82701 22 7.06525 20.8699 7.90288 20.6062C8.59484 20.4178 8.99545 20.3801 9.65099 20.4178Z" fill="white"/>
              </Svg>
            </View>

            <View style={[styles.shareIcon, { backgroundColor: "#ffffff" }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <G clipPath="url(#clip0_770_2698)">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0086 0.845651C1.78363 0.692771 -2.91917 12.987 4.35715 19.6703C4.44733 19.7505 4.52043 19.8481 4.5721 19.9572C4.62376 20.0663 4.65293 20.1847 4.65787 20.3053L4.71859 22.2894C4.73875 22.9223 5.39203 23.3332 5.97091 23.0795L8.18395 22.1032C8.37113 22.0203 8.58116 22.0044 8.77867 22.0583C15.8236 24.0741 23.2975 19.1308 23.1633 11.6663C23.1635 5.44909 18.293 0.845651 12.0086 0.845651ZM18.8469 9.11101L15.5013 14.4184C14.9697 15.2617 13.8285 15.4725 13.031 14.8744L10.3703 12.8783C10.2515 12.7894 10.107 12.7415 9.95859 12.742C9.81018 12.7424 9.66594 12.7911 9.54763 12.8807L5.95411 15.6078C5.47531 15.9721 4.84723 15.3969 5.17027 14.8883L8.51635 9.58069C9.04795 8.73733 10.1891 8.52661 10.9867 9.12469L13.6473 11.1208C13.7661 11.2097 13.9107 11.2575 14.0591 11.2571C14.2075 11.2567 14.3517 11.208 14.47 11.1184L18.0633 8.39125C18.5423 8.02717 19.1702 8.60221 18.8469 9.11101Z"
                    fill="#1F6BF6"
                  />
                </G>
              </Svg>
            </View>

            {/* Facebook */}
            <View style={[styles.shareIcon, { backgroundColor: "#1877F2" }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M24 12C24 5.37188 18.6281 0 12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C12.0703 24 12.1406 24 12.2109 23.9953V14.6578H9.63281V11.6531H12.2109V9.44062C12.2109 6.87656 13.7766 5.47969 16.0641 5.47969C17.1609 5.47969 18.1031 5.55938 18.375 5.59688V8.27813H16.8C15.5578 8.27813 15.3141 8.86875 15.3141 9.73594V11.6484H18.2906L17.9016 14.6531H15.3141V23.5359C20.3297 22.0969 24 17.4797 24 12Z"
                  fill="white"
                />
              </Svg>
            </View>

            {/* Email */}
            <View style={[styles.shareIcon, { backgroundColor: "#020617" }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M20 8.40039L12.8072 12.982C12.5631 13.1238 12.2859 13.1984 12.0036 13.1984C11.7213 13.1984 11.4441 13.1238 11.2 12.982L4 8.40039"
                  stroke="white"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M18.4 6H5.6C4.71634 6 4 6.71634 4 7.6V17.2C4 18.0837 4.71634 18.8 5.6 18.8H18.4C19.2837 18.8 20 18.0837 20 17.2V7.6C20 6.71634 19.2837 6 18.4 6Z"
                  stroke="white"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              placeholderTextColor="#64748b"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* List Card */}
        <View style={styles.listCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredContacts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.contactRow}
                activeOpacity={0.8}
                onPress={() => toggleSelect(item.id)}
              >
                <View
                  style={[styles.contactAvatar, { backgroundColor: item.color }]}
                >
                  <Text style={styles.contactAvatarText}>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.contactTextWrapper}>
                  <Text style={styles.contactName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  {item.subtitle ? (
                    <Text style={styles.contactSubtitle} numberOfLines={1}>
                      {item.subtitle}
                    </Text>
                  ) : null}
                </View>

                <View
                  style={[
                    styles.sendPill,
                    isSelected(item.id) && styles.sendPillSelected,
                  ]}
                >
                  {isSelected(item.id) ? (
                    <>
                      <Text style={styles.sendPillTextSelected}>Selected</Text>
                      <Text style={styles.sendPillIcon}>✓</Text>
                    </>
                  ) : (
                    <Text style={styles.sendPillText}>Send</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>

        {/* Send Button */}
        {selectedIds.length > 0 && (
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>
              Send ({selectedIds.length})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

/* ====================== STYLES ====================== */

const BG = "#0C142A";
const CARD = "#0C142A";
const BORDER = "#1f2937";

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  screen: { flex: 1, backgroundColor: BG },

  topCard: {
    marginHorizontal: 16,
    borderRadius: 28,
    backgroundColor: CARD,
    alignItems: "center",
  },

  topHeaderRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 12,
    marginTop: 8,
  },

  closeButton: {
    position: "absolute",
    left: 18,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: { color: "#e5e7eb", fontSize: 18 },

  shareTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },

  avatarWrapper: { marginTop: 4, marginBottom: 8 },
  avatarOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0f172a",
  },

  avatarName: { color: "#e5e7eb", fontSize: 15, marginBottom: 18 },

  shareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    marginBottom: 16,
  },

  shareIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  shareIconText: { color: "#e5e7eb", fontSize: 14, fontWeight: "600" },

  searchContainer: { width: "88%", marginTop: 6, marginBottom: 10 },

  searchInput: {
    height: 40,
    borderRadius: 999,
    paddingHorizontal: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: BORDER,
    color: "#e5e7eb",
    fontSize: 13,
  },

  listCard: {
    flex: 1,
    marginTop: 18,
    marginHorizontal: 16,
    borderRadius: 28,
    backgroundColor: CARD,
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  contactAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  contactAvatarText: {
    color: "#0f172a",
    fontWeight: "700",
  },

  contactTextWrapper: { flex: 1, paddingRight: 8 },

  contactName: { color: "#e5e7eb", fontSize: 14 },

  contactSubtitle: { color: "#9ca3af", fontSize: 11, marginTop: 2 },

  sendPill: {
    minWidth: 64,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  sendPillSelected: {
    backgroundColor: "#0f172a",
    borderColor: "#22c55e",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sendPillText: { color: "#94a3b8", fontSize: 11 },

  sendPillTextSelected: { color: "#bbf7d0", fontSize: 11, marginRight: 4 },

  sendPillIcon: { color: "#4ade80", fontSize: 13 },

  sendButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: "center",
  },

  sendButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
});
