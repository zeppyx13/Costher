import React from "react";
import { View, Text } from "react-native";
import homeStyles from "../../styles/home";

const HomeLocationInfo = () => {
    return (
        <>
            <Text style={homeStyles.sectionTitle}>Lokasi Coasther</Text>

            <Text style={homeStyles.locationAddress}>
                Jl. Tukad Badung No. 21, Denpasar Selatan
            </Text>

            <View style={homeStyles.mapContainer}>
                <Text style={homeStyles.mapPlaceholder}>(Map Preview)</Text>
            </View>
        </>
    );
};

export default HomeLocationInfo;
