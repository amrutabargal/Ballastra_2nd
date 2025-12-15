// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   SafeAreaView,
// //   View,
// //   Text,
// //   StyleSheet,
// //   Dimensions,
// //   TextInput,
// //   TouchableOpacity,
// //   FlatList,
// //   Animated,
// //   Platform,
// //   StatusBar,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";

// // const { width, height } = Dimensions.get("window");

// // const ACTIONS = [
// //   "Update Nexus",
// //   "Create Channel",
// //   "Update Channel",
// //   "Delete Channel",
// //   "Create Channel Permissions",
// //   "Update Channel Permissions",
// //   "Delete Channel Permissions",
// //   "Kick Member",
// //   "Ban Member",
// //   "Restrict Member",
// //   "Unban Member",
// //   "Update Member",
// //   "Update Member Roles",
// //   "Move Member",
// //   "Disconnect Member",
// //   "Add Bot",
// //   "Create Role",
// //   "Update Role",
// //   "Delete Role",
// //   "Create Customization Question",
// //   "Update Customization Question",
// //   "Delete Customization Question",
// //   "Create Nexus Guide",
// //   "Update Nexus Guide",
// //   "Create Invite",
// //   "Update Invite",
// //   "Delete Invite",
// //   "Create Emoji",
// //   "Update Emoji",
// //   "Delete Emoji",
// //   "Bulk Delete Messages",
// //   "Pin Message",
// //   "Unpin Message",
// //   "Create Sticker",
// //   "Update Sticker",
// //   "Delete Sticker",
// //   "Create Event",
// //   "Update Event",
// //   "Cancel Event",
// //   "Create Voice Channel Status",
// //   "Delete Voice Channel Status",
// //   // ... add more if you need
// // ];

// // export default function FilterAction({ navigation }) {
// //   // individual toggles stored in an object { actionName: boolean }
// //   const [toggles, setToggles] = useState(() =>
// //     ACTIONS.reduce((acc, a) => {
// //       acc[a] = false;
// //       return acc;
// //     }, {})
// //   );
// //   const [allActions, setAllActions] = useState(false);
// //   const [query, setQuery] = useState("");

// //   // keep animated states for the All Actions pill knob
// //   const allAnim = useRef(new Animated.Value(allActions ? 1 : 0)).current;
// //   useEffect(() => {
// //     Animated.timing(allAnim, {
// //       toValue: allActions ? 1 : 0,
// //       duration: 200,
// //       useNativeDriver: false,
// //     }).start();
// //   }, [allActions]);

// //   // toggle single action
// //   const toggleAction = (actionName) => {
// //     setToggles((prev) => {
// //       const updated = { ...prev, [actionName]: !prev[actionName] };
// //       // update 'All Actions' state if all selected or not
// //       const allSelected = Object.keys(updated).every((k) => updated[k]);
// //       setAllActions(allSelected);
// //       return updated;
// //     });
// //   };

// //   // toggle all
// //   const toggleAll = () => {
// //     const next = !allActions;
// //     const newToggles = Object.keys(toggles).reduce((acc, k) => {
// //       acc[k] = next;
// //       return acc;
// //     }, {});
// //     setToggles(newToggles);
// //     setAllActions(next);
// //   };

// //   // filtered actions by query
// //   const filtered = ACTIONS.filter((a) => a.toLowerCase().includes(query.trim().toLowerCase()));

// //   // small reusable toggle component (animated)
// //   function Toggle({ value, onToggle }) {
// //     const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
// //     useEffect(() => {
// //       Animated.timing(anim, {
// //         toValue: value ? 1 : 0,
// //         duration: 180,
// //         useNativeDriver: false,
// //       }).start();
// //     }, [value]);

// //     const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [2, 18] });
// //     const bg = anim.interpolate({
// //       inputRange: [0, 1],
// //       outputRange: ["rgba(255,255,255,0.06)", "rgba(83,57,255,1)"],
// //     });

// //     return (
// //       <TouchableOpacity activeOpacity={0.9} onPress={onToggle} style={faStyles.toggleTouchable}>
// //         <Animated.View style={[faStyles.toggleTrack, { backgroundColor: bg }]}>
// //           <Animated.View style={[faStyles.toggleKnob, { transform: [{ translateX }] }]} />
// //         </Animated.View>
// //       </TouchableOpacity>
// //     );
// //   }

