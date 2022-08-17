import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css"

const Map = ({ centerCoordinates }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    if (!isLoaded) return <div>Loading...</div>
    return (
        <GoogleMap zoom={15} center={centerCoordinates} mapContainerClassName="map-container">
            <Marker position={centerCoordinates} />
        </GoogleMap>
    )
}

export default Map;