import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { global } from '../styles/global';
import typography from '../styles/typograpy';
import Navbar from '../components/Navbar';
import CardKost from '../components/CardKost';
import Header from '../components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={global.container}>
                <Header />
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
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;
