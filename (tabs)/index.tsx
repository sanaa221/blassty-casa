import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, StatusBar, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import { BusMap } from '../../components/BusMap';
import { TransportDashboard } from '../../components/TransportDashboard';
import { HomeHeader } from '../../components/home/HomeHeader';
import { ItineraryCard } from '../../components/home/ItineraryCard';
import { GlassLoading } from '../../components/ui/GlassLoading';
import GlassBottomSheetBackground from '../../components/ui/GlassBottomSheetBackground';

// Core & Types
import { GlassTheme } from '../../constants/GlassTheme';
import { useRealtimeVehicles } from '../../hooks/useRealtimeVehicles';
import { useUserLocation } from '../../hooks/useUserLocation';
import { TransportService } from '../../services/TransportService';
import { HistoryService } from '../../services/HistoryService';
import { LocationPOI, ItineraryStats } from '../../types/Transport';

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<any>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // State
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [parkings, setParkings] = useState([]);
  const [tnsStations, setTnsStations] = useState([]);

  // Search & Routing
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationPOI[]>([]);
  const [destination, setDestination] = useState<LocationPOI | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<{ latitude: number; longitude: number }[] | null>(null);
  const [itineraryOptions, setItineraryOptions] = useState<any[]>([]);

  // Filter
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // Hooks
  const { vehicles: buses } = useRealtimeVehicles();
  const { location, requestLocation } = useUserLocation();

  // FALLBACK LOCATION (Casablanca Centre)
  const userLocation = location || { latitude: 33.5731, longitude: -7.5898 };

  useEffect(() => {
    const initData = async () => {
      setLoadingConfig(true);
      const [r, p, t] = await Promise.all([
        TransportService.getRoutes(),
        TransportService.getParkings(),
        TransportService.getTrainStations()
      ]);
      setRoutes(r);
      setParkings(p);
      setTnsStations(t);
      setLoadingConfig(false);
    };
    initData();
  }, []);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      // Shift map center slightly South so the User Dot appears higher (clearing the BottomSheet)
      const VIEW_OFFSET = -0.004;
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude + VIEW_OFFSET,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 1000);
    }
  }, [location]); // Trigger only when location actually updates via requestLocation

  const filteredVehicles = useMemo(() => {
    return selectedMode ? buses.filter((v: any) => v.type === selectedMode) : buses;
  }, [buses, selectedMode]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (text.length > 0) {
      bottomSheetRef.current?.snapToIndex(0);
    }

    if (text.length > 2) {
      setLoadingSearch(true);
      searchTimeout.current = setTimeout(async () => {
        const results = await TransportService.searchPlaces(text);
        setSuggestions(results);
        setLoadingSearch(false);
      }, 600) as unknown as NodeJS.Timeout;
    } else {
      setSuggestions([]);
      setLoadingSearch(false);
    }
  };

  const handleSelectLocation = (poi: LocationPOI) => {
    setSearchQuery(poi.name);
    setDestination(poi);
    setSuggestions([]);
    setSelectedRoute(null); // Reset route until mode selected

    // 1. Calculate stats to generate options
    const dLat = poi.latitude - userLocation.latitude;
    const dLng = poi.longitude - userLocation.longitude;
    const rawDist = Math.sqrt(dLat * dLat + dLng * dLng) * 100; // Approx conversion
    const realDistance = parseFloat(rawDist.toFixed(1));
    const baseDuration = Math.round(realDistance * 5); // 5 min per km approx base

    // 2. Generate Options with Real Prices
    const options = TransportService.calculateItineraryOptions(realDistance, baseDuration);
    setItineraryOptions(options);

    // 3. Context Zoom (Show A and B points without route line yet)
    mapRef.current?.fitToCoordinates([
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: poi.latitude, longitude: poi.longitude }
    ], {
      edgePadding: { top: 150, right: 50, bottom: 350, left: 50 },
      animated: true,
    });

    bottomSheetRef.current?.close();
  };

  const handleRouteSelection = (mode: any) => {
    // Show route line
    if (!destination) return;

    const route = [
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: (userLocation.latitude + destination.latitude) / 2 + 0.005, longitude: (userLocation.longitude + destination.longitude) / 2 - 0.005 },
      { latitude: destination.latitude, longitude: destination.longitude }
    ];
    setSelectedRoute(route);

    // Change map view to follow route
    mapRef.current?.fitToCoordinates([
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: destination.latitude, longitude: destination.longitude }
    ], {
      edgePadding: { top: 150, right: 50, bottom: 350, left: 50 },
      animated: true,
    });

    // Add to History
    const now = new Date();
    const formattedTime = `Aujourd'hui, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Determine type safely
    const tripType = mode.type || (mode.name.toLowerCase().includes('tram') ? 'tram' : 'taxi');

    HistoryService.addTrip({
      date: formattedTime,
      from: "Ma Position",
      to: destination.name,
      type: tripType,
      price: typeof mode.price === 'string' ? parseInt(mode.price) : mode.price,
      duration: typeof mode.duration === 'string' ? parseInt(mode.duration) : mode.duration
    });

    Alert.alert("Itinéraire", `Navigation démarrée via ${mode.name} (${mode.price} Dh)`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setSelectedRoute(null);
    setDestination(null);
    setItineraryOptions([]);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleStartNavigation = () => {
    // Legacy holder
    Alert.alert("Navigation", "Démarrage du trajet...");
  };

  const handleModeSelect = (mode: string) => {
    const modeMap: { [key: string]: string } = {
      'Tram': 'tram', 'Bus': 'bus', 'Busway': 'busway',
      'Taxi': 'taxi', 'Parking': 'parking', 'TNS': 'tns'
    };
    setSelectedMode(modeMap[mode] || null);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>

        {/* 1. MAP */}
        <BusMap
          buses={filteredVehicles}
          userLocation={userLocation}
          mapRef={mapRef}
          routeCoordinates={selectedRoute || undefined}
          routeColor={GlassTheme.colors.primary}
          parkings={parkings}
          tnsStations={tnsStations}
          selectedMode={selectedMode}
          showsUserLocation={!!location}
        />

        {/* 2. GRADIENTS */}
        <LinearGradient
          colors={['rgba(33, 17, 22, 0.8)', 'transparent']}
          style={styles.gradientTop}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['transparent', 'rgba(33, 17, 22, 0.9)']}
          style={styles.gradientBottom}
          pointerEvents="none"
        />

        {/* 3. HEADER */}
        <HomeHeader
          searchQuery={searchQuery}
          loadingSearch={loadingSearch}
          suggestions={suggestions}
          onSearchChange={handleSearchChange}
          onSuggestionSelect={handleSelectLocation}
          onClearSearch={handleClearSearch}
        />

        {/* 4. ITINERARY SELECTION */}
        {(destination && !selectedRoute) && (
          <ItineraryCard
            destination={destination}
            options={itineraryOptions}
            onClose={handleClearSearch}
            onStartNavigation={handleRouteSelection}
          />
        )}

        {/* SHOW ONLY ITINERARY NAV WHEN STARTED? Or Keep Card?
            If user starts nav, maybe hide selection card or show "Navigating" state.
            For now, showing Polyline on map is the indication. 
            The user said "Shows our route on the map". 
            I will keep the card hidden or show a different state if selectedRoute is present?
            Actually, if selectedRoute is present, we might want to hide the selection card.
        */}
        {selectedRoute && (
          <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center', backgroundColor: GlassTheme.colors.primary, padding: 16, borderRadius: 20 }}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Navigation en cours...</Text>
            <TouchableOpacity onPress={() => setSelectedRoute(null)}><Text style={{ color: '#FFF', marginTop: 4, opacity: 0.8 }}>Arrêter</Text></TouchableOpacity>
          </View>
        )}

        {/* 5. LOCATION FAB (RESTORED) */}
        {!destination && (
          <View style={styles.fabContainer}>
            <TouchableOpacity style={styles.fab} onPress={() => requestLocation()}>
              <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}



        {/* LOADING */}
        {loadingConfig && <GlassLoading fullScreen message="Initialisation..." />}

        {/* 6. BOTTOM SHEET (RESTORED) */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.sheetIndicator}
          backgroundComponent={GlassBottomSheetBackground}
        >
          <BottomSheetView style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetSubtitle}>RÉSEAU DE TRANSPORT</Text>
              <Text style={styles.sheetTitle}>Choisir une Catégorie</Text>
            </View>

            <TransportDashboard onModeSelect={handleModeSelect} />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlassTheme.colors.background },
  gradientTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 150, zIndex: 1 },
  gradientBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 },


  fabContainer: { position: 'absolute', top: 220, right: 16, zIndex: 1 }, // Removed high zIndex and moved to Top to avoid BottomSheet overlap
  fab: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: GlassTheme.colors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: GlassTheme.colors.primary, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5
  },

  sheetIndicator: { backgroundColor: 'rgba(255,255,255,0.2)', width: 48 },
  sheetContent: { flex: 1, padding: 24 },
  sheetHeader: { marginBottom: 16 },
  sheetSubtitle: { color: GlassTheme.colors.primary, fontSize: 10, fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'uppercase' },
  sheetTitle: { color: '#FFF', fontSize: 20, fontWeight: '600', marginTop: 4 },
});