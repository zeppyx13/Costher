import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import editProfileStyles from "../../styles/editProfile";
import colors from "../../styles/colors";

const EditProfileHeader = ({ navigation }: any) => {
    return (
        <View style={editProfileStyles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={colors.deepMaroon} />
            </TouchableOpacity>

            <Text style={editProfileStyles.headerTitle}>Edit Profil</Text>

            <View style={{ width: 24 }} />
        </View>
    );
};

export default EditProfileHeader;
