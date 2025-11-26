import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RoomList from "../components/Room/RoomList";
import RoomFilterBar from "../components/Room/RoomFilterBar";
import colors from "../styles/colors";
import rooms from "../data/rooms";

const RoomsScreen = () => {
    const [filteredRooms, setFilteredRooms] = useState(rooms);
    const [sortAsc, setSortAsc] = useState(true);

    const resetFilter = () => {
        setFilteredRooms(rooms);
        setSortAsc(true);
    };
    // SORT BY PRICE
    const handleSort = () => {
        resetFilter();
        const sorted = [...filteredRooms].sort((a, b) => {
            const priceA = parseInt(a.price.replace(/\D/g, ""));
            const priceB = parseInt(b.price.replace(/\D/g, ""));
            return sortAsc ? priceA - priceB : priceB - priceA;
        });

        setFilteredRooms(sorted);
        setSortAsc(!sortAsc);
    };
    // Sort by name (room number)
    const handleNameSort = () => {
        resetFilter();
        const sorted = [...filteredRooms].sort((a, b) => {
            const numberA = parseInt(a.number);
            const numberB = parseInt(b.number);
            return sortAsc ? numberA - numberB : numberB - numberA;
        });

        setFilteredRooms(sorted);
        setSortAsc(!sortAsc);
    };
    // FILTER PRICE 
    const handlePriceFilter = () => {
        resetFilter();
        const result = rooms.filter(r => {
            const price = parseInt(r.price.replace(/\D/g, ""));
            return price <= 2500000;
        });

        setFilteredRooms(result);
    };

    // FILTER FASILITAS
    const handleFacilityFilter = () => {
        resetFilter();
        const result = rooms.filter(r =>
            r.facilities.includes("IoT")
        );

        setFilteredRooms(result);
    };

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

            <RoomFilterBar
                onSort={handleSort}
                onPriceFilter={handlePriceFilter}
                onFacilityFilter={handleFacilityFilter}
                nameSort={handleNameSort}
            />

            <RoomList data={filteredRooms} />

            <Navbar />
        </SafeAreaView>
    );
};

export default RoomsScreen;