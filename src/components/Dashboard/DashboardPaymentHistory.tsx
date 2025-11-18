import React from "react";
import { View, Text } from "react-native";
import dashboardStyles from "../../styles/dashboard";

const DashboardPaymentHistory = () => {
    return (
        <View style={dashboardStyles.sectionBox}>
            <Text style={dashboardStyles.sectionTitle}>Riwayat Pembayaran</Text>

            {[
                { month: "Desember", amount: "2.200.000", status: "Lunas" },
                { month: "November", amount: "2.200.000", status: "Lunas" }
            ].map((i, index) => (
                <View key={index} style={dashboardStyles.row}>
                    <Text style={dashboardStyles.rowMonth}>{i.month}</Text>
                    <Text style={dashboardStyles.rowAmount}>Rp {i.amount}</Text>
                    <Text style={[dashboardStyles.rowStatus,
                    i.status === "Lunas" ? { color: "green" } : { color: "red" }
                    ]}>
                        {i.status}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default DashboardPaymentHistory;
