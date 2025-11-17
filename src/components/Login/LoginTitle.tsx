import React from "react";
import { View, Text } from "react-native";
import loginStyles from "../../styles/login";

const LoginTitle = () => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Text
                style={loginStyles.LoginTitle}
            >
                Masuk ke Akun Anda
            </Text>

            <Text
                style={loginStyles.LoginSubtitle}
            >
                Silakan login untuk melanjutkan
            </Text>
        </View>
    );
};

export default LoginTitle;
