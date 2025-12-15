

import React, { useEffect, useRef } from 'react';
import { View, PanResponder, Image, Animated, StyleSheet } from 'react-native';
import Images from '../../assets/logo.png';


export default function Logoscreen({ navigation }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20, // detect horizontal swipe
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // swipe left → go to v2
          navigation.navigate('v2');
        }
      },
    })
  ).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto navigate after 2s (optional)
      navigation.navigate('v2');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>

      <Image
        source={Images}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c053aff', justifyContent: 'center', alignItems: 'center' },
});
