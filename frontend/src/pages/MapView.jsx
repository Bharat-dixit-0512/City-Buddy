import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import Spinner from '../components/shared/Spinner';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const MapView = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllLocations = async () => {
            try {
                // Fetch all places, the API limit might need adjustment for many places
                const res = await axios.get(`${API_BASE}/places?limit=500`);
                
                // Filter out locations that do not have valid coordinates
                const validLocations = res.data.data.filter(
                    item => item.latitude != null && item.longitude != null
                );
                
                setLocations(validLocations);
            } catch (error) {
                console.error("Failed to fetch locations for map", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllLocations();
    }, []);

    if (loading) return <div className="h-screen flex justify-center items-center"><Spinner /></div>;
    
    return (
        <div className="h-screen w-full">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map(loc => (
                    <Marker position={[loc.latitude, loc.longitude]} key={loc._id}>
                        <Popup>
                            <strong>{loc.name}</strong><br />
                            {loc.area}, {loc.city}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;