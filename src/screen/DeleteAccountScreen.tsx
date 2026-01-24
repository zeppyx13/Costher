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

import {
    sendDeleteAccountOtpApi,
    confirmDeleteAccountApi,
} from "../api/auth.api";

const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

const DeleteAccountScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [sending, setSending] = useState(false);
    const [confirming, setConfirming] = useState(false);

    const canSendOtp = useMemo(() => {
        return !sending && isEmailValid(email.trim());
    }, [sending, email]);

    const canConfirm = useMemo(() => {
        const e = email.trim();
        const o = otp.trim();
        return !confirming && isEmailValid(e) && /^\d{6}$/.test(o);
    }, [confirming, email, otp]);

    const handleSendOtp = async () => {
        const e = email.trim();
        if (!isEmailValid(e)) {
            Alert.alert("Validasi", "Email tidak valid.");
            return;
        }

        try {
            setSending(true);
            const json = await sendDeleteAccountOtpApi(e);
            Alert.alert(
                "Sukses",
                json?.data?.message || json?.message || "OTP dikirim ke email.",
            );
        } catch (err: any) {
            const msg =
                err?.response?.data?.message || err?.message || "Gagal mengirim OTP";
            Alert.alert("Gagal", msg);
        } finally {
            setSending(false);
        }
    };

    const doConfirmDelete = async () => {
        const e = email.trim();
        const o = otp.trim();

        if (!isEmailValid(e)) {
            Alert.alert("Validasi", "Email tidak valid.");
            return;
        }
        if (!/^\d{6}$/.test(o)) {
            Alert.alert("Validasi", "OTP harus 6 digit angka.");
            return;
        }

        try {
            setConfirming(true);
            const json = await confirmDeleteAccountApi({ email: e, otp: o });

            Alert.alert(
                "Berhasil",
                json?.data?.message || json?.message || "Akun berhasil dihapus.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
                        },
                    },
                ],
            );
        } catch (err: any) {
            const msg =
                err?.response?.data?.message || err?.message || "Gagal menghapus akun";
            Alert.alert("Gagal", msg);
        } finally {
            setConfirming(false);
        }
    };

    const handleConfirmDelete = () => {
        Alert.alert(
            "Hapus Akun?",
            "Tindakan ini permanen dan tidak bisa dibatalkan. Lanjutkan?",
            [
                { text: "Batal", style: "cancel" },
                { text: "Hapus", style: "destructive", onPress: doConfirmDelete },
            ],
        );
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
                    Title="Hapus Akun"
                    Subtitle="Masukkan email akun Anda untuk menerima kode OTP konfirmasi"
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

                <View style={{ marginTop: 24 }}>
                    <LoginInput
                        label="Kode OTP (6 digit)"
                        value={otp}
                        onChange={setOtp}
                        keyboardType="numeric"
                    />
                </View>

                <LoginButton
                    title={confirming ? "Memproses..." : "Hapus Akun"}
                    onPress={handleConfirmDelete}
                    disabled={!canConfirm}
                />

                <View style={loginStyles.registerContainer}>
                    <Text style={loginStyles.registerText}>Batal hapus akun?</Text>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={loginStyles.registerLink}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default DeleteAccountScreen;
