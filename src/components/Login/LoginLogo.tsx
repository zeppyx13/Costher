import React from "react";
import { View, Text, Image } from "react-native";
import loginStyles from "../../styles/login";
const LoginLogo = () => {
    return (
        <View style={loginStyles.ContainerLogo}>
            <Image
                source={require("../../assets/images/costher.png")}
                style={loginStyles.LogoImage}
                resizeMode="cover"
            />
            <Text
                style={loginStyles.TitleText}
            >
                Coasther
            </Text>

            <Text
                style={loginStyles.SubtitleText}
            >
                Small Cost, Big Comfort
            </Text>
        </View>
    );
};

export default LoginLogo;
