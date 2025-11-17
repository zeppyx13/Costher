import React from "react";
import { ScrollView, View, Text } from "react-native";
import homeStyles from "../../styles/home";
import facilities from "../../data/facilities";

const HomeFacilityList = () => {
    return (
        <>
            <Text style={homeStyles.sectionTitle}>Fasilitas Unggulan</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={homeStyles.facilityScroll}
            >
                {facilities.map((item, index) => (
                    <View key={index} style={homeStyles.facilityBadge}>
                        <Text style={homeStyles.facilityText}>{item}</Text>
                    </View>
                ))}
            </ScrollView>
        </>
    );
};

export default HomeFacilityList;
