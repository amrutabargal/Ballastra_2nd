
// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   Switch,
// // //   StatusBar,
// // //   ActivityIndicator,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { X } from 'lucide-react-native';

// // // export default function CreateCategoryScreen({ navigation }) {
// // //   const [categoryName, setCategoryName] = useState('');
// // //   const [isPrivate, setIsPrivate] = useState(false);
// // //   const [loading, setLoading] = useState(false);

// // //   const handleCreate = () => {
// // //     if (!categoryName.trim()) {
// // //       alert('Please enter a category name');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     setTimeout(() => {
// // //       setLoading(false);
// // //       alert(`Category "${categoryName}" created!`);
// // //       navigation.goBack();
// // //     }, 1500);
// // //   };

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       <StatusBar barStyle="light-content" backgroundColor="#0B1035" />

// // //       {/* Close Button */}
// // //       <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
// // //         <X size={24} color="#fff" />
// // //       </TouchableOpacity>

// // //       <Text style={styles.title}>Start a Category</Text>

// // //       {/* Input */}
// // //       <Text style={styles.label}>Category name</Text>

// // //       <TextInput
// // //         style={styles.input}
// // //         placeholder="new-space"
// // //         placeholderTextColor="#7B82A3"
// // //         value={categoryName}
// // //         onChangeText={setCategoryName}
// // //       />

// // //       <Text style={styles.infoText}>
// // //         Private Spaces are visible only to people you choose. Everyone else won't see them at all.
// // //       </Text>

// // //       {/* Private Switch */}
// // //       <View style={styles.switchRow}>
// // //         <View style={{ flexDirection: "row", alignItems: "center" }}>
// // //           <View style={styles.lockIcon} />
// // //           <Text style={styles.switchText}>Private Category</Text>
// // //         </View>

// // //         <Switch
// // //           value={isPrivate}
// // //           onValueChange={setIsPrivate}
// // //           thumbColor={isPrivate ? '#3B82F6' : '#fff'}
// // //           trackColor={{ false: '#64748B', true: '#2563EB' }}
// // //         />
// // //       </View>

// // //       <Text style={styles.learnMoreText}>Learn more about Space Modes →</Text>

// // //       {/* Create Button */}
// // //       <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={handleCreate}>
// // //         <LinearGradient
// // //           colors={['#1a2957', '#0C142A', '#1a2957']}
// // //           start={{ x: 0, y: 0 }}
// // //           end={{ x: 1, y: 0 }}
// // //           style={styles.gradientButton}
// // //         >
// // //           {loading ? (
// // //             <ActivityIndicator color="#fff" />
// // //           ) : (
// // //             <Text style={styles.createButtonText}>Create</Text>
// // //           )}
// // //         </LinearGradient>
// // //       </TouchableOpacity>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#07152C',  // perfect match with screenshot
// // //     paddingHorizontal: 24,
// // //   },

// // //   closeButton: {
// // //     marginTop: 10,
// // //     marginBottom: 12,
// // //   },

// // //   title: {
// // //     color: '#fff',
// // //     fontSize: 22,
// // //     fontWeight: '700',
// // //     textAlign: 'center',
// // //     marginTop: 10,
// // //     marginBottom: 26,
// // //   },

// // //   label: {
// // //     color: '#7B82A3',
// // //     fontSize: 14,
// // //     marginBottom: 6,
// // //   },

// // //   input: {
// // //     backgroundColor: '#0F1B3C',
// // //     borderRadius: 12,
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 14,
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     marginBottom: 14,
// // //     borderWidth: 1,
// // //     borderColor: '#1C2A52',
// // //   },

// // //   infoText: {
// // //     color: '#7B82A3',
// // //     fontSize: 13,
// // //     marginBottom: 20,
// // //     lineHeight: 18,
// // //   },

// // //   switchRow: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     backgroundColor: '#0F1B3C',
// // //     borderRadius: 12,
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 14,
// // //     marginBottom: 20,
// // //     borderWidth: 1,
// // //     borderColor: '#1C2A52',
// // //   },

// // //   lockIcon: {
// // //     width: 18,
// // //     height: 18,
// // //     backgroundColor: '#3B82F6',
// // //     borderRadius: 4,
// // //     marginRight: 10,
// // //   },

// // //   switchText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //   },

// // //   learnMoreText: {
// // //     color: '#7B82A3',
// // //     fontSize: 13,
// // //     textAlign: 'center',
// // //     marginBottom: 34,
// // //   },

