import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import paymentStyles from "../../styles/payment";
import { createMidtransPayment } from "../../api/payment.api";

const PaymentScreen = ({ navigation, route }: any) => {
    const { dashboard, me, tariff, invoice: paramInvoice } = route.params || {};
    const [loading, setLoading] = useState(false);

    const invoice = paramInvoice || dashboard?.invoice_current?.invoice;
    const room = dashboard?.room;
    const roomNumber = room?.number ?? invoice?.room_number ?? "-";
    const tenantName = me?.name ?? invoice?.tenant_name ?? "-";
    const usage = dashboard?.usage?.usage;

    const invoiceId = Number(invoice?.id || 0);

    const waterRate = tariff?.water_rate ?? 5500;
    const electricityRate = tariff?.electricity_rate ?? 1699;
    const waterFree = tariff?.water_free_quota ?? 0;
    const elecFree = tariff?.electricity_free_quota ?? 0;

    const monthlyRent = Number(invoice?.rent_amount ?? room?.price_monthly ?? 0);
    const waterUsedl = Number(invoice?.water_used ?? usage?.water_used ?? 0);
    const waterUsed = waterUsedl / 1000;
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

    if (!invoice || !invoice.id) {
        return (
            <SafeAreaView style={paymentStyles.container}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Ionicons name="receipt-outline" size={80} color={colors.deepMaroon} style={{ opacity: 0.3, marginBottom: 20 }} />
                    <Text style={[paymentStyles.pageTitle, { textAlign: "center" }]}>Belum Ada Tagihan</Text>
                    <Text style={[paymentStyles.pageSubtitle, { textAlign: "center", marginTop: 8, fontSize: 14 }]}>
                        Tagihan Anda digenerate secara otomatis setiap awal bulan. Silakan cek kembali beberapa saat lagi atau hubungi pengelola.
                    </Text>

                    <TouchableOpacity
                        style={[paymentStyles.payButton, { width: "100%", marginTop: 30 }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={paymentStyles.payButtonText}>Kembali ke Dashboard</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

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
                        <Text style={paymentStyles.value}>Kamar {roomNumber}</Text>
                    </View>
                    <View style={paymentStyles.rowBetween}>
                        <Text style={paymentStyles.label}>Penyewa</Text>
                        <Text style={paymentStyles.value}>{tenantName}</Text>
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
