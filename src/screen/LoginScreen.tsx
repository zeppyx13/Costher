import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import colors from "../styles/colors";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: colors.appBackground }}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                    paddingHorizontal: 24,
                    paddingVertical: 40,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* === LOGO & BRAND === */}
                <View
                    style={{
                        alignItems: "center",
                        marginBottom: 40,
                    }}
                >
                    <Image
                        source={require("../assets/images/costher.png")}
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 45,
                            marginBottom: 12,
                        }}
                        resizeMode="cover"
                    />
                    <Text
                        style={{
                            fontFamily: "Poppins-Bold",
                            fontSize: 22,
                            color: colors.deepMaroon,
                        }}
                    >
                        Coasther
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Inter-Regular",
                            fontSize: 13,
                            color: colors.darkCharcoal,
                        }}
                    >
                        Small Cost, Big Comfort
                    </Text>
                </View>

                {/* === LOGIN TITLE === */}
                <View style={{ marginBottom: 30 }}>
                    <Text
                        style={{
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 20,
                            color: colors.deepMaroon,
                            textAlign: "center",
                        }}
                    >
                        Masuk ke Akun Anda
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Inter-Regular",
                            fontSize: 13,
                            color: "#6B7280",
                            textAlign: "center",
                            marginTop: 4,
                        }}
                    >
                        Silakan login untuk melanjutkan
                    </Text>
                </View>

                {/* === INPUT FORM === */}
                <View style={{ gap: 16 }}>
                    <View>
                        <Text
                            style={{
                                fontFamily: "Inter-Medium",
                                fontSize: 13,
                                color: colors.darkCharcoal,
                                marginBottom: 6,
                            }}
                        >
                            Email
                        </Text>
                        <TextInput
                            placeholder="Masukkan email Anda"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={{
                                backgroundColor: "#F9FAFB",
                                borderColor: "#E5E7EB",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingVertical: 12,
                                paddingHorizontal: 14,
                                fontFamily: "Inter-Regular",
                                fontSize: 14,
                                color: colors.darkCharcoal,
                            }}
                        />
                    </View>

                    <View>
                        <Text
                            style={{
                                fontFamily: "Inter-Medium",
                                fontSize: 13,
                                color: colors.darkCharcoal,
                                marginBottom: 6,
                            }}
                        >
                            Password
                        </Text>
                        <TextInput
                            placeholder="Masukkan password Anda"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={{
                                backgroundColor: "#F9FAFB",
                                borderColor: "#E5E7EB",
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingVertical: 12,
                                paddingHorizontal: 14,
                                fontFamily: "Inter-Regular",
                                fontSize: 14,
                                color: colors.darkCharcoal,
                            }}
                        />
                    </View>
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

                {/* === TOMBOL LOGIN === */}
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.deepMaroon,
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: "center",
                        marginTop: 28,
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Poppins-SemiBold",
                            color: colors.elegantGold,
                            fontSize: 16,
                        }}
                    >
                        Masuk
                    </Text>
                </TouchableOpacity>

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
                        Belum punya akun?{" "}
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: "Inter-Medium",
                                fontSize: 13,
                                color: colors.deepMaroon,
                            }}
                        >
                            Daftar Sekarang
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
