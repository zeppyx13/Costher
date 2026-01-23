import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import editProfileStyles from "../styles/editProfile";
import EditProfileHeader from "../components/Profile/EditProfileHeader";
import EditProfileInput from "../components/Profile/EditProfileInput";
import EditProfileButton from "../components/Profile/EditProfileButton";

import { updateMeApi } from "../api/user.api";

const EditProfileScreen = ({ navigation, route }: any) => {
    const data = route.params?.data;

    const [name, setName] = useState(data?.name || "");
    const [phone, setPhone] = useState(data?.phone || "");
    const email = data?.email || "";

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);

            const payload: any = {
                name: name.trim(),
                phone: phone.trim(),
            };

            // biar tidak kirim string kosong
            if (!payload.name) delete payload.name;
            if (!payload.phone) delete payload.phone;

            const json = await updateMeApi(payload);

            Alert.alert("Sukses", json?.message || "Profil berhasil diperbarui");
            navigation.goBack();
        } catch (e: any) {
            const msg =
                e?.response?.data?.message ||
                e?.message ||
                "Gagal memperbarui profil";
            Alert.alert("Gagal", msg);
        } finally {
            setLoading(false);
        }
    };

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
                        editable={false}
                    />

                    <EditProfileInput
                        label="Nomor HP"
                        value={phone}
                        keyboardType="phone-pad"
                        onChange={setPhone}
                    />
                </View>

                <EditProfileButton
                    onPress={handleSave}
                    disabled={loading}
                    title={loading ? "Menyimpan..." : "Simpan"}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;
