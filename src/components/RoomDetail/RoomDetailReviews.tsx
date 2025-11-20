import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import roomDetailStyles from "../../styles/roomDetail";

const reviews = [
    {
        name: "Bagus Pratama",
        review: "Kamar nyaman, lokasi dekat kampus dan fasilitas lengkap.",
        rating: 5,
    },
    {
        name: "Sinta Lestari",
        review: "Pengelola ramah, area bersih, suasana tenang.",
        rating: 4,
    },
];

const RoomDetailReviews = () => {
    return (
        <View style={roomDetailStyles.section}>
            <Text style={roomDetailStyles.sectionTitle}>Ulasan Penghuni</Text>

            <View style={roomDetailStyles.reviewSummary}>
                <Ionicons name="star" size={20} color="#E8B400" />
                <Text style={roomDetailStyles.reviewScore}>4.6</Text>
                <Text style={roomDetailStyles.reviewTotal}>(28 ulasan)</Text>
            </View>

            {reviews.map((item, index) => (
                <View key={index} style={roomDetailStyles.reviewItem}>
                    <View style={roomDetailStyles.reviewHeader}>
                        <Ionicons
                            name="person-circle"
                            size={32}
                            color={colors.deepMaroon}
                        />
                        <View style={{ marginLeft: 8 }}>
                            <Text style={roomDetailStyles.reviewName}>{item.name}</Text>

                            <View style={{ flexDirection: "row" }}>
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <Ionicons key={i} name="star" size={16} color="#E8B400" />
                                ))}
                            </View>
                        </View>
                    </View>

                    <Text style={roomDetailStyles.reviewText}>{item.review}</Text>
                </View>
            ))}
        </View>
    );
};

export default RoomDetailReviews;
