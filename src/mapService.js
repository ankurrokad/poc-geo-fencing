import React, { useRef, useEffect } from "react";

function Map2({ placeId, apiKey }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!placeId || !apiKey) {
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.onload = () => {
            const service = new google.maps.places.PlacesService(mapRef.current);
            service.getDetails(
                {
                    placeId,
                    fields: ["geometry"],
                },
                (place, status) => {
                    if (status === "OK") {
                        const map = new google.maps.Map(mapRef.current, {
                            center: place.geometry.location,
                            zoom: 14,
                        });
                        const bounds = new google.maps.LatLngBounds();
                        const paths = place.geometry.bounds
                            ? [
                                {
                                    lat: place.geometry.bounds.f.f,
                                    lng: place.geometry.bounds.b.b,
                                },
                                {
                                    lat: place.geometry.bounds.f.f,
                                    lng: place.geometry.bounds.b.f,
                                },
                                {
                                    lat: place.geometry.bounds.f.b,
                                    lng: place.geometry.bounds.b.f,
                                },
                                {
                                    lat: place.geometry.bounds.f.b,
                                    lng: place.geometry.bounds.b.b,
                                },
                            ]
                            : place.geometry.viewport.getArray()[0].getArray();
                        paths.forEach((path) => bounds.extend(path));
                        const boundary = new google.maps.Polygon({
                            paths,
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#FF0000",
                            fillOpacity: 0.35,
                        });
                        boundary.setMap(map);
                        map.fitBounds(bounds);
                    } else {
                        console.error(`Error fetching place details: ${status}`);
                    }
                }
            );
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [placeId, apiKey]);

    return <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>;
}

export default Map2;