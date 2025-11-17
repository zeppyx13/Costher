import React from "react";
import { View, Image } from "react-native";
import homeStyles from "../../styles/home";

const HomeBanner = () => {
    return (
        <View style={homeStyles.bannerContainer}>
            <Image
                source={require("../../assets/images/costher.png")}
                style={homeStyles.bannerImage}
                resizeMode="cover"
            />
        </View>
    );
};

export default HomeBanner;
