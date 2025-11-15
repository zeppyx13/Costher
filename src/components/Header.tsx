import React from "react";
import { View, Text, Image } from "react-native";
import colors from "../styles/colors";

const Header = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20, // sedikit lebih rapat dari 20
            }}
        >
            {/* Logo */}
            <Image
                source={require('../assets/images/costher.png')}
                style={{
                    width: 72,
                    height: 72,
                    borderRadius: 36, // biar bulat sempurna
                    marginRight: 14, // jarak antar logo dan teks rapat elegan
                }}
                resizeMode="cover"
            />

            {/* Brand Text */}
            <View style={{ justifyContent: 'center' }}>
                <Text
                    style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 18,
                        color: colors.deepMaroon,
                        lineHeight: 22,
                    }}
                >
                    Coasther
                </Text>
                <Text
                    style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 13,
                        color: colors.darkCharcoal,
                        marginTop: 2,
                    }}
                >
                    Small Cost, Big Comfort
                </Text>
            </View>
        </View>
    );
};

export default Header;
