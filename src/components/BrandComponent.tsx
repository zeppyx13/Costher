import React from "react";
import { View, Text } from "react-native";
import { styles } from "../assets/styles/styles";
const BrandComponent = () => {
    return (
        <View style={styles.header}>
            <View style={styles.brandContainer} />
            <Text style={styles.brandName}>Brand Name</Text>
        </View>
    );
};

export default BrandComponent;