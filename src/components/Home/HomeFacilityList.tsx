import React from "react";
import { ScrollView, View, Text } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import homeStyles from "../../styles/home";
import facilities from "../../data/facilities";

const iconMap: any = {
    "AC": "snow-outline",
    "WiFi 100Mbps": "wifi-outline",
    "CCTV 24 Jam": "videocam-outline",
    "Parkiran Luas": "car-outline",
    "Fully Furnished": "bed-outline",
    "Akses Fingerprint": "finger-print-outline",
};

const HomeFacilityList = () => {
    return (
        <>
            <Text style={homeStyles.sectionTitle}>Fasilitas Unggulan</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={homeStyles.facilityScroll}
            >
                {facilities.map((item: string, index: number) => (
                    <View key={index} style={homeStyles.facilityBadgeEnhanced}>
                        <Ionicons
                            name={iconMap[item] || "ellipse-outline"}
                            size={16}
                            color="#7B1113"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={homeStyles.facilityTextEnhanced}>{item}</Text>
                    </View>
                ))}
            </ScrollView>
        </>
    );
};

export default HomeFacilityList;
