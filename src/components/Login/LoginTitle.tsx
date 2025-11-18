import React from "react";
import { View, Text } from "react-native";
import loginStyles from "../../styles/login";

const LoginTitle = ({ Title, Subtitle }: any) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Text
                style={loginStyles.LoginTitle}
            >
                {Title}
            </Text>

            <Text
                style={loginStyles.LoginSubtitle}
            >
                {Subtitle}
            </Text>
        </View>
    );
};

export default LoginTitle;
