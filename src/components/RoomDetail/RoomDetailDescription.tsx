import React from "react";
import { View, Text } from "react-native";
import roomDetailStyles from "../../styles/roomDetail";

const RoomDetailDescription = ({ description }: any) => {
    return (
        <View style={roomDetailStyles.section}>
            <Text style={roomDetailStyles.sectionTitle}>Deskripsi</Text>
            <Text style={roomDetailStyles.descriptionText}>{description}</Text>
        </View>
    );
};

export default RoomDetailDescription;
