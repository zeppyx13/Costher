import React from "react";
import { View, Text, TextInput } from "react-native";
import loginStyles from "../../styles/login";

const LoginInput = ({ label, value, onChange, secure }: any) => {
    return (
        <View>
            <Text
                style={loginStyles.TextInputLabel}
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
                style={loginStyles.InputField}
            />
        </View>
    );
};

export default LoginInput;
