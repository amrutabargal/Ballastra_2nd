
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   Modal,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Swipeable } from "react-native-gesture-handler";

// const { width, height } = Dimensions.get("window");

// const AVATAR_URL =
//   "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200"; // temp online image

// const TABS = [
//   { key: "all", label: "All" },
//   { key: "inbox", label: "Inbox", badge: 15 },
//   { key: "orbitors", label: "Orbitors", badge: 10 },
//   { key: "archived", label: "Archived" },
// ];

// /* ---------- DATA ---------- */

// // ALL tab – same as screenshot
// const ALL_TODAY = [
//   {
//     id: "t1",
//     type: "joined",
//     name: "NicholasChan",
//     room: "Final Presentation",
//     time: "now",
//     highlight: true,
//   },
//   {
//     id: "t2",
//     type: "joined",
//     name: "NicholasChan",
//     room: "Final Presentation",
//     time: "now",
//     highlight: false,
//   },
// ];

// const ALL_YESTERDAY = [
//   {
//     id: "y1",
//     type: "joined",
//     name: "NicholasChan",
//     room: "Final Presentation",
//     time: "8 min ago",
//   },
//   {
//     id: "y2",
//     type: "joined",
//     name: "NicholasChan",
//     room: "Final Presentation",
//     time: "8 min ago",
//   },
//   {
//     id: "y3",
//     type: "invite",
//     name: "NicholasChan",
//     room: "Final Presentation",
//     time: "8 min ago",
//     initialState: "pending",
//   },
//   {
//     id: "y4",
//     type: "invite",
//     name: "NicholasChan",
//     room: "Final Presentation",
//     time: "8 min ago",
//     initialState: "pending",
//   },
//   {
//     id: "y5",
//     type: "invite",
//     name: "NicholasChan",
//     room: "Final Presentation",
//     time: "8 min ago",
//     initialState: "disabled", // last grey row
//   },
// ];

// // Inbox – messages badge
// const INBOX_NOTIFS = Array.from({ length: 7 }).map((_, i) => ({
//   id: `i${i}`,
//   kind: "inbox",
//   name: "NicholasChan",
//   room: "Final Presentation",
//   time: "now",
//   messagePreview: "How are You Bro!",
// }));

// // Orbitors – started orbitors you
// const ORBITORS_TODAY = Array.from({ length: 3 }).map((_, i) => ({
//   id: `oT${i}`,
//   name: "NicholasChan",
//   time: "8 min ago",
//   state: "enabled",
// }));
// const ORBITORS_YESTERDAY = [
//   ...Array.from({ length: 3 }).map((_, i) => ({
//     id: `oY${i}`,
//     name: "NicholasChan",
//     time: "8 min ago",
//     state: "enabled",
//   })),
//   {
//     id: "oYLast",
//     name: "NicholasChan",
//     time: "8 min ago",
//     state: "disabled",
//   },
// ];

// // Archived – सगळे faded
// const ARCHIVED_LIST = Array.from({ length: 7 }).map((_, i) => ({
//   id: `ar${i}`,
//   name: "NicholasChan",
//   time: "8 min ago",
//   state: "disabled",
// }));

// /* ---------- COMPONENT ---------- */

// export default function NotificationsScreen({ navigation }) {
//   const [activeTab, setActiveTab] = useState("all");

//   // ALL list state (delete साठी)
//   const [allToday, setAllToday] = useState(ALL_TODAY);
//   const [allYesterday, setAllYesterday] = useState(ALL_YESTERDAY);

//   // इतर tabs साठी state
//   const [inboxList, setInboxList] = useState(INBOX_NOTIFS);
//   const [orbitorsToday, setOrbitorsToday] = useState(ORBITORS_TODAY);
//   const [orbitorsYesterday, setOrbitorsYesterday] =
//     useState(ORBITORS_YESTERDAY);
//   const [archivedList, setArchivedList] = useState(ARCHIVED_LIST);

//   // invites state
//   const initialInviteState = {};
//   [...ALL_YESTERDAY.filter((x) => x.type === "invite")].forEach((item) => {
//     initialInviteState[item.id] = item.initialState || "pending";
//   });
//   const [inviteStatus, setInviteStatus] = useState(initialInviteState);

//   // delete confirm + undo
//   const [confirmVisible, setConfirmVisible] = useState(false);
//   const [pendingDelete, setPendingDelete] = useState(null); // {section, id}
//   const [undoData, setUndoData] = useState(null); // {section, item}

//   // MORE bottom sheet
//   const [moreVisible, setMoreVisible] = useState(false);
//   const [moreTarget, setMoreTarget] = useState(null); // notification item

//   // Remove Orbitors popup
//   const [removeVisible, setRemoveVisible] = useState(false);

//   // Archive confirm popup
//   const [archiveVisible, setArchiveVisible] = useState(false);

//   // Block popup
//   const [blockVisible, setBlockVisible] = useState(false);

//   // SETTINGS bottom popup
//   const [settingsVisible, setSettingsVisible] = useState(false);

//   const onInviteAction = (id, action) => {
//     if (inviteStatus[id] === "disabled") return;
//     setInviteStatus((prev) => ({
//       ...prev,
//       [id]: action, // 'approved' / 'declined'
//     }));
//   };

//   /* ----- All tab render helpers ----- */

//   const JoinedLine = ({ item }) => (
//     <Text style={styles.mainLine}>
//       <Text style={styles.nameText}>{item.name} </Text>
//       <Text style={styles.lightText}>joined to </Text>
//       <Text style={styles.boldRoom}>{item.room}</Text>
//     </Text>
//   );

//   const InviteLine = ({ item }) => (
//     <Text style={styles.mainLine}>
//       <Text style={styles.nameText}>{item.name} </Text>
//       <Text style={styles.lightText}>invites you </Text>
//       <Text style={styles.boldRoom}>{item.room}</Text>
//     </Text>
//   );

