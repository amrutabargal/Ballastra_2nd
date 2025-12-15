import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TEMP_AVATAR = 'https://i.pravatar.cc/150?img=12';

const TABS = ['Members', 'Media', 'Pins', 'Links', 'Files'];

const members = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: '!?SUll_Notashish15',
  avatar: TEMP_AVATAR,
}));

export default function MemberScreen() {
  const renderMember = ({ item }) => (
    <TouchableOpacity style={styles.memberCard} activeOpacity={0.8}>
      <View style={styles.memberLeft}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text numberOfLines={1} style={styles.memberName}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.memberSubtitle}>Active • Online</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#A9C0FF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={26} color="#CFE1FF" />
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Feather name="search" size={18} color="#CFE1FF" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="notifications-outline" size={18} color="#CFE1FF" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Feather name="users" size={18} color="#CFE1FF" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Feather name="settings" size={18} color="#CFE1FF" /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.centerProfile}>
        <View style={styles.hashtagBox}>
          <Text style={styles.hashText}>#</Text>
        </View>
        <Text style={styles.channelText}>&lt; media, &gt;</Text>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((t, idx) => (
          <TouchableOpacity key={t} style={[styles.tabItem, idx === 0 && styles.tabActive]}>
            <Text style={[styles.tabText, idx === 0 && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={members}
        keyExtractor={(i) => i.id}
        renderItem={renderMember}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07112a',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(169,192,255,0.06)'
  },
  centerProfile: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 6,
  },
  hashtagBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(169,192,255,0.14)',
    backgroundColor: 'rgba(13,25,52,0.25)'
  },
  hashText: {
    color: '#86A6FF',
    fontSize: 26,
    fontWeight: '700',
  },
  channelText: {
    marginTop: 8,
    color: '#CFE1FF',
    fontSize: 13,
    opacity: 0.9,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingHorizontal: 6,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  tabText: {
    color: '#9FB6FF',
    fontSize: 13,
  },
  tabActive: {
    backgroundColor: 'rgba(138,162,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(138,162,255,0.18)'
  },
  tabTextActive: {
    color: '#DFF0FF',
    fontWeight: '600'
  },
  listContent: {
    paddingVertical: 18,
    paddingBottom: 60,
  },
  memberCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(86,122,255,0.09)',
    padding: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width - 120,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  memberName: {
    color: '#E8F3FF',
    fontSize: 15,
    fontWeight: '600',
    maxWidth: width - 180,
  },
  memberSubtitle: {
    color: '#9FB6FF',
    fontSize: 12,
    marginTop: 2,
  }
});
