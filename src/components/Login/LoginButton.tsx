import React from "react";
import { TouchableOpacity, Text } from "react-native";
import loginStyles from "../../styles/login";

const LoginButton = ({ onPress }: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={loginStyles.ButtonStyle}
        >
            <Text
                style={loginStyles.buttonText}
            >
                Masuk
            </Text>
        </TouchableOpacity>
    );
};

export default LoginButton;