//   const renderInviteButtons = (item) => {
//     const status = inviteStatus[item.id];
//     const disabled =
//       status === "disabled" || status === "approved" || status === "declined";

//     const declineDisabled = disabled;
//     const approveDisabled = disabled;

//     const declineStyleExtra =
//       status === "declined" ? styles.actionBtnSelectedBorder : null;
//     const approveStyleExtra =
//       status === "approved" ? styles.actionBtnSelectedFill : null;

//     return (
//       <View style={styles.actionsRow}>
//         <TouchableOpacity
//           activeOpacity={declineDisabled ? 1 : 0.85}
//           style={[
//             styles.actionBtn,
//             styles.declineBtn,
//             declineStyleExtra,
//             declineDisabled && styles.disabledBorder,
//           ]}
//           onPress={() => onInviteAction(item.id, "declined")}
//         >
//           <Text
//             style={[
//               styles.actionText,
//               styles.declineText,
//               declineDisabled && styles.disabledText,
//             ]}
//           >
//             Deny
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={approveDisabled ? 1 : 0.85}
//           style={[
//             styles.actionBtn,
//             styles.approveBtn,
//             approveStyleExtra,
//             approveDisabled && styles.disabledApprove,
//           ]}
//           onPress={() => onInviteAction(item.id, "approved")}
//         >
//           <Text
//             style={[
//               styles.actionText,
//               styles.approveText,
//               approveDisabled && styles.disabledText,
//             ]}
//           >
//             Approve
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const openDeleteConfirm = (section, id) => {
//     setPendingDelete({ section, id });
//     setConfirmVisible(true);
//   };

//   const handleConfirmDelete = () => {
//     if (!pendingDelete) return;
//     const { section, id } = pendingDelete;

//     const removeFrom = (list, setList) => {
//       setList((prev) => {
//         const idx = prev.findIndex((n) => n.id === id);
//         if (idx === -1) return prev;
//         const removed = prev[idx];
//         setUndoData({ section, item: removed });
//         const arr = [...prev];
//         arr.splice(idx, 1);
//         return arr;
//       });
//     };

//     if (section === "allToday") {
//       removeFrom(allToday, setAllToday);
//     } else if (section === "allYesterday") {
//       removeFrom(allYesterday, setAllYesterday);
//     } else if (section === "inbox") {
//       removeFrom(inboxList, setInboxList);
//     } else if (section === "orbitorsToday") {
//       removeFrom(orbitorsToday, setOrbitorsToday);
//     } else if (section === "orbitorsYesterday") {
//       removeFrom(orbitorsYesterday, setOrbitorsYesterday);
//     } else if (section === "archived") {
//       removeFrom(archivedList, setArchivedList);
//     }

//     setPendingDelete(null);
//     setConfirmVisible(false);
//   };

//   const handleCancelDelete = () => {
//     setPendingDelete(null);
//     setConfirmVisible(false);
//   };

//   const handleUndo = () => {
//     if (!undoData) return;
//     const { section, item } = undoData;

//     if (section === "allToday") {
//       setAllToday((prev) => [item, ...prev]);
//     } else if (section === "allYesterday") {
//       setAllYesterday((prev) => [item, ...prev]);
//     } else if (section === "inbox") {
//       setInboxList((prev) => [item, ...prev]);
//     } else if (section === "orbitorsToday") {
//       setOrbitorsToday((prev) => [item, ...prev]);
//     } else if (section === "orbitorsYesterday") {
//       setOrbitorsYesterday((prev) => [item, ...prev]);
//     } else if (section === "archived") {
//       setArchivedList((prev) => [item, ...prev]);
//     }

//     setUndoData(null);
//   };

//   const openMoreSheet = (item) => {
//     setMoreTarget(item);
//     setMoreVisible(true);
//   };

//   const closeMoreSheet = () => setMoreVisible(false);

//   const openRemoveModal = () => {
//     setMoreVisible(false);
//     setRemoveVisible(true);
//   };

//   const closeRemoveModal = () => setRemoveVisible(false);

//   const openArchiveModal = () => {
//     setMoreVisible(false);
//     setArchiveVisible(true);
//   };

//   const closeArchiveModal = () => setArchiveVisible(false);

//   const openBlockModal = () => {
//     setMoreVisible(false);
//     setBlockVisible(true);
//   };

//   const closeBlockModal = () => setBlockVisible(false);

//   const renderRightActions = (sectionKey, item) => (
//     <View style={styles.swipeActionsContainer}>
//       <TouchableOpacity
//         style={styles.swipeDeleteBtn}
//         onPress={() => openDeleteConfirm(sectionKey, item.id)}
//         activeOpacity={0.85}
//       >
//         <Ionicons name="trash-outline" size={20} color="#FF5B5B" />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.swipeMoreBtn}
//         activeOpacity={0.8}
//         onPress={() => openMoreSheet(item)}
//       >
//         <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );

//   const renderAllRow = (item, sectionKey) => {
//     const isHighlight = item.highlight;

//     return (
//       <Swipeable
//         key={item.id}
//         overshootRight={false}
//         renderRightActions={() => renderRightActions(sectionKey, item)}
//       >
//         <View
//           style={[
//             styles.allRow,
//             isHighlight && styles.allRowHighlight,
//             item.type === "invite" && styles.allRowWithButtons,
//           ]}
//         >
//           <View style={styles.row}>
//             <View style={styles.avatar}>
//               <Image source={{ uri: AVATAR_URL }} style={styles.avatarImage} />
//             </View>

//             <View style={styles.textBlock}>
//               {item.type === "joined" ? (
//                 <JoinedLine item={item} />
//               ) : (
//                 <InviteLine item={item} />
//               )}
//               <Text style={styles.timeText}>{item.time}</Text>
//             </View>
//           </View>

//           {item.type === "invite" && renderInviteButtons(item)}
//         </View>
//       </Swipeable>
//     );
//   };

//   /* ----- Inbox tab ----- */
//   const renderInboxRow = (item) => (
//     <Swipeable
//       key={item.id}
//       overshootRight={false}
//       renderRightActions={() => renderRightActions("inbox", item)}
//     >
//       <View style={[styles.notificationCard, styles.inboxCard]}>
//         <View style={styles.row}>
//           <View style={styles.avatarWrapper}>
//             <View style={styles.avatar}>
//               <Image
//                 source={{ uri: AVATAR_URL }}
//                 style={styles.avatarImage}
//               />
//             </View>
//             <View style={styles.redDot} />
//           </View>
//           <View style={styles.textBlock}>
//             <Text style={styles.mainLine}>
//               <Text style={styles.nameText}>{item.name} </Text>
//               <Text style={styles.lightText}>joined to </Text>
//               <Text style={styles.boldRoom}>{item.room}</Text>
//             </Text>
//             <Text style={styles.timeText}>{item.time}</Text>
//             <View style={styles.messageBadge}>
//               <Text style={styles.messageBadgeText}>
//                 Messages :- {item.messagePreview}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Swipeable>
//   );

//   /* ----- Orbitors / Archived ----- */
//   const renderOrbitorsItem = (item, isArchived = false, sectionKey) => {
//     const disabled = item.state === "disabled" || isArchived;

//     return (
//       <Swipeable
//         key={item.id}
//         overshootRight={false}
//         renderRightActions={() => renderRightActions(sectionKey, item)}
//       >
//         <View style={[styles.orbitorRow, isArchived && styles.archivedRow]}>
//           <View style={styles.rowLeft}>
//             <View style={styles.avatar}>
//               <Image
//                 source={{ uri: AVATAR_URL }}
//                 style={styles.avatarImage}
//               />
//             </View>
//             <View style={styles.textBlock}>
//               <Text style={styles.orbitorMainText}>
//                 <Text
//                   style={[styles.nameText, disabled && styles.archivedText]}
//                 >
//                   {item.name}{" "}
//                 </Text>
//                 <Text
//                   style={[styles.lightText, disabled && styles.archivedText]}
//                 >
//                   started orbitors you.
//                 </Text>
//               </Text>
//               <Text
//                 style={[styles.timeText, disabled && styles.archivedText]}
//               >
//                 {item.time}
//               </Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             activeOpacity={disabled ? 1 : 0.85}
//             style={[
//               styles.orbitBackBtn,
//               (disabled || isArchived) && styles.orbitBackBtnDisabled,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.orbitBackText,
//                 (disabled || isArchived) && styles.orbitBackTextDisabled,
//               ]}
//             >
//               Orbitors Back
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Swipeable>
//     );
//   };

//   /* ----- Tab content ----- */
//   const renderUndoBanner = () =>
//     undoData && (
//       <View style={styles.undoBanner}>
//         <View style={styles.undoLeft}>
//           <Ionicons
//             name="trash-outline"
//             size={18}
//             color="#FF5B5B"
//             style={{ marginRight: 8 }}
//           />
//           <Text style={styles.undoText}>Notifications Deleted</Text>
//         </View>
//         <TouchableOpacity onPress={handleUndo}>
//           <Text style={styles.undoButtonText}>Undo</Text>
//         </TouchableOpacity>
//       </View>
//     );

//   const renderContent = () => {
//     if (activeTab === "inbox") {
//       return (
//         <>
//           {renderUndoBanner()}
//           <Text style={styles.sectionLabelToday}>Today</Text>
//           {inboxList.map(renderInboxRow)}
//         </>
//       );
//     }

//     if (activeTab === "orbitors") {
//       return (
//         <>
//           {renderUndoBanner()}
//           <Text style={styles.sectionLabelToday}>Today</Text>
//           {orbitorsToday.map((it) =>
//             renderOrbitorsItem(it, false, "orbitorsToday")
//           )}
//           <Text style={styles.sectionLabel}>Yesterday</Text>
//           {orbitorsYesterday.map((it) =>
//             renderOrbitorsItem(it, false, "orbitorsYesterday")
//           )}
//         </>
//       );
//     }

//     if (activeTab === "archived") {
//       return (
//         <>
//           {renderUndoBanner()}
//           <Text style={styles.sectionLabelToday}>Today</Text>
//           {archivedList.map((it) => renderOrbitorsItem(it, true, "archived"))}
//         </>
//       );
//     }

//     // ALL tab
//     return (
//       <>
//         {renderUndoBanner()}
//         <Text style={styles.sectionLabelToday}>Today</Text>
//         {allToday.map((item) => renderAllRow(item, "allToday"))}
//         <Text style={styles.sectionLabel}>Yesterday</Text>
//         {allYesterday.map((item) => renderAllRow(item, "allYesterday"))}
//       </>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#020816" />

//       <View style={styles.container}>
//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <Text style={styles.headerTitle}>Notifications</Text>
//           <TouchableOpacity onPress={() => setSettingsVisible(true)}>
//             <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>

//         {/* TABS */}
//         <View style={styles.tabsContainer}>
//           {TABS.map((tab) => {
//             const isActive = activeTab === tab.key;
//             return (
//               <TouchableOpacity
//                 key={tab.key}
//                 style={[styles.tabChip, isActive && styles.tabChipActive]}
//                 onPress={() => setActiveTab(tab.key)}
//                 activeOpacity={0.9}
//               >
//                 <Text
//                   style={[styles.tabText, isActive && styles.tabTextActive]}
//                 >
//                   {tab.label}
//                 </Text>
//                 {tab.badge != null && (
//                   <View
//                     style={[styles.badge, isActive && styles.badgeActive]}
//                   >
//                     <Text
//                       style={[
//                         styles.badgeText,
//                         isActive && styles.badgeTextActive,
//                       ]}
//                     >
//                       {tab.badge}
//                     </Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <View style={styles.divider} />

//         {/* LIST */}
//         <ScrollView
//           style={styles.scrollArea}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 90 }}
//         >
//           {renderContent()}
//         </ScrollView>
//       </View>

//       {/* DELETE CONFIRM MODAL */}
//       <Modal
//         visible={confirmVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={handleCancelDelete}
//       >
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalCard}>
//             <Text style={styles.modalTitle}>
//               Are You Sure Want To Delete ?
//             </Text>

