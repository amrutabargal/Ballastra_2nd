import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Search,
  Users,
  Settings,
  Compass,
  Plus,
  Hash,
  Zap,
  ChevronDown,
  ChevronUp,
  Mic,
} from 'lucide-react-native';
import { BASE_URL } from '../config';

export default function CommunityDetails({ navigation }) {
  const [voiceSpaceExpanded, setVoiceSpaceExpanded] = useState(true);
  const [chatSpaceExpanded, setChatSpaceExpanded] = useState(true);
  const [activeVoiceChannel, setActiveVoiceChannel] = useState('Lounge');
  const [activeChatChannel, setActiveChatChannel] = useState('general');

  const [members, setMembers] = useState(0);
  const [communityName, setCommunityName] = useState('Loading...');
  const [nexusError, setNexusError] = useState('');

  const voiceChannels = ['Lounge', 'Team Talk'];

  useEffect(() => {
    const fetchMyNexus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/nexus/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.success && data.data?.length) {
          const first = data.data[0];
          setCommunityName(first.name || 'My Nexus');
          setMembers(first.member_count || 0);
        }
      } catch (err) {
        setNexusError('Could not load your nexus');
      }
    };
    fetchMyNexus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a1628" />

      {/* LEFT SIDEBAR */}
      <View style={styles.leftSidebar}>
        <TouchableOpacity style={styles.sideButton}>
          <Compass size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.sideButton, styles.sideButtonPrimary]}>
          <Plus size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sushiWrapper}>
          <View style={styles.sushiInner}>
            <Text style={styles.sushiEmoji}>🍣</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* MAIN AREA */}
      <View style={styles.mainArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.headerCard}>
            <View style={styles.headerActionsRow}>
              <TouchableOpacity style={styles.headerActionButton}>
                <Search size={18} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.headerActionButton}>
                <Users size={18} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerActionButton}
                onPress={() => navigation.navigate('Nexus_Setting')}
              >
                <Settings size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.communityRow}>
              <View style={styles.communityAvatar}>
                <Text style={styles.communityEmoji}>🍣</Text>
              </View>
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{communityName}</Text>
                <Text style={styles.communityMeta}>
                  {members} Members • Community
                </Text>
                {nexusError ? (
                  <Text style={{ color: 'red' }}>{nexusError}</Text>
                ) : null}
              </View>
            </View>
          </View>

          {/* CHAT SPACE */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeaderRow}
              onPress={() => setChatSpaceExpanded(!chatSpaceExpanded)}
              onLongPress={() =>
                navigation.navigate('Press_Space_Creation_Flow')
              }
              delayLongPress={300}
            >
              <Text style={styles.cardHeaderText}>Chat Space</Text>
              {chatSpaceExpanded ? (
                <ChevronUp size={18} color="#94a3b8" />
              ) : (
                <ChevronDown size={18} color="#94a3b8" />
              )}
            </TouchableOpacity>

            {chatSpaceExpanded && (
              <>
                <TouchableOpacity
                  style={[
                    styles.channelRow,
                    activeChatChannel === 'general' &&
                      styles.channelRowActive,
                  ]}
                  onPress={() => setActiveChatChannel('general')}
                >
                  {activeChatChannel === 'general' && (
                    <View style={styles.activeIndicator} />
                  )}
                  <Hash size={18} color="#3b82f6" />
                  <Text style={styles.channelName}>general</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.channelRow,
                    activeChatChannel === 'announcement' &&
                      styles.channelRowActive,
                  ]}
                  onPress={() => setActiveChatChannel('announcement')}
                >
                  {activeChatChannel === 'announcement' && (
                    <View style={styles.activeIndicator} />
                  )}
                  <Zap size={18} color="#3b82f6" />
                  <Text style={styles.channelName}>announcement</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* VOICE SPACE */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeaderRow}
              onPress={() => setVoiceSpaceExpanded(!voiceSpaceExpanded)}
            >
              <Text style={styles.cardHeaderText}>Voice Space</Text>
              {voiceSpaceExpanded ? (
                <ChevronUp size={18} color="#94a3b8" />
              ) : (
                <ChevronDown size={18} color="#94a3b8" />
              )}
            </TouchableOpacity>

            {voiceSpaceExpanded &&
              voiceChannels.map((channel, i) => {
                const isActive = activeVoiceChannel === channel;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.channelRow,
                      isActive && styles.channelRowActive,
                    ]}
                    onPress={() => setActiveVoiceChannel(channel)}
                  >
                    {isActive && <View style={styles.activeIndicator} />}
                    <Mic
                      size={18}
                      color={isActive ? '#3b82f6' : '#64748b'}
                    />
                    <Text style={styles.channelName}>{channel}</Text>
                    {isActive && <Text style={styles.voiceDot}>●</Text>}
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ===== STYLES (NO CHANGES) ===== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },

  leftSidebar: {
    position: 'absolute',
    left: 12,
    top: 64,
    gap: 12,
    zIndex: 10,
  },

  sideButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#0f1f3d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonPrimary: { backgroundColor: '#2563eb' },

  sushiWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    overflow: 'hidden',
  },
  sushiInner: {
    flex: 1,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sushiEmoji: { fontSize: 20 },

  mainArea: {
    flex: 1,
    marginLeft: 68,
    marginTop: 70,
    marginRight: 12,
    backgroundColor: '#0b1733',
  },

  headerCard: {
    backgroundColor: '#0C142A',
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1d3b7a',
    shadowColor: '#1d3b7a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },

  headerActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },

  headerActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563eb',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  communityRow: { flexDirection: 'row', alignItems: 'center' },

  communityAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },

  communityEmoji: { fontSize: 26 },

  communityInfo: { marginLeft: 12 },

  communityName: { color: '#fff', fontSize: 17, fontWeight: '600' },

  communityMeta: { color: '#94a3b8', marginTop: 2 },

  card: {
    backgroundColor: '#0C142A',
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1d3b7a',
    shadowColor: '#1d3b7a',
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 8,
  },

  cardHeaderRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardHeaderText: { color: '#fff', fontWeight: '600' },

  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },

  channelRowActive: {
    backgroundColor: '#3255BA1A',
    borderRadius: 15,
  },

  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 6,
    bottom: 6,
    width: 3,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },

  channelName: { marginLeft: 10, color: '#8fb3ff', fontSize: 14 },

  voiceDot: { color: '#22c55e', fontSize: 12, marginLeft: 'auto' },
});
