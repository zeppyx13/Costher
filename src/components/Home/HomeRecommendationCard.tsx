import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import homeStyles from "../../styles/home";

const HomeRecommendationCard = ({ room, navigation }: any) => {
    return (
        <TouchableOpacity
            style={homeStyles.recommendCard}
            onPress={() => navigation.navigate("Room")}
        >
            <Image
                source={room.image}
                style={homeStyles.recommendImage}
            />

            <View style={homeStyles.recommendContent}>
                <Text style={homeStyles.recommendTitle}>{room.number}</Text>

                <Text style={homeStyles.recommendPrice}>{room.price}</Text>

                <View style={homeStyles.recommendStatusContainer}>
                    <Text
                        style={[
                            homeStyles.recommendStatus,
                            { color: room.available ? "green" : "gray" }
                        ]}
                    >
                        {room.available ? "Tersedia" : "Sudah Terisi"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default HomeRecommendationCard;
