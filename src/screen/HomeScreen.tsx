import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import homeStyles from "../styles/home";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

import HomeBanner from "../components/Home/HomeBanner";
import HomeLocationInfo from "../components/Home/HomeLocationInfo";
import HomeFacilityList from "../components/Home/HomeFacilityList";
import HomeReviewSection from "../components/Home/HomeReviewSection";
import HomeRecommendationList from "../components/Home/HomeRecommendationList";
import HomeButton from "../components/Home/HomeButton";

const HomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={homeStyles.homeContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 150 }}
            >
                <Header />

                <View style={{ marginTop: 10 }}>
                    <HomeBanner />
                </View>

                <View style={{ marginTop: 20 }}>
                    <HomeLocationInfo />
                </View>

                <View style={{ marginTop: 25 }}>
                    <HomeFacilityList />
                </View>

                <View style={{ marginTop: 25 }}>
                    <HomeReviewSection />
                </View>

                <Text style={[homeStyles.HeaderText, { marginTop: 30 }]}>
                    Rekomendasi Kamar
                </Text>

                <HomeRecommendationList navigation={navigation} />

                <HomeButton
                    onPress={() => navigation.navigate("Room")}
                />
            </ScrollView>

            <Navbar />
        </SafeAreaView>
    );
};

export default HomeScreen;
