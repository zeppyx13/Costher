import React from "react";
import { View, Text, Image } from "react-native";
import colors from "../../styles/colors";

const LoginLogo = () => {
    return (
        <View style={{ alignItems: "center", marginBottom: 40 }}>
            <Image
                source={require("../../assets/images/costher.png")}
                style={{
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    marginBottom: 12,
                }}
                resizeMode="cover"
            />
            <Text
                style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 22,
                    color: colors.deepMaroon,
                }}
            >
                Coasther
            </Text>

            <Text
                style={{
                    fontFamily: "Inter-Regular",
                    fontSize: 13,
                    color: colors.darkCharcoal,
                }}
            >
                Small Cost, Big Comfort
            </Text>
        </View>
    );
};

export default LoginLogo;
