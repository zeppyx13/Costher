import React from "react";
import { View, Text } from "react-native";
import roomDetailStyles from "../../styles/roomDetail";

const RoomDetailInfo = ({ room }: any) => {
    return (
        <View style={roomDetailStyles.infoSection}>
            <Text style={roomDetailStyles.roomName}>Kamar {room.number}</Text>
            <Text style={roomDetailStyles.price}>{room.price}</Text>
        </View>
    );
};

export default RoomDetailInfo;
