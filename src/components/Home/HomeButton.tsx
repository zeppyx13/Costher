import React from "react";
import {
    TouchableOpacity,
    Text,
} from "react-native";
import colors from "../../styles/colors";

interface HomeButtonProps {
    label?: string;
    onPress: () => void
}

const HomeButton: React.FC<HomeButtonProps> = ({ label = "Lihat Semua Kamar", onPress }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: colors.deepMaroon,
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: "center",
                marginTop: 20,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    fontFamily: "Poppins-SemiBold",
                    color: colors.elegantGold,
                    fontSize: 16,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default HomeButton;
