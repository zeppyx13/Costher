import React from "react";
import { View, Text, TextInput } from "react-native";
import colors from "../../styles/colors";

const LoginInput = ({ label, value, onChange, secure }: any) => {
    return (
        <View>
            <Text
                style={{
                    fontFamily: "Inter-Medium",
                    fontSize: 13,
                    color: colors.darkCharcoal,
                    marginBottom: 6,
                }}
            >
                {label}
            </Text>

            <TextInput
                placeholder={`Masukkan ${label.toLowerCase()} Anda`}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChange}
                secureTextEntry={secure}
                keyboardType={label === "Email" ? "email-address" : "default"}
                autoCapitalize="none"
                style={{
                    backgroundColor: "#F9FAFB",
                    borderColor: "#E5E7EB",
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    fontFamily: "Inter-Regular",
                    fontSize: 14,
                    color: colors.darkCharcoal,
                }}
            />
        </View>
    );
};

export default LoginInput;
