import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GlassTheme } from '../../constants/GlassTheme';
import { LocationPOI } from '../../types/Transport';

interface HomeHeaderProps {
    searchQuery: string;
    onSearchChange: (text: string) => void;
    loadingSearch: boolean;
    suggestions: LocationPOI[];
    onSuggestionSelect: (poi: LocationPOI) => void;
    onClearSearch: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
    searchQuery,
    onSearchChange,
    loadingSearch,
    suggestions,
    onSuggestionSelect,
    onClearSearch
}) => {
    const router = useRouter();

    const getIconColor = (type: string) => {
        switch (type) {
            case 'train': return GlassTheme.colors.transport.train;
            case 'work': return GlassTheme.colors.tertiary;
            case 'shopping': return GlassTheme.colors.primary;
            case 'business': return GlassTheme.colors.secondary;
            case 'tourism': return GlassTheme.colors.info;
            default: return GlassTheme.colors.primary;
        }
    };

    return (
        <View style={styles.header}>
            {/* Top Row: Brand & Profile */}
            <View style={styles.topRow}>
                <View style={styles.brandContainer}>
                    <Image
                        source={require('../../Logo/Logo BlasstyCasa.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.brandText}>BlasstyCasa</Text>
                </View>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => router.push('/profile' as any)}
                >
                    <MaterialCommunityIcons name="account" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Search Bar Container */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <MaterialCommunityIcons name="magnify" size={24} color={GlassTheme.colors.primary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Où allez-vous ?"
                        placeholderTextColor={GlassTheme.colors.text.muted}
                        value={searchQuery}
                        onChangeText={onSearchChange}
                    />
                    {loadingSearch && <ActivityIndicator size="small" color={GlassTheme.colors.primary} />}
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={onClearSearch}>
                            <MaterialCommunityIcons name="close-circle" size={20} color={GlassTheme.colors.text.muted} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Search Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        {suggestions.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.suggestionItem}
                                onPress={() => onSuggestionSelect(item)}
                            >
                                <View style={[styles.suggestionIcon, { backgroundColor: getIconColor(item.type) }]}>
                                    <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" />
                                </View>
                                <View style={styles.suggestionTextContainer}>
                                    <Text style={styles.suggestionTitle} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.suggestionSub} numberOfLines={1}>{item.address}</Text>
                                </View>
                                <MaterialCommunityIcons name="chevron-right" size={20} color={GlassTheme.colors.text.muted} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 24,
        gap: 16
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 10
    },
    brandText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: GlassTheme.colors.glass.highlight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: GlassTheme.colors.glass.border
    },
    searchContainer: {
        zIndex: 20
    },
    searchBar: {
        height: 54,
        backgroundColor: GlassTheme.colors.glass.background,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: GlassTheme.colors.glass.border,
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6
    },
    searchInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 16
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 64, // Just below search bar
        left: 0,
        right: 0,
        backgroundColor: '#1A0B10', // Opaque dark background for readability
        borderRadius: 16,
        borderWidth: 1,
        borderColor: GlassTheme.colors.glass.border,
        overflow: 'hidden',
        padding: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)'
    },
    suggestionIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    suggestionTextContainer: {
        flex: 1
    },
    suggestionTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600'
    },
    suggestionSub: {
        color: GlassTheme.colors.text.secondary,
        fontSize: 12
    }
});
