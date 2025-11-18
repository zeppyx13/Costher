import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../styles/colors";

import LoginLogo from "../components/Login/LoginLogo";
import LoginTitle from "../components/Login/LoginTitle";
import LoginInput from "../components/Login/LoginInput";
import LoginButton from "../components/Login/LoginButton";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView >
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
                <LoginLogo />
                <LoginTitle />

                <View style={{ gap: 16 }}>
                    <LoginInput label="Email" value={email} onChange={setEmail} />
                    <LoginInput
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        secure
                    />
                </View>

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

                <LoginButton onPress={() => console.log("Login pressed")} />

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

                    <TouchableOpacity>
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
            </KeyboardAwareScrollView >
        </SafeAreaView>
    );
};

export default LoginScreen;
