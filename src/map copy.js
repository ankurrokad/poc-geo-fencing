import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

function Map(
    { center, geoFences }
) {
    const mapStyles = {
        height: "100vh",
        width: "100%"
    };
    console.log("center", center, geoFences)

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBMOBd3LivAvY3oH0Oae7f5hG9Nm5sKATA"
        >
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={center}
            >
                <Polyline
                    path={geoFences}
                    options={{
                        strokeColor: "#0000FF",
                        strokeOpacity: 1,
                        strokeWeight: 2
                    }}
                />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;