// // //   buttonWrapper: {
// // //     alignSelf: 'center',
// // //     width: 135,
// // //     height: 52,
// // //   },

// // //   // ⭐ YOUR ORIGINAL BUTTON CSS — UNCHANGED ⭐
// // //   gradientButton: {
// // //     borderRadius: 14,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     paddingVertical: 16,

// // //     shadowColor: '3F68FF',
// // //     shadowOffset: { width: 0, height: 5 },
// // //     shadowOpacity: 0.5,
// // //     shadowRadius: 8,
// // //     elevation: 5,

// // //     borderWidth: 1,
// // //     // borderColor: '#3F68FF',
// // //   },

// // //   createButtonText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //   },
// // // });
// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TextInput,
// //   TouchableOpacity,
// //   Switch,
// //   StatusBar,
// //   ActivityIndicator,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { X } from 'lucide-react-native';
// // import Svg, { Path, Circle } from "react-native-svg";

// // const LockSVG = () => (
// //   <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
// //     <Circle cx="21" cy="21" r="20" stroke="#2F62FF" strokeOpacity="0.3" strokeWidth="1.2" />
// //     <Circle cx="21" cy="21" r="16" stroke="#3F68FF" strokeOpacity="0.8" strokeWidth="1.6" />
// //     <Path
// //       d="M21 14C18.79 14 17 15.79 17 18V20H25V18C25 15.79 23.21 14 21 14Z"
// //       stroke="white"
// //       strokeWidth="1.6"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //     <Path
// //       d="M26 20H16C14.9 20 14 20.9 14 22V28C14 29.1 14.9 30 16 30H26C27.1 30 28 29.1 28 28V22C28 20.9 27.1 20 26 20Z"
// //       stroke="white"
// //       strokeWidth="1.6"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     />
// //   </Svg>
// // );

// // export default function CreateCategoryScreen({ navigation }) {
// //   const [categoryName, setCategoryName] = useState('');
// //   const [isPrivate, setIsPrivate] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const handleCreate = () => {
// //     if (!categoryName.trim()) {
// //       alert('Please enter a category name');
// //       return;
// //     }
// //     setLoading(true);
// //     setTimeout(() => {
// //       setLoading(false);
// //       alert(`Category "${categoryName}" created!`);
// //       navigation.goBack();
// //     }, 1500);
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <StatusBar barStyle="light-content" backgroundColor="#0B1035" />

// //       {/* Close Button */}
// //       <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
// //         <X size={24} color="#fff" />
// //       </TouchableOpacity>

// //       <Text style={styles.title}>Start a Category</Text>

// //       {/* Input */}
// //       <Text style={styles.label}>Category name</Text>

// //       <TextInput
// //         style={styles.input}
// //         placeholder="new-space"
// //         placeholderTextColor="#7B82A3"
// //         value={categoryName}
// //         onChangeText={setCategoryName}
// //       />

// //       <Text style={styles.infoText}>
// //         Private Spaces are visible only to people you choose. Everyone else won't see them at all.
// //       </Text>

// //       {/* 🚀 Private Switch Row */}
// //       <View style={styles.switchRow}>
// //         <View style={{ flexDirection: "row", alignItems: "center" }}>
// //           <LockSVG />
// //           <Text style={styles.switchText}>Private Category</Text>
// //         </View>

// //         <Switch
// //           value={isPrivate}
// //           onValueChange={setIsPrivate}
// //           thumbColor={isPrivate ? '#3B82F6' : '#fff'}
// //           trackColor={{ false: '#64748B', true: '#2563EB' }}
// //         />
// //       </View>

// //       <Text style={styles.learnMoreText}>Learn more about Space Modes →</Text>

// //       {/* Create Button */}
// //       <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={handleCreate}>
// //         <LinearGradient
// //           colors={['#1a2957', '#0C142A', '#1a2957']}
// //           start={{ x: 0, y: 0 }}
// //           end={{ x: 1, y: 0 }}
// //           style={styles.gradientButton}
// //         >
// //           {loading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={styles.createButtonText}>Create</Text>
// //           )}
// //         </LinearGradient>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#07152C', paddingHorizontal: 24 },
// //   closeButton: { marginTop: 30, marginBottom: 12 },
// //   title: { color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 10, marginBottom: 26 },
// //   label: { color: '#7B82A3', fontSize: 14, marginBottom: 6 },
// //  input: {
// //   backgroundColor: '#0F1B3C',
// //   borderRadius: 12,
// //   paddingHorizontal: 16,
// //   paddingVertical: 14,
// //   color: '#fff',
// //   fontSize: 16,
// //   marginBottom: 14,

