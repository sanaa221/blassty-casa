export const GlassThemeLight = {
    colors: {
        // Base
        background: '#F2F2F7', // iOS Light Gray
        surface: '#FFFFFF',    // Pure White

        // Brand
        primary: '#E91E63', // Magenta Brand (unchanged)
        primaryGradient: ['#E91E63', '#C2185B'],
        secondary: '#FF9800', // Orange Action
        secondaryGradient: ['#FF9800', '#F57C00'],
        tertiary: '#2196F3', // Blue Highlight
        tertiaryGradient: ['#2196F3', '#1976D2'],

        // Functional
        success: '#00C853', // Slightly darker for light mode visibility
        warning: '#FFAB00',
        error: '#D50000',
        info: '#2962FF',

        // Text
        text: {
            primary: '#1A1A1A',   // Almost Black
            secondary: '#555555',  // Dark Gray
            muted: '#888888',     // Muted Gray
            inverse: '#FFFFFF'    // White
        },

        // Glass Effects (Adapted for Light Mode - "Frosted Glass")
        glass: {
            background: 'rgba(255, 255, 255, 0.75)',
            card: 'rgba(255, 255, 255, 0.65)',
            border: 'rgba(0, 0, 0, 0.05)',
            highlight: 'rgba(255, 255, 255, 0.8)',
            shadow: 'rgba(0, 0, 0, 0.1)'
        },

        // Transport Modes (Keep consistent/brand identity)
        transport: {
            tram: '#EF6C00', // Darker Orange
            bus: '#1565C0',  // Darker Blue
            busway: '#7B1FA2',
            taxi: '#D32F2F',
            train: '#C2185B',
            parking: '#455A64'
        }
    },
    spacing: {
        xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48
    },
    borderRadius: {
        s: 8, m: 12, l: 20, xl: 30, full: 9999
    },
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
        },
        glow: {
            shadowColor: '#E91E63',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4, // Less intense glow in light mode
        }
    },
    typography: { // Same typography
        display: { fontSize: 32, fontWeight: '700' },
        h1: { fontSize: 24, fontWeight: '700' },
        h2: { fontSize: 20, fontWeight: '600' },
        body: { fontSize: 16, fontWeight: '400' },
        caption: { fontSize: 12, fontWeight: '500' }
    }
};
