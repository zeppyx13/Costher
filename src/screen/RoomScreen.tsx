import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RoomList from "../components/Room/RoomList";
import RoomFilterBar from "../components/Room/RoomFilterBar";
import colors from "../styles/colors";
import rooms from "../data/rooms";

const RoomsScreen = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.appBackground,
                paddingHorizontal: 16,
                paddingTop: 10,
            }}
            edges={["top", "left", "right"]}
        >
            <Header />

            <RoomFilterBar />

            <RoomList data={rooms} />

            <Navbar />
        </SafeAreaView>
    );
};

export default RoomsScreen;
