import React from "react";
import { FlatList } from "react-native";
import RoomCard from "./RoomCard";

const RoomList = ({ data = [] }: any) => {
    const list = Array.isArray(data) ? data : [];

    return (
        <FlatList
            data={list}
            renderItem={({ item }) => <RoomCard item={item} />}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
        />
    );
};

export default RoomList;