//             <TouchableOpacity
//               style={styles.modalDeleteBtn}
//               onPress={handleConfirmDelete}
//               activeOpacity={0.85}
//             >
//               <Ionicons
//                 name="trash-outline"
//                 size={18}
//                 color="#FF5B5B"
//                 style={{ marginRight: 6 }}
//               />
//               <Text style={styles.modalDeleteText}>Delete</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.modalCancelBtn}
//               onPress={handleCancelDelete}
//               activeOpacity={0.85}
//             >
//               <Text style={styles.modalCancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* MORE BOTTOM SHEET */}
//       <Modal
//         visible={moreVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closeMoreSheet}
//       >
//         <View style={styles.moreBackdrop}>
//           {/* tap on dark area to close */}
//           <TouchableOpacity
//             style={{ flex: 1 }}
//             activeOpacity={1}
//             onPress={closeMoreSheet}
//           />
//           <View style={styles.moreSheet}>
//             <TouchableOpacity
//               style={styles.moreBtn}
//               activeOpacity={0.85}
//               onPress={openRemoveModal}
//             >
//               <View style={styles.moreLeft}>
//                 <Ionicons
//                   name="person-remove-outline"
//                   size={18}
//                   color="#FFFFFF"
//                   style={{ marginRight: 8 }}
//                 />
//                 <Text style={styles.moreText}>Remove Orbitors</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.moreBtn}
//               activeOpacity={0.85}
//               onPress={openArchiveModal}
//             >
//               <View style={styles.moreLeft}>
//                 <Ionicons
//                   name="archive-outline"
//                   size={18}
//                   color="#FFFFFF"
//                   style={{ marginRight: 8 }}
//                 />
//                 <Text style={styles.moreText}>Archived</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.moreBtn, styles.moreBtnRed]}
//               activeOpacity={0.85}
//               onPress={openBlockModal}
//             >
//               <View style={styles.moreLeft}>
//                 <Ionicons
//                   name="ban-outline"
//                   size={18}
//                   color="#FF4B4B"
//                   style={{ marginRight: 8 }}
//                 />
//                 <Text style={styles.moreTextRed}>
//                   {`Block ${moreTarget?.name ?? "User"}`}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* REMOVE ORBITORS POPUP */}
//       <Modal
//         visible={removeVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closeRemoveModal}
//       >
//         <View style={styles.removeBackdrop}>
//           <View style={styles.removeCard}>
//             <Text style={styles.removeTitle}>Remove Orbitors</Text>
//             <View style={styles.removeDivider} />

