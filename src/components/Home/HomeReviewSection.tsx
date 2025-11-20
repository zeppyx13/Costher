import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import homeStyles from "../../styles/home";
import reviews from "../../data/reviews";
import HomeReviewCard from "./HomeReviewCard";

const CARD_WIDTH = 250;

const HomeReviewSection = () => {
    const scrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % reviews.length;
            setCurrentIndex(nextIndex);

            scrollRef.current?.scrollTo({
                x: nextIndex * CARD_WIDTH,
                animated: true,
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <View style={{ marginTop: 28 }}>
            <Text style={homeStyles.sectionTitle}>Review Penghuni</Text>

            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingHorizontal: 2,
                    paddingVertical: 6,
                }}
            >
                {reviews.map((item, index) => (
                    <HomeReviewCard key={index} item={item} />
                ))}
            </ScrollView>
        </View>
    );
};

export default HomeReviewSection;