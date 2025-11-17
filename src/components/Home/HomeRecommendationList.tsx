import React from "react";
import { ScrollView, View, Text } from "react-native";
import HomeRecommendationCard from "./HomeRecommendationCard";
import rooms from "../../data/rooms";

const HomeRecommendationList = ({ navigation }: any) => {
    const recommendedRooms = rooms.filter(r => r.available).slice(0, 3);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
        >
            {recommendedRooms.map((room) => (
                <HomeRecommendationCard
                    key={room.id}
                    room={room}
                    navigation={navigation}
                />
            ))}
        </ScrollView>
    );
};

export default HomeRecommendationList;