//             <View style={styles.removeAvatarWrap}>
//               <View style={styles.removeAvatar}>
//                 <Image
//                   source={{ uri: AVATAR_URL }}
//                   style={styles.removeAvatarImage}
//                 />
//               </View>
//               <Text style={styles.removeUserName}>
//                 {moreTarget?.name ?? "NicholasChan"}
//               </Text>
//             </View>

//             <TouchableOpacity
//               style={styles.removeDangerBtn}
//               activeOpacity={0.85}
//               onPress={closeRemoveModal}
//             >
//               <Ionicons
//                 name="person-remove-outline"
//                 size={18}
//                 color="#FF4B4B"
//                 style={{ marginRight: 8 }}
//               />
//               <Text style={styles.removeDangerText}>
//                 {`Remove ${moreTarget?.name ?? "User"}`}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.removeCancelBtn}
//               activeOpacity={0.85}
//               onPress={closeRemoveModal}
//             >
//               <Text style={styles.removeCancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* ARCHIVE CONFIRM POPUP */}
//       <Modal
//         visible={archiveVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closeArchiveModal}
//       >
//         <View style={styles.archiveBackdrop}>
//           <View style={styles.archiveCard}>
//             <Text style={styles.archiveTitle}>
//               Are You Sure Want To Archived ?
//             </Text>
//             <View style={styles.archiveDivider} />
//             <TouchableOpacity
//               style={styles.archiveBtn}
//               activeOpacity={0.85}
//               onPress={closeArchiveModal} // नंतर logic add करू शकतोस
//             >
//               <Text style={styles.archiveBtnText}>Yes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.archiveBtn, styles.archiveBtnBottom]}
//               activeOpacity={0.85}
//               onPress={closeArchiveModal}
//             >
//               <Text style={styles.archiveBtnText}>No</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* BLOCK ORBITORS POPUP */}
//       <Modal
//         visible={blockVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closeBlockModal}
//       >
//         <View style={styles.blockBackdrop}>
//           <View style={styles.blockCard}>
//             <Text style={styles.blockTitle}>Block Orbitors</Text>
//             <View style={styles.blockDivider} />

//             <View style={styles.blockAvatarWrap}>
//               <View style={styles.blockAvatar}>
//                 <Image
//                   source={{ uri: AVATAR_URL }}
//                   style={styles.blockAvatarImage}
//                 />
//               </View>
//               <Text style={styles.blockUserName}>
//                 {moreTarget?.name ?? "NicholasChan"}
//               </Text>
//             </View>

