import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "../styles/Home.module.css";

const containerStyle = {
  width: "500px",
  height: "95%", // Set the height based on the descBoxHeight prop
  border: "10px solid #303a41",
  borderRadius: "10px",
};

const Map = ({ address }) => {
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAFY09CwJBA_uW3jdsFJU3BOtw_wyS286g",
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const map = new window.google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 8,
            disableDefaultUI: true,
          });

          const marker = new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });

          marker.addListener("click", () => {
            setSelectedMarker(marker);
          });
        } else {
          console.error(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      });
    }
  }, [isLoaded, address]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div ref={mapRef} style={containerStyle}>
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.getPosition()}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>
            <h3>Big Eats</h3>
            <p>This is the ultimate dining experience!</p>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

export default Map;
