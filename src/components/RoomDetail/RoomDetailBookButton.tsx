import React from "react";
import { TouchableOpacity, Text } from "react-native";
import roomDetailStyles from "../../styles/roomDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RoomDetailBookButton = ({ room, navigation }: any) => {
    const handlePress = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            navigation.navigate("Login", { 
                redirectTo: "Booking", 
                roomData: room 
            });
        } else {
            navigation.navigate("Booking", { room });
        }
    };

    return (
        <TouchableOpacity
            disabled={!room.available}
            style={[
                roomDetailStyles.bookButton,
                !room.available && { backgroundColor: "#ccc" },
            ]}
            onPress={handlePress}
        >
            <Text style={roomDetailStyles.bookButtonText}>
                {room.available ? room.price : "Tidak Tersedia"}
            </Text>
        </TouchableOpacity>
    );
};

export default RoomDetailBookButton;
