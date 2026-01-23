import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../styles/colors";
import loginStyles from "../styles/login";
import LoginLogo from "../components/Login/LoginLogo";
import LoginTitle from "../components/Login/LoginTitle";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";
import { loginApi } from "../api/auth.api";

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async () => {
        setErrorMsg("");

        if (!email.trim() || !password) {
            setErrorMsg("Email dan password wajib diisi.");
            return;
        }

        try {
            setLoading(true);

            const json = await loginApi(email.trim(), password);
            const token = json?.data?.token;
            if (!token) {
                throw new Error("Token tidak ditemukan dari response login.");
            }

            await AsyncStorage.setItem("token", token);
            navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }],
            });
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Login gagal.";
            setErrorMsg(msg);
            Alert.alert("Login gagal", msg);
        } finally {
            setLoading(false);
        }
    };

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
                    Title="Masuk ke Akun Anda"
                    Subtitle="Silakan login untuk melanjutkan"
                />

                <View style={{ gap: 16 }}>
                    <LoginInput label="Email" value={email} onChange={setEmail} />
                    <LoginInput
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        secure
                    />
                </View>

                {!!errorMsg && (
                    <Text style={{ marginTop: 12, color: "red" }}>{errorMsg}</Text>
                )}

                <TouchableOpacity
                    style={loginStyles.forgotContainer}
                    onPress={() => navigation.navigate("ForgotPassword")}
                    disabled={loading}
                >
                    <Text style={loginStyles.ForgotText}>Lupa Password?</Text>
                </TouchableOpacity>

                <LoginButton
                    onPress={handleLogin}
                    disabled={loading}
                    title={loading ? "Loading..." : "Masuk"}
                />

                <View style={loginStyles.registerContainer}>
                    <Text style={loginStyles.registerText}>Belum punya akun?</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                        disabled={loading}
                    >
                        <Text style={loginStyles.registerLink}>Daftar Sekarang</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;
