// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   StyleSheet,
// // // // // // //   TouchableOpacity,
// // // // // // //   Image,
// // // // // // //   TextInput,
// // // // // // //   StatusBar,
// // // // // // //   Animated,
// // // // // // //   PanResponder,
// // // // // // //   Pressable,
// // // // // // // } from "react-native";
// // // // // // // import { SafeAreaView } from "react-native-safe-area-context";
// // // // // // // import * as ImagePicker from "expo-image-picker";
// // // // // // // import { Ionicons } from "@expo/vector-icons";

// // // // // // // const COLORS = ["#fff", "#f87171", "#facc15", "#4ade80", "#60a5fa", "#a78bfa"];

// // // // // // // export default function CreateBlipsScreen({ navigation }) {
// // // // // // //   const [image, setImage] = useState(null);
// // // // // // //   const [texts, setTexts] = useState([]);
// // // // // // //   const [activeId, setActiveId] = useState(null);
// // // // // // //   const [showInput, setShowInput] = useState(false);

// // // // // // //   useEffect(() => {
// // // // // // //     ImagePicker.requestMediaLibraryPermissionsAsync();
// // // // // // //   }, []);

// // // // // // //   /* -------- IMAGE PICK -------- */
// // // // // // //   const openGallery = async () => {
// // // // // // //     const res = await ImagePicker.launchImageLibraryAsync({
// // // // // // //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // // // // // //       quality: 1,
// // // // // // //     });
// // // // // // //     if (!res.canceled) setImage(res.assets[0].uri);
// // // // // // //   };

// // // // // // //   /* -------- ADD TEXT -------- */
// // // // // // //   const addText = () => {
// // // // // // //     const id = Date.now().toString();
// // // // // // //     const pan = new Animated.ValueXY({ x: 120, y: 250 });

// // // // // // //     const panResponder = PanResponder.create({
// // // // // // //       onStartShouldSetPanResponder: () => true,
// // // // // // //       onPanResponderGrant: () => {
// // // // // // //         setActiveId(id);
// // // // // // //         setShowInput(false);
// // // // // // //       },
// // // // // // //       onPanResponderMove: Animated.event(
// // // // // // //         [null, { dx: pan.x, dy: pan.y }],
// // // // // // //         { useNativeDriver: false }
// // // // // // //       ),
// // // // // // //       onPanResponderRelease: () => pan.flattenOffset(),
// // // // // // //     });

// // // // // // //     setTexts((p) => [
// // // // // // //       ...p,
// // // // // // //       {
// // // // // // //         id,
// // // // // // //         text: "Tap to edit",
// // // // // // //         size: 26,
// // // // // // //         color: "#fff",
// // // // // // //         align: "center",
// // // // // // //         pan,
// // // // // // //         panResponder,
// // // // // // //       },
// // // // // // //     ]);

// // // // // // //     setActiveId(id);
// // // // // // //     setShowInput(true);
// // // // // // //   };

// // // // // // //   const activeText = texts.find((t) => t.id === activeId);

