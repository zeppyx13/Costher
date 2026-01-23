
import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import homeStyles from "../../styles/home";

const HomeReviewCard = ({ item }: any) => {
    return (
        <View style={homeStyles.reviewCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="person-circle" size={36} color="#7B1113" />

                <View style={{ marginLeft: 8 }}>
                    <Text style={homeStyles.reviewName}>{item.name}</Text>

                    <View style={{ flexDirection: "row" }}>
                        {Array.from({ length: item.rating }).map((_, i) => (
                            <Ionicons
                                key={i}
                                name="star"
                                size={16}
                                color="#E8B400"
                            />
                        ))}
                    </View>
                </View>
            </View>

            <Text style={homeStyles.reviewText}>{item.comment}</Text>
        </View>
    );
};

export default HomeReviewCard;