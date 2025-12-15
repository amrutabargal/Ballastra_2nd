// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   FlatList,
//   ScrollView,
// } from "react-native";
// import Icon from "react-native-vector-icons/Feather";

// export default function Share_Nexus_Screen({ navigation }) {
//   const [search, setSearch] = useState("");

//   const USERS = [
//     { id: 1, name: "! 7 SUII _Notashish15", avatar: "https://img.icons8.com/color/96/user-female-circle--v1.png" },
//     { id: 2, name: "Lofi#8098", avatar: "https://img.icons8.com/color/96/guest-male--v1.png" },
//     { id: 3, name: "Max gamer58858", avatar: "https://img.icons8.com/color/96/user-male-circle--v1.png" },
//     { id: 4, name: "Gaming Piro Yug", avatar: "https://img.icons8.com/color/96/circled-user-female-skin-type-5--v1.png" },
//     { id: 5, name: "SHERN!", avatar: "https://img.icons8.com/color/96/user-male--v1.png" },
//   ];

//   const filteredUsers = USERS.filter((u) =>
//     u.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       {/* Close button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
//         <Icon name="x" size={28} color="#fff" />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={styles.title}>Share nexus link</Text>

//       {/* Profile Avatar */}
//       <View style={styles.profileSection}>
//         <Image
//           source={{ uri: "https://img.icons8.com/3d-fluency/512/user-male-circle.png" }}
//           style={styles.profileImg}
//         />
//         <Text style={styles.profileName}>Shusshi Clean</Text>
//       </View>

//       {/* Share Icons */}
//       <View style={styles.iconRow}>
//         <TouchableOpacity style={styles.shareIcon}>
//           <Image source={{ uri: "https://img.icons8.com/color/96/whatsapp--v1.png" }} style={styles.icon} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.shareIcon}>
//           <Icon name="link" size={26} color="#fff" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.shareIcon}>
//           <Image source={{ uri: "https://img.icons8.com/color/96/sms.png" }} style={styles.icon} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.shareIcon}>
//           <Image source={{ uri: "https://img.icons8.com/color/96/facebook-messenger--v1.png" }} style={styles.icon} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.shareIcon}>
//           <Image source={{ uri: "https://img.icons8.com/color/96/facebook-new.png" }} style={styles.icon} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.shareIcon}>
//           <Image source={{ uri: "https://img.icons8.com/fluency/96/new-post.png" }} style={styles.icon} />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchBox}>
//         <Icon name="search" size={20} color="#9BA4C1" style={{ marginRight: 8 }} />
//         <TextInput
//           placeholder="Search users..."
//           placeholderTextColor="#8B96B2"
//           value={search}
//           onChangeText={setSearch}
//           style={styles.searchInput}
//         />
//       </View>

//       {/* User List */}
//       <FlatList
//         data={filteredUsers}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 80 }}
//         renderItem={({ item }) => (
//           <View style={styles.userRow}>
//             <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
//             <Text style={styles.userName}>{item.name}</Text>

//             <TouchableOpacity style={styles.sentButton}>
//               <Text style={styles.sentText}>Sent</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// /* ================= STYLES ================= */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020A1A",
//     padding: 20,
//   },

//   closeBtn: {
//     alignSelf: "flex-start",
//     marginBottom: 12,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 15,
//   },

//   profileSection: {
//     alignItems: "center",
//     marginBottom: 25,
//   },

//   profileImg: {
//     width: 90,
//     height: 90,
//     borderRadius: 100,
//     marginBottom: 10,
//   },

//   profileName: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },

//   iconRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 25,
//   },

//   shareIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     backgroundColor: "#081832",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   icon: {
//     width: 35,
//     height: 35,
//   },

//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0D1C35",
//     height: 48,
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     marginBottom: 18,
//   },

//   searchInput: {
//     color: "#fff",
//     flex: 1,
//   },

//   userRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//   },

//   userAvatar: {
//     width: 45,
//     height: 45,
//     borderRadius: 50,
//     marginRight: 12,
//   },

//   userName: {
//     color: "#fff",
//     flex: 1,
//     fontSize: 14,
//   },

//   sentButton: {
//     backgroundColor: "#143C80",
//     paddingVertical: 6,
//     paddingHorizontal: 18,
//     borderRadius: 20,
//   },

//   sentText: {
//     color: "#B8C8EA",
//     fontSize: 13,
//     fontWeight: "600",
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Share_Nexus_Screen({ navigation }) {
  const [search, setSearch] = useState("");

  const USERS = [
    { id: 1, name: "! 7 SUII _Notashish15", avatar: "https://img.icons8.com/color/96/user-female-circle--v1.png" },
    { id: 2, name: "Lofi#8098", avatar: "https://img.icons8.com/color/96/guest-male--v1.png" },
    { id: 3, name: "Max gamer58858", avatar: "https://img.icons8.com/color/96/user-male-circle--v1.png" },
    { id: 4, name: "Gaming Piro Yug", avatar: "https://img.icons8.com/color/96/circled-user-female-skin-type-5--v1.png" },
    { id: 5, name: "SHERN!", avatar: "https://img.icons8.com/color/96/user-male--v1.png" },
  ];

  const filteredUsers = USERS.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
        <Icon name="x" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Share nexus link</Text>

      {/* Profile Avatar */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://img.icons8.com/3d-fluency/512/user-male-circle.png" }}
          style={styles.profileImg}
        />
        <Text style={styles.profileName}>Shusshi Clean</Text>
      </View>

      {/* Share Icons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.shareIcon}>
          <Image source={{ uri: "https://img.icons8.com/color/96/whatsapp--v1.png" }} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareIcon}>
          <Icon name="link" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareIcon}>
          <Image source={{ uri: "https://img.icons8.com/color/96/sms.png" }} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareIcon}>
          <Image source={{ uri: "https://img.icons8.com/color/96/facebook-messenger--v1.png" }} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareIcon}>
          <Image source={{ uri: "https://img.icons8.com/color/96/facebook-new.png" }} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareIcon}>
          <Image source={{ uri: "https://img.icons8.com/fluency/96/new-post.png" }} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Icon name="search" size={20} color="#9BA4C1" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search users..."
          placeholderTextColor="#8B96B2"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
            <Text style={styles.userName}>{item.name}</Text>

            <TouchableOpacity style={styles.sentButton}>
              <Text style={styles.sentText}>Sent</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020A1A",
    padding: 20,
  },

  closeBtn: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginBottom: 10,
  },

  profileName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  shareIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#081832",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 35,
    height: 35,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1C35",
    height: 48,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchInput: {
    color: "#fff",
    flex: 1,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 12,
  },

  userName: {
    color: "#fff",
    flex: 1,
    fontSize: 14,
  },

  sentButton: {
    backgroundColor: "#143C80",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },

  sentText: {
    color: "#B8C8EA",
    fontSize: 13,
    fontWeight: "600",
  },
});