// //   const renderItem = ({ item }) => {
// //     const isOn = !!toggles[item];
// //     return (
// //       <View style={faStyles.rowWrap}>
// //         <View style={faStyles.row}>
// //           <Text style={faStyles.rowText}>{item}</Text>
// //           <Toggle value={isOn} onToggle={() => toggleAction(item)} />
// //         </View>
// //       </View>
// //     );
// //   };

// //   return (
// //     <SafeAreaView style={faStyles.safe}>
// //       <StatusBar barStyle="light-content" />
// //       <View style={faStyles.container}>
// //         {/* Header */}
// //         <View style={faStyles.header}>
// //           <TouchableOpacity onPress={() => navigation?.goBack?.()} style={faStyles.headerIcon}>
// //             <Ionicons name="close" size={20} color="#CFE0FF" />
// //           </TouchableOpacity>
// //           <Text style={faStyles.headerTitle}>Filter Action</Text>
// //           <View style={{ width: 44 }} />
// //         </View>

// //         {/* Search */}
// //         <View style={faStyles.section}>
// //           <View style={faStyles.searchBox}>
// //             <Ionicons name="search" size={16} color="rgba(207,224,255,0.5)" style={{ marginRight: 10 }} />
// //             <TextInput
// //               value={query}
// //               onChangeText={setQuery}
// //               placeholder="Search Members"
// //               placeholderTextColor="rgba(207,224,255,0.32)"
// //               style={faStyles.searchInput}
// //             />
// //           </View>
// //         </View>

// //         {/* All Actions pill */}
// //         <View style={faStyles.section}>
// //           <View style={faStyles.pillRow}>
// //             <Text style={faStyles.pillLabel}>All Actions</Text>
// //             <TouchableOpacity onPress={toggleAll} activeOpacity={0.9}>
// //               <Animated.View style={{ transform: [{ translateY: 0 }] }}>
// //                 <Toggle value={allActions} onToggle={toggleAll} />
// //               </Animated.View>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Actions list */}
// //         <FlatList
// //           data={filtered}
// //           keyExtractor={(i) => i}
// //           renderItem={renderItem}
// //           contentContainerStyle={{ paddingBottom: 80, paddingTop: 6 }}
// //           showsVerticalScrollIndicator={false}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // /* ---------- styles ---------- */
// // const faStyles = StyleSheet.create({
// //   safe: { flex: 1, backgroundColor: "#050B18" },
// //   container: { flex: 1, paddingHorizontal: 16, paddingTop: Platform.OS === "android" ? 12 : 8 },

// //   header: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
// //   headerIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
// //   headerTitle: { color: "#E6EEFF", fontSize: 16, fontWeight: "700" },

// //   section: { marginTop: 10 },

// //   searchBox: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     borderRadius: 14,
// //     paddingHorizontal: 12,
// //     paddingVertical: 10,
// //     backgroundColor: "rgba(7,18,36,0.6)",
// //     borderWidth: 1,
// //     borderColor: "rgba(58,88,160,0.16)",
// //   },
// //   searchInput: { flex: 1, color: "#CFE0FF", fontSize: 14 },

// //   pillRow: {
// //     marginTop: 12,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     backgroundColor: "rgba(7,18,36,0.45)",
// //     borderRadius: 12,
// //     paddingHorizontal: 12,
// //     paddingVertical: 12,
// //     borderWidth: 1,
// //     borderColor: "rgba(58,88,160,0.12)",
// //   },
// //   pillLabel: { color: "#E6EEFF", fontWeight: "700", fontSize: 14 },

// //   rowWrap: { marginTop: 12 },
// //   row: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     borderRadius: 12,
// //     paddingHorizontal: 12,
// //     paddingVertical: 12,
// //     backgroundColor: "rgba(7,18,36,0.36)",
// //     borderWidth: 1,
// //     borderColor: "rgba(58,88,160,0.12)",
// //   },
// //   rowText: { color: "#DDEBFF", fontSize: 13 },

