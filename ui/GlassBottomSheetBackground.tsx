import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { GlassTheme } from '../../constants/GlassTheme';

const GlassBottomSheetBackground: React.FC<BottomSheetBackgroundProps> = ({ style }) => {
    const containerStyle = useMemo(
        () => [
            style,
            styles.container,
        ],
        [style]
    );

    return (
        <BlurView
            style={containerStyle}
            intensity={80}
            tint="dark"
            experimentalBlurMethod="dimezisBlurView" // Better performance on Android if available, else standard
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlassTheme.colors.glass.background,
        borderRadius: GlassTheme.borderRadius.xl,
        borderTopWidth: 1,
        borderColor: GlassTheme.colors.glass.border,
        overflow: 'hidden',
    },
});

export default GlassBottomSheetBackground;