// //   borderWidth: 1,
// //   borderColor: '#3154BA',

// //   // ⭐ Added Shadow (same as your UI theme)
// //   shadowColor: '#3154BA',
// //   shadowOffset: { width: 0, height: 4 },
// //   shadowOpacity: 0.6,
// //   shadowRadius: 6,
// //   elevation: 8, // For Android glow
// // },

// //   infoText: { color: '#7B82A3', fontSize: 13, marginBottom: 20, lineHeight: 18 },

// // switchRow: {
// //   flexDirection: 'row',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   backgroundColor: '#0F1B3C',
// // height:54,

// //   borderRadius: 16,
// //   paddingHorizontal: 16,
// //   paddingVertical: 14,
// //   marginBottom: 20,

// //   borderWidth: 1,
// //   borderColor: '#3154BA',

// //   // ⭐ Added Shadow (Blue glow)
// //   shadowColor: '#3154BA',
// //   shadowOffset: { width: 0, height: 5 },
// //   shadowOpacity: 0.45,
// //   shadowRadius: 10,
// //   elevation: 8, // Android glow
// // },


// //   switchText: { color: '#fff', fontSize: 16, marginLeft: 12 },

// //   learnMoreText: { color: '#7B82A3', fontSize: 13, textAlign: 'center', marginBottom: 34 },

// //   buttonWrapper: { alignSelf: 'center', width: 135, height: 52 },

// //   gradientButton: {
// //     borderRadius: 14,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingVertical: 16,
// //     shadowColor: '#3F68FF',
// //     shadowOffset: { width: 0, height: 5 },
// //     shadowOpacity: 0.5,
// //     shadowRadius: 8,
// //     elevation: 5,
// //     borderWidth: 1,
// //   },

// //   createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// // });
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Switch,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import { X } from 'lucide-react-native';
// import Svg, { Path, Circle } from "react-native-svg";

