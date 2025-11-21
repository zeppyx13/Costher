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

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                    Title="Daftar Akun Baru"
                    Subtitle="Buat akun untuk melanjutkan"
                />
                <View style={{ gap: 16 }}>

                    <LoginInput
                        label="Nama Lengkap"
                        value={name}
                        onChange={setName}
                    />

                    <LoginInput
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        keyboardType="email-address"
                    />

                    <LoginInput
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        secure
                    />

                    <LoginInput
                        label="Konfirmasi Password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        secure
                    />
                </View>
                <LoginButton
                    title="Daftar"
                    onPress={navigation.goBack}
                />
                <View style={loginStyles.registerContainer}>
                    <Text style={loginStyles.registerText}>Sudah punya akun?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={loginStyles.registerLink}>Masuk</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
