import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";

import HomeRecommendationCard from "./HomeRecommendationCard";
import reviews from "../../data/reviews";

import { getRoomsApi, RoomApi } from "../../api/rooms.api";
import { ROOM_IMAGE_MAP } from "../../data/roomImageMap";

function formatRupiah(n: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(n || 0));
}

const HomeRecommendationList = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState<RoomApi[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setError("");
                setLoading(true);

                const json = await getRoomsApi();
                setRooms(json?.data?.rooms ?? []);
            } catch (e: any) {
                setError(e?.response?.data?.message || e?.message || "Gagal memuat rekomendasi");
                setRooms([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const roomsWithRating = useMemo(() => {
        const availableRooms = (Array.isArray(rooms) ? rooms : []).filter(
            (r) => Number(r.is_available) === 1
        );
        const enriched = availableRooms.map((room) => {
            const roomReviews = reviews.filter((rev) => rev.kamar === room.number);
            const avg =
                roomReviews.length > 0
                    ? roomReviews.reduce((acc, r) => acc + r.rating, 0) / roomReviews.length
                    : 0;

            return {
                id: String(room.id),
                number: room.number,
                price: `${formatRupiah(room.price_monthly)} / bulan`,
                available: true,
                image:
                    ROOM_IMAGE_MAP[room.main_image_url || ""] ??
                    require("../../assets/images/costher.png"),
                rating: Number(avg.toFixed(1)),
                totalReviews: roomReviews.length,
                description: room.description ?? "",
                floor: room.floor,
                deposit: room.deposit,
                facilities: [],
            };
        });
        return enriched.sort((a, b) => b.rating - a.rating).slice(0, 3);
    }, [rooms]);

    if (loading) {
        return (
            <View style={{ marginBottom: 10, paddingVertical: 8 }}>
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ marginBottom: 10, paddingVertical: 8 }}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

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