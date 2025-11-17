import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";
import homeStyles from "../styles/home";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

import HomeBanner from "../components/Home/HomeBanner";
import HomeLocationInfo from "../components/Home/HomeLocationInfo";
import HomeFacilityList from "../components/Home/HomeFacilityList";
import HomeRecommendationList from "../components/Home/HomeRecommendationList";
import HomeButton from "../components/Home/HomeButton";
const HomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={homeStyles.homeContainer}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}
            >
                <Header />

                <HomeBanner />

                <HomeLocationInfo />

                <HomeFacilityList />

                <Text
                    style={homeStyles.HeaderText}
                >
                    Rekomendasi Kamar
                </Text>

                <HomeRecommendationList navigation={navigation} />

                <HomeButton onPress={() => navigation.navigate("Room")} />

            </ScrollView>

            <Navbar />
        </SafeAreaView>
    );
};

export default HomeScreen;
