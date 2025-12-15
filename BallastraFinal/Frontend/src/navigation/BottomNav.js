// // // import React from "react";
// // // import { View, TouchableOpacity, Text } from "react-native";
// // // import { Home, MessageCircle, Bell, User } from "lucide-react-native";

// // // export default function BottomNav({ navigation, active }) {
// // //   return (
// // //     <View
// // //       style={{
// // //         flexDirection: "row",
// // //         justifyContent: "space-around",
// // //         alignItems: "center",
// // //         height: 70,
// // //         backgroundColor: "#0B0E1E",
// // //         borderTopWidth: 0.5,
// // //         borderTopColor: "#1d233d",
// // //       }}
// // //     >
// // //       {/* Home */}
// // //       <TouchableOpacity onPress={() => navigation.navigate("Home")}>
// // //         <Home size={28} color={active === "home" ? "#6B7AFF" : "#6e6e6e"} />
// // //       </TouchableOpacity>

// // //       {/* Chat */}
// // //       <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
// // //         <MessageCircle
// // //           size={28}
// // //           color={active === "chat" ? "#6B7AFF" : "#6e6e6e"}
// // //         />
// // //       </TouchableOpacity>

// // //       {/* Notifications */}
// // //       <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
// // //         <Bell
// // //           size={28}
// // //           color={active === "notifications" ? "#6B7AFF" : "#6e6e6e"}
// // //         />
// // //       </TouchableOpacity>

// // //       {/* Profile */}
// // //       <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
// // //         <User
// // //           size={28}
// // //           color={active === "profile" ? "#6B7AFF" : "#6e6e6e"}
// // //         />
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // }
// // import React from "react";
// // import { View, TouchableOpacity, Text, ScrollView } from "react-native";
// // import { Home, MessageCircle, Bell, User } from "lucide-react-native";

// // export default function BottomNav({ navigation, active }) {
// //   return (
// //     <View>
// //       {/* Horizontal Templates List */}
// //       <ScrollView
// //         horizontal
// //         showsHorizontalScrollIndicator={false}
// //         style={{
// //           backgroundColor: "#0B0E1E",
// //           paddingVertical: 10,
// //           paddingLeft: 15,
// //         }}
// //       >
// //         {["Template 1", "Template 2", "Template 3", "Template 4"].map(
// //           (item, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               style={{
// //                 backgroundColor: "#14182C",
// //                 paddingHorizontal: 20,
// //                 paddingVertical: 10,
// //                 borderRadius: 12,
// //                 marginRight: 12,
// //                 borderWidth: 1,
// //                 borderColor: "#1e2648",
// //               }}
// //             >
// //               <Text style={{ color: "white", fontSize: 14 }}>{item}</Text>
// //             </TouchableOpacity>
// //           )
// //         )}
// //       </ScrollView>

// //       {/* Explore Nexus Button */}
// //       <TouchableOpacity
// //         onPress={() => navigation.navigate("Explore_Nexus")}
// //         style={{
// //           backgroundColor: "#6B7AFF",
// //           marginHorizontal: 20,
// //           paddingVertical: 12,
// //           borderRadius: 14,
// //           alignItems: "center",
// //           marginBottom: 8,
// //           marginTop: 5,
// //         }}
// //       >
// //         <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
// //           Explore Nexus
// //         </Text>
// //       </TouchableOpacity>

// //       {/* Bottom Navigation */}
// //       <View
// //         style={{
// //           flexDirection: "row",
// //           justifyContent: "space-around",
// //           alignItems: "center",
// //           height: 70,
// //           backgroundColor: "#0B0E1E",
// //           borderTopWidth: 0.5,
// //           borderTopColor: "#1d233d",
// //         }}
// //       >
// //         {/* Home */}
// //         <TouchableOpacity onPress={() => navigation.navigate("Home")}>
// //           <Home size={28} color={active === "home" ? "#6B7AFF" : "#6e6e6e"} />
// //         </TouchableOpacity>

// //         {/* Chat */}
// //         <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
// //           <MessageCircle
// //             size={28}
// //             color={active === "chat" ? "#6B7AFF" : "#6e6e6e"}
// //           />
// //         </TouchableOpacity>

// //         {/* Notifications */}
// //         <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
// //           <Bell
// //             size={28}
// //             color={active === "notifications" ? "#6B7AFF" : "#6e6e6e"}
// //           />
// //         </TouchableOpacity>

// //         {/* Profile */}
// //         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
// //           <User
// //             size={28}
// //             color={active === "profile" ? "#6B7AFF" : "#6e6e6e"}
// //           />
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }
// // App.js  (किंवा Navigation.js)
// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Svg, { Path } from "react-native-svg";
// import { View, Text } from "react-native";

