import React from "react";
import { TouchableOpacity, Text } from "react-native";
import roomDetailStyles from "../../styles/roomDetail";

const RoomDetailBookButton = ({ room, navigation }: any) => {
    return (
        <TouchableOpacity
            disabled={!room.available}
            style={[
                roomDetailStyles.bookButton,
                !room.available && { backgroundColor: "#ccc" },
            ]}
            onPress={() => navigation.navigate("Payment", { room })}
        >
            <Text style={roomDetailStyles.bookButtonText}>
                {room.available ? room.price : "Tidak Tersedia"}
            </Text>
        </TouchableOpacity>
    );
};

export default RoomDetailBookButton;
