import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { global } from '../styles/global';
import typography from '../styles/typograpy';
import Navbar from '../components/Navbar';
import CardKost from '../components/CardKost';

const HomeScreen = () => {
    return (
        <View style={global.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={typography.heading}>Rekomendasi Kost</Text>

                {/* Contoh Card Kost */}
                <CardKost
                    title="Kost Sakura"
                    price="Rp 1.200.000 / bulan"
                    location="Jl. Tukad Yeh Aya, Denpasar"
                />
                <CardKost
                    title="Kost Harmonia"
                    price="Rp 950.000 / bulan"
                    location="Jl. Gatot Subroto, Denpasar"
                />
            </ScrollView>

            <Navbar />
        </View>
    );
};

export default HomeScreen;
