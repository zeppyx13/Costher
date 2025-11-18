import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../styles/colors";

import LoginLogo from "../components/Login/LoginLogo";
import LoginTitle from "../components/Login/LoginTitle";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                    paddingHorizontal: 24,
                    paddingVertical: 40,
                }}
                enableOnAndroid={true}
                extraScrollHeight={Platform.OS === "ios" ? 20 : 80}
                keyboardOpeningTime={0}
            >
                {/* === LOGO === */}
                <LoginLogo />

                {/* === TITLE === */}
                <LoginTitle />

                {/* === INPUT FORM === */}
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

                {/* === LUPA PASSWORD === */}
                <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 10 }}>
                    <Text
                        style={{
                            fontFamily: "Inter-Medium",
                            fontSize: 13,
                            color: colors.deepMaroon,
                        }}
                    >
                        Lupa Password?
                    </Text>
                </TouchableOpacity>

                {/* === BUTTON LOGIN === */}
                <LoginButton onPress={() => console.log("Login pressed")} />

                {/* === REGISTER LINK === */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Inter-Regular",
                            fontSize: 13,
                            color: colors.darkCharcoal,
                        }}
                    >
                        Belum punya akun?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text
                            style={{
                                fontFamily: "Inter-Medium",
                                fontSize: 13,
                                color: colors.deepMaroon,
                                marginLeft: 4,
                            }}
                        >
                            Daftar Sekarang
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;
