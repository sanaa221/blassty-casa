import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { GlassView } from './GlassView';
import { GlassTheme } from '../../constants/GlassTheme';

interface GlassButtonProps {
    onPress: () => void;
    title: string;
    style?: ViewStyle;
    variant?: 'primary' | 'secondary' | 'glass';
    loading?: boolean;
}

export function GlassButton({ onPress, title, style, variant = 'primary', loading = false }: GlassButtonProps) {
    let backgroundColor = GlassTheme.colors.primary;
    let textColor = '#FFF';

    if (variant === 'secondary') {
        backgroundColor = GlassTheme.colors.secondary;
    } else if (variant === 'glass') {
        backgroundColor = 'transparent'; // Géré par GlassView
        textColor = GlassTheme.colors.text.primary;
    }

    const Content = (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.button, variant !== 'glass' && { backgroundColor }, style]}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );

    if (variant === 'glass') {
        return (
            <GlassView style={styles.glassContainer}>
                {Content}
            </GlassView>
        );
    }

    return Content;
}

const styles = StyleSheet.create({
    glassContainer: {
        borderRadius: GlassTheme.borderRadius.m,
        overflow: 'hidden',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: GlassTheme.borderRadius.m,
        alignItems: 'center',
        justifyContent: 'center',
        // Ombres douces pour les boutons non-glass
        shadowColor: GlassTheme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});
