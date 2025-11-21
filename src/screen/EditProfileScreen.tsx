import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";

import colors from "../styles/colors";
import editProfileStyles from "../styles/editProfile";

import EditProfileHeader from "../components/Profile/EditProfileHeader";
import EditProfileInput from "../components/Profile/EditProfileInput";
import EditProfileButton from "../components/Profile/EditProfileButton";

const EditProfileScreen = ({ navigation, route }: any) => {
    const data = route.params?.data;

    const [name, setName] = useState(data?.name || "");
    const [email, setEmail] = useState(data?.email || "");
    const [phone, setPhone] = useState(data?.phone || "");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView style={editProfileStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}
            >
                <EditProfileHeader navigation={navigation} />

                <View style={editProfileStyles.formWrapper}>
                    <EditProfileInput
                        label="Nama Lengkap"
                        value={name}
                        onChange={setName}
                    />

                    <EditProfileInput
                        label="Email"
                        value={email}
                        keyboardType="email-address"
                        onChange={setEmail}
                    />

                    <EditProfileInput
                        label="Nomor HP"
                        value={phone}
                        keyboardType="phone-pad"
                        onChange={setPhone}
                    />

                    <EditProfileInput
                        label="Password Baru (Opsional)"
                        value={password}
                        onChange={setPassword}
                        secure
                    />
                </View>

                <EditProfileButton
                    onPress={() => {
                        console.log("Data saved:", { name, email, phone, password });
                        navigation.goBack();
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;
