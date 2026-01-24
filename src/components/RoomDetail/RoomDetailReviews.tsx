import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import roomDetailStyles from "../../styles/roomDetail";
import { getReviewsByRoomApi, ReviewByRoomItem } from "../../api/ratings.api";

const RoomDetailReviews = ({ roomId }: { roomId: number }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reviews, setReviews] = useState<ReviewByRoomItem[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setError("");
                setLoading(true);

                const json = await getReviewsByRoomApi(Number(roomId));
                setReviews(json?.data?.reviews ?? []);
            } catch (e: any) {
                setError(e?.response?.data?.message || e?.message || "Gagal memuat ulasan");
                setReviews([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [roomId]);

    const averageRating = useMemo(() => {
        if (!reviews.length) return 0;
        const total = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
        return total / reviews.length;
    }, [reviews]);

    return (
        <View style={roomDetailStyles.section}>
            <Text style={roomDetailStyles.sectionTitle}>Ulasan Penghuni</Text>

            {/* Summary */}
            <View style={roomDetailStyles.reviewSummary}>
                <Ionicons name="star" size={20} color="#E8B400" />
                <Text style={roomDetailStyles.reviewScore}>{averageRating.toFixed(1)}</Text>
                <Text style={roomDetailStyles.reviewTotal}>({reviews.length} ulasan)</Text>
            </View>

            {/* State */}
            {loading ? (
                <View style={{ paddingVertical: 10 }}>
                    <ActivityIndicator />
                </View>
            ) : error ? (
                <Text style={{ color: "red" }}>{error}</Text>
            ) : reviews.length === 0 ? (
                <Text style={{ color: "#666" }}>Belum ada ulasan untuk kamar ini.</Text>
            ) : (
                reviews.map((item) => (
                    <View key={item.id} style={roomDetailStyles.reviewItem}>
                        <View style={roomDetailStyles.reviewHeader}>
                            <Ionicons name="person-circle" size={32} color={colors.deepMaroon} />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={roomDetailStyles.reviewName}>
                                    {item.name || "Penghuni"}
                                </Text>

                                <View style={{ flexDirection: "row" }}>
                                    {Array.from({ length: Number(item.rating || 0) }).map((_, i) => (
                                        <Ionicons key={`${item.id}-star-${i}`} name="star" size={16} color="#E8B400" />
                                    ))}
                                </View>
                            </View>
                        </View>

                        <Text style={roomDetailStyles.reviewText}>
                            {item.comment || "-"}
                        </Text>
                    </View>
                ))
            )}
        </View>
    );
};

export default RoomDetailReviews;
