// import React from "react";
// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import Icon from "react-native-vector-icons/Feather";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function Footer() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const current = route.name;

//   const isActive = (name) => current === name;

//   return (
//     <LinearGradient
//       colors={["#111827", "#0b0f1f"]}
//       style={styles.container}
//     >
//       {/* Home */}
//       <TouchableOpacity
//         style={styles.tab}
//         onPress={() => navigation.navigate("Home")}
//       >
//         <Icon
//           name="home"
//           size={24}
//           color={isActive("Home") ? "#ffffff" : "#7b7b8c"}
//         />
//         <Text
//           style={[styles.label, isActive("Home") && styles.activeLabel]}
//         >
//           Home
//         </Text>
//       </TouchableOpacity>

//       {/* Chat */}
//       <TouchableOpacity
//         style={styles.tab}
//         onPress={() => navigation.navigate("Chat")}
//       >
//         <Icon
//           name="message-circle"
//           size={24}
//           color={isActive("Chat") ? "#ffffff" : "#7b7b8c"}
//         />
//         <Text
//           style={[styles.label, isActive("Chat") && styles.activeLabel]}
//         >
//           Chat
//         </Text>
//       </TouchableOpacity>

//       {/* Notifications */}
//       <TouchableOpacity
//         style={styles.tab}
//         onPress={() => navigation.navigate("Notifications")}
//       >
//         <Icon
//           name="bell"
//           size={24}
//           color={isActive("Notifications") ? "#ffffff" : "#7b7b8c"}
//         />
//         <Text
//           style={[
//             styles.label,
//             isActive("Notifications") && styles.activeLabel,
//           ]}
//         >
//           Notifications
//         </Text>
//       </TouchableOpacity>

//       {/* You / Profile */}
//       <TouchableOpacity
//         style={styles.tab}
//         onPress={() => navigation.navigate("Profile")}
//       >
//         <Icon
//           name="user"
//           size={24}
//           color={isActive("Profile") ? "#ffffff" : "#7b7b8c"}
//         />
//         <Text
//           style={[styles.label, isActive("Profile") && styles.activeLabel]}
//         >
//           You
//         </Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 75,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingBottom: 10,
//     paddingTop: 8,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",

//     // subtle elevation
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: -4 },
//     shadowRadius: 10,
//   },

//   tab: {
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   label: {
//     color: "#7b7b8c",
//     fontSize: 11,
//     marginTop: 4,
//   },

//   activeLabel: {
//     color: "#ffffff",
//     fontWeight: "600",
//   },
// });
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;

  const isActive = (name) => current === name;

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon
          name="home"
          size={24}
          color={isActive("Home") ? "#ffffff" : "#7b7b8c"}
        />
        <Text style={[styles.label, isActive("Home") && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Chat */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Chat")}
      >
        <Icon
          name="message-circle"
          size={24}
          color={isActive("Chat") ? "#ffffff" : "#7b7b8c"}
        />
        <Text style={[styles.label, isActive("Chat") && styles.activeLabel]}>
          Chat
        </Text>
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Icon
          name="bell"
          size={24}
          color={isActive("Notifications") ? "#ffffff" : "#7b7b8c"}
        />
        <Text
          style={[
            styles.label,
            isActive("Notifications") && styles.activeLabel,
          ]}
        >
          Notifications
        </Text>
      </TouchableOpacity>

      {/* You */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon
          name="user"
          size={24}
          color={isActive("Profile") ? "#ffffff" : "#7b7b8c"}
        />
        <Text style={[styles.label, isActive("Profile") && styles.activeLabel]}>
          You
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#0B1020",   // solid dark background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 10,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#7b7b8c",
    fontSize: 11,
    marginTop: 4,
  },
  activeLabel: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
