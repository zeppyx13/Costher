import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
const HomeScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;
