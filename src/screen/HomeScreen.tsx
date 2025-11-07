import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../assets/styles/styles';
import BrandComponent from '../components/BrandComponent';
import NavbarComponent from '../components/NavbarComponent';
const HomeScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <View style={styles.header}>
                        <BrandComponent />
                    </View>

                    {/* Navigation */}
                    <View style={styles.navigation}>
                        <NavbarComponent icon="home-outline" text="Home" target="Home" />
                        <NavbarComponent icon="cafe-outline" text="Cafe" target="Cafe" />
                        <NavbarComponent icon="fast-food-outline" text="Fast Food" target="Food" />
                        <NavbarComponent icon="heart-outline" text="Favorite" target="Favorite" />
                        <NavbarComponent icon="location-outline" text="Location" target="Location" />
                        <NavbarComponent icon="call-outline" text="Profile" target="Contact" />
                    </View>

                    {/* Content */}
                    <View style={styles.content as any}>
                        <Text style={styles.contentTitle}>Welcome to the App</Text>
                        <Text style={styles.contentText}>This is a sample application using React Native.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default HomeScreen;
