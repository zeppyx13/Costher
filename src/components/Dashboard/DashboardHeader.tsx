import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";

const DashboardHeader = () => {
    return (
        <View style={dashboardStyles.header}>
            <Image
                source={require("../../assets/images/costher.png")}
                style={dashboardStyles.headerAvatar}
            />

            <View style={{ flex: 1 }}>
                <Text style={dashboardStyles.headerName}>Dewa Dharma</Text>
                <Text style={dashboardStyles.headerRoom}>Kamar 03 — Lantai 1</Text>
            </View>

            <TouchableOpacity>
                <Text style={dashboardStyles.headerLink}>Profil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardHeader;
