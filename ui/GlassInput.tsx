import { TextInput, StyleSheet, TextInputProps, View, StyleProp, TextStyle } from 'react-native';
import { GlassView } from './GlassView';
import { GlassTheme } from '../../constants/GlassTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface GlassInputProps extends TextInputProps {
    icon?: string;
    inputStyle?: StyleProp<TextStyle>;
    iconColor?: string;
}

export function GlassInput({ style, icon, inputStyle, iconColor, ...props }: GlassInputProps) {
    return (
        <GlassView style={[styles.container, style]} intensity={30}>
            <View style={styles.content}>
                {icon && (
                    <MaterialCommunityIcons
                        name={icon as any}
                        size={20}
                        color={iconColor || GlassTheme.colors.text.secondary}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholderTextColor={props.placeholderTextColor || GlassTheme.colors.text.secondary}
                    {...props}
                />
            </View>
        </GlassView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderRadius: GlassTheme.borderRadius.m,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: GlassTheme.colors.text.primary,
    }
});
