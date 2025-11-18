import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import advantages from "../../data/advantage";
import homeStyles from "../../styles/home";

const INIT_REGION = {
    latitude: -8.669258,
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

            <View style={homeStyles.mapCard}>
                {/* MAP */}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={homeStyles.map}
                    initialRegion={INIT_REGION}
                    showsUserLocation
                    showsPointsOfInterests
                    showsMyLocationButton
                    showsCompass={false}
                    toolbarEnabled={false}
                >
                    <Marker
                        coordinate={INIT_REGION}
                        pinColor="#7B1113"   // warna deep maroon brand Coasther
                        title="Coasther Kost"
                        description="Small Cost, Big Comfort"
                    >
                        <Callout tooltip>
                            <View style={homeStyles.calloutBox}>
                                <Text style={homeStyles.calloutTitle}>Coasther Kost</Text>
                                <Text style={homeStyles.calloutSubtitle}>
                                    Small Cost, Big Comfort
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                </MapView>

                {/* Overlay Button */}
                <TouchableOpacity
                    style={homeStyles.mapButton}
                    onPress={() => {
                        const lat = -8.669258;
                        const lng = 115.216705;
                        Linking.openURL(`geo:${lat},${lng}?q=${lat},${lng}(Coasther)`);
                    }}
                >
                    <Text style={homeStyles.mapButtonText}>Buka di Google Maps</Text>
                </TouchableOpacity>

            </View>
            {/* ADVANTAGE SECTION */}
            <Text style={homeStyles.sectionTitle}>Keunggulan Lokasi</Text>

            <View style={homeStyles.advantageContainer}>
                {advantages.map((item, index) => (
                    <View key={index} style={homeStyles.advantageItem}>
                        <Ionicons
                            name={item.icon}
                            size={20}
                            color="#7B1113"
                        />
                        <Text style={homeStyles.advantageText}>
                            {item.text}
                        </Text>
                    </View>
                ))}
            </View>
        </>
    );
};

export default HomeLocationInfo;
