import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';

const Navbar = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const navItems: { icon: 'home-outline' | 'bed-outline' | 'person-outline'; text: string; target: string }[] = [
        { icon: 'home-outline', text: 'Home', target: 'Home' },
        { icon: 'bed-outline', text: 'Room', target: 'Room' },
        { icon: 'person-outline', text: 'Account', target: 'Login' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={styles.navBar}>
                {navItems.map((item, index) => {
                    const isActive = route.name === item.target;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.navItem}
                            onPress={() => navigation.navigate(item.target as never)}>
                            <Ionicons
                                name={item.icon}
                                size={24}
                                color={isActive ? colors.deepMaroon : colors.darkCharcoal}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: isActive ? 'Poppins-SemiBold' : 'Inter-Medium',
                                    color: isActive ? colors.deepMaroon : colors.darkCharcoal,
                                }}>
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255)',
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 6,
        elevation: 6,
    },
    navItem: {
        alignItems: 'center',
    },
});

export default Navbar;
