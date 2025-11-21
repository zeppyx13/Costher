import React from "react";
import { View, Text } from "react-native";
import profileStyles from "../../styles/profile";

const ProfileKostInfo = ({ data }: any) => {
    const rows = [
        { label: "Nomor Kamar", value: data.room },
        { label: "Status Sewa", value: data.status },
        { label: "Tagihan Berikutnya", value: data.nextPayment },
    ];

    return (
        <View style={profileStyles.infoContainer}>
            <Text style={profileStyles.infoTitle}>Informasi Kost</Text>

            {rows.map((row, index) => (
                <View key={index} style={profileStyles.infoRow}>
                    <Text style={profileStyles.infoLabel}>{row.label}</Text>
                    <Text style={profileStyles.infoValue}>{row.value}</Text>
                </View>
            ))}
        </View>
    );
};

export default ProfileKostInfo;
