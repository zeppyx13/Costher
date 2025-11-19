import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";
import paymentStyles from "../../styles/payment";

const PaymentScreen = ({ navigation }: any) => {
    const paymentData = {
        room: "Kamar 03",
        Name: "Dewa Dharma",
        month: "November 2025",
        water: 55,
        electricity: 120,
        baseRent: 2200000,
        waterBill: 35000,
        electricityBill: 85000,
    };

    const total =
        paymentData.baseRent +
        paymentData.waterBill +
        paymentData.electricityBill;

    return (
        <SafeAreaView style={paymentStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* TITLE */}
                <View style={paymentStyles.titleBox}>
                    <Text style={paymentStyles.pageTitle}>Konfirmasi Pembayaran</Text>
                    <Text style={paymentStyles.pageSubtitle}>
                        Silakan cek kembali tagihan Anda
                    </Text>
                </View>

                {/* SUMMARY */}
                <View style={paymentStyles.card}>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Kamar</Text>
                        <Text style={paymentStyles.value}>{paymentData.room}</Text>
                    </View>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Penyewa</Text>
                        <Text style={paymentStyles.value}>{paymentData.Name}</Text>
                    </View>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Periode</Text>
                        <Text style={paymentStyles.value}>{paymentData.month}</Text>
                    </View>

                    <View style={paymentStyles.separator} />

                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Sewa Bulanan</Text>
                        <Text style={paymentStyles.value}>
                            Rp {paymentData.baseRent.toLocaleString("id-ID")}
                        </Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Air ({paymentData.water} m³)</Text>
                        <Text style={paymentStyles.value}>
                            Rp {paymentData.waterBill.toLocaleString("id-ID")}
                        </Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Listrik ({paymentData.electricity} kWh)</Text>
                        <Text style={paymentStyles.value}>
                            Rp {paymentData.electricityBill.toLocaleString("id-ID")}
                        </Text>
                    </View>

                    <View style={paymentStyles.separator} />

                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.totalLabel}>Total Tagihan</Text>
                        <Text style={paymentStyles.totalValue}>
                            Rp {total.toLocaleString("id-ID")}
                        </Text>
                    </View>
                </View>

                {/* PAYMENT METHOD */}
                <Text style={paymentStyles.sectionTitle}>Metode Pembayaran</Text>

                <TouchableOpacity style={paymentStyles.paymentMethod}>
                    <Ionicons name="card-outline" size={22} color={colors.deepMaroon} />
                    <Text style={paymentStyles.paymentText}>Midtrans (Virtual Account / QR / E-Wallet)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={paymentStyles.paymentMethod}>
                    <Ionicons name="wallet-outline" size={22} color={colors.deepMaroon} />
                    <Text style={paymentStyles.paymentText}>Transfer Manual</Text>
                </TouchableOpacity>

                {/* BUTTON PAY */}
                <TouchableOpacity
                    style={paymentStyles.payButton}
                    onPress={() => navigation.navigate("MidtransProcessing")}
                >
                    <Text style={paymentStyles.payButtonText}>
                        Bayar Sekarang
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentScreen;
