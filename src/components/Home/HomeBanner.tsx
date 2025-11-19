import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import homeStyles from "../../styles/home";

const HomeBanner = ({ navigation }: any) => {
    return (
        <View style={homeStyles.bannerWrapper}>
            <Image
                source={require("../../assets/images/costher.png")}
                style={homeStyles.bannerImage}
                resizeMode="cover"
            />

            <View style={homeStyles.bannerOverlay} />

            <View style={homeStyles.bannerContent}>
                <Text style={homeStyles.bannerTitle}>Selamat Datang di Coasther</Text>
                <Text style={homeStyles.bannerSubtitle}>
                    Kost nyaman, aman, dan penuh fasilitas lengkap
                </Text>

                <TouchableOpacity
                    style={homeStyles.bannerButton}
                    onPress={() => navigation?.navigate("Room")}
                >
                    <Text style={homeStyles.bannerButtonText}>Lihat Kamar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeBanner;
