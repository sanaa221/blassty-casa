import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const BusList = ({ data, onSelect }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Lignes Alsa Casablanca</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {data.map((item: any) => (
          <TouchableOpacity key={item.id} style={styles.card} onPress={() => onSelect(item)}>
            <View style={[styles.badge, { backgroundColor: '#FFB300' }]}>
              <Text style={styles.badgeText}>{item.id}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.name.split('-')[1]?.trim() || item.name}</Text>
              <Text style={styles.sub}>
                <MaterialCommunityIcons name="map-marker" size={12} color="#888" /> {item.stops.length} arrêts
              </Text>
            </View>
            <View style={styles.goBtn}>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#4A148C" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginHorizontal: 25, marginVertical: 15 },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginBottom: 12, padding: 12, borderRadius: 20, elevation: 2 },
  badge: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#FFF', fontWeight: '900', fontSize: 18 },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: '700', color: '#333' },
  sub: { fontSize: 13, color: '#888', marginTop: 4 },
  goBtn: { backgroundColor: '#F3E5F5', padding: 8, borderRadius: 12 }
});