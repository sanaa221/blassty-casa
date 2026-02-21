import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../constants/Config';
import { GlassView } from '../../components/ui/GlassView';
import { GlassInput } from '../../components/ui/GlassInput';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassTheme } from '../../constants/GlassTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) return alert("Veuillez remplir tous les champs");

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.toLowerCase(), password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Erreur de connexion");

            await signIn(data.data.token);
        } catch (e: any) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Background Gradients */}
            <LinearGradient
                colors={[GlassTheme.colors.background, GlassTheme.colors.surface]}
                style={StyleSheet.absoluteFill}
            />
            {/* Glow effects simulating the premium feel */}
            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardContainer}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        {/* Logo Integration */}
                        <Image
                            source={require('../../Logo/Logo BlasstyCasa.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>BlasstyCasa</Text>
                        <Text style={styles.subtitle}>Votre mobilité, réinventée.</Text>
                    </View>

                    <GlassView style={styles.card} intensity={30} tint="dark">
                        <View style={styles.formContainer}>
                            <GlassInput
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                icon="email-outline"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                inputStyle={{ color: '#FFF' }}
                                iconColor={GlassTheme.colors.primary}
                            />
                            <GlassInput
                                placeholder="Mot de passe"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                icon="lock-outline"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                inputStyle={{ color: '#FFF' }}
                                iconColor={GlassTheme.colors.primary}
                            />

                            <GlassButton
                                title="Se connecter"
                                onPress={handleLogin}
                                loading={loading}
                                style={styles.button}
                                variant="primary"
                            />
                        </View>
                    </GlassView>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Pas encore de compte ? </Text>
                        <Link href="/register" asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>S'inscrire</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlassTheme.colors.background
    },
    keyboardContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: 1,
        textShadowColor: GlassTheme.colors.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 8
    },
    card: {
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    formContainer: {
        gap: 16
    },
    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(233, 32, 99, 0.3)' // Magenta border subtle
    },
    button: {
        marginTop: 8,
        height: 56,
        borderRadius: 16,
        shadowColor: GlassTheme.colors.primary,
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14
    },
    link: {
        color: GlassTheme.colors.primary,
        fontWeight: 'bold',
        fontSize: 14
    },
    // Background Elements
    glowTop: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: GlassTheme.colors.primary,
        opacity: 0.2,
        transform: [{ scale: 1 }],
    },
    glowBottom: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: GlassTheme.colors.secondary, // Orange glow
        opacity: 0.15,
    }
});
