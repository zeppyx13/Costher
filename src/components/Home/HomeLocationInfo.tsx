import React from "react";
import { View, Text } from "react-native";
import homeStyles from "../../styles/home";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

const INIT_REGION = {
    latitude: -8.669258,     // contoh koordinat di Tukad Badung
    longitude: 115.216705,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
};

const HomeLocationInfo = () => {
    return (
        <>
            <Text style={homeStyles.sectionTitle}>Lokasi Coasther</Text>

            <Text style={homeStyles.locationAddress}>
                Jl. Tukad Badung No. 21, Denpasar Selatan
            </Text>

            <View style={homeStyles.mapWrapper}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={homeStyles.map}
                    initialRegion={INIT_REGION}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    scrollEnabled={true}
                >

                    {/* Marker Lokasi Coasther */}
                    <Marker
                        coordinate={INIT_REGION}
                        pinColor="#7B1113"   // warna deep maroon brand Coasther
                        title="Coasther Kost"
                        description="Small Cost, Big Comfort"
                    >
                        {/* Bubble Info */}
                        <Callout>
                            <View style={{ padding: 8 }}>
                                <Text style={{ fontWeight: "bold" }}>Coasther Kost</Text>
                                <Text>Small Cost, Big Comfort</Text>
                            </View>
                        </Callout>
                    </Marker>

                </MapView>
            </View>
        </>
    );
};

export default HomeLocationInfo;