// import ChatScreen from "./src/screens/ChatScreen"; // तुमचा UI वाला स्क्रीन

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // ----- SVG Icons -----
// const HomeIcon = ({ focused }) => (
//   <Svg width={22} height={22} viewBox="0 0 24 24">
//     <Path
//       d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1v-9.5z"
//       fill={focused ? "#ffffff" : "#64748B"}
//     />
//   </Svg>
// );

// const ChatIcon = ({ focused }) => (
//   <Svg width={22} height={22} viewBox="0 0 24 24">
//     <Path
//       d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5.5L9 20.5V16H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
//       fill={focused ? "#ffffff" : "#64748B"}
//     />
//   </Svg>
// );

// const BellIcon = ({ focused }) => (
//   <Svg width={22} height={22} viewBox="0 0 24 24">
//     <Path
//       d="M12 3a4 4 0 0 0-4 4v2.3c0 .52-.2 1.02-.57 1.39L6 12.12V14h12v-1.88l-1.43-1.43A1.97 1.97 0 0 1 16 9.3V7a4 4 0 0 0-4-4zm0 18a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 21z"
//       fill={focused ? "#ffffff" : "#64748B"}
//     />
//   </Svg>
// );

// const UserIcon = ({ focused }) => (
//   <Svg width={22} height={22} viewBox="0 0 24 24">
//     <Path
//       d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 1.5c-2.67 0-8 1.34-8 4v1.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V17.5c0-2.66-5.33-4-8-4z"
//       fill={focused ? "#ffffff" : "#64748B"}
//     />
//   </Svg>
// );

// // dummy screens
// const HomeScreen = () => (
//   <View style={{ flex: 1, backgroundColor: "#020617", alignItems: "center", justifyContent: "center" }}>
//     <Text style={{ color: "#fff" }}>Home</Text>
//   </View>
// );

// const NotificationsScreen = () => (
//   <View style={{ flex: 1, backgroundColor: "#020617", alignItems: "center", justifyContent: "center" }}>
//     <Text style={{ color: "#fff" }}>Notifications</Text>
//   </View>
// );

// const ProfileScreen = () => (
//   <View style={{ flex: 1, backgroundColor: "#020617", alignItems: "center", justifyContent: "center" }}>
//     <Text style={{ color: "#fff" }}>Profile</Text>
//   </View>
// );

// // Chat साठी stack (future ला वेगवेगळे chat detail screens add करता येतील)
// function ChatStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="ChatScreen" component={ChatScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: "#020617",
//             borderTopColor: "#1E293B",
//             borderTopWidth: 0.6,
//             height: 70,
//           },
//           tabBarActiveTintColor: "#FFFFFF",
//           tabBarInactiveTintColor: "#64748B",
//           tabBarIcon: ({ focused }) => {
//             if (route.name === "Home") return <HomeIcon focused={focused} />;
//             if (route.name === "Chat") return <ChatIcon focused={focused} />;
//             if (route.name === "Notifications") return <BellIcon focused={focused} />;
//             if (route.name === "You") return <UserIcon focused={focused} />;
//           },
//           tabBarLabelStyle: {
//             fontSize: 11,
//             marginBottom: 8,
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         {/* 👇 इथे Chat tab ला ChatScreen जोडले आहे */}
//         <Tab.Screen name="Chat" component={ChatStack} />
//         <Tab.Screen name="Notifications" component={NotificationsScreen} />
//         <Tab.Screen name="You" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
// // import React from "react";
// // import { View, TouchableOpacity, Text } from "react-native";
// // import { Home, MessageCircle, Bell, User } from "lucide-react-native";

// // export default function BottomNav({ navigation, active }) {
// //   return (
// //     <View
// //       style={{
// //         flexDirection: "row",
// //         justifyContent: "space-around",
// //         alignItems: "center",
// //         height: 70,
// //         backgroundColor: "#0B0E1E",
// //         borderTopWidth: 0.5,
// //         borderTopColor: "#1d233d",
// //       }}
// //     >
// //       {/* Home */}
// //       <TouchableOpacity onPress={() => navigation.navigate("Home")}>
// //         <Home size={28} color={active === "home" ? "#6B7AFF" : "#6e6e6e"} />
// //       </TouchableOpacity>

// //       {/* Chat */}
// //       <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
// //         <MessageCircle
// //           size={28}
// //           color={active === "chat" ? "#6B7AFF" : "#6e6e6e"}
// //         />
// //       </TouchableOpacity>

// //       {/* Notifications */}
// //       <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
// //         <Bell
// //           size={28}
// //           color={active === "notifications" ? "#6B7AFF" : "#6e6e6e"}
// //         />
// //       </TouchableOpacity>

// //       {/* Profile */}
// //       <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
// //         <User
// //           size={28}
// //           color={active === "profile" ? "#6B7AFF" : "#6e6e6e"}
// //         />
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }
// import React from "react";
// import { View, TouchableOpacity, Text, ScrollView } from "react-native";
// import { Home, MessageCircle, Bell, User } from "lucide-react-native";

