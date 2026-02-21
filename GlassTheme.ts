/**
 * Palette de couleurs pour BlasstyCasa (Glassmorphism Premium 2.0)
 * Generated via Stitch Skills: design-md
 */
export const GlassTheme = {
    colors: {
        // Base
        background: '#0F0508', // Deep void
        surface: '#1F0A10',    // Slightly lighter

        // Brand
        primary: '#E91E63', // Magenta Brand
        primaryGradient: ['#E91E63', '#C2185B'],
        secondary: '#FF9800', // Orange Action
        secondaryGradient: ['#FF9800', '#F57C00'],
        tertiary: '#2196F3', // Blue Highlight
        tertiaryGradient: ['#2196F3', '#1976D2'],

        // Functional
        success: '#00E676',
        warning: '#FFC107',
        error: '#FF1744',
        info: '#2979FF',

        // Text
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
            muted: 'rgba(255, 255, 255, 0.5)',
            inverse: '#000000'
        },

        // Glass Effects
        glass: {
            background: 'rgba(20, 5, 10, 0.75)',
            card: 'rgba(30, 15, 20, 0.65)',
            border: 'rgba(255, 255, 255, 0.08)',
            highlight: 'rgba(255, 255, 255, 0.15)',
            shadow: 'rgba(0, 0, 0, 0.5)'
        },

        // Transport Modes
        transport: {
            tram: '#FF9800',
            bus: '#2196F3',
            busway: '#9C27B0',
            taxi: '#FF1744',
            train: '#E91E63',
            parking: '#607D8B'
        }
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48
    },
    borderRadius: {
        s: 8,
        m: 12,
        l: 20,
        xl: 30,
        full: 9999
    },
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
        },
        glow: {
            shadowColor: '#E91E63',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 16,
            elevation: 10,
        }
    },
    typography: {
        display: { fontSize: 32, fontWeight: '700' },
        h1: { fontSize: 24, fontWeight: '700' },
        h2: { fontSize: 20, fontWeight: '600' },
        body: { fontSize: 16, fontWeight: '400' },
        caption: { fontSize: 12, fontWeight: '500' }
    }
};