// // // // // // //   /* -------- SAFE UPDATE -------- */
// // // // // // //   const updateActive = (key, value) => {
// // // // // // //     if (!activeText) return;
// // // // // // //     setTexts((p) =>
// // // // // // //       p.map((t) => (t.id === activeId ? { ...t, [key]: value } : t))
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const toggleAlign = () => {
// // // // // // //     if (!activeText) return;
// // // // // // //     updateActive(
// // // // // // //       "align",
// // // // // // //       activeText.align === "left"
// // // // // // //         ? "center"
// // // // // // //         : activeText.align === "center"
// // // // // // //         ? "right"
// // // // // // //         : "left"
// // // // // // //     );
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <SafeAreaView style={styles.container}>
// // // // // // //       <StatusBar barStyle="light-content" />

// // // // // // //       {/* HEADER */}
// // // // // // //       <View style={styles.header}>
// // // // // // //         <TouchableOpacity onPress={() => navigation.goBack()}>
// // // // // // //           <Ionicons name="close" size={26} color="#fff" />
// // // // // // //         </TouchableOpacity>
// // // // // // //         <Text style={styles.headerTitle}>Create Story</Text>
// // // // // // //         <TouchableOpacity onPress={openGallery}>
// // // // // // //           <Ionicons name="image-outline" size={22} color="#4f7cff" />
// // // // // // //         </TouchableOpacity>
// // // // // // //       </View>

// // // // // // //       {/* CANVAS */}
// // // // // // //       <Pressable
// // // // // // //         style={styles.preview}
// // // // // // //         onPress={() => {
// // // // // // //           setActiveId(null);
// // // // // // //           setShowInput(false);
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         {image ? (
// // // // // // //           <>
// // // // // // //             <Image source={{ uri: image }} style={styles.image} />

// // // // // // //             {texts.map((item, index) => (
// // // // // // //               <Animated.View
// // // // // // //                 key={item.id}
// // // // // // //                 style={[
// // // // // // //                   styles.textWrap,
// // // // // // //                   {
// // // // // // //                     transform: item.pan.getTranslateTransform(),
// // // // // // //                     zIndex: item.id === activeId ? 10 : index,
// // // // // // //                   },
// // // // // // //                 ]}
// // // // // // //                 {...item.panResponder.panHandlers}
// // // // // // //               >
// // // // // // //                 <TouchableOpacity
// // // // // // //                   onPress={() => {
// // // // // // //                     setActiveId(item.id);
// // // // // // //                     setShowInput(true);
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <Text
// // // // // // //                     style={{
// // // // // // //                       color: item.color,
// // // // // // //                       fontSize: item.size,
// // // // // // //                       textAlign: item.align,
// // // // // // //                       fontWeight: "700",
// // // // // // //                       textShadowColor: "#000",
// // // // // // //                       textShadowRadius: 6,
// // // // // // //                     }}
// // // // // // //                   >
// // // // // // //                     {item.text}
// // // // // // //                   </Text>
// // // // // // //                 </TouchableOpacity>
// // // // // // //               </Animated.View>
// // // // // // //             ))}
// // // // // // //           </>
// // // // // // //         ) : (
// // // // // // //           <Text style={styles.placeholder}>Select Image</Text>
// // // // // // //         )}
// // // // // // //       </Pressable>

// // // // // // //       {/* INPUT */}
// // // // // // //       {showInput && activeText && (
// // // // // // //         <TextInput
// // // // // // //           autoFocus
// // // // // // //           value={activeText.text}
// // // // // // //           onChangeText={(v) => updateActive("text", v)}
// // // // // // //           placeholder="Type text..."
// // // // // // //           placeholderTextColor="#94a3b8"
// // // // // // //           style={styles.input}
// // // // // // //         />
// // // // // // //       )}

// // // // // // //       {/* CONTROLS */}
// // // // // // //       {activeText && (
// // // // // // //         <>
// // // // // // //           <View style={styles.controls}>
// // // // // // //             <TouchableOpacity style={styles.btn} onPress={addText}>
// // // // // // //               <Text style={styles.btnText}>Aa</Text>
// // // // // // //             </TouchableOpacity>

// // // // // // //             <TouchableOpacity
// // // // // // //               style={styles.btn}
// // // // // // //               onPress={() =>
// // // // // // //                 updateActive("size", Math.min(activeText.size + 4, 42))
// // // // // // //               }
// // // // // // //             >
// // // // // // //               <Ionicons name="add-outline" size={18} color="#fff" />
// // // // // // //             </TouchableOpacity>

// // // // // // //             <TouchableOpacity
// // // // // // //               style={styles.btn}
// // // // // // //               onPress={() =>
// // // // // // //                 updateActive("size", Math.max(activeText.size - 4, 14))
// // // // // // //               }
// // // // // // //             >
// // // // // // //               <Ionicons name="remove-outline" size={18} color="#fff" />
// // // // // // //             </TouchableOpacity>

// // // // // // //             <TouchableOpacity style={styles.btn} onPress={toggleAlign}>
// // // // // // //               <Ionicons
// // // // // // //                 name="swap-horizontal-outline"
// // // // // // //                 size={18}
// // // // // // //                 color="#fff"
// // // // // // //               />
// // // // // // //             </TouchableOpacity>
// // // // // // //           </View>

// // // // // // //           {/* COLORS */}
// // // // // // //           <View style={styles.colorRow}>
// // // // // // //             {COLORS.map((c) => (
// // // // // // //               <TouchableOpacity
// // // // // // //                 key={c}
// // // // // // //                 onPress={() => updateActive("color", c)}
// // // // // // //                 style={[styles.colorDot, { backgroundColor: c }]}
// // // // // // //               />
// // // // // // //             ))}
// // // // // // //           </View>
// // // // // // //         </>
// // // // // // //       )}
// // // // // // //     </SafeAreaView>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* -------- STYLES -------- */
// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: { flex: 1, backgroundColor: "#050b1e" },

// // // // // // //   header: {
// // // // // // //     height: 56,
// // // // // // //     paddingHorizontal: 16,
// // // // // // //     flexDirection: "row",
// // // // // // //     alignItems: "center",
// // // // // // //     justifyContent: "space-between",
// // // // // // //   },
// // // // // // //   headerTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },

// // // // // // //   preview: { flex: 1, justifyContent: "center", alignItems: "center" },
// // // // // // //   image: { width: "100%", height: "100%", resizeMode: "cover" },
// // // // // // //   placeholder: { color: "#64748b" },

// // // // // // //   textWrap: { position: "absolute" },

// // // // // // //   input: {
// // // // // // //     position: "absolute",
// // // // // // //     bottom: 150,
// // // // // // //     left: 20,
// // // // // // //     right: 20,
// // // // // // //     height: 46,
// // // // // // //     backgroundColor: "#020617",
// // // // // // //     borderRadius: 12,
// // // // // // //     paddingHorizontal: 16,
// // // // // // //     color: "#fff",
// // // // // // //   },

// // // // // // //   controls: { position: "absolute", right: 10, top: 120, gap: 12 },
// // // // // // //   btn: {
// // // // // // //     width: 44,
// // // // // // //     height: 44,
// // // // // // //     borderRadius: 22,
// // // // // // //     backgroundColor: "#1e293b",
// // // // // // //     justifyContent: "center",
// // // // // // //     alignItems: "center",
// // // // // // //   },
// // // // // // //   btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

// // // // // // //   colorRow: {
// // // // // // //     position: "absolute",
// // // // // // //     bottom: 120,
// // // // // // //     flexDirection: "row",
// // // // // // //     gap: 10,
// // // // // // //   },
// // // // // // //   colorDot: {
// // // // // // //     width: 28,
// // // // // // //     height: 28,
// // // // // // //     borderRadius: 14,
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: "#000",
// // // // // // //   },
// // // // // // // });
// // // // // // import React, { useEffect, useState, useRef } from "react";
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   StyleSheet,
// // // // // //   TouchableOpacity,
// // // // // //   Image,
// // // // // //   TextInput,
// // // // // //   StatusBar,
// // // // // //   Animated,
// // // // // //   PanResponder,
// // // // // //   Pressable,
// // // // // //   Alert,
// // // // // //   Dimensions,
// // // // // // } from "react-native";
// // // // // // import { SafeAreaView } from "react-native-safe-area-context";
// // // // // // import * as ImagePicker from "expo-image-picker";
// // // // // // import { Ionicons } from "@expo/vector-icons";

// // // // // // const { width, height } = Dimensions.get("window");
// // // // // // const COLORS = ["#ffffff", "#ff5c5c", "#5ce1e6", "#5cff9d", "#ff9d5c", "#d85cff", "#fff85c"];

// // // // // // export default function CreateBlipsScreen({ navigation }) {
// // // // // //   const [image, setImage] = useState(null);
// // // // // //   const [texts, setTexts] = useState([]);
// // // // // //   const [activeId, setActiveId] = useState(null);
// // // // // //   const [showInput, setShowInput] = useState(false);
// // // // // //   const [inputValue, setInputValue] = useState("");
// // // // // //   const textInputRef = useRef(null);

// // // // // //   useEffect(() => {
// // // // // //     (async () => {
// // // // // //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // // // // //       if (status !== "granted") {
// // // // // //         Alert.alert("Permission required", "We need access to your photos to create stories.");
// // // // // //       }
// // // // // //     })();
// // // // // //   }, []);

// // // // // //   /* -------- IMAGE PICK -------- */
// // // // // //   const openGallery = async () => {
// // // // // //     try {
// // // // // //       const res = await ImagePicker.launchImageLibraryAsync({
// // // // // //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // // // // //         quality: 1,
// // // // // //         allowsEditing: false,
// // // // // //       });
// // // // // //       if (!res.canceled && res.assets[0].uri) {
// // // // // //         setImage(res.assets[0].uri);
// // // // // //         setTexts([]); // Reset texts when new image is selected
// // // // // //         setActiveId(null);
// // // // // //         setShowInput(false);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Error picking image:", error);
// // // // // //       Alert.alert("Error", "Failed to pick image. Please try again.");
// // // // // //     }
// // // // // //   };

// // // // // //   /* -------- ADD TEXT -------- */
// // // // // //   const addText = () => {
// // // // // //     if (!image) {
// // // // // //       Alert.alert("Select Image First", "Please select an image before adding text.");
// // // // // //       return;
// // // // // //     }

// // // // // //     const id = Date.now().toString();
// // // // // //     const pan = new Animated.ValueXY({ x: width / 2 - 60, y: height / 2 - 50 });

// // // // // //     const panResponder = PanResponder.create({
// // // // // //       onStartShouldSetPanResponder: () => true,
// // // // // //       onPanResponderGrant: () => {
// // // // // //         setActiveId(id);
// // // // // //         setShowInput(false);
// // // // // //         pan.extractOffset();
// // // // // //       },
// // // // // //       onPanResponderMove: Animated.event(
// // // // // //         [null, { dx: pan.x, dy: pan.y }],
// // // // // //         { useNativeDriver: false }
// // // // // //       ),
// // // // // //       onPanResponderRelease: () => {
// // // // // //         pan.flattenOffset();
// // // // // //       },
// // // // // //     });

// // // // // //     const newText = {
// // // // // //       id,
// // // // // //       text: "Tap to edit",
// // // // // //       size: 28,
// // // // // //       color: COLORS[0],
// // // // // //       align: "center",
// // // // // //       pan,
// // // // // //       panResponder,
// // // // // //     };

// // // // // //     setTexts((prev) => [...prev, newText]);
// // // // // //     setActiveId(id);
// // // // // //     setInputValue("Tap to edit");
// // // // // //     setShowInput(true);
    
// // // // // //     // Focus input after a small delay
// // // // // //     setTimeout(() => {
// // // // // //       textInputRef.current?.focus();
// // // // // //     }, 100);
// // // // // //   };

// // // // // //   /* -------- UPDATE TEXT -------- */
// // // // // //   const updateText = (id, key, value) => {
// // // // // //     setTexts((prev) =>
// // // // // //       prev.map((text) => (text.id === id ? { ...text, [key]: value } : text))
// // // // // //     );
// // // // // //   };

// // // // // //   /* -------- DELETE ACTIVE TEXT -------- */
// // // // // //   const deleteActiveText = () => {
// // // // // //     if (!activeId) return;
    
// // // // // //     setTexts((prev) => prev.filter((text) => text.id !== activeId));
// // // // // //     setActiveId(null);
// // // // // //     setShowInput(false);
// // // // // //     setInputValue("");
// // // // // //   };

// // // // // //   /* -------- TOGGLE ALIGNMENT -------- */
// // // // // //   const toggleAlign = () => {
// // // // // //     if (!activeId) return;
    
// // // // // //     const activeText = texts.find((t) => t.id === activeId);
// // // // // //     if (!activeText) return;

// // // // // //     const alignOrder = { left: "center", center: "right", right: "left" };
// // // // // //     const newAlign = alignOrder[activeText.align] || "center";
// // // // // //     updateText(activeId, "align", newAlign);
// // // // // //   };

// // // // // //   /* -------- CHANGE FONT SIZE -------- */
// // // // // //   const changeFontSize = (increment) => {
// // // // // //     if (!activeId) return;
    
// // // // // //     const activeText = texts.find((t) => t.id === activeId);
// // // // // //     if (!activeText) return;

// // // // // //     const newSize = Math.max(14, Math.min(72, activeText.size + increment));
// // // // // //     updateText(activeId, "size", newSize);
// // // // // //   };

// // // // // //   /* -------- HANDLE TEXT TAP -------- */
// // // // // //   const handleTextTap = (id) => {
// // // // // //     const text = texts.find((t) => t.id === id);
// // // // // //     if (text) {
// // // // // //       setActiveId(id);
// // // // // //       setInputValue(text.text);
// // // // // //       setShowInput(true);
      
// // // // // //       setTimeout(() => {
// // // // // //         textInputRef.current?.focus();
// // // // // //       }, 100);
// // // // // //     }
// // // // // //   };

// // // // // //   /* -------- HANDLE INPUT CHANGE -------- */
// // // // // //   const handleInputChange = (text) => {
// // // // // //     setInputValue(text);
// // // // // //     if (activeId) {
// // // // // //       updateText(activeId, "text", text);
// // // // // //     }
// // // // // //   };

// // // // // //   /* -------- HANDLE INPUT BLUR -------- */
// // // // // //   const handleInputBlur = () => {
// // // // // //     if (inputValue.trim() === "") {
// // // // // //       deleteActiveText();
// // // // // //     }
// // // // // //   };

// // // // // //   /* -------- GET ACTIVE TEXT -------- */
// // // // // //   const activeText = texts.find((t) => t.id === activeId);

// // // // // //   return (
// // // // // //     <SafeAreaView style={styles.container}>
// // // // // //       <StatusBar barStyle="light-content" backgroundColor="#050b1e" />

// // // // // //       {/* HEADER */}
// // // // // //       <View style={styles.header}>
// // // // // //         <TouchableOpacity 
// // // // // //           style={styles.headerButton}
// // // // // //           onPress={() => {
// // // // // //             if (texts.length > 0 || image) {
// // // // // //               Alert.alert(
// // // // // //                 "Discard Changes?",
// // // // // //                 "Are you sure you want to go back? All changes will be lost.",
// // // // // //                 [
// // // // // //                   { text: "Cancel", style: "cancel" },
// // // // // //                   { text: "Discard", onPress: () => navigation.goBack() }
// // // // // //                 ]
// // // // // //               );
// // // // // //             } else {
// // // // // //               navigation.goBack();
// // // // // //             }
// // // // // //           }}
// // // // // //         >
// // // // // //           <Ionicons name="close" size={28} color="#fff" />
// // // // // //         </TouchableOpacity>
        
// // // // // //         <Text style={styles.headerTitle}>Create Story</Text>
        
// // // // // //         <TouchableOpacity style={styles.headerButton} onPress={openGallery}>
// // // // // //           <Ionicons name="image-outline" size={26} color="#4f7cff" />
// // // // // //         </TouchableOpacity>
// // // // // //       </View>

// // // // // //       {/* CANVAS AREA */}
// // // // // //       <Pressable
// // // // // //         style={styles.preview}
// // // // // //         onPress={() => {
// // // // // //           setActiveId(null);
// // // // // //           setShowInput(false);
// // // // // //         }}
// // // // // //       >
// // // // // //         {image ? (
// // // // // //           <>
// // // // // //             <Image source={{ uri: image }} style={styles.image} />
            
// // // // // //             {texts.map((item) => (
// // // // // //               <Animated.View
// // // // // //                 key={item.id}
// // // // // //                 style={[
// // // // // //                   styles.textContainer,
// // // // // //                   {
// // // // // //                     transform: item.pan.getTranslateTransform(),
// // // // // //                     zIndex: item.id === activeId ? 100 : texts.indexOf(item) + 1,
// // // // // //                   },
// // // // // //                 ]}
// // // // // //                 {...item.panResponder.panHandlers}
// // // // // //               >
// // // // // //                 <TouchableOpacity
// // // // // //                   activeOpacity={0.7}
// // // // // //                   onPress={() => handleTextTap(item.id)}
// // // // // //                   style={[
// // // // // //                     styles.textWrapper,
// // // // // //                     activeId === item.id && styles.activeTextWrapper,
// // // // // //                   ]}
// // // // // //                 >
// // // // // //                   <Text
// // // // // //                     style={[
// // // // // //                       styles.textElement,
// // // // // //                       {
// // // // // //                         color: item.color,
// // // // // //                         fontSize: item.size,
// // // // // //                         textAlign: item.align,
// // // // // //                       },
// // // // // //                     ]}
// // // // // //                     numberOfLines={10}
// // // // // //                     adjustsFontSizeToFit={true}
// // // // // //                   >
// // // // // //                     {item.text}
// // // // // //                   </Text>
                  
// // // // // //                   {activeId === item.id && (
// // // // // //                     <View style={styles.selectionBorder} />
// // // // // //                   )}
// // // // // //                 </TouchableOpacity>
// // // // // //               </Animated.View>
// // // // // //             ))}
// // // // // //           </>
// // // // // //         ) : (
// // // // // //           <TouchableOpacity 
// // // // // //             style={styles.placeholderContainer}
// // // // // //             onPress={openGallery}
// // // // // //           >
// // // // // //             <Ionicons name="image-outline" size={60} color="#64748b" />
// // // // // //             <Text style={styles.placeholderText}>Tap to select image</Text>
// // // // // //           </TouchableOpacity>
// // // // // //         )}
// // // // // //       </Pressable>

// // // // // //       {/* TEXT INPUT */}
// // // // // //       {showInput && activeText && (
// // // // // //         <View style={styles.inputContainer}>
// // // // // //           <TextInput
// // // // // //             ref={textInputRef}
// // // // // //             autoFocus
// // // // // //             value={inputValue}
// // // // // //             onChangeText={handleInputChange}
// // // // // //             onBlur={handleInputBlur}
// // // // // //             placeholder="Type your text here..."
// // // // // //             placeholderTextColor="#94a3b8"
// // // // // //             style={styles.input}
// // // // // //             multiline
// // // // // //             maxLength={200}
// // // // // //           />
// // // // // //           {inputValue.length > 0 && (
// // // // // //             <TouchableOpacity
// // // // // //               style={styles.clearButton}
// // // // // //               onPress={() => {
// // // // // //                 setInputValue("");
// // // // // //                 updateText(activeId, "text", "");
// // // // // //               }}
// // // // // //             >
// // // // // //               <Ionicons name="close-circle" size={22} color="#94a3b8" />
// // // // // //             </TouchableOpacity>
// // // // // //           )}
// // // // // //         </View>
// // // // // //       )}

// // // // // //       {/* CONTROLS */}
// // // // // //       <View style={styles.controlsContainer}>
// // // // // //         {/* ADD TEXT BUTTON */}
// // // // // //         <TouchableOpacity 
// // // // // //           style={[styles.controlButton, !image && styles.disabledButton]}
// // // // // //           onPress={addText}
// // // // // //           disabled={!image}
// // // // // //         >
// // // // // //           <Text style={styles.addTextButton}>Aa</Text>
// // // // // //         </TouchableOpacity>

// // // // // //         {/* ACTIVE TEXT CONTROLS */}
// // // // // //         {activeText && (
// // // // // //           <>
// // // // // //             {/* SIZE CONTROLS */}
// // // // // //             <View style={styles.sizeControls}>
// // // // // //               <TouchableOpacity
// // // // // //                 style={styles.sizeButton}
// // // // // //                 onPress={() => changeFontSize(-2)}
// // // // // //               >
// // // // // //                 <Ionicons name="remove-outline" size={20} color="#fff" />
// // // // // //               </TouchableOpacity>
              
// // // // // //               <Text style={styles.sizeText}>{activeText.size}px</Text>
              
// // // // // //               <TouchableOpacity
// // // // // //                 style={styles.sizeButton}
// // // // // //                 onPress={() => changeFontSize(2)}
// // // // // //               >
// // // // // //                 <Ionicons name="add-outline" size={20} color="#fff" />
// // // // // //               </TouchableOpacity>
// // // // // //             </View>

// // // // // //             {/* ALIGNMENT BUTTON */}
// // // // // //             <TouchableOpacity 
// // // // // //               style={styles.controlButton}
// // // // // //               onPress={toggleAlign}
// // // // // //             >
// // // // // //               <Ionicons
// // // // // //                 name={
// // // // // //                   activeText.align === "left" ? "align-left-outline" :
// // // // // //                   activeText.align === "center" ? "align-center-outline" :
// // // // // //                   "align-right-outline"
// // // // // //                 }
// // // // // //                 size={22}
// // // // // //                 color="#fff"
// // // // // //               />
// // // // // //             </TouchableOpacity>

// // // // // //             {/* COLOR PICKER */}
// // // // // //             <View style={styles.colorPicker}>
// // // // // //               {COLORS.map((color) => (
// // // // // //                 <TouchableOpacity
// // // // // //                   key={color}
// // // // // //                   style={[
// // // // // //                     styles.colorOption,
// // // // // //                     { backgroundColor: color },
// // // // // //                     activeText.color === color && styles.selectedColor,
// // // // // //                   ]}
// // // // // //                   onPress={() => updateText(activeId, "color", color)}
// // // // // //                 />
// // // // // //               ))}
// // // // // //             </View>

// // // // // //             {/* DELETE BUTTON */}
// // // // // //             <TouchableOpacity 
// // // // // //               style={[styles.controlButton, styles.deleteButton]}
// // // // // //               onPress={deleteActiveText}
// // // // // //             >
// // // // // //               <Ionicons name="trash-outline" size={22} color="#fff" />
// // // // // //             </TouchableOpacity>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </View>
// // // // // //     </SafeAreaView>
// // // // // //   );
// // // // // // }

// // // // // // /* -------- STYLES -------- */
// // // // // // const styles = StyleSheet.create({
// // // // // //   container: { 
// // // // // //     flex: 1, 
// // // // // //     backgroundColor: "#050b1e" 
// // // // // //   },

// // // // // //   header: {
// // // // // //     height: 60,
// // // // // //     paddingHorizontal: 16,
// // // // // //     flexDirection: "row",
// // // // // //     alignItems: "center",
// // // // // //     justifyContent: "space-between",
// // // // // //     backgroundColor: "#050b1e",
// // // // // //     borderBottomWidth: 1,
// // // // // //     borderBottomColor: "#1e293b",
// // // // // //   },
// // // // // //   headerButton: {
// // // // // //     padding: 8,
// // // // // //   },
// // // // // //   headerTitle: { 
// // // // // //     color: "#fff", 
// // // // // //     fontSize: 16, 
// // // // // //     fontWeight: "700",
// // // // // //     letterSpacing: 0.5,
// // // // // //   },

// // // // // //   preview: { 
// // // // // //     flex: 1, 
// // // // // //     backgroundColor: "#0f172a",
// // // // // //   },
// // // // // //   image: { 
// // // // // //     width: "100%", 
// // // // // //     height: "100%", 
// // // // // //     resizeMode: "cover" 
// // // // // //   },
  
// // // // // //   placeholderContainer: {
// // // // // //     flex: 1,
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //   },
// // // // // //   placeholderText: { 
// // // // // //     color: "#64748b",
// // // // // //     marginTop: 12,
// // // // // //     fontSize: 16,
// // // // // //   },

// // // // // //   textContainer: {
// // // // // //     position: "absolute",
// // // // // //     maxWidth: width * 0.8,
// // // // // //   },
// // // // // //   textWrapper: {
// // // // // //     padding: 8,
// // // // // //     borderRadius: 4,
// // // // // //   },
// // // // // //   activeTextWrapper: {
// // // // // //     backgroundColor: "rgba(30, 41, 59, 0.3)",
// // // // // //   },
// // // // // //   textElement: {
// // // // // //     fontWeight: "700",
// // // // // //     textShadowColor: "rgba(0, 0, 0, 0.8)",
// // // // // //     textShadowOffset: { width: 1, height: 1 },
// // // // // //     textShadowRadius: 4,
// // // // // //     includeFontPadding: false,
// // // // // //   },
// // // // // //   selectionBorder: {
// // // // // //     position: "absolute",
// // // // // //     top: 0,
// // // // // //     left: 0,
// // // // // //     right: 0,
// // // // // //     bottom: 0,
// // // // // //     borderWidth: 2,
// // // // // //     borderColor: "#4f7cff",
// // // // // //     borderRadius: 4,
// // // // // //     borderStyle: "dashed",
// // // // // //   },

// // // // // //   inputContainer: {
// // // // // //     position: "absolute",
// // // // // //     bottom: 140,
// // // // // //     left: 20,
// // // // // //     right: 20,
// // // // // //     flexDirection: "row",
// // // // // //     alignItems: "center",
// // // // // //   },
// // // // // //   input: {
// // // // // //     flex: 1,
// // // // // //     height: 50,
// // // // // //     backgroundColor: "rgba(2, 6, 23, 0.95)",
// // // // // //     borderRadius: 12,
// // // // // //     paddingHorizontal: 16,
// // // // // //     paddingRight: 40,
// // // // // //     color: "#fff",
// // // // // //     fontSize: 16,
// // // // // //     borderWidth: 1,
// // // // // //     borderColor: "#334155",
// // // // // //   },
// // // // // //   clearButton: {
// // // // // //     position: "absolute",
// // // // // //     right: 16,
// // // // // //     padding: 4,
// // // // // //   },

// // // // // //   controlsContainer: {
// // // // // //     position: "absolute",
// // // // // //     right: 16,
// // // // // //     top: 100,
// // // // // //     gap: 12,
// // // // // //     alignItems: "center",
// // // // // //   },
// // // // // //   controlButton: {
// // // // // //     width: 48,
// // // // // //     height: 48,
// // // // // //     borderRadius: 24,
// // // // // //     backgroundColor: "rgba(30, 41, 59, 0.9)",
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //     shadowColor: "#000",
// // // // // //     shadowOffset: { width: 0, height: 2 },
// // // // // //     shadowOpacity: 0.3,
// // // // // //     shadowRadius: 4,
// // // // // //     elevation: 5,
// // // // // //   },
// // // // // //   disabledButton: {
// // // // // //     opacity: 0.5,
// // // // // //   },
// // // // // //   deleteButton: {
// // // // // //     backgroundColor: "rgba(239, 68, 68, 0.9)",
// // // // // //   },
// // // // // //   addTextButton: { 
// // // // // //     color: "#fff", 
// // // // // //     fontSize: 20, 
// // // // // //     fontWeight: "700" 
// // // // // //   },

// // // // // //   sizeControls: {
// // // // // //     backgroundColor: "rgba(30, 41, 59, 0.9)",
// // // // // //     borderRadius: 24,
// // // // // //     paddingHorizontal: 12,
// // // // // //     paddingVertical: 8,
// // // // // //     flexDirection: "row",
// // // // // //     alignItems: "center",
// // // // // //     gap: 8,
// // // // // //   },
// // // // // //   sizeButton: {
// // // // // //     width: 32,
// // // // // //     height: 32,
// // // // // //     borderRadius: 16,
// // // // // //     backgroundColor: "#475569",
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //   },
// // // // // //   sizeText: {
// // // // // //     color: "#fff",
// // // // // //     fontSize: 14,
// // // // // //     fontWeight: "600",
// // // // // //     minWidth: 40,
// // // // // //     textAlign: "center",
// // // // // //   },

// // // // // //   colorPicker: {
// // // // // //     backgroundColor: "rgba(30, 41, 59, 0.9)",
// // // // // //     borderRadius: 24,
// // // // // //     padding: 8,
// // // // // //     flexDirection: "row",
// // // // // //     gap: 6,
// // // // // //   },
// // // // // //   colorOption: {
// // // // // //     width: 28,
// // // // // //     height: 28,
// // // // // //     borderRadius: 14,
// // // // // //     borderWidth: 2,
// // // // // //     borderColor: "transparent",
// // // // // //   },
// // // // // //   selectedColor: {
// // // // // //     borderColor: "#fff",
// // // // // //     transform: [{ scale: 1.1 }],
// // // // // //   },
// // // // // // });


// // // // // import React, { useEffect, useState, useRef, useCallback } from "react";
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   StyleSheet,
// // // // //   TouchableOpacity,
// // // // //   Image,
// // // // //   TextInput,
// // // // //   StatusBar,
// // // // //   Animated,
// // // // //   PanResponder,
// // // // //   Pressable,
// // // // //   Alert,
// // // // //   Dimensions,
// // // // //   ScrollView,
// // // // //   Modal,
// // // // //   FlatList,
// // // // // } from "react-native";
// // // // // import { SafeAreaView } from "react-native-safe-area-context";
// // // // // import * as ImagePicker from "expo-image-picker";
// // // // // import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
// // // // // import Slider from '@react-native-community/slider';
// // // // // import * as FileSystem from 'expo-file-system';
// // // // // import * as Sharing from 'expo-sharing';

// // // // // const { width, height } = Dimensions.get("window");
// // // // // const ASPECT_RATIO = 9/16;
// // // // // const STORY_WIDTH = width;
// // // // // const STORY_HEIGHT = width / ASPECT_RATIO;

// // // // // // Instagram-style color palette
// // // // // const COLORS = [
// // // // //   "#FFFFFF", "#FF5C5C", "#FF9F00", "#FFD700", "#32CD32", "#1E90FF", 
// // // // //   "#9370DB", "#FF69B4", "#00CED1", "#FF4500", "#9ACD32", "#BA55D3",
// // // // //   "#000000", "#696969", "#D3D3D3"
// // // // // ];

// // // // // // Font options
// // // // // const FONTS = [
// // // // //   { name: "Default", value: "System" },
// // // // //   { name: "Bold", value: "System", weight: "bold" },
// // // // //   { name: "Thin", value: "System", weight: "200" },
// // // // //   { name: "Light", value: "System", weight: "300" },
// // // // //   { name: "Italic", value: "System", style: "italic" },
// // // // // ];

// // // // // // Background colors for text (like Instagram)
// // // // // const BACKGROUND_COLORS = [
// // // // //   "transparent", "rgba(0,0,0,0.7)", "rgba(255,255,255,0.7)", 
// // // // //   "rgba(255,92,92,0.7)", "rgba(30,144,255,0.7)", "rgba(50,205,50,0.7)"
// // // // // ];

// // // // // export default function InstagramStoryEditor({ navigation }) {
// // // // //   const [image, setImage] = useState(null);
// // // // //   const [texts, setTexts] = useState([]);
// // // // //   const [activeId, setActiveId] = useState(null);
// // // // //   const [showInput, setShowInput] = useState(false);
// // // // //   const [inputValue, setInputValue] = useState("");
// // // // //   const [showColorPicker, setShowColorPicker] = useState(false);
// // // // //   const [showFontPicker, setShowFontPicker] = useState(false);
// // // // //   const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
// // // // //   const [showStickers, setShowStickers] = useState(false);
// // // // //   const [drawingMode, setDrawingMode] = useState(false);
// // // // //   const [drawingPaths, setDrawingPaths] = useState([]);
// // // // //   const [currentDrawingPath, setCurrentDrawingPath] = useState([]);
// // // // //   const [drawingColor, setDrawingColor] = useState("#FF5C5C");
// // // // //   const [drawingWidth, setDrawingWidth] = useState(5);
// // // // //   const [showDrawingTools, setShowDrawingTools] = useState(false);
  
// // // // //   const textInputRef = useRef(null);
// // // // //   const canvasRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     (async () => {
// // // // //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // // // //       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      
// // // // //       if (status !== "granted" || cameraStatus !== "granted") {
// // // // //         Alert.alert(
// // // // //           "Permissions Required",
// // // // //           "Please grant camera and gallery permissions to use all features.",
// // // // //           [{ text: "OK" }]
// // // // //         );
// // // // //       }
// // // // //     })();
// // // // //   }, []);

// // // // //   /* -------- IMAGE PICKER -------- */
// // // // //   const openGallery = async () => {
// // // // //     try {
// // // // //       const res = await ImagePicker.launchImageLibraryAsync({
// // // // //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // // // //         quality: 1,
// // // // //         allowsEditing: false,
// // // // //         aspect: [9, 16],
// // // // //       });
      
// // // // //       if (!res.canceled && res.assets[0].uri) {
// // // // //         setImage(res.assets[0].uri);
// // // // //         setTexts([]);
// // // // //         setDrawingPaths([]);
// // // // //         setActiveId(null);
// // // // //         setShowInput(false);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       Alert.alert("Error", "Failed to pick image");
// // // // //     }
// // // // //   };

// // // // //   const openCamera = async () => {
// // // // //     try {
// // // // //       const res = await ImagePicker.launchCameraAsync({
// // // // //         quality: 1,
// // // // //         allowsEditing: false,
// // // // //         aspect: [9, 16],
// // // // //       });
      
// // // // //       if (!res.canceled && res.assets[0].uri) {
// // // // //         setImage(res.assets[0].uri);
// // // // //         setTexts([]);
// // // // //         setDrawingPaths([]);
// // // // //         setActiveId(null);
// // // // //         setShowInput(false);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       Alert.alert("Error", "Failed to take photo");
// // // // //     }
// // // // //   };

// // // // //   /* -------- ADD TEXT -------- */
// // // // //   const addText = () => {
// // // // //     if (!image) {
// // // // //       Alert.alert("Select Image", "Please select an image first");
// // // // //       return;
// // // // //     }

// // // // //     const id = Date.now().toString();
// // // // //     const pan = new Animated.ValueXY({ 
// // // // //       x: STORY_WIDTH / 2 - 60, 
// // // // //       y: STORY_HEIGHT / 2 - 25 
// // // // //     });

// // // // //     const panResponder = PanResponder.create({
// // // // //       onStartShouldSetPanResponder: () => true,
// // // // //       onPanResponderGrant: () => {
// // // // //         setActiveId(id);
// // // // //         setShowInput(false);
// // // // //         pan.extractOffset();
// // // // //       },
// // // // //       onPanResponderMove: Animated.event(
// // // // //         [null, { dx: pan.x, dy: pan.y }],
// // // // //         { useNativeDriver: false }
// // // // //       ),
// // // // //       onPanResponderRelease: () => {
// // // // //         pan.flattenOffset();
// // // // //       },
// // // // //       onPanResponderTerminate: () => {
// // // // //         pan.flattenOffset();
// // // // //       },
// // // // //     });

// // // // //     const newText = {
// // // // //       id,
// // // // //       text: "Tap to edit",
// // // // //       size: 32,
// // // // //       color: "#FFFFFF",
// // // // //       backgroundColor: "transparent",
// // // // //       align: "center",
// // // // //       font: "System",
// // // // //       fontWeight: "700",
// // // // //       fontStyle: "normal",
// // // // //       rotation: 0,
// // // // //       pan,
// // // // //       panResponder,
// // // // //     };

// // // // //     setTexts((prev) => [...prev, newText]);
// // // // //     setActiveId(id);
// // // // //     setInputValue("Tap to edit");
// // // // //     setShowInput(true);
    
// // // // //     setTimeout(() => {
// // // // //       textInputRef.current?.focus();
// // // // //     }, 100);
// // // // //   };

// // // // //   /* -------- UPDATE TEXT -------- */
// // // // //   const updateText = useCallback((id, key, value) => {
// // // // //     setTexts((prev) =>
// // // // //       prev.map((text) => (text.id === id ? { ...text, [key]: value } : text))
// // // // //     );
// // // // //   }, []);

// // // // //   /* -------- DELETE ACTIVE TEXT -------- */
// // // // //   const deleteActiveText = () => {
// // // // //     if (!activeId) return;
    
// // // // //     Alert.alert(
// // // // //       "Delete Text",
// // // // //       "Are you sure you want to delete this text?",
// // // // //       [
// // // // //         { text: "Cancel", style: "cancel" },
// // // // //         { 
// // // // //           text: "Delete", 
// // // // //           style: "destructive",
// // // // //           onPress: () => {
// // // // //             setTexts((prev) => prev.filter((text) => text.id !== activeId));
// // // // //             setActiveId(null);
// // // // //             setShowInput(false);
// // // // //             setInputValue("");
// // // // //           }
// // // // //         }
// // // // //       ]
// // // // //     );
// // // // //   };

// // // // //   /* -------- ROTATE TEXT -------- */
// // // // //   const rotateText = (degrees) => {
// // // // //     if (!activeId) return;
// // // // //     const activeText = texts.find((t) => t.id === activeId);
// // // // //     if (!activeText) return;
    
// // // // //     updateText(activeId, "rotation", (activeText.rotation + degrees) % 360);
// // // // //   };

// // // // //   /* -------- DRAWING FUNCTIONS -------- */
// // // // //   const startDrawing = (event) => {
// // // // //     if (!drawingMode || !image) return;
    
// // // // //     const { locationX, locationY } = event.nativeEvent;
// // // // //     setCurrentDrawingPath([{ x: locationX, y: locationY }]);
// // // // //   };

// // // // //   const moveDrawing = (event) => {
// // // // //     if (!drawingMode || currentDrawingPath.length === 0) return;
    
// // // // //     const { locationX, locationY } = event.nativeEvent;
// // // // //     setCurrentDrawingPath(prev => [...prev, { x: locationX, y: locationY }]);
// // // // //   };

// // // // //   const endDrawing = () => {
// // // // //     if (!drawingMode || currentDrawingPath.length === 0) return;
    
// // // // //     setDrawingPaths(prev => [...prev, {
// // // // //       path: currentDrawingPath,
// // // // //       color: drawingColor,
// // // // //       width: drawingWidth,
// // // // //       id: Date.now().toString()
// // // // //     }]);
// // // // //     setCurrentDrawingPath([]);
// // // // //   };

// // // // //   const clearDrawing = () => {
// // // // //     Alert.alert(
// // // // //       "Clear Drawing",
// // // // //       "Are you sure you want to clear all drawings?",
// // // // //       [
// // // // //         { text: "Cancel", style: "cancel" },
// // // // //         { 
// // // // //           text: "Clear", 
// // // // //           style: "destructive",
// // // // //           onPress: () => setDrawingPaths([])
// // // // //         }
// // // // //       ]
// // // // //     );
// // // // //   };

// // // // //   const undoDrawing = () => {
// // // // //     setDrawingPaths(prev => prev.slice(0, -1));
// // // // //   };

// // // // //   /* -------- SAVE AND SHARE -------- */
// // // // //   const saveStory = async () => {
// // // // //     if (!image) {
// // // // //       Alert.alert("Error", "No image to save");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       // Here you would implement actual screenshot/canvas capture
// // // // //       // For now, we'll just show a success message
// // // // //       Alert.alert(
// // // // //         "Story Saved",
// // // // //         "Your story has been saved to your gallery!",
// // // // //         [{ text: "OK" }]
// // // // //       );
// // // // //     } catch (error) {
// // // // //       Alert.alert("Error", "Failed to save story");
// // // // //     }
// // // // //   };

// // // // //   const shareStory = async () => {
// // // // //     if (!image) {
// // // // //       Alert.alert("Error", "No image to share");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       // Implement sharing functionality
// // // // //       Alert.alert(
// // // // //         "Share Story",
// // // // //         "Sharing feature would be implemented here",
// // // // //         [{ text: "OK" }]
// // // // //       );
// // // // //     } catch (error) {
// // // // //       Alert.alert("Error", "Failed to share story");
// // // // //     }
// // // // //   };

// // // // //   /* -------- STICKERS -------- */
// // // // //   const stickers = [
// // // // //     "❤️", "🔥", "😂", "😍", "😎", "🎉", "🌟", "💯", "✨", "🎈",
// // // // //     "📸", "💖", "👑", "⚡", "🎊", "🏆", "💫", "🎁", "💎", "⭐"
// // // // //   ];

// // // // //   const addSticker = (sticker) => {
// // // // //     const id = Date.now().toString();
// // // // //     const pan = new Animated.ValueXY({ 
// // // // //       x: STORY_WIDTH / 2 - 30, 
// // // // //       y: STORY_HEIGHT / 2 - 30 
// // // // //     });

// // // // //     const panResponder = PanResponder.create({
// // // // //       onStartShouldSetPanResponder: () => true,
// // // // //       onPanResponderGrant: () => {
// // // // //         setActiveId(id);
// // // // //         pan.extractOffset();
// // // // //       },
// // // // //       onPanResponderMove: Animated.event(
// // // // //         [null, { dx: pan.x, dy: pan.y }],
// // // // //         { useNativeDriver: false }
// // // // //       ),
// // // // //       onPanResponderRelease: () => {
// // // // //         pan.flattenOffset();
// // // // //       },
// // // // //     });

// // // // //     setTexts((prev) => [...prev, {
// // // // //       id,
// // // // //       text: sticker,
// // // // //       size: 40,
// // // // //       color: "#FFFFFF",
// // // // //       backgroundColor: "transparent",
// // // // //       align: "center",
// // // // //       font: "System",
// // // // //       fontWeight: "700",
// // // // //       rotation: 0,
// // // // //       pan,
// // // // //       panResponder,
// // // // //       isSticker: true,
// // // // //     }]);
// // // // //     setShowStickers(false);
// // // // //   };

// // // // //   /* -------- RENDER DRAWING -------- */
// // // // //   const renderDrawing = () => {
// // // // //     return (
// // // // //       <>
// // // // //         {drawingPaths.map((drawing, index) => (
// // // // //           <View
// // // // //             key={drawing.id || index}
// // // // //             style={[
// // // // //               styles.drawingPath,
// // // // //               {
// // // // //                 position: 'absolute',
// // // // //                 left: Math.min(...drawing.path.map(p => p.x)),
// // // // //                 top: Math.min(...drawing.path.map(p => p.y)),
// // // // //               }
// // // // //             ]}
// // // // //           >
// // // // //             {drawing.path.map((point, i) => {
// // // // //               if (i === 0) return null;
// // // // //               const prevPoint = drawing.path[i - 1];
// // // // //               return (
// // // // //                 <View
// // // // //                   key={i}
// // // // //                   style={{
// // // // //                     position: 'absolute',
// // // // //                     left: prevPoint.x,
// // // // //                     top: prevPoint.y,
// // // // //                     width: Math.sqrt(
// // // // //                       Math.pow(point.x - prevPoint.x, 2) + 
// // // // //                       Math.pow(point.y - prevPoint.y, 2)
// // // // //                     ),
// // // // //                     height: drawing.width,
// // // // //                     backgroundColor: drawing.color,
// // // // //                     transform: [{
// // // // //                       rotate: Math.atan2(
// // // // //                         point.y - prevPoint.y,
// // // // //                         point.x - prevPoint.x
// // // // //                       ) + 'rad'
// // // // //                     }],
// // // // //                     transformOrigin: '0% 50%',
// // // // //                   }}
// // // // //                 />
// // // // //               );
// // // // //             })}
// // // // //           </View>
// // // // //         ))}
        
// // // // //         {currentDrawingPath.length > 0 && currentDrawingPath.map((point, i) => {
// // // // //           if (i === 0) return null;
// // // // //           const prevPoint = currentDrawingPath[i - 1];
// // // // //           return (
// // // // //             <View
// // // // //               key={`current-${i}`}
// // // // //               style={{
// // // // //                 position: 'absolute',
// // // // //                 left: prevPoint.x,
// // // // //                 top: prevPoint.y,
// // // // //                 width: Math.sqrt(
// // // // //                   Math.pow(point.x - prevPoint.x, 2) + 
// // // // //                   Math.pow(point.y - prevPoint.y, 2)
// // // // //                 ),
// // // // //                 height: drawingWidth,
// // // // //                 backgroundColor: drawingColor,
// // // // //                 transform: [{
// // // // //                   rotate: Math.atan2(
// // // // //                     point.y - prevPoint.y,
// // // // //                     point.x - prevPoint.x
// // // // //                   ) + 'rad'
// // // // //                 }],
// // // // //                 transformOrigin: '0% 50%',
// // // // //               }}
// // // // //             />
// // // // //           );
// // // // //         })}
// // // // //       </>
// // // // //     );
// // // // //   };

// // // // //   const activeText = texts.find((t) => t.id === activeId);

// // // // //   return (
// // // // //     <SafeAreaView style={styles.container}>
// // // // //       <StatusBar barStyle="light-content" backgroundColor="#000" />

// // // // //       {/* HEADER */}
// // // // //       <View style={styles.header}>
// // // // //         <TouchableOpacity 
// // // // //           style={styles.headerButton}
// // // // //           onPress={() => {
// // // // //             if (texts.length > 0 || drawingPaths.length > 0 || image) {
// // // // //               Alert.alert(
// // // // //                 "Discard Changes",
// // // // //                 "Are you sure you want to exit? All changes will be lost.",
// // // // //                 [
// // // // //                   { text: "Cancel", style: "cancel" },
// // // // //                   { text: "Discard", style: "destructive", onPress: () => navigation.goBack() }
// // // // //                 ]
// // // // //               );
// // // // //             } else {
// // // // //               navigation.goBack();
// // // // //             }
// // // // //           }}
// // // // //         >
// // // // //           <Ionicons name="close" size={28} color="#fff" />
// // // // //         </TouchableOpacity>
        
// // // // //         <Text style={styles.headerTitle}>Create Story</Text>
        
// // // // //         <View style={styles.headerRight}>
// // // // //           <TouchableOpacity style={styles.headerButton} onPress={saveStory}>
// // // // //             <Ionicons name="download-outline" size={24} color="#fff" />
// // // // //           </TouchableOpacity>
// // // // //           <TouchableOpacity style={styles.headerButton} onPress={shareStory}>
// // // // //             <Ionicons name="share-social-outline" size={24} color="#fff" />
// // // // //           </TouchableOpacity>
// // // // //         </View>
// // // // //       </View>

// // // // //       {/* CANVAS AREA */}
// // // // //       <View style={styles.canvasContainer}>
// // // // //         <Pressable
// // // // //           style={styles.canvas}
// // // // //           onPress={() => {
// // // // //             setActiveId(null);
// // // // //             setShowInput(false);
// // // // //             setShowColorPicker(false);
// // // // //             setShowFontPicker(false);
// // // // //             setShowBackgroundPicker(false);
// // // // //             setShowStickers(false);
// // // // //           }}
// // // // //           onTouchStart={startDrawing}
// // // // //           onTouchMove={moveDrawing}
// // // // //           onTouchEnd={endDrawing}
// // // // //         >
// // // // //           {image ? (
// // // // //             <>
// // // // //               <Image 
// // // // //                 source={{ uri: image }} 
// // // // //                 style={styles.image} 
// // // // //                 resizeMode="cover"
// // // // //               />
              
// // // // //               {/* Render drawings */}
// // // // //               {renderDrawing()}
              
// // // // //               {/* Render texts/stickers */}
// // // // //               {texts.map((item) => (
// // // // //                 <Animated.View
// // // // //                   key={item.id}
// // // // //                   style={[
// // // // //                     styles.textContainer,
// // // // //                     {
// // // // //                       transform: [
// // // // //                         ...item.pan.getTranslateTransform(),
// // // // //                         { rotate: `${item.rotation}deg` }
// // // // //                       ],
// // // // //                       zIndex: item.id === activeId ? 1000 : texts.indexOf(item) + 1,
// // // // //                     },
// // // // //                   ]}
// // // // //                   {...item.panResponder.panHandlers}
// // // // //                 >
// // // // //                   <TouchableOpacity
// // // // //                     activeOpacity={0.8}
// // // // //                     onPress={() => {
// // // // //                       setActiveId(item.id);
// // // // //                       setInputValue(item.text);
// // // // //                       setShowInput(true);
// // // // //                     }}
// // // // //                     style={[
// // // // //                       styles.textWrapper,
// // // // //                       {
// // // // //                         backgroundColor: item.backgroundColor,
// // // // //                         padding: item.isSticker ? 0 : 8,
// // // // //                         borderRadius: item.isSticker ? 0 : 4,
// // // // //                       },
// // // // //                       activeId === item.id && styles.activeTextWrapper,
// // // // //                     ]}
// // // // //                   >
// // // // //                     <Text
// // // // //                       style={[
// // // // //                         styles.textElement,
// // // // //                         {
// // // // //                           color: item.color,
// // // // //                           fontSize: item.size,
// // // // //                           textAlign: item.align,
// // // // //                           fontWeight: item.fontWeight,
// // // // //                           fontStyle: item.fontStyle,
// // // // //                         },
// // // // //                       ]}
// // // // //                       numberOfLines={10}
// // // // //                     >
// // // // //                       {item.text}
// // // // //                     </Text>
                    
// // // // //                     {activeId === item.id && (
// // // // //                       <View style={styles.selectionBorder}>
// // // // //                         <View style={styles.rotationHandle}>
// // // // //                           <Ionicons name="sync" size={16} color="#fff" />
// // // // //                         </View>
// // // // //                       </View>
// // // // //                     )}
// // // // //                   </TouchableOpacity>
// // // // //                 </Animated.View>
// // // // //               ))}
// // // // //             </>
// // // // //           ) : (
// // // // //             <TouchableOpacity 
// // // // //               style={styles.placeholderContainer}
// // // // //               onPress={openGallery}
// // // // //             >
// // // // //               <View style={styles.placeholderContent}>
// // // // //                 <Ionicons name="camera-outline" size={80} color="#666" />
// // // // //                 <Text style={styles.placeholderText}>Add Photo or Video</Text>
// // // // //                 <View style={styles.placeholderButtons}>
// // // // //                   <TouchableOpacity 
// // // // //                     style={styles.placeholderButton}
// // // // //                     onPress={openCamera}
// // // // //                   >
// // // // //                     <Ionicons name="camera" size={20} color="#fff" />
// // // // //                     <Text style={styles.placeholderButtonText}>Camera</Text>
// // // // //                   </TouchableOpacity>
// // // // //                   <TouchableOpacity 
// // // // //                     style={styles.placeholderButton}
// // // // //                     onPress={openGallery}
// // // // //                   >
// // // // //                     <Ionicons name="image" size={20} color="#fff" />
// // // // //                     <Text style={styles.placeholderButtonText}>Gallery</Text>
// // // // //                   </TouchableOpacity>
// // // // //                 </View>
// // // // //               </View>
// // // // //             </TouchableOpacity>
// // // // //           )}
// // // // //         </Pressable>
// // // // //       </View>

// // // // //       {/* TEXT INPUT */}
// // // // //       {showInput && activeText && !activeText.isSticker && (
// // // // //         <View style={styles.inputContainer}>
// // // // //           <TextInput
// // // // //             ref={textInputRef}
// // // // //             autoFocus
// // // // //             value={inputValue}
// // // // //             onChangeText={(text) => {
// // // // //               setInputValue(text);
// // // // //               updateText(activeId, "text", text);
// // // // //             }}
// // // // //             placeholder="Type your text..."
// // // // //             placeholderTextColor="#999"
// // // // //             style={styles.input}
// // // // //             multiline
// // // // //             maxLength={100}
// // // // //           />
// // // // //           <TouchableOpacity
// // // // //             style={styles.inputDoneButton}
// // // // //             onPress={() => setShowInput(false)}
// // // // //           >
// // // // //             <Text style={styles.inputDoneText}>Done</Text>
// // // // //           </TouchableOpacity>
// // // // //         </View>
// // // // //       )}

// // // // //       {/* BOTTOM TOOLBAR */}
// // // // //       <View style={styles.bottomToolbar}>
// // // // //         <ScrollView 
// // // // //           horizontal 
// // // // //           showsHorizontalScrollIndicator={false}
// // // // //           contentContainerStyle={styles.toolbarContent}
// // // // //         >
// // // // //           {/* ADD TEXT */}
// // // // //           <TouchableOpacity 
// // // // //             style={styles.toolbarButton}
// // // // //             onPress={addText}
// // // // //             disabled={!image}
// // // // //           >
// // // // //             <Text style={styles.toolbarButtonIcon}>Aa</Text>
// // // // //             <Text style={styles.toolbarButtonText}>Text</Text>
// // // // //           </TouchableOpacity>

// // // // //           {/* DRAWING */}
// // // // //           <TouchableOpacity 
// // // // //             style={styles.toolbarButton}
// // // // //             onPress={() => {
// // // // //               setDrawingMode(!drawingMode);
// // // // //               setShowDrawingTools(!drawingMode);
// // // // //               setActiveId(null);
// // // // //               setShowInput(false);
// // // // //             }}
// // // // //             disabled={!image}
// // // // //           >
// // // // //             <Ionicons 
// // // // //               name={drawingMode ? "color-palette" : "pencil"} 
// // // // //               size={24} 
// // // // //               color={drawingMode ? "#FF5C5C" : "#fff"} 
// // // // //             />
// // // // //             <Text style={styles.toolbarButtonText}>Draw</Text>
// // // // //           </TouchableOpacity>

// // // // //           {/* STICKERS */}
// // // // //           <TouchableOpacity 
// // // // //             style={styles.toolbarButton}
// // // // //             onPress={() => setShowStickers(true)}
// // // // //             disabled={!image}
// // // // //           >
// // // // //             <FontAwesome5 name="star" size={20} color="#fff" />
// // // // //             <Text style={styles.toolbarButtonText}>Stickers</Text>
// // // // //           </TouchableOpacity>

// // // // //           {/* ADD PHOTO */}
// // // // //           <TouchableOpacity 
// // // // //             style={styles.toolbarButton}
// // // // //             onPress={openGallery}
// // // // //           >
// // // // //             <Ionicons name="image-outline" size={24} color="#fff" />
// // // // //             <Text style={styles.toolbarButtonText}>Photo</Text>
// // // // //           </TouchableOpacity>

// // // // //           {/* TAKE PHOTO */}
// // // // //           <TouchableOpacity 
// // // // //             style={styles.toolbarButton}
// // // // //             onPress={openCamera}
// // // // //           >
// // // // //             <Ionicons name="camera-outline" size={24} color="#fff" />
// // // // //             <Text style={styles.toolbarButtonText}>Camera</Text>
// // // // //           </TouchableOpacity>
// // // // //         </ScrollView>
// // // // //       </View>

// // // // //       {/* ACTIVE TEXT CONTROLS */}
// // // // //       {activeText && !drawingMode && (
// // // // //         <View style={styles.activeControls}>
// // // // //           <ScrollView 
// // // // //             horizontal 
// // // // //             showsHorizontalScrollIndicator={false}
// // // // //             contentContainerStyle={styles.activeControlsContent}
// // // // //           >
// // // // //             {/* COLOR PICKER */}
// // // // //             <TouchableOpacity 
// // // // //               style={styles.controlButton}
// // // // //               onPress={() => setShowColorPicker(!showColorPicker)}
// // // // //             >
// // // // //               <View style={[styles.colorPreview, { backgroundColor: activeText.color }]} />
// // // // //               <Text style={styles.controlButtonText}>Color</Text>
// // // // //             </TouchableOpacity>

// // // // //             {/* FONT SIZE */}
// // // // //             <View style={styles.sizeControl}>
// // // // //               <TouchableOpacity
// // // // //                 style={styles.sizeButton}
// // // // //                 onPress={() => updateText(activeId, "size", Math.max(12, activeText.size - 2))}
// // // // //               >
// // // // //                 <Ionicons name="remove" size={20} color="#fff" />
// // // // //               </TouchableOpacity>
// // // // //               <Text style={styles.sizeText}>{activeText.size}</Text>
// // // // //               <TouchableOpacity
// // // // //                 style={styles.sizeButton}
// // // // //                 onPress={() => updateText(activeId, "size", Math.min(72, activeText.size + 2))}
// // // // //               >
// // // // //                 <Ionicons name="add" size={20} color="#fff" />
// // // // //               </TouchableOpacity>
// // // // //             </View>

// // // // //             {/* ALIGNMENT */}
// // // // //             <TouchableOpacity 
// // // // //               style={styles.controlButton}
// // // // //               onPress={() => {
// // // // //                 const aligns = ["left", "center", "right"];
// // // // //                 const currentIndex = aligns.indexOf(activeText.align);
// // // // //                 const nextAlign = aligns[(currentIndex + 1) % aligns.length];
// // // // //                 updateText(activeId, "align", nextAlign);
// // // // //               }}
// // // // //             >
// // // // //               <Ionicons 
// // // // //                 name={
// // // // //                   activeText.align === "left" ? "align-left" :
// // // // //                   activeText.align === "center" ? "align-center" :
// // // // //                   "align-right"
// // // // //                 } 
// // // // //                 size={24} 
// // // // //                 color="#fff" 
// // // // //               />
// // // // //               <Text style={styles.controlButtonText}>Align</Text>
// // // // //             </TouchableOpacity>

// // // // //             {/* BACKGROUND COLOR */}
// // // // //             <TouchableOpacity 
// // // // //               style={styles.controlButton}
// // // // //               onPress={() => setShowBackgroundPicker(!showBackgroundPicker)}
// // // // //             >
// // // // //               <View style={[
// // // // //                 styles.bgPreview, 
// // // // //                 { backgroundColor: activeText.backgroundColor === 'transparent' ? '#333' : activeText.backgroundColor }
// // // // //               ]}>
// // // // //                 <Text style={{ color: '#fff', fontSize: 12 }}>BG</Text>
// // // // //               </View>
// // // // //               <Text style={styles.controlButtonText}>BG</Text>
// // // // //             </TouchableOpacity>

// // // // //             {/* ROTATE */}
// // // // //             <TouchableOpacity 
// // // // //               style={styles.controlButton}
// // // // //               onPress={() => rotateText(45)}
// // // // //             >
// // // // //               <Ionicons name="sync" size={24} color="#fff" />
// // // // //               <Text style={styles.controlButtonText}>Rotate</Text>
// // // // //             </TouchableOpacity>

// // // // //             {/* FONT STYLE */}
// // // // //             <TouchableOpacity 
// // // // //               style={styles.controlButton}
// // // // //               onPress={() => setShowFontPicker(!showFontPicker)}
// // // // //             >
// // // // //               <Ionicons name="text" size={24} color="#fff" />
// // // // //               <Text style={styles.controlButtonText}>Font</Text>
// // // // //             </TouchableOpacity>

// // // // //             {/* DELETE */}
// // // // //             <TouchableOpacity 
// // // // //               style={[styles.controlButton, styles.deleteButton]}
// // // // //               onPress={deleteActiveText}
// // // // //             >
// // // // //               <Ionicons name="trash-outline" size={24} color="#fff" />
// // // // //               <Text style={styles.controlButtonText}>Delete</Text>
// // // // //             </TouchableOpacity>
// // // // //           </ScrollView>
// // // // //         </View>
// // // // //       )}

// // // // //       {/* DRAWING TOOLS */}
// // // // //       {drawingMode && showDrawingTools && (
// // // // //         <View style={styles.drawingTools}>
// // // // //           <View style={styles.drawingColorPicker}>
// // // // //             {["#FF5C5C", "#FF9F00", "#FFD700", "#32CD32", "#1E90FF", "#FFFFFF", "#000000"].map((color) => (
// // // // //               <TouchableOpacity
// // // // //                 key={color}
// // // // //                 style={[
// // // // //                   styles.drawingColorOption,
// // // // //                   { backgroundColor: color },
// // // // //                   drawingColor === color && styles.selectedDrawingColor,
// // // // //                 ]}
// // // // //                 onPress={() => setDrawingColor(color)}
// // // // //               />
// // // // //             ))}
// // // // //           </View>
// // // // //           <View style={styles.drawingWidthControl}>
// // // // //             <Text style={styles.drawingWidthText}>Size:</Text>
// // // // //             <Slider
// // // // //               style={styles.slider}
// // // // //               minimumValue={1}
// // // // //               maximumValue={20}
// // // // //               step={1}
// // // // //               value={drawingWidth}
// // // // //               onValueChange={setDrawingWidth}
// // // // //               minimumTrackTintColor="#FF5C5C"
// // // // //               maximumTrackTintColor="#333"
// // // // //               thumbTintColor="#fff"
// // // // //             />
// // // // //             <Text style={styles.drawingWidthValue}>{drawingWidth}px</Text>
// // // // //           </View>
// // // // //           <View style={styles.drawingActions}>
// // // // //             <TouchableOpacity style={styles.drawingActionButton} onPress={undoDrawing}>
// // // // //               <Ionicons name="arrow-undo" size={24} color="#fff" />
// // // // //             </TouchableOpacity>
// // // // //             <TouchableOpacity style={styles.drawingActionButton} onPress={clearDrawing}>
// // // // //               <Ionicons name="trash-outline" size={24} color="#fff" />
// // // // //             </TouchableOpacity>
// // // // //             <TouchableOpacity 
// // // // //               style={styles.drawingActionButton}
// // // // //               onPress={() => {
// // // // //                 setDrawingMode(false);
// // // // //                 setShowDrawingTools(false);
// // // // //               }}
// // // // //             >
// // // // //               <Ionicons name="checkmark" size={24} color="#fff" />
// // // // //             </TouchableOpacity>
// // // // //           </View>
// // // // //         </View>
// // // // //       )}

// // // // //       {/* MODALS */}
// // // // //       {/* COLOR PICKER MODAL */}
// // // // //       <Modal
// // // // //         visible={showColorPicker}
// // // // //         transparent
// // // // //         animationType="slide"
// // // // //         onRequestClose={() => setShowColorPicker(false)}
// // // // //       >
// // // // //         <View style={styles.modalOverlay}>
// // // // //           <View style={styles.modalContent}>
// // // // //             <View style={styles.modalHeader}>
// // // // //               <Text style={styles.modalTitle}>Text Color</Text>
// // // // //               <TouchableOpacity onPress={() => setShowColorPicker(false)}>
// // // // //                 <Ionicons name="close" size={24} color="#fff" />
// // // // //               </TouchableOpacity>
// // // // //             </View>
// // // // //             <View style={styles.colorGrid}>
// // // // //               {COLORS.map((color) => (
// // // // //                 <TouchableOpacity
// // // // //                   key={color}
// // // // //                   style={[
// // // // //                     styles.modalColorOption,
// // // // //                     { backgroundColor: color },
// // // // //                     activeText?.color === color && styles.selectedModalColor,
// // // // //                   ]}
// // // // //                   onPress={() => {
// // // // //                     if (activeText) updateText(activeId, "color", color);
// // // // //                     setShowColorPicker(false);
// // // // //                   }}
// // // // //                 />
// // // // //               ))}
// // // // //             </View>
// // // // //           </View>
// // // // //         </View>
// // // // //       </Modal>

// // // // //       {/* BACKGROUND COLOR MODAL */}
// // // // //       <Modal
// // // // //         visible={showBackgroundPicker}
// // // // //         transparent
// // // // //         animationType="slide"
// // // // //         onRequestClose={() => setShowBackgroundPicker(false)}
// // // // //       >
// // // // //         <View style={styles.modalOverlay}>
// // // // //           <View style={styles.modalContent}>
// // // // //             <View style={styles.modalHeader}>
// // // // //               <Text style={styles.modalTitle}>Background Color</Text>
// // // // //               <TouchableOpacity onPress={() => setShowBackgroundPicker(false)}>
// // // // //                 <Ionicons name="close" size={24} color="#fff" />
// // // // //               </TouchableOpacity>
// // // // //             </View>
// // // // //             <View style={styles.colorGrid}>
// // // // //               {BACKGROUND_COLORS.map((color) => (
// // // // //                 <TouchableOpacity
// // // // //                   key={color}
// // // // //                   style={[
// // // // //                     styles.modalColorOption,
// // // // //                     { backgroundColor: color },
// // // // //                     activeText?.backgroundColor === color && styles.selectedModalColor,
// // // // //                   ]}
// // // // //                   onPress={() => {
// // // // //                     if (activeText) updateText(activeId, "backgroundColor", color);
// // // // //                     setShowBackgroundPicker(false);
// // // // //                   }}
// // // // //                 />
// // // // //               ))}
// // // // //             </View>
// // // // //           </View>
// // // // //         </View>
// // // // //       </Modal>

// // // // //       {/* FONT PICKER MODAL */}
// // // // //       <Modal
// // // // //         visible={showFontPicker}
// // // // //         transparent
// // // // //         animationType="slide"
// // // // //         onRequestClose={() => setShowFontPicker(false)}
// // // // //       >
// // // // //         <View style={styles.modalOverlay}>
// // // // //           <View style={styles.modalContent}>
// // // // //             <View style={styles.modalHeader}>
// // // // //               <Text style={styles.modalTitle}>Font Style</Text>
// // // // //               <TouchableOpacity onPress={() => setShowFontPicker(false)}>
// // // // //                 <Ionicons name="close" size={24} color="#fff" />
// // // // //               </TouchableOpacity>
// // // // //             </View>
// // // // //             <View style={styles.fontGrid}>
// // // // //               {FONTS.map((font) => (
// // // // //                 <TouchableOpacity
// // // // //                   key={font.name}
// // // // //                   style={[
// // // // //                     styles.fontOption,
// // // // //                     activeText?.fontWeight === font.weight && styles.selectedFont,
// // // // //                   ]}
// // // // //                   onPress={() => {
// // // // //                     if (activeText) {
// // // // //                       updateText(activeId, "fontWeight", font.weight || "400");
// // // // //                       updateText(activeId, "fontStyle", font.style || "normal");
// // // // //                     }
// // // // //                     setShowFontPicker(false);
// // // // //                   }}
// // // // //                 >
// // // // //                   <Text style={[
// // // // //                     styles.fontOptionText,
// // // // //                     { 
// // // // //                       fontWeight: font.weight,
// // // // //                       fontStyle: font.style,
// // // // //                     }
// // // // //                   ]}>
// // // // //                     {font.name}
// // // // //                   </Text>
// // // // //                 </TouchableOpacity>
// // // // //               ))}
// // // // //             </View>
// // // // //           </View>
// // // // //         </View>
// // // // //       </Modal>

// // // // //       {/* STICKERS MODAL */}
// // // // //       <Modal
// // // // //         visible={showStickers}
// // // // //         transparent
// // // // //         animationType="slide"
// // // // //         onRequestClose={() => setShowStickers(false)}
// // // // //       >
// // // // //         <View style={styles.modalOverlay}>
// // // // //           <View style={styles.modalContent}>
// // // // //             <View style={styles.modalHeader}>
// // // // //               <Text style={styles.modalTitle}>Stickers</Text>
// // // // //               <TouchableOpacity onPress={() => setShowStickers(false)}>
// // // // //                 <Ionicons name="close" size={24} color="#fff" />
// // // // //               </TouchableOpacity>
// // // // //             </View>
// // // // //             <FlatList
// // // // //               data={stickers}
// // // // //               numColumns={5}
// // // // //               keyExtractor={(item, index) => index.toString()}
// // // // //               renderItem={({ item }) => (
// // // // //                 <TouchableOpacity
// // // // //                   style={styles.stickerOption}
// // // // //                   onPress={() => addSticker(item)}
// // // // //                 >
// // // // //                   <Text style={styles.stickerText}>{item}</Text>
// // // // //                 </TouchableOpacity>
// // // // //               )}
// // // // //               contentContainerStyle={styles.stickersGrid}
// // // // //             />
// // // // //           </View>
// // // // //         </View>
// // // // //       </Modal>
// // // // //     </SafeAreaView>
// // // // //   );
// // // // // }

// // // // // /* -------- STYLES -------- */
// // // // // const styles = StyleSheet.create({
// // // // //   container: { 
// // // // //     flex: 1, 
// // // // //     backgroundColor: "#000" 
// // // // //   },
  
// // // // //   header: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     justifyContent: "space-between",
// // // // //     paddingHorizontal: 16,
// // // // //     paddingVertical: 12,
// // // // //     backgroundColor: "#000",
// // // // //     borderBottomWidth: 0.5,
// // // // //     borderBottomColor: "#333",
// // // // //   },
// // // // //   headerButton: {
// // // // //     padding: 8,
// // // // //   },
// // // // //   headerTitle: { 
// // // // //     color: "#fff", 
// // // // //     fontSize: 18, 
// // // // //     fontWeight: "700",
// // // // //   },
// // // // //   headerRight: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     gap: 16,
// // // // //   },
  
// // // // //   canvasContainer: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "#000",
// // // // //   },
// // // // //   canvas: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "#000",
// // // // //   },
// // // // //   image: {
// // // // //     width: STORY_WIDTH,
// // // // //     height: STORY_HEIGHT,
// // // // //     alignSelf: "center",
// // // // //   },
  
// // // // //   placeholderContainer: {
// // // // //     flex: 1,
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //     backgroundColor: "#111",
// // // // //   },
// // // // //   placeholderContent: {
// // // // //     alignItems: "center",
// // // // //     gap: 20,
// // // // //   },
// // // // //   placeholderText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 18,
// // // // //     fontWeight: "600",
// // // // //   },
// // // // //   placeholderButtons: {
// // // // //     flexDirection: "row",
// // // // //     gap: 20,
// // // // //     marginTop: 20,
// // // // //   },
// // // // //   placeholderButton: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     backgroundColor: "#333",
// // // // //     paddingHorizontal: 20,
// // // // //     paddingVertical: 12,
// // // // //     borderRadius: 25,
// // // // //     gap: 8,
// // // // //   },
// // // // //   placeholderButtonText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 16,
// // // // //     fontWeight: "600",
// // // // //   },
  
// // // // //   textContainer: {
// // // // //     position: "absolute",
// // // // //     maxWidth: STORY_WIDTH * 0.8,
// // // // //   },
// // // // //   textWrapper: {
// // // // //     padding: 8,
// // // // //   },
// // // // //   activeTextWrapper: {
// // // // //     backgroundColor: "rgba(255, 255, 255, 0.1)",
// // // // //   },
// // // // //   textElement: {
// // // // //     fontWeight: "700",
// // // // //     textShadowColor: "rgba(0, 0, 0, 0.8)",
// // // // //     textShadowOffset: { width: 1, height: 1 },
// // // // //     textShadowRadius: 4,
// // // // //   },
// // // // //   selectionBorder: {
// // // // //     position: "absolute",
// // // // //     top: -4,
// // // // //     left: -4,
// // // // //     right: -4,
// // // // //     bottom: -4,
// // // // //     borderWidth: 2,
// // // // //     borderColor: "#4f7cff",
// // // // //     borderRadius: 6,
// // // // //     borderStyle: "dashed",
// // // // //   },
// // // // //   rotationHandle: {
// // // // //     position: "absolute",
// // // // //     top: -30,
// // // // //     right: -10,
// // // // //     width: 30,
// // // // //     height: 30,
// // // // //     borderRadius: 15,
// // // // //     backgroundColor: "#4f7cff",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
  
// // // // //   inputContainer: {
// // // // //     position: "absolute",
// // // // //     bottom: 100,
// // // // //     left: 20,
// // // // //     right: 20,
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // // // //     borderRadius: 12,
// // // // //     borderWidth: 1,
// // // // //     borderColor: "#333",
// // // // //   },
// // // // //   input: {
// // // // //     flex: 1,
// // // // //     paddingHorizontal: 16,
// // // // //     paddingVertical: 12,
// // // // //     color: "#fff",
// // // // //     fontSize: 16,
// // // // //   },
// // // // //   inputDoneButton: {
// // // // //     paddingHorizontal: 16,
// // // // //     paddingVertical: 12,
// // // // //   },
// // // // //   inputDoneText: {
// // // // //     color: "#4f7cff",
// // // // //     fontSize: 16,
// // // // //     fontWeight: "600",
// // // // //   },
  
// // // // //   bottomToolbar: {
// // // // //     paddingVertical: 12,
// // // // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // // // //     borderTopWidth: 0.5,
// // // // //     borderTopColor: "#333",
// // // // //   },
// // // // //   toolbarContent: {
// // // // //     paddingHorizontal: 16,
// // // // //     gap: 20,
// // // // //   },
// // // // //   toolbarButton: {
// // // // //     alignItems: "center",
// // // // //     gap: 4,
// // // // //     minWidth: 60,
// // // // //   },
// // // // //   toolbarButtonIcon: {
// // // // //     color: "#fff",
// // // // //     fontSize: 24,
// // // // //     fontWeight: "700",
// // // // //   },
// // // // //   toolbarButtonText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 12,
// // // // //   },
  
// // // // //   activeControls: {
// // // // //     position: "absolute",
// // // // //     bottom: 70,
// // // // //     left: 0,
// // // // //     right: 0,
// // // // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // // // //     paddingVertical: 12,
// // // // //     borderTopWidth: 0.5,
// // // // //     borderTopColor: "#333",
// // // // //   },
// // // // //   activeControlsContent: {
// // // // //     paddingHorizontal: 16,
// // // // //     gap: 20,
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   controlButton: {
// // // // //     alignItems: "center",
// // // // //     gap: 4,
// // // // //     minWidth: 50,
// // // // //   },
// // // // //   controlButtonText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 12,
// // // // //   },
// // // // //   colorPreview: {
// // // // //     width: 30,
// // // // //     height: 30,
// // // // //     borderRadius: 15,
// // // // //     borderWidth: 2,
// // // // //     borderColor: "#fff",
// // // // //   },
// // // // //   bgPreview: {
// // // // //     width: 30,
// // // // //     height: 30,
// // // // //     borderRadius: 15,
// // // // //     borderWidth: 1,
// // // // //     borderColor: "#666",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   sizeControl: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     gap: 10,
// // // // //     backgroundColor: "#333",
// // // // //     borderRadius: 20,
// // // // //     paddingHorizontal: 12,
// // // // //     paddingVertical: 8,
// // // // //   },
// // // // //   sizeButton: {
// // // // //     width: 30,
// // // // //     height: 30,
// // // // //     borderRadius: 15,
// // // // //     backgroundColor: "#444",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   sizeText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 14,
// // // // //     fontWeight: "600",
// // // // //     minWidth: 30,
// // // // //     textAlign: "center",
// // // // //   },
// // // // //   deleteButton: {
// // // // //     backgroundColor: "rgba(239, 68, 68, 0.3)",
// // // // //     paddingHorizontal: 12,
// // // // //     borderRadius: 15,
// // // // //   },
  
// // // // //   drawingTools: {
// // // // //     position: "absolute",
// // // // //     bottom: 70,
// // // // //     left: 0,
// // // // //     right: 0,
// // // // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // // // //     paddingVertical: 12,
// // // // //     borderTopWidth: 0.5,
// // // // //     borderTopColor: "#333",
// // // // //   },
// // // // //   drawingColorPicker: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "center",
// // // // //     gap: 8,
// // // // //     marginBottom: 12,
// // // // //   },
// // // // //   drawingColorOption: {
// // // // //     width: 30,
// // // // //     height: 30,
// // // // //     borderRadius: 15,
// // // // //     borderWidth: 2,
// // // // //     borderColor: "transparent",
// // // // //   },
// // // // //   selectedDrawingColor: {
// // // // //     borderColor: "#fff",
// // // // //     transform: [{ scale: 1.2 }],
// // // // //   },
// // // // //   drawingWidthControl: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     paddingHorizontal: 20,
// // // // //     gap: 10,
// // // // //   },
// // // // //   drawingWidthText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 14,
// // // // //     minWidth: 40,
// // // // //   },
// // // // //   slider: {
// // // // //     flex: 1,
// // // // //     height: 40,
// // // // //   },
// // // // //   drawingWidthValue: {
// // // // //     color: "#fff",
// // // // //     fontSize: 14,
// // // // //     minWidth: 40,
// // // // //     textAlign: "right",
// // // // //   },
// // // // //   drawingActions: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "center",
// // // // //     gap: 30,
// // // // //     marginTop: 12,
// // // // //   },
// // // // //   drawingActionButton: {
// // // // //     width: 44,
// // // // //     height: 44,
// // // // //     borderRadius: 22,
// // // // //     backgroundColor: "#333",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
  
// // // // //   modalOverlay: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "rgba(0, 0, 0, 0.8)",
// // // // //     justifyContent: "flex-end",
// // // // //   },
// // // // //   modalContent: {
// // // // //     backgroundColor: "#1a1a1a",
// // // // //     borderTopLeftRadius: 20,
// // // // //     borderTopRightRadius: 20,
// // // // //     paddingBottom: 40,
// // // // //   },
// // // // //   modalHeader: {
// // // // //     flexDirection: "row",
// // // // //     justifyContent: "space-between",
// // // // //     alignItems: "center",
// // // // //     paddingHorizontal: 20,
// // // // //     paddingVertical: 16,
// // // // //     borderBottomWidth: 0.5,
// // // // //     borderBottomColor: "#333",
// // // // //   },
// // // // //   modalTitle: {
// // // // //     color: "#fff",
// // // // //     fontSize: 18,
// // // // //     fontWeight: "700",
// // // // //   },
// // // // //   colorGrid: {
// // // // //     flexDirection: "row",
// // // // //     flexWrap: "wrap",
// // // // //     justifyContent: "center",
// // // // //     padding: 20,
// // // // //     gap: 12,
// // // // //   },
// // // // //   modalColorOption: {
// // // // //     width: 44,
// // // // //     height: 44,
// // // // //     borderRadius: 22,
// // // // //     borderWidth: 2,
// // // // //     borderColor: "transparent",
// // // // //   },
// // // // //   selectedModalColor: {
// // // // //     borderColor: "#4f7cff",
// // // // //     transform: [{ scale: 1.1 }],
// // // // //   },
// // // // //   fontGrid: {
// // // // //     padding: 20,
// // // // //   },
// // // // //   fontOption: {
// // // // //     paddingVertical: 16,
// // // // //     paddingHorizontal: 20,
// // // // //     borderBottomWidth: 0.5,
// // // // //     borderBottomColor: "#333",
// // // // //   },
// // // // //   selectedFont: {
// // // // //     backgroundColor: "rgba(79, 124, 255, 0.2)",
// // // // //   },
// // // // //   fontOptionText: {
// // // // //     color: "#fff",
// // // // //     fontSize: 18,
// // // // //   },
// // // // //   stickersGrid: {
// // // // //     padding: 20,
// // // // //   },
// // // // //   stickerOption: {
// // // // //     width: 60,
// // // // //     height: 60,
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //     margin: 8,
// // // // //   },
// // // // //   stickerText: {
// // // // //     fontSize: 36,
// // // // //   },
  
// // // // //   drawingPath: {
// // // // //     position: 'absolute',
// // // // //   },
// // // // // });


// // // // import React, { useEffect, useState, useRef, useCallback } from "react";
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   StyleSheet,
// // // //   TouchableOpacity,
// // // //   Image,
// // // //   TextInput,
// // // //   StatusBar,
// // // //   Animated,
// // // //   PanResponder,
// // // //   Pressable,
// // // //   Alert,
// // // //   Dimensions,
// // // //   ScrollView,
// // // //   Modal,
// // // //   FlatList,
// // // //   ActivityIndicator,
// // // //   KeyboardAvoidingView,
// // // //   Platform,
// // // // } from "react-native";
// // // // import { SafeAreaView } from "react-native-safe-area-context";
// // // // import * as ImagePicker from "expo-image-picker";
// // // // import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

// // // // const { width, height } = Dimensions.get("window");
// // // // const ASPECT_RATIO = 9/16;
// // // // const STORY_WIDTH = width;
// // // // const STORY_HEIGHT = width / ASPECT_RATIO;

// // // // // Color palette from your design
// // // // const COLORS = [
// // // //   "#FFFFFF", "#FF5C5C", "#FF9F00", "#FFD700", "#32CD32", "#1E90FF", 
// // // //   "#9370DB", "#FF69B4", "#00CED1", "#FF4500", "#9ACD32", "#BA55D3",
// // // //   "#000000", "#696969", "#D3D3D3"
// // // // ];

// // // // // Font styles
// // // // const FONTS = [
// // // //   { name: "Classic", value: "System" },
// // // //   { name: "Modern", value: "System", weight: "bold" },
// // // //   { name: "Elegant", value: "System", weight: "300" },
// // // //   { name: "Fun", value: "System", style: "italic" },
// // // // ];

// // // // // Keyboard layout
// // // // const KEYBOARD_ROWS = [
// // // //   ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
// // // //   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
// // // //   ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
// // // // ];

// // // // export default function BlipsCreationScreen({ navigation }) {
// // // //   const [image, setImage] = useState(null);
// // // //   const [texts, setTexts] = useState([]);
// // // //   const [activeId, setActiveId] = useState(null);
// // // //   const [showInput, setShowInput] = useState(false);
// // // //   const [inputValue, setInputValue] = useState("");
// // // //   const [showColorPicker, setShowColorPicker] = useState(false);
// // // //   const [showFontPicker, setShowFontPicker] = useState(false);
// // // //   const [showTextAlignment, setShowTextAlignment] = useState(false);
// // // //   const [showKeyboard, setShowKeyboard] = useState(false);
// // // //   const [selectedFont, setSelectedFont] = useState("Classic");
// // // //   const [isPosting, setIsPosting] = useState(false);
// // // //   const [showExitModal, setShowExitModal] = useState(false);
  
// // // //   const textInputRef = useRef(null);

// // // //   useEffect(() => {
// // // //     (async () => {
// // // //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // // //       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
// // // //     })();
// // // //   }, []);

// // // //   /* -------- IMAGE PICKER -------- */
// // // //   const openGallery = async () => {
// // // //     try {
// // // //       const res = await ImagePicker.launchImageLibraryAsync({
// // // //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // // //         quality: 1,
// // // //         allowsEditing: true,
// // // //         aspect: [9, 16],
// // // //       });
      
// // // //       if (!res.canceled && res.assets[0].uri) {
// // // //         setImage(res.assets[0].uri);
// // // //         setTexts([]);
// // // //         setActiveId(null);
// // // //         setShowInput(false);
// // // //       }
// // // //     } catch (error) {
// // // //       Alert.alert("Error", "Failed to pick image");
// // // //     }
// // // //   };

// // // //   const openCamera = async () => {
// // // //     try {
// // // //       const res = await ImagePicker.launchCameraAsync({
// // // //         quality: 1,
// // // //         allowsEditing: true,
// // // //         aspect: [9, 16],
// // // //       });
      
// // // //       if (!res.canceled && res.assets[0].uri) {
// // // //         setImage(res.assets[0].uri);
// // // //         setTexts([]);
// // // //         setActiveId(null);
// // // //         setShowInput(false);
// // // //       }
// // // //     } catch (error) {
// // // //       Alert.alert("Error", "Failed to take photo");
// // // //     }
// // // //   };

// // // //   /* -------- ADD TEXT -------- */
// // // //   const addText = () => {
// // // //     if (!image) {
// // // //       Alert.alert("Select Image", "Please select an image first");
// // // //       return;
// // // //     }

// // // //     const id = Date.now().toString();
// // // //     const pan = new Animated.ValueXY({ 
// // // //       x: STORY_WIDTH / 2 - 60, 
// // // //       y: STORY_HEIGHT / 2 - 25 
// // // //     });

// // // //     const panResponder = PanResponder.create({
// // // //       onStartShouldSetPanResponder: () => true,
// // // //       onPanResponderGrant: () => {
// // // //         setActiveId(id);
// // // //         setShowInput(false);
// // // //         pan.extractOffset();
// // // //       },
// // // //       onPanResponderMove: Animated.event(
// // // //         [null, { dx: pan.x, dy: pan.y }],
// // // //         { useNativeDriver: false }
// // // //       ),
// // // //       onPanResponderRelease: () => {
// // // //         pan.flattenOffset();
// // // //       },
// // // //     });

// // // //     const newText = {
// // // //       id,
// // // //       text: "@Shusshi Clan......",
// // // //       size: 32,
// // // //       color: "#FFFFFF",
// // // //       align: "center",
// // // //       font: "Classic",
// // // //       fontWeight: "normal",
// // // //       fontStyle: "normal",
// // // //       rotation: 0,
// // // //       pan,
// // // //       panResponder,
// // // //     };

// // // //     setTexts((prev) => [...prev, newText]);
// // // //     setActiveId(id);
// // // //     setInputValue("@Shusshi Clan......");
// // // //     setShowInput(true);
// // // //     setShowKeyboard(true);
// // // //   };

// // // //   const updateText = useCallback((id, key, value) => {
// // // //     setTexts((prev) =>
// // // //       prev.map((text) => (text.id === id ? { ...text, [key]: value } : text))
// // // //     );
// // // //   }, []);

// // // //   const deleteActiveText = () => {
// // // //     if (!activeId) return;
    
// // // //     setTexts((prev) => prev.filter((text) => text.id !== activeId));
// // // //     setActiveId(null);
// // // //     setShowInput(false);
// // // //     setInputValue("");
// // // //     setShowKeyboard(false);
// // // //   };

// // // //   const deleteAllBlips = () => {
// // // //     setShowExitModal(false);
// // // //     setTexts([]);
// // // //     setActiveId(null);
// // // //     setShowInput(false);
// // // //     setInputValue("");
// // // //     setShowKeyboard(false);
// // // //   };

// // // //   const rotateText = (degrees) => {
// // // //     if (!activeId) return;
// // // //     const activeText = texts.find((t) => t.id === activeId);
// // // //     if (!activeText) return;
    
// // // //     updateText(activeId, "rotation", (activeText.rotation + degrees) % 360);
// // // //   };

// // // //   /* -------- KEYBOARD FUNCTIONS -------- */
// // // //   const handleKeyPress = (key) => {
// // // //     if (activeId) {
// // // //       const newText = inputValue + key;
// // // //       setInputValue(newText);
// // // //       updateText(activeId, "text", newText);
// // // //     }
// // // //   };

// // // //   const handleBackspace = () => {
// // // //     if (activeId && inputValue.length > 0) {
// // // //       const newText = inputValue.slice(0, -1);
// // // //       setInputValue(newText);
// // // //       updateText(activeId, "text", newText);
// // // //     }
// // // //   };

// // // //   const handleSpace = () => {
// // // //     if (activeId) {
// // // //       const newText = inputValue + " ";
// // // //       setInputValue(newText);
// // // //       updateText(activeId, "text", newText);
// // // //     }
// // // //   };

// // // //   const handleReturn = () => {
// // // //     if (activeId) {
// // // //       const newText = inputValue + "\n";
// // // //       setInputValue(newText);
// // // //       updateText(activeId, "text", newText);
// // // //     }
// // // //   };

// // // //   /* -------- POST FUNCTIONALITY -------- */
// // // //   const handlePost = async () => {
// // // //     if (!image) {
// // // //       Alert.alert("Select Image", "Please select an image first");
// // // //       return;
// // // //     }

// // // //     setIsPosting(true);
    
// // // //     try {
// // // //       // Simulate posting process
// // // //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// // // //       Alert.alert(
// // // //         "Posted!",
// // // //         "Your blip has been posted successfully.",
// // // //         [
// // // //           { 
// // // //             text: "View Profile", 
// // // //             onPress: () => navigation.navigate("Profile") 
// // // //           },
// // // //           { text: "OK", onPress: () => setIsPosting(false) }
// // // //         ]
// // // //       );
// // // //     } catch (error) {
// // // //       Alert.alert("Error", "Failed to post. Please try again.");
// // // //       setIsPosting(false);
// // // //     }
// // // //   };

// // // //   /* -------- SHARE FUNCTIONALITY -------- */
// // // //   const handleShare = async () => {
// // // //     if (!image) {
// // // //       Alert.alert("Select Image", "Please select an image first");
// // // //       return;
// // // //     }

// // // //     Alert.alert(
// // // //       "Share Blips",
// // // //       "Your blip has been shared!",
// // // //       [{ text: "OK" }]
// // // //     );
// // // //   };

// // // //   const activeText = texts.find((t) => t.id === activeId);

// // // //   return (
// // // //     <SafeAreaView style={styles.container}>
// // // //       <StatusBar barStyle="light-content" backgroundColor="#000" />

// // // //       {/* HEADER - From Screen V11 Blips Main Broad Creation */}
// // // //       <View style={styles.header}>
// // // //         <TouchableOpacity 
// // // //           style={styles.headerButton}
// // // //           onPress={() => setShowExitModal(true)}
// // // //         >
// // // //           <Ionicons name="chevron-back" size={28} color="#fff" />
// // // //         </TouchableOpacity>
        
// // // //         <View style={styles.headerCenter}>
// // // //           <Text style={styles.headerTime}>9:41</Text>
// // // //           <Text style={styles.headerTitle}>Create Blips</Text>
// // // //         </View>
        
// // // //         <TouchableOpacity 
// // // //           style={styles.headerButton}
// // // //           onPress={() => {
// // // //             // Add your functionality here
// // // //           }}
// // // //         >
// // // //           <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
// // // //         </TouchableOpacity>
// // // //       </View>

// // // //       {/* CANVAS AREA */}
// // // //       <View style={styles.canvasContainer}>
// // // //         <Pressable
// // // //           style={styles.canvas}
// // // //           onPress={() => {
// // // //             setActiveId(null);
// // // //             setShowInput(false);
// // // //             setShowColorPicker(false);
// // // //             setShowFontPicker(false);
// // // //             setShowTextAlignment(false);
// // // //             setShowKeyboard(false);
// // // //           }}
// // // //         >
// // // //           {image ? (
// // // //             <>
// // // //               <Image 
// // // //                 source={{ uri: image }} 
// // // //                 style={styles.image} 
// // // //                 resizeMode="cover"
// // // //               />
              
// // // //               {/* Render texts */}
// // // //               {texts.map((item) => (
// // // //                 <Animated.View
// // // //                   key={item.id}
// // // //                   style={[
// // // //                     styles.textContainer,
// // // //                     {
// // // //                       transform: [
// // // //                         ...item.pan.getTranslateTransform(),
// // // //                         { rotate: `${item.rotation}deg` }
// // // //                       ],
// // // //                       zIndex: item.id === activeId ? 1000 : texts.indexOf(item) + 1,
// // // //                     },
// // // //                   ]}
// // // //                   {...item.panResponder.panHandlers}
// // // //                 >
// // // //                   <TouchableOpacity
// // // //                     activeOpacity={0.8}
// // // //                     onPress={() => {
// // // //                       setActiveId(item.id);
// // // //                       setInputValue(item.text);
// // // //                       setShowInput(true);
// // // //                       setShowKeyboard(true);
// // // //                     }}
// // // //                     style={[
// // // //                       styles.textWrapper,
// // // //                       activeId === item.id && styles.activeTextWrapper,
// // // //                     ]}
// // // //                   >
// // // //                     <Text
// // // //                       style={[
// // // //                         styles.textElement,
// // // //                         {
// // // //                           color: item.color,
// // // //                           fontSize: item.size,
// // // //                           textAlign: item.align,
// // // //                           fontWeight: item.fontWeight,
// // // //                           fontStyle: item.fontStyle,
// // // //                         },
// // // //                       ]}
// // // //                       numberOfLines={10}
// // // //                     >
// // // //                       {item.text}
// // // //                     </Text>
                    
// // // //                     {activeId === item.id && (
// // // //                       <View style={styles.selectionBorder}>
// // // //                         <View style={styles.rotationHandle}>
// // // //                           <Ionicons name="sync" size={16} color="#fff" />
// // // //                         </View>
// // // //                       </View>
// // // //                     )}
// // // //                   </TouchableOpacity>
// // // //                 </Animated.View>
// // // //               ))}
// // // //             </>
// // // //           ) : (
// // // //             <TouchableOpacity 
// // // //               style={styles.placeholderContainer}
// // // //               onPress={openGallery}
// // // //             >
// // // //               <View style={styles.placeholderContent}>
// // // //                 <Ionicons name="camera-outline" size={80} color="#666" />
// // // //                 <Text style={styles.placeholderText}>Tap to add photo</Text>
// // // //               </View>
// // // //             </TouchableOpacity>
// // // //           )}
// // // //         </Pressable>
// // // //       </View>

// // // //       {/* TEXT INPUT WITH KEYBOARD - From Screen V11 Blips Text Creation */}
// // // //       {showKeyboard && (
// // // //         <KeyboardAvoidingView 
// // // //           behavior={Platform.OS === "ios" ? "padding" : "height"}
// // // //           style={styles.keyboardContainer}
// // // //         >
// // // //           <View style={styles.inputHeader}>
// // // //             <Text style={styles.inputHeaderText}>
// // // //               {activeText ? activeText.text : "Type your text..."}
// // // //             </Text>
// // // //             <TouchableOpacity 
// // // //               style={styles.inputCloseButton}
// // // //               onPress={() => setShowKeyboard(false)}
// // // //             >
// // // //               <Ionicons name="close" size={24} color="#fff" />
// // // //             </TouchableOpacity>
// // // //           </View>

// // // //           {/* Font Selection - From Screen V11 Blips Text Creation */}
// // // //           <ScrollView 
// // // //             horizontal 
// // // //             showsHorizontalScrollIndicator={false}
// // // //             style={styles.fontSelection}
// // // //             contentContainerStyle={styles.fontSelectionContent}
// // // //           >
// // // //             {FONTS.map((font) => (
// // // //               <TouchableOpacity
// // // //                 key={font.name}
// // // //                 style={[
// // // //                   styles.fontOption,
// // // //                   selectedFont === font.name && styles.selectedFontOption,
// // // //                 ]}
// // // //                 onPress={() => {
// // // //                   setSelectedFont(font.name);
// // // //                   if (activeText) {
// // // //                     updateText(activeId, "font", font.name);
// // // //                     updateText(activeId, "fontWeight", font.weight || "normal");
// // // //                     updateText(activeId, "fontStyle", font.style || "normal");
// // // //                   }
// // // //                 }}
// // // //               >
// // // //                 <Text style={[
// // // //                   styles.fontOptionText,
// // // //                   selectedFont === font.name && styles.selectedFontOptionText,
// // // //                 ]}>
// // // //                   {font.name}
// // // //                 </Text>
// // // //               </TouchableOpacity>
// // // //             ))}
// // // //           </ScrollView>

// // // //           {/* Custom Keyboard - From your designs */}
// // // //           <View style={styles.customKeyboard}>
// // // //             {KEYBOARD_ROWS.map((row, rowIndex) => (
// // // //               <View key={rowIndex} style={styles.keyboardRow}>
// // // //                 {row.map((key) => (
// // // //                   <TouchableOpacity
// // // //                     key={key}
// // // //                     style={styles.keyButton}
// // // //                     onPress={() => handleKeyPress(key)}
// // // //                   >
// // // //                     <Text style={styles.keyButtonText}>{key}</Text>
// // // //                   </TouchableOpacity>
// // // //                 ))}
// // // //               </View>
// // // //             ))}
            
// // // //             {/* Bottom row with special keys */}
// // // //             <View style={styles.keyboardBottomRow}>
// // // //               <TouchableOpacity 
// // // //                 style={[styles.specialKey, styles.numberKey]}
// // // //                 onPress={() => {/* Switch to numbers */}}
// // // //               >
// // // //                 <Text style={styles.specialKeyText}>123</Text>
// // // //               </TouchableOpacity>
              
// // // //               <TouchableOpacity 
// // // //                 style={[styles.specialKey, styles.spaceKey]}
// // // //                 onPress={handleSpace}
// // // //               >
// // // //                 <Text style={styles.specialKeyText}>space</Text>
// // // //               </TouchableOpacity>
              
// // // //               <TouchableOpacity 
// // // //                 style={[styles.specialKey, styles.returnKey]}
// // // //                 onPress={handleReturn}
// // // //               >
// // // //                 <Text style={styles.specialKeyText}>return</Text>
// // // //               </TouchableOpacity>
              
// // // //               <TouchableOpacity 
// // // //                 style={[styles.specialKey, styles.backspaceKey]}
// // // //                 onPress={handleBackspace}
// // // //               >
// // // //                 <Ionicons name="backspace-outline" size={20} color="#fff" />
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //           </View>
// // // //         </KeyboardAvoidingView>
// // // //       )}

// // // //       {/* BOTTOM TOOLBAR - From Screen V11 Blips Main Broad Creation */}
// // // //       <View style={styles.bottomToolbar}>
// // // //         <TouchableOpacity 
// // // //           style={styles.toolbarButton}
// // // //           onPress={openGallery}
// // // //         >
// // // //           <Ionicons name="image-outline" size={24} color="#fff" />
// // // //           <Text style={styles.toolbarButtonText}>Photo</Text>
// // // //         </TouchableOpacity>

// // // //         <TouchableOpacity 
// // // //           style={styles.toolbarButton}
// // // //           onPress={addText}
// // // //           disabled={!image}
// // // //         >
// // // //           <Text style={styles.toolbarButtonIcon}>Aa</Text>
// // // //           <Text style={styles.toolbarButtonText}>Text</Text>
// // // //         </TouchableOpacity>

// // // //         <TouchableOpacity 
// // // //           style={styles.toolbarButton}
// // // //           onPress={handleShare}
// // // //           disabled={!image}
// // // //         >
// // // //           <Ionicons name="share-outline" size={24} color="#fff" />
// // // //           <Text style={styles.toolbarButtonText}>Share Blips</Text>
// // // //         </TouchableOpacity>

// // // //         <TouchableOpacity 
// // // //           style={[styles.toolbarButton, styles.postButton]}
// // // //           onPress={handlePost}
// // // //           disabled={!image || isPosting}
// // // //         >
// // // //           {isPosting ? (
// // // //             <ActivityIndicator size="small" color="#fff" />
// // // //           ) : (
// // // //             <>
// // // //               <Ionicons name="paper-plane-outline" size={20} color="#fff" />
// // // //               <Text style={styles.postButtonText}>Post</Text>
// // // //             </>
// // // //           )}
// // // //         </TouchableOpacity>
// // // //       </View>

// // // //       {/* COLOR PICKER MODAL - From Screen V11 Blips Text (Color) Creation */}
// // // //       <Modal
// // // //         visible={showColorPicker}
// // // //         transparent
// // // //         animationType="slide"
// // // //         onRequestClose={() => setShowColorPicker(false)}
// // // //       >
// // // //         <Pressable 
// // // //           style={styles.modalOverlay} 
// // // //           onPress={() => setShowColorPicker(false)}
// // // //         >
// // // //           <View style={styles.colorPickerModal}>
// // // //             <View style={styles.modalHeader}>
// // // //               <Text style={styles.modalTitle}>Text Color</Text>
// // // //               <TouchableOpacity onPress={() => setShowColorPicker(false)}>
// // // //                 <Ionicons name="close" size={24} color="#fff" />
// // // //               </TouchableOpacity>
// // // //             </View>
            
// // // //             <View style={styles.colorGrid}>
// // // //               {COLORS.map((color) => (
// // // //                 <TouchableOpacity
// // // //                   key={color}
// // // //                   style={[
// // // //                     styles.colorOption,
// // // //                     { backgroundColor: color },
// // // //                     activeText?.color === color && styles.selectedColor,
// // // //                   ]}
// // // //                   onPress={() => {
// // // //                     if (activeText) updateText(activeId, "color", color);
// // // //                     setShowColorPicker(false);
// // // //                   }}
// // // //                 />
// // // //               ))}
// // // //             </View>
            
// // // //             {/* Keyboard in modal */}
// // // //             <View style={styles.modalKeyboard}>
// // // //               <View style={styles.modalKeyboardRow}>
// // // //                 {KEYBOARD_ROWS[0].map((key) => (
// // // //                   <TouchableOpacity
// // // //                     key={key}
// // // //                     style={styles.modalKeyButton}
// // // //                     onPress={() => handleKeyPress(key)}
// // // //                   >
// // // //                     <Text style={styles.modalKeyButtonText}>{key}</Text>
// // // //                   </TouchableOpacity>
// // // //                 ))}
// // // //               </View>
              
// // // //               <View style={styles.modalKeyboardBottom}>
// // // //                 <TouchableOpacity style={styles.modalSpecialKey}>
// // // //                   <Text style={styles.modalSpecialKeyText}>123</Text>
// // // //                 </TouchableOpacity>
// // // //                 <TouchableOpacity style={styles.modalSpecialKey}>
// // // //                   <Text style={styles.modalSpecialKeyText}>space</Text>
// // // //                 </TouchableOpacity>
// // // //                 <TouchableOpacity style={styles.modalSpecialKey}>
// // // //                   <Text style={styles.modalSpecialKeyText}>return</Text>
// // // //                 </TouchableOpacity>
// // // //               </View>
// // // //             </View>
// // // //           </View>
// // // //         </Pressable>
// // // //       </Modal>

// // // //       {/* TEXT ALIGNMENT MODAL - From Screen V11 Blips Text (Text Alignment) Creation */}
// // // //       <Modal
// // // //         visible={showTextAlignment}
// // // //         transparent
// // // //         animationType="slide"
// // // //         onRequestClose={() => setShowTextAlignment(false)}
// // // //       >
// // // //         <Pressable 
// // // //           style={styles.modalOverlay} 
// // // //           onPress={() => setShowTextAlignment(false)}
// // // //         >
// // // //           <View style={styles.alignmentModal}>
// // // //             <View style={styles.modalHeader}>
// // // //               <Text style={styles.modalTitle}>Text Alignment</Text>
// // // //               <TouchableOpacity onPress={() => setShowTextAlignment(false)}>
// // // //                 <Ionicons name="close" size={24} color="#fff" />
// // // //               </TouchableOpacity>
// // // //             </View>
            
// // // //             <View style={styles.alignmentOptions}>
// // // //               <TouchableOpacity 
// // // //                 style={styles.alignmentButton}
// // // //                 onPress={() => {
// // // //                   if (activeText) updateText(activeId, "align", "left");
// // // //                   setShowTextAlignment(false);
// // // //                 }}
// // // //               >
// // // //                 <Ionicons name="align-left" size={28} color="#fff" />
// // // //                 <Text style={styles.alignmentButtonText}>Left</Text>
// // // //               </TouchableOpacity>
              
// // // //               <TouchableOpacity 
// // // //                 style={styles.alignmentButton}
// // // //                 onPress={() => {
// // // //                   if (activeText) updateText(activeId, "align", "center");
// // // //                   setShowTextAlignment(false);
// // // //                 }}
// // // //               >
// // // //                 <Ionicons name="align-center" size={28} color="#fff" />
// // // //                 <Text style={styles.alignmentButtonText}>Center</Text>
// // // //               </TouchableOpacity>
              
// // // //               <TouchableOpacity 
// // // //                 style={styles.alignmentButton}
// // // //                 onPress={() => {
// // // //                   if (activeText) updateText(activeId, "align", "right");
// // // //                   setShowTextAlignment(false);
// // // //                 }}
// // // //               >
// // // //                 <Ionicons name="align-right" size={28} color="#fff" />
// // // //                 <Text style={styles.alignmentButtonText}>Right</Text>
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //           </View>
// // // //         </Pressable>
// // // //       </Modal>

// // // //       {/* EXIT MODAL - From Screen V11 Blips (Cancel) Creation */}
// // // //       <Modal
// // // //         visible={showExitModal}
// // // //         transparent
// // // //         animationType="fade"
// // // //         onRequestClose={() => setShowExitModal(false)}
// // // //       >
// // // //         <Pressable 
// // // //           style={styles.modalOverlay} 
// // // //           onPress={() => setShowExitModal(false)}
// // // //         >
// // // //           <View style={styles.exitModal}>
// // // //             <Text style={styles.exitModalTitle}>Exit Editing?</Text>
            
// // // //             <TouchableOpacity 
// // // //               style={[styles.exitModalButton, styles.deleteButton]}
// // // //               onPress={deleteAllBlips}
// // // //             >
// // // //               <Text style={styles.deleteButtonText}>Delete Blips</Text>
// // // //             </TouchableOpacity>
            
// // // //             <TouchableOpacity 
// // // //               style={[styles.exitModalButton, styles.keepEditingButton]}
// // // //               onPress={() => setShowExitModal(false)}
// // // //             >
// // // //               <Text style={styles.keepEditingButtonText}>Keep Editing</Text>
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //         </Pressable>
// // // //       </Modal>

// // // //       {/* ACTIVE TEXT CONTROLS */}
// // // //       {activeText && !showKeyboard && (
// // // //         <View style={styles.activeControls}>
// // // //           <ScrollView 
// // // //             horizontal 
// // // //             showsHorizontalScrollIndicator={false}
// // // //             contentContainerStyle={styles.activeControlsContent}
// // // //           >
// // // //             <TouchableOpacity 
// // // //               style={styles.controlButton}
// // // //               onPress={() => setShowColorPicker(true)}
// // // //             >
// // // //               <View style={[styles.colorPreview, { backgroundColor: activeText.color }]} />
// // // //               <Text style={styles.controlButtonText}>Color</Text>
// // // //             </TouchableOpacity>

// // // //             <View style={styles.sizeControl}>
// // // //               <TouchableOpacity
// // // //                 style={styles.sizeButton}
// // // //                 onPress={() => updateText(activeId, "size", Math.max(12, activeText.size - 2))}
// // // //               >
// // // //                 <Ionicons name="remove" size={18} color="#fff" />
// // // //               </TouchableOpacity>
// // // //               <Text style={styles.sizeText}>{activeText.size}</Text>
// // // //               <TouchableOpacity
// // // //                 style={styles.sizeButton}
// // // //                 onPress={() => updateText(activeId, "size", Math.min(72, activeText.size + 2))}
// // // //               >
// // // //                 <Ionicons name="add" size={18} color="#fff" />
// // // //               </TouchableOpacity>
// // // //             </View>

// // // //             <TouchableOpacity 
// // // //               style={styles.controlButton}
// // // //               onPress={() => setShowTextAlignment(true)}
// // // //             >
// // // //               <Ionicons 
// // // //                 name={
// // // //                   activeText.align === "left" ? "align-left" :
// // // //                   activeText.align === "center" ? "align-center" :
// // // //                   "align-right"
// // // //                 } 
// // // //                 size={22} 
// // // //                 color="#fff" 
// // // //               />
// // // //               <Text style={styles.controlButtonText}>Align</Text>
// // // //             </TouchableOpacity>

// // // //             <TouchableOpacity 
// // // //               style={styles.controlButton}
// // // //               onPress={() => rotateText(45)}
// // // //             >
// // // //               <Ionicons name="sync" size={22} color="#fff" />
// // // //               <Text style={styles.controlButtonText}>Rotate</Text>
// // // //             </TouchableOpacity>

// // // //             <TouchableOpacity 
// // // //               style={styles.controlButton}
// // // //               onPress={() => setShowFontPicker(true)}
// // // //             >
// // // //               <Text style={styles.fontButtonText}>Aa</Text>
// // // //               <Text style={styles.controlButtonText}>Font</Text>
// // // //             </TouchableOpacity>

// // // //             <TouchableOpacity 
// // // //               style={[styles.controlButton, styles.deleteButton]}
// // // //               onPress={deleteActiveText}
// // // //             >
// // // //               <Ionicons name="trash-outline" size={22} color="#fff" />
// // // //               <Text style={styles.controlButtonText}>Delete</Text>
// // // //             </TouchableOpacity>
// // // //           </ScrollView>
// // // //         </View>
// // // //       )}
// // // //     </SafeAreaView>
// // // //   );
// // // // }

// // // // /* -------- STYLES -------- */
// // // // const styles = StyleSheet.create({
// // // //   container: { 
// // // //     flex: 1, 
// // // //     backgroundColor: "#000" 
// // // //   },
  
// // // //   // Header Styles
// // // //   header: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     justifyContent: "space-between",
// // // //     paddingHorizontal: 16,
// // // //     paddingTop: 8,
// // // //     paddingBottom: 12,
// // // //     backgroundColor: "#000",
// // // //     borderBottomWidth: 0.5,
// // // //     borderBottomColor: "#333",
// // // //   },
// // // //   headerButton: {
// // // //     padding: 8,
// // // //     minWidth: 44,
// // // //     alignItems: "center",
// // // //   },
// // // //   headerCenter: {
// // // //     alignItems: "center",
// // // //   },
// // // //   headerTime: {
// // // //     color: "#fff",
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //     marginBottom: 2,
// // // //   },
// // // //   headerTitle: {
// // // //     color: "#fff",
// // // //     fontSize: 16,
// // // //     fontWeight: "700",
// // // //   },
  
// // // //   // Canvas Styles
// // // //   canvasContainer: {
// // // //     flex: 1,
// // // //     backgroundColor: "#000",
// // // //   },
// // // //   canvas: {
// // // //     flex: 1,
// // // //     backgroundColor: "#000",
// // // //   },
// // // //   image: {
// // // //     width: STORY_WIDTH,
// // // //     height: STORY_HEIGHT,
// // // //     alignSelf: "center",
// // // //   },
  
// // // //   placeholderContainer: {
// // // //     flex: 1,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     backgroundColor: "#111",
// // // //   },
// // // //   placeholderContent: {
// // // //     alignItems: "center",
// // // //     gap: 20,
// // // //   },
// // // //   placeholderText: {
// // // //     color: "#fff",
// // // //     fontSize: 18,
// // // //     fontWeight: "600",
// // // //   },
  
// // // //   // Text Styles
// // // //   textContainer: {
// // // //     position: "absolute",
// // // //     maxWidth: STORY_WIDTH * 0.8,
// // // //   },
// // // //   textWrapper: {
// // // //     padding: 8,
// // // //   },
// // // //   activeTextWrapper: {
// // // //     backgroundColor: "rgba(255, 255, 255, 0.1)",
// // // //   },
// // // //   textElement: {
// // // //     fontWeight: "700",
// // // //     textShadowColor: "rgba(0, 0, 0, 0.8)",
// // // //     textShadowOffset: { width: 1, height: 1 },
// // // //     textShadowRadius: 4,
// // // //   },
// // // //   selectionBorder: {
// // // //     position: "absolute",
// // // //     top: -4,
// // // //     left: -4,
// // // //     right: -4,
// // // //     bottom: -4,
// // // //     borderWidth: 2,
// // // //     borderColor: "#4F7CFF",
// // // //     borderRadius: 6,
// // // //     borderStyle: "dashed",
// // // //   },
// // // //   rotationHandle: {
// // // //     position: "absolute",
// // // //     top: -30,
// // // //     right: -10,
// // // //     width: 30,
// // // //     height: 30,
// // // //     borderRadius: 15,
// // // //     backgroundColor: "#4F7CFF",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //   },
  
// // // //   // Keyboard Styles
// // // //   keyboardContainer: {
// // // //     position: "absolute",
// // // //     bottom: 0,
// // // //     left: 0,
// // // //     right: 0,
// // // //     backgroundColor: "#1A1A1A",
// // // //     borderTopLeftRadius: 20,
// // // //     borderTopRightRadius: 20,
// // // //     paddingBottom: Platform.OS === "ios" ? 20 : 0,
// // // //   },
// // // //   inputHeader: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     justifyContent: "space-between",
// // // //     paddingHorizontal: 16,
// // // //     paddingVertical: 12,
// // // //     borderBottomWidth: 1,
// // // //     borderBottomColor: "#333",
// // // //   },
// // // //   inputHeaderText: {
// // // //     color: "#fff",
// // // //     fontSize: 16,
// // // //     fontWeight: "600",
// // // //     flex: 1,
// // // //   },
// // // //   inputCloseButton: {
// // // //     padding: 4,
// // // //   },
  
// // // //   fontSelection: {
// // // //     maxHeight: 50,
// // // //     borderBottomWidth: 1,
// // // //     borderBottomColor: "#333",
// // // //   },
// // // //   fontSelectionContent: {
// // // //     paddingHorizontal: 16,
// // // //     paddingVertical: 10,
// // // //     gap: 12,
// // // //   },
// // // //   fontOption: {
// // // //     paddingHorizontal: 16,
// // // //     paddingVertical: 8,
// // // //     borderRadius: 20,
// // // //     backgroundColor: "#333",
// // // //   },
// // // //   selectedFontOption: {
// // // //     backgroundColor: "#4F7CFF",
// // // //   },
// // // //   fontOptionText: {
// // // //     color: "#fff",
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //   },
// // // //   selectedFontOptionText: {
// // // //     color: "#fff",
// // // //   },
  
// // // //   customKeyboard: {
// // // //     padding: 10,
// // // //   },
// // // //   keyboardRow: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "center",
// // // //     marginBottom: 8,
// // // //   },
// // // //   keyButton: {
// // // //     width: (width - 40) / 10,
// // // //     height: 45,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     backgroundColor: "#333",
// // // //     borderRadius: 8,
// // // //     marginHorizontal: 2,
// // // //   },
// // // //   keyButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 18,
// // // //     fontWeight: "600",
// // // //   },
// // // //   keyboardBottomRow: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     marginTop: 8,
// // // //     paddingHorizontal: 10,
// // // //   },
// // // //   specialKey: {
// // // //     height: 45,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     backgroundColor: "#333",
// // // //     borderRadius: 8,
// // // //   },
// // // //   specialKeyText: {
// // // //     color: "#fff",
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //   },
// // // //   numberKey: {
// // // //     width: width * 0.2,
// // // //   },
// // // //   spaceKey: {
// // // //     flex: 1,
// // // //     marginHorizontal: 10,
// // // //   },
// // // //   returnKey: {
// // // //     width: width * 0.3,
// // // //   },
// // // //   backspaceKey: {
// // // //     width: 60,
// // // //   },
  
// // // //   // Bottom Toolbar
// // // //   bottomToolbar: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 16,
// // // //     paddingVertical: 12,
// // // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // // //     borderTopWidth: 0.5,
// // // //     borderTopColor: "#333",
// // // //   },
// // // //   toolbarButton: {
// // // //     flex: 1,
// // // //     alignItems: "center",
// // // //     paddingVertical: 8,
// // // //   },
// // // //   toolbarButtonIcon: {
// // // //     color: "#fff",
// // // //     fontSize: 24,
// // // //     fontWeight: "700",
// // // //     marginBottom: 4,
// // // //   },
// // // //   toolbarButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 12,
// // // //   },
// // // //   postButton: {
// // // //     flex: 0,
// // // //     flexDirection: "row",
// // // //     backgroundColor: "#4F7CFF",
// // // //     paddingHorizontal: 20,
// // // //     paddingVertical: 10,
// // // //     borderRadius: 25,
// // // //     gap: 8,
// // // //   },
// // // //   postButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 14,
// // // //     fontWeight: "700",
// // // //   },
  
// // // //   // Active Controls
// // // //   activeControls: {
// // // //     position: "absolute",
// // // //     bottom: 70,
// // // //     left: 0,
// // // //     right: 0,
// // // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // // //     paddingVertical: 12,
// // // //     borderTopWidth: 0.5,
// // // //     borderTopColor: "#333",
// // // //   },
// // // //   activeControlsContent: {
// // // //     paddingHorizontal: 16,
// // // //     gap: 20,
// // // //     alignItems: "center",
// // // //   },
// // // //   controlButton: {
// // // //     alignItems: "center",
// // // //     gap: 4,
// // // //     minWidth: 50,
// // // //   },
// // // //   controlButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 12,
// // // //   },
// // // //   colorPreview: {
// // // //     width: 30,
// // // //     height: 30,
// // // //     borderRadius: 15,
// // // //     borderWidth: 2,
// // // //     borderColor: "#fff",
// // // //   },
// // // //   fontButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 24,
// // // //     fontWeight: "700",
// // // //   },
// // // //   sizeControl: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     gap: 10,
// // // //     backgroundColor: "#333",
// // // //     borderRadius: 20,
// // // //     paddingHorizontal: 12,
// // // //     paddingVertical: 8,
// // // //   },
// // // //   sizeButton: {
// // // //     width: 28,
// // // //     height: 28,
// // // //     borderRadius: 14,
// // // //     backgroundColor: "#444",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //   },
// // // //   sizeText: {
// // // //     color: "#fff",
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //     minWidth: 30,
// // // //     textAlign: "center",
// // // //   },
  
// // // //   // Modal Styles
// // // //   modalOverlay: {
// // // //     flex: 1,
// // // //     backgroundColor: "rgba(0, 0, 0, 0.7)",
// // // //     justifyContent: "flex-end",
// // // //   },
  
// // // //   // Color Picker Modal
// // // //   colorPickerModal: {
// // // //     backgroundColor: "#1A1A1A",
// // // //     borderTopLeftRadius: 20,
// // // //     borderTopRightRadius: 20,
// // // //     paddingBottom: 20,
// // // //   },
// // // //   modalHeader: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 20,
// // // //     paddingVertical: 16,
// // // //     borderBottomWidth: 0.5,
// // // //     borderBottomColor: "#333",
// // // //   },
// // // //   modalTitle: {
// // // //     color: "#fff",
// // // //     fontSize: 18,
// // // //     fontWeight: "700",
// // // //   },
// // // //   colorGrid: {
// // // //     flexDirection: "row",
// // // //     flexWrap: "wrap",
// // // //     justifyContent: "center",
// // // //     padding: 20,
// // // //     gap: 12,
// // // //   },
// // // //   colorOption: {
// // // //     width: 44,
// // // //     height: 44,
// // // //     borderRadius: 22,
// // // //     borderWidth: 2,
// // // //     borderColor: "transparent",
// // // //   },
// // // //   selectedColor: {
// // // //     borderColor: "#4F7CFF",
// // // //     transform: [{ scale: 1.1 }],
// // // //   },
  
// // // //   // Modal Keyboard
// // // //   modalKeyboard: {
// // // //     padding: 10,
// // // //     borderTopWidth: 1,
// // // //     borderTopColor: "#333",
// // // //   },
// // // //   modalKeyboardRow: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "center",
// // // //     marginBottom: 8,
// // // //   },
// // // //   modalKeyButton: {
// // // //     width: (width - 40) / 10,
// // // //     height: 40,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     backgroundColor: "#333",
// // // //     borderRadius: 6,
// // // //     marginHorizontal: 1,
// // // //   },
// // // //   modalKeyButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 16,
// // // //     fontWeight: "600",
// // // //   },
// // // //   modalKeyboardBottom: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     marginTop: 8,
// // // //     paddingHorizontal: 10,
// // // //   },
// // // //   modalSpecialKey: {
// // // //     height: 40,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     backgroundColor: "#333",
// // // //     borderRadius: 6,
// // // //     paddingHorizontal: 20,
// // // //   },
// // // //   modalSpecialKeyText: {
// // // //     color: "#fff",
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //   },
  
// // // //   // Alignment Modal
// // // //   alignmentModal: {
// // // //     backgroundColor: "#1A1A1A",
// // // //     borderTopLeftRadius: 20,
// // // //     borderTopRightRadius: 20,
// // // //     paddingBottom: 40,
// // // //   },
// // // //   alignmentOptions: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-around",
// // // //     paddingHorizontal: 20,
// // // //     paddingVertical: 30,
// // // //   },
// // // //   alignmentButton: {
// // // //     alignItems: "center",
// // // //     gap: 8,
// // // //   },
// // // //   alignmentButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //   },
  
// // // //   // Exit Modal
// // // //   exitModal: {
// // // //     backgroundColor: "#262626",
// // // //     borderRadius: 15,
// // // //     padding: 20,
// // // //     width: width * 0.85,
// // // //     alignSelf: "center",
// // // //   },
// // // //   exitModalTitle: {
// // // //     color: "#fff",
// // // //     fontSize: 20,
// // // //     fontWeight: "700",
// // // //     textAlign: "center",
// // // //     marginBottom: 20,
// // // //   },
// // // //   exitModalButton: {
// // // //     paddingVertical: 15,
// // // //     borderRadius: 10,
// // // //     alignItems: "center",
// // // //     marginBottom: 10,
// // // //   },
// // // //   deleteButton: {
// // // //     backgroundColor: "#FF3B30",
// // // //   },
// // // //   deleteButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 16,
// // // //     fontWeight: "700",
// // // //   },
// // // //   keepEditingButton: {
// // // //     backgroundColor: "#333",
// // // //   },
// // // //   keepEditingButtonText: {
// // // //     color: "#fff",
// // // //     fontSize: 16,
// // // //     fontWeight: "600",
// // // //   },
// // // // });


// // // import React, { useEffect, useState, useRef, useCallback } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   Image,
// // //   TextInput,
// // //   StatusBar,
// // //   Animated,
// // //   PanResponder,
// // //   Pressable,
// // //   Alert,
// // //   Dimensions,
// // //   ScrollView,
// // //   Modal,
// // //   FlatList,
// // //   ActivityIndicator,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // // } from "react-native";
// // // import { SafeAreaView } from "react-native-safe-area-context";
// // // import * as ImagePicker from "expo-image-picker";
// // // import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

// // // const { width, height } = Dimensions.get("window");
// // // const ASPECT_RATIO = 9/16;
// // // const STORY_WIDTH = width;
// // // const STORY_HEIGHT = width / ASPECT_RATIO;

// // // // Color palette from your design
// // // const COLORS = [
// // //   "#FFFFFF", "#FF5C5C", "#FF9F00", "#FFD700", "#32CD32", "#1E90FF", 
// // //   "#9370DB", "#FF69B4", "#00CED1", "#FF4500", "#9ACD32", "#BA55D3",
// // //   "#000000", "#696969", "#D3D3D3"
// // // ];

// // // // Font styles
// // // const FONTS = [
// // //   { name: "Classic", value: "System" },
// // //   { name: "Modern", value: "System", weight: "bold" },
// // //   { name: "Elegant", value: "System", weight: "300" },
// // //   { name: "Fun", value: "System", style: "italic" },
// // // ];

// // // // Keyboard layout
// // // const KEYBOARD_ROWS = [
// // //   ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
// // //   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
// // //   ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
// // // ];

// // // export default function BlipsCreationScreen({ navigation }) {
// // //   const [image, setImage] = useState(null);
// // //   const [texts, setTexts] = useState([]);
// // //   const [activeId, setActiveId] = useState(null);
// // //   const [showInput, setShowInput] = useState(false);
// // //   const [inputValue, setInputValue] = useState("");
// // //   const [showColorPicker, setShowColorPicker] = useState(false);
// // //   const [showFontPicker, setShowFontPicker] = useState(false);
// // //   const [showTextAlignment, setShowTextAlignment] = useState(false);
// // //   const [showKeyboard, setShowKeyboard] = useState(false);
// // //   const [selectedFont, setSelectedFont] = useState("Classic");
// // //   const [isPosting, setIsPosting] = useState(false);
// // //   const [showExitModal, setShowExitModal] = useState(false);
  
// // //   const textInputRef = useRef(null);

// // //   useEffect(() => {
// // //     (async () => {
// // //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// // //       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
// // //     })();
// // //   }, []);

// // //   /* -------- IMAGE PICKER -------- */
// // //   const openGallery = async () => {
// // //     try {
// // //       const res = await ImagePicker.launchImageLibraryAsync({
// // //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // //         quality: 1,
// // //         allowsEditing: true,
// // //         aspect: [9, 16],
// // //       });
      
// // //       if (!res.canceled && res.assets[0].uri) {
// // //         setImage(res.assets[0].uri);
// // //         setTexts([]);
// // //         setActiveId(null);
// // //         setShowInput(false);
// // //       }
// // //     } catch (error) {
// // //       Alert.alert("Error", "Failed to pick image");
// // //     }
// // //   };

// // //   const openCamera = async () => {
// // //     try {
// // //       const res = await ImagePicker.launchCameraAsync({
// // //         quality: 1,
// // //         allowsEditing: true,
// // //         aspect: [9, 16],
// // //       });
      
// // //       if (!res.canceled && res.assets[0].uri) {
// // //         setImage(res.assets[0].uri);
// // //         setTexts([]);
// // //         setActiveId(null);
// // //         setShowInput(false);
// // //       }
// // //     } catch (error) {
// // //       Alert.alert("Error", "Failed to take photo");
// // //     }
// // //   };

// // //   /* -------- ADD TEXT -------- */
// // //   const addText = () => {
// // //     if (!image) {
// // //       Alert.alert("Select Image", "Please select an image first");
// // //       return;
// // //     }

// // //     const id = Date.now().toString();
// // //     const pan = new Animated.ValueXY({ 
// // //       x: STORY_WIDTH / 2 - 60, 
// // //       y: STORY_HEIGHT / 2 - 25 
// // //     });

// // //     const panResponder = PanResponder.create({
// // //       onStartShouldSetPanResponder: () => true,
// // //       onPanResponderGrant: () => {
// // //         setActiveId(id);
// // //         setShowInput(false);
// // //         pan.extractOffset();
// // //       },
// // //       onPanResponderMove: Animated.event(
// // //         [null, { dx: pan.x, dy: pan.y }],
// // //         { useNativeDriver: false }
// // //       ),
// // //       onPanResponderRelease: () => {
// // //         pan.flattenOffset();
// // //       },
// // //     });

// // //     const newText = {
// // //       id,
// // //       text: "@Shusshi Clan......",
// // //       size: 32,
// // //       color: "#FFFFFF",
// // //       align: "center",
// // //       font: "Classic",
// // //       fontWeight: "normal",
// // //       fontStyle: "normal",
// // //       rotation: 0,
// // //       pan,
// // //       panResponder,
// // //     };

// // //     setTexts((prev) => [...prev, newText]);
// // //     setActiveId(id);
// // //     setInputValue("@Shusshi Clan......");
// // //     setShowInput(true);
// // //     setShowKeyboard(true);
// // //   };

// // //   const updateText = useCallback((id, key, value) => {
// // //     setTexts((prev) =>
// // //       prev.map((text) => (text.id === id ? { ...text, [key]: value } : text))
// // //     );
// // //   }, []);

// // //   const deleteActiveText = () => {
// // //     if (!activeId) return;
    
// // //     setTexts((prev) => prev.filter((text) => text.id !== activeId));
// // //     setActiveId(null);
// // //     setShowInput(false);
// // //     setInputValue("");
// // //     setShowKeyboard(false);
// // //   };

// // //   const deleteAllBlips = () => {
// // //     setShowExitModal(false);
// // //     setTexts([]);
// // //     setActiveId(null);
// // //     setShowInput(false);
// // //     setInputValue("");
// // //     setShowKeyboard(false);
// // //   };

// // //   const rotateText = (degrees) => {
// // //     if (!activeId) return;
// // //     const activeText = texts.find((t) => t.id === activeId);
// // //     if (!activeText) return;
    
// // //     updateText(activeId, "rotation", (activeText.rotation + degrees) % 360);
// // //   };

// // //   /* -------- KEYBOARD FUNCTIONS -------- */
// // //   const handleKeyPress = (key) => {
// // //     if (activeId) {
// // //       const newText = inputValue + key;
// // //       setInputValue(newText);
// // //       updateText(activeId, "text", newText);
// // //     }
// // //   };

// // //   const handleBackspace = () => {
// // //     if (activeId && inputValue.length > 0) {
// // //       const newText = inputValue.slice(0, -1);
// // //       setInputValue(newText);
// // //       updateText(activeId, "text", newText);
// // //     }
// // //   };

// // //   const handleSpace = () => {
// // //     if (activeId) {
// // //       const newText = inputValue + " ";
// // //       setInputValue(newText);
// // //       updateText(activeId, "text", newText);
// // //     }
// // //   };

// // //   const handleReturn = () => {
// // //     if (activeId) {
// // //       const newText = inputValue + "\n";
// // //       setInputValue(newText);
// // //       updateText(activeId, "text", newText);
// // //     }
// // //   };

// // //   /* -------- POST FUNCTIONALITY -------- */
// // //   const handlePost = async () => {
// // //     if (!image) {
// // //       Alert.alert("Select Image", "Please select an image first");
// // //       return;
// // //     }

// // //     setIsPosting(true);
    
// // //     try {
// // //       // Simulate posting process
// // //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// // //       Alert.alert(
// // //         "Posted!",
// // //         "Your blip has been posted successfully.",
// // //         [
// // //           { 
// // //             text: "View Profile", 
// // //             onPress: () => navigation.navigate("Profile") 
// // //           },
// // //           { text: "OK", onPress: () => setIsPosting(false) }
// // //         ]
// // //       );
// // //     } catch (error) {
// // //       Alert.alert("Error", "Failed to post. Please try again.");
// // //       setIsPosting(false);
// // //     }
// // //   };

// // //   /* -------- SHARE FUNCTIONALITY -------- */
// // //   const handleShare = async () => {
// // //     if (!image) {
// // //       Alert.alert("Select Image", "Please select an image first");
// // //       return;
// // //     }

// // //     Alert.alert(
// // //       "Share Blips",
// // //       "Your blip has been shared!",
// // //       [{ text: "OK" }]
// // //     );
// // //   };

// // //   const activeText = texts.find((t) => t.id === activeId);

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       <StatusBar barStyle="light-content" backgroundColor="#000" />

// // //       {/* HEADER - From Screen V11 Blips Main Broad Creation */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity 
// // //           style={styles.headerButton}
// // //           onPress={() => setShowExitModal(true)}
// // //         >
// // //           <Ionicons name="chevron-back" size={28} color="#fff" />
// // //         </TouchableOpacity>
        
// // //         <View style={styles.headerCenter}>
// // //           <Text style={styles.headerTime}>9:41</Text>
// // //           <Text style={styles.headerTitle}>Create Blips</Text>
// // //         </View>
        
// // //         <TouchableOpacity 
// // //           style={styles.headerButton}
// // //           onPress={() => {
// // //             // Add your functionality here
// // //           }}
// // //         >
// // //           <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
// // //         </TouchableOpacity>
// // //       </View>

// // //       {/* CANVAS AREA */}
// // //       <View style={styles.canvasContainer}>
// // //         <Pressable
// // //           style={styles.canvas}
// // //           onPress={() => {
// // //             setActiveId(null);
// // //             setShowInput(false);
// // //             setShowColorPicker(false);
// // //             setShowFontPicker(false);
// // //             setShowTextAlignment(false);
// // //             setShowKeyboard(false);
// // //           }}
// // //         >
// // //           {image ? (
// // //             <>
// // //               <Image 
// // //                 source={{ uri: image }} 
// // //                 style={styles.image} 
// // //                 resizeMode="cover"
// // //               />
              
// // //               {/* Render texts */}
// // //               {texts.map((item) => (
// // //                 <Animated.View
// // //                   key={item.id}
// // //                   style={[
// // //                     styles.textContainer,
// // //                     {
// // //                       transform: [
// // //                         ...item.pan.getTranslateTransform(),
// // //                         { rotate: `${item.rotation}deg` }
// // //                       ],
// // //                       zIndex: item.id === activeId ? 1000 : texts.indexOf(item) + 1,
// // //                     },
// // //                   ]}
// // //                   {...item.panResponder.panHandlers}
// // //                 >
// // //                   <TouchableOpacity
// // //                     activeOpacity={0.8}
// // //                     onPress={() => {
// // //                       setActiveId(item.id);
// // //                       setInputValue(item.text);
// // //                       setShowInput(true);
// // //                       setShowKeyboard(true);
// // //                     }}
// // //                     style={[
// // //                       styles.textWrapper,
// // //                       activeId === item.id && styles.activeTextWrapper,
// // //                     ]}
// // //                   >
// // //                     <Text
// // //                       style={[
// // //                         styles.textElement,
// // //                         {
// // //                           color: item.color,
// // //                           fontSize: item.size,
// // //                           textAlign: item.align,
// // //                           fontWeight: item.fontWeight,
// // //                           fontStyle: item.fontStyle,
// // //                         },
// // //                       ]}
// // //                       numberOfLines={10}
// // //                     >
// // //                       {item.text}
// // //                     </Text>
                    
// // //                     {activeId === item.id && (
// // //                       <View style={styles.selectionBorder}>
// // //                         <View style={styles.rotationHandle}>
// // //                           <Ionicons name="sync" size={16} color="#fff" />
// // //                         </View>
// // //                       </View>
// // //                     )}
// // //                   </TouchableOpacity>
// // //                 </Animated.View>
// // //               ))}
// // //             </>
// // //           ) : (
// // //             <TouchableOpacity 
// // //               style={styles.placeholderContainer}
// // //               onPress={openGallery}
// // //             >
// // //               <View style={styles.placeholderContent}>
// // //                 <Ionicons name="camera-outline" size={80} color="#666" />
// // //                 <Text style={styles.placeholderText}>Tap to add photo</Text>
// // //               </View>
// // //             </TouchableOpacity>
// // //           )}
// // //         </Pressable>
// // //       </View>

// // //       {/* TEXT INPUT WITH KEYBOARD - From Screen V11 Blips Text Creation */}
// // //       {showKeyboard && (
// // //         <KeyboardAvoidingView 
// // //           behavior={Platform.OS === "ios" ? "padding" : "height"}
// // //           style={styles.keyboardContainer}
// // //         >
// // //           <View style={styles.inputHeader}>
// // //             <Text style={styles.inputHeaderText}>
// // //               {activeText ? activeText.text : "Type your text..."}
// // //             </Text>
// // //             <TouchableOpacity 
// // //               style={styles.inputCloseButton}
// // //               onPress={() => setShowKeyboard(false)}
// // //             >
// // //               <Ionicons name="close" size={24} color="#fff" />
// // //             </TouchableOpacity>
// // //           </View>

// // //           {/* Font Selection - From Screen V11 Blips Text Creation */}
// // //           <ScrollView 
// // //             horizontal 
// // //             showsHorizontalScrollIndicator={false}
// // //             style={styles.fontSelection}
// // //             contentContainerStyle={styles.fontSelectionContent}
// // //           >
// // //             {FONTS.map((font) => (
// // //               <TouchableOpacity
// // //                 key={font.name}
// // //                 style={[
// // //                   styles.fontOption,
// // //                   selectedFont === font.name && styles.selectedFontOption,
// // //                 ]}
// // //                 onPress={() => {
// // //                   setSelectedFont(font.name);
// // //                   if (activeText) {
// // //                     updateText(activeId, "font", font.name);
// // //                     updateText(activeId, "fontWeight", font.weight || "normal");
// // //                     updateText(activeId, "fontStyle", font.style || "normal");
// // //                   }
// // //                 }}
// // //               >
// // //                 <Text style={[
// // //                   styles.fontOptionText,
// // //                   selectedFont === font.name && styles.selectedFontOptionText,
// // //                 ]}>
// // //                   {font.name}
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             ))}
// // //           </ScrollView>

// // //           {/* Custom Keyboard - From your designs */}
// // //           <View style={styles.customKeyboard}>
// // //             {KEYBOARD_ROWS.map((row, rowIndex) => (
// // //               <View key={rowIndex} style={styles.keyboardRow}>
// // //                 {row.map((key) => (
// // //                   <TouchableOpacity
// // //                     key={key}
// // //                     style={styles.keyButton}
// // //                     onPress={() => handleKeyPress(key)}
// // //                   >
// // //                     <Text style={styles.keyButtonText}>{key}</Text>
// // //                   </TouchableOpacity>
// // //                 ))}
// // //               </View>
// // //             ))}
            
// // //             {/* Bottom row with special keys */}
// // //             <View style={styles.keyboardBottomRow}>
// // //               <TouchableOpacity 
// // //                 style={[styles.specialKey, styles.numberKey]}
// // //                 onPress={() => {/* Switch to numbers */}}
// // //               >
// // //                 <Text style={styles.specialKeyText}>123</Text>
// // //               </TouchableOpacity>
              
// // //               <TouchableOpacity 
// // //                 style={[styles.specialKey, styles.spaceKey]}
// // //                 onPress={handleSpace}
// // //               >
// // //                 <Text style={styles.specialKeyText}>space</Text>
// // //               </TouchableOpacity>
              
// // //               <TouchableOpacity 
// // //                 style={[styles.specialKey, styles.returnKey]}
// // //                 onPress={handleReturn}
// // //               >
// // //                 <Text style={styles.specialKeyText}>return</Text>
// // //               </TouchableOpacity>
              
// // //               <TouchableOpacity 
// // //                 style={[styles.specialKey, styles.backspaceKey]}
// // //                 onPress={handleBackspace}
// // //               >
// // //                 <Ionicons name="backspace-outline" size={20} color="#fff" />
// // //               </TouchableOpacity>
// // //             </View>
// // //           </View>
// // //         </KeyboardAvoidingView>
// // //       )}

// // //       {/* BOTTOM TOOLBAR - From Screen V11 Blips Main Broad Creation */}
// // //       <View style={styles.bottomToolbar}>
// // //         <TouchableOpacity 
// // //           style={styles.toolbarButton}
// // //           onPress={openGallery}
// // //         >
// // //           <Ionicons name="image-outline" size={24} color="#fff" />
// // //           <Text style={styles.toolbarButtonText}>Photo</Text>
// // //         </TouchableOpacity>

// // //         <TouchableOpacity 
// // //           style={styles.toolbarButton}
// // //           onPress={addText}
// // //           disabled={!image}
// // //         >
// // //           <Text style={styles.toolbarButtonIcon}>Aa</Text>
// // //           <Text style={styles.toolbarButtonText}>Text</Text>
// // //         </TouchableOpacity>

// // //         <TouchableOpacity 
// // //           style={styles.toolbarButton}
// // //           onPress={handleShare}
// // //           disabled={!image}
// // //         >
// // //           <Ionicons name="share-outline" size={24} color="#fff" />
// // //           <Text style={styles.toolbarButtonText}>Share Blips</Text>
// // //         </TouchableOpacity>

// // //         <TouchableOpacity 
// // //           style={[styles.toolbarButton, styles.postButton]}
// // //           onPress={handlePost}
// // //           disabled={!image || isPosting}
// // //         >
// // //           {isPosting ? (
// // //             <ActivityIndicator size="small" color="#fff" />
// // //           ) : (
// // //             <>
// // //               <Ionicons name="paper-plane-outline" size={20} color="#fff" />
// // //               <Text style={styles.postButtonText}>Post</Text>
// // //             </>
// // //           )}
// // //         </TouchableOpacity>
// // //       </View>

// // //       {/* COLOR PICKER MODAL - From Screen V11 Blips Text (Color) Creation */}
// // //       <Modal
// // //         visible={showColorPicker}
// // //         transparent
// // //         animationType="slide"
// // //         onRequestClose={() => setShowColorPicker(false)}
// // //       >
// // //         <Pressable 
// // //           style={styles.modalOverlay} 
// // //           onPress={() => setShowColorPicker(false)}
// // //         >
// // //           <View style={styles.colorPickerModal}>
// // //             <View style={styles.modalHeader}>
// // //               <Text style={styles.modalTitle}>Text Color</Text>
// // //               <TouchableOpacity onPress={() => setShowColorPicker(false)}>
// // //                 <Ionicons name="close" size={24} color="#fff" />
// // //               </TouchableOpacity>
// // //             </View>
            
// // //             <View style={styles.colorGrid}>
// // //               {COLORS.map((color) => (
// // //                 <TouchableOpacity
// // //                   key={color}
// // //                   style={[
// // //                     styles.colorOption,
// // //                     { backgroundColor: color },
// // //                     activeText?.color === color && styles.selectedColor,
// // //                   ]}
// // //                   onPress={() => {
// // //                     if (activeText) updateText(activeId, "color", color);
// // //                     setShowColorPicker(false);
// // //                   }}
// // //                 />
// // //               ))}
// // //             </View>
            
// // //             {/* Keyboard in modal */}
// // //             <View style={styles.modalKeyboard}>
// // //               <View style={styles.modalKeyboardRow}>
// // //                 {KEYBOARD_ROWS[0].map((key) => (
// // //                   <TouchableOpacity
// // //                     key={key}
// // //                     style={styles.modalKeyButton}
// // //                     onPress={() => handleKeyPress(key)}
// // //                   >
// // //                     <Text style={styles.modalKeyButtonText}>{key}</Text>
// // //                   </TouchableOpacity>
// // //                 ))}
// // //               </View>
              
// // //               <View style={styles.modalKeyboardBottom}>
// // //                 <TouchableOpacity style={styles.modalSpecialKey}>
// // //                   <Text style={styles.modalSpecialKeyText}>123</Text>
// // //                 </TouchableOpacity>
// // //                 <TouchableOpacity style={styles.modalSpecialKey}>
// // //                   <Text style={styles.modalSpecialKeyText}>space</Text>
// // //                 </TouchableOpacity>
// // //                 <TouchableOpacity style={styles.modalSpecialKey}>
// // //                   <Text style={styles.modalSpecialKeyText}>return</Text>
// // //                 </TouchableOpacity>
// // //               </View>
// // //             </View>
// // //           </View>
// // //         </Pressable>
// // //       </Modal>

// // //       {/* TEXT ALIGNMENT MODAL - From Screen V11 Blips Text (Text Alignment) Creation */}
// // //       <Modal
// // //         visible={showTextAlignment}
// // //         transparent
// // //         animationType="slide"
// // //         onRequestClose={() => setShowTextAlignment(false)}
// // //       >
// // //         <Pressable 
// // //           style={styles.modalOverlay} 
// // //           onPress={() => setShowTextAlignment(false)}
// // //         >
// // //           <View style={styles.alignmentModal}>
// // //             <View style={styles.modalHeader}>
// // //               <Text style={styles.modalTitle}>Text Alignment</Text>
// // //               <TouchableOpacity onPress={() => setShowTextAlignment(false)}>
// // //                 <Ionicons name="close" size={24} color="#fff" />
// // //               </TouchableOpacity>
// // //             </View>
            
// // //             <View style={styles.alignmentOptions}>
// // //               <TouchableOpacity 
// // //                 style={styles.alignmentButton}
// // //                 onPress={() => {
// // //                   if (activeText) updateText(activeId, "align", "left");
// // //                   setShowTextAlignment(false);
// // //                 }}
// // //               >
// // //                 <Ionicons name="align-left" size={28} color="#fff" />
// // //                 <Text style={styles.alignmentButtonText}>Left</Text>
// // //               </TouchableOpacity>
              
// // //               <TouchableOpacity 
// // //                 style={styles.alignmentButton}
// // //                 onPress={() => {
// // //                   if (activeText) updateText(activeId, "align", "center");
// // //                   setShowTextAlignment(false);
// // //                 }}
// // //               >
// // //                 <Ionicons name="align-center" size={28} color="#fff" />
// // //                 <Text style={styles.alignmentButtonText}>Center</Text>
// // //               </TouchableOpacity>
              
// // //               <TouchableOpacity 
// // //                 style={styles.alignmentButton}
// // //                 onPress={() => {
// // //                   if (activeText) updateText(activeId, "align", "right");
// // //                   setShowTextAlignment(false);
// // //                 }}
// // //               >
// // //                 <Ionicons name="align-right" size={28} color="#fff" />
// // //                 <Text style={styles.alignmentButtonText}>Right</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           </View>
// // //         </Pressable>
// // //       </Modal>

// // //       {/* EXIT MODAL - From Screen V11 Blips (Cancel) Creation */}
// // //       <Modal
// // //         visible={showExitModal}
// // //         transparent
// // //         animationType="fade"
// // //         onRequestClose={() => setShowExitModal(false)}
// // //       >
// // //         <Pressable 
// // //           style={styles.modalOverlay} 
// // //           onPress={() => setShowExitModal(false)}
// // //         >
// // //           <View style={styles.exitModal}>
// // //             <Text style={styles.exitModalTitle}>Exit Editing?</Text>
            
// // //             <TouchableOpacity 
// // //               style={[styles.exitModalButton, styles.deleteButton]}
// // //               onPress={deleteAllBlips}
// // //             >
// // //               <Text style={styles.deleteButtonText}>Delete Blips</Text>
// // //             </TouchableOpacity>
            
// // //             <TouchableOpacity 
// // //               style={[styles.exitModalButton, styles.keepEditingButton]}
// // //               onPress={() => setShowExitModal(false)}
// // //             >
// // //               <Text style={styles.keepEditingButtonText}>Keep Editing</Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         </Pressable>
// // //       </Modal>

// // //       {/* ACTIVE TEXT CONTROLS */}
// // //       {activeText && !showKeyboard && (
// // //         <View style={styles.activeControls}>
// // //           <ScrollView 
// // //             horizontal 
// // //             showsHorizontalScrollIndicator={false}
// // //             contentContainerStyle={styles.activeControlsContent}
// // //           >
// // //             <TouchableOpacity 
// // //               style={styles.controlButton}
// // //               onPress={() => setShowColorPicker(true)}
// // //             >
// // //               <View style={[styles.colorPreview, { backgroundColor: activeText.color }]} />
// // //               <Text style={styles.controlButtonText}>Color</Text>
// // //             </TouchableOpacity>

// // //             <View style={styles.sizeControl}>
// // //               <TouchableOpacity
// // //                 style={styles.sizeButton}
// // //                 onPress={() => updateText(activeId, "size", Math.max(12, activeText.size - 2))}
// // //               >
// // //                 <Ionicons name="remove" size={18} color="#fff" />
// // //               </TouchableOpacity>
// // //               <Text style={styles.sizeText}>{activeText.size}</Text>
// // //               <TouchableOpacity
// // //                 style={styles.sizeButton}
// // //                 onPress={() => updateText(activeId, "size", Math.min(72, activeText.size + 2))}
// // //               >
// // //                 <Ionicons name="add" size={18} color="#fff" />
// // //               </TouchableOpacity>
// // //             </View>

// // //             <TouchableOpacity 
// // //               style={styles.controlButton}
// // //               onPress={() => setShowTextAlignment(true)}
// // //             >
// // //               <Ionicons 
// // //                 name={
// // //                   activeText.align === "left" ? "align-left" :
// // //                   activeText.align === "center" ? "align-center" :
// // //                   "align-right"
// // //                 } 
// // //                 size={22} 
// // //                 color="#fff" 
// // //               />
// // //               <Text style={styles.controlButtonText}>Align</Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity 
// // //               style={styles.controlButton}
// // //               onPress={() => rotateText(45)}
// // //             >
// // //               <Ionicons name="sync" size={22} color="#fff" />
// // //               <Text style={styles.controlButtonText}>Rotate</Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity 
// // //               style={styles.controlButton}
// // //               onPress={() => setShowFontPicker(true)}
// // //             >
// // //               <Text style={styles.fontButtonText}>Aa</Text>
// // //               <Text style={styles.controlButtonText}>Font</Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity 
// // //               style={[styles.controlButton, styles.deleteButton]}
// // //               onPress={deleteActiveText}
// // //             >
// // //               <Ionicons name="trash-outline" size={22} color="#fff" />
// // //               <Text style={styles.controlButtonText}>Delete</Text>
// // //             </TouchableOpacity>
// // //           </ScrollView>
// // //         </View>
// // //       )}
// // //     </SafeAreaView>
// // //   );
// // // }

// // // /* -------- STYLES -------- */
// // // const styles = StyleSheet.create({
// // //   container: { 
// // //     flex: 1, 
// // //     backgroundColor: "#000" 
// // //   },
  
// // //   // Header Styles
// // //   header: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     paddingHorizontal: 16,
// // //     paddingTop: 8,
// // //     paddingBottom: 12,
// // //     backgroundColor: "#000",
// // //     borderBottomWidth: 0.5,
// // //     borderBottomColor: "#333",
// // //   },
// // //   headerButton: {
// // //     padding: 8,
// // //     minWidth: 44,
// // //     alignItems: "center",
// // //   },
// // //   headerCenter: {
// // //     alignItems: "center",
// // //   },
// // //   headerTime: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //     marginBottom: 2,
// // //   },
// // //   headerTitle: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "700",
// // //   },
  
// // //   // Canvas Styles
// // //   canvasContainer: {
// // //     flex: 1,
// // //     backgroundColor: "#000",
// // //   },
// // //   canvas: {
// // //     flex: 1,
// // //     backgroundColor: "#000",
// // //   },
// // //   image: {
// // //     width: STORY_WIDTH,
// // //     height: STORY_HEIGHT,
// // //     alignSelf: "center",
// // //   },
  
// // //   placeholderContainer: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: "#111",
// // //   },
// // //   placeholderContent: {
// // //     alignItems: "center",
// // //     gap: 20,
// // //   },
// // //   placeholderText: {
// // //     color: "#fff",
// // //     fontSize: 18,
// // //     fontWeight: "600",
// // //   },
  
// // //   // Text Styles
// // //   textContainer: {
// // //     position: "absolute",
// // //     maxWidth: STORY_WIDTH * 0.8,
// // //   },
// // //   textWrapper: {
// // //     padding: 8,
// // //   },
// // //   activeTextWrapper: {
// // //     backgroundColor: "rgba(255, 255, 255, 0.1)",
// // //   },
// // //   textElement: {
// // //     fontWeight: "700",
// // //     textShadowColor: "rgba(0, 0, 0, 0.8)",
// // //     textShadowOffset: { width: 1, height: 1 },
// // //     textShadowRadius: 4,
// // //   },
// // //   selectionBorder: {
// // //     position: "absolute",
// // //     top: -4,
// // //     left: -4,
// // //     right: -4,
// // //     bottom: -4,
// // //     borderWidth: 2,
// // //     borderColor: "#4F7CFF",
// // //     borderRadius: 6,
// // //     borderStyle: "dashed",
// // //   },
// // //   rotationHandle: {
// // //     position: "absolute",
// // //     top: -30,
// // //     right: -10,
// // //     width: 30,
// // //     height: 30,
// // //     borderRadius: 15,
// // //     backgroundColor: "#4F7CFF",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
  
// // //   // Keyboard Styles
// // //   keyboardContainer: {
// // //     position: "absolute",
// // //     bottom: 0,
// // //     left: 0,
// // //     right: 0,
// // //     backgroundColor: "#1A1A1A",
// // //     borderTopLeftRadius: 20,
// // //     borderTopRightRadius: 20,
// // //     paddingBottom: Platform.OS === "ios" ? 20 : 0,
// // //   },
// // //   inputHeader: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 12,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: "#333",
// // //   },
// // //   inputHeaderText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //     flex: 1,
// // //   },
// // //   inputCloseButton: {
// // //     padding: 4,
// // //   },
  
// // //   fontSelection: {
// // //     maxHeight: 50,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: "#333",
// // //   },
// // //   fontSelectionContent: {
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 10,
// // //     gap: 12,
// // //   },
// // //   fontOption: {
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 8,
// // //     borderRadius: 20,
// // //     backgroundColor: "#333",
// // //   },
// // //   selectedFontOption: {
// // //     backgroundColor: "#4F7CFF",
// // //   },
// // //   fontOptionText: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //   },
// // //   selectedFontOptionText: {
// // //     color: "#fff",
// // //   },
  
// // //   customKeyboard: {
// // //     padding: 10,
// // //   },
// // //   keyboardRow: {
// // //     flexDirection: "row",
// // //     justifyContent: "center",
// // //     marginBottom: 8,
// // //   },
// // //   keyButton: {
// // //     width: (width - 40) / 10,
// // //     height: 45,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: "#333",
// // //     borderRadius: 8,
// // //     marginHorizontal: 2,
// // //   },
// // //   keyButtonText: {
// // //     color: "#fff",
// // //     fontSize: 18,
// // //     fontWeight: "600",
// // //   },
// // //   keyboardBottomRow: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginTop: 8,
// // //     paddingHorizontal: 10,
// // //   },
// // //   specialKey: {
// // //     height: 45,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: "#333",
// // //     borderRadius: 8,
// // //   },
// // //   specialKeyText: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //   },
// // //   numberKey: {
// // //     width: width * 0.2,
// // //   },
// // //   spaceKey: {
// // //     flex: 1,
// // //     marginHorizontal: 10,
// // //   },
// // //   returnKey: {
// // //     width: width * 0.3,
// // //   },
// // //   backspaceKey: {
// // //     width: 60,
// // //   },
  
// // //   // Bottom Toolbar
// // //   bottomToolbar: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 12,
// // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // //     borderTopWidth: 0.5,
// // //     borderTopColor: "#333",
// // //   },
// // //   toolbarButton: {
// // //     flex: 1,
// // //     alignItems: "center",
// // //     paddingVertical: 8,
// // //   },
// // //   toolbarButtonIcon: {
// // //     color: "#fff",
// // //     fontSize: 24,
// // //     fontWeight: "700",
// // //     marginBottom: 4,
// // //   },
// // //   toolbarButtonText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //   },
// // //   postButton: {
// // //     flex: 0,
// // //     flexDirection: "row",
// // //     backgroundColor: "#4F7CFF",
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 10,
// // //     borderRadius: 25,
// // //     gap: 8,
// // //   },
// // //   postButtonText: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     fontWeight: "700",
// // //   },
  
// // //   // Active Controls
// // //   activeControls: {
// // //     position: "absolute",
// // //     bottom: 70,
// // //     left: 0,
// // //     right: 0,
// // //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// // //     paddingVertical: 12,
// // //     borderTopWidth: 0.5,
// // //     borderTopColor: "#333",
// // //   },
// // //   activeControlsContent: {
// // //     paddingHorizontal: 16,
// // //     gap: 20,
// // //     alignItems: "center",
// // //   },
// // //   controlButton: {
// // //     alignItems: "center",
// // //     gap: 4,
// // //     minWidth: 50,
// // //   },
// // //   controlButtonText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //   },
// // //   colorPreview: {
// // //     width: 30,
// // //     height: 30,
// // //     borderRadius: 15,
// // //     borderWidth: 2,
// // //     borderColor: "#fff",
// // //   },
// // //   fontButtonText: {
// // //     color: "#fff",
// // //     fontSize: 24,
// // //     fontWeight: "700",
// // //   },
// // //   sizeControl: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 10,
// // //     backgroundColor: "#333",
// // //     borderRadius: 20,
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 8,
// // //   },
// // //   sizeButton: {
// // //     width: 28,
// // //     height: 28,
// // //     borderRadius: 14,
// // //     backgroundColor: "#444",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   sizeText: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //     minWidth: 30,
// // //     textAlign: "center",
// // //   },
  
// // //   // Modal Styles
// // //   modalOverlay: {
// // //     flex: 1,
// // //     backgroundColor: "rgba(0, 0, 0, 0.7)",
// // //     justifyContent: "flex-end",
// // //   },
  
// // //   // Color Picker Modal
// // //   colorPickerModal: {
// // //     backgroundColor: "#1A1A1A",
// // //     borderTopLeftRadius: 20,
// // //     borderTopRightRadius: 20,
// // //     paddingBottom: 20,
// // //   },
// // //   modalHeader: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 16,
// // //     borderBottomWidth: 0.5,
// // //     borderBottomColor: "#333",
// // //   },
// // //   modalTitle: {
// // //     color: "#fff",
// // //     fontSize: 18,
// // //     fontWeight: "700",
// // //   },
// // //   colorGrid: {
// // //     flexDirection: "row",
// // //     flexWrap: "wrap",
// // //     justifyContent: "center",
// // //     padding: 20,
// // //     gap: 12,
// // //   },
// // //   colorOption: {
// // //     width: 44,
// // //     height: 44,
// // //     borderRadius: 22,
// // //     borderWidth: 2,
// // //     borderColor: "transparent",
// // //   },
// // //   selectedColor: {
// // //     borderColor: "#4F7CFF",
// // //     transform: [{ scale: 1.1 }],
// // //   },
  
// // //   // Modal Keyboard
// // //   modalKeyboard: {
// // //     padding: 10,
// // //     borderTopWidth: 1,
// // //     borderTopColor: "#333",
// // //   },
// // //   modalKeyboardRow: {
// // //     flexDirection: "row",
// // //     justifyContent: "center",
// // //     marginBottom: 8,
// // //   },
// // //   modalKeyButton: {
// // //     width: (width - 40) / 10,
// // //     height: 40,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: "#333",
// // //     borderRadius: 6,
// // //     marginHorizontal: 1,
// // //   },
// // //   modalKeyButtonText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //   },
// // //   modalKeyboardBottom: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     marginTop: 8,
// // //     paddingHorizontal: 10,
// // //   },
// // //   modalSpecialKey: {
// // //     height: 40,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: "#333",
// // //     borderRadius: 6,
// // //     paddingHorizontal: 20,
// // //   },
// // //   modalSpecialKeyText: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //   },
  
// // //   // Alignment Modal
// // //   alignmentModal: {
// // //     backgroundColor: "#1A1A1A",
// // //     borderTopLeftRadius: 20,
// // //     borderTopRightRadius: 20,
// // //     paddingBottom: 40,
// // //   },
// // //   alignmentOptions: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-around",
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 30,
// // //   },
// // //   alignmentButton: {
// // //     alignItems: "center",
// // //     gap: 8,
// // //   },
// // //   alignmentButtonText: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //   },
  
// // //   // Exit Modal
// // //   exitModal: {
// // //     backgroundColor: "#262626",
// // //     borderRadius: 15,
// // //     padding: 20,
// // //     width: width * 0.85,
// // //     alignSelf: "center",
// // //   },
// // //   exitModalTitle: {
// // //     color: "#fff",
// // //     fontSize: 20,
// // //     fontWeight: "700",
// // //     textAlign: "center",
// // //     marginBottom: 20,
// // //   },
// // //   exitModalButton: {
// // //     paddingVertical: 15,
// // //     borderRadius: 10,
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },
// // //   deleteButton: {
// // //     backgroundColor: "#FF3B30",
// // //   },
// // //   deleteButtonText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "700",
// // //   },
// // //   keepEditingButton: {
// // //     backgroundColor: "#333",
// // //   },
// // //   keepEditingButtonText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //   },
// // // });



