import React from "react";
import { View } from "react-native";
import { styles } from "../assets/styles/styles";
const BrandComponent = () => {
    return (
        <View style={styles.header}>
            <View style={styles.brandContainer} />
        </View>
    );
};
export default BrandComponent;