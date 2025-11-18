import React from "react";
import { TouchableOpacity, Text } from "react-native";
import loginStyles from "../../styles/login";

const LoginButton = ({ onPress, title = "Masuk" }: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={loginStyles.ButtonStyle}
        >
            <Text
                style={loginStyles.buttonText}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default LoginButton;
