
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   Switch,
//   Modal,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// export default function V24({ navigation }) {
//   // DEFAULT: off
//   const [autoSort, setAutoSort] = useState(false);
//   const [chatExpanded, setChatExpanded] = useState(true);
//   const [voiceExpanded, setVoiceExpanded] = useState(true);
//   const [announceExpanded, setAnnounceExpanded] = useState(true);

//   // popup state (info modal shown when turning ON)
//   const [showAutoPopup, setShowAutoPopup] = useState(false);

//   const handleBack = () => {
//     if (navigation?.goBack) navigation.goBack();
//   };

//   const handleSave = () => {
//     console.log("Save categories");
//   };

//   const handleReset = () => {
//     console.log("Reset categories to default");
//   };

//   // called when user toggles switch
//   const onToggleAutoSort = (value) => {
//     // set the switch to the chosen value
//     setAutoSort(!!value);

//     // if user just turned it ON, show info popup (but do NOT revert)
//     if (value) {
//       setShowAutoPopup(true);
//     } else {
//       // if turned OFF, ensure popup closed
//       setShowAutoPopup(false);
//     }
//   };

//   // navigate to create screens
//   const openCreateCategory = () => {
//     if (navigation?.navigate) navigation.navigate("Setting_category_create_category");
//   };

//   const openCreateSpace = () => {
//     if (navigation?.navigate) navigation.navigate("Setting_category_create_Space");
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />

 

//       <ScrollView
//         style={{ flex: 1 }}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
//             <Ionicons name="chevron-back" size={24} color="#ffffff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Categories</Text>
//           <View style={{ width: 24 }} />
//         </View>

//         {/* Chat Spaces (expanded with items) */}
//         <CategoryGroupCard
//           title="Chat Spaces"
//           expanded={chatExpanded}
//           onToggle={() => setChatExpanded((p) => !p)}
//           items={[
//             { icon: "#", label: "general", type: "text" },
//             { icon: "#", label: "coffee-talk", type: "text" },
//             { icon: "#", label: "memes", type: "text" },
//           ]}
//         />

//         {/* Voice Zones (expanded with items) */}
//         <CategoryGroupCard
//           title="Voice Zones"
//           expanded={voiceExpanded}
//           onToggle={() => setVoiceExpanded((p) => !p)}
//           items={[
//             { icon: "mic-outline", label: "Hangout", type: "ion" },
//             { icon: "mic-outline", label: "Game VC", type: "ion" },
//           ]}
//         />

//         {/* Gaming Area (collapsed / simple block) */}
//         <CollapsedCategoryCard title="Gaming Area" />

//         {/* Announcements (expanded with items) */}
//         <CategoryGroupCard
//           title="Announcements"
//           expanded={announceExpanded}
//           onToggle={() => setAnnounceExpanded((p) => !p)}
//           items={[
//             { icon: "|", label: "global-news", type: "bar" },
//             { icon: "|", label: "nexus-updates", type: "bar" },
//           ]}
//         />

//         {/* Auto-sort toggle card */}
//         <View style={styles.autoSortCard}>
//           <Text style={styles.autoSortLabel}>Auto-Sort Spaces by Category</Text>
//           <Switch
//             value={autoSort}
//             onValueChange={onToggleAutoSort}
//            trackColor={{ false: "#1E293B", true: "#4479FF" }}
//               thumbColor="#fff"
//           />
//         </View>

