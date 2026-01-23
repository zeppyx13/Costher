import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import paymentStyles from "../../styles/payment";
import { createMidtransPayment } from "../../api/payment.api";

const PaymentScreen = ({ navigation, route }: any) => {
    const { dashboard, me } = route.params || {};
    const [loading, setLoading] = useState(false);

    const room = dashboard?.room;
    const usage = dashboard?.usage?.usage;
    const invoice = dashboard?.invoice_current?.invoice;

    const invoiceId = Number(invoice?.id || 0);

    const waterRate = 5500;
    const electricityRate = 1699;
    const waterFree = 20;
    const elecFree = 50;

    const monthlyRent = Number(invoice?.rent_amount ?? room?.price_monthly ?? 0);
    const waterUsed = Number(invoice?.water_used ?? usage?.water_used ?? 0);
    const elecUsed = Number(invoice?.elec_used ?? usage?.elec_used ?? 0);

    const fine = Number(invoice?.fine_amount ?? 0);
    const discountPercent = Number(invoice?.discount_percent ?? 0);

    const calc = useMemo(() => {
        const waterBillUnit = waterUsed > waterFree ? waterUsed - waterFree : 0;
        const elecBillUnit = elecUsed > elecFree ? elecUsed - elecFree : 0;
        const roundedelecBillUnit = Math.round(elecBillUnit);
        const waterCost = Number(invoice?.water_cost ?? Math.round(waterBillUnit * waterRate));
        const elecCost = Number(invoice?.elec_cost ?? Math.round(elecBillUnit * electricityRate));

        const subtotal = monthlyRent + waterCost + elecCost;
        const discountAmount =
            invoice?.discount_amount != null
                ? Number(invoice.discount_amount)
                : Math.round(subtotal * (discountPercent / 100));

        const total =
            invoice?.total_amount != null
                ? Number(invoice.total_amount)
                : subtotal - discountAmount + fine;

        return { waterBillUnit, elecBillUnit, waterCost, elecCost, discountAmount, total, roundedelecBillUnit };
    }, [invoice, monthlyRent, waterUsed, elecUsed, fine, discountPercent]);

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    const handlePayNow = async () => {
        if (!invoiceId) {
            Alert.alert("Tagihan belum tersedia", "Invoice bulan ini belum dibuat.");
            return;
        }

        try {
            setLoading(true);
            const json = await createMidtransPayment(invoiceId);
            const redirectUrl = json?.data?.redirect_url || json?.data?.redirectUrl || json?.redirect_url;
            if (!redirectUrl) throw new Error("redirect_url tidak ditemukan dari response payment");

            navigation.navigate("MidtransProcessing", { redirectUrl, invoiceId });
        } catch (e: any) {
            const msg = e?.response?.data?.message || e?.message || "Gagal membuat transaksi Midtrans";
            Alert.alert("Pembayaran gagal", msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={paymentStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={paymentStyles.titleBox}>
                    <Text style={paymentStyles.pageTitle}>Konfirmasi Pembayaran</Text>
                    <Text style={paymentStyles.pageSubtitle}>Silakan cek kembali tagihan Anda</Text>
                </View>

                <View style={paymentStyles.card}>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Kamar</Text>
                        <Text style={paymentStyles.value}>Kamar {room?.number ?? "-"}</Text>
                    </View>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Penyewa</Text>
                        <Text style={paymentStyles.value}>{me?.name ?? "-"}</Text>
                    </View>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Periode</Text>
                        <Text style={paymentStyles.value}>{invoice?.month ?? dashboard?.usage?.month ?? "-"}</Text>
                    </View>

                    <View style={paymentStyles.separator} />

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="home-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Sewa Bulanan</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formatter.format(monthlyRent)}</Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="water-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Air ({calc.waterBillUnit} m³)</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formatter.format(calc.waterCost)}</Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="flash-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Listrik ({calc.roundedelecBillUnit} kWh)</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formatter.format(calc.elecCost)}</Text>
                    </View>

                    <View style={paymentStyles.separator} />

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="pricetag-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Diskon {discountPercent}%</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formatter.format(calc.discountAmount)}</Text>
                    </View>

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="alert-circle-outline" size={20} color={colors.deepMaroon} />
                            <Text style={paymentStyles.label}>Denda</Text>
                        </View>
                        <Text style={paymentStyles.value}>{formatter.format(fine)}</Text>
                    </View>

                    <View style={paymentStyles.separator} />

                    <View style={paymentStyles.rowBetween}>
                        <View style={paymentStyles.rowLeft}>
                            <Ionicons name="cash-outline" size={24} color={colors.deepMaroon} />
                            <Text style={paymentStyles.totalLabel}>Total Tagihan</Text>
                        </View>
                        <Text style={paymentStyles.totalValue}>{formatter.format(calc.total)}</Text>
                    </View>
                </View>

                <Text style={paymentStyles.sectionTitle}>Metode Pembayaran</Text>

                <TouchableOpacity style={paymentStyles.paymentMethod}>
                    <Ionicons name="card-outline" size={22} color={colors.deepMaroon} />
                    <Text style={paymentStyles.paymentText}>Midtrans (VA / QR / E-Wallet)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={paymentStyles.paymentMethod}>
                    <Ionicons name="wallet-outline" size={22} color={colors.deepMaroon} />
                    <Text style={paymentStyles.paymentText}>Transfer Manual</Text>
                </TouchableOpacity>

                <TouchableOpacity style={paymentStyles.payButton} onPress={handlePayNow} disabled={loading}>
                    <Text style={paymentStyles.payButtonText}>
                        {loading ? "Memproses..." : "Bayar Sekarang"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentScreen;