// export default function BottomNav({ navigation, active }) {
//   return (
//     <View>
//       {/* Horizontal Templates List */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{
//           backgroundColor: "#0B0E1E",
//           paddingVertical: 10,
//           paddingLeft: 15,
//         }}
//       >
//         {["Template 1", "Template 2", "Template 3", "Template 4"].map(
//           (item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={{
//                 backgroundColor: "#14182C",
//                 paddingHorizontal: 20,
//                 paddingVertical: 10,
//                 borderRadius: 12,
//                 marginRight: 12,
//                 borderWidth: 1,
//                 borderColor: "#1e2648",
//               }}
//             >
//               <Text style={{ color: "white", fontSize: 14 }}>{item}</Text>
//             </TouchableOpacity>
//           )
//         )}
//       </ScrollView>

//       {/* Explore Nexus Button */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate("Explore_Nexus")}
//         style={{
//           backgroundColor: "#6B7AFF",
//           marginHorizontal: 20,
//           paddingVertical: 12,
//           borderRadius: 14,
//           alignItems: "center",
//           marginBottom: 8,
//           marginTop: 5,
//         }}
//       >
//         <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
//           Explore Nexus
//         </Text>
//       </TouchableOpacity>

//       {/* Bottom Navigation */}
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-around",
//           alignItems: "center",
//           height: 70,
//           backgroundColor: "#0B0E1E",
//           borderTopWidth: 0.5,
//           borderTopColor: "#1d233d",
//         }}
//       >
//         {/* Home */}
//         <TouchableOpacity onPress={() => navigation.navigate("Home")}>
//           <Home size={28} color={active === "home" ? "#6B7AFF" : "#6e6e6e"} />
//         </TouchableOpacity>

//         {/* Chat */}
//         <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
//           <MessageCircle
//             size={28}
//             color={active === "chat" ? "#6B7AFF" : "#6e6e6e"}
//           />
//         </TouchableOpacity>

//         {/* Notifications */}
//         <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
//           <Bell
//             size={28}
//             color={active === "notifications" ? "#6B7AFF" : "#6e6e6e"}
//           />
//         </TouchableOpacity>

//         {/* Profile */}
//         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//           <User
//             size={28}
//             color={active === "profile" ? "#6B7AFF" : "#6e6e6e"}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
// App.js  (किंवा Navigation.js)
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Svg, { Path } from "react-native-svg";
import { View, Text } from "react-native";

import ChatScreen from "./src/screens/ChatScreen"; // तुमचा UI वाला स्क्रीन

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ----- SVG Icons -----
const HomeIcon = ({ focused }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1v-9.5z"
      fill={focused ? "#ffffff" : "#64748B"}
    />
  </Svg>
);

const ChatIcon = ({ focused }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5.5L9 20.5V16H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
      fill={focused ? "#ffffff" : "#64748B"}
    />
  </Svg>
);

const BellIcon = ({ focused }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M12 3a4 4 0 0 0-4 4v2.3c0 .52-.2 1.02-.57 1.39L6 12.12V14h12v-1.88l-1.43-1.43A1.97 1.97 0 0 1 16 9.3V7a4 4 0 0 0-4-4zm0 18a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 21z"
      fill={focused ? "#ffffff" : "#64748B"}
    />
  </Svg>
);

const UserIcon = ({ focused }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 1.5c-2.67 0-8 1.34-8 4v1.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V17.5c0-2.66-5.33-4-8-4z"
      fill={focused ? "#ffffff" : "#64748B"}
    />
  </Svg>
);

// dummy screens
const HomeScreen = () => (
  <View style={{ flex: 1, backgroundColor: "#020617", alignItems: "center", justifyContent: "center" }}>
    <Text style={{ color: "#fff" }}>Home</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={{ flex: 1, backgroundColor: "#020617", alignItems: "center", justifyContent: "center" }}>
    <Text style={{ color: "#fff" }}>Notifications</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, backgroundColor: "#020617", alignItems: "center", justifyContent: "center" }}>
    <Text style={{ color: "#fff" }}>Profile</Text>
  </View>
);

// Chat साठी stack (future ला वेगवेगळे chat detail screens add करता येतील)
function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#020617",
            borderTopColor: "#1E293B",
            borderTopWidth: 0.6,
            height: 70,
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#64748B",
          tabBarIcon: ({ focused }) => {
            if (route.name === "Home") return <HomeIcon focused={focused} />;
            if (route.name === "Chat") return <ChatIcon focused={focused} />;
            if (route.name === "Notifications") return <BellIcon focused={focused} />;
            if (route.name === "You") return <UserIcon focused={focused} />;
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginBottom: 8,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* 👇 इथे Chat tab ला ChatScreen जोडले आहे */}
        <Tab.Screen name="Chat" component={ChatStack} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="You" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
