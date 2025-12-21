
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const MEMBERS = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: `! 7SUII_Notashish15 #${i + 1}`,
  avatar:
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
}));

export default function V25({ navigation }) {
  const [search, setSearch] = useState("");
  const [sheetVisible, setSheetVisible] = useState(false);
  const [newMembers, setNewMembers] = useState(true);
  const [oldMembers, setOldMembers] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  function openSheet() {
    setSheetVisible(true);
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(backdropAnim, { toValue: 1, duration: 240, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    });
  }

  function closeSheet() {
    Animated.parallel([
      Animated.timing(backdropAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: height, duration: 260, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
    ]).start(() => setSheetVisible(false));
  }

  const toggleNew = () => {
    setNewMembers(v => !v);
    if (oldMembers && newMembers) setOldMembers(false);
  };
  const toggleOld = () => {
    setOldMembers(v => !v);
    if (newMembers && oldMembers) setNewMembers(false);
  };

  const filteredMembers = MEMBERS.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberLeft}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        </View>
        <Text style={styles.memberName} numberOfLines={1}>{item.name}</Text>
      </View>

      {/* NOTE: navigate to 'EditMember' (matches name in RootNavigator) */}
      <TouchableOpacity
        style={styles.arrowBtn}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("EditMember", { member: item })}
      >
        <Ionicons name="chevron-forward" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Members</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#6477B9" style={{ marginRight: 6 }} />
          <TextInput value={search} onChangeText={setSearch} placeholder="Search Members" placeholderTextColor="rgba(255,255,255,0.45)" style={styles.searchInput} />
        </View>

        <TouchableOpacity activeOpacity={0.8} style={{ marginLeft: 10 }} onPress={openSheet}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={filteredMembers} keyExtractor={item => item.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false} />

      {sheetVisible && (
        <>
          <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]} />
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={closeSheet} />
          <Animated.View style={[styles.sheetWrap, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.sheetInner}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Filters</Text>

              <TouchableOpacity style={styles.sheetRow} activeOpacity={0.8} onPress={toggleNew}>
                <View style={styles.sheetLeft}>
                  <View style={styles.sheetIconBg}><Ionicons name="person-add" size={18} color="#DCE6FF" /></View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.sheetRowTitle}>New Members</Text>
                    <Text style={styles.sheetSub}>Recently added members</Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={toggleNew}>
                  <View style={[styles.switchTrack, newMembers ? styles.switchOn : null]}>
                    <View style={[styles.switchThumb, newMembers ? styles.switchThumbOn : null]} />
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.sheetRow, { marginTop: 10 }]} activeOpacity={0.8} onPress={toggleOld}>
                <View style={styles.sheetLeft}>
                  <View style={styles.sheetIconBg}><Ionicons name="time" size={18} color="#DCE6FF" /></View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.sheetRowTitle}>Old Members</Text>
                    <Text style={styles.sheetSub}>Members registered earlier</Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={toggleOld}>
                  <View style={[styles.radioOuter, oldMembers ? styles.radioActive : null]}>{oldMembers && <View style={styles.radioInner} />}</View>
                </TouchableOpacity>
              </TouchableOpacity>

              <View style={{ marginTop: 16 }}>
                <TouchableOpacity style={styles.applyBtn} activeOpacity={0.85} onPress={closeSheet}>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}

const AVATAR = 42;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020821" },
  fakeStatusBar: { marginTop: Platform.OS === "android" ? 12 : 0, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 40 },
  timeText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  fakeStatusIcons: { flexDirection: "row", alignItems: "center" },
  headerRow: { marginTop: 6, 
    paddingHorizontal: 30, 
    flexDirection: "row", 
    justifyContent: "space-between",
     alignItems: "center",
     marginBottom:10,
     },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  searchRow: { marginTop: 16, paddingHorizontal: 20, flexDirection: "row", alignItems: "center" },
  searchBox: { flex: 1, height: 40, backgroundColor: "#071739", borderRadius: 20, borderWidth: 1, borderColor: "#123060", flexDirection: "row", alignItems: "center", paddingHorizontal: 14, marginRight: 12 },
  searchInput: { flex: 1, color: "#fff", fontSize: 13 },
  filterText: { color: "#7F9BFF", fontSize: 13, fontWeight: "500" },
  memberCard: { marginHorizontal: 18, marginTop: 14, backgroundColor: "#0B2C7C", borderRadius: 16, height: 58, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, justifyContent: "space-between" },
  memberLeft: { flexDirection: "row", alignItems: "center" },
  avatarWrapper: { width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2, overflow: "hidden", marginRight: 12 },
  avatarImage: { width: "100%", height: "100%" },
  memberName: { color: "#fff", fontSize: 14, fontWeight: "500", maxWidth: 140 },
  arrowBtn: { width: 34, height: 34, backgroundColor: "#2849D8", borderRadius: 17, justifyContent: "center", alignItems: "center" },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  sheetWrap: { position: "absolute", left: 12, right: 12, bottom: 18 },
  sheetInner: { backgroundColor: "#05203E", borderRadius: 18, paddingVertical: 14, paddingHorizontal: 16, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 18, elevation: 16 },
  sheetHandle: { width: 46, height: 4, borderRadius: 2, backgroundColor: "#0C3A5F", alignSelf: "center", marginBottom: 10 },
  sheetTitle: { color: "#DCE6FF", fontSize: 15, fontWeight: "600", marginBottom: 10 },
  sheetRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 },
  sheetLeft: { flexDirection: "row", alignItems: "center" },
  sheetIconBg: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#0B3656", justifyContent: "center", alignItems: "center" },
  sheetRowTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
  sheetSub: { color: "#99B0E6", fontSize: 12 },
  switchTrack: { width: 52, height: 30, borderRadius: 18, backgroundColor: "#0C304F", padding: 4, justifyContent: "flex-start" },
  switchOn: { backgroundColor: "#2F2C7F", justifyContent: "flex-end" },
  switchThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#98A6D9" },
  switchThumbOn: { backgroundColor: "#E8D9FF" },
  radioOuter: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, borderColor: "#274C9D", justifyContent: "center", alignItems: "center", backgroundColor: "#07243E" },
  radioActive: { borderColor: "#47A0FF", backgroundColor: "#2849D8" },
  radioInner: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#fff" },
  applyBtn: { marginTop: 14, backgroundColor: "#3255BA", borderRadius: 12, paddingVertical: 12, alignItems: "center" },
  applyText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});

