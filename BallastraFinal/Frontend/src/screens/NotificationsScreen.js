import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

const { width, height } = Dimensions.get("window");
const BG = "#020816";

export default function NotificationsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [undoData, setUndoData] = useState(null);
  const [moreVisible, setMoreVisible] = useState(false);
  const [moreTarget, setMoreTarget] = useState(null);

  // Fetch notifications from API on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No authentication token found");
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        Alert.alert(
          "Error",
          data?.message || `Failed to fetch notifications (${response.status})`
        );
        setLoading(false);
        return;
      }

      if (data?.success && Array.isArray(data.data)) {
        setNotifs(data.data);
      } else if (Array.isArray(data)) {
        setNotifs(data);
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
      Alert.alert("Error", "Could not fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (notificationId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `${BASE_URL}/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifs((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, is_read: true } : n
          )
        );
      }
    } catch (error) {
      console.error("Mark read error:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      // Find the notification to undo
      const notif = notifs.find((n) => n.id === notificationId);

      // Remove from UI
      setNotifs((prev) => prev.filter((n) => n.id !== notificationId));
      setUndoData({ notif, notificationId });

      // Backend delete (optional - only if your backend supports DELETE)
      // You might want to implement archive/soft delete instead
      // await fetch(`${BASE_URL}/notifications/${notificationId}`, {
      //   method: 'DELETE',
      //   headers: { Authorization: `Bearer ${token}` },
      // });
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  };

  const handleUndo = () => {
    if (!undoData) return;
    setNotifs((prev) => [undoData.notif, ...prev]);
    setUndoData(null);
  };

  const openDeleteConfirm = (id) => {
    setPendingDelete(id);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    handleDeleteNotification(pendingDelete);
    setPendingDelete(null);
    setConfirmVisible(false);
  };

  const renderNotification = (item) => {
    const isUnread = !item.is_read;
    const timestamp = item.created_at
      ? new Date(item.created_at).toLocaleString()
      : "Unknown";

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.allRow,
          isUnread && styles.allRowHighlight,
        ]}
        onPress={() => handleMarkRead(item.id)}
      >
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>📧</Text>
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.mainLine}>
              <Text style={styles.nameText}>{item.type || "Notification"} </Text>
            </Text>
            <Text style={styles.timeText}>{timestamp}</Text>
            {item.payload && Object.keys(item.payload).length > 0 && (
              <View style={styles.messageBadge}>
                <Text style={styles.messageBadgeText}>
                  {JSON.stringify(item.payload).substring(0, 50)}...
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Swipe-like action buttons */}
        <View style={styles.rowActions}>
          <TouchableOpacity
            style={styles.swipeDeleteBtn}
            onPress={() => openDeleteConfirm(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#FF5B5B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.swipeMoreBtn}
            onPress={() => {
              setMoreTarget(item);
              setMoreVisible(true);
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredNotifs = notifs.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.is_read;
    if (activeTab === "archived") return n.archived;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#020816" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Notification_popup")}>
            <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* TABS */}
        <View style={styles.tabsContainer}>
          {[
            { key: "all", label: "All" },
            { key: "unread", label: "Unread" },
            { key: "archived", label: "Archived" },
          ].map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[
                styles.tabChip,
                activeTab === t.key && styles.tabChipActive,
              ]}
              onPress={() => setActiveTab(t.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === t.key && styles.tabTextActive,
                ]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        {/* CONTENT */}
        {loading ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#2E5BFF" />
          </View>
        ) : (
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {undoData && (
              <View style={styles.undoBanner}>
                <View style={styles.undoLeft}>
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#FF5B5B"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.undoText}>Notification Deleted</Text>
                </View>
                <TouchableOpacity onPress={handleUndo}>
                  <Text style={styles.undoButtonText}>Undo</Text>
                </TouchableOpacity>
              </View>
            )}

            {filteredNotifs.length === 0 ? (
              <View style={{ padding: 24 }}>
                <Text style={{ color: "#9CA3AF" }}>No notifications</Text>
              </View>
            ) : (
              filteredNotifs.map(renderNotification)
            )}
          </ScrollView>
        )}

        {/* DELETE CONFIRM MODAL */}
        <Modal
          visible={confirmVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setConfirmVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>
                Are you sure want to delete?
              </Text>

              <TouchableOpacity
                style={styles.modalDeleteBtn}
                onPress={handleConfirmDelete}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color="#FF5B5B"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.modalDeleteText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* MORE OPTIONS SHEET */}
        <Modal
          visible={moreVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMoreVisible(false)}
        >
          <View style={styles.moreBackdrop}>
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setMoreVisible(false)}
            />
            <View style={styles.moreSheet}>
              <TouchableOpacity
                style={styles.moreBtn}
                onPress={() => {
                  setMoreVisible(false);
                  if (moreTarget) {
                    handleMarkRead(moreTarget.id);
                  }
                }}
              >
                <View style={styles.moreLeft}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#FFFFFF"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.moreText}>Mark as Read</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moreBtn, styles.moreBtnRed]}
                onPress={() => {
                  setMoreVisible(false);
                  if (moreTarget) {
                    openDeleteConfirm(moreTarget.id);
                  }
                }}
              >
                <View style={styles.moreLeft}>
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#FF4B4B"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.moreTextRed}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 18,
    paddingTop: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: width * 0.055,
    fontWeight: "700",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    backgroundColor: "#050F25",
  },
  tabChipActive: { backgroundColor: "#101B3C" },
  tabText: { color: "#7F8AA7", fontSize: width * 0.035, fontWeight: "500" },
  tabTextActive: { color: "#FFFFFF" },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginBottom: 10,
  },
  scrollArea: { flex: 1 },
  allRow: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  allRowHighlight: { backgroundColor: "#071F4A" },
  row: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#25C4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: { fontSize: 20 },
  textBlock: { flex: 1 },
  mainLine: { flexWrap: "wrap" },
  nameText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: width * 0.037,
  },
  lightText: { color: "#B3C3E7", fontSize: width * 0.036 },
  boldRoom: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: width * 0.037,
  },
  timeText: { marginTop: 2, color: "#7F8AA7", fontSize: width * 0.032 },
  messageBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#3C465F",
  },
  messageBadgeText: { color: "#E4E9F7", fontSize: width * 0.032 },
  rowActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  swipeDeleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#141B33",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF5B5B",
  },
  swipeMoreBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#141F33",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#05122B",
    borderWidth: 1,
    borderColor: "rgba(120,142,255,0.5)",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  modalDeleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    paddingVertical: 10,
    backgroundColor: "#1B1220",
    borderWidth: 1,
    borderColor: "#FF5B5B",
    marginBottom: 12,
  },
  modalDeleteText: {
    color: "#FF5B5B",
    fontSize: width * 0.038,
    fontWeight: "600",
  },
  modalCancelBtn: {
    borderRadius: 18,
    paddingVertical: 10,
    backgroundColor: "#101B3C",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelText: {
    color: "#FFFFFF",
    fontSize: width * 0.038,
    fontWeight: "600",
  },
  undoBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#050F25",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2E5BFF",
  },
  undoLeft: { flexDirection: "row", alignItems: "center" },
  undoText: { color: "#FFFFFF", fontSize: width * 0.035 },
  undoButtonText: {
    color: "#2E5BFF",
    fontSize: width * 0.036,
    fontWeight: "600",
  },
  moreBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  moreSheet: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 28,
    backgroundColor: "#050F25",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "#243A7A",
  },
  moreBtn: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "#071F4A",
  },
  moreLeft: { flexDirection: "row", alignItems: "center" },
  moreText: {
    color: "#FFFFFF",
    fontSize: width * 0.037,
    fontWeight: "500",
  },
  moreBtnRed: {
    backgroundColor: "#210910",
    borderWidth: 1,
    borderColor: "#FF4B4B",
    marginTop: 8,
  },
  moreTextRed: {
    color: "#FF4B4B",
    fontSize: width * 0.037,
    fontWeight: "600",
  },
});