// //   /* Toggle */
// //   toggleTouchable: { padding: 6 },
// //   toggleTrack: {
// //     width: 48,
// //     height: 26,
// //     borderRadius: 20,
// //     padding: 2,
// //     justifyContent: "center",
// //   },
// //   toggleKnob: {
// //     width: 20,
// //     height: 20,
// //     borderRadius: 12,
// //     backgroundColor: "#FFF",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.18,
// //     shadowRadius: 6,
// //     elevation: Platform.OS === "android" ? 3 : 0,
// //   },
// // });
// // src/screens/FilterAction.js
// import React, { useState, useRef, useEffect, useMemo } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Animated,
//   Platform,
//   StatusBar,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// const ACTIONS = [
//   "Update Nexus",
//   "Create Channel",
//   "Update Channel",
//   "Delete Channel",
//   "Create Channel Permissions",
//   "Update Channel Permissions",
//   "Delete Channel Permissions",
//   "Kick Member",
//   "Ban Member",
//   "Restrict Member",
//   "Unban Member",
//   "Update Member",
//   "Update Member Roles",
//   "Move Member",
//   "Disconnect Member",
//   "Add Bot",
//   "Create Role",
//   "Update Role",
//   "Delete Role",
//   "Create Customization Question",
//   "Update Customization Question",
//   "Delete Customization Question",
//   "Create Nexus Guide",
//   "Update Nexus Guide",
//   "Create Invite",
//   "Update Invite",
//   "Delete Invite",
//   "Create Emoji",
//   "Update Emoji",
//   "Delete Emoji",
//   "Bulk Delete Messages",
//   "Pin Message",
//   "Unpin Message",
//   "Create Sticker",
//   "Update Sticker",
//   "Delete Sticker",
//   "Create Event",
//   "Update Event",
//   "Cancel Event",
//   "Create Voice Channel Status",
//   "Delete Voice Channel Status",
// ];

// export default function FilterAction({ navigation }) {
//   // initial toggles object
//   const initialToggles = useMemo(
//     () =>
//       ACTIONS.reduce((acc, a) => {
//         acc[a] = false;
//         return acc;
//       }, {}),
//     []
//   );

//   const [toggles, setToggles] = useState(initialToggles);
//   const [allActions, setAllActions] = useState(false);
//   const [query, setQuery] = useState("");

//   // Animated value for All Actions pill (visual only)
//   const allAnim = useRef(new Animated.Value(allActions ? 1 : 0)).current;
//   useEffect(() => {
//     Animated.timing(allAnim, {
//       toValue: allActions ? 1 : 0,
//       duration: 220,
//       useNativeDriver: false,
//     }).start();
//   }, [allActions]);

//   // Toggle a single action
//   const toggleAction = (actionName) => {
//     setToggles((prev) => {
//       const updated = { ...prev, [actionName]: !prev[actionName] };

//       // determine if all are selected
//       const allSelected = Object.keys(updated).every((k) => updated[k] === true);
//       setAllActions(allSelected);

//       return updated;
//     });
//   };

//   // Toggle ALL actions at once
//   const toggleAll = () => {
//     const next = !allActions;
//     // animate pill quickly
//     Animated.timing(allAnim, {
//       toValue: next ? 1 : 0,
//       duration: 220,
//       useNativeDriver: false,
//     }).start();

//     const newToggles = Object.keys(toggles).reduce((acc, k) => {
//       acc[k] = next;
//       return acc;
//     }, {});
//     setToggles(newToggles);
//     setAllActions(next);
//   };

//   // Filter list
//   const filtered = ACTIONS.filter((a) => a.toLowerCase().includes(query.trim().toLowerCase()));

//   // Memoized Toggle component to reduce re-renders
//   const Toggle = React.memo(function Toggle({ value, onToggle }) {
//     const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

//     useEffect(() => {
//       Animated.timing(anim, {
//         toValue: value ? 1 : 0,
//         duration: 180,
//         useNativeDriver: false,
//       }).start();
//     }, [value]);

//     const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [2, 18] });
//     const bg = anim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ["#1E293B", "#4479FF"],
//     });

//     return (
//       <TouchableOpacity activeOpacity={0.9} onPress={onToggle} style={faStyles.toggleTouchable}>
//         <Animated.View style={[faStyles.toggleTrack, { backgroundColor: bg }]}>
//           <Animated.View style={[faStyles.toggleKnob, { transform: [{ translateX }] }]} />
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   });

