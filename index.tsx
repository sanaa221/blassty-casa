import { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { GlassTheme } from '../constants/GlassTheme';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Animation d'entrée
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Redirection après chargement
        if (!isLoading) {
            const timer = setTimeout(() => {
                if (user) {
                    router.replace('/(tabs)');
                } else {
                    router.replace('/(auth)/login');
                }
            }, 2000); // 2 secondes de splash minimum
            return () => clearTimeout(timer);
        }
    }, [isLoading, user]);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <Image
                    source={require('../Logo/Logo BlasstyCasa.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.slogan}>
                    Avec BlasstyCasa, simplifie tes déplacements au quotidien
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlassTheme.colors.background, // #211116
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: width * 0.65,
        height: width * 0.65,
        marginBottom: 20,
    },
    slogan: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: 28,
        letterSpacing: 0.5
    }
});
