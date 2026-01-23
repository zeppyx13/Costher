import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Platform, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../styles/colors";
import loginStyles from "../styles/login";

import LoginLogo from "../components/Login/LoginLogo";
import LoginTitle from "../components/Login/LoginTitle";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";

import { sendOtpApi, resetPasswordOtpApi } from "../api/auth.api";

const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [sending, setSending] = useState(false);
    const [resetting, setResetting] = useState(false);

    const canSendOtp = useMemo(() => {
        return !sending && isEmailValid(email.trim());
    }, [sending, email]);

    const canReset = useMemo(() => {
        const e = email.trim();
        const o = otp.trim();
        const p = newPassword.trim();
        return (
            !resetting &&
            isEmailValid(e) &&
            /^\d{6}$/.test(o) &&
            p.length >= 6
        );
    }, [resetting, email, otp, newPassword]);

    const handleSendOtp = async () => {
        const e = email.trim();
        if (!isEmailValid(e)) {
            Alert.alert("Validasi", "Email tidak valid.");
            return;
        }

        try {
            setSending(true);
            const json = await sendOtpApi(e);
            Alert.alert("Sukses", json?.data?.message || json?.message || "OTP dikirim ke email.");
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Gagal mengirim OTP";
            Alert.alert("Gagal", msg);
        } finally {
            setSending(false);
        }
    };

    const handleResetPassword = async () => {
        const e = email.trim();
        const o = otp.trim();
        const p = newPassword.trim();

        if (!isEmailValid(e)) {
            Alert.alert("Validasi", "Email tidak valid.");
            return;
        }
        if (!/^\d{6}$/.test(o)) {
            Alert.alert("Validasi", "OTP harus 6 digit angka.");
            return;
        }
        if (p.length < 6) {
            Alert.alert("Validasi", "Password minimal 6 karakter.");
            return;
        }

        try {
            setResetting(true);
            const json = await resetPasswordOtpApi({ email: e, otp: o, password: p });

            Alert.alert(
                "Berhasil",
                json?.data?.message || json?.message || "Password berhasil direset.",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }],
            );
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Gagal reset password";
            Alert.alert("Gagal", msg);
        } finally {
            setResetting(false);
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
                    title={sending ? "Mengirim..." : "Kirim OTP"}
                    onPress={handleSendOtp}
                    disabled={!canSendOtp}
                />

                <View style={{ marginTop: 24, gap: 16 }}>
                    <LoginInput
                        label="Kode OTP (6 digit)"
                        value={otp}
                        onChange={setOtp}
                        keyboardType="numeric"
                    />

                    <LoginInput
                        label="Password Baru"
                        value={newPassword}
                        onChange={setNewPassword}
                        secure
                    />
                </View>

                <LoginButton
                    title={resetting ? "Memproses..." : "Reset Password"}
                    onPress={handleResetPassword}
                    disabled={!canReset}
                />

                <View style={loginStyles.registerContainer}>
                    <Text style={loginStyles.registerText}>Sudah ingat password?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={loginStyles.registerLink}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;