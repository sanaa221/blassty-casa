import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassTheme } from '../constants/GlassTheme';

interface BusMapProps {
  buses: any[];
  userLocation?: { latitude: number; longitude: number } | null;
  mapRef?: React.RefObject<MapView>;
  routeCoordinates?: { latitude: number; longitude: number }[];
  routeColor?: string;
  parkings?: any[];
  tnsStations?: any[];
  selectedMode?: string | null;
  showsUserLocation?: boolean;
}

export const BusMap = ({ buses, userLocation, mapRef, routeCoordinates, routeColor = '#E91E63', parkings = [], tnsStations = [], selectedMode, showsUserLocation = false }: BusMapProps) => {
  const getMarkerStyle = (type: string, vehicleColor?: string) => {
    // Utiliser la couleur du véhicule si disponible, sinon couleurs par défaut du thème
    switch (type) {
      case 'tram':
        return { icon: 'tram', color: vehicleColor || GlassTheme.colors.transport.tram, etaColor: GlassTheme.colors.secondary };
      case 'busway':
        return { icon: 'bus-articulated-front', color: vehicleColor || GlassTheme.colors.transport.busway, etaColor: '#AB47BC' };
      case 'bus':
        return { icon: 'bus', color: vehicleColor || GlassTheme.colors.transport.bus, etaColor: GlassTheme.colors.tertiary };
      case 'taxi':
        return { icon: 'taxi', color: vehicleColor || GlassTheme.colors.transport.taxi, etaColor: '#D32F2F' };
      case 'parking':
        return { icon: 'parking', color: vehicleColor || GlassTheme.colors.transport.parking, etaColor: '#455A64' };
      case 'tns':
        return { icon: 'train', color: vehicleColor || GlassTheme.colors.transport.train, etaColor: '#C2185B' };
      default:
        return { icon: 'bus', color: GlassTheme.colors.transport.bus, etaColor: GlassTheme.colors.tertiary };
    }
  };

  return (
    <MapView
      ref={mapRef as any}
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: 33.5831, // Centré sur Maarif/Centre
        longitude: -7.6310,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation={showsUserLocation}
      showsMyLocationButton={false}
    >
      {buses.map((bus: any) => {
        const style = getMarkerStyle(bus.type, bus.color);
        return (
          <Marker key={bus.id} coordinate={{ latitude: bus.lat, longitude: bus.lng }}>
            <View style={styles.markerContainer}>
              {bus.etaMinutes != null && (
                <View style={[styles.etaBox, { backgroundColor: style.etaColor }]}>
                  <Text style={styles.etaText}>{bus.etaMinutes} min</Text>
                </View>
              )}
              <View style={[styles.busCircle, { backgroundColor: style.color }]}>
                <MaterialCommunityIcons name={style.icon as any} size={18} color="#FFF" />
              </View>
              <View style={styles.triangle} />
            </View>
          </Marker>
        );
      })}

      {/* Marqueurs pour les parkings (si mode parking sélectionné ou aucun mode) */}
      {(selectedMode === 'parking' || !selectedMode) && parkings && parkings.map((parking: any) => (
        <Marker
          key={`parking-${parking.id}`}
          coordinate={{ latitude: parking.lat, longitude: parking.lng }}
          title={parking.name}
          description={`${parking.available}/${parking.capacity} places disponibles`}
        >
          <View style={styles.markerContainer}>
            <View style={[styles.busCircle, { backgroundColor: GlassTheme.colors.transport.parking }]}>
              <MaterialCommunityIcons name="parking" size={18} color="#FFF" />
            </View>
            <View style={styles.triangle} />
          </View>
        </Marker>
      ))}

      {/* Marqueurs pour les gares TNS (si mode TNS sélectionné ou aucun mode) */}
      {(selectedMode === 'tns' || !selectedMode) && tnsStations && tnsStations.map((station: any) => (
        <Marker
          key={`tns-${station.id}`}
          coordinate={{ latitude: station.lat, longitude: station.lng }}
          title={station.name}
          description={`Gare ${station.type}`}
        >
          <View style={styles.markerContainer}>
            <View style={[styles.busCircle, { backgroundColor: GlassTheme.colors.transport.train }]}>
              <MaterialCommunityIcons name="train" size={18} color="#FFF" />
            </View>
            <View style={styles.triangle} />
          </View>
        </Marker>
      ))}

      {/* Marqueur pour la position de l'utilisateur */}
      {userLocation && (
        <Marker
          coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
          title="Ma position"
        >
          <View style={styles.userMarker}>
            <MaterialCommunityIcons name="account-circle" size={32} color="#6C63FF" />
          </View>
        </Marker>
      )}

      {/* Polyline pour afficher l'itinéraire */}
      {routeCoordinates && routeCoordinates.length > 1 && (
        <Polyline
          coordinates={routeCoordinates}
          strokeColor={routeColor}
          strokeWidth={4}
          lineDashPattern={[1]}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  markerContainer: { alignItems: 'center' },
  etaBox: { backgroundColor: '#00AEEF', paddingHorizontal: 6, borderRadius: 8, marginBottom: -2, borderWidth: 1, borderColor: '#FFF' },
  etaText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  busCircle: { backgroundColor: '#4A148C', width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF', elevation: 4 },
  triangle: { width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 7, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#FFF' },
  userMarker: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});