//             <TouchableOpacity
//               style={styles.blockDangerBtn}
//               activeOpacity={0.85}
//               onPress={closeBlockModal}
//             >
//               <Ionicons
//                 name="ban-outline"
//                 size={18}
//                 color="#FF4B4B"
//                 style={{ marginRight: 8 }}
//               />
//               <Text style={styles.blockDangerText}>
//                 {`Block ${moreTarget?.name ?? "User"}`}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.blockCancelBtn}
//               activeOpacity={0.85}
//               onPress={closeBlockModal}
//             >
//               <Text style={styles.blockCancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* SETTINGS BOTTOM POPUP */}
//       <Modal
//         visible={settingsVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setSettingsVisible(false)}
//       >
//         <View style={styles.settingsBackdrop}>
//           {/* dark वर tap = बंद */}
//           <TouchableOpacity
//             style={{ flex: 1 }}
//             activeOpacity={1}
//             onPress={() => setSettingsVisible(false)}
//           />

//           <View style={styles.settingsSheet}>
//             <View style={styles.settingsCard}>
//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 style={styles.settingsRowBtn}
//                 onPress={() => {
//                   setSettingsVisible(false);
//                   navigation.navigate("Notification_popup"); // इथे तुझा settings screen नाव
//                 }}
//               >
//                 <View style={styles.settingsRowLeft}>
//                   <View style={styles.settingsIconWrap}>
//                     <Ionicons
//                       name="settings-outline"
//                       size={16}
//                       color="#FFFFFF"
//                     />
//                   </View>
//                   <Text style={styles.settingsRowText}>
//                     Notifications Settings
//                   </Text>
//                 </View>

//                 <Ionicons
//                   name="chevron-forward"
//                   size={18}
//                   color="#FFFFFF"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// /* ---------- STYLES ---------- */

// const BG = "#020816";

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: BG,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: BG,
//     paddingHorizontal: 18,
//     paddingTop: 6,
//   },

//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 18,
//   },
//   headerTitle: {
//     color: "#FFFFFF",
//     fontSize: width * 0.055,
//     fontWeight: "700",
//   },

//   /* tabs */
//   tabsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 14,
//   },
//   tabChip: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 999,
//     marginRight: 8,
//     backgroundColor: "#050F25",
//   },
//   tabChipActive: {
//     backgroundColor: "#101B3C",
//   },
//   tabText: {
//     color: "#7F8AA7",
//     fontSize: width * 0.035,
//     fontWeight: "500",
//   },
//   tabTextActive: {
//     color: "#FFFFFF",
//   },
//   badge: {
//     marginLeft: 6,
//     paddingHorizontal: 7,
//     paddingVertical: 1,
//     borderRadius: 999,
//     borderWidth: 1,
//     borderColor: "#384261",
//   },
//   badgeActive: {
//     backgroundColor: "#2E5BFF",
//     borderColor: "transparent",
//   },
//   badgeText: {
//     color: "#7F8AA7",
//     fontSize: width * 0.031,
//     fontWeight: "500",
//   },
//   badgeTextActive: {
//     color: "#FFFFFF",
//   },

//   divider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "rgba(255,255,255,0.12)",
//     marginBottom: 10,
//   },

//   scrollArea: {
//     flex: 1,
//   },

//   sectionLabelToday: {
//     color: "#FF5B5B",
//     fontSize: width * 0.034,
//     marginBottom: 10,
//   },
//   sectionLabel: {
//     color: "#7F8AA7",
//     fontSize: width * 0.034,
//     marginTop: 18,
//     marginBottom: 10,
//   },

//   /* ALL tab rows */
//   allRow: {
//     borderRadius: 0,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     backgroundColor: "transparent",
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "rgba(255,255,255,0.06)",
//   },
//   allRowHighlight: {
//     backgroundColor: "#071F4A",
//   },
//   allRowWithButtons: {
//     paddingBottom: 14,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   avatarWrapper: {
//     marginRight: 10,
//   },

//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#25C4FF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//     overflow: "hidden",
//   },
//   avatarImage: {
//     width: "100%",
//     height: "100%",
//   },
//   redDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#FF4B4B",
//     position: "absolute",
//     top: -1,
//     left: -1,
//     borderWidth: 2,
//     borderColor: "#071F4A",
//   },

//   textBlock: {
//     flex: 1,
//   },
//   mainLine: {
//     flexWrap: "wrap",
//   },
//   nameText: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//     fontSize: width * 0.037,
//   },
//   lightText: {
//     color: "#B3C3E7",
//     fontSize: width * 0.036,
//   },
//   boldRoom: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//     fontSize: width * 0.037,
//   },
//   timeText: {
//     marginTop: 2,
//     color: "#7F8AA7",
//     fontSize: width * 0.032,
//   },

//   /* inbox card */
//   notificationCard: {
//     backgroundColor: "#050F25",
//     borderRadius: 14,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 8,
//   },
//   inboxCard: {
//     backgroundColor: "#071F4A",
//   },

//   messageBadge: {
//     marginTop: 8,
//     alignSelf: "flex-start",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 10,
//     backgroundColor: "#3C465F",
//   },
//   messageBadgeText: {
//     color: "#E4E9F7",
//     fontSize: width * 0.032,
//   },

//   /* invite actions */
//   actionsRow: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   actionBtn: {
//     flex: 1,
//     paddingVertical: height * 0.014,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   declineBtn: {
//     borderWidth: 1,
//     borderColor: "#4F5A7C",
//     marginRight: 8,
//   },
//   approveBtn: {
//     backgroundColor: "#2E5BFF",
//     marginLeft: 8,
//   },
//   actionText: {
//     fontSize: width * 0.035,
//     fontWeight: "600",
//   },
//   declineText: {
//     color: "#FFFFFF",
//   },
//   approveText: {
//     color: "#FFFFFF",
//   },
//   disabledBorder: {
//     borderColor: "#2A334E",
//   },
//   disabledApprove: {
//     backgroundColor: "#1B243E",
//   },
//   disabledText: {
//     color: "#4F5A7C",
//   },
//   actionBtnSelectedBorder: {
//     borderColor: "#2E5BFF",
//   },
//   actionBtnSelectedFill: {
//     backgroundColor: "#2349D9",
//   },

