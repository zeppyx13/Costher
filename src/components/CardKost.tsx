import React from 'react';
import { View, Text } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typograpy';

interface KostProps {
    title: string;
    price: string;
    location: string;
}

const CardKost: React.FC<KostProps> = ({ title, price, location }) => {
    return (
        <View
            style={{
                backgroundColor: colors.lightGrey,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
            }}>
            <Text style={{ ...typography.heading, fontSize: 18 }}>{title}</Text>
            <Text style={{ ...typography.body, color: colors.deepMaroon }}>{price}</Text>
            <Text style={{ ...typography.body, fontSize: 12, color: '#555' }}>{location}</Text>
        </View>
    );
};

export default CardKost;
