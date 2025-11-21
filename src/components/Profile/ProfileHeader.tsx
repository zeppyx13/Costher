import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import profileStyles from "../../styles/profile";
import colors from "../../styles/colors";

const ProfileHeader = ({ navigation }: any) => {
    return (
        <View style={profileStyles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={colors.deepMaroon} />
            </TouchableOpacity>

            <Text style={profileStyles.headerTitle}>Profil Saya</Text>

            <View style={{ width: 24 }} />
        </View>
    );
};

export default ProfileHeader;
