import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import roomStyles from "../../styles/room";

const filters = ["Urutkan", "Filter", "Harga per Bulan", "Fasilitas"];

const RoomFilterBar = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={roomStyles.filterContainer}
            style={roomStyles.filterBar}
        >
            {filters.map((label, index) => (
                <TouchableOpacity key={index} style={roomStyles.filterChip}>
                    <Text style={roomStyles.filterText}>{label}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default RoomFilterBar;
