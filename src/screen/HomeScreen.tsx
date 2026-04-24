import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import homeStyles from "../styles/home";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import HomeBanner from "../components/Home/HomeBanner";
import HomeLocationInfo from "../components/Home/HomeLocationInfo";
import HomeFacilityList from "../components/Home/HomeFacilityList";
import HomeReviewSection from "../components/Home/HomeReviewSection";
import HomeRecommendationList from "../components/Home/HomeRecommendationList";
import HomeButton from "../components/Home/HomeButton";
import colors from "../styles/colors";

const HomeScreen = ({ navigation }: any) => {
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("token").then((token) => {
            if (token) {
                navigation.reset({ index: 0, routes: [{ name: "Dashboard" }] });
            } else {
                setChecking(false);
            }
        });
    }, []);
    if (checking) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.deepMaroon} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={homeStyles.homeContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 150 }}
            >
                <Header />
                <View style={{ marginTop: 10 }}><HomeBanner /></View>
                <View style={{ marginTop: 20 }}><HomeLocationInfo /></View>
                <View style={{ marginTop: 25 }}><HomeFacilityList /></View>
                <View style={{ marginTop: 25 }}><HomeReviewSection /></View>
                <Text style={[homeStyles.HeaderText, { marginTop: 30 }]}>Rekomendasi Kamar</Text>
                <HomeRecommendationList navigation={navigation} />
                <HomeButton onPress={() => navigation.navigate("Room")} />
            </ScrollView>
            <Navbar />
        </SafeAreaView>
    );
};

export default HomeScreen;