import React from "react";
import { ScrollView } from "react-native";
import HomeRecommendationCard from "./HomeRecommendationCard";
import rooms from "../../data/rooms";
import reviews from "../../data/reviews";

const HomeRecommendationList = ({ navigation }: any) => {

    // Recommendation Logic
    const recommendedRooms = rooms
        .filter(room => room.available)
        .map(room => {
            const roomReviews = reviews.filter(review => review.kamar === room.number);
            const averageRating =
                roomReviews.length > 0
                    ? roomReviews.reduce((acc, r) => acc + r.rating, 0) / roomReviews.length
                    : 0;
            return {
                ...room,
                rating: Number(averageRating.toFixed(1))
            };
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    // rating Logic
    const roomsWithRating = recommendedRooms.map(room => {
        const roomReviews = reviews.filter(review => review.kamar === room.number);

        const averageRating =
            roomReviews.length > 0
                ? roomReviews.reduce((acc, r) => acc + r.rating, 0) / roomReviews.length
                : 0;

        return {
            ...room,
            rating: Number(averageRating.toFixed(1)),
            totalReviews: roomReviews.length
        };
    });

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
        >
            {roomsWithRating.map((room) => (
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
