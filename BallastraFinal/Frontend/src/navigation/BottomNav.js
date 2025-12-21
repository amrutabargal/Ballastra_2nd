
// App.js  (किंवा Navigation.js)
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Svg, { Path } from "react-native-svg";
import { View, Text } from "react-native";

import ChatScreen from "./src/screens/ChatScreen"; // तुमचा UI वाला स्क्रीन
import MessagesScreen from "../screens/MessageScreen";

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
            marginBottom: 50,
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#64748B",
          tabBarIcon: ({ focused }) => {
            if (route.name === "Home") return <HomeIcon focused={focused} />;
            if (route.name === "Message") return <ChatIcon focused={focused} />;
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
        <Tab.Screen name="Chat" component={MessagesScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="You" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}