//   const renderItem = ({ item }) => {
//     const isOn = !!toggles[item];
//     return (
//       <View style={faStyles.rowWrap}>
//         <View style={faStyles.row}>
//           <Text style={faStyles.rowText}>{item}</Text>
//           <Toggle value={isOn} onToggle={() => toggleAction(item)} />
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={faStyles.safe}>
//       <StatusBar barStyle="light-content" />
//       <View style={faStyles.container}>
//         {/* Header */}
//         <View style={faStyles.header}>
//           <TouchableOpacity onPress={() => navigation?.goBack?.()} style={faStyles.headerIcon}>
//             <Ionicons name="close" size={20} color="#CFE0FF" />
//           </TouchableOpacity>
//           <Text style={faStyles.headerTitle}>Filter Action</Text>
//           <View style={{ width: 44 }} />
//         </View>

//         {/* Search */}
//         <View style={faStyles.section}>
//           <View style={faStyles.searchBox}>
//             <Ionicons name="search" size={16} color="rgba(207,224,255,0.5)" style={{ marginRight: 10 }} />
//             <TextInput
//               value={query}
//               onChangeText={setQuery}
//               placeholder="Search Members"
//               placeholderTextColor="rgba(207,224,255,0.32)"
//               style={faStyles.searchInput}
//             />
//           </View>
//         </View>

//         {/* All Actions pill */}
//         <View style={faStyles.section}>
//           <View style={faStyles.pillRow}>
//             <Text style={faStyles.pillLabel}>All Actions</Text>

//             <TouchableOpacity onPress={toggleAll} activeOpacity={0.9}>
//               {/* Animated pill uses same Toggle component logic but we animate outer transform for subtle effect */}
//               <Toggle value={allActions} onToggle={toggleAll} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Actions list */}
//         <FlatList
//           data={filtered}
//           keyExtractor={(i) => i}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 80, paddingTop: 6 }}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// /* ---------- styles ---------- */
// const faStyles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: "#050B18" },
//   container: { flex: 1, paddingHorizontal: 16, paddingTop: Platform.OS === "android" ? 12 : 8 },

//   header: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
//   headerIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
//   headerTitle: { color: "#E6EEFF", fontSize: 16, fontWeight: "700" },

//   section: { marginTop: 10 },

//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 15,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   backgroundColor: "#071224",
//     borderWidth: 1,
//   borderColor: "#3154BA",
//   },
//   searchInput: { flex: 1, color: "#CFE0FF", fontSize: 14 },

//   pillRow: {
//     marginTop: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   backgroundColor: "#071224",
//     borderRadius: 15,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     borderWidth: 1,
//   borderColor: "#3154BA",
//   },
//   pillLabel: { color: "#E6EEFF", fontWeight: "700", fontSize: 14 },

//   rowWrap: { marginTop: 12 },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//   backgroundColor: "#071224",
//     borderWidth: 1,
//   borderColor: "#3154BA",
//   },
//   rowText: { color: "#DDEBFF", fontSize: 13 },

//   /* Toggle */
//   toggleTouchable: { padding: 6 },
//   toggleTrack: {
//     width: 48,
//     height: 26,
//     borderRadius: 20,
//     padding: 2,
//     justifyContent: "center",
//   },
//   toggleKnob: {
//     width: 20,
//     height: 20,
//     borderRadius: 12,
//     backgroundColor: "#FFF",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.18,
//     shadowRadius: 6,
//     elevation: Platform.OS === "android" ? 3 : 0,
//   },
// });
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ACTIONS = [
  "Update Nexus",
  "Create Channel",
  "Update Channel",
  "Delete Channel",
  "Create Channel Permissions",
  "Update Channel Permissions",
  "Delete Channel Permissions",
  "Kick Member",
  "Ban Member",
  "Restrict Member",
  "Unban Member",
  "Update Member",
  "Update Member Roles",
  "Move Member",
  "Disconnect Member",
  "Add Bot",
  "Create Role",
  "Update Role",
  "Delete Role",
  "Create Customization Question",
  "Update Customization Question",
  "Delete Customization Question",
  "Create Nexus Guide",
  "Update Nexus Guide",
  "Create Invite",
  "Update Invite",
  "Delete Invite",
  "Create Emoji",
  "Update Emoji",
  "Delete Emoji",
  "Bulk Delete Messages",
  "Pin Message",
  "Unpin Message",
  "Create Sticker",
  "Update Sticker",
  "Delete Sticker",
  "Create Event",
  "Update Event",
  "Cancel Event",
  "Create Voice Channel Status",
  "Delete Voice Channel Status",
];

