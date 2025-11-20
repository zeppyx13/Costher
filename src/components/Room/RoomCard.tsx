import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import roomStyles from "../../styles/room";
import { useNavigation } from "@react-navigation/native";
const RoomCard = ({ item }: any) => {
    const navigation = useNavigation() as any;
    return (
        <View style={roomStyles.cardContainer}>
            <Image
                source={item.image}
                style={roomStyles.cardImage}
                resizeMode="cover"
            />

            <View style={roomStyles.cardContent}>
                <Text style={roomStyles.roomNumber}>Kamar {item.number}</Text>

                <Text style={roomStyles.roomPrice}>{item.price}</Text>

                <View style={roomStyles.facilityContainer}>
                    {item.facilities.map((f: string, i: number) => (
                        <View key={i} style={roomStyles.facilityBadge}>
                            <Text style={roomStyles.facilityText}>{f}</Text>
                        </View>
                    ))}
                </View>

                <Text
                    style={[
                        roomStyles.statusText,
                        { color: item.available ? "green" : "gray" },
                    ]}
                >
                    {item.available ? "Tersedia" : "Sudah Terisi"}
                </Text>

                <TouchableOpacity
                    disabled={!item.available}
                    style={[
                        roomStyles.bookingButton,
                        { backgroundColor: item.available ? colors.deepMaroon : colors.lightGrey },
                    ]}
                    onPress={() => {
                        if (item.available) {
                            navigation.navigate("DetailRoom", { room: item });
                        }
                    }}
                >
                    <Text
                        style={{
                            color: item.available ? colors.elegantGold : "#aaa",
                            fontFamily: "Poppins-SemiBold",
                        }}
                    >
                        {item.available ? "Booking Sekarang" : "Tidak Tersedia"}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default RoomCard;
