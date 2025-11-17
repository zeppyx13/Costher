import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import homeStyles from "../../styles/home";

const HomeRecommendationCard = ({ item, navigation }: any) => {
    return (
        <TouchableOpacity
            style={homeStyles.recommendCard}
            onPress={() => navigation.navigate("Room")}
        >
            <Image
                source={require("../../assets/images/costher.png")}
                style={homeStyles.recommendImage}
            />

            <View style={homeStyles.recommendContent}>
                <Text style={homeStyles.recommendTitle}>Kamar 0{item}</Text>

                <Text style={homeStyles.recommendPrice}>
                    Rp 2.200.000 / bulan
                </Text>

                <View style={homeStyles.recommendStatusContainer}>
                    <Text style={homeStyles.recommendStatus}>Tersedia</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default HomeRecommendationCard;
