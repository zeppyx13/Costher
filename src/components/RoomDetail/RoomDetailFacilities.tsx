import React from "react";
import { View, Text } from "react-native";
import roomDetailStyles from "../../styles/roomDetail";

const RoomDetailFacilities = ({ facilities }: any) => {
    return (
        <View style={roomDetailStyles.section}>
            <Text style={roomDetailStyles.sectionTitle}>Fasilitas</Text>

            <View style={roomDetailStyles.facilityWrap}>
                {facilities.map((item: string, i: number) => (
                    <View key={i} style={roomDetailStyles.facilityBadge}>
                        <Text style={roomDetailStyles.facilityText}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default RoomDetailFacilities;
