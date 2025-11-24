import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";
import paymentStyles from "../../styles/payment";
import dashboardData from "../../data/dashboardData";
const PaymentScreen = ({ navigation }: any) => {
    // Ambil data statis berdasarkan ID tertentu
    const data = dashboardData.find(item => item.id === '2');

    // Tarif perhitungan
    const waterRate = 5500;      // per m³
    const electricityRate = 1699; // per kWh

    // Ambil nilai dasar (fallback ke 0 kalau data tidak ada)
    const monthlyRent = data ? parseInt(data.price) : 0;
    const waterUsage = data ? parseInt(data.waterUsage) : 0;
    const electricityUsage = data ? parseInt(data.electricityUsage) : 0;
    const fine = data ? parseInt(data.fine) : 0;
    const discount = data ? parseInt(data.discount) : 0;
    // Hitung tagihan air & listrik: hanya pemakaian lebih dari batas yang dikenakan biaya
    // Air: batas 40 m3
    // Listrik: batas 20 kWh
    const waterUsageBill = waterUsage >= 40 ? waterUsage - 40 : 0;
    const electricityUsageBill = electricityUsage >= 20 ? electricityUsage - 20 : 0;

    // Hitung biaya
    const discountAmount = (monthlyRent + (waterUsageBill * waterRate) + (electricityUsageBill * electricityRate)) * (discount / 100);
    const waterCost = waterUsageBill * waterRate;
    const electricityCost = electricityUsageBill * electricityRate;
    const totalCost = monthlyRent + waterCost + electricityCost - discountAmount + fine;

    // Formatter Rupiah
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    // Harga dalam format Rupiah
    const formattedTotalCost = formatter.format(totalCost);
    const formattedMonthlyRent = formatter.format(monthlyRent);
    const formattedElectricityCost = formatter.format(electricityCost);
    const formattedWaterCost = formatter.format(waterCost);
    const formattedFine = formatter.format(fine);
    const formattedDiscountAmount = formatter.format(discountAmount);

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
                        <Text style={paymentStyles.label}>Kamar </Text>
                        <Text style={paymentStyles.value}>Kamar {data?.number}</Text>
                    </View>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Penyewa</Text>
                        <Text style={paymentStyles.value}>{data?.name}</Text>
                    </View>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Periode</Text>
                        <Text style={paymentStyles.value}>{data?.period}</Text>
                    </View>

                    <View style={paymentStyles.separator} />

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="home-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Sewa Bulanan</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formattedMonthlyRent}</Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="water-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Air ({waterUsageBill} m³)</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formattedWaterCost}</Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="flash-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Listrik ({electricityUsageBill} kWh)</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formattedElectricityCost}</Text>
                    </View>
                    <View style={paymentStyles.separator} />
                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="pricetag-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Diskon {discount}%</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formattedDiscountAmount}</Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="alert-circle-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Denda</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formattedFine}</Text>
                    </View>

                    <View style={paymentStyles.separator} />

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="cash-outline" size={24} color={colors.deepMaroon} />
                            <Text style={paymentStyles.totalLabel}>Total Tagihan</Text>
                        </View>
                        <Text style={paymentStyles.totalValue}>{formattedTotalCost}</Text>
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
        </SafeAreaView >
    );
};

export default PaymentScreen;
