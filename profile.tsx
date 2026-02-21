import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    Dimensions,
    Platform
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { MOCK_USER_DATA, RideHistoryItem } from "../constants/MockUserData";
import { HistoryService } from "../services/HistoryService";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
    const router = useRouter();
    const { user, signOut } = useAuth(); // Data context réel
    const { theme, mode, setMode, isDark } = useTheme();

    // Utilisation de données simulées UNIQUEMENT pour les stats (pas pour l'identité ni l'historique)
    const stats = MOCK_USER_DATA.stats;
    const [history, setHistory] = useState<RideHistoryItem[]>([]);

    const [avatar, setAvatar] = useState<string | null>(null);

    // Charger l'historique à chaque fois que l'écran est focalisé
    useFocusEffect(
        React.useCallback(() => {
            HistoryService.getHistory().then(setHistory);
        }, [])
    );

    // Charger l'avatar sauvegardé
    useEffect(() => {
        const loadAvatar = async () => {
            const savedAvatar = await AsyncStorage.getItem(`user_avatar_${user?.email}`);
            if (savedAvatar) setAvatar(savedAvatar);
        };
        if (user?.email) loadAvatar();
    }, [user]);

    const handleSignOut = async () => {
        Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Se déconnecter",
                style: "destructive",
                onPress: async () => {
                    await signOut();
                    router.replace("/(auth)/login");
                },
            },
        ]);
    };

    const pickImage = async () => {
        // Demander la permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission refusée', 'Nous avons besoin de la permission pour accéder à vos photos.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            // Sauvegarder localement pour ce user
            if (user?.email) {
                await AsyncStorage.setItem(`user_avatar_${user.email}`, result.assets[0].uri);
            }
        }
    };

    const getInitials = (name: string) => {
        if (!name) return "U";
        const parts = name.split(' ');
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const getUserName = () => {
        // Priorité aux données réelles du contexte Auth
        if (user && user.name) return user.name;
        // Fallback
        return "Utilisateur";
    }

    const getUserEmail = () => {
        if (user && user.email) return user.email;
        return "user@blasstycasa.ma";
    }

    const getVehicleIcon = (type: string) => {
        switch (type) {
            case 'tram': return 'tram';
            case 'bus': return 'bus';
            case 'busway': return 'bus-articulated-front';
            case 'taxi': return 'taxi';
            default: return 'car';
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Dynamic Background Gradient */}
            <LinearGradient
                colors={isDark ? ["#2A162B", theme.colors.background] : ["#F8F9FA", theme.colors.background]}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[styles.backButton, { backgroundColor: theme.colors.glass.highlight }]}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={theme.colors.text.primary}
                    />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
                    Mon Profil
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={[styles.profileCard, { borderColor: theme.colors.glass.border, backgroundColor: theme.colors.glass.card }]}>
                    <LinearGradient
                        colors={isDark ? ["rgba(255,255,255,0.05)", "transparent"] : ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.4)"]}
                        style={styles.profileGradient}
                    >
                        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                            {avatar ? (
                                <Image source={{ uri: avatar }} style={[styles.avatar, { borderColor: theme.colors.primary }]} />
                            ) : (
                                <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.glass.highlight, borderColor: theme.colors.primary }]}>
                                    <Text style={[styles.avatarInitials, { color: theme.colors.primary }]}>
                                        {getInitials(getUserName())}
                                    </Text>
                                </View>
                            )}

                            <View style={[styles.editBadge, { backgroundColor: theme.colors.background, borderColor: theme.colors.glass.border }]}>
                                <MaterialCommunityIcons name="camera-plus" size={14} color={theme.colors.text.primary} />
                            </View>

                            <View style={[styles.badge, { borderColor: theme.colors.surface }]}>
                                <MaterialCommunityIcons name="crown" size={14} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                        <Text style={[styles.userName, { color: theme.colors.text.primary }]}>
                            {getUserName()}
                        </Text>
                        <Text style={[styles.userEmail, { color: theme.colors.text.secondary }]}>
                            {getUserEmail()}
                        </Text>

                        <View style={[styles.membershipTag, { borderColor: theme.colors.primary, backgroundColor: isDark ? 'rgba(233, 30, 99, 0.2)' : 'rgba(233, 30, 99, 0.1)' }]}>
                            <Text style={[styles.membershipText, { color: theme.colors.primary }]}>
                                MEMBER {stats.level.toUpperCase()}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Theme Switcher */}
                <View style={[styles.sectionContainer, { backgroundColor: theme.colors.glass.card, borderColor: theme.colors.glass.border }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Apparence</Text>

                    <View style={styles.themeSelector}>
                        <ThemeOption
                            label="Sombre"
                            icon="weather-night"
                            selected={mode === 'dark'}
                            onPress={() => setMode('dark')}
                            theme={theme}
                        />
                        <ThemeOption
                            label="Clair"
                            icon="weather-sunny"
                            selected={mode === 'light'}
                            onPress={() => setMode('light')}
                            theme={theme}
                        />
                        <ThemeOption
                            label="Système"
                            icon="theme-light-dark"
                            selected={mode === 'system'}
                            onPress={() => setMode('system')}
                            theme={theme}
                        />
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={[styles.statsContainer, { backgroundColor: theme.colors.glass.card }]}>
                    <StatItem value={stats.totalRides.toString()} label="Trajets" theme={theme} />
                    <View style={[styles.statDivider, { backgroundColor: theme.colors.glass.border }]} />
                    <StatItem value={stats.totalKm.toFixed(1)} label="Km total" theme={theme} />
                    <View style={[styles.statDivider, { backgroundColor: theme.colors.glass.border }]} />
                    <StatItem value={`${stats.co2Saved}kg`} label="CO2 évité" theme={theme} />
                </View>

                {/* History Preview */}
                <View style={[styles.sectionContainer, { backgroundColor: theme.colors.glass.card, borderColor: theme.colors.glass.border }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary, marginBottom: 0 }]}>Derniers trajets</Text>
                        <TouchableOpacity>
                            <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>

                    {history.map((ride, idx) => (
                        <View key={ride.id} style={[styles.historyItem, idx !== history.length - 1 && { borderBottomColor: theme.colors.glass.border, borderBottomWidth: 1 }]}>
                            <View style={[styles.historyIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#EEE' }]}>
                                <MaterialCommunityIcons name={getVehicleIcon(ride.type) as any} size={20} color={theme.colors.transport[ride.type]} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.historyRoute, { color: theme.colors.text.primary }]}>{ride.from} → {ride.to}</Text>
                                <Text style={[styles.historyDate, { color: theme.colors.text.muted }]}>{ride.date}</Text>
                            </View>
                            <Text style={[styles.historyPrice, { color: theme.colors.text.primary }]}>{ride.price} MAD</Text>
                        </View>
                    ))}
                </View>

                {/* Menu Options */}
                <View style={[styles.menuContainer, { backgroundColor: theme.colors.glass.card }]}>
                    <MenuItem
                        icon="credit-card-outline"
                        title="Moyens de paiement"
                        subtitle="Visa •••• 4242"
                        theme={theme}
                        isDark={isDark}
                    />
                    <MenuItem
                        icon="heart-outline"
                        title="Lieux favoris"
                        subtitle={`${MOCK_USER_DATA.favorites.length} lieux enregistrés`}
                        theme={theme}
                        isDark={isDark}
                    />
                    <MenuItem
                        icon="cog-outline"
                        title="Paramètres"
                        subtitle="Notifications, Confidentialité"
                        theme={theme}
                        isDark={isDark}
                    />
                    <MenuItem
                        icon="help-circle-outline"
                        title="Aide & Support"
                        subtitle="FAQ, Contact"
                        theme={theme}
                        isDark={isDark}
                    />
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={handleSignOut}
                >
                    <MaterialCommunityIcons name="logout" size={24} color="#FF3B30" />
                    <Text style={styles.signOutText}>Se déconnecter</Text>
                </TouchableOpacity>

                <Text style={[styles.versionText, { color: theme.colors.text.muted }]}>
                    BlasstyCasa v4.1.0 • Build 2026
                </Text>
            </ScrollView>
        </View>
    );
}

