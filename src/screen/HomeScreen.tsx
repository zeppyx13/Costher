import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import colors from "../styles/colors";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.appBackground,
                paddingHorizontal: 16,
                paddingTop: 10,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}
            >
                <Header />

                <View
                    style={{
                        width: "100%",
                        height: 180,
                        backgroundColor: colors.deepMaroon,
                        borderRadius: 16,
                        overflow: "hidden",
                        marginBottom: 20,
                    }}
                >
                    <Image
                        source={require("../assets/images/costher.png")}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                </View>

                <Text
                    style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 18,
                        color: colors.deepMaroon,
                        marginBottom: 6,
                    }}
                >
                    Lokasi Coasther
                </Text>

                <Text
                    style={{
                        fontFamily: "Inter-Regular",
                        fontSize: 13,
                        color: colors.darkCharcoal,
                        marginBottom: 10,
                    }}
                >
                    Jl. Tukad Badung No. 21, Denpasar Selatan
                </Text>

                <View
                    style={{
                        width: "100%",
                        height: 160,
                        backgroundColor: "#E5E7EB",
                        borderRadius: 14,
                        marginBottom: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#6B7280", fontFamily: "Inter-Regular" }}>
                        (Map Preview)
                    </Text>
                </View>
                <Text
                    style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 18,
                        color: colors.deepMaroon,
                        marginBottom: 10,
                    }}
                >
                    Fasilitas Unggulan
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 20 }}
                >
                    {[
                        "AC",
                        "WiFi 100Mbps",
                        "CCTV 24 Jam",
                        "Parkiran Luas",
                        "Fully Furnished",
                        "Akses Fingerprint",
                    ].map((item, index) => (
                        <View
                            key={index}
                            style={{
                                paddingHorizontal: 14,
                                paddingVertical: 10,
                                backgroundColor: colors.lightGrey,
                                borderRadius: 20,
                                marginRight: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Inter-Medium",
                                    color: colors.darkCharcoal,
                                }}
                            >
                                {item}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <Text
                    style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 18,
                        color: colors.deepMaroon,
                        marginBottom: 14,
                    }}
                >
                    Rekomendasi Kamar
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 10 }}
                >
                    {[1, 2, 3].map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={{
                                width: 200,
                                marginRight: 14,
                                backgroundColor: colors.lightGrey,
                                borderRadius: 14,
                                overflow: "hidden",
                            }}
                            onPress={() => navigation.navigate("Room")}
                        >
                            <Image
                                source={require("../assets/images/costher.png")}
                                style={{ width: "100%", height: 120 }}
                            />

                            <View style={{ padding: 10 }}>
                                <Text
                                    style={{
                                        fontFamily: "Poppins-SemiBold",
                                        fontSize: 15,
                                        color: colors.darkCharcoal,
                                    }}
                                >
                                    Kamar 0{item}
                                </Text>

                                <Text
                                    style={{
                                        fontFamily: "Poppins-Bold",
                                        fontSize: 14,
                                        color: colors.deepMaroon,
                                        marginTop: 4,
                                    }}
                                >
                                    Rp 2.200.000 / bulan
                                </Text>

                                <View
                                    style={{
                                        marginTop: 6,
                                        backgroundColor: colors.appBackground,
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        borderRadius: 8,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Inter-Medium",
                                            color: "green",
                                            fontSize: 12,
                                        }}
                                    >
                                        Tersedia
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity
                    style={{
                        backgroundColor: colors.deepMaroon,
                        paddingVertical: 14,
                        borderRadius: 14,
                        alignItems: "center",
                        marginTop: 20,
                    }}
                    onPress={() => navigation.navigate("Room")}
                >
                    <Text
                        style={{
                            fontFamily: "Poppins-SemiBold",
                            color: colors.elegantGold,
                            fontSize: 16,
                        }}
                    >
                        Lihat Semua Kamar
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Navbar />
        </SafeAreaView>
    );
};

export default HomeScreen;
