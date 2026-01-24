import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";

import HomeRecommendationCard from "./HomeRecommendationCard";

import { getRoomsApi, RoomApi } from "../../api/rooms.api";
import { ROOM_IMAGE_MAP } from "../../data/roomImageMap";

function formatRupiah(n: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(n || 0));
}

type RoomUI = {
    id: string;
    number: string;
    price: string;
    available: boolean;
    image: any;
    rating: number;
    totalReviews: number;
    description: string;
    floor: number;
    deposit: number;
    facilities: string[];
};

const HomeRecommendationList = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState<any[]>([]); // any[] karena response rooms sudah ada facilities/review_avg/review_count
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setError("");
                setLoading(true);

                const json = await getRoomsApi({ page: 1, limit: 50 });
                setRooms(json?.data?.rooms ?? []);
            } catch (e: any) {
                setError(
                    e?.response?.data?.message ||
                    e?.message ||
                    "Gagal memuat rekomendasi"
                );
                setRooms([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const recommendedRooms: RoomUI[] = useMemo(() => {
        const arr = Array.isArray(rooms) ? rooms : [];

        // hanya yang tersedia
        const available = arr.filter((r) => Number(r?.is_available) === 1);

        const mapped: RoomUI[] = available.map((r) => {
            const facilitiesArr = Array.isArray(r?.facilities) ? r.facilities : [];
            const facilityNames = facilitiesArr
                .map((f: any) => f?.name)
                .filter(Boolean);

            return {
                id: String(r.id),
                number: r.number,
                price: `${formatRupiah(r.price_monthly)} / bulan`,
                available: true,
                image:
                    ROOM_IMAGE_MAP[r.main_image_url || ""] ??
                    require("../../assets/images/costher.png"),
                rating: Number(r.review_avg ?? 0),
                totalReviews: Number(r.review_count ?? 0),
                description: r.description ?? "",
                floor: Number(r.floor ?? 0),
                deposit: Number(r.deposit ?? 0),
                facilities: facilityNames,
            };
        });

        // rekomendasi: rating desc, kalau sama pakai total review desc
        return mapped
            .sort((a, b) => {
                if (b.rating !== a.rating) return b.rating - a.rating;
                return b.totalReviews - a.totalReviews;
            })
            .slice(0, 3);
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