// // import React, { useEffect, useState, useRef, useCallback } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   TextInput,
// //   StatusBar,
// //   Animated,
// //   PanResponder,
// //   Pressable,
// //   Alert,
// //   Dimensions,
// //   ScrollView,
// //   Modal,
// //   FlatList,
// //   ActivityIndicator,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import * as ImagePicker from "expo-image-picker";
// // import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

// // const { width, height } = Dimensions.get("window");
// // const ASPECT_RATIO = 9/16;
// // const STORY_WIDTH = width;
// // const STORY_HEIGHT = width / ASPECT_RATIO;

// // // Color palette from your design
// // const COLORS = [
// //   "#FFFFFF", "#FF5C5C", "#FF9F00", "#FFD700", "#32CD32", "#1E90FF", 
// //   "#9370DB", "#FF69B4", "#00CED1", "#FF4500", "#9ACD32", "#BA55D3",
// //   "#000000", "#696969", "#D3D3D3"
// // ];

// // // Font styles
// // const FONTS = [
// //   { name: "Classic", value: "System" },
// //   { name: "Modern", value: "System", weight: "bold" },
// //   { name: "Elegant", value: "System", weight: "300" },
// //   { name: "Fun", value: "System", style: "italic" },
// // ];

// // // Keyboard layout
// // const KEYBOARD_ROWS = [
// //   ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
// //   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
// //   ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
// // ];

