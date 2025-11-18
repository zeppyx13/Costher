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
import login from "../styles/login";

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <LoginInput
                        label="Email"
                        value={email}
                        onChange={setEmail}
                    />

                    <LoginInput
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        secure
                    />
                </View>
                <TouchableOpacity style={loginStyles.forgotContainer}>
                    <Text
                        style={loginStyles.ForgotText}
                    >
                        Lupa Password?
                    </Text>
                </TouchableOpacity>
                <LoginButton onPress={() => console.log("Login pressed")} />

                <View
                    style={loginStyles.registerContainer}
                >
                    <Text
                        style={loginStyles.registerText}
                    >
                        Belum punya akun?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text
                            style={loginStyles.registerLink}
                        >
                            Daftar Sekarang
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView >
    );
};

export default LoginScreen;
