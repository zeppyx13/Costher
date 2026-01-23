import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import dashboardStyles from "../../styles/dashboard";
import colors from "../../styles/colors";
import { getweatherApi } from "../../api/weather.api";
const SCREEN_WIDTH = Dimensions.get("window").width;

const DashboardSummary = ({ item }: any) => {
    const scrollRef = useRef<ScrollView>(null);
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherJson = await getweatherApi();
                setWeather(weatherJson?.data ?? null);
            } catch (e) {
                setWeather(null);
                console.log("Weather Fetch Error:", e);
            }
        };

        fetchWeather();
    }, []);

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(item.price);

    return (
        <View style={{ marginTop: 10 }}>
            {/* --- Card Air & Listrik --- */}
            <View style={dashboardStyles.row}>
                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="water" size={28} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabel}>Penggunaan Air</Text>
                    <Text style={dashboardStyles.cardValue}>
                        {item.waterUsage} m³
                    </Text>
                </View>

                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="flash" size={28} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabel}>Listrik</Text>
                    <Text style={dashboardStyles.cardValue}>
                        {item.electricityUsage} kWh
                    </Text>
                </View>
            </View>

            {/* --- ScrollView untuk Tagihan & Cuaca --- */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 12 }}
            >
                {/* === CARD TAGIHAN === */}
                <View style={[dashboardStyles.cardLarge, { width: SCREEN_WIDTH - 32 }]}>
                    <Ionicons name="wallet" size={32} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabelLarge}>Tagihan Bulanan</Text>
                    <Text style={dashboardStyles.cardValueLarge}>
                        {formattedPrice}
                    </Text>
                </View>

                <View style={[dashboardStyles.cardLarge, { width: SCREEN_WIDTH - 32 }]}>
                    <Ionicons name="partly-sunny" size={32} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabelLarge}>Cuaca Hari Ini</Text>

                    {weather ? (
                        <>
                            <Text style={dashboardStyles.cardValueLarge}>
                                {weather?.main?.feels_like ?? 0}°C
                            </Text>

                            <Text style={{
                                color: "#555",
                                fontFamily: "Inter-Regular",
                                fontSize: 14
                            }}>
                                {weather?.weather?.[0]?.description ?? "Tidak ada data"}
                            </Text>
                        </>
                    ) : (
                        <Text style={dashboardStyles.cardValueLarge}>Tidak Ada Data</Text>
                    )}
                </View>
            </ScrollView>

            {/* Indicator Bullets */}
            <View style={dashboardStyles.indicatorWrapper}>
                <View style={dashboardStyles.indicatorDot} />
                <View style={dashboardStyles.indicatorDot} />
            </View>
        </View>
    );
};

export default DashboardSummary;
