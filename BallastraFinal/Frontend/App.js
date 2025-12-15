
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { Dimensions } from 'react-native';

// Provide global scale helpers so individual screens can use `scale()`
// without needing to define it in every file.
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
global.scale = (size) => (SCREEN_W / guidelineBaseWidth) * size;
global.verticalScale = (size) => (SCREEN_H / guidelineBaseHeight) * size;
global.moderateScale = (size, factor = 0.5) => size + (global.scale(size) - size) * factor;

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
