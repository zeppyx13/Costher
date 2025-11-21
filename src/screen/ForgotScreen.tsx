import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../styles/colors";
import loginStyles from "../styles/login";

import LoginLogo from "../components/Login/LoginLogo";
import LoginTitle from "../components/Login/LoginTitle";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";

const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
            <KeyboardAwareScrollView
                contentContainerStyle={loginStyles.Container}
                enableOnAndroid={true}
                extraScrollHeight={Platform.OS === "ios" ? 20 : 80}
                keyboardOpeningTime={0}
            >
                <LoginLogo />

                <LoginTitle
                    Title="Lupa Password?"
                    Subtitle="Masukkan email Anda untuk menerima kode OTP"
                />
                <LoginInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    keyboardType="email-address"
                />
                <LoginButton
                    title="Kirim OTP"
                    onPress={navigation.goBack}
                />
                <View style={{ marginTop: 30 }}>
                    <LoginInput
                        label="Kode OTP"
                        value={otp}
                        onChange={setOtp}
                        keyboardType="numeric"
                    />
                </View>
                <LoginButton
                    title="Reset Password"
                    onPress={navigation.goBack}
                />
                <View style={loginStyles.registerContainer}>
                    <Text style={loginStyles.registerText}>
                        Sudah ingat password?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={loginStyles.registerLink}>Masuk</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
