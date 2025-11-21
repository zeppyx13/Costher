import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import profileStyles from "../../styles/profile"; // <= IMPORT STYLE BARU
import { useNavigation } from "@react-navigation/native";
const ProfileActions = () => {
    const navigation = useNavigation() as any;
    return (
        <View style={profileStyles.actionContainer}>
            {[
                { label: "Ubah Password", icon: "lock-closed" as const },
                { label: "Riwayat Pembayaran", icon: "receipt-outline" as const },
            ].map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        profileStyles.actionItem,
                        index === 1 && profileStyles.noBorder
                    ]}
                >
                    <Ionicons name={item.icon} size={20} color={colors.deepMaroon} />
                    <Text style={profileStyles.actionText}>{item.label}</Text>
                </TouchableOpacity>
            ))}

            {/* === LOGOUT BUTTON === */}
            <TouchableOpacity
                style={profileStyles.logoutButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Home")}
            >
                <View style={profileStyles.logoutIconWrapper}>
                    <Ionicons name="log-out-outline" size={20} color={colors.elegantGold} />
                </View>

                <Text style={profileStyles.logoutText}>Keluar dari Akun</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileActions;