// // export default function BlipsCreationScreen({ navigation }) {
// //   const [image, setImage] = useState(null);
// //   const [texts, setTexts] = useState([]);
// //   const [activeId, setActiveId] = useState(null);
// //   const [showInput, setShowInput] = useState(false);
// //   const [inputValue, setInputValue] = useState("");
// //   const [showColorPicker, setShowColorPicker] = useState(false);
// //   const [showFontPicker, setShowFontPicker] = useState(false);
// //   const [showTextAlignment, setShowTextAlignment] = useState(false);
// //   const [showKeyboard, setShowKeyboard] = useState(false);
// //   const [selectedFont, setSelectedFont] = useState("Classic");
// //   const [isPosting, setIsPosting] = useState(false);
// //   const [showExitModal, setShowExitModal] = useState(false);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
  
// //   const textInputRef = useRef(null);

// //   useEffect(() => {
// //     (async () => {
// //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
// //     })();
// //   }, []);

// //   /* -------- IMAGE PICKER -------- */
// //   const openGallery = async () => {
// //     try {
// //       const res = await ImagePicker.launchImageLibraryAsync({
// //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //         quality: 1,
// //         allowsEditing: true,
// //         aspect: [9, 16],
// //       });
      
// //       if (!res.canceled && res.assets[0].uri) {
// //         setImage(res.assets[0].uri);
// //         setTexts([]);
// //         setActiveId(null);
// //         setShowInput(false);
// //       }
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to pick image");
// //     }
// //   };

