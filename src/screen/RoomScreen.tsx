import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RoomList from "../components/Room/RoomList";
import RoomFilterBar from "../components/Room/RoomFilterBar";
import colors from "../styles/colors";
import { ROOM_IMAGE_MAP } from "../data/roomImageMap";
import { getRoomsApi, RoomApi } from "../api/rooms.api";

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
    facilities: string[];
    description?: string;
    available: boolean;
    image?: any;
    floor?: number;
    deposit?: number;

    rating?: number;
    totalReviews?: number;
};


const RoomsScreen = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [roomsRaw, setRoomsRaw] = useState<RoomApi[]>([]);
    const [filteredRooms, setFilteredRooms] = useState<RoomApi[]>([]);
    const [sortAsc, setSortAsc] = useState(true);

    const load = useCallback(async () => {
        try {
            setError("");
            setLoading(true);

            const json = await getRoomsApi();
            const list = json?.data?.rooms ?? [];

            setRoomsRaw(list);
            setFilteredRooms(list);
            setSortAsc(true);
        } catch (e: any) {
            setError(e?.response?.data?.message || e?.message || "Gagal memuat kamar");
            setRoomsRaw([]);
            setFilteredRooms([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const resetFilter = useCallback(() => {
        setFilteredRooms(roomsRaw);
        setSortAsc(true);
    }, [roomsRaw]);
    const handleSort = () => {
        const sorted = [...filteredRooms].sort((a, b) =>
            sortAsc ? a.price_monthly - b.price_monthly : b.price_monthly - a.price_monthly
        );
        setFilteredRooms(sorted);
        setSortAsc(!sortAsc);
    };
    const handleNameSort = () => {
        const sorted = [...filteredRooms].sort((a, b) =>
            sortAsc
                ? String(a.number).localeCompare(String(b.number))
                : String(b.number).localeCompare(String(a.number))
        );
        setFilteredRooms(sorted);
        setSortAsc(!sortAsc);
    };
    const handlePriceFilter = () => {
        resetFilter();
        const result = roomsRaw.filter((r) => Number(r.price_monthly) <= 2500000);
        setFilteredRooms(result);
    };
    const handleFacilityFilter = () => {
        resetFilter();
        const result = roomsRaw.filter((r) => Number(r.is_available) === 1);
        setFilteredRooms(result);
    };
    const uiRooms: RoomUI[] = useMemo(() => {
        const arr = Array.isArray(filteredRooms) ? filteredRooms : [];

        return arr.map((r) => ({
            id: String(r.id),
            number: r.number,
            floor: r.floor,
            deposit: r.deposit,
            price: `${formatRupiah(r.price_monthly)} / bulan`,
            facilities: Array.isArray((r as any).facilities)
                ? (r as any).facilities.map((f: any) => f.name)
                : [],
            description: r.description ?? "",
            available: Number(r.is_available) === 1,
            image:
                ROOM_IMAGE_MAP[r.main_image_url ?? ""] ??
                require("../assets/images/costher.png"),
            rating: Number((r as any).review_avg ?? 0),
            totalReviews: Number((r as any).review_count ?? 0),
        }));
    }, [filteredRooms]);


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.appBackground,
                paddingHorizontal: 16,
                paddingTop: 10,
            }}
            edges={["top", "left", "right"]}
        >
            <Header />

            <RoomFilterBar
                onSort={handleSort}
                onPriceFilter={handlePriceFilter}
                onFacilityFilter={handleFacilityFilter}
                nameSort={handleNameSort}
            />

            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                    <Text style={{ marginTop: 10 }}>Memuat kamar...</Text>
                </View>
            ) : error ? (
                <View style={{ padding: 16 }}>
                    <Text style={{ marginBottom: 10, color: "red" }}>{error}</Text>
                    <Text onPress={load} style={{ color: "blue" }}>
                        Coba lagi
                    </Text>
                </View>
            ) : (
                <RoomList data={uiRooms} />
            )}

            <Navbar />
        </SafeAreaView>
    );
};

export default RoomsScreen;
