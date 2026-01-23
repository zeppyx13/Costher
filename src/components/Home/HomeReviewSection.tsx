import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import homeStyles from "../../styles/home";
import HomeReviewCard from "./HomeReviewCard";

import { getReviewsApi, ReviewItem } from "../../api/reviews.api";

const CARD_WIDTH = 250;

const HomeReviewSection = () => {
    const scrollRef = useRef<ScrollView>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                setError("");
                setLoading(true);
                const json = await getReviewsApi({ limit: 10 });
                setReviews(json?.data?.reviews ?? []);
                setCurrentIndex(0);
            } catch (e: any) {
                setError(e?.response?.data?.message || e?.message || "Gagal memuat review");
                setReviews([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const hasReviews = useMemo(() => reviews.length > 0, [reviews]);

    useEffect(() => {
        if (!hasReviews) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = (prev + 1) % reviews.length;

                scrollRef.current?.scrollTo({
                    x: next * CARD_WIDTH,
                    animated: true,
                });

                return next;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [hasReviews, reviews.length]);

    return (
        <View style={{ marginTop: 28 }}>
            <Text style={homeStyles.sectionTitle}>Review Penghuni</Text>

            {loading ? (
                <View style={{ paddingVertical: 10 }}>
                    <ActivityIndicator />
                </View>
            ) : error ? (
                <Text style={{ marginTop: 8, color: "red" }}>{error}</Text>
            ) : !hasReviews ? (
                <Text style={{ marginTop: 8, color: "#666" }}>Belum ada review.</Text>
            ) : (
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
                        <HomeReviewCard key={`${item.number}-${item.created_at}-${index}`} item={item} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default HomeReviewSection;
