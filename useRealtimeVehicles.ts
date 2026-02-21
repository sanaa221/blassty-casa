import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../constants/Config';

// L'URL de base (sans /api) pour socket.io est simplement API_BASE_URL
const SOCKET_URL = API_BASE_URL;

export function useRealtimeVehicles() {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket: Socket = io(SOCKET_URL, {
            transports: ['websocket'], // Force WebSocket pour éviter le polling long
        });

        socket.on('connect', () => {
            console.log('✅ Connected to WebSocket');
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('❌ Disconnected from WebSocket');
            setIsConnected(false);
        });

        socket.on('vehicles_update', (data: any[]) => {
            setVehicles(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { vehicles, isConnected };
}