// //   const openCamera = async () => {
// //     try {
// //       const res = await ImagePicker.launchCameraAsync({
// //         quality: 1,
// //         allowsEditing: true,
// //         aspect: [9, 16],
// //       });
      
// //       if (!res.canceled && res.assets[0].uri) {
// //         setImage(res.assets[0].uri);
// //         setTexts([]);
// //         setActiveId(null);
// //         setShowInput(false);
// //       }
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to take photo");
// //     }
// //   };

// //   /* -------- ADD TEXT -------- */
// //   const addText = () => {
// //     if (!image) {
// //       Alert.alert("Select Image", "Please select an image first");
// //       return;
// //     }

// //     const id = Date.now().toString();
// //     const pan = new Animated.ValueXY({ 
// //       x: STORY_WIDTH / 2 - 60, 
// //       y: STORY_HEIGHT / 2 - 25 
// //     });

// //     const panResponder = PanResponder.create({
// //       onStartShouldSetPanResponder: () => true,
// //       onPanResponderGrant: () => {
// //         setActiveId(id);
// //         setShowInput(false);
// //         pan.extractOffset();
// //       },
// //       onPanResponderMove: Animated.event(
// //         [null, { dx: pan.x, dy: pan.y }],
// //         { useNativeDriver: false }
// //       ),
// //       onPanResponderRelease: () => {
// //         pan.flattenOffset();
// //       },
// //     });