const ThemeOption = ({ label, icon, selected, onPress, theme }: any) => (
    <TouchableOpacity
        style={[
            styles.themeOption,
            {
                backgroundColor: selected ? theme.colors.primary : 'transparent',
                borderColor: theme.colors.glass.border
            }
        ]}
        onPress={onPress}
    >
        <MaterialCommunityIcons
            name={icon}
            size={20}
            color={selected ? '#FFF' : theme.colors.text.secondary}
        />
        <Text style={[
            styles.themeLabel,
            { color: selected ? '#FFF' : theme.colors.text.secondary }
        ]}>
            {label}
        </Text>
    </TouchableOpacity>
)

const StatItem = ({ value, label, theme }: any) => (
    <View style={styles.statItem}>
        <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
            {value}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
            {label}
        </Text>
    </View>
);

const MenuItem = ({ icon, title, subtitle, theme, isDark }: any) => (
    <TouchableOpacity style={[styles.menuItem, { borderBottomColor: theme.colors.glass.border }]}>
        <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.glass.highlight }]}>
            <MaterialCommunityIcons name={icon} size={24} color={theme.colors.text.primary} />
        </View>
        <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: theme.colors.text.primary }]}>
                {title}
            </Text>
            <Text style={[styles.menuSubtitle, { color: theme.colors.text.muted }]}>
                {subtitle}
            </Text>
        </View>
        <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={theme.colors.text.muted}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 24, paddingBottom: 50 },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 60,
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: { fontSize: 20, fontWeight: "bold" },

    profileCard: {
        borderRadius: 24,
        overflow: "hidden",
        borderWidth: 1,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5
    },
    profileGradient: {
        padding: 30,
        alignItems: "center",
    },
    avatarContainer: { marginBottom: 16, position: 'relative' },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarInitials: {
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    badge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#FFD700",
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
    },
    editBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        elevation: 4
    },
    userName: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
    userEmail: { fontSize: 14, marginBottom: 16 },
    membershipTag: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    membershipText: { fontSize: 12, fontWeight: "bold", letterSpacing: 1 },

    sectionContainer: {
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 24,
        overflow: 'hidden'
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12
    },
    themeSelector: {
        flexDirection: 'row',
        gap: 12
    },
    themeOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8
    },
    themeLabel: {
        fontWeight: '600',
        fontSize: 13
    },

    statsContainer: {
        flexDirection: "row",
        borderRadius: 20,
        padding: 20,
        justifyContent: "space-between",
        marginBottom: 24,
    },
    statItem: { alignItems: "center", flex: 1 },
    statValue: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
    statLabel: { fontSize: 12 },
    statDivider: { width: 1, height: "80%" },

    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12
    },
    historyIcon: {
        width: 36, height: 36, borderRadius: 18,
        justifyContent: 'center', alignItems: 'center'
    },
    historyRoute: {
        fontWeight: '600', fontSize: 14, marginBottom: 2
    },
    historyDate: {
        fontSize: 12
    },
    historyPrice: {
        fontWeight: 'bold', fontSize: 15
    },

    menuContainer: {
        borderRadius: 24,
        marginBottom: 24,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    menuTextContainer: { flex: 1 },
    menuTitle: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
    menuSubtitle: { fontSize: 12 },

    signOutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
        backgroundColor: "rgba(255, 59, 48, 0.1)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 59, 48, 0.3)",
        marginBottom: 30,
    },
    signOutText: {
        color: "#FF3B30",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },

    versionText: {
        textAlign: "center",
        fontSize: 12,
    },
});
