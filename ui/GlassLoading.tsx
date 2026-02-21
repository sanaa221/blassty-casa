import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { GlassTheme } from '../../constants/GlassTheme';

interface GlassLoadingProps {
    message?: string;
    fullScreen?: boolean;
}

export const GlassLoading: React.FC<GlassLoadingProps> = ({
    message = "Chargement...",
    fullScreen = false
}) => {

    const containerStyle = fullScreen ? styles.fullScreenContainer : styles.localContainer;

    return (
        <View style={containerStyle}>
            {/* Semi-transparent background manually since BlurView might be causing issues */}
            {fullScreen && <View style={styles.backdrop} />}

            <View style={styles.content}>
                <ActivityIndicator size="large" color={GlassTheme.colors.primary} style={styles.spinner} />
                <Text style={styles.text}>{message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        elevation: 10
    },
    localContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    content: {
        padding: 24,
        backgroundColor: 'rgba(30, 20, 25, 0.9)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        gap: 16,
        minWidth: 180
    },
    spinner: {
        transform: [{ scale: 1.2 }]
    },
    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
        textAlign: 'center'
    }
});
