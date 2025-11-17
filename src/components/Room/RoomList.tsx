import React from "react";
import { FlatList } from "react-native";
import RoomCard from "./RoomCard";

const RoomList = ({ data }: any) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <RoomCard item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 140,
            }}
        />
    );
};

export default RoomList;
