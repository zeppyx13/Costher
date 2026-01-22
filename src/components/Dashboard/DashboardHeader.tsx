import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import { useNavigation } from "@react-navigation/native";

const DashboardHeader = ({ item }: any) => {
    const navigation = useNavigation() as any;
    const avatarSource =
        item?.avatar ??
        require("../../assets/images/costher.png");

    return (
        <View style={dashboardStyles.header}>
            <Image source={avatarSource} style={dashboardStyles.headerAvatar} />

            <View style={{ flex: 1 }}>
                <Text style={dashboardStyles.headerName}>{item.name}</Text>
                <Text style={dashboardStyles.headerRoom}>
                    Kamar {item.number} — Lantai {item.floor}
                </Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text style={dashboardStyles.headerLink}>Profil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardHeader;
