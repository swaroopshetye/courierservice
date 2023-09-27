import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useState, useContext } from "react";
import "../css/Map.css"
import NavBar from "./NavBar";
import { AuthContext } from "../utils/GlobalStates";
import NavBarProtected from "./NavBarProtected";



function HubLocation(){
    
    const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBvBYO-DVKoDIeYSalKr0HIHvRiEqiWPi0",
    });


    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const markers = [
      { address: "Pune", lat: 18.5204, lng: 73.8567 },
      { address: "Shivaji Nagar", lat: 18.5314, lng: 73.8446 },
      { address: "Baner", lat: 18.5642, lng: 73.7769 },
    ];

    var [authState, setAuthState] = useContext(AuthContext);
    const isAuthenticated = authState.id !== "" && authState.token !== ""; 
    
  
    const onMapLoad = (map) => {
      setMapRef(map);
      const bounds = new window.google.maps.LatLngBounds();
      markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);
    };
  
    const handleMarkerClick = (id, lat, lng, address) => {
      mapRef?.panTo({ lat, lng });
      setInfoWindowData({ id, address });
      setIsOpen(true);
    };

    return (<>
        {isAuthenticated ? <NavBarProtected/> : <NavBar />}
        <div style={{marginTop:"10%", textAlign:"center"}}>
        <h4>Find an SwiftTransit authorized service center near you</h4>
        </div>
        <div className="container Map">
        {!isLoaded ? (
            <h1>Loading...</h1>
            ) : (
                <GoogleMap
                mapContainerClassName="map-container"
                onLoad={onMapLoad}
                onClick={() => setIsOpen(false)}
                >
            {markers.map(({ address, lat, lng }, ind) => (
                <Marker
                key={ind}
                position={{ lat, lng }}
                onClick={() => {
                    handleMarkerClick(ind, lat, lng, address);
                }}
                >
                {isOpen && infoWindowData?.id === ind && (
                    <InfoWindow
                    onCloseClick={() => {
                        setIsOpen(false);
                    }}
                    >
                    <h3>{infoWindowData.address}</h3>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        )}
      </div>
    </>);    
}

export default HubLocation;