//   /* orbitors / archived */
//   orbitorRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: "#050F25",
//     borderRadius: 14,
//     marginBottom: 8,
//   },
//   rowLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   orbitorMainText: {
//     flexWrap: "wrap",
//   },
//   orbitBackBtn: {
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 999,
//     backgroundColor: "#2E5BFF",
//   },
//   orbitBackBtnDisabled: {
//     backgroundColor: "#1C294A",
//   },
//   orbitBackText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.033,
//     fontWeight: "600",
//   },
//   orbitBackTextDisabled: {
//     color: "#7783A6",
//   },
//   archivedRow: {
//     opacity: 0.45,
//   },
//   archivedText: {
//     color: "#8B96B3",
//   },

//   /* swipe actions */
//   swipeActionsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: "100%",
//     backgroundColor: "#071F4A",
//     paddingRight: 10,
//   },
//   swipeDeleteBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#141B33",
//     marginRight: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#FF5B5B",
//     alignSelf: "center",
//   },
//   swipeMoreBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: "#141F33",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//   },

//   /* delete confirm modal */
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalCard: {
//     width: "80%",
//     borderRadius: 28,
//     paddingHorizontal: 20,
//     paddingVertical: 24,
//     backgroundColor: "#05122B",
//     borderWidth: 1,
//     borderColor: "rgba(120,142,255,0.5)",
//   },
//   modalTitle: {
//     color: "#FFFFFF",
//     fontSize: width * 0.04,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   modalDeleteBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 18,
//     paddingVertical: 10,
//     backgroundColor: "#1B1220",
//     borderWidth: 1,
//     borderColor: "#FF5B5B",
//     marginBottom: 12,
//   },
//   modalDeleteText: {
//     color: "#FF5B5B",
//     fontSize: width * 0.038,
//     fontWeight: "600",
//   },
//   modalCancelBtn: {
//     borderRadius: 18,
//     paddingVertical: 10,
//     backgroundColor: "#101B3C",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalCancelText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.038,
//     fontWeight: "600",
//   },

//   /* undo banner */
//   undoBanner: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#050F25",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#2E5BFF",
//   },
//   undoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   undoText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.035,
//   },
//   undoButtonText: {
//     color: "#2E5BFF",
//     fontSize: width * 0.036,
//     fontWeight: "600",
//   },

//   /* MORE bottom sheet */
//   moreBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "flex-end",
//   },
//   moreSheet: {
//     paddingHorizontal: 18,
//     paddingTop: 16,
//     paddingBottom: 28,
//     backgroundColor: "#050F25",
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     borderWidth: 1,
//     borderColor: "#243A7A",
//   },
//   moreBtn: {
//     borderRadius: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     marginBottom: 10,
//     backgroundColor: "#071F4A",
//   },
//   moreLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   moreText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.037,
//     fontWeight: "500",
//   },
//   moreBtnRed: {
//     backgroundColor: "#210910",
//     borderWidth: 1,
//     borderColor: "#FF4B4B",
//     marginTop: 8,
//   },
//   moreTextRed: {
//     color: "#FF4B4B",
//     fontSize: width * 0.037,
//     fontWeight: "600",
//   },

//   /* REMOVE ORBITORS POPUP */
//   removeBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   removeCard: {
//     width: "80%",
//     borderRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 22,
//     backgroundColor: "#050F25",
//     borderWidth: 1,
//     borderColor: "#243A7A",
//   },
//   removeTitle: {
//     color: "#FFFFFF",
//     fontSize: width * 0.04,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 14,
//   },
//   removeDivider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "rgba(255,255,255,0.16)",
//     marginBottom: 20,
//   },
//   removeAvatarWrap: {
//     alignItems: "center",
//     marginBottom: 18,
//   },
//   removeAvatar: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "#25C4FF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//     overflow: "hidden",
//   },
//   removeAvatarImage: {
//     width: "100%",
//     height: "100%",
//   },
//   removeUserName: {
//     color: "#FFFFFF",
//     fontSize: width * 0.04,
//     fontWeight: "500",
//   },
//   removeDangerBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 20,
//     paddingVertical: 11,
//     backgroundColor: "#1B1220",
//     borderWidth: 1,
//     borderColor: "#FF4B4B",
//     marginBottom: 12,
//   },
//   removeDangerText: {
//     color: "#FF4B4B",
//     fontSize: width * 0.038,
//     fontWeight: "600",
//   },
//   removeCancelBtn: {
//     borderRadius: 20,
//     paddingVertical: 11,
//     backgroundColor: "#101B3C",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   removeCancelText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.038,
//     fontWeight: "600",
//   },

//   /* ARCHIVE POPUP */
//   archiveBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   archiveCard: {
//     width: "80%",
//     borderRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 22,
//     backgroundColor: "#050F25",
//     borderWidth: 1,
//     borderColor: "#243A7A",
//   },
//   archiveTitle: {
//     color: "#FFFFFF",
//     fontSize: width * 0.04,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 14,
//   },
//   archiveDivider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "rgba(255,255,255,0.16)",
//     marginBottom: 18,
//   },
//   archiveBtn: {
//     borderRadius: 18,
//     paddingVertical: 10,
//     backgroundColor: "#071F4A",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   archiveBtnBottom: {
//     marginBottom: 0,
//   },
//   archiveBtnText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.038,
//     fontWeight: "600",
//   },

//   /* BLOCK POPUP */
//   blockBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   blockCard: {
//     width: "80%",
//     borderRadius: 30,
//     paddingHorizontal: 20,
//     paddingVertical: 22,
//     backgroundColor: "#050F25",
//     borderWidth: 1,
//     borderColor: "#243A7A",
//   },
//   blockTitle: {
//     color: "#FFFFFF",
//     fontSize: width * 0.04,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 14,
//   },
//   blockDivider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: "rgba(255,255,255,0.16)",
//     marginBottom: 20,
//   },
//   blockAvatarWrap: {
//     alignItems: "center",
//     marginBottom: 18,
//   },
//   blockAvatar: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "#25C4FF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//     overflow: "hidden",
//   },
//   blockAvatarImage: {
//     width: "100%",
//     height: "100%",
//   },
//   blockUserName: {
//     color: "#FFFFFF",
//     fontSize: width * 0.04,
//     fontWeight: "500",
//   },
//   blockDangerBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 20,
//     paddingVertical: 11,
//     backgroundColor: "#1B1220",
//     borderWidth: 1,
//     borderColor: "#FF4B4B",
//     marginBottom: 12,
//   },
//   blockDangerText: {
//     color: "#FF4B4B",
//     fontSize: width * 0.038,
//     fontWeight: "600",
//   },
//   blockCancelBtn: {
//     borderRadius: 20,
//     paddingVertical: 11,
//     backgroundColor: "#101B3C",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   blockCancelText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.038,
//     fontWeight: "600",
//   },

//   /* SETTINGS bottom popup */
//   settingsBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "flex-end",
//   },
//   settingsSheet: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
//   settingsCard: {
//     borderRadius: 32,
//     padding: 14,
//     backgroundColor: "#020A1E",
//     borderWidth: 1,
//     borderColor: "#1F3C8C",
//   },
//   settingsRowBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: 999,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     backgroundColor: "#071F4A",
//     borderWidth: 1,
//     borderColor: "#244BFF",
//   },
//   settingsRowLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   settingsIconWrap: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     borderWidth: 1,
//     borderColor: "#5E7BFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//   },
//   settingsRowText: {
//     color: "#FFFFFF",
//     fontSize: width * 0.035,
//     fontWeight: "500",
//   },
// });

// src/screens/NotificationsScreen.js
import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const BG = "#020816";
const AVATAR_URL = "https://i.pravatar.cc/200?img=8";

export default function NotificationsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState([]); // raw list from API
  const [activeTab, setActiveTab] = useState("all");

  // local UI state for undo/delete etc.
  const [pendingDelete, setPendingDelete] = useState(null);
  const [undoData, setUndoData] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [moreTarget, setMoreTarget] = useState(null);

  // API base (change as needed)
  const API_BASE = "http://10.0.2.2:4000/api/notifications"; // emulator -> adjust to your server

  // Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json && json.success) {
        // json.data is expected to be an array of notifications
        setNotifs(json.data || []);
      } else {
        console.warn("Failed to load notifications:", json);
      }
    } catch (err) {
      console.error("fetchNotifications err:", err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // helper to PATCH mark read
  const markRead = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}/read`, { method: "PATCH" });
      setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (err) {
      console.error("markRead err", err);
    }
  };

  // delete on server
  const deleteOnServer = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const json = await res.json();
      return json?.success;
    } catch (err) {
      console.error("deleteOnServer err", err);
      return false;
    }
  };

  // open confirm modal
  const openDeleteConfirm = (id) => {
    setPendingDelete(id);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) { setConfirmVisible(false); return; }
    const id = pendingDelete;
    // remove locally immediately, keep for undo
    const removed = notifs.find((n) => n.id === id);
    setUndoData(removed);
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    setConfirmVisible(false);
    setPendingDelete(null);

    // call server
    const ok = await deleteOnServer(id);
    if (!ok) {
      // rollback if needed
      setNotifs((prev) => [removed, ...prev]);
      Alert.alert("Delete failed", "Could not delete on server.");
    } else {
      // set a timed auto-clear for undo (example 7s)
      setTimeout(() => setUndoData(null), 7000);
    }
  };

  const handleUndo = async () => {
    if (!undoData) return;
    // naive: re-fetch from server to get authoritative state
    await fetchNotifications();
    setUndoData(null);
  };

  const renderRightActions = (item) => (
    <View style={styles.swipeActionsContainer}>
      <TouchableOpacity
        style={styles.swipeDeleteBtn}
        onPress={() => openDeleteConfirm(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF5B5B" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.swipeMoreBtn}
        onPress={() => { setMoreTarget(item); setMoreVisible(true); }}
      >
        <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderNotification = (item) => {
    return (
      <Swipeable key={item.id} overshootRight={false} renderRightActions={() => renderRightActions(item)}>
        <View style={[styles.allRow, item.highlight ? styles.allRowHighlight : null]}>
          <View style={styles.row}>
            <View style={styles.avatar}>
              <Image source={{ uri: item.avatar || AVATAR_URL }} style={styles.avatarImage} />
            </View>

            <View style={styles.textBlock}>
              <Text style={styles.mainLine}>
                <Text style={styles.nameText}>{item.name ?? "Someone"} </Text>
                <Text style={styles.lightText}>
                  {item.type === "joined" ? "joined to " : item.type === "invite" ? "invites you to " : ""}
                </Text>
                <Text style={styles.boldRoom}>{item.room ?? item.title ?? ""}</Text>
              </Text>
              <Text style={styles.timeText}>{item.time ?? item.createdAt ?? ""}</Text>
            </View>
          </View>

          {/* small actions */}
          <View style={{ marginLeft: 8 }}>
            {!item.read ? (
              <TouchableOpacity onPress={() => markRead(item.id)}>
                <Ionicons name="ellipse" size={12} color="#2E5BFF" />
              </TouchableOpacity>
            ) : (
              <Ionicons name="checkmark-done-outline" size={16} color="#6B7280" />
            )}
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notification_popup')}>
            <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          {[
            { key: "all", label: "All" },
            { key: "unread", label: "Unread" },
            { key: "archived", label: "Archived" },
          ].map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabChip, activeTab === t.key && styles.tabChipActive]}
              onPress={() => setActiveTab(t.key)}
            >
              <Text style={[styles.tabText, activeTab === t.key && styles.tabTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        {loading ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#2E5BFF" />
          </View>
        ) : (
          <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 120 }}>
            {undoData && (
              <View style={styles.undoBanner}>
                <View style={styles.undoLeft}>
                  <Ionicons name="trash-outline" size={18} color="#FF5B5B" style={{ marginRight: 8 }} />
                  <Text style={styles.undoText}>Notification Deleted</Text>
                </View>
                <TouchableOpacity onPress={handleUndo}>
                  <Text style={styles.undoButtonText}>Undo</Text>
                </TouchableOpacity>
              </View>
            )}

            {notifs.filter(n => activeTab === 'all' ? true : activeTab === 'unread' ? !n.read : n.archived).length === 0 ? (
              <View style={{ padding: 24 }}>
                <Text style={{ color: '#9CA3AF' }}>No notifications</Text>
              </View>
            ) : (
              notifs
                .filter(n => activeTab === 'all' ? true : activeTab === 'unread' ? !n.read : n.archived)
                .map(renderNotification)
            )}
          </ScrollView>
        )}

        {/* confirm modal */}
        <Modal visible={confirmVisible} transparent animationType="fade" onRequestClose={() => setConfirmVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Are you sure want to delete?</Text>

              <TouchableOpacity style={styles.modalDeleteBtn} onPress={handleConfirmDelete}>
                <Ionicons name="trash-outline" size={18} color="#FF5B5B" style={{ marginRight: 6 }} />
                <Text style={styles.modalDeleteText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setConfirmVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* simple "more" sheet */}
        <Modal visible={moreVisible} transparent animationType="fade" onRequestClose={() => setMoreVisible(false)}>
          <View style={styles.moreBackdrop}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setMoreVisible(false)} />
            <View style={styles.moreSheet}>
              <TouchableOpacity style={styles.moreBtn} onPress={() => { setMoreVisible(false); Alert.alert('Remove Orbitors','Not implemented'); }}>
                <View style={styles.moreLeft}>
                  <Ionicons name="person-remove-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.moreText}>Remove Orbitors</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.moreBtn, styles.moreBtnRed]} onPress={() => { setMoreVisible(false); Alert.alert('Block','Not implemented'); }}>
                <View style={styles.moreLeft}>
                  <Ionicons name="ban-outline" size={18} color="#FF4B4B" style={{ marginRight: 8 }} />
                  <Text style={styles.moreTextRed}>Block {moreTarget?.name ?? 'User'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

/* reuse styles from your UI — trimmed for brevity; keep the ones you already had */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  container: { flex: 1, backgroundColor: BG, paddingHorizontal: 18, paddingTop: 6 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  headerTitle: { color: "#FFFFFF", fontSize: width * 0.055, fontWeight: "700" },
  tabsContainer: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  tabChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, marginRight: 8, backgroundColor: "#050F25" },
  tabChipActive: { backgroundColor: "#101B3C" },
  tabText: { color: "#7F8AA7", fontSize: width * 0.035, fontWeight: "500" },
  tabTextActive: { color: "#FFFFFF" },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: "rgba(255,255,255,0.12)", marginBottom: 10 },
  scrollArea: { flex: 1 },
  allRow: { paddingHorizontal: 10, paddingVertical: 10, backgroundColor: "transparent", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "rgba(255,255,255,0.06)", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  allRowHighlight: { backgroundColor: "#071F4A" },
  row: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#25C4FF", overflow: 'hidden', marginRight: 10 },
  avatarImage: { width: '100%', height: '100%' },
  textBlock: { flex: 1 },
  mainLine: { flexWrap: "wrap" },
  nameText: { color: "#FFFFFF", fontWeight: "600", fontSize: width * 0.037 },
  lightText: { color: "#B3C3E7", fontSize: width * 0.036 },
  boldRoom: { color: "#FFFFFF", fontWeight: "600", fontSize: width * 0.037 },
  timeText: { marginTop: 2, color: "#7F8AA7", fontSize: width * 0.032 },
  swipeActionsContainer: { flexDirection: "row", alignItems: "center", height: "100%", backgroundColor: "#071F4A", paddingRight: 10 },
  swipeDeleteBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#141B33", marginRight: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#FF5B5B" },
  swipeMoreBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#141F33", alignItems: "center", justifyContent: "center" },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "80%", borderRadius: 28, paddingHorizontal: 20, paddingVertical: 24, backgroundColor: "#05122B", borderWidth: 1, borderColor: "rgba(120,142,255,0.5)" },
  modalTitle: { color: "#FFFFFF", fontSize: width * 0.04, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  modalDeleteBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 18, paddingVertical: 10, backgroundColor: "#1B1220", borderWidth: 1, borderColor: "#FF5B5B", marginBottom: 12 },
  modalDeleteText: { color: "#FF5B5B", fontSize: width * 0.038, fontWeight: "600" },
  modalCancelBtn: { borderRadius: 18, paddingVertical: 10, backgroundColor: "#101B3C", alignItems: "center", justifyContent: "center" },
  modalCancelText: { color: "#FFFFFF", fontSize: width * 0.038, fontWeight: "600" },

  undoBanner: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#050F25", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 10, borderWidth: 1, borderColor: "#2E5BFF" },
  undoLeft: { flexDirection: "row", alignItems: "center" },
  undoText: { color: "#FFFFFF", fontSize: width * 0.035 },
  undoButtonText: { color: "#2E5BFF", fontSize: width * 0.036, fontWeight: "600" },

  moreBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "flex-end" },
  moreSheet: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 28, backgroundColor: "#050F25", borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderColor: "#243A7A" },
  moreBtn: { borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14, marginBottom: 10, backgroundColor: "#071F4A" },
  moreLeft: { flexDirection: "row", alignItems: "center" },
  moreText: { color: "#FFFFFF", fontSize: width * 0.037, fontWeight: "500" },
  moreBtnRed: { backgroundColor: "#210910", borderWidth: 1, borderColor: "#FF4B4B", marginTop: 8 },
  moreTextRed: { color: "#FF4B4B", fontSize: width * 0.037, fontWeight: "600" },
});

