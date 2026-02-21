import React from 'react';
import { View, StyleSheet, Platform, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassTheme } from '../../constants/GlassTheme';

interface GlassViewProps extends ViewProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
}

export function GlassView({ style, intensity = 50, tint = 'light', children, ...props }: GlassViewProps) {
    // Sur Android, BlurView peut être coûteux ou imparfait, on ajoute un fallback semi-transparent
    const isAndroid = Platform.OS === 'android';

    return (
        <View style={[styles.container, style]} {...props}>
            <BlurView intensity={intensity} tint={tint} style={StyleSheet.absoluteFill} />
            {/* Couche de couleur pour assurer la lisibilité si le blur est faible */}
            <View style={[StyleSheet.absoluteFill, styles.fallbackLayer]} />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderColor: GlassTheme.colors.glass.border,
        borderWidth: 1,
        borderRadius: GlassTheme.borderRadius.m,
    },
    fallbackLayer: {
        backgroundColor: GlassTheme.colors.glass.background,
        opacity: 0.6, // Ajusté pour ne pas cacher le blur mais donner une teinte de fond
    }
});
