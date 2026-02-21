import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_USER_DATA, RideHistoryItem } from '../constants/MockUserData';

const HISTORY_KEY = 'user_ride_history';

export const HistoryService = {
    /**
     * Get the full history. 
     * If storage is empty, initializes with MOCK_USER_DATA.
     */
    getHistory: async (): Promise<RideHistoryItem[]> => {
        try {
            const json = await AsyncStorage.getItem(HISTORY_KEY);
            if (json) {
                return JSON.parse(json);
            }
            // Initialize with mock data if empty
            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(MOCK_USER_DATA.history));
            return MOCK_USER_DATA.history;
        } catch (error) {
            console.error('Error loading history:', error);
            return MOCK_USER_DATA.history;
        }
    },

    /**
     * Add a new trip to the history (prepended).
     */
    addTrip: async (trip: Omit<RideHistoryItem, 'id'>): Promise<RideHistoryItem[]> => {
        try {
            const currentHistory = await HistoryService.getHistory();

            const newTrip: RideHistoryItem = {
                ...trip,
                id: `TRIP-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            };

            const updatedHistory = [newTrip, ...currentHistory];
            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
            return updatedHistory;
        } catch (error) {
            console.error('Error adding trip:', error);
            return [];
        }
    },

    /**
     * Clear history (optional, for debugging)
     */
    clearHistory: async () => {
        await AsyncStorage.removeItem(HISTORY_KEY);
    }
};
