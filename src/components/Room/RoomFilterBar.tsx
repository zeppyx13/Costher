// components/Room/RoomFilterBar.tsx
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import roomStyles from "../../styles/room";
import Ionicons from '@react-native-vector-icons/ionicons';

const filterItems: { label: any; icon: any; type: any }[] = [
    { label: "Urutkan", icon: "swap-vertical-outline", type: "name" },
    { label: "Urustkan Harga", icon: "swap-vertical-outline", type: "sort" },
    { label: "Harga terendah", icon: "pricetag-outline", type: "price" },
    { label: "IoT", icon: "list-outline", type: "facility" },
];

const RoomFilterBar = ({ nameSort, onSort, onPriceFilter, onFacilityFilter }: any) => {
    const [active, setActive] = useState<string | null>(null);

    const handlePress = (type: string) => {
        setActive(type);
        if (type === "name") nameSort();
        if (type === "sort") onSort();
        if (type === "price") onPriceFilter();
        if (type === "facility") onFacilityFilter();
    };

    return (
        <View style={roomStyles.filterWrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={roomStyles.filterContainer}
            >
                {filterItems.map((item, index) => {
                    const isActive = active === item.type;

                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.7}
                            style={[
                                roomStyles.filterChip,
                                isActive && roomStyles.filterChipActive,
                            ]}
                            onPress={() => handlePress(item.type)}
                        >
                            <Ionicons
                                name={item.icon}
                                size={16}
                                color={isActive ? "#FFFFFF" : "#7B1113"}
                                style={{ marginRight: 6 }}
                            />
                            <Text
                                style={[
                                    roomStyles.filterText,
                                    isActive && roomStyles.filterTextActive,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default RoomFilterBar;
