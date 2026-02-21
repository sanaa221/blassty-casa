import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { GlassView } from './GlassView';
import { GlassTheme } from '../../constants/GlassTheme';

interface GlassCardProps extends ViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'weather' | 'transport' | 'info';
    intensity?: number;
}

export function GlassCard({ children, style, variant = 'info', intensity = 20, ...props }: GlassCardProps) {
    const getVariantStyle = () => {
        switch (variant) {
            case 'weather': return styles.weatherBorder;
            case 'transport': return styles.transportBorder;
            default: return {};
        }
    };

    return (
        <GlassView
            style={[styles.card, getVariantStyle(), style]}
            intensity={intensity}
            {...props}
        >
            {children}
        </GlassView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: GlassTheme.borderRadius.l,
        padding: GlassTheme.spacing.m,
        marginVertical: GlassTheme.spacing.s,
        // Ombre subtile supplémentaire
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    weatherBorder: {
        borderLeftWidth: 4,
        borderLeftColor: GlassTheme.colors.secondary,
    },
    transportBorder: {
        borderLeftWidth: 4,
        borderLeftColor: GlassTheme.colors.primary,
    },
});
