import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const ITEM_SIZE = (width - 48) / 3;

const GRID = Array.from({ length: 12 }).map((_, i) => ({
  id: i.toString(),
}));

export default function CreateBlipsScreen() {
  const insets = useSafeAreaInsets(); // 🔥 IMPORTANT
  const [showAlbums, setShowAlbums] = useState(false);

  const renderItem = () => (
    <View style={styles.gridItem}>
      <Ionicons name="image-outline" size={22} color="#9CA3AF" />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ================= HEADER ================= */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity>
          <Ionicons name="close" size={22} color="#E5E7EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Blips</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="camera-outline" size={18} color="#93C5FD" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="scan-outline" size={18} color="#93C5FD" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= LIBRARY ROW ================= */}
      <TouchableOpacity
        style={styles.libraryRow}
        onPress={() => setShowAlbums(!showAlbums)}
        activeOpacity={0.7}
      >
        <Text style={styles.libraryText}>Photo Library</Text>
        <Ionicons
          name={showAlbums ? "chevron-up" : "chevron-down"}
          size={16}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {/* ================= CONTENT ================= */}
      {!showAlbums ? (
        <FlatList
          data={GRID}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={renderItem}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.albums}>
          <Text style={styles.sectionTitle}>Albums</Text>

          <View style={styles.albumRow}>
            <AlbumItem title="Camera roll" count="758" />
            <AlbumItem title="Favorites" count="5" />
            <AlbumItem title="Videos" count="31" />
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 14 }]}>
            Content Type
          </Text>

          <View style={styles.albumRow}>
            <AlbumItem title="Videos" count="12" />
            <AlbumItem title="Selfies" count="3" />
            <AlbumItem title="Screenshots" count="31" />
          </View>
        </View>
      )}

      {/* ================= BOTTOM SHEET ================= */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.sheetHandle} />

        <View style={styles.sheetRow}>
          <TouchableOpacity style={styles.sheetButton}>
            <Text style={styles.sheetIcon}>Aa</Text>
            <Text style={styles.sheetText}>Text</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sheetButton}>
            <Ionicons name="musical-notes-outline" size={18} color="#E5E7EB" />
            <Text style={styles.sheetText}>Music</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================= SUB COMPONENT ================= */

function AlbumItem({ title, count }) {
  return (
    <View style={styles.albumItem}>
      <Ionicons name="image-outline" size={22} color="#9CA3AF" />
      <Text style={styles.albumTitle}>{title}</Text>
      <Text style={styles.albumCount}>{count}</Text>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050B1A",
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
    backgroundColor: "#050B1A",
  },

  headerTitle: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "500",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },

  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#0B1730",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Library */
  libraryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  libraryText: {
    color: "#E5E7EB",
    fontSize: 14,
  },

  /* Grid */
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 160,
  },

  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 14,
    backgroundColor: "#0B1730",
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
  },

  /* Albums */
  albums: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },

  sectionTitle: {
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 10,
  },

  albumRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  albumItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 14,
    backgroundColor: "#0B1730",
    padding: 10,
    justifyContent: "space-between",
  },

  albumTitle: {
    color: "#E5E7EB",
    fontSize: 13,
  },

  albumCount: {
    color: "#9CA3AF",
    fontSize: 11,
  },

  /* Bottom Sheet */
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#050B1A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#111827",
  },

  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#374151",
    alignSelf: "center",
    marginBottom: 14,
  },

  sheetRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  sheetButton: {
    width: 90,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1F3A8A",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  sheetIcon: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
  },

  sheetText: {
    color: "#E5E7EB",
    fontSize: 12,
  },
});