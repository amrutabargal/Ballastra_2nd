
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import SingleStar from "../../assets/single_star.png";
import Stars from "../../assets/Starts.png";

export default function NexusTypeScreen({ navigation }) {

  return (
    <View style={styles.container}>

      {/* ✅ Proper Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>What kind of Nexus are you building?</Text>

      <Text style={styles.subtitle}>
        This helps us shape your Nexus experience.{"\n"}Who's it for?
      </Text>

      {/* Options */}
      <View style={{ marginTop: 20 }}>
        
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("Build_Your_Nexus")}
        >
          <Image source={SingleStar} style={styles.icon} />
          <Text style={styles.optionText}>For me and my orbit circle</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate("Build_Your_Nexus")}
        >
          <Image source={Stars} style={styles.icon} />
          <Text style={styles.optionText}>For a public community space</Text>
        </TouchableOpacity>

      </View>

      {/* Skip */}
      <TouchableOpacity 
        style={{ marginTop: 40 }} 
        onPress={() => navigation.navigate("Build_Your_Nexus")}
      >
        <Text style={styles.skip}>
          Not sure yet? <Text style={{ color: "#4da6ff" }}>skip</Text> for now.
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020b22',
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  /* ✅ Clean Back Button Style */
  backButton: {
    width: 22,
    height: 22,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    marginTop:40,
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    textAlign: "center",
  },

  subtitle: {
    color: '#BDBDBD',
    marginTop: 5,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: "center",
  },

  option: {
    width: '100%',
    backgroundColor: '#3154BA4D',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height:44,
    borderWidth: 1,
  borderColor: "#3154BA",

  // ⭐ Shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,

  // ⭐ Shadow for Android
  elevation: 8,
  },

  optionText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 15,
    fontWeight: '500',
  },

  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  skip: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    fontWeight: '500',
  },
});
