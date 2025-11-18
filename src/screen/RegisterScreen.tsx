import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";;
import registerStyles from "../styles/register";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", paddingBottom: 20 }}>
            <KeyboardAwareScrollView
                contentContainerStyle={registerStyles.container}
                enableOnAndroid={true}
                extraScrollHeight={Platform.OS === "ios" ? 20 : 80}
                keyboardOpeningTime={0}
            >
                {/* === LOGO & BRAND === */}
                <View style={registerStyles.logoContainer}>
                    <Image
                        source={require("../assets/images/costher.png")}
                        style={registerStyles.logoImage}
                    />

                    <Text style={registerStyles.logoTitle}>Coasther</Text>
                    <Text style={registerStyles.logoSubtitle}>
                        Small Cost, Big Comfort
                    </Text>
                </View>

                {/* === TITLE === */}
                <View style={registerStyles.titleContainer}>
                    <Text style={registerStyles.registerTitle}>Daftar Akun</Text>

                    <Text style={registerStyles.registerSubtitle}>
                        Buat akun baru untuk melanjutkan
                    </Text>
                </View>

                {/* === FORM === */}
                <View style={{ gap: 16 }}>
                    {/* Name */}
                    <View>
                        <Text style={registerStyles.inputLabel}>Nama Lengkap</Text>
                        <TextInput
                            placeholder="Masukkan nama Anda"
                            placeholderTextColor="#9CA3AF"
                            value={name}
                            onChangeText={setName}
                            style={registerStyles.inputField}
                        />
                    </View>

                    {/* Email */}
                    <View>
                        <Text style={registerStyles.inputLabel}>Email</Text>
                        <TextInput
                            placeholder="Masukkan email Anda"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={registerStyles.inputField}
                        />
                    </View>

                    {/* Password */}
                    <View>
                        <Text style={registerStyles.inputLabel}>Password</Text>
                        <TextInput
                            placeholder="Buat password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={registerStyles.inputField}
                        />
                    </View>

                    {/* Confirm Password */}
                    <View>
                        <Text style={registerStyles.inputLabel}>
                            Konfirmasi Password
                        </Text>
                        <TextInput
                            placeholder="Ulangi password"
                            placeholderTextColor="#9CA3AF"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={registerStyles.inputField}
                        />
                    </View>
                </View>

                {/* === REGISTER BUTTON === */}
                <TouchableOpacity style={registerStyles.buttonStyle}>
                    <Text style={registerStyles.buttonText}>Daftar</Text>
                </TouchableOpacity>

                {/* === LOGIN LINK === */}
                <View style={registerStyles.bottomRow}>
                    <Text style={registerStyles.bottomText}>
                        Sudah punya akun?{" "}
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={registerStyles.bottomLink}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
