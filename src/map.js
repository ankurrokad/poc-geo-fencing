import { GoogleMap, Polygon, } from '@react-google-maps/api';

function MapComponent(
    { center, selectedPlace, paths }
) {
    return (
        <GoogleMap
            mapContainerStyle={{
                height: "500px",
                width: "100%"
            }}
            center={center}
            zoom={13}
        >
            {paths && paths.length && (
                <>
                    <Polygon
                        paths={paths}
                        options={{
                            strokeColor: "#ff0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#ff0000",
                            fillOpacity: 0.35,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            visible: true
                        }}
                    />

                    {/* <Marker position={selectedPlace.location} />
                    <Polygon paths={selectedPlace.path} />
                    <Polyline path={selectedPlace.path} /> */}

                </>

            )}

        </GoogleMap>
        // </LoadScript>
    );
}

export default MapComponent;