// const LockSVG = () => (
//   <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
//     <Circle cx="21" cy="21" r="20" stroke="#2F62FF" strokeOpacity="0.3" strokeWidth="1.2" />
//     <Circle cx="21" cy="21" r="16" stroke="#3F68FF" strokeOpacity="0.8" strokeWidth="1.6" />
//     <Path
//       d="M21 14C18.79 14 17 15.79 17 18V20H25V18C25 15.79 23.21 14 21 14Z"
//       stroke="white"
//       strokeWidth="1.6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M26 20H16C14.9 20 14 20.9 14 22V28C14 29.1 14.9 30 16 30H26C27.1 30 28 29.1 28 28V22C28 20.9 27.1 20 26 20Z"
//       stroke="white"
//       strokeWidth="1.6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// export default function CreateCategoryScreen({ navigation }) {
//   const [categoryName, setCategoryName] = useState('');
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleCreate = () => {
//     if (!categoryName.trim()) {
//       alert('Please enter a category name');
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       alert(`Category "${categoryName}" created!`);
//       navigation.goBack();
//     }, 1500);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#0B1035" />

//       {/* ⭐ Close + Title Row */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
//           <X size={24} color="#fff" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Start a Category</Text>
//       </View>

//       {/* Input */}
//       <Text style={styles.label}>Category name</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="new-space"
//         placeholderTextColor="#7B82A3"
//         value={categoryName}
//         onChangeText={setCategoryName}
//       />

//       <Text style={styles.infoText}>
//         Private Spaces are visible only to people you choose. Everyone else won't see them at all.
//       </Text>

//       {/* Private Switch Row */}
//       <View style={styles.switchRow}>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <LockSVG />
//           <Text style={styles.switchText}>Private Category</Text>
//         </View>

//         <Switch
//           value={isPrivate}
//           onValueChange={setIsPrivate}
//           thumbColor={isPrivate ? '#3B82F6' : '#fff'}
//           trackColor={{ false: '#64748B', true: '#2563EB' }}
//         />
//       </View>

//       <Text style={styles.learnMoreText}>Learn more about Space Modes →</Text>

//       {/* Create Button */}
//       <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={handleCreate}>
//         <LinearGradient
//           colors={['#1a2957', '#0C142A', '#1a2957']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.gradientButton}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.createButtonText}>Create</Text>
//           )}
//         </LinearGradient>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#07152C', paddingHorizontal: 24 },

//   /* ⭐ Added: Close + Title Row */
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 30,
//     marginBottom: 22,
//   },

//   closeButton: { marginRight: 10 },

//   headerTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//   },

//   label: { color: '#7B82A3', fontSize: 14, marginBottom: 6 },

//   input: {
//     backgroundColor: '#0F1B3C',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 14,

//     borderWidth: 1,
//     borderColor: '#3154BA',

//     shadowColor: '#3154BA',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.6,
//     shadowRadius: 6,
//     elevation: 8,
//   },

//   infoText: { color: '#7B82A3', fontSize: 13, marginBottom: 20, lineHeight: 18 },

//   switchRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#0F1B3C',
//     height: 54,

//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     marginBottom: 20,

//     borderWidth: 1,
//     borderColor: '#3154BA',

//     shadowColor: '#3154BA',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.45,
//     shadowRadius: 10,
//     elevation: 8,
//   },

//   switchText: { color: '#fff', fontSize: 16, marginLeft: 12 },

//   learnMoreText: { color: '#7B82A3', fontSize: 13, textAlign: 'center', marginBottom: 34 },

//   buttonWrapper: { alignSelf: 'center', width: 135, height: 52 },

//   gradientButton: {
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//     shadowColor: '#3F68FF',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 8,
//     elevation: 5,
//     borderWidth: 1,
//   },

//   createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import Svg, { Path, Circle } from "react-native-svg";

const LockSVG = () => (
  <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    <Circle cx="21" cy="21" r="20" stroke="#2F62FF" strokeOpacity="0.3" strokeWidth="1.2" />
    <Circle cx="21" cy="21" r="16" stroke="#3F68FF" strokeOpacity="0.8" strokeWidth="1.6" />
    <Path
      d="M21 14C18.79 14 17 15.79 17 18V20H25V18C25 15.79 23.21 14 21 14Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M26 20H16C14.9 20 14 20.9 14 22V28C14 29.1 14.9 30 16 30H26C27.1 30 28 29.1 28 28V22C28 20.9 27.1 20 26 20Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function CreateCategoryScreen({ navigation }) {
  const [categoryName, setCategoryName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (!categoryName.trim()) {
      alert('Please enter a category name');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Category "${categoryName}" created!`);
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1035" />

      {/* ⭐ PERFECT CENTER HEADER ⭐ */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <X size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Start a Category</Text>
      </View>

      {/* Input */}
      <Text style={styles.label}>Category name</Text>

      <TextInput
        style={styles.input}
        placeholder="new-space"
        placeholderTextColor="#7B82A3"
        value={categoryName}
        onChangeText={setCategoryName}
      />

      <Text style={styles.infoText}>
        Private Spaces are visible only to people you choose. Everyone else won't see them at all.
      </Text>

      {/* Private Switch Row */}
      <View style={styles.switchRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LockSVG />
          <Text style={styles.switchText}>Private Category</Text>
        </View>

        <Switch
          value={isPrivate}
          onValueChange={setIsPrivate}
          thumbColor={isPrivate ? '#3B82F6' : '#fff'}
          trackColor={{ false: '#64748B', true: '#2563EB' }}
        />
      </View>

      <Text style={styles.learnMoreText}>Learn more about Space Modes →</Text>

      {/* Create Button */}
      <TouchableOpacity style={styles.buttonWrapper} activeOpacity={0.8} onPress={handleCreate}>
        <LinearGradient
          colors={['#1a2957', '#0C142A', '#1a2957']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createButtonText}>Create</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07152C', paddingHorizontal: 24 },

  /* ⭐ PERFECT CENTER HEADER ⭐ */
  headerRow: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
    height: 40,
  },

  closeButton: {
    position: "absolute",
    left: 0,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
  },

  label: { color: '#7B82A3', 
    fontSize: 14, 
    marginBottom: 8 
  },

  input: {
    backgroundColor: '#0F1B3C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#3154BA',
    shadowColor: '#3154BA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },

  infoText: { color: '#7B82A3', 
    fontSize: 13,
     marginBottom: 20, 
     lineHeight: 18
     },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F1B3C',
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3154BA',
    shadowColor: '#3154BA',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },

  switchText: { color: '#fff', fontSize: 16, marginLeft: 12 },

  learnMoreText: { color: '#7B82A3', fontSize: 13, textAlign: 'center', marginBottom: 34 },

  buttonWrapper: { alignSelf: 'center', width: 135, height: 52 },

  gradientButton: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    shadowColor: '#3F68FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
  },

  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
