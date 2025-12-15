// import React, { useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Animated,
//   StyleSheet,
//   Easing,
// } from "react-native";
// import Svg, { Path } from "react-native-svg";

// const { width, height } = Dimensions.get("window");

// export default function OnboardingScreen({ navigation }) {
//   const slideAnim = useRef(new Animated.Value(width)).current; // start from right

//   useEffect(() => {
//     const animate = () => {
//       slideAnim.setValue(width);

//       Animated.timing(slideAnim, {
//         toValue: -width,
//         duration: 6000, // smooth continuous speed
//         easing: Easing.linear,
//         useNativeDriver: true,
//       }).start(() => animate());
//     };

//     animate();
//   }, []);

//   const handleNext = () => navigation.navigate("v3");

//   return (
//     <View style={styles.container}>
//       {/* TOP LABEL */}
//       <View style={styles.logoWrapper}>
//         <Image
//           source={require("../../assets/Text.png")}
//           style={styles.welcomeLabel}
//           resizeMode="contain"
//         />
//       </View>

//       {/* LEFT SLIDING IMAGE */}
//       <Animated.Image
//         source={require("../../assets/Frame 3.png")}
//         style={[
//           styles.sideImage,
//           {
//             transform: [{ translateX: slideAnim }],
//             left: -width * 0.12,
//           },
//         ]}
//         resizeMode="cover"
//         blurRadius={1.5}
//       />

//       {/* RIGHT SLIDING IMAGE */}
//       <Animated.Image
//         source={require("../../assets/Frame 2.png")}
//         style={[
//           styles.sideImage,
//           {
//             transform: [{ translateX: slideAnim }],
//             right: -width * 0.12,
//           },
//         ]}
//         resizeMode="cover"
//         blurRadius={1.5}
//       />

//       {/* MAIN CARD */}
//       <Animated.View
//         style={[
//           styles.cardWrapper,
//           {
//             transform: [{ translateX: slideAnim }],
//           },
//         ]}
//       >
//         <Image
//           source={require("../../assets/Frame 1 (1).png")}
//           style={styles.cardImage}
//           resizeMode="cover"
//         />
//       </Animated.View>

//       {/* TITLE WITH ICON */}
//       <View style={styles.titleRow}>
//         <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//           <Path
//             d="M5.63232 14.8513C6.62344 15.4229 7.7734 15.75 8.99973 15.75C12.7277 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 10.2263 2.57703 11.3763 3.14864 12.3674L3.15086 12.3712C3.20586 12.4666 3.23359 12.5147 3.24616 12.5601C3.258 12.603 3.26131 12.6415 3.25828 12.6859C3.25502 12.7336 3.23895 12.783 3.20601 12.8818L2.62939 14.6117L2.62867 14.614C2.50701 14.9789 2.44618 15.1614 2.48954 15.283C2.52734 15.389 2.61126 15.4727 2.71729 15.5105C2.83861 15.5538 3.02028 15.4932 3.38366 15.3721L3.38818 15.3704L5.11804 14.7938C5.21653 14.761 5.2666 14.7443 5.31419 14.7411C5.35856 14.7381 5.39683 14.7421 5.4397 14.7539C5.48526 14.7665 5.53338 14.7942 5.62923 14.8495L5.63232 14.8513Z"
//             stroke="white"
//             strokeWidth="1.2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </Svg>

//         <Text style={styles.featureTitle}>Chat</Text>
//       </View>

//       {/* DESCRIPTION */}
//       <Text style={styles.featureDesc}>
//         Chat made brighter.{"\n"}Powered by voices, moments, and Ballastra AI.
//       </Text>

//       {/* NEXT BUTTON */}
//       <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
//         <Text style={styles.nextText}>Next   →</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width,
//     height: 865,
//     backgroundColor: "#050B22",
//     alignItems: "center",
//   },

//   logoWrapper: {
//     position: "absolute",
//     top: height * 0.06,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//     zIndex: 10,
//   },

//   welcomeLabel: {
//     width: width * 0.95,
//     height: height * 0.1,
//   },

//   sideImage: {
//     position: "absolute",
//     top: height * 0.25,
//     width: width * 0.42,
//     height: height * 0.39,
//     borderRadius: 25,
//   },

//   cardWrapper: {
//     width: width * 0.62,
//     height: height * 0.42,
//     borderRadius: 32,
//     overflow: "hidden",
//     marginTop: height * 0.17,
//     elevation: 8,
//   },

