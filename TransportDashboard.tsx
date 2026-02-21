import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassTheme } from '../constants/GlassTheme';
import { BlurView } from 'expo-blur';

type Mode = 'Tram' | 'Bus' | 'Busway' | 'Taxi' | 'Parking' | 'TNS';

interface Props {
    onModeSelect: (mode: Mode) => void;
}

const { width } = Dimensions.get('window');

export const TransportDashboard = ({ onModeSelect }: Props) => {
    const modes: { name: Mode; icon: any; color: string }[] = [
        { name: 'Tram', icon: 'tram', color: GlassTheme.colors.transport.tram },
        { name: 'Bus', icon: 'bus', color: GlassTheme.colors.transport.bus },
        { name: 'Busway', icon: 'bus-articulated-front', color: GlassTheme.colors.transport.busway },
        { name: 'Taxi', icon: 'taxi', color: GlassTheme.colors.transport.taxi },
        { name: 'Parking', icon: 'parking', color: GlassTheme.colors.transport.parking },
        { name: 'TNS', icon: 'train', color: GlassTheme.colors.transport.train },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {modes.map((m) => (
                    <TouchableOpacity
                        key={m.name}
                        style={styles.gridItem}
                        onPress={() => onModeSelect(m.name)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconBox, { backgroundColor: `${m.color}20`, borderColor: `${m.color}40` }]}>
                            <MaterialCommunityIcons name={m.icon} size={32} color={m.color} />
                        </View>
                        <Text style={styles.modeText}>{m.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: (width - 60) / 3, // 3 items par ligne avec spacing
        alignItems: 'center',
        marginBottom: 24,
    },
    iconBox: {
        width: 70,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
    },
    modeText: {
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
        fontSize: 14,
    },
});