//         {/* Action buttons: Create Category / Create Space
//             NOTE: rendered only when autoSort === true */}
//         {autoSort && (
//           <View style={styles.actionsContainer}>
//             <TouchableOpacity
//               style={[styles.actionCard, styles.actionCardPrimary]}
//               activeOpacity={0.85}
//               onPress={openCreateCategory}
//             >
//               <View style={styles.actionRow}>
//                 <Ionicons name="albums-outline" size={18} color="#fff" />
//                 <Text style={styles.actionText}>Create Category</Text>
//               </View>
//               <Ionicons name="chevron-forward" size={16} color="#fff" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.actionCard, styles.actionCardSecondary]}
//               activeOpacity={0.85}
//               onPress={openCreateSpace}
//             >
//               <View style={styles.actionRow}>
//                 <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
//                 <Text style={styles.actionText}>Create Space</Text>
//               </View>
//               <Ionicons name="chevron-forward" size={16} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Save button */}
//         {/* <TouchableOpacity
//           activeOpacity={0.9}
//           style={styles.saveButtonWrapper}
//           onPress={handleSave}
//         >
//           <LinearGradient
//             colors={["#355DFF", "#7F5DFF"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.saveGradient}
//           >
//             <Text style={styles.saveText}>Save</Text>
//           </LinearGradient>
//         </TouchableOpacity> */}

//         {/* <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
//           <Text style={styles.resetText}>Reset to Default</Text>
//         </TouchableOpacity> */}

//         <View style={{ height: 40 }} />
//       </ScrollView>

//       {/* ---------- Modal / Popup shown when enabling Auto-Sort ---------- */}
//       {/* <Modal
//         visible={showAutoPopup}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowAutoPopup(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalCard}>
//             <Text style={styles.modalTitle}>Auto-Sort Enabled</Text>
//             <Text style={styles.modalBody}>
//               When Auto-Sort is on, new spaces will automatically be grouped under their
//               respective categories. You can turn this off anytime from this screen.
//             </Text>

//             <View style={styles.modalButtonsRow}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonSecondary]}
//                 onPress={() => setShowAutoPopup(false)}
//                 activeOpacity={0.8}
//               >
//                 <Text style={styles.modalButtonTextSecondary}>Got it</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.modalButton, styles.modalButtonPrimary]}
//                 onPress={() => setShowAutoPopup(false)}
//                 activeOpacity={0.8}
//               >
//                 <Text style={styles.modalButtonTextPrimary}>Okay</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal> */}
//     </View>
//   );
// }

// /* ---------- Small components ---------- */

// function CategoryGroupCard({ title, expanded, onToggle, items }) {
//   return (
//     <View style={styles.categoryGroupContainer}>
//       <View
//         style={[
//           styles.categoryHeaderRow,
//           !expanded && styles.categoryHeaderOnly,
//         ]}
//       >
//         <View style={styles.categoryHeaderLeft}>
//           <Ionicons name="reorder-three-outline" size={18} color="#9FB4FF" />
//           <Text style={styles.categoryTitle}>{title}</Text>
//         </View>
//         <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
//           <Ionicons
//             name={expanded ? "chevron-up" : "chevron-down"}
//             size={16}
//             color="#9FB4FF"
//           />
//         </TouchableOpacity>
//       </View>

//       {expanded && (
//         <View style={styles.categoryInnerCard}>
//           {items.map((item, index) => {
//             const isLast = index === items.length - 1;
//             return (
//               <View
//                 key={`${item.label}-${index}`}
//                 style={[
//                   styles.categoryItemRow,
//                   !isLast && styles.categoryItemBorder,
//                 ]}
//               >
//                 <View style={styles.categoryItemLeft}>
//                   {/* Left vertical bar to mimic screenshot */}
//                   <View style={styles.categoryItemBar} />
//                   <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     {item.type === "ion" ? (
//                       <Ionicons
//                         name={item.icon}
//                         size={14}
//                         color="#9FB4FF"
//                         style={{ marginRight: 6 }}
//                       />
//                     ) : null}
//                     <Text style={styles.categoryItemLabel}>
//                       {item.type === "text" ? `# ${item.label}` : item.label}
//                     </Text>
//                   </View>
//                 </View>
//                 <Ionicons
//                   name="chevron-forward"
//                   size={14}
//                   color="#9FB4FF"
//                 />
//               </View>
//             );
//           })}
//         </View>
//       )}
//     </View>
//   );
// }

