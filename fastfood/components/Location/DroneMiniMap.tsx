import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Svg, { Path, Circle } from "react-native-svg";

interface LocationPoint {
  lat: number;
  lon: number;
}

interface DroneMiniMapProps {
  dronePos: LocationPoint;
  userPos: LocationPoint;
}

// ----- SVG ICONS -----
function DroneIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24">
      <Path
        d="M12 5V19M5 12H19M7 7L5.5 5.5M18.5 5.5L17 7M7 17L5.5 18.5M18.5 18.5L17 17"
        stroke="#2563eb"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function UserIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24">
      <Path
        d="M12 21s8-4.5 8-10A8 8 0 0 0 4 11c0 5.5 8 10 8 10z"
        stroke="#dc2626"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="11" r="3" stroke="#dc2626" strokeWidth={2} />
    </Svg>
  );
}

export default function DroneMiniMap({ dronePos, userPos }: DroneMiniMapProps) {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.fitToCoordinates(
      [
        { latitude: dronePos.lat, longitude: dronePos.lon },
        { latitude: userPos.lat, longitude: userPos.lon },
      ],
      {
        edgePadding: { top: 60, bottom: 60, left: 60, right: 60 },
        animated: true,
      }
    );
  }, [dronePos, userPos]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: dronePos.lat,
          longitude: dronePos.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: dronePos.lat, longitude: dronePos.lon }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <DroneIcon />
        </Marker>

        <Marker
          coordinate={{ latitude: userPos.lat, longitude: userPos.lon }}
          anchor={{ x: 0.5, y: 0.9 }}
        >
          <UserIcon />
        </Marker>

        <Polyline
          coordinates={[
            { latitude: dronePos.lat, longitude: dronePos.lon },
            { latitude: userPos.lat, longitude: userPos.lon },
          ]}
          strokeColor="#ef4444"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 260,
    borderRadius: 18,
    overflow: "hidden",
  },
});
