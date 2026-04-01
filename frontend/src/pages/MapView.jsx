import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Spinner from "../components/shared/Spinner";
import { getCached } from "../services/api";
import { getPlaceCoordinates } from "../utils/placeUtils";

const MapView = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllLocations = async () => {
      try {
        const data = await getCached("/places", {
          params: { limit: 500 },
          ttl: 2 * 60_000,
          signal: controller.signal,
        });

        const validLocations = (data.data || [])
          .map((item) => {
            const coordinates = getPlaceCoordinates(item);
            return coordinates ? { ...item, coordinates } : null;
          })
          .filter(Boolean);

        setLocations(validLocations);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Failed to fetch locations for map", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllLocations();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            position={[
              location.coordinates.latitude,
              location.coordinates.longitude,
            ]}
            key={location._id}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.area}, {location.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