// function CollapsedCategoryCard({ title }) {
//   return (
//     <View style={styles.collapsedCard}>
//       <View style={styles.categoryHeaderLeft}>
//         <Ionicons name="reorder-three-outline" size={18} color="#9FB4FF" />
//         <Text style={styles.categoryTitle}>{title}</Text>
//       </View>
//     </View>
//   );
// }

// /* ---------- Styles ---------- */

// const CARD_RADIUS = 18;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020821", // deep navy
//   },

//   fakeStatusBar: {
//     marginTop: 8 + (Platform.OS === "ios" ? 12 : StatusBar.currentHeight || 0),
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   timeText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   fakeStatusIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   fakeIcon: {
//     marginLeft: 6,
//   },

//   scrollContent: {
//     paddingBottom: 32,
//     paddingHorizontal: 18,
//   },

//   headerRow: {
//     marginTop: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//      marginTop:50,
//      marginBottom:10,
//   },
//   headerTitle: {
//     color: "#ffffff",
//     fontSize: 20,
//     fontWeight: "600",
//   },

//   /* Category group cards */

//   categoryGroupContainer: {
//     marginTop: 20,
//   },

//   categoryHeaderRow: {
//     borderRadius: 15,
//     hight:52,
//     backgroundColor: "#071739",
//     borderWidth: 1,
//     borderColor: "#132652",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   categoryHeaderOnly: {
//     // when collapsed, no extra inner block
//   },

//   categoryHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   categoryTitle: {
//     color: "#ffffff",
//     fontSize: 14,
//     marginLeft: 10,
//     fontWeight: "500",
//   },

//   categoryInnerCard: {
//     marginTop: 6,
//     borderRadius: 15,
//     backgroundColor: "#071739",
//     borderWidth: 1,
//     borderColor: "#3154BA",
//     overflow: "hidden",
//     hight:52,
//   },

//   categoryItemRow: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   categoryItemBorder: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "rgba(255,255,255,0.06)",
//   },

//   categoryItemLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },

//   categoryItemBar: {
//     width: 2,
//     height: "100%",
//     borderRadius: 15,
//     backgroundColor: "#264BFF",
//     marginRight: 10,
//   },

//   categoryItemLabel: {
//     color: "#ffffff",
//     fontSize: 13,
//   },

//   /* Collapsed card for single category */

//   collapsedCard: {
//     marginTop: 20,
//     borderRadius: 15,
//     backgroundColor: "#071739",
//     borderWidth: 1,
//     borderColor: "#3154BA",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   /* Auto-sort toggle card */

//   autoSortCard: {
//     marginTop: 24,
//     borderRadius: 15,
//     hight:52,
//     backgroundColor: "#071739",
//     borderWidth: 1,
//     borderColor: "#3154BA",
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   autoSortLabel: {
//     color: "#ffffff",
//     fontSize: 13,
//   },

//   /* Actions (Create Category / Create Space) */
//   actionsContainer: {
//     marginTop: 20,
//   },
//   actionCard: {
//     borderRadius: 15,
//     hight:52,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#3154BA",
//     backgroundColor: "#071739",
//   },
//   actionCardPrimary: {
//     // slightly highlighted
//     backgroundColor: "#0E294B",
//   },
//   actionCardSecondary: {
//     backgroundColor: "#071739",
//   },
//   actionRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   actionText: {
//     color: "#ffffff",
//     fontSize: 14,
//     marginLeft: 10,
//     fontWeight: "500",
//   },

//   /* Save + reset */

//   saveButtonWrapper: {
//     marginTop: 8,
//     borderRadius: CARD_RADIUS,
//     overflow: "hidden",
//   },
//   saveGradient: {
//     paddingVertical: 13,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   saveText: {
//     color: "#ffffff",
//     fontSize: 15,
//     fontWeight: "600",
//   },
//   resetText: {
//     marginTop: 10,
//     textAlign: "center",
//     color: "rgba(255,255,255,0.6)",
//     fontSize: 12,
//   },

//   /* Modal styles */
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(1,6,20,0.7)",
//     justifyContent: "flex-end", // appear from bottom like screenshot
//     padding: 20,
//   },
//   modalCard: {
//     backgroundColor: "#06152B",
//     borderRadius: 20,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: "#132652",
//     shadowColor: "#000",
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//   },
//   modalTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   modalBody: {
//     color: "rgba(255,255,255,0.85)",
//     fontSize: 13,
//     lineHeight: 18,
//     marginBottom: 16,
//   },
//   modalButtonsRow: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   modalButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     minWidth: 90,
//     alignItems: "center",
//     marginLeft: 10,
//   },
//   modalButtonPrimary: {
//     backgroundColor: "#355DFF",
//   },
//   modalButtonSecondary: {
//     backgroundColor: "transparent",
//     borderWidth: 1,
//     borderColor: "#355DFF",
//   },
//   modalButtonTextPrimary: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   modalButtonTextSecondary: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function V24({ navigation }) {
  const [autoSort, setAutoSort] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(true);
  const [voiceExpanded, setVoiceExpanded] = useState(true);
  const [announceExpanded, setAnnounceExpanded] = useState(true);

  const [showAutoPopup, setShowAutoPopup] = useState(false);

  const handleBack = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const onToggleAutoSort = (value) => {
    setAutoSort(value);

    if (value) {
      setShowAutoPopup(true);
    } else {
      setShowAutoPopup(false);
    }
  };

  const openCreateCategory = () => {
    navigation?.navigate("Setting_category_create_category");
  };

  const openCreateSpace = () => {
    navigation?.navigate("Setting_category_create_Space");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Categories</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Chat Spaces */}
        <CategoryGroupCard
          title="Chat Spaces"
          expanded={chatExpanded}
          onToggle={() => setChatExpanded((p) => !p)}
          items={[
            { icon: "#", label: "general", type: "text" },
            { icon: "#", label: "coffee-talk", type: "text" },
            { icon: "#", label: "memes", type: "text" },
          ]}
        />

        {/* Voice Zones */}
        <CategoryGroupCard
          title="Voice Zones"
          expanded={voiceExpanded}
          onToggle={() => setVoiceExpanded((p) => !p)}
          items={[
            { icon: "mic-outline", label: "Hangout", type: "ion" },
            { icon: "mic-outline", label: "Game VC", type: "ion" },
          ]}
        />

        {/* Gaming Area */}
        <CollapsedCategoryCard title="Gaming Area" />

        {/* Announcements */}
        <CategoryGroupCard
          title="Announcements"
          expanded={announceExpanded}
          onToggle={() => setAnnounceExpanded((p) => !p)}
          items={[
            { icon: "|", label: "global-news", type: "bar" },
            { icon: "|", label: "nexus-updates", type: "bar" },
          ]}
        />

        {/* Auto Sort Switch */}
        <View style={styles.autoSortCard}>
          <Text style={styles.autoSortLabel}>Auto-Sort Spaces by Category</Text>

          <Switch
            value={autoSort}
            onValueChange={onToggleAutoSort}
            trackColor={{ false: "#1E293B", true: "#4479FF" }}
            thumbColor="#fff"
          />
        </View>

        {/* Auto Sort Actions */}
        {autoSort && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionCard, styles.actionCardPrimary]}
              activeOpacity={0.85}
              onPress={openCreateCategory}
            >
              <View style={styles.actionRow}>
                <Ionicons name="albums-outline" size={18} color="#fff" />
                <Text style={styles.actionText}>Create Category</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, styles.actionCardSecondary]}
              activeOpacity={0.85}
              onPress={openCreateSpace}
            >
              <View style={styles.actionRow}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.actionText}>Create Space</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ---------- Modal Working ---------- */}
      <Modal
        visible={showAutoPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAutoPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Auto-Sort Enabled</Text>

            <Text style={styles.modalBody}>
              When Auto-Sort is on, new spaces will automatically be grouped
              under their respective categories. You can turn this off anytime
              from this screen.
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setShowAutoPopup(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonTextSecondary}>Got it</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={() => setShowAutoPopup(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonTextPrimary}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* Components */

function CategoryGroupCard({ title, expanded, onToggle, items }) {
  return (
    <View style={styles.categoryGroupContainer}>
      <View
        style={[
          styles.categoryHeaderRow,
          !expanded && styles.categoryHeaderOnly,
        ]}
      >
        <View style={styles.categoryHeaderLeft}>
          <Ionicons name="reorder-three-outline" size={18} color="#9FB4FF" />
          <Text style={styles.categoryTitle}>{title}</Text>
        </View>

        <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="#9FB4FF"
          />
        </TouchableOpacity>
      </View>

      {expanded && (
        <View style={styles.categoryInnerCard}>
          {items.map((item, index) => {
            const last = index === items.length - 1;

            return (
              <View
                key={index}
                style={[styles.categoryItemRow, !last && styles.categoryItemBorder]}
              >
                <View style={styles.categoryItemLeft}>
                  <View style={styles.categoryItemBar} />

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {item.type === "ion" && (
                      <Ionicons
                        name={item.icon}
                        size={14}
                        color="#9FB4FF"
                        style={{ marginRight: 6 }}
                      />
                    )}

                    <Text style={styles.categoryItemLabel}>
                      {item.type === "text" ? `# ${item.label}` : item.label}
                    </Text>
                  </View>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color="#9FB4FF"
                />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

function CollapsedCategoryCard({ title }) {
  return (
    <View style={styles.collapsedCard}>
      <View style={styles.categoryHeaderLeft}>
        <Ionicons name="reorder-three-outline" size={18} color="#9FB4FF" />
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
    </View>
  );
}

/* ---------- Styles ---------- */

const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020821",
  },

  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 18,
  },

  headerRow: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  categoryGroupContainer: {
    marginTop: 20,
  },

  categoryHeaderRow: {
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#132652",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoryTitle: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "500",
  },

  categoryInnerCard: {
    marginTop: 6,
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#3154BA",
    overflow: "hidden",
  },

  categoryItemRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  categoryItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  categoryItemBar: {
    width: 2,
    height: "100%",
    backgroundColor: "#071739",
    marginRight: 10,
    borderRadius: 15,
    borderColor:"#264BFF",
  },

  categoryItemLabel: {
    color: "#fff",
    fontSize: 13,
  },

  collapsedCard: {
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#3154BA",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  autoSortCard: {
    marginTop: 24,
    borderRadius: 15,
    backgroundColor: "#071739",
    borderWidth: 1,
    borderColor: "#3154BA",
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  autoSortLabel: {
    color: "#fff",
    fontSize: 13,
  },

  actionsContainer: {
    marginTop: 20,
  },

  actionCard: {
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3154BA",
    backgroundColor: "#071739",
  },

  actionCardPrimary: {
    backgroundColor: "#0E294B",
  },

  actionCardSecondary: {
    backgroundColor: "#071739",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "500",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(1,6,20,0.7)",
    justifyContent: "flex-end",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#06152B",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#264BFF",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  modalBody: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },

  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    minWidth: 90,
    alignItems: "center",
    marginLeft: 10,
  },

  modalButtonPrimary: {
    backgroundColor: "#071739",
  },

  modalButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#264BFF",
  },

  modalButtonTextPrimary: {
    color: "#fff",
    fontWeight: "600",
  },

  modalButtonTextSecondary: {
    color: "#fff",
    fontWeight: "600",
  },
});
