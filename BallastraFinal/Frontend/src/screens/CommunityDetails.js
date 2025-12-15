import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size) => (SCREEN_W / guidelineBaseWidth) * size;

export default function ChatScreen({ route, navigation }) {
  const channel = route?.params?.channelName ?? "#general";

  // Messages state
  const [messages, setMessages] = useState([
    {
      id: "p1",
      type: "post",
      author: "NicholasChan",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
      time: "2h ago",
      text:
        "Hi @everyone Please Check It Out My Nexus Member List sushii @sushiiIive corrected my mistake there from last week.",
      media:
        "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1200",
      likes: 15800,
      replies: [
        {
          id: "r1",
          author: "NicholasChan",
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
          text: "Cheers! 🎵 much appreciated",
          time: "12mins ago",
        },
        {
          id: "r2",
          author: "NicholasChan",
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
          text: "Cheers! 🎵 much appreciated",
          time: "12mins ago",
        },
      ],
    },
    {
      id: "p2",
      type: "message",
      author: "Chala",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
      time: "1 mins ago",
      text: "Hi @everyone",
    },
    {
      id: "p3",
      type: "message",
      author: "You",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
      time: "Just now",
      text: "Hello everyone!",
    },
  ]);

  // modal / menu state
  const [menuVisible, setMenuVisible] = useState(false);
  const [activePost, setActivePost] = useState(null);

  // store layouts of posts
  const positionsRef = useRef({});
  const [scrollY, setScrollY] = useState(0);
  const scrollViewRef = useRef(null);

  // toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastTop, setToastTop] = useState(0);
  const [toastIcon, setToastIcon] = useState("copy");
  const [toastIconColor, setToastIconColor] = useState("#dbeafe");
  const toastOpacity = useRef(new Animated.Value(0)).current;

  // Input state
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyTargetAuthor, setReplyTargetAuthor] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef(null);

  // Scroll to bottom when new message
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const openPostMenu = (post) => {
    setActivePost(post);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setActivePost(null);
  };

  const showToast = (text, postId, icon = "copy", iconColor = "#dbeafe") => {
    const layout = positionsRef.current[postId];
    let top = SCREEN_H * 0.2;
    if (layout) {
      top = layout.y - scrollY - scale(56);
      if (top < scale(36)) top = scale(36);
      if (top > SCREEN_H - scale(200)) top = SCREEN_H - scale(200);
    }

    setToastTop(top);
    setToastText(text);
    setToastIcon(icon);
    setToastIconColor(iconColor);
    setToastVisible(true);

    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setToastVisible(false);
      });
    }, 1500);
  };

  const handleMenuAction = (action) => {
    console.log("Action:", action, "on", activePost?.id);

    if (action === "copy") {
      showToast("Copy Message", activePost?.id, "copy", "#dbeafe");
      closeMenu();
      return;
    }

    if (action === "mark") {
      showToast("Marked Unread", activePost?.id, "moon", "#a3e635");
      closeMenu();
      return;
    }

    if (action === "report") {
      showToast("Reported", activePost?.id, "flag", "#ff7b7b");
      closeMenu();
      return;
    }

    if (action === "copylink") {
      showToast("Link Copied", activePost?.id, "link", "#d6bcfa");
      closeMenu();
      return;
    }

    if (action === "mention") {
      const name = activePost?.author ? `@${activePost.author}` : "@";
      setInputValue(name + " ");
      setReplyTarget(activePost?.id ?? null);
      setReplyTargetAuthor(activePost?.author ?? null);

      closeMenu();

      setTimeout(() => {
        if (inputRef?.current?.focus) {
          inputRef.current.focus();
          try {
            inputRef.current.setNativeProps({
              selection: { start: (name + " ").length, end: (name + " ").length },
            });
          } catch (e) {}
        }
      }, 80);
      return;
    }

    if (action === "reply") {
      const replyText = `Replying to @${activePost?.author}: `;
      setInputValue(replyText);
      setReplyTarget(activePost?.id ?? null);
      setReplyTargetAuthor(activePost?.author ?? null);

      closeMenu();

      setTimeout(() => {
        if (inputRef?.current?.focus) {
          inputRef.current.focus();
          try {
            inputRef.current.setNativeProps({
              selection: { start: replyText.length, end: replyText.length },
            });
          } catch (e) {}
        }
      }, 80);
      return;
    }

    showToast(action === "forward" ? "Forwarded" : "Done", activePost?.id, "check", "#9fb4ff");
    closeMenu();
  };

  const sendMessage = () => {
    if (!inputValue.trim() && !isRecording) return;

    if (isRecording) {
      // Stop recording
      stopRecording();
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      type: "message",
      author: "You",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
      time: "Just now",
      text: inputValue,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setReplyTarget(null);
    setReplyTargetAuthor(null);
    Keyboard.dismiss();
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start recording timer
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    if (recordingTime > 0) {
      // Add voice message to chat
      const voiceMessage = {
        id: Date.now().toString(),
        type: "voice",
        author: "You",
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
        time: "Just now",
        text: `Voice message (${recordingTime}s)`,
        duration: recordingTime,
      };
      
      setMessages(prev => [...prev, voiceMessage]);
    }
    
    setIsRecording(false);
    setRecordingTime(0);
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLike = (postId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === postId) {
        const liked = !!msg.liked;
        const current = Number(msg.likes || 0);
        return {
          ...msg,
          liked: !liked,
          likes: liked ? Math.max(0, current - 1) : current + 1,
        };
      }
      return msg;
    }));
  };

  const handleAddReply = (postId, replyText) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === postId) {
        const newReply = {
          id: `reply_${Date.now()}`,
          author: "You",
          avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
          text: replyText,
          time: "Just now",
        };
        
        return {
          ...msg,
          replies: [...(msg.replies || []), newReply]
        };
      }
      return msg;
    }));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#BFD6FF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerCenter}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Header_media", { channelName: channel })}
        >
          <Text style={styles.channelLabel}>{channel}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchBtn}>
          <Feather name="search" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.content}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((m) => {
          if (m.type === "post") {
            return (
              <View
                key={m.id}
                style={styles.postCard}
                onLayout={(e) => {
                  positionsRef.current[m.id] = {
                    y: e.nativeEvent.layout.y,
                    height: e.nativeEvent.layout.height,
                  };
                }}
              >
                {/* Author row */}
                <View style={styles.postHeader}>
                  <Image source={{ uri: m.avatar }} style={styles.postAvatar} />
                  <View style={styles.postMeta}>
                    <View style={styles.postMetaRow}>
                      <Text style={styles.postAuthor}>{m.author}</Text>
                      <Text style={styles.postTime}> · {m.time}</Text>

                      <TouchableOpacity
                        style={styles.postMore}
                        onPress={() => openPostMenu(m)}
                      >
                        <Feather name="more-vertical" size={16} color="#9fb4ff" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.postText}>{m.text}</Text>
                  </View>
                </View>

                {/* Media thumbnail */}
                {m.media ? (
                  <TouchableOpacity
                    activeOpacity={0.95}
                    onPress={() =>
                      navigation.navigate("MediaViewer", {
                        uri: m.media,
                        author: m.author,
                        time: m.time,
                      })
                    }
                    style={styles.mediaWrapper}
                  >
                    <Image source={{ uri: m.media }} style={styles.mediaImage} />
                  </TouchableOpacity>
                ) : null}

                {/* Reaction + replies summary */}
                <View style={styles.reactionRow}>
                  <TouchableOpacity 
                    style={styles.reactionBtn}
                    onPress={() => handleLike(m.id)}
                  >
                    <Feather name="heart" size={18} color={m.liked ? "#ff6b81" : "#9fb4ff"} />
                    <Text style={styles.reactionCount}>
                      {formatCount(m.likes || 0)}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.replyBtn}>
                    <Feather name="corner-down-left" size={16} color="#9fb4ff" />
                    <Text style={styles.replyText}>
                      {m.replies?.length ?? 0} replies
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Threaded replies */}
                <View style={styles.threadWrapper}>
                  {m.replies?.map((r, idx) => (
                    <View key={r.id} style={styles.replyRow}>
                      <View style={styles.connectorColumn}>
                        <View style={styles.dot} />
                        <View style={styles.vertLine} />
                      </View>

                      <View style={styles.replyContent}>
                        <View style={styles.replyHeader}>
                          <Image
                            source={{ uri: r.avatar }}
                            style={styles.smallAvatar}
                          />
                          <View style={{ marginLeft: 8 }}>
                            <Text style={styles.replyAuthor}>{r.author}</Text>
                            <Text style={styles.replyTime}>{r.time}</Text>
                          </View>
                        </View>

                        <Text style={styles.replyTextBody}>{r.text}</Text>

                        <View style={styles.replyActions}>
                          <TouchableOpacity style={styles.replyActionBtn}>
                            <Feather name="heart" size={14} color="#9fb4ff" />
                            <Text style={styles.replyActionText}>15.8k</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[styles.replyActionBtn, { marginLeft: 12 }]}
                            onPress={() => {
                              const replyText = `@${r.author} `;
                              setInputValue(replyText);
                              setReplyTarget(m.id);
                              setReplyTargetAuthor(r.author);
                              inputRef.current?.focus();
                            }}
                          >
                            <Feather name="corner-up-left" size={14} color="#9fb4ff" />
                            <Text style={styles.replyActionText}>Reply</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          }

          if (m.type === "message") {
            return (
              <View key={m.id} style={styles.simpleMessage}>
                <Image source={{ uri: m.avatar }} style={styles.smallAvatar} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.msgAuthor}>
                    {m.author} · <Text style={styles.msgTime}>{m.time}</Text>
                  </Text>
                  <Text style={styles.msgText}>{m.text}</Text>
                </View>
                <TouchableOpacity
                  style={styles.msgMoreBtn}
                  onPress={() => openPostMenu(m)}
                >
                  <Feather name="more-vertical" size={14} color="#64748b" />
                </TouchableOpacity>
              </View>
            );
          }

          if (m.type === "voice") {
            return (
              <View key={m.id} style={styles.voiceMessage}>
                <View style={styles.voiceMessageRow}>
                  <Ionicons name="mic" size={20} color="#9fb4ff" />
                  <View style={styles.voiceWave}>
                    <View style={styles.voiceWaveBar} />
                    <View style={[styles.voiceWaveBar, { height: 12 }]} />
                    <View style={[styles.voiceWaveBar, { height: 16 }]} />
                    <View style={[styles.voiceWaveBar, { height: 20 }]} />
                    <View style={[styles.voiceWaveBar, { height: 16 }]} />
                    <View style={[styles.voiceWaveBar, { height: 12 }]} />
                    <View style={styles.voiceWaveBar} />
                  </View>
                  <Text style={styles.voiceDuration}>{m.duration}s</Text>
                </View>
                <View style={styles.voiceMessageInfo}>
                  <Text style={styles.msgAuthor}>
                    {m.author} · <Text style={styles.msgTime}>{m.time}</Text>
                  </Text>
                </View>
              </View>
            );
          }

          return null;
        })}

        {/* day divider */}
        <View style={styles.dayDivider}>
          <Text style={styles.dayDividerText}>Today</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Reply Indicator */}
      {replyTargetAuthor && (
        <View style={styles.replyIndicator}>
          <View style={styles.replyIndicatorContent}>
            <Text style={styles.replyIndicatorText}>
              Replying to @{replyTargetAuthor}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setReplyTarget(null);
                setReplyTargetAuthor(null);
              }}
            >
              <Feather name="x" size={16} color="#9fb4ff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Input bar */}
      <View style={styles.inputBarContainer}>
        <View style={styles.inputBar}>
          {/* left quick icons */}
          <View style={styles.leftIcons}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Feather name="image" size={18} color="#9fb4ff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Feather name="smile" size={18} color="#9fb4ff" />
            </TouchableOpacity>
          </View>

          {/* Input field */}
          <View style={styles.inputWrapperNew}>
            <TextInput
              ref={inputRef}
              value={inputValue}
              onChangeText={(t) => setInputValue(t)}
              placeholder="Message #general..."
              placeholderTextColor="#9aa4c8"
              style={styles.inputNew}
              multiline={false}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />

            <TouchableOpacity style={styles.plusBtn}>
              <Ionicons name="add" size={18} color="#9fb4ff" />
            </TouchableOpacity>
          </View>

          {/* right area: mic OR send */}
          <View style={styles.rightIcons}>
            {!inputValue.trim() ? (
              <TouchableOpacity
                style={[
                  styles.micBtn,
                  isRecording && styles.micBtnRecording
                ]}
                activeOpacity={0.7}
                onPress={isRecording ? stopRecording : startRecording}
                onLongPress={startRecording}
              >
                {isRecording ? (
                  <>
                    <View style={styles.recordingDot} />
                    <Text style={styles.recordingTime}>
                      {formatRecordingTime(recordingTime)}
                    </Text>
                    <Ionicons name="stop" size={20} color="#ef4444" />
                  </>
                ) : (
                  <Ionicons name="mic" size={20} color="#9fb4ff" />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.sendBtn}
                activeOpacity={0.7}
                onPress={sendMessage}
              >
                <Feather name="send" size={18} color="#071022" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Modal Menu */}
      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.sheetWrapper}>
                <View style={styles.sheetHandle} />

                <ScrollView
                  style={styles.menuList}
                  contentContainerStyle={{ paddingBottom: 24 }}
                >
                  {[
                    { key: "reply", label: "Reply", icon: "corner-down-left" },
                    { key: "forward", label: "Forward", icon: "corner-up-right" },
                    { key: "copy", label: "Copy message", icon: "copy" },
                    { key: "mark", label: "Mark Unread", icon: "moon" },
                    { key: "mention", label: "Mention", icon: "at-sign" },
                    { key: "copylink", label: "Copy Messages Link", icon: "link" },
                    { key: "addorbits", label: "Add Orbits", icon: "users" },
                  ].map((it) => (
                    <TouchableOpacity
                      key={it.key}
                      style={styles.menuItem}
                      onPress={() => handleMenuAction(it.key)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.menuIcon}>
                        <Feather name={it.icon} size={18} color="#9fb4ff" />
                      </View>
                      <Text style={styles.menuLabel}>{it.label}</Text>
                    </TouchableOpacity>
                  ))}

                  <View style={{ height: 8 }} />

                  <TouchableOpacity
                    style={styles.reportBtn}
                    onPress={() => handleMenuAction("report")}
                    activeOpacity={0.7}
                  >
                    <View style={styles.reportIcon}>
                      <Feather name="flag" size={18} color="#ff6b6b" />
                    </View>
                    <Text style={styles.reportLabel}>Report</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Floating toast */}
      {toastVisible ? (
        <Animated.View
          style={[
            styles.floatingToast,
            { top: toastTop, opacity: toastOpacity, left: scale(70) },
          ]}
        >
          <Feather name={toastIcon} size={16} color={toastIconColor} />
          <Text style={styles.floatingToastText}>{toastText}</Text>
        </Animated.View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

/* helper */
function formatCount(n) {
  if (!n && n !== 0) return "";
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

/* ---------- Updated Styles ---------- */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#020617" },
  header: {
    height: scale(60),
    paddingHorizontal: scale(12),
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  headerCenter: { flex: 1, alignItems: "center" },
  channelLabel: { color: "#9fb4ff", fontWeight: "700", fontSize: scale(16) },
  searchBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },

  content: { paddingHorizontal: scale(12), paddingBottom: scale(160) },

  postCard: { marginTop: scale(12) },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scale(8),
  },
  postAvatar: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    marginRight: scale(10),
    borderWidth: 2,
    borderColor: "#22c55e",
  },
  postMeta: { flex: 1 },
  postMetaRow: { flexDirection: "row", alignItems: "center" },
  postAuthor: { color: "#E5ECFF", fontWeight: "700", fontSize: scale(14) },
  postTime: { color: "#9fb4ff", marginLeft: scale(6), fontSize: scale(12) },
  postMore: { marginLeft: "auto" },
  postText: { color: "#cbd5f5", marginTop: scale(6), fontSize: scale(13) },

  mediaWrapper: {
    marginTop: scale(10),
    borderRadius: scale(12),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  mediaImage: { width: "100%", height: undefined, aspectRatio: 16 / 9, resizeMode: "cover" },

  reactionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(8),
    marginBottom: scale(8),
  },
  reactionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(12),
  },
  reactionCount: { color: "#cbd5f5", marginLeft: 6 },

  replyBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyText: { color: "#9fb4ff", marginLeft: 6 },

  threadWrapper: { marginTop: scale(6), paddingLeft: scale(12) },
  replyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scale(12),
  },
  connectorColumn: { width: scale(28), alignItems: "center" },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#1d4ed8",
    marginTop: scale(6),
  },
  vertLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#111827",
    marginTop: scale(4),
    borderRadius: 1,
  },
  replyContent: { flex: 1, paddingLeft: scale(8) },
  replyHeader: { flexDirection: "row", alignItems: "center" },
  smallAvatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    borderWidth: 2,
    borderColor: "#22c55e",
  },
  replyAuthor: { color: "#E5ECFF", fontWeight: "700", fontSize: scale(13) },
  replyTime: { color: "#9fb4ff", fontSize: scale(11) },
  replyTextBody: { color: "#cbd5f5", marginTop: scale(6), fontSize: scale(13) },
  replyActions: { flexDirection: "row", marginTop: scale(6) },
  replyActionBtn: { flexDirection: "row", alignItems: "center" },
  replyActionText: { color: "#9fb4ff", marginLeft: 6, fontSize: scale(12) },

  simpleMessage: {
    flexDirection: "row",
    marginTop: scale(14),
    alignItems: "flex-start",
  },
  msgMoreBtn: {
    padding: 8,
    marginLeft: 8,
  },
  msgAuthor: { color: "#E5ECFF", fontWeight: "700", fontSize: scale(13) },
  msgTime: { color: "#9fb4ff", fontWeight: "600", fontSize: scale(11) },
  msgText: { color: "#cbd5f5", marginTop: scale(4), fontSize: scale(14) },

  voiceMessage: {
    marginTop: scale(14),
    backgroundColor: "#0f172a",
    padding: scale(12),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  voiceMessageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  voiceWave: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(12),
    height: scale(24),
  },
  voiceWaveBar: {
    width: 8,
    height: 8,
    backgroundColor: "#3b82f6",
    marginHorizontal: 2,
    borderRadius: 15,
  },
  voiceDuration: {
    color: "#9fb4ff",
    fontSize: scale(12),
  },
  voiceMessageInfo: {
    marginTop: scale(6),
  },

  dayDivider: {
    alignItems: "center",
    marginTop: scale(24),
    marginBottom: scale(6),
  },
  dayDividerText: {
    color: "#ef4444",
    fontSize: scale(12),
    fontWeight: "700",
  },

  replyIndicator: {
    backgroundColor: "#0f172a",
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },
  replyIndicatorContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  replyIndicatorText: {
    color: "#9fb4ff",
    fontSize: scale(13),
    fontWeight: "600",
  },

  inputBarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.OS === "ios" ? scale(18) : scale(12),
    alignItems: "center",
    backgroundColor: "#020617",
    paddingTop: scale(8),
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },
  inputBar: {
    width: SCREEN_W - scale(24),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#071022",
    borderRadius: scale(28),
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  leftIcons: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginRight: scale(6) 
  },
  iconBtn: {
    width: scale(36),
    height: scale(36),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(6),
  },
  inputWrapperNew: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center",
    minHeight: scale(36),
  },
  inputNew: { 
    color: "#E5ECFF", 
    fontSize: scale(14), 
    paddingVertical: scale(8),
    flex: 1,
    maxHeight: scale(80),
  },
  plusBtn: { 
    marginLeft: scale(8), 
    width: scale(34), 
    height: scale(34), 
    borderRadius: scale(17), 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#0f172a",
  },
  rightIcons: { 
    marginLeft: scale(8) 
  },
  micBtn: {
    width: scale(80),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1f2937",
    flexDirection: "row",
    paddingHorizontal: scale(12),
  },
  micBtnRecording: {
    borderColor: "#ef4444",
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    marginRight: 6,
  },
  recordingTime: {
    color: "#ef4444",
    fontSize: scale(12),
    fontWeight: "600",
    marginRight: 6,
  },
  sendBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9fb4ff",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  sheetWrapper: {
    backgroundColor: "#071022",
    borderTopLeftRadius: scale(18),
    borderTopRightRadius: scale(18),
    paddingTop: scale(12),
    paddingHorizontal: scale(14),
    maxHeight: SCREEN_H * 0.75,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  sheetHandle: {
    width: scale(60),
    height: scale(4),
    borderRadius: 2,
    backgroundColor: "#0f1724",
    alignSelf: "center",
    marginBottom: scale(12),
  },
  menuList: {},
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: scale(14),
    paddingHorizontal: scale(8),
    borderRadius: scale(12),
    marginBottom: scale(8),
    borderWidth: 1,
    borderColor: "#172033",
  },
  menuIcon: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#0b1220",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: "#1f2b44",
  },
  menuLabel: {
    color: "#cbd5f5",
    fontSize: scale(15),
    fontWeight: "600",
  },

  reportBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(14),
    paddingHorizontal: scale(8),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#3f1420",
  },
  reportIcon: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#2b1113",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: "#5f1f22",
  },
  reportLabel: {
    color: "#ff6b6b",
    fontSize: scale(15),
    fontWeight: "700",
  },

  floatingToast: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(20),
    backgroundColor: "rgba(10,20,40,0.95)",
    borderWidth: 1,
    borderColor: "#213a6b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingToastText: {
    color: "#dbeafe",
    marginLeft: scale(8),
    fontWeight: "600",
  },
});