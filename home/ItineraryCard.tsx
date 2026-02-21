import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassTheme } from '../../constants/GlassTheme';
import { LocationPOI, ItineraryStats } from '../../types/Transport';

export interface TransportOption {
    type: string;
    name: string;
    price: number;
    duration: number;
    frequency: string;
}

interface ItineraryCardProps {
    destination: LocationPOI;
    options: TransportOption[]; // Pass pre-calculated options
    onClose: () => void;
    onStartNavigation: (selectedMode: TransportOption) => void;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
    destination,
    options,
    onClose,
    onStartNavigation
}) => {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleGo = () => {
        const selected = options.find(o => o.type === selectedType);
        if (selected) {
            onStartNavigation(selected);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title} numberOfLines={1}>Vers {destination.name}</Text>
                    <Text style={styles.subtitle}>Choisir un trajet</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <MaterialCommunityIcons name="close" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Options List */}
            <View style={styles.listContainer}>
                {options.map((opt) => {
                    const isSelected = selectedType === opt.type;
                    const color = GlassTheme.colors.transport[opt.type as keyof typeof GlassTheme.colors.transport] || '#FFF';

                    return (
                        <TouchableOpacity
                            key={opt.type}
                            style={[
                                styles.optionRow,
                                isSelected && { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: color }
                            ]}
                            onPress={() => setSelectedType(opt.type)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                                <MaterialCommunityIcons
                                    name={getIconName(opt.type) as any}
                                    size={20}
                                    color="#FFF"
                                />
                            </View>

                            <View style={styles.optionInfo}>
                                <Text style={styles.optionName}>{opt.name}</Text>
                                <Text style={styles.optionFreq}>{opt.frequency}</Text>
                            </View>

                            <View style={styles.optionMeta}>
                                <Text style={styles.optionPrice}>{opt.price} Dh</Text>
                                <Text style={styles.optionDuration}>{opt.duration} min</Text>
                            </View>

                            {isSelected && (
                                <View style={styles.checkIcon}>
                                    <MaterialCommunityIcons name="check-circle" size={20} color={color} />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* CTA Button */}
            <TouchableOpacity
                style={[styles.ctaButton, !selectedType && styles.ctaDisabled]}
                onPress={handleGo}
                disabled={!selectedType}
            >
                <Text style={styles.ctaText}>Y ALLER</Text>
                <MaterialCommunityIcons name="navigation" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const getIconName = (type: string) => {
    switch (type) {
        case 'tram': return 'tram';
        case 'bus': return 'bus';
        case 'busway': return 'bus-articulated-front';
        case 'taxi': return 'taxi';
        case 'train': return 'train';
        default: return 'car';
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: GlassTheme.colors.glass.card,
        borderRadius: GlassTheme.borderRadius.l,
        padding: 20,
        borderWidth: 1,
        borderColor: GlassTheme.colors.glass.border,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    title: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 2
    },
    subtitle: {
        color: GlassTheme.colors.text.secondary,
        fontSize: 14
    },
    closeButton: {
        padding: 8,
        backgroundColor: GlassTheme.colors.glass.highlight,
        borderRadius: 12
    },
    listContainer: {
        gap: 12,
        marginBottom: 20
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    iconContainer: {
        width: 40, height: 40, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 12
    },
    optionInfo: { flex: 1 },
    optionName: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    optionFreq: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
    optionMeta: { alignItems: 'flex-end', marginRight: 8 },
    optionPrice: { color: GlassTheme.colors.primary, fontWeight: 'bold', fontSize: 16 },
    optionDuration: { color: '#FFF', fontSize: 13 },
    checkIcon: { marginLeft: 4 },

    ctaButton: {
        backgroundColor: GlassTheme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 18,
        shadowColor: GlassTheme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8
    },
    ctaDisabled: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        shadowOpacity: 0
    },
    ctaText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1.5
    }
});
