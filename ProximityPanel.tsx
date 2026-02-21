import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './ui/GlassCard';
import { GlassTheme } from '../constants/GlassTheme';
import { findNearestVehicles, formatDistance } from '../utils/distanceUtils';

interface ProximityPanelProps {
    userLocation: { latitude: number; longitude: number } | null;
    vehicles: any[];
    onVehicleSelect?: (vehicle: any) => void;
}

export function ProximityPanel({ userLocation, vehicles, onVehicleSelect }: ProximityPanelProps) {
    const nearestVehicles = useMemo(() => {
        if (!userLocation) return [];
        return findNearestVehicles(
            userLocation.latitude,
            userLocation.longitude,
            vehicles,
            10 // Top 10 plus proches
        );
    }, [userLocation, vehicles]);

    const getVehicleIcon = (type: string) => {
        switch (type) {
            case 'tram': return 'tram';
            case 'taxi': return 'taxi';
            default: return 'bus';
        }
    };

    const getVehicleColor = (type: string) => {
        switch (type) {
            case 'tram': return '#D32F2F';
            case 'taxi': return '#FBC02D';
            default: return '#4A148C';
        }
    };

    const getVehicleLabel = (vehicle: any) => {
        if (vehicle.type === 'taxi') {
            return vehicle.available ? 'Taxi Disponible' : 'Taxi Occupé';
        }
        if (vehicle.type === 'tram') {
            return `Tram ${vehicle.line || ''}`;
        }
        return `Bus ${vehicle.routeId}`;
    };

    if (!userLocation) {
        return (
            <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="map-marker-off" size={48} color={GlassTheme.colors.text.secondary} />
                <Text style={styles.emptyText}>Activez votre localisation</Text>
                <Text style={styles.emptySubtext}>pour voir les transports à proximité</Text>
            </View>
        );
    }

    if (nearestVehicles.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="bus-alert" size={48} color={GlassTheme.colors.text.secondary} />
                <Text style={styles.emptyText}>Aucun transport à proximité</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>🎯 À proximité</Text>
            {nearestVehicles.map((vehicle) => (
                <TouchableOpacity
                    key={vehicle.id}
                    onPress={() => onVehicleSelect?.(vehicle)}
                    activeOpacity={0.7}
                >
                    <GlassCard style={styles.vehicleCard} intensity={25} variant="transport">
                        <View style={[styles.iconCircle, { backgroundColor: getVehicleColor(vehicle.type) }]}>
                            <MaterialCommunityIcons
                                name={getVehicleIcon(vehicle.type) as any}
                                size={24}
                                color="#FFF"
                            />
                        </View>
                        <View style={styles.vehicleInfo}>
                            <Text style={styles.vehicleLabel}>{getVehicleLabel(vehicle)}</Text>
                            {vehicle.etaMinutes != null && (
                                <Text style={styles.etaText}>Arrivée dans {vehicle.etaMinutes} min</Text>
                            )}
                        </View>
                        <View style={styles.distanceBadge}>
                            <MaterialCommunityIcons name="map-marker-distance" size={16} color={GlassTheme.colors.primary} />
                            <Text style={styles.distanceText}>{formatDistance(vehicle.distance)}</Text>
                        </View>
                    </GlassCard>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlassTheme.colors.text.primary,
        marginBottom: 15,
        marginTop: 10,
    },
    vehicleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
        borderRadius: 16,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: GlassTheme.colors.text.primary,
        marginBottom: 4,
    },
    etaText: {
        fontSize: 13,
        color: GlassTheme.colors.text.secondary,
    },
    distanceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(108, 99, 255, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    distanceText: {
        fontSize: 14,
        fontWeight: '600',
        color: GlassTheme.colors.primary,
        marginLeft: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: GlassTheme.colors.text.primary,
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: GlassTheme.colors.text.secondary,
        marginTop: 4,
    },
});