// //     const newText = {
// //       id,
// //       text: "@Shusshi Clan......",
// //       size: 32,
// //       color: "#FFFFFF",
// //       align: "center",
// //       font: "Classic",
// //       fontWeight: "normal",
// //       fontStyle: "normal",
// //       rotation: 0,
// //       pan,
// //       panResponder,
// //     };

// //     setTexts((prev) => [...prev, newText]);
// //     setActiveId(id);
// //     setInputValue("@Shusshi Clan......");
// //     setShowInput(true);
// //     setShowKeyboard(true);
// //   };

// //   const updateText = useCallback((id, key, value) => {
// //     setTexts((prev) =>
// //       prev.map((text) => (text.id === id ? { ...text, [key]: value } : text))
// //     );
// //   }, []);

// //   /* -------- DELETE TEXT FUNCTIONS -------- */
// //   const showDeleteConfirmation = () => {
// //     if (!activeId) return;
// //     setShowDeleteModal(true);
// //   };

// //   const deleteActiveText = () => {
// //     if (!activeId) return;
    
// //     setTexts((prev) => prev.filter((text) => text.id !== activeId));
// //     setActiveId(null);
// //     setShowInput(false);
// //     setInputValue("");
// //     setShowKeyboard(false);
// //     setShowDeleteModal(false);
// //   };

// //   const deleteAllTexts = () => {
// //     setTexts([]);
// //     setActiveId(null);
// //     setShowInput(false);
// //     setInputValue("");
// //     setShowKeyboard(false);
// //   };

// //   const deleteAllBlips = () => {
// //     setShowExitModal(false);
// //     deleteAllTexts();
// //   };

// //   const rotateText = (degrees) => {
// //     if (!activeId) return;
// //     const activeText = texts.find((t) => t.id === activeId);
// //     if (!activeText) return;
    
// //     updateText(activeId, "rotation", (activeText.rotation + degrees) % 360);
// //   };

// //   /* -------- KEYBOARD FUNCTIONS -------- */
// //   const handleKeyPress = (key) => {
// //     if (activeId) {
// //       const newText = inputValue + key;
// //       setInputValue(newText);
// //       updateText(activeId, "text", newText);
// //     }
// //   };

// //   const handleBackspace = () => {
// //     if (activeId && inputValue.length > 0) {
// //       const newText = inputValue.slice(0, -1);
// //       setInputValue(newText);
// //       updateText(activeId, "text", newText);
// //     }
// //   };

// //   const handleSpace = () => {
// //     if (activeId) {
// //       const newText = inputValue + " ";
// //       setInputValue(newText);
// //       updateText(activeId, "text", newText);
// //     }
// //   };

// //   const handleReturn = () => {
// //     if (activeId) {
// //       const newText = inputValue + "\n";
// //       setInputValue(newText);
// //       updateText(activeId, "text", newText);
// //     }
// //   };

// //   /* -------- POST FUNCTIONALITY -------- */
// //   const handlePost = async () => {
// //     if (!image) {
// //       Alert.alert("Select Image", "Please select an image first");
// //       return;
// //     }

// //     setIsPosting(true);
    
// //     try {
// //       // Simulate posting process
// //       await new Promise(resolve => setTimeout(resolve, 2000));
      
// //       Alert.alert(
// //         "Posted!",
// //         "Your blip has been posted successfully.",
// //         [
// //           { 
// //             text: "View Profile", 
// //             onPress: () => navigation.navigate("Profile") 
// //           },
// //           { text: "OK", onPress: () => setIsPosting(false) }
// //         ]
// //       );
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to post. Please try again.");
// //       setIsPosting(false);
// //     }
// //   };

// //   /* -------- SHARE FUNCTIONALITY -------- */
// //   const handleShare = async () => {
// //     if (!image) {
// //       Alert.alert("Select Image", "Please select an image first");
// //       return;
// //     }

// //     Alert.alert(
// //       "Share Blips",
// //       "Your blip has been shared!",
// //       [{ text: "OK" }]
// //     );
// //   };

// //   const activeText = texts.find((t) => t.id === activeId);

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <StatusBar barStyle="light-content" backgroundColor="#000" />

// //       {/* HEADER - From Screen V11 Blips Main Broad Creation */}
// //       <View style={styles.header}>
// //         <TouchableOpacity 
// //           style={styles.headerButton}
// //           onPress={() => setShowExitModal(true)}
// //         >
// //           <Ionicons name="chevron-back" size={28} color="#fff" />
// //         </TouchableOpacity>
        
// //         <View style={styles.headerCenter}>
// //           <Text style={styles.headerTime}>9:41</Text>
// //           <Text style={styles.headerTitle}>Create Blips</Text>
// //         </View>
        
// //         <TouchableOpacity 
// //           style={styles.headerButton}
// //           onPress={() => {
// //             // Options menu
// //           }}
// //         >
// //           <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
// //         </TouchableOpacity>
// //       </View>

// //       {/* CANVAS AREA */}
// //       <View style={styles.canvasContainer}>
// //         <Pressable
// //           style={styles.canvas}
// //           onPress={() => {
// //             setActiveId(null);
// //             setShowInput(false);
// //             setShowColorPicker(false);
// //             setShowFontPicker(false);
// //             setShowTextAlignment(false);
// //             setShowKeyboard(false);
// //           }}
// //         >
// //           {image ? (
// //             <>
// //               <Image 
// //                 source={{ uri: image }} 
// //                 style={styles.image} 
// //                 resizeMode="cover"
// //               />
              
// //               {/* Render texts */}
// //               {texts.map((item) => (
// //                 <Animated.View
// //                   key={item.id}
// //                   style={[
// //                     styles.textContainer,
// //                     {
// //                       transform: [
// //                         ...item.pan.getTranslateTransform(),
// //                         { rotate: `${item.rotation}deg` }
// //                       ],
// //                       zIndex: item.id === activeId ? 1000 : texts.indexOf(item) + 1,
// //                     },
// //                   ]}
// //                   {...item.panResponder.panHandlers}
// //                 >
// //                   <TouchableOpacity
// //                     activeOpacity={0.8}
// //                     onPress={() => {
// //                       setActiveId(item.id);
// //                       setInputValue(item.text);
// //                       setShowInput(true);
// //                       setShowKeyboard(true);
// //                     }}
// //                     style={[
// //                       styles.textWrapper,
// //                       activeId === item.id && styles.activeTextWrapper,
// //                     ]}
// //                   >
// //                     <Text
// //                       style={[
// //                         styles.textElement,
// //                         {
// //                           color: item.color,
// //                           fontSize: item.size,
// //                           textAlign: item.align,
// //                           fontWeight: item.fontWeight,
// //                           fontStyle: item.fontStyle,
// //                         },
// //                       ]}
// //                       numberOfLines={10}
// //                     >
// //                       {item.text}
// //                     </Text>
                    
// //                     {activeId === item.id && (
// //                       <View style={styles.selectionBorder}>
// //                         {/* Delete button on selection */}
// //                         <TouchableOpacity 
// //                           style={styles.floatingDeleteButton}
// //                           onPress={showDeleteConfirmation}
// //                         >
// //                           <Ionicons name="close-circle" size={24} color="#FF5C5C" />
// //                         </TouchableOpacity>
                        
// //                         <View style={styles.rotationHandle}>
// //                           <Ionicons name="sync" size={16} color="#fff" />
// //                         </View>
// //                       </View>
// //                     )}
// //                   </TouchableOpacity>
// //                 </Animated.View>
// //               ))}
// //             </>
// //           ) : (
// //             <TouchableOpacity 
// //               style={styles.placeholderContainer}
// //               onPress={openGallery}
// //             >
// //               <View style={styles.placeholderContent}>
// //                 <Ionicons name="camera-outline" size={80} color="#666" />
// //                 <Text style={styles.placeholderText}>Tap to add photo</Text>
// //               </View>
// //             </TouchableOpacity>
// //           )}
// //         </Pressable>
// //       </View>

// //       {/* TEXT INPUT WITH KEYBOARD - From Screen V11 Blips Text Creation */}
// //       {showKeyboard && (
// //         <KeyboardAvoidingView 
// //           behavior={Platform.OS === "ios" ? "padding" : "height"}
// //           style={styles.keyboardContainer}
// //         >
// //           <View style={styles.inputHeader}>
// //             <View style={styles.inputHeaderLeft}>
// //               <TouchableOpacity 
// //                 style={styles.deleteTextButton}
// //                 onPress={showDeleteConfirmation}
// //               >
// //                 <Ionicons name="trash-outline" size={20} color="#FF5C5C" />
// //                 <Text style={styles.deleteTextButtonText}>Delete</Text>
// //               </TouchableOpacity>
// //             </View>
            
// //             <Text style={styles.inputHeaderText}>
// //               {activeText ? activeText.text : "Type your text..."}
// //             </Text>
            
// //             <TouchableOpacity 
// //               style={styles.inputCloseButton}
// //               onPress={() => setShowKeyboard(false)}
// //             >
// //               <Ionicons name="close" size={24} color="#fff" />
// //             </TouchableOpacity>
// //           </View>

// //           {/* Font Selection - From Screen V11 Blips Text Creation */}
// //           <ScrollView 
// //             horizontal 
// //             showsHorizontalScrollIndicator={false}
// //             style={styles.fontSelection}
// //             contentContainerStyle={styles.fontSelectionContent}
// //           >
// //             {FONTS.map((font) => (
// //               <TouchableOpacity
// //                 key={font.name}
// //                 style={[
// //                   styles.fontOption,
// //                   selectedFont === font.name && styles.selectedFontOption,
// //                 ]}
// //                 onPress={() => {
// //                   setSelectedFont(font.name);
// //                   if (activeText) {
// //                     updateText(activeId, "font", font.name);
// //                     updateText(activeId, "fontWeight", font.weight || "normal");
// //                     updateText(activeId, "fontStyle", font.style || "normal");
// //                   }
// //                 }}
// //               >
// //                 <Text style={[
// //                   styles.fontOptionText,
// //                   selectedFont === font.name && styles.selectedFontOptionText,
// //                 ]}>
// //                   {font.name}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </ScrollView>

// //           {/* Custom Keyboard - From your designs */}
// //           <View style={styles.customKeyboard}>
// //             {KEYBOARD_ROWS.map((row, rowIndex) => (
// //               <View key={rowIndex} style={styles.keyboardRow}>
// //                 {row.map((key) => (
// //                   <TouchableOpacity
// //                     key={key}
// //                     style={styles.keyButton}
// //                     onPress={() => handleKeyPress(key)}
// //                   >
// //                     <Text style={styles.keyButtonText}>{key}</Text>
// //                   </TouchableOpacity>
// //                 ))}
// //               </View>
// //             ))}
            
// //             {/* Bottom row with special keys */}
// //             <View style={styles.keyboardBottomRow}>
// //               <TouchableOpacity 
// //                 style={[styles.specialKey, styles.numberKey]}
// //                 onPress={() => {/* Switch to numbers */}}
// //               >
// //                 <Text style={styles.specialKeyText}>123</Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity 
// //                 style={[styles.specialKey, styles.spaceKey]}
// //                 onPress={handleSpace}
// //               >
// //                 <Text style={styles.specialKeyText}>space</Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity 
// //                 style={[styles.specialKey, styles.returnKey]}
// //                 onPress={handleReturn}
// //               >
// //                 <Text style={styles.specialKeyText}>return</Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity 
// //                 style={[styles.specialKey, styles.backspaceKey]}
// //                 onPress={handleBackspace}
// //               >
// //                 <Ionicons name="backspace-outline" size={20} color="#fff" />
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </KeyboardAvoidingView>
// //       )}

// //       {/* BOTTOM TOOLBAR - From Screen V11 Blips Main Broad Creation */}
// //       <View style={styles.bottomToolbar}>
// //         <TouchableOpacity 
// //           style={styles.toolbarButton}
// //           onPress={openGallery}
// //         >
// //           <Ionicons name="image-outline" size={24} color="#fff" />
// //           <Text style={styles.toolbarButtonText}>Photo</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity 
// //           style={styles.toolbarButton}
// //           onPress={addText}
// //           disabled={!image}
// //         >
// //           <Text style={styles.toolbarButtonIcon}>Aa</Text>
// //           <Text style={styles.toolbarButtonText}>Text</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity 
// //           style={styles.toolbarButton}
// //           onPress={handleShare}
// //           disabled={!image}
// //         >
// //           <Ionicons name="share-outline" size={24} color="#fff" />
// //           <Text style={styles.toolbarButtonText}>Share Blips</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity 
// //           style={[styles.toolbarButton, styles.postButton]}
// //           onPress={handlePost}
// //           disabled={!image || isPosting}
// //         >
// //           {isPosting ? (
// //             <ActivityIndicator size="small" color="#fff" />
// //           ) : (
// //             <>
// //               <Ionicons name="paper-plane-outline" size={20} color="#fff" />
// //               <Text style={styles.postButtonText}>Post</Text>
// //             </>
// //           )}
// //         </TouchableOpacity>
// //       </View>

// //       {/* COLOR PICKER MODAL - From Screen V11 Blips Text (Color) Creation */}
// //       <Modal
// //         visible={showColorPicker}
// //         transparent
// //         animationType="slide"
// //         onRequestClose={() => setShowColorPicker(false)}
// //       >
// //         <Pressable 
// //           style={styles.modalOverlay} 
// //           onPress={() => setShowColorPicker(false)}
// //         >
// //           <View style={styles.colorPickerModal}>
// //             <View style={styles.modalHeader}>
// //               <Text style={styles.modalTitle}>Text Color</Text>
// //               <TouchableOpacity onPress={() => setShowColorPicker(false)}>
// //                 <Ionicons name="close" size={24} color="#fff" />
// //               </TouchableOpacity>
// //             </View>
            
// //             <View style={styles.colorGrid}>
// //               {COLORS.map((color) => (
// //                 <TouchableOpacity
// //                   key={color}
// //                   style={[
// //                     styles.colorOption,
// //                     { backgroundColor: color },
// //                     activeText?.color === color && styles.selectedColor,
// //                   ]}
// //                   onPress={() => {
// //                     if (activeText) updateText(activeId, "color", color);
// //                     setShowColorPicker(false);
// //                   }}
// //                 />
// //               ))}
// //             </View>
            
// //             {/* Keyboard in modal */}
// //             <View style={styles.modalKeyboard}>
// //               <View style={styles.modalKeyboardRow}>
// //                 {KEYBOARD_ROWS[0].map((key) => (
// //                   <TouchableOpacity
// //                     key={key}
// //                     style={styles.modalKeyButton}
// //                     onPress={() => handleKeyPress(key)}
// //                   >
// //                     <Text style={styles.modalKeyButtonText}>{key}</Text>
// //                   </TouchableOpacity>
// //                 ))}
// //               </View>
              
// //               <View style={styles.modalKeyboardBottom}>
// //                 <TouchableOpacity style={styles.modalSpecialKey}>
// //                   <Text style={styles.modalSpecialKeyText}>123</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity style={styles.modalSpecialKey}>
// //                   <Text style={styles.modalSpecialKeyText}>space</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity style={styles.modalSpecialKey}>
// //                   <Text style={styles.modalSpecialKeyText}>return</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //           </View>
// //         </Pressable>
// //       </Modal>

// //       {/* TEXT ALIGNMENT MODAL - From Screen V11 Blips Text (Text Alignment) Creation */}
// //       <Modal
// //         visible={showTextAlignment}
// //         transparent
// //         animationType="slide"
// //         onRequestClose={() => setShowTextAlignment(false)}
// //       >
// //         <Pressable 
// //           style={styles.modalOverlay} 
// //           onPress={() => setShowTextAlignment(false)}
// //         >
// //           <View style={styles.alignmentModal}>
// //             <View style={styles.modalHeader}>
// //               <Text style={styles.modalTitle}>Text Alignment</Text>
// //               <TouchableOpacity onPress={() => setShowTextAlignment(false)}>
// //                 <Ionicons name="close" size={24} color="#fff" />
// //               </TouchableOpacity>
// //             </View>
            
// //             <View style={styles.alignmentOptions}>
// //               <TouchableOpacity 
// //                 style={styles.alignmentButton}
// //                 onPress={() => {
// //                   if (activeText) updateText(activeId, "align", "left");
// //                   setShowTextAlignment(false);
// //                 }}
// //               >
// //                 <Ionicons name="align-left" size={28} color="#fff" />
// //                 <Text style={styles.alignmentButtonText}>Left</Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity 
// //                 style={styles.alignmentButton}
// //                 onPress={() => {
// //                   if (activeText) updateText(activeId, "align", "center");
// //                   setShowTextAlignment(false);
// //                 }}
// //               >
// //                 <Ionicons name="align-center" size={28} color="#fff" />
// //                 <Text style={styles.alignmentButtonText}>Center</Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity 
// //                 style={styles.alignmentButton}
// //                 onPress={() => {
// //                   if (activeText) updateText(activeId, "align", "right");
// //                   setShowTextAlignment(false);
// //                 }}
// //               >
// //                 <Ionicons name="align-right" size={28} color="#fff" />
// //                 <Text style={styles.alignmentButtonText}>Right</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </Pressable>
// //       </Modal>

// //       {/* DELETE CONFIRMATION MODAL */}
// //       <Modal
// //         visible={showDeleteModal}
// //         transparent
// //         animationType="fade"
// //         onRequestClose={() => setShowDeleteModal(false)}
// //       >
// //         <Pressable 
// //           style={styles.modalOverlay} 
// //           onPress={() => setShowDeleteModal(false)}
// //         >
// //           <View style={styles.deleteModal}>
// //             <Text style={styles.deleteModalTitle}>Delete Text?</Text>
// //             <Text style={styles.deleteModalMessage}>
// //               Are you sure you want to delete this text? This action cannot be undone.
// //             </Text>
            
// //             <View style={styles.deleteModalButtons}>
// //               <TouchableOpacity 
// //                 style={[styles.deleteModalButton, styles.cancelDeleteButton]}
// //                 onPress={() => setShowDeleteModal(false)}
// //               >
// //                 <Text style={styles.cancelDeleteButtonText}>Cancel</Text>
// //               </TouchableOpacity>
              
// //               <TouchableOpacity 
// //                 style={[styles.deleteModalButton, styles.confirmDeleteButton]}
// //                 onPress={deleteActiveText}
// //               >
// //                 <Text style={styles.confirmDeleteButtonText}>Delete</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </Pressable>
// //       </Modal>

// //       {/* EXIT MODAL - From Screen V11 Blips (Cancel) Creation */}
// //       <Modal
// //         visible={showExitModal}
// //         transparent
// //         animationType="fade"
// //         onRequestClose={() => setShowExitModal(false)}
// //       >
// //         <Pressable 
// //           style={styles.modalOverlay} 
// //           onPress={() => setShowExitModal(false)}
// //         >
// //           <View style={styles.exitModal}>
// //             <Text style={styles.exitModalTitle}>Exit Editing?</Text>
            
// //             <TouchableOpacity 
// //               style={[styles.exitModalButton, styles.deleteAllButton]}
// //               onPress={deleteAllBlips}
// //             >
// //               <Ionicons name="trash-outline" size={20} color="#fff" />
// //               <Text style={styles.deleteAllButtonText}>Delete All Blips</Text>
// //             </TouchableOpacity>
            
// //             <TouchableOpacity 
// //               style={[styles.exitModalButton, styles.keepEditingButton]}
// //               onPress={() => setShowExitModal(false)}
// //             >
// //               <Text style={styles.keepEditingButtonText}>Keep Editing</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </Pressable>
// //       </Modal>

// //       {/* ACTIVE TEXT CONTROLS */}
// //       {activeText && !showKeyboard && (
// //         <View style={styles.activeControls}>
// //           <ScrollView 
// //             horizontal 
// //             showsHorizontalScrollIndicator={false}
// //             contentContainerStyle={styles.activeControlsContent}
// //           >
// //             <TouchableOpacity 
// //               style={styles.controlButton}
// //               onPress={() => setShowColorPicker(true)}
// //             >
// //               <View style={[styles.colorPreview, { backgroundColor: activeText.color }]} />
// //               <Text style={styles.controlButtonText}>Color</Text>
// //             </TouchableOpacity>

// //             <View style={styles.sizeControl}>
// //               <TouchableOpacity
// //                 style={styles.sizeButton}
// //                 onPress={() => updateText(activeId, "size", Math.max(12, activeText.size - 2))}
// //               >
// //                 <Ionicons name="remove" size={18} color="#fff" />
// //               </TouchableOpacity>
// //               <Text style={styles.sizeText}>{activeText.size}</Text>
// //               <TouchableOpacity
// //                 style={styles.sizeButton}
// //                 onPress={() => updateText(activeId, "size", Math.min(72, activeText.size + 2))}
// //               >
// //                 <Ionicons name="add" size={18} color="#fff" />
// //               </TouchableOpacity>
// //             </View>

// //             <TouchableOpacity 
// //               style={styles.controlButton}
// //               onPress={() => setShowTextAlignment(true)}
// //             >
// //               <Ionicons 
// //                 name={
// //                   activeText.align === "left" ? "align-left" :
// //                   activeText.align === "center" ? "align-center" :
// //                   "align-right"
// //                 } 
// //                 size={22} 
// //                 color="#fff" 
// //               />
// //               <Text style={styles.controlButtonText}>Align</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity 
// //               style={styles.controlButton}
// //               onPress={() => rotateText(45)}
// //             >
// //               <Ionicons name="sync" size={22} color="#fff" />
// //               <Text style={styles.controlButtonText}>Rotate</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity 
// //               style={styles.controlButton}
// //               onPress={() => setShowFontPicker(true)}
// //             >
// //               <Text style={styles.fontButtonText}>Aa</Text>
// //               <Text style={styles.controlButtonText}>Font</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity 
// //               style={[styles.controlButton, styles.deleteControlButton]}
// //               onPress={showDeleteConfirmation}
// //             >
// //               <Ionicons name="trash-outline" size={22} color="#FF5C5C" />
// //               <Text style={[styles.controlButtonText, { color: '#FF5C5C' }]}>Delete</Text>
// //             </TouchableOpacity>
// //           </ScrollView>
// //         </View>
// //       )}
// //     </SafeAreaView>
// //   );
// // }

// // /* -------- STYLES -------- */
// // const styles = StyleSheet.create({
// //   container: { 
// //     flex: 1, 
// //     backgroundColor: "#000" 
// //   },
  
// //   // Header Styles
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 16,
// //     paddingTop: 8,
// //     paddingBottom: 12,
// //     backgroundColor: "#000",
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: "#333",
// //   },
// //   headerButton: {
// //     padding: 8,
// //     minWidth: 44,
// //     alignItems: "center",
// //   },
// //   headerCenter: {
// //     alignItems: "center",
// //   },
// //   headerTime: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "600",
// //     marginBottom: 2,
// //   },
// //   headerTitle: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "700",
// //   },
  
// //   // Canvas Styles
// //   canvasContainer: {
// //     flex: 1,
// //     backgroundColor: "#000",
// //   },
// //   canvas: {
// //     flex: 1,
// //     backgroundColor: "#000",
// //   },
// //   image: {
// //     width: STORY_WIDTH,
// //     height: STORY_HEIGHT,
// //     alignSelf: "center",
// //   },
  
// //   placeholderContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#111",
// //   },
// //   placeholderContent: {
// //     alignItems: "center",
// //     gap: 20,
// //   },
// //   placeholderText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
  
// //   // Text Styles with Delete Button
// //   textContainer: {
// //     position: "absolute",
// //     maxWidth: STORY_WIDTH * 0.8,
// //   },
// //   textWrapper: {
// //     padding: 8,
// //   },
// //   activeTextWrapper: {
// //     backgroundColor: "rgba(255, 255, 255, 0.1)",
// //   },
// //   textElement: {
// //     fontWeight: "700",
// //     textShadowColor: "rgba(0, 0, 0, 0.8)",
// //     textShadowOffset: { width: 1, height: 1 },
// //     textShadowRadius: 4,
// //   },
// //   selectionBorder: {
// //     position: "absolute",
// //     top: -4,
// //     left: -4,
// //     right: -4,
// //     bottom: -4,
// //     borderWidth: 2,
// //     borderColor: "#4F7CFF",
// //     borderRadius: 6,
// //     borderStyle: "dashed",
// //   },
// //   floatingDeleteButton: {
// //     position: "absolute",
// //     top: -15,
// //     right: -15,
// //     width: 30,
// //     height: 30,
// //     borderRadius: 15,
// //     backgroundColor: "#000",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderWidth: 1,
// //     borderColor: "#333",
// //     zIndex: 1001,
// //   },
// //   rotationHandle: {
// //     position: "absolute",
// //     top: -30,
// //     right: -10,
// //     width: 30,
// //     height: 30,
// //     borderRadius: 15,
// //     backgroundColor: "#4F7CFF",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
  
// //   // Keyboard Styles with Delete Option
// //   keyboardContainer: {
// //     position: "absolute",
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: "#1A1A1A",
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     paddingBottom: Platform.OS === "ios" ? 20 : 0,
// //   },
// //   inputHeader: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#333",
// //   },
// //   inputHeaderLeft: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   deleteTextButton: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     backgroundColor: "rgba(255, 92, 92, 0.2)",
// //     borderRadius: 15,
// //     gap: 4,
// //   },
// //   deleteTextButtonText: {
// //     color: "#FF5C5C",
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
// //   inputHeaderText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //     flex: 1,
// //     textAlign: "center",
// //   },
// //   inputCloseButton: {
// //     padding: 4,
// //   },
  
// //   fontSelection: {
// //     maxHeight: 50,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#333",
// //   },
// //   fontSelectionContent: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 10,
// //     gap: 12,
// //   },
// //   fontOption: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     backgroundColor: "#333",
// //   },
// //   selectedFontOption: {
// //     backgroundColor: "#4F7CFF",
// //   },
// //   fontOptionText: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
// //   selectedFontOptionText: {
// //     color: "#fff",
// //   },
  
// //   customKeyboard: {
// //     padding: 10,
// //   },
// //   keyboardRow: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     marginBottom: 8,
// //   },
// //   keyButton: {
// //     width: (width - 40) / 10,
// //     height: 45,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#333",
// //     borderRadius: 8,
// //     marginHorizontal: 2,
// //   },
// //   keyButtonText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   keyboardBottomRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginTop: 8,
// //     paddingHorizontal: 10,
// //   },
// //   specialKey: {
// //     height: 45,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#333",
// //     borderRadius: 8,
// //   },
// //   specialKeyText: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
// //   numberKey: {
// //     width: width * 0.2,
// //   },
// //   spaceKey: {
// //     flex: 1,
// //     marginHorizontal: 10,
// //   },
// //   returnKey: {
// //     width: width * 0.3,
// //   },
// //   backspaceKey: {
// //     width: 60,
// //   },
  
// //   // Bottom Toolbar
// //   bottomToolbar: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// //     borderTopWidth: 0.5,
// //     borderTopColor: "#333",
// //   },
// //   toolbarButton: {
// //     flex: 1,
// //     alignItems: "center",
// //     paddingVertical: 8,
// //   },
// //   toolbarButtonIcon: {
// //     color: "#fff",
// //     fontSize: 24,
// //     fontWeight: "700",
// //     marginBottom: 4,
// //   },
// //   toolbarButtonText: {
// //     color: "#fff",
// //     fontSize: 12,
// //   },
// //   postButton: {
// //     flex: 0,
// //     flexDirection: "row",
// //     backgroundColor: "#4F7CFF",
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     borderRadius: 25,
// //     gap: 8,
// //   },
// //   postButtonText: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "700",
// //   },
  
// //   // Active Controls
// //   activeControls: {
// //     position: "absolute",
// //     bottom: 70,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: "rgba(0, 0, 0, 0.9)",
// //     paddingVertical: 12,
// //     borderTopWidth: 0.5,
// //     borderTopColor: "#333",
// //   },
// //   activeControlsContent: {
// //     paddingHorizontal: 16,
// //     gap: 20,
// //     alignItems: "center",
// //   },
// //   controlButton: {
// //     alignItems: "center",
// //     gap: 4,
// //     minWidth: 50,
// //   },
// //   controlButtonText: {
// //     color: "#fff",
// //     fontSize: 12,
// //   },
// //   colorPreview: {
// //     width: 30,
// //     height: 30,
// //     borderRadius: 15,
// //     borderWidth: 2,
// //     borderColor: "#fff",
// //   },
// //   fontButtonText: {
// //     color: "#fff",
// //     fontSize: 24,
// //     fontWeight: "700",
// //   },
// //   sizeControl: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 10,
// //     backgroundColor: "#333",
// //     borderRadius: 20,
// //     paddingHorizontal: 12,
// //     paddingVertical: 8,
// //   },
// //   sizeButton: {
// //     width: 28,
// //     height: 28,
// //     borderRadius: 14,
// //     backgroundColor: "#444",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   sizeText: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "600",
// //     minWidth: 30,
// //     textAlign: "center",
// //   },
// //   deleteControlButton: {
// //     backgroundColor: "rgba(255, 92, 92, 0.2)",
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     borderRadius: 15,
// //   },
  