export default function FilterAction({ navigation }) {
  const initialToggles = useMemo(
    () =>
      ACTIONS.reduce((acc, a) => {
        acc[a] = false;
        return acc;
      }, {}),
    []
  );

  const [toggles, setToggles] = useState(initialToggles);
  const [allActions, setAllActions] = useState(false);
  const [query, setQuery] = useState("");

  const allAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(allAnim, {
      toValue: allActions ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [allActions]);

  // Single toggle
  const toggleAction = (name) => {
    setToggles((prev) => {
      const updated = { ...prev, [name]: !prev[name] };

      const allSelected = Object.values(updated).every((v) => v === true);
      setAllActions(allSelected);

      return updated;
    });
  };

  // ---- FIXED FULL WORKING ALL-TOGGLE ----
  const toggleAll = () => {
    const next = !allActions;
    setAllActions(next);

    Animated.timing(allAnim, {
      toValue: next ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setToggles((prev) => {
      const updated = {};
      Object.keys(prev).forEach((k) => {
        updated[k] = next;
      });
      return updated;
    });
  };

  const filtered = ACTIONS.filter((a) =>
    a.toLowerCase().includes(query.trim().toLowerCase())
  );

  const Toggle = React.memo(function Toggle({ value, onToggle }) {
    const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(anim, {
        toValue: value ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }, [value]);

    const translateX = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 18],
    });

    const bg = anim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#1E293B", "#4479FF"],
    });

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onToggle}
        style={faStyles.toggleTouchable}
      >
        <Animated.View style={[faStyles.toggleTrack, { backgroundColor: bg }]}>
          <Animated.View
            style={[faStyles.toggleKnob, { transform: [{ translateX }] }]}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  });

  const renderItem = ({ item }) => {
    return (
      <View style={faStyles.rowWrap}>
        <View style={faStyles.row}>
          <Text style={faStyles.rowText}>{item}</Text>
          <Toggle value={toggles[item]} onToggle={() => toggleAction(item)} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={faStyles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={faStyles.container}>
        {/* HEADER */}
        <View style={faStyles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            style={faStyles.headerIcon}
          >
            <Ionicons name="close" size={20} color="#CFE0FF" />
          </TouchableOpacity>

          <Text style={faStyles.headerTitle}>Filter Action</Text>

          <View style={{ width: 44 }} />
        </View>

        {/* SEARCH */}
        <View style={faStyles.section}>
          <View style={faStyles.searchBox}>
            <Ionicons
              name="search"
              size={16}
              color="rgba(207,224,255,0.5)"
              style={{ marginRight: 10 }}
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search Members"
              placeholderTextColor="rgba(207,224,255,0.32)"
              style={faStyles.searchInput}
            />
          </View>
        </View>

        {/* ALL ACTIONS */}
        <View style={faStyles.section}>
          <View style={faStyles.pillRow}>
            <Text style={faStyles.pillLabel}>All Actions</Text>
            <Toggle value={allActions} onToggle={toggleAll} />
          </View>
        </View>

        {/* LIST */}
        <FlatList
          data={filtered}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------- styles ---------- */
const faStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050B18" },
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  headerIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#E6EEFF", fontSize: 16, fontWeight: "700" },

  section: { marginTop: 10 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#071224",
    borderWidth: 1,
    borderColor: "#3154BA",
  },
  searchInput: { flex: 1, color: "#CFE0FF", fontSize: 14 },

  pillRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#071224",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#3154BA",
  },
  pillLabel: { color: "#E6EEFF", fontWeight: "700", fontSize: 14 },

  rowWrap: { marginTop: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#071224",
    borderWidth: 1,
    borderColor: "#3154BA",
  },
  rowText: { color: "#DDEBFF", fontSize: 13 },

  toggleTouchable: { padding: 6 },
  toggleTrack: {
    width: 48,
    height: 26,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#FFF",
    elevation: Platform.OS === "android" ? 3 : 0,
  },
});