//   cardImage: {
//     width: "100%",
//     height: "100%",
//   },

//   titleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginTop: height * 0.09,
//   },

//   featureTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "400",
//   },

//   featureDesc: {
//     color: "#ffffff",
//     width: "82%",
//     textAlign: "center",
//     fontSize: 14,
//     fontWeight: "400",
//     marginTop: height * 0.02,
//     lineHeight: 20,
//   },

//   nextBtn: {
//     backgroundColor: "#3255BA",
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 25,
//     paddingVertical: 12,
//     paddingHorizontal: 29,
//   },

//   nextText: {
//     color: "#fff",
//     fontWeight: "500",
//     fontSize: 14,
//     letterSpacing: 0.5,
//   },
// });
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  Easing,
  ImageBackground,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      slideAnim.setValue(0);
      Animated.timing(slideAnim, {
        toValue: -width * 1.6,   // smoother, more distance → no overlap
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, []);

  const handleNext = () => navigation.navigate("v3");

  return (
    <ImageBackground
      source={require("../../assets/image1.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* TOP LABEL */}
      <View style={styles.logoWrapper}>
        <Image
          source={require("../../assets/Text.png")}
          style={styles.welcomeLabel}
          resizeMode="contain"
        />
      </View>

      {/* LEFT SLIDING IMAGE */}
      <Animated.Image
        source={require("../../assets/Frame 1 (1).png")}
        style={[
          styles.sideImage,
          {
            transform: [{ translateX: slideAnim }],
            left: -width * 0.25,   // shifted left with gap
          },
        ]}
        resizeMode="cover"
      />

      {/* RIGHT SLIDING IMAGE */}
      <Animated.Image
        source={require("../../assets/Frame 1 (1).png")}
        style={[
          styles.sideImage,
          {
            transform: [{ translateX: slideAnim }],
            right: -width * 0.25,  // shifted right with gap
          },
        ]}
        resizeMode="cover"
      />

      {/* MAIN CARD */}
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <Image
          source={require("../../assets/Frame 1 (1).png")}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* TITLE WITH ICON */}
      <View style={styles.titleRow}>
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <Path
            d="M5.63232 14.8513C6.62344 15.4229 7.7734 15.75 8.99973 15.75C12.7277 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 10.2263 2.57703 11.3763 3.14864 12.3674L3.15086 12.3712C3.20586 12.4666 3.23359 12.5147 3.24616 12.5601C3.258 12.603 3.26131 12.6415 3.25828 12.6859C3.25502 12.7336 3.23895 12.783 3.20601 12.8818L2.62939 14.6117L2.62867 14.614C2.50701 14.9789 2.44618 15.1614 2.48954 15.283C2.52734 15.389 2.61126 15.4727 2.71729 15.5105C2.83861 15.5538 3.02028 15.4932 3.38366 15.3721L3.38818 15.3704L5.11804 14.7938C5.21653 14.761 5.2666 14.7443 5.31419 14.7411C5.35856 14.7381 5.39683 14.7421 5.4397 14.7539C5.48526 14.7665 5.53338 14.7942 5.62923 14.8495L5.63232 14.8513Z"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </Svg>

        <Text style={styles.featureTitle}>Chat</Text>
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.featureDesc}>
        Chat made brighter.{"\n"}Powered by voices, moments, and Ballastra AI.
      </Text>

      {/* NEXT BUTTON */}
      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextText}>Next   →</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 865,
    backgroundColor: "#050B22",
    alignItems: "center",
    overflow: "hidden",
  },

  logoWrapper: {
    position: "absolute",
    top: height * 0.06,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },

  welcomeLabel: {
    width: width * 0.95,
    height: height * 0.1,
  },

  sideImage: {
    position: "absolute",
    top: height * 0.25,
    width: width * 0.55,     // Smaller width → no overlap
    height: height * 0.39,
    borderRadius: 25,
    marginHorizontal: 20,    // GAP added between images
  },

  cardWrapper: {
    width: width * 0.62,
    height: height * 0.42,
    borderRadius: 32,
    overflow: "hidden",
    marginTop: height * 0.17,
    elevation: 8,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: height * 0.09,
  },

  featureTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },

  featureDesc: {
    color: "#ffffff",
    width: "82%",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    marginTop: height * 0.02,
    lineHeight: 20,
  },

  nextBtn: {
    backgroundColor: "#3255BA",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 29,
  },

  nextText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