// //   // Modal Styles
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: "rgba(0, 0, 0, 0.7)",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
  
// //   // Delete Confirmation Modal
// //   deleteModal: {
// //     backgroundColor: "#262626",
// //     borderRadius: 15,
// //     padding: 20,
// //     width: width * 0.85,
// //     maxWidth: 400,
// //   },
// //   deleteModalTitle: {
// //     color: "#fff",
// //     fontSize: 20,
// //     fontWeight: "700",
// //     textAlign: "center",
// //     marginBottom: 10,
// //   },
// //   deleteModalMessage: {
// //     color: "#999",
// //     fontSize: 14,
// //     textAlign: "center",
// //     marginBottom: 20,
// //     lineHeight: 20,
// //   },
// //   deleteModalButtons: {
// //     flexDirection: "row",
// //     gap: 10,
// //   },
// //   deleteModalButton: {
// //     flex: 1,
// //     paddingVertical: 14,
// //     borderRadius: 10,
// //     alignItems: "center",
// //   },
// //   cancelDeleteButton: {
// //     backgroundColor: "#333",
// //   },
// //   cancelDeleteButtonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// //   confirmDeleteButton: {
// //     backgroundColor: "#FF5C5C",
// //   },
// //   confirmDeleteButtonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "700",
// //   },
  
// //   // Color Picker Modal
// //   colorPickerModal: {
// //     backgroundColor: "#1A1A1A",
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     paddingBottom: 20,
// //     width: '100%',
// //   },
// //   modalHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: "#333",
// //   },
// //   modalTitle: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "700",
// //   },
// //   colorGrid: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     justifyContent: "center",
// //     padding: 20,
// //     gap: 12,
// //   },
// //   colorOption: {
// //     width: 44,
// //     height: 44,
// //     borderRadius: 22,
// //     borderWidth: 2,
// //     borderColor: "transparent",
// //   },
// //   selectedColor: {
// //     borderColor: "#4F7CFF",
// //     transform: [{ scale: 1.1 }],
// //   },
  
// //   // Modal Keyboard
// //   modalKeyboard: {
// //     padding: 10,
// //     borderTopWidth: 1,
// //     borderTopColor: "#333",
// //   },
// //   modalKeyboardRow: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     marginBottom: 8,
// //   },
// //   modalKeyButton: {
// //     width: (width - 40) / 10,
// //     height: 40,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#333",
// //     borderRadius: 6,
// //     marginHorizontal: 1,
// //   },
// //   modalKeyButtonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// //   modalKeyboardBottom: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginTop: 8,
// //     paddingHorizontal: 10,
// //   },
// //   modalSpecialKey: {
// //     height: 40,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#333",
// //     borderRadius: 6,
// //     paddingHorizontal: 20,
// //   },
// //   modalSpecialKeyText: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
  
// //   // Alignment Modal
// //   alignmentModal: {
// //     backgroundColor: "#1A1A1A",
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     paddingBottom: 40,
// //     width: '100%',
// //   },
// //   alignmentOptions: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     paddingHorizontal: 20,
// //     paddingVertical: 30,
// //   },
// //   alignmentButton: {
// //     alignItems: "center",
// //     gap: 8,
// //   },
// //   alignmentButtonText: {
// //     color: "#fff",
// //     fontSize: 14,
// //     fontWeight: "600",
// //   },
  
// //   // Exit Modal
// //   exitModal: {
// //     backgroundColor: "#262626",
// //     borderRadius: 15,
// //     padding: 20,
// //     width: width * 0.85,
// //     maxWidth: 400,
// //   },
// //   exitModalTitle: {
// //     color: "#fff",
// //     fontSize: 20,
// //     fontWeight: "700",
// //     textAlign: "center",
// //     marginBottom: 20,
// //   },
// //   exitModalButton: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 15,
// //     borderRadius: 10,
// //     marginBottom: 10,
// //     gap: 10,
// //   },
// //   deleteAllButton: {
// //     backgroundColor: "#FF5C5C",
// //   },
// //   deleteAllButtonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "700",
// //   },
// //   keepEditingButton: {
// //     backgroundColor: "#333",
// //   },
// //   keepEditingButtonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// // });



// import React, { useEffect, useState, useRef, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   StatusBar,
//   Animated,
//   PanResponder,
//   Pressable,
//   Alert,
//   Dimensions,
//   ScrollView,
//   Modal,
//   FlatList,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = 9/16;
// const STORY_WIDTH = width;
// const STORY_HEIGHT = width / ASPECT_RATIO;

// // Instagram-like color palette
// const COLORS = [
//   "#FFFFFF", "#FF5C5C", "#FF9F00", "#FFD700", "#32CD32", "#1E90FF", 
//   "#9370DB", "#FF69B4", "#00CED1", "#FF4500", "#9ACD32", "#BA55D3",
//   "#000000", "#696969", "#D3D3D3"
// ];

// // Instagram font styles
// const FONTS = [
//   { name: "Classic", value: "System" },
//   { name: "Modern", value: "System", weight: "bold" },
//   { name: "Typewriter", value: "System", weight: "300" },
//   { name: "Serif", value: "System", style: "italic" },
//   { name: "Strong", value: "System", weight: "800" },
//   { name: "Neon", value: "System", weight: "600" },
// ];

// // Keyboard layout (Instagram style)
// const KEYBOARD_ROWS = [
//   ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
//   ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
//   ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '!']
// ];

// export default function InstagramStoryEditor({ navigation }) {
//   const [image, setImage] = useState(null);
//   const [texts, setTexts] = useState([]);
//   const [activeId, setActiveId] = useState(null);
//   const [showInput, setShowInput] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [showFontPicker, setShowFontPicker] = useState(false);
//   const [showTextAlignment, setShowTextAlignment] = useState(false);
//   const [showKeyboard, setShowKeyboard] = useState(false);
//   const [selectedFont, setSelectedFont] = useState("Classic");
//   const [isPosting, setIsPosting] = useState(false);
//   const [showExitModal, setShowExitModal] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
  
//   const textInputRef = useRef(null);
//   const longPressTimer = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//     })();
//   }, []);

//   /* -------- IMAGE PICKER -------- */
//   const openGallery = async () => {
//     try {
//       const res = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         quality: 1,
//         allowsEditing: true,
//         aspect: [9, 16],
//       });
      
//       if (!res.canceled && res.assets[0].uri) {
//         setImage(res.assets[0].uri);
//         setTexts([]);
//         setActiveId(null);
//         setShowInput(false);
//         setShowKeyboard(false);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick image");
//     }
//   };

//   const openCamera = async () => {
//     try {
//       const res = await ImagePicker.launchCameraAsync({
//         quality: 1,
//         allowsEditing: true,
//         aspect: [9, 16],
//       });
      
//       if (!res.canceled && res.assets[0].uri) {
//         setImage(res.assets[0].uri);
//         setTexts([]);
//         setActiveId(null);
//         setShowInput(false);
//         setShowKeyboard(false);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to take photo");
//     }
//   };

//   /* -------- ADD TEXT (Instagram Style) -------- */
//   const addText = () => {
//     if (!image) {
//       Alert.alert("Select Image", "Please select an image first");
//       return;
//     }

//     const id = Date.now().toString();
//     const pan = new Animated.ValueXY({ 
//       x: STORY_WIDTH / 2 - 60, 
//       y: STORY_HEIGHT / 2 - 25 
//     });

//     const panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: (e, gestureState) => {
//         // Long press for delete
//         longPressTimer.current = setTimeout(() => {
//           showQuickDeleteOptions(id);
//         }, 800);
        
//         setActiveId(id);
//         setShowInput(false);
//         setShowKeyboard(false);
//         pan.extractOffset();
//         setIsDragging(true);
//       },
//       onPanResponderMove: Animated.event(
//         [null, { dx: pan.x, dy: pan.y }],
//         { useNativeDriver: false }
//       ),
//       onPanResponderRelease: () => {
//         clearTimeout(longPressTimer.current);
//         pan.flattenOffset();
//         setIsDragging(false);
        
//         // Small delay to avoid immediate selection after dragging
//         setTimeout(() => {
//           if (!isDragging) {
//             setActiveId(id);
//             setInputValue(getTextById(id)?.text || "");
//             setShowKeyboard(true);
//           }
//         }, 100);
//       },
//       onPanResponderTerminate: () => {
//         clearTimeout(longPressTimer.current);
//         setIsDragging(false);
//       },
//     });

//     const newText = {
//       id,
//       text: "Tap to edit",
//       size: 36,
//       color: "#FFFFFF",
//       align: "center",
//       font: "Classic",
//       fontWeight: "normal",
//       fontStyle: "normal",
//       rotation: 0,
//       pan,
//       panResponder,
//       createdAt: new Date(),
//     };

//     setTexts((prev) => [...prev, newText]);
//     setActiveId(id);
//     setInputValue("Tap to edit");
//     setShowKeyboard(true);
    
//     setTimeout(() => {
//       textInputRef.current?.focus();
//     }, 300);
//   };

//   const getTextById = (id) => {
//     return texts.find(t => t.id === id);
//   };

//   const updateText = useCallback((id, key, value) => {
//     setTexts((prev) =>
//       prev.map((text) => (text.id === id ? { ...text, [key]: value } : text))
//     );
//   }, []);

//   /* -------- INSTAGRAM STYLE DELETE FUNCTIONS -------- */
//   const showQuickDeleteOptions = (id) => {
//     // Instagram style: Show delete button immediately on long press
//     setActiveId(id);
    
//     // Show quick action menu (Instagram style)
//     Alert.alert(
//       "Delete Text",
//       "Do you want to delete this text?",
//       [
//         { 
//           text: "Cancel", 
//           style: "cancel",
//           onPress: () => {
//             // Select the text after canceling delete
//             setTimeout(() => {
//               setActiveId(id);
//               setInputValue(getTextById(id)?.text || "");
//               setShowKeyboard(true);
//             }, 100);
//           }
//         },
//         { 
//           text: "Delete", 
//           style: "destructive",
//           onPress: () => deleteTextById(id)
//         }
//       ],
//       { cancelable: true }
//     );
//   };

//   const deleteTextById = (id) => {
//     setTexts((prev) => prev.filter((text) => text.id !== id));
    
//     if (activeId === id) {
//       setActiveId(null);
//       setShowInput(false);
//       setInputValue("");
//       setShowKeyboard(false);
//     }
    
//     // Instagram-like haptic feedback simulation
//     // You can add actual haptic feedback here if using expo-haptics
//   };

//   const deleteActiveText = () => {
//     if (!activeId) return;
//     deleteTextById(activeId);
//   };

//   const deleteAllTexts = () => {
//     if (texts.length === 0) return;
    
//     Alert.alert(
//       "Delete All",
//       `Delete all ${texts.length} text elements?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { 
//           text: "Delete All", 
//           style: "destructive",
//           onPress: () => {
//             setTexts([]);
//             setActiveId(null);
//             setShowInput(false);
//             setInputValue("");
//             setShowKeyboard(false);
//           }
//         }
//       ]
//     );
//   };

//   const deleteAllBlips = () => {
//     setShowExitModal(false);
//     deleteAllTexts();
//   };

//   /* -------- TEXT EDITING FUNCTIONS -------- */
//   const rotateText = (degrees) => {
//     if (!activeId) return;
//     const activeText = getTextById(activeId);
//     if (!activeText) return;
    
//     updateText(activeId, "rotation", (activeText.rotation + degrees) % 360);
//   };

//   const duplicateText = () => {
//     if (!activeId) return;
//     const activeText = getTextById(activeId);
//     if (!activeText) return;

//     const id = Date.now().toString();
//     const pan = new Animated.ValueXY({ 
//       x: activeText.pan.x._value + 20, 
//       y: activeText.pan.y._value + 20 
//     });

//     const panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         setActiveId(id);
//         setShowInput(false);
//         setShowKeyboard(false);
//         pan.extractOffset();
//         setIsDragging(true);
//       },
//       onPanResponderMove: Animated.event(
//         [null, { dx: pan.x, dy: pan.y }],
//         { useNativeDriver: false }
//       ),
//       onPanResponderRelease: () => {
//         pan.flattenOffset();
//         setIsDragging(false);
//       },
//     });

//     const newText = {
//       ...activeText,
//       id,
//       pan,
//       panResponder,
//       createdAt: new Date(),
//     };

//     setTexts((prev) => [...prev, newText]);
//     setActiveId(id);
//   };

//   /* -------- KEYBOARD FUNCTIONS -------- */
//   const handleKeyPress = (key) => {
//     if (activeId) {
//       const newText = inputValue + key;
//       setInputValue(newText);
//       updateText(activeId, "text", newText);
//     }
//   };

//   const handleBackspace = () => {
//     if (activeId && inputValue.length > 0) {
//       const newText = inputValue.slice(0, -1);
//       setInputValue(newText);
//       updateText(activeId, "text", newText);
//     }
//   };

//   const handleSpace = () => {
//     if (activeId) {
//       const newText = inputValue + " ";
//       setInputValue(newText);
//       updateText(activeId, "text", newText);
//     }
//   };

//   const handleReturn = () => {
//     if (activeId) {
//       const newText = inputValue + "\n";
//       setInputValue(newText);
//       updateText(activeId, "text", newText);
//     }
//   };

//   /* -------- INSTAGRAM STYLE POST -------- */
//   const handlePost = async () => {
//     if (!image) {
//       Alert.alert("Select Image", "Please select an image first");
//       return;
//     }

//     setIsPosting(true);
    
//     try {
//       // Simulate Instagram posting process
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       Alert.alert(
//         "Posted to Story!",
//         "Your story has been shared.",
//         [
//           { 
//             text: "View Story", 
//             onPress: () => navigation.navigate("StoryView") 
//           },
//           { text: "OK", onPress: () => setIsPosting(false) }
//         ]
//       );
//     } catch (error) {
//       Alert.alert("Error", "Failed to post. Please try again.");
//       setIsPosting(false);
//     }
//   };

//   const handleShare = async () => {
//     if (!image) {
//       Alert.alert("Select Image", "Please select an image first");
//       return;
//     }

//     Alert.alert(
//       "Share",
//       "Sharing options would appear here",
//       [{ text: "OK" }]
//     );
//   };

//   const activeText = getTextById(activeId);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#000" />

//       {/* INSTAGRAM STYLE HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.headerButton}
//           onPress={() => {
//             if (texts.length > 0 || image) {
//               setShowExitModal(true);
//             } else {
//               navigation.goBack();
//             }
//           }}
//         >
//           <Ionicons name="close" size={28} color="#fff" />
//         </TouchableOpacity>
        
//         <View style={styles.headerCenter}>
//           <Text style={styles.headerTitle}>Create</Text>
//         </View>
        
//         <TouchableOpacity 
//           style={[styles.headerButton, styles.nextButton]}
//           onPress={handlePost}
//           disabled={!image || isPosting}
//         >
//           {isPosting ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <Text style={styles.nextButtonText}>Next</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       {/* CANVAS AREA - Instagram Story Size */}
//       <Pressable
//         style={styles.canvas}
//         onPress={() => {
//           if (!isDragging) {
//             setActiveId(null);
//             setShowKeyboard(false);
//             setShowColorPicker(false);
//             setShowFontPicker(false);
//             setShowTextAlignment(false);
//           }
//         }}
//       >
//         {image ? (
//           <>
//             <Image 
//               source={{ uri: image }} 
//               style={styles.image} 
//               resizeMode="cover"
//             />
            
//             {/* Render texts with Instagram-like selection */}
//             {texts.map((item) => (
//               <Animated.View
//                 key={item.id}
//                 style={[
//                   styles.textContainer,
//                   {
//                     transform: [
//                       ...item.pan.getTranslateTransform(),
//                       { rotate: `${item.rotation}deg` }
//                     ],
//                     zIndex: activeId === item.id ? 999 : texts.indexOf(item),
//                   },
//                 ]}
//                 {...item.panResponder.panHandlers}
//               >
//                 <View style={styles.textWrapper}>
//                   <Text
//                     style={[
//                       styles.textElement,
//                       {
//                         color: item.color,
//                         fontSize: item.size,
//                         textAlign: item.align,
//                         fontWeight: item.fontWeight,
//                         fontStyle: item.fontStyle,
//                       },
//                     ]}
//                     numberOfLines={10}
//                   >
//                     {item.text}
//                   </Text>
                  
//                   {/* Instagram Style Selection Border & Delete Button */}
//                   {activeId === item.id && (
//                     <View style={styles.instagramSelection}>
//                       {/* Top-left corner (Instagram style) */}
//                       <TouchableOpacity 
//                         style={[styles.cornerButton, styles.topLeftCorner]}
//                         onPress={deleteActiveText}
//                       >
//                         <Ionicons name="close" size={18} color="#fff" />
//                       </TouchableOpacity>
                      
//                       {/* Top-right corner - Rotation handle */}
//                       <TouchableOpacity 
//                         style={[styles.cornerButton, styles.topRightCorner]}
//                         onPress={() => rotateText(45)}
//                       >
//                         <Ionicons name="sync" size={16} color="#fff" />
//                       </TouchableOpacity>
                      
//                       {/* Bottom-right corner - Duplicate */}
//                       <TouchableOpacity 
//                         style={[styles.cornerButton, styles.bottomRightCorner]}
//                         onPress={duplicateText}
//                       >
//                         <Ionicons name="copy" size={16} color="#fff" />
//                       </TouchableOpacity>
                      
//                       {/* Selection border (Instagram dashed style) */}
//                       <View style={styles.selectionBorder} />
//                     </View>
//                   )}
//                 </View>
//               </Animated.View>
//             ))}
//           </>
//         ) : (
//           <TouchableOpacity 
//             style={styles.placeholderContainer}
//             onPress={openGallery}
//           >
//             <View style={styles.placeholderContent}>
//               <Ionicons name="images-outline" size={60} color="#666" />
//               <Text style={styles.placeholderText}>Choose a photo</Text>
//               <View style={styles.photoOptions}>
//                 <TouchableOpacity 
//                   style={styles.photoOption}
//                   onPress={openCamera}
//                 >
//                   <Ionicons name="camera" size={24} color="#fff" />
//                   <Text style={styles.photoOptionText}>Camera</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.photoOption}
//                   onPress={openGallery}
//                 >
//                   <Ionicons name="image" size={24} color="#fff" />
//                   <Text style={styles.photoOptionText}>Gallery</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       </Pressable>

//       {/* INSTAGRAM STYLE KEYBOARD & EDITOR */}
//       {showKeyboard && activeText && (
//         <KeyboardAvoidingView 
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={styles.instagramEditor}
//         >
//           {/* Text Display Bar (Instagram Style) */}
//           <View style={styles.editorHeader}>
//             <TouchableOpacity 
//               style={styles.editorActionButton}
//               onPress={() => setShowKeyboard(false)}
//             >
//               <Ionicons name="chevron-down" size={24} color="#fff" />
//             </TouchableOpacity>
            
//             <View style={styles.textPreviewContainer}>
//               <Text style={styles.textPreview} numberOfLines={1}>
//                 {activeText.text || "Add text"}
//               </Text>
//             </View>
            
//             <TouchableOpacity 
//               style={styles.editorActionButton}
//               onPress={deleteActiveText}
//             >
//               <Ionicons name="trash-outline" size={22} color="#FF5C5C" />
//             </TouchableOpacity>
//           </View>

//           {/* Instagram Style Quick Actions */}
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             style={styles.quickActions}
//             contentContainerStyle={styles.quickActionsContent}
//           >
//             {/* Color Picker */}
//             <TouchableOpacity 
//               style={styles.quickAction}
//               onPress={() => setShowColorPicker(true)}
//             >
//               <View style={[styles.colorDot, { backgroundColor: activeText.color }]} />
//               <Text style={styles.quickActionText}>Color</Text>
//             </TouchableOpacity>

//             {/* Font Picker */}
//             <TouchableOpacity 
//               style={styles.quickAction}
//               onPress={() => setShowFontPicker(true)}
//             >
//               <Text style={styles.fontIcon}>Aa</Text>
//               <Text style={styles.quickActionText}>Font</Text>
//             </TouchableOpacity>

//             {/* Size Control */}
//             <View style={styles.sizeQuickAction}>
//               <TouchableOpacity 
//                 style={styles.sizeButtonSmall}
//                 onPress={() => updateText(activeId, "size", Math.max(20, activeText.size - 4))}
//               >
//                 <Text style={styles.sizeButtonText}>A</Text>
//               </TouchableOpacity>
//               <View style={styles.sizeIndicator}>
//                 <Text style={styles.sizeText}>{activeText.size}</Text>
//               </View>
//               <TouchableOpacity 
//                 style={styles.sizeButtonLarge}
//                 onPress={() => updateText(activeId, "size", Math.min(72, activeText.size + 4))}
//               >
//                 <Text style={styles.sizeButtonText}>A</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Alignment */}
//             <TouchableOpacity 
//               style={styles.quickAction}
//               onPress={() => setShowTextAlignment(true)}
//             >
//               <Ionicons 
//                 name={
//                   activeText.align === "left" ? "align-left" :
//                   activeText.align === "center" ? "align-center" :
//                   "align-right"
//                 } 
//                 size={22} 
//                 color="#fff" 
//               />
//               <Text style={styles.quickActionText}>Align</Text>
//             </TouchableOpacity>

//             {/* Background Toggle (Instagram Style) */}
//             <TouchableOpacity 
//               style={styles.quickAction}
//               onPress={() => {
//                 const hasBackground = activeText.backgroundColor && activeText.backgroundColor !== 'transparent';
//                 updateText(activeId, "backgroundColor", hasBackground ? 'transparent' : 'rgba(0,0,0,0.5)');
//               }}
//             >
//               <View style={styles.bgIcon}>
//                 <Text style={{ color: '#fff', fontSize: 12 }}>BG</Text>
//               </View>
//               <Text style={styles.quickActionText}>Background</Text>
//             </TouchableOpacity>

//             {/* Shadow Toggle */}
//             <TouchableOpacity 
//               style={styles.quickAction}
//               onPress={() => {
//                 // Toggle shadow
//               }}
//             >
//               <Ionicons name="sunny-outline" size={22} color="#fff" />
//               <Text style={styles.quickActionText}>Shadow</Text>
//             </TouchableOpacity>
//           </ScrollView>

//           {/* Custom Keyboard */}
//           <View style={styles.instagramKeyboard}>
//             {KEYBOARD_ROWS.map((row, rowIndex) => (
//               <View key={rowIndex} style={styles.keyboardRow}>
//                 {row.map((key) => (
//                   <TouchableOpacity
//                     key={key}
//                     style={styles.keyButton}
//                     onPress={() => handleKeyPress(key)}
//                   >
//                     <Text style={styles.keyButtonText}>{key}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             ))}
            
//             <View style={styles.keyboardBottomRow}>
//               <TouchableOpacity 
//                 style={[styles.specialKey, styles.emojiKey]}
//                 onPress={() => {/* Open emoji picker */}}
//               >
//                 <Text style={styles.specialKeyText}>😀</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.specialKey, styles.spaceKey]}
//                 onPress={handleSpace}
//               >
//                 <Text style={styles.specialKeyText}>space</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.specialKey, styles.returnKey]}
//                 onPress={handleReturn}
//               >
//                 <Text style={styles.specialKeyText}>return</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.specialKey, styles.backspaceKey]}
//                 onPress={handleBackspace}
//                 onLongPress={() => {
//                   // Clear all text on long press
//                   if (activeId) {
//                     setInputValue("");
//                     updateText(activeId, "text", "");
//                   }
//                 }}
//               >
//                 <Ionicons name="backspace-outline" size={22} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       )}

//       {/* BOTTOM TOOLBAR - Instagram Style */}
//       {!showKeyboard && (
//         <View style={styles.instagramToolbar}>
//           <TouchableOpacity 
//             style={styles.toolbarButton}
//             onPress={openGallery}
//           >
//             <Ionicons name="images-outline" size={24} color="#fff" />
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.toolbarButton}
//             onPress={addText}
//             disabled={!image}
//           >
//             <Text style={styles.textButtonIcon}>Aa</Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.toolbarButton}
//             onPress={() => {/* Draw mode */}}
//             disabled={!image}
//           >
//             <Ionicons name="brush-outline" size={24} color="#fff" />
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.toolbarButton}
//             onPress={() => {/* Sticker mode */}}
//             disabled={!image}
//           >
//             <Ionicons name="happy-outline" size={24} color="#fff" />
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.toolbarButton}
//             onPress={deleteAllTexts}
//             disabled={texts.length === 0}
//           >
//             <Ionicons 
//               name="trash-outline" 
//               size={24} 
//               color={texts.length === 0 ? "#666" : "#FF5C5C"} 
//             />
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* COLOR PICKER MODAL - Instagram Style */}
//       <Modal
//         visible={showColorPicker}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowColorPicker(false)}
//       >
//         <Pressable 
//           style={styles.modalOverlay} 
//           onPress={() => setShowColorPicker(false)}
//         >
//           <View style={styles.instagramModal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Text Color</Text>
//               <TouchableOpacity onPress={() => setShowColorPicker(false)}>
//                 <Ionicons name="close" size={24} color="#fff" />
//               </TouchableOpacity>
//             </View>
            
//             <ScrollView 
//               horizontal 
//               showsHorizontalScrollIndicator={false}
//               style={styles.colorScroll}
//               contentContainerStyle={styles.colorScrollContent}
//             >
//               {COLORS.map((color) => (
//                 <TouchableOpacity
//                   key={color}
//                   style={[
//                     styles.instagramColorOption,
//                     { backgroundColor: color },
//                     activeText?.color === color && styles.selectedInstagramColor,
//                   ]}
//                   onPress={() => {
//                     if (activeText) updateText(activeId, "color", color);
//                     setShowColorPicker(false);
//                   }}
//                 />
//               ))}
//             </ScrollView>
//           </View>
//         </Pressable>
//       </Modal>

//       {/* FONT PICKER MODAL - Instagram Style */}
//       <Modal
//         visible={showFontPicker}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowFontPicker(false)}
//       >
//         <Pressable 
//           style={styles.modalOverlay} 
//           onPress={() => setShowFontPicker(false)}
//         >
//           <View style={styles.instagramModal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Font Style</Text>
//               <TouchableOpacity onPress={() => setShowFontPicker(false)}>
//                 <Ionicons name="close" size={24} color="#fff" />
//               </TouchableOpacity>
//             </View>
            
//             <ScrollView 
//               horizontal 
//               showsHorizontalScrollIndicator={false}
//               style={styles.fontScroll}
//               contentContainerStyle={styles.fontScrollContent}
//             >
//               {FONTS.map((font) => (
//                 <TouchableOpacity
//                   key={font.name}
//                   style={[
//                     styles.instagramFontOption,
//                     selectedFont === font.name && styles.selectedInstagramFont,
//                   ]}
//                   onPress={() => {
//                     setSelectedFont(font.name);
//                     if (activeText) {
//                       updateText(activeId, "font", font.name);
//                       updateText(activeId, "fontWeight", font.weight || "normal");
//                       updateText(activeId, "fontStyle", font.style || "normal");
//                     }
//                     setShowFontPicker(false);
//                   }}
//                 >
//                   <Text style={[
//                     styles.instagramFontText,
//                     { 
//                       fontWeight: font.weight,
//                       fontStyle: font.style,
//                     }
//                   ]}>
//                     {font.name}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         </Pressable>
//       </Modal>

//       {/* ALIGNMENT MODAL - Instagram Style */}
//       <Modal
//         visible={showTextAlignment}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowTextAlignment(false)}
//       >
//         <Pressable 
//           style={styles.modalOverlay} 
//           onPress={() => setShowTextAlignment(false)}
//         >
//           <View style={styles.instagramModal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Alignment</Text>
//               <TouchableOpacity onPress={() => setShowTextAlignment(false)}>
//                 <Ionicons name="close" size={24} color="#fff" />
//               </TouchableOpacity>
//             </View>
            
//             <View style={styles.alignmentGrid}>
//               <TouchableOpacity 
//                 style={styles.alignmentOption}
//                 onPress={() => {
//                   if (activeText) updateText(activeId, "align", "left");
//                   setShowTextAlignment(false);
//                 }}
//               >
//                 <Ionicons name="align-left" size={32} color="#fff" />
//                 <Text style={styles.alignmentLabel}>Left</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={styles.alignmentOption}
//                 onPress={() => {
//                   if (activeText) updateText(activeId, "align", "center");
//                   setShowTextAlignment(false);
//                 }}
//               >
//                 <Ionicons name="align-center" size={32} color="#fff" />
//                 <Text style={styles.alignmentLabel}>Center</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={styles.alignmentOption}
//                 onPress={() => {
//                   if (activeText) updateText(activeId, "align", "right");
//                   setShowTextAlignment(false);
//                 }}
//               >
//                 <Ionicons name="align-right" size={32} color="#fff" />
//                 <Text style={styles.alignmentLabel}>Right</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Pressable>
//       </Modal>

//       {/* EXIT MODAL - Instagram Style */}
//       <Modal
//         visible={showExitModal}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowExitModal(false)}
//       >
//         <Pressable 
//           style={styles.modalOverlay} 
//           onPress={() => setShowExitModal(false)}
//         >
//           <View style={styles.instagramAlert}>
//             <Text style={styles.alertTitle}>Discard Story?</Text>
//             <Text style={styles.alertMessage}>
//               If you go back now, you'll lose all edits.
//             </Text>
            
//             <View style={styles.alertButtons}>
//               <TouchableOpacity 
//                 style={[styles.alertButton, styles.discardButton]}
//                 onPress={deleteAllBlips}
//               >
//                 <Text style={styles.discardButtonText}>Discard</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.alertButton, styles.keepEditingButton]}
//                 onPress={() => setShowExitModal(false)}
//               >
//                 <Text style={styles.keepEditingButtonText}>Keep Editing</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Pressable>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// /* -------- INSTAGRAM STYLES -------- */
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: "#000" 
//   },
  
//   // Instagram Header
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#000",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#262626",
//   },
//   headerButton: {
//     padding: 8,
//   },
//   headerCenter: {
//     alignItems: "center",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   nextButton: {
//     backgroundColor: "transparent",
//   },
//   nextButtonText: {
//     color: "#0095F6",
//     fontSize: 16,
//     fontWeight: "600",
//   },
  
//   // Canvas
//   canvas: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   image: {
//     width: STORY_WIDTH,
//     height: STORY_HEIGHT,
//     alignSelf: "center",
//   },
  
//   placeholderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#111",
//   },
//   placeholderContent: {
//     alignItems: "center",
//     gap: 24,
//   },
//   placeholderText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   photoOptions: {
//     flexDirection: "row",
//     gap: 32,
//     marginTop: 24,
//   },
//   photoOption: {
//     alignItems: "center",
//     gap: 8,
//   },
//   photoOptionText: {
//     color: "#fff",
//     fontSize: 14,
//   },
  
//   // Text Styles with Instagram Selection
//   textContainer: {
//     position: "absolute",
//   },
//   textWrapper: {
//     padding: 8,
//   },
//   textElement: {
//     fontWeight: "700",
//     textShadowColor: "rgba(0, 0, 0, 0.8)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 4,
//   },
  
//   // Instagram Style Selection
//   instagramSelection: {
//     position: "absolute",
//     top: -12,
//     left: -12,
//     right: -12,
//     bottom: -12,
//   },
//   cornerButton: {
//     position: "absolute",
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#0095F6",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "#fff",
//     zIndex: 1000,
//   },
//   topLeftCorner: {
//     top: -14,
//     left: -14,
//     backgroundColor: "#FF5C5C", // Red for delete
//   },
//   topRightCorner: {
//     top: -14,
//     right: -14,
//   },
//   bottomRightCorner: {
//     bottom: -14,
//     right: -14,
//     backgroundColor: "#32CD32", // Green for duplicate
//   },
//   selectionBorder: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     borderWidth: 2,
//     borderColor: "#0095F6",
//     borderRadius: 4,
//     borderStyle: "dashed",
//   },
  
