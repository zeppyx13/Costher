import React, { useEffect, useState } from "react";
import {
    ActivityIndicator, Alert, ScrollView, StyleSheet,
    Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import { api } from "../../lib/api";

export default function ReviewScreen({ navigation }: any) {
    const [myReview, setMyReview] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/api/reviews/my");
                const reviews = res.data?.data?.reviews ?? [];
                if (reviews.length > 0) setMyReview(reviews[0]);
            } catch { }
            setLoading(false);
        })();
    }, []);

    const handleSubmit = async () => {
        if (rating === 0) return Alert.alert("Pilih Rating", "Berikan bintang terlebih dahulu.");
        try {
            setSubmitting(true);
            await api.post("/api/reviews/", { rating, comment });
            Alert.alert("Terima kasih!", "Review kamu berhasil dikirim.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (e: any) {
            Alert.alert("Gagal", e?.response?.data?.message ?? "Terjadi kesalahan.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View>
                    <Text style={s.headerTitle}>Rating Kost</Text>
                    <Text style={s.headerSub}>Bagikan pengalamanmu</Text>
                </View>
            </View>

            {loading ? (
                <View style={s.center}><ActivityIndicator size="large" color={colors.deepMaroon} /></View>
            ) : (
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    {myReview ? (
                        /* Sudah pernah review */
                        <View style={s.card}>
                            <Ionicons name="checkmark-circle" size={48} color="#16a34a" style={{ alignSelf: "center" }} />
                            <Text style={s.alreadyTitle}>Kamu sudah memberikan review</Text>
                            <View style={s.starRow}>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Ionicons key={i} name="star" size={24}
                                        color={i <= myReview.rating ? "#FBBF24" : "#E5E7EB"} />
                                ))}
                            </View>
                            {myReview.comment && (
                                <Text style={s.existingComment}>"{myReview.comment}"</Text>
                            )}
                            <Text style={s.reviewDate}>
                                {new Date(myReview.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                            </Text>
                        </View>
                    ) : (
                        /* Form review */
                        <View style={s.card}>
                            <Text style={s.formTitle}>Bagaimana pengalamanmu?</Text>
                            <Text style={s.formSub}>Tap bintang untuk memberi nilai</Text>

                            <View style={s.starRow}>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <TouchableOpacity key={i} onPress={() => setRating(i)}>
                                        <Ionicons name={i <= rating ? "star" : "star-outline"}
                                            size={36} color={i <= rating ? "#FBBF24" : "#D1D5DB"} />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {rating > 0 && (
                                <Text style={s.ratingLabel}>
                                    {["", "Sangat Buruk", "Kurang Baik", "Cukup", "Baik", "Sangat Baik"][rating]}
                                </Text>
                            )}

                            <Text style={s.inputLabel}>Komentar (opsional)</Text>
                            <TextInput
                                style={s.input}
                                placeholder="Ceritakan pengalamanmu tinggal di sini..."
                                value={comment}
                                onChangeText={setComment}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                placeholderTextColor="#aaa"
                            />

                            <TouchableOpacity
                                style={[s.submitBtn, (submitting || rating === 0) && { opacity: 0.5 }]}
                                onPress={handleSubmit}
                                disabled={submitting || rating === 0}
                            >
                                <Ionicons name="star" size={16} color={colors.elegantGold} />
                                <Text style={s.submitText}>{submitting ? "Mengirim..." : "Kirim Review"}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F8F0F0", justifyContent: "center", alignItems: "center" },
    headerTitle: { fontFamily: "Poppins-SemiBold", fontSize: 16, color: colors.deepMaroon },
    headerSub: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666" },
    card: { backgroundColor: "#fff", borderRadius: 20, padding: 24, elevation: 1 },
    alreadyTitle: { fontFamily: "Poppins-SemiBold", fontSize: 16, color: "#2F2F2F", textAlign: "center", marginVertical: 12 },
    starRow: { flexDirection: "row", justifyContent: "center", gap: 6, marginVertical: 12 },
    existingComment: { fontFamily: "Inter-Regular", fontSize: 14, color: "#555", textAlign: "center", fontStyle: "italic", marginTop: 8 },
    reviewDate: { fontFamily: "Inter-Regular", fontSize: 12, color: "#999", textAlign: "center", marginTop: 8 },
    formTitle: { fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#2F2F2F", textAlign: "center" },
    formSub: { fontFamily: "Inter-Regular", fontSize: 13, color: "#999", textAlign: "center", marginTop: 4 },
    ratingLabel: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: colors.deepMaroon, textAlign: "center" },
    inputLabel: { fontFamily: "Inter-Medium", fontSize: 13, color: "#555", marginTop: 16, marginBottom: 6 },
    input: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 14, fontFamily: "Inter-Regular", fontSize: 14, color: "#2F2F2F", height: 100 },
    submitBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.deepMaroon, paddingVertical: 14, borderRadius: 14, marginTop: 20 },
    submitText: { fontFamily: "Poppins-SemiBold", fontSize: 15, color: colors.elegantGold },
});