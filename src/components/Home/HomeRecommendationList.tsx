import React from "react";
import { ScrollView } from "react-native";
import HomeRecommendationCard from "./HomeRecommendationCard";

const HomeRecommendationList = ({ navigation }: any) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
        >
            {[1, 2, 3].map((item) => (
                <HomeRecommendationCard
                    key={item}
                    item={item}
                    navigation={navigation}
                />
            ))}
        </ScrollView>
    );
};

export default HomeRecommendationList;