//   // Instagram Editor
//   instagramEditor: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#1A1A1A",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingBottom: Platform.OS === "ios" ? 20 : 0,
//     maxHeight: height * 0.6,
//   },
//   editorHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#333",
//   },
//   editorActionButton: {
//     padding: 8,
//   },
//   textPreviewContainer: {
//     flex: 1,
//     paddingHorizontal: 12,
//   },
//   textPreview: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     textAlign: "center",
//   },
  
//   // Quick Actions
//   quickActions: {
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#333",
//   },
//   quickActionsContent: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     gap: 20,
//   },
//   quickAction: {
//     alignItems: "center",
//     gap: 4,
//     minWidth: 50,
//   },
//   quickActionText: {
//     color: "#fff",
//     fontSize: 12,
//   },
//   colorDot: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   fontIcon: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "700",
//   },
//   bgIcon: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: "#333",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#666",
//   },
  
//   // Size Control
//   sizeQuickAction: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#333",
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     gap: 10,
//   },
//   sizeButtonSmall: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#444",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sizeButtonLarge: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: "#444",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sizeButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   sizeIndicator: {
//     minWidth: 36,
//     alignItems: "center",
//   },
//   sizeText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
  
//   // Instagram Keyboard
//   instagramKeyboard: {
//     padding: 10,
//   },
//   keyboardRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 6,
//   },
//   keyButton: {
//     width: (width - 40) / 10,
//     height: 42,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#333",
//     borderRadius: 6,
//     marginHorizontal: 1,
//   },
//   keyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   keyboardBottomRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 8,
//     paddingHorizontal: 8,
//   },
//   specialKey: {
//     height: 42,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#333",
//     borderRadius: 6,
//   },
//   specialKeyText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   emojiKey: {
//     width: width * 0.15,
//   },
//   spaceKey: {
//     flex: 1,
//     marginHorizontal: 8,
//   },
//   returnKey: {
//     width: width * 0.25,
//   },
//   backspaceKey: {
//     width: 56,
//   },
  
//   // Instagram Toolbar
//   instagramToolbar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingVertical: 12,
//     backgroundColor: "rgba(0, 0, 0, 0.9)",
//     borderTopWidth: 0.5,
//     borderTopColor: "#333",
//   },
//   toolbarButton: {
//     padding: 12,
//   },
//   textButtonIcon: {
//     color: "#fff",
//     fontSize: 28,
//     fontWeight: "700",
//   },
  
//   // Instagram Modals
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//     justifyContent: "flex-end",
//   },
//   instagramModal: {
//     backgroundColor: "#262626",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingBottom: 30,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#333",
//   },
//   modalTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
  
//   // Color Picker
//   colorScroll: {
//     maxHeight: 100,
//   },
//   colorScrollContent: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     gap: 12,
//   },
//   instagramColorOption: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     borderWidth: 3,
//     borderColor: "transparent",
//   },
//   selectedInstagramColor: {
//     borderColor: "#0095F6",
//     transform: [{ scale: 1.1 }],
//   },
  
//   // Font Picker
//   fontScroll: {
//     maxHeight: 100,
//   },
//   fontScrollContent: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     gap: 12,
//   },
//   instagramFontOption: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 25,
//     backgroundColor: "#333",
//     borderWidth: 2,
//     borderColor: "transparent",
//   },
//   selectedInstagramFont: {
//     backgroundColor: "#0095F6",
//     borderColor: "#fff",
//   },
//   instagramFontText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
  
//   // Alignment
//   alignmentGrid: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   alignmentOption: {
//     alignItems: "center",
//     gap: 8,
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   alignmentLabel: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
  
//   // Instagram Alert
//   instagramAlert: {
//     backgroundColor: "#262626",
//     borderRadius: 15,
//     padding: 20,
//     width: width * 0.85,
//     alignSelf: "center",
//   },
//   alertTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   alertMessage: {
//     color: "#999",
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 20,
//     lineHeight: 20,
//   },
//   alertButtons: {
//     gap: 10,
//   },
//   alertButton: {
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   discardButton: {
//     backgroundColor: "#FF5C5C",
//   },
//   discardButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   keepEditingButton: {
//     backgroundColor: "#333",
//   },
//   keepEditingButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });



import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Animated,
  PanResponder,
  Pressable,
  Alert,
  Dimensions,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = 9/16;
const STORY_WIDTH = width;
const STORY_HEIGHT = width / ASPECT_RATIO;

// Instagram-like color palette
const COLORS = [
  "#FFFFFF", "#FF5C5C", "#FF9F00", "#FFD700", "#32CD32", "#1E90FF", 
  "#9370DB", "#FF69B4", "#00CED1", "#FF4500", "#9ACD32", "#BA55D3",
  "#000000", "#696969", "#D3D3D3"
];

// Font styles
const FONTS = [
  { name: "Classic", value: "System" },
  { name: "Modern", value: "System", weight: "bold" },
  { name: "Typewriter", value: "System", weight: "300" },
  { name: "Serif", value: "System", style: "italic" },
  { name: "Strong", value: "System", weight: "800" },
  { name: "Neon", value: "System", weight: "600" },
];

// Keyboard layout
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '!']
];

// Alignment options
const ALIGNMENTS = [
  { id: 'left', icon: 'format-align-left', label: 'Left' },
  { id: 'center', icon: 'format-align-center', label: 'Center' },
  { id: 'right', icon: 'format-align-right', label: 'Right' },
  { id: 'justify', icon: 'format-align-justify', label: 'Justify' },
];

export default function InstagramStoryEditor({ navigation }) {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showAlignmentOptions, setShowAlignmentOptions] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Classic");
  const [isPosting, setIsPosting] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [pinchScale, setPinchScale] = useState(new Animated.Value(1));
  const [isPinching, setIsPinching] = useState(false);
  
  const textInputRef = useRef(null);
  const longPressTimer = useRef(null);
  const pinchResponder = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    })();
  }, []);

  /* -------- IMAGE PICKER -------- */
  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [9, 16],
      });
      
      if (!res.canceled && res.assets[0].uri) {
        setImage(res.assets[0].uri);
        setTexts([]);
        setActiveId(null);
        setShowInput(false);
        setShowKeyboard(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync({
        quality: 1,
        allowsEditing: true,
        aspect: [9, 16],
      });
      
      if (!res.canceled && res.assets[0].uri) {
        setImage(res.assets[0].uri);
        setTexts([]);
        setActiveId(null);
        setShowInput(false);
        setShowKeyboard(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  /* -------- ADD TEXT -------- */
  const addText = () => {
    if (!image) {
      Alert.alert("Select Image", "Please select an image first");
      return;
    }

    const id = Date.now().toString();
    const pan = new Animated.ValueXY({ 
      x: STORY_WIDTH / 2 - 60, 
      y: STORY_HEIGHT / 2 - 25 
    });

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        // Check if it's a two-finger gesture for pinch zoom
        if (e.nativeEvent.touches.length === 2) {
          setIsPinching(true);
          return true;
        }
        
        // Long press for delete
        longPressTimer.current = setTimeout(() => {
          showQuickDeleteOptions(id);
        }, 800);
        
        setActiveId(id);
        setShowInput(false);
        setShowKeyboard(false);
        pan.extractOffset();
        setIsDragging(true);
      },
      onPanResponderMove: (e, gestureState) => {
        // Handle pinch zoom with two fingers
        if (e.nativeEvent.touches.length === 2 && activeId === id) {
          const touch1 = e.nativeEvent.touches[0];
          const touch2 = e.nativeEvent.touches[1];
          
          const dx = touch1.pageX - touch2.pageX;
          const dy = touch1.pageY - touch2.pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Calculate scale based on initial distance
          if (this.initialDistance) {
            const scaleChange = distance / this.initialDistance;
            const newScale = Math.max(0.5, Math.min(3, scale * scaleChange));
            updateTextScale(id, newScale);
          } else {
            this.initialDistance = distance;
          }
        } else if (gestureState.numberActiveTouches === 1) {
          // Normal dragging with single finger
          Animated.event([
            null, { dx: pan.x, dy: pan.y }
          ], { useNativeDriver: false })(e, gestureState);
        }
      },
      onPanResponderRelease: () => {
        clearTimeout(longPressTimer.current);
        pan.flattenOffset();
        setIsDragging(false);
        setIsPinching(false);
        this.initialDistance = null;
        
        // Small delay to avoid immediate selection after dragging
        setTimeout(() => {
          if (!isDragging && !isPinching) {
            setActiveId(id);
            setInputValue(getTextById(id)?.text || "");
            setShowKeyboard(true);
          }
        }, 100);
      },
      onPanResponderTerminate: () => {
        clearTimeout(longPressTimer.current);
        setIsDragging(false);
        setIsPinching(false);
        this.initialDistance = null;
      },
    });

    const newText = {
      id,
      text: "Tap to edit",
      size: 36,
      color: "#FFFFFF",
      align: "center",
      font: "Classic",
      fontWeight: "normal",
      fontStyle: "normal",
      rotation: 0,
      scale: 1,
      pan,
      panResponder,
      createdAt: new Date(),
    };

    setTexts((prev) => [...prev, newText]);
    setActiveId(id);
    setInputValue("Tap to edit");
    setShowKeyboard(true);
    
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 300);
  };

  const getTextById = (id) => {
    return texts.find(t => t.id === id);
  };

  const updateText = useCallback((id, key, value) => {
    setTexts((prev) =>
      prev.map((text) => (text.id === id ? { ...text, [key]: value } : text))
    );
  }, []);

  /* -------- DIRECT ZOOM IN/ZOOM OUT -------- */
  const updateTextScale = (id, newScale) => {
    setTexts((prev) =>
      prev.map((text) => {
        if (text.id === id) {
          // Limit scale between 0.5x and 3x
          const clampedScale = Math.max(0.5, Math.min(3, newScale));
          return { 
            ...text, 
            scale: clampedScale,
            // Also adjust font size proportionally for visual consistency
            size: Math.max(20, Math.min(72, 36 * clampedScale))
          };
        }
        return text;
      })
    );
  };

  const handleZoomIn = () => {
    if (!activeId) return;
    const activeText = getTextById(activeId);
    if (!activeText) return;
    
    const newScale = Math.min(3, activeText.scale + 0.1);
    updateTextScale(activeId, newScale);
  };

  const handleZoomOut = () => {
    if (!activeId) return;
    const activeText = getTextById(activeId);
    if (!activeText) return;
    
    const newScale = Math.max(0.5, activeText.scale - 0.1);
    updateTextScale(activeId, newScale);
  };

  const resetTextScale = () => {
    if (!activeId) return;
    updateTextScale(activeId, 1);
  };

  /* -------- ALIGNMENT FUNCTIONS -------- */
  const handleAlignmentChange = (alignment) => {
    if (!activeId) return;
    
    updateText(activeId, "align", alignment);
    setShowAlignmentOptions(false);
    
    // Show feedback (like Instagram does)
    Alert.alert(
      "Alignment Changed",
      `Text aligned to ${alignment}`,
      [{ text: "OK" }],
      { duration: 1000 }
    );
  };

  const getAlignmentIcon = (alignment) => {
    switch(alignment) {
      case 'left': return 'format-align-left';
      case 'center': return 'format-align-center';
      case 'right': return 'format-align-right';
      case 'justify': return 'format-align-justify';
      default: return 'format-align-left';
    }
  };

  /* -------- DELETE FUNCTIONS -------- */
  const showQuickDeleteOptions = (id) => {
    setActiveId(id);
    
    Alert.alert(
      "Delete Text",
      "Do you want to delete this text?",
      [
        { 
          text: "Cancel", 
          style: "cancel",
          onPress: () => {
            setTimeout(() => {
              setActiveId(id);
              setInputValue(getTextById(id)?.text || "");
              setShowKeyboard(true);
            }, 100);
          }
        },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => deleteTextById(id)
        }
      ],
      { cancelable: true }
    );
  };

  const deleteTextById = (id) => {
    setTexts((prev) => prev.filter((text) => text.id !== id));
    
    if (activeId === id) {
      setActiveId(null);
      setShowInput(false);
      setInputValue("");
      setShowKeyboard(false);
    }
  };

  const deleteActiveText = () => {
    if (!activeId) return;
    deleteTextById(activeId);
  };

  /* -------- TEXT EDITING FUNCTIONS -------- */
  const rotateText = (degrees) => {
    if (!activeId) return;
    const activeText = getTextById(activeId);
    if (!activeText) return;
    
    updateText(activeId, "rotation", (activeText.rotation + degrees) % 360);
  };

  const duplicateText = () => {
    if (!activeId) return;
    const activeText = getTextById(activeId);
    if (!activeText) return;

    const id = Date.now().toString();
    const pan = new Animated.ValueXY({ 
      x: activeText.pan.x._value + 20, 
      y: activeText.pan.y._value + 20 
    });

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setActiveId(id);
        setShowInput(false);
        setShowKeyboard(false);
        pan.extractOffset();
        setIsDragging(true);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        setIsDragging(false);
      },
    });

    const newText = {
      ...activeText,
      id,
      pan,
      panResponder,
      createdAt: new Date(),
    };

    setTexts((prev) => [...prev, newText]);
    setActiveId(id);
  };

  /* -------- KEYBOARD FUNCTIONS -------- */
  const handleKeyPress = (key) => {
    if (activeId) {
      const newText = inputValue + key;
      setInputValue(newText);
      updateText(activeId, "text", newText);
    }
  };

  const handleBackspace = () => {
    if (activeId && inputValue.length > 0) {
      const newText = inputValue.slice(0, -1);
      setInputValue(newText);
      updateText(activeId, "text", newText);
    }
  };

  const handleSpace = () => {
    if (activeId) {
      const newText = inputValue + " ";
      setInputValue(newText);
      updateText(activeId, "text", newText);
    }
  };

  const handleReturn = () => {
    if (activeId) {
      const newText = inputValue + "\n";
      setInputValue(newText);
      updateText(activeId, "text", newText);
    }
  };

  /* -------- POST FUNCTIONALITY -------- */
  const handlePost = async () => {
    if (!image) {
      Alert.alert("Select Image", "Please select an image first");
      return;
    }

    setIsPosting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        "Posted to Story!",
        "Your story has been shared.",
        [
          { 
            text: "View Story", 
            onPress: () => navigation.navigate("StoryView") 
          },
          { text: "OK", onPress: () => setIsPosting(false) }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to post. Please try again.");
      setIsPosting(false);
    }
  };

  const activeText = getTextById(activeId);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => {
            if (texts.length > 0 || image) {
              setShowExitModal(true);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Create</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.headerButton, styles.nextButton]}
          onPress={handlePost}
          disabled={!image || isPosting}
        >
          {isPosting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.nextButtonText}>Next</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* CANVAS AREA */}
      <Pressable
        style={styles.canvas}
        onPress={() => {
          if (!isDragging && !isPinching) {
            setActiveId(null);
            setShowKeyboard(false);
            setShowColorPicker(false);
            setShowFontPicker(false);
            setShowAlignmentOptions(false);
          }
        }}
      >
        {image ? (
          <>
            <Image 
              source={{ uri: image }} 
              style={styles.image} 
              resizeMode="cover"
            />
            
            {/* Render texts */}
            {texts.map((item) => (
              <Animated.View
                key={item.id}
                style={[
                  styles.textContainer,
                  {
                    transform: [
                      ...item.pan.getTranslateTransform(),
                      { rotate: `${item.rotation}deg` },
                      { scale: item.scale || 1 }
                    ],
                    zIndex: activeId === item.id ? 999 : texts.indexOf(item),
                  },
                ]}
                {...item.panResponder.panHandlers}
              >
                <View style={styles.textWrapper}>
                  <Text
                    style={[
                      styles.textElement,
                      {
                        color: item.color,
                        fontSize: item.size,
                        textAlign: item.align,
                        fontWeight: item.fontWeight,
                        fontStyle: item.fontStyle,
                      },
                    ]}
                    numberOfLines={10}
                  >
                    {item.text}
                  </Text>
                  
                  {/* Selection Border & Controls */}
                  {activeId === item.id && (
                    <View style={styles.selectionControls}>
                      {/* Top-left corner - Delete */}
                      <TouchableOpacity 
                        style={[styles.cornerButton, styles.topLeftCorner]}
                        onPress={deleteActiveText}
                      >
                        <Ionicons name="close" size={18} color="#fff" />
                      </TouchableOpacity>
                      
                      {/* Top-right corner - Rotate */}
                      <TouchableOpacity 
                        style={[styles.cornerButton, styles.topRightCorner]}
                        onPress={() => rotateText(45)}
                      >
                        <Ionicons name="sync" size={16} color="#fff" />
                      </TouchableOpacity>
                      
                      {/* Bottom-left corner - Zoom Out */}
                      <TouchableOpacity 
                        style={[styles.cornerButton, styles.bottomLeftCorner]}
                        onPress={handleZoomOut}
                      >
                        <Ionicons name="remove" size={18} color="#fff" />
                      </TouchableOpacity>
                      
                      {/* Bottom-right corner - Zoom In */}
                      <TouchableOpacity 
                        style={[styles.cornerButton, styles.bottomRightCorner]}
                        onPress={handleZoomIn}
                      >
                        <Ionicons name="add" size={18} color="#fff" />
                      </TouchableOpacity>
                      
                      {/* Selection border */}
                      <View style={styles.selectionBorder} />
                    </View>
                  )}
                </View>
              </Animated.View>
            ))}
          </>
        ) : (
          <TouchableOpacity 
            style={styles.placeholderContainer}
            onPress={openGallery}
          >
            <View style={styles.placeholderContent}>
              <Ionicons name="images-outline" size={60} color="#666" />
              <Text style={styles.placeholderText}>Choose a photo</Text>
              <View style={styles.photoOptions}>
                <TouchableOpacity 
                  style={styles.photoOption}
                  onPress={openCamera}
                >
                  <Ionicons name="camera" size={24} color="#fff" />
                  <Text style={styles.photoOptionText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.photoOption}
                  onPress={openGallery}
                >
                  <Ionicons name="image" size={24} color="#fff" />
                  <Text style={styles.photoOptionText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </Pressable>

      {/* EDITOR WITH KEYBOARD */}
      {showKeyboard && activeText && (
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.editor}
        >
          {/* Editor Header */}
          <View style={styles.editorHeader}>
            <TouchableOpacity 
              style={styles.editorActionButton}
              onPress={() => setShowKeyboard(false)}
            >
              <Ionicons name="chevron-down" size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.textPreviewContainer}>
              <Text style={styles.textPreview} numberOfLines={1}>
                {activeText.text || "Add text"}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.editorActionButton}
              onPress={deleteActiveText}
            >
              <Ionicons name="trash-outline" size={22} color="#FF5C5C" />
            </TouchableOpacity>
          </View>

          {/* QUICK CONTROLS BAR */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.quickControls}
            contentContainerStyle={styles.quickControlsContent}
          >
            {/* Color Picker */}
            <TouchableOpacity 
              style={styles.quickControl}
              onPress={() => setShowColorPicker(true)}
            >
              <View style={[styles.colorDot, { backgroundColor: activeText.color }]} />
              <Text style={styles.quickControlText}>Color</Text>
            </TouchableOpacity>

            {/* Font Picker */}
            <TouchableOpacity 
              style={styles.quickControl}
              onPress={() => setShowFontPicker(true)}
            >
              <Text style={styles.fontIcon}>Aa</Text>
              <Text style={styles.quickControlText}>Font</Text>
            </TouchableOpacity>

            {/* ALIGNMENT PICKER - Full Functionality */}
            <TouchableOpacity 
              style={styles.quickControl}
              onPress={() => setShowAlignmentOptions(true)}
            >
              <MaterialCommunityIcons 
                name={getAlignmentIcon(activeText.align)} 
                size={24} 
                color="#fff" 
              />
              <Text style={styles.quickControlText}>Align</Text>
            </TouchableOpacity>

            {/* ZOOM CONTROLS - Direct Zoom In/Out */}
            <View style={styles.zoomControls}>
              <TouchableOpacity 
                style={styles.zoomButton}
                onPress={handleZoomOut}
              >
                <Ionicons name="remove" size={20} color="#fff" />
              </TouchableOpacity>
              
              <View style={styles.zoomIndicator}>
                <Text style={styles.zoomText}>
                  {activeText.scale ? `${Math.round(activeText.scale * 100)}%` : "100%"}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.zoomButton}
                onPress={handleZoomIn}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.resetZoomButton}
                onPress={resetTextScale}
              >
                <Text style={styles.resetZoomText}>Reset</Text>
              </TouchableOpacity>
            </View>

            {/* Background Toggle */}
            <TouchableOpacity 
              style={styles.quickControl}
              onPress={() => {
                const hasBackground = activeText.backgroundColor && activeText.backgroundColor !== 'transparent';
                updateText(activeId, "backgroundColor", hasBackground ? 'transparent' : 'rgba(0,0,0,0.5)');
              }}
            >
              <View style={styles.bgIcon}>
                <Text style={{ color: '#fff', fontSize: 12 }}>BG</Text>
              </View>
              <Text style={styles.quickControlText}>Background</Text>
            </TouchableOpacity>

            {/* Rotation Control */}
            <TouchableOpacity 
              style={styles.quickControl}
              onPress={() => rotateText(45)}
            >
              <Ionicons name="sync" size={22} color="#fff" />
              <Text style={styles.quickControlText}>Rotate</Text>
            </TouchableOpacity>

            {/* Duplicate Text */}
            <TouchableOpacity 
              style={styles.quickControl}
              onPress={duplicateText}
            >
              <Ionicons name="copy" size={22} color="#fff" />
              <Text style={styles.quickControlText}>Duplicate</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* CUSTOM KEYBOARD */}
          <View style={styles.customKeyboard}>
            {KEYBOARD_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.keyboardRow}>
                {row.map((key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.keyButton}
                    onPress={() => handleKeyPress(key)}
                  >
                    <Text style={styles.keyButtonText}>{key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            
            <View style={styles.keyboardBottomRow}>
              <TouchableOpacity 
                style={[styles.specialKey, styles.emojiKey]}
                onPress={() => {/* Open emoji picker */}}
              >
                <Text style={styles.specialKeyText}>😀</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.specialKey, styles.spaceKey]}
                onPress={handleSpace}
              >
                <Text style={styles.specialKeyText}>space</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.specialKey, styles.returnKey]}
                onPress={handleReturn}
              >
                <Text style={styles.specialKeyText}>return</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.specialKey, styles.backspaceKey]}
                onPress={handleBackspace}
                onLongPress={() => {
                  if (activeId) {
                    setInputValue("");
                    updateText(activeId, "text", "");
                  }
                }}
              >
                <Ionicons name="backspace-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}

      {/* BOTTOM TOOLBAR */}
      {!showKeyboard && (
        <View style={styles.toolbar}>
          <TouchableOpacity 
            style={styles.toolbarButton}
            onPress={openGallery}
          >
            <Ionicons name="images-outline" size={24} color="#fff" />
            <Text style={styles.toolbarButtonText}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolbarButton}
            onPress={addText}
            disabled={!image}
          >
            <Text style={styles.textButtonIcon}>Aa</Text>
            <Text style={styles.toolbarButtonText}>Text</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolbarButton}
            onPress={() => {/* Draw mode */}}
            disabled={!image}
          >
            <Ionicons name="brush-outline" size={24} color="#fff" />
            <Text style={styles.toolbarButtonText}>Draw</Text>
          </TouchableOpacity>

          {activeText && (
            <TouchableOpacity 
              style={styles.toolbarButton}
              onPress={() => setShowAlignmentOptions(true)}
            >
              <MaterialCommunityIcons 
                name={getAlignmentIcon(activeText.align)} 
                size={24} 
                color="#fff" 
              />
              <Text style={styles.toolbarButtonText}>Align</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ALIGNMENT OPTIONS MODAL - Full Functionality */}
      <Modal
        visible={showAlignmentOptions}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAlignmentOptions(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowAlignmentOptions(false)}
        >
          <View style={styles.alignmentModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Text Alignment</Text>
              <TouchableOpacity onPress={() => setShowAlignmentOptions(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.alignmentGrid}>
              {ALIGNMENTS.map((alignment) => (
                <TouchableOpacity
                  key={alignment.id}
                  style={[
                    styles.alignmentOption,
                    activeText?.align === alignment.id && styles.selectedAlignment,
                  ]}
                  onPress={() => handleAlignmentChange(alignment.id)}
                >
                  <MaterialCommunityIcons 
                    name={alignment.icon} 
                    size={32} 
                    color={activeText?.align === alignment.id ? "#0095F6" : "#fff"} 
                  />
                  <Text style={[
                    styles.alignmentLabel,
                    activeText?.align === alignment.id && styles.selectedAlignmentLabel
                  ]}>
                    {alignment.label}
                  </Text>
                  
                  {/* Preview text for each alignment */}
                  <View style={styles.alignmentPreview}>
                    <Text style={[
                      styles.alignmentPreviewText,
                      { textAlign: alignment.id }
                    ]}>
                      {alignment.id === 'justify' ? 
                        "This is justify aligned text that spans multiple lines to demonstrate how text looks when justified." :
                        "Sample Text"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Alignment Tips */}
            <View style={styles.alignmentTips}>
              <Text style={styles.tipsTitle}>Alignment Tips:</Text>
              <Text style={styles.tipsText}>
                • Left: Standard alignment for most text
              </Text>
              <Text style={styles.tipsText}>
                • Center: Perfect for titles and headings
              </Text>
              <Text style={styles.tipsText}>
                • Right: Useful for dates and numbers
              </Text>
              <Text style={styles.tipsText}>
                • Justify: Creates clean edges on both sides
              </Text>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* COLOR PICKER MODAL */}
      <Modal
        visible={showColorPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowColorPicker(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowColorPicker(false)}
        >
          <View style={styles.colorModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Text Color</Text>
              <TouchableOpacity onPress={() => setShowColorPicker(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.colorScroll}
              contentContainerStyle={styles.colorScrollContent}
            >
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    activeText?.color === color && styles.selectedColor,
                  ]}
                  onPress={() => {
                    if (activeText) updateText(activeId, "color", color);
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* FONT PICKER MODAL */}
      <Modal
        visible={showFontPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFontPicker(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowFontPicker(false)}
        >
          <View style={styles.fontModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Font Style</Text>
              <TouchableOpacity onPress={() => setShowFontPicker(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.fontScroll}
              contentContainerStyle={styles.fontScrollContent}
            >
              {FONTS.map((font) => (
                <TouchableOpacity
                  key={font.name}
                  style={[
                    styles.fontOption,
                    selectedFont === font.name && styles.selectedFont,
                  ]}
                  onPress={() => {
                    setSelectedFont(font.name);
                    if (activeText) {
                      updateText(activeId, "font", font.name);
                      updateText(activeId, "fontWeight", font.weight || "normal");
                      updateText(activeId, "fontStyle", font.style || "normal");
                    }
                    setShowFontPicker(false);
                  }}
                >
                  <Text style={[
                    styles.fontText,
                    { 
                      fontWeight: font.weight,
                      fontStyle: font.style,
                    }
                  ]}>
                    {font.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* EXIT MODAL */}
      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExitModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowExitModal(false)}
        >
          <View style={styles.exitModal}>
            <Text style={styles.exitModalTitle}>Discard Story?</Text>
            <Text style={styles.exitModalMessage}>
              If you go back now, you'll lose all edits.
            </Text>
            
            <View style={styles.exitModalButtons}>
              <TouchableOpacity 
                style={[styles.exitModalButton, styles.discardButton]}
                onPress={() => {
                  setTexts([]);
                  setActiveId(null);
                  setShowExitModal(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.discardButtonText}>Discard</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.exitModalButton, styles.keepEditingButton]}
                onPress={() => setShowExitModal(false)}
              >
                <Text style={styles.keepEditingButtonText}>Keep Editing</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

/* -------- STYLES -------- */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000",
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  headerButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  nextButton: {
    backgroundColor: "transparent",
  },
  nextButtonText: {
    color: "#0095F6",
    fontSize: 16,
    fontWeight: "600",
  },
  
  // Canvas
  canvas: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
    alignSelf: "center",
  },
  
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  placeholderContent: {
    alignItems: "center",
    gap: 24,
  },
  placeholderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  photoOptions: {
    flexDirection: "row",
    gap: 32,
    marginTop: 24,
  },
  photoOption: {
    alignItems: "center",
    gap: 8,
  },
  photoOptionText: {
    color: "#fff",
    fontSize: 14,
  },
  
  // Text Container
  textContainer: {
    position: "absolute",
  },
  textWrapper: {
    padding: 8,
  },
  textElement: {
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  
  // Selection Controls with Zoom Buttons
  selectionControls: {
    position: "absolute",
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
  },
  cornerButton: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0095F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 1000,
  },
  topLeftCorner: {
    top: -18,
    left: -18,
    backgroundColor: "#FF5C5C", // Red for delete
  },
  topRightCorner: {
    top: -18,
    right: -18,
    backgroundColor: "#FF9F00", // Orange for rotate
  },
  bottomLeftCorner: {
    bottom: -18,
    left: -18,
    backgroundColor: "#32CD32", // Green for zoom out
  },
  bottomRightCorner: {
    bottom: -18,
    right: -18,
    backgroundColor: "#1E90FF", // Blue for zoom in
  },
  selectionBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "#0095F6",
    borderRadius: 6,
    borderStyle: "dashed",
  },
  
  // Editor
  editor: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1A1A1A",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
    maxHeight: height * 0.6,
  },
  editorHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  editorActionButton: {
    padding: 8,
  },
  textPreviewContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  textPreview: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  
  // Quick Controls
  quickControls: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  quickControlsContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 20,
  },
  quickControl: {
    alignItems: "center",
    gap: 4,
    minWidth: 50,
  },
  quickControlText: {
    color: "#fff",
    fontSize: 12,
  },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  fontIcon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  bgIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#666",
  },
  
  // Zoom Controls
  zoomControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
  },
  zoomButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomIndicator: {
    minWidth: 50,
    alignItems: "center",
  },
  zoomText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  resetZoomButton: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#555",
    borderRadius: 10,
  },
  resetZoomText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  
  // Keyboard
  customKeyboard: {
    padding: 10,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 6,
  },
  keyButton: {
    width: (width - 40) / 10,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 6,
    marginHorizontal: 1,
  },
  keyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  keyboardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  specialKey: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 6,
  },
  specialKeyText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emojiKey: {
    width: width * 0.15,
  },
  spaceKey: {
    flex: 1,
    marginHorizontal: 8,
  },
  returnKey: {
    width: width * 0.25,
  },
  backspaceKey: {
    width: 56,
  },
  
  // Bottom Toolbar
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderTopWidth: 0.5,
    borderTopColor: "#333",
  },
  toolbarButton: {
    alignItems: "center",
    gap: 4,
    padding: 8,
  },
  textButtonIcon: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  toolbarButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  
  // Alignment Modal - Full Functionality
  alignmentModal: {
    backgroundColor: "#262626",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  alignmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  alignmentOption: {
    width: (width - 80) / 2,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAlignment: {
    borderColor: "#0095F6",
    backgroundColor: "rgba(0, 149, 246, 0.1)",
  },
  alignmentLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 15,
  },
  selectedAlignmentLabel: {
    color: "#0095F6",
  },
  alignmentPreview: {
    width: '100%',
    padding: 10,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    marginTop: 8,
  },
  alignmentPreviewText: {
    color: "#999",
    fontSize: 12,
    lineHeight: 16,
  },
  alignmentTips: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#333",
  },
  tipsTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  tipsText: {
    color: "#999",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  
  // Color Modal
  colorModal: {
    backgroundColor: "#262626",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  colorScroll: {
    maxHeight: 100,
  },
  colorScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: "#0095F6",
    transform: [{ scale: 1.1 }],
  },
  
  // Font Modal
  fontModal: {
    backgroundColor: "#262626",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  fontScroll: {
    maxHeight: 100,
  },
  fontScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  fontOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#333",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedFont: {
    backgroundColor: "#0095F6",
    borderColor: "#fff",
  },
  fontText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  
  // Exit Modal
  exitModal: {
    backgroundColor: "#262626",
    borderRadius: 15,
    padding: 20,
    width: width * 0.85,
    alignSelf: "center",
  },
  exitModalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  exitModalMessage: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  exitModalButtons: {
    gap: 10,
  },
  exitModalButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  discardButton: {
    backgroundColor: "#FF5C5C",
  },
  discardButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  keepEditingButton: {
    backgroundColor: "#333",
  },
  keepEditingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});