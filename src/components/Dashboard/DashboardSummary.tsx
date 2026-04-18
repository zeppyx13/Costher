import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import dashboardStyles from "../../styles/dashboard";
import colors from "../../styles/colors";
import { getweatherApi } from "../../api/weather.api";
import type { TelemetryPayload } from "../../api/useRoomTelemetry";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
    item: any;
    liveTelemetry?: TelemetryPayload | null;
    isSocketConnected?: boolean;
};

const DashboardSummary = ({
    item,
    liveTelemetry,
    isSocketConnected = false,
}: Props) => {
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

    const waterUsageDisplay = useMemo(() => {
        if (typeof liveTelemetry?.water_total_liter === "number") {
            return (liveTelemetry.water_total_liter / 1000).toFixed(3);
        }
        return Number((item.waterUsage ?? 0) / 1000).toFixed(3);
    }, [liveTelemetry, item.waterUsage]);

    const electricityUsageDisplay = useMemo(() => {
        if (typeof liveTelemetry?.energy_kwh_total === "number") {
            return Number(liveTelemetry.energy_kwh_total).toFixed(2);
        }
        return Number(item.electricityUsage ?? 0).toFixed(2);
    }, [liveTelemetry, item.electricityUsage]);

    return (
        <View style={{ marginTop: 10 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                    paddingHorizontal: 4,
                }}
            >
                <View
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        backgroundColor: isSocketConnected ? "green" : "red",
                        marginRight: 6,
                    }}
                />
                <Text
                    style={{
                        fontSize: 12,
                        color: "#666",
                        fontFamily: "Inter-Regular",
                    }}
                >
                    {isSocketConnected ? "Live telemetry aktif" : "Live telemetry tidak terhubung"}
                </Text>
            </View>

            <View style={dashboardStyles.row}>
                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="water" size={28} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabel}>Penggunaan Air</Text>
                    <Text style={dashboardStyles.cardValue}>
                        {waterUsageDisplay} m³
                    </Text>

                    {typeof liveTelemetry?.flow_rate_lpm === "number" && (
                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 12,
                                color: "#666",
                                fontFamily: "Inter-Regular",
                            }}
                        >
                            Live: {liveTelemetry.flow_rate_lpm.toFixed(2)} L/min
                        </Text>
                    )}
                </View>

                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="flash" size={28} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabel}>Listrik</Text>
                    <Text style={dashboardStyles.cardValue}>
                        {electricityUsageDisplay} kWh
                    </Text>

                    {typeof liveTelemetry?.power === "number" && (
                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 12,
                                color: "#666",
                                fontFamily: "Inter-Regular",
                            }}
                        >
                            Live: {liveTelemetry.power.toFixed(0)} W
                        </Text>
                    )}
                </View>
            </View>

            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 12 }}
            >
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
                            <Text
                                style={{
                                    color: "#555",
                                    fontFamily: "Inter-Regular",
                                    fontSize: 14,
                                }}
                            >
                                {weather?.weather?.[0]?.description ?? "Tidak ada data"}
                            </Text>
                        </>
                    ) : (
                        <Text style={dashboardStyles.cardValueLarge}>Tidak Ada Data</Text>
                    )}
                </View>
            </ScrollView>

            <View style={dashboardStyles.indicatorWrapper}>
                <View style={dashboardStyles.indicatorDot} />
                <View style={dashboardStyles.indicatorDot} />
            </View>
        </View>
    );
};

export default DashboardSummary;