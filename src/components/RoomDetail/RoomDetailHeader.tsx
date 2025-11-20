import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import roomDetailStyles from "../../styles/roomDetail";

const RoomDetailHeader = ({ navigation }: any) => {
    return (
        <View style={roomDetailStyles.header}>
            <TouchableOpacity
                style={roomDetailStyles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={22} color={colors.deepMaroon} />
            </TouchableOpacity>

            <Text style={roomDetailStyles.headerTitle}>Detail Kamar</Text>
            <View style={{ width: 36 }} />
        </View>
    );
};

export default RoomDetailHeader;
