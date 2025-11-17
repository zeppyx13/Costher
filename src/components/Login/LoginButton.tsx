import React from "react";
import { TouchableOpacity, Text } from "react-native";
import colors from "../../styles/colors";

const LoginButton = ({ onPress }: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: colors.deepMaroon,
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 28,
            }}
        >
            <Text
                style={{
                    fontFamily: "Poppins-SemiBold",
                    color: colors.elegantGold,
                    fontSize: 16,
                }}
            >
                Masuk
            </Text>
        </TouchableOpacity>
    );
};

export default LoginButton;
