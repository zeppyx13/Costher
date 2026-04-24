import React from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";
import profileStyles from "../../styles/profile";
import { useNavigation } from "@react-navigation/native";

const ProfileActions = () => {
    const navigation = useNavigation() as any;

    const handleLogout = () => {
        Alert.alert(
            "Keluar dari Akun",
            "Apakah kamu yakin ingin logout?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Ya, Keluar",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("token");
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Home" }],
                        });
                    },
                },
            ]
        );
    };

    return (
        <View style={profileStyles.actionContainer}>
            {[
                { label: "Ubah Password", icon: "lock-closed" as const, target: "ForgotPassword" },
                { label: "Riwayat Pembayaran", icon: "receipt-outline" as const, target: "InvoiceHistory" },
            ].map((item, index) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.target)}
                    key={index}
                    style={[
                        profileStyles.actionItem,
                        index === 1 && profileStyles.noBorder,
                    ]}
                >
                    <Ionicons name={item.icon} size={20} color={colors.deepMaroon} />
                    <Text style={profileStyles.actionText}>{item.label}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={profileStyles.logoutButton}
                activeOpacity={0.7}
                onPress={handleLogout}
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