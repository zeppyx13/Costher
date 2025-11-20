import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import homeStyles from "../../styles/home";

const HomeRecommendationCard = ({ room, navigation }: any) => {
    return (
        <TouchableOpacity
            style={homeStyles.recommendCard}
            onPress={() => navigation.navigate("DetailRoom", { room })}
        >
            <Image source={room.image} style={homeStyles.recommendImage} />

            <View style={homeStyles.recommendContent}>
                <Text style={homeStyles.recommendTitle}>
                    Kamar {room.number}
                </Text>
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
                <View style={homeStyles.recommendRatingRow}>
                    <Ionicons name="star" size={16} color="#E8B400" />
                    <Text style={homeStyles.recommendRatingText}>
                        {room.rating}
                    </Text>
                    <Text style={homeStyles.recommendReviewCount}>
                        ({room.totalReviews})
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default HomeRecommendationCard;
