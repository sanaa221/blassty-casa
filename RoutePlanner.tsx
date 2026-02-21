import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassView } from './ui/GlassView';
import { GlassTheme } from '../constants/GlassTheme';
import { GlassInput } from './ui/GlassInput';
import { findBestRoute, RouteResult } from '../utils/routeUtils';

interface RoutePlannerProps {
    userLocation: { latitude: number; longitude: number } | null;
    onRouteSelected?: (route: RouteResult) => void;
}

export function RoutePlanner({ userLocation, onRouteSelected }: RoutePlannerProps) {
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState<RouteResult[] | null>(null);

    const handleSearch = () => {
        if (!destination.trim() || !userLocation) return;

        setLoading(true);

        // Simulation d'une recherche API
        setTimeout(() => {
            // Coordonnées fictives pour la destination (simule un point dans Casa)
            const destLat = userLocation.latitude + 0.02;
            const destLng = userLocation.longitude + 0.02;

            const results = findBestRoute(
                userLocation.latitude,
                userLocation.longitude,
                destLat,
                destLng
            );

            setRoutes(results);
            setLoading(false);
        }, 1500);
    };

    const getVehicleIcon = (type: string) => {
        switch (type) {
            case 'tram': return 'tram';
            case 'taxi': return 'taxi';
            case 'bus': return 'bus';
            default: return 'walk';
        }
    };

    const getVehicleColor = (type: string) => {
        switch (type) {
            case 'tram': return '#D32F2F';
            case 'taxi': return '#FBC02D';
            case 'bus': return '#4A148C';
            default: return '#78909C';
        }
    };

    return (
        <View style={styles.container}>
            {/* Input Destination */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Où allez-vous ?</Text>
                <View style={styles.searchRow}>
                    <GlassInput
                        placeholder="Ex: Gare Casa Voyageurs, Morocco Mall..."
                        value={destination}
                        onChangeText={setDestination}
                        icon="map-marker-question"
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={handleSearch}
                        disabled={loading || !destination}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <MaterialCommunityIcons name="magnify" size={24} color="#FFF" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Résultats */}
            {routes && (
                <ScrollView style={styles.resultsList} showsVerticalScrollIndicator={false}>
                    <Text style={styles.resultsTitle}>Meilleurs itinéraires</Text>

                    {routes.map((route, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => onRouteSelected?.(route)}
                        >
                            <GlassView style={styles.routeCard} intensity={25}>
                                {/* Header Carte : Icone + Type + Prix */}
                                <View style={styles.colLeft}>
                                    <View style={[styles.iconBox, { backgroundColor: getVehicleColor(route.type) }]}>
                                        <MaterialCommunityIcons name={getVehicleIcon(route.type) as any} size={24} color="#FFF" />
                                    </View>
                                    <View style={styles.lineConnector} />
                                </View>

                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <View>
                                            <Text style={styles.routeType}>
                                                {route.type === 'taxi' ? 'Taxi' : `${route.type === 'bus' ? 'Bus' : 'Tram'} ${route.line || ''}`}
                                            </Text>
                                            <Text style={styles.duration}>{route.duration} min</Text>
                                        </View>
                                        <Text style={styles.price}>{route.price} MAD</Text>
                                    </View>

                                    {/* Étapes résumées */}
                                    <View style={styles.stepsContainer}>
                                        <Text style={styles.stepText} numberOfLines={2}>
                                            {route.steps.join(' → ')}
                                        </Text>
                                    </View>
                                </View>
                            </GlassView>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* État vide initial */}
            {!routes && !loading && (
                <View style={styles.emptyState}>
                    <MaterialCommunityIcons name="map-search-outline" size={64} color={GlassTheme.colors.text.secondary} />
                    <Text style={styles.emptyText}>Entrez une destination</Text>
                    <Text style={styles.emptySubtext}>pour comparer Bus, Tram et Taxi</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlassTheme.colors.text.primary,
        marginBottom: 10,
        marginTop: 10,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    searchButton: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: GlassTheme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    resultsList: {
        flex: 1,
    },
    resultsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: GlassTheme.colors.text.secondary,
        marginBottom: 10,
    },
    routeCard: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 12,
        borderRadius: 16,
    },
    colLeft: {
        alignItems: 'center',
        marginRight: 15,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    lineConnector: {
        width: 2,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 5,
    },
    cardContent: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    routeType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlassTheme.colors.text.primary,
        textTransform: 'capitalize',
    },
    duration: {
        fontSize: 14,
        color: GlassTheme.colors.text.secondary,
        fontWeight: '500',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlassTheme.colors.primary,
    },
    stepsContainer: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 8,
        borderRadius: 8,
    },
    stepText: {
        fontSize: 12,
        color: '#555',
        lineHeight: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: GlassTheme.colors.text.primary,
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        color: GlassTheme.colors.text.secondary,
    },
});
