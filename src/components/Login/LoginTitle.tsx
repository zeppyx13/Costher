import React from "react";
import { View, Text } from "react-native";
import colors from "../../styles/colors";

const LoginTitle = () => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Text
                style={{
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 20,
                    color: colors.deepMaroon,
                    textAlign: "center",
                }}
            >
                Masuk ke Akun Anda
            </Text>

            <Text
                style={{
                    fontFamily: "Inter-Regular",
                    fontSize: 13,
                    color: "#6B7280",
                    textAlign: "center",
                    marginTop: 4,
                }}
            >
                Silakan login untuk melanjutkan
            </Text>
        </View>
    );
};

export default LoginTitle;
