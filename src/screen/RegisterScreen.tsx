import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../styles/colors";
import loginStyles from "../styles/login";

import LoginLogo from "../components/Login/LoginLogo";
import LoginTitle from "../components/Login/LoginTitle";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";

import { registerApi } from "../api/auth.api";

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onRegister = async () => {
        // validasi dasar
        if (!name || !email || !password || !confirmPassword) {
            setError("Semua field wajib diisi");
            return;
        }

        if (password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password dan konfirmasi tidak sama");
            return;
        }

        try {
            setError("");
            setLoading(true);

            await registerApi({
                name,
                email,
                password,
            });

            Alert.alert(
                "Registrasi Berhasil",
                "Silakan login menggunakan akun yang baru dibuat",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            );
        } catch (e: any) {
            setError(
                e?.response?.data?.message ||
                e?.message ||
                "Registrasi gagal"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
            <KeyboardAwareScrollView
                contentContainerStyle={loginStyles.Container}
                enableOnAndroid
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
                        autoCapitalize="none"
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

                {error ? (
                    <Text style={{ color: "red", marginTop: 12, textAlign: "center" }}>
                        {error}
                    </Text>
                ) : null}

                <LoginButton
                    title={loading ? "Mendaftar..." : "Daftar"}
                    onPress={onRegister}
                    disabled={loading}
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
