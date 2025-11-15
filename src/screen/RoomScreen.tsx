import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../styles/colors';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
interface Room {
    id: string;
    image: any;
    price: string;
    facilities: string[];
    number: string;
    available: boolean;
}

const rooms: Room[] = [
    {
        id: '1',
        image: require('../assets/images/costher.png'),
        price: 'Rp 2.200.000 / bulan',
        facilities: ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Lantai 1', 'Fully Furnished'],
        number: 'Kamar 01',
        available: true,
    },
    {
        id: '2',
        image: require('../assets/images/costher.png'),
        price: 'Rp 1.200.000 / bulan',
        facilities: ['Kipas Angin', 'WiFi', 'Kamar Mandi Luar', 'Lantai 1', 'Semi Furnished'],
        number: 'Kamar 02',
        available: false,
    },
    {
        id: '3',
        image: require('../assets/images/costher.png'),
        price: 'Rp 2.200.000 / bulan',
        facilities: ['AC', 'Meja Belajar', 'Kamar Mandi Dalam', 'Lantai 1', 'Fully Furnished'],
        number: 'Kamar 03',
        available: true,
    },
    {
        id: '4',
        image: require('../assets/images/costher.png'),
        price: 'Rp 2.200.000 / bulan',
        facilities: ['AC', 'Meja Belajar', 'Kamar Mandi Dalam', 'Lantai 1', 'Fully Furnished'],
        number: 'Kamar 04',
        available: true,
    },
];

const RoomsScreen = () => {
    const [sortOption, setSortOption] = useState('Semua');

    const renderRoom = ({ item }: { item: Room }) => (
        <View
            style={{
                backgroundColor: colors.lightGrey,
                borderRadius: 12,
                marginBottom: 16,
                overflow: 'hidden',
            }}>
            <Image
                source={item.image}
                style={{ width: '100%', height: 180 }}
                resizeMode="cover"
            />
            <View style={{ padding: 12 }}>
                <Text
                    style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 16,
                        color: colors.darkCharcoal,
                    }}>
                    {item.number}
                </Text>
                <Text
                    style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 15,
                        color: colors.deepMaroon,
                        marginTop: 4,
                    }}>
                    {item.price}
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                    {item.facilities.map((f, i) => (
                        <View
                            key={i}
                            style={{
                                backgroundColor: colors.appBackground,
                                borderRadius: 6,
                                paddingVertical: 4,
                                paddingHorizontal: 8,
                                marginRight: 6,
                                marginBottom: 6,
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'Inter-Medium',
                                    fontSize: 12,
                                    color: colors.darkCharcoal,
                                }}>
                                {f}
                            </Text>
                        </View>
                    ))}
                </View>

                <Text
                    style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 13,
                        marginTop: 4,
                        color: item.available ? 'green' : 'gray',
                    }}>
                    {item.available ? 'Tersedia' : 'Sudah Terisi'}
                </Text>

                <TouchableOpacity
                    disabled={!item.available}
                    style={{
                        backgroundColor: item.available
                            ? colors.deepMaroon
                            : colors.lightGrey,
                        paddingVertical: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                    <Text
                        style={{
                            color: item.available ? colors.elegantGold : '#aaa',
                            fontFamily: 'Poppins-SemiBold',
                        }}>
                        {item.available ? 'Booking Sekarang' : 'Tidak Tersedia'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.appBackground,
                paddingHorizontal: 16,
                paddingTop: 20,
                marginTop: 30,
            }}>
            <Header />
            {/* ======== Filter Section ======== */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16 }}>
                {[
                    { label: 'Urutkan', icon: 'arrow-up-down-outline' },
                    { label: 'Filter', icon: 'filter-outline' },
                    { label: 'Harga per Bulan', icon: 'chevron-down-outline' },
                    { label: 'Fasilitas', icon: 'options-outline' },
                ].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#D1D5DB',
                            borderRadius: 30,
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            marginRight: 10,
                            backgroundColor: colors.appBackground,
                            elevation: 1,
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Inter-Medium',
                                color: colors.darkCharcoal,
                                marginRight: 6,
                                fontSize: 13,
                            }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* ======== List Kamar ======== */}
            <FlatList
                data={rooms}
                renderItem={renderRoom}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />

            <Navbar />
        </View>
    );
};

export default RoomsScreen;
