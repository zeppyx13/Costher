import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../styles/colors";
import RoomDetailHeader from "../components/RoomDetail/RoomDetailHeader";
import RoomDetailImage from "../components/RoomDetail/RoomDetailImage";
import RoomDetailInfo from "../components/RoomDetail/RoomDetailInfo";
import RoomDetailFacilities from "../components/RoomDetail/RoomDetailFacilities";
import RoomDetailDescription from "../components/RoomDetail/RoomDetailDescription";
import RoomDetailBookButton from "../components/RoomDetail/RoomDetailBookButton";
import RoomDetailReviews from "../components/RoomDetail/RoomDetailReviews";

const DetailRoomScreen = ({ route, navigation }: any) => {
    const { room } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
            <RoomDetailHeader navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <RoomDetailImage image={room.image} />
                <RoomDetailInfo room={room} />
                <RoomDetailFacilities facilities={room.facilities} />
                <RoomDetailDescription description={room.description} />
                <RoomDetailBookButton room={room} navigation={navigation} />
                <RoomDetailReviews id={room.number} />
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailRoomScreen;
