import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import dashboardStyles from "../../styles/dashboard";
import dashboardData from "../../data/dashboardData";

import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSummary from "../../components/Dashboard/DashboardSummary";
import DashboardAnnouncement from "../../components/Dashboard/DashboardAnnouncement";
import DashboardPaymentHistory from "../../components/Dashboard/DashboardPaymentHistory";
import DashboardQuickActions from "../../components/Dashboard/DashboardQuickActions";
import DashboardPaymentDetail from "../../components/Dashboard/DashboardPaymentDetail";
const DashboardScreen = ({ navigation }: any) => {
    // ambil data dengan id 2 pakek contoh aja karena statis
    const data = dashboardData.find(item => item.id === '2');
    return (
        <SafeAreaView style={dashboardStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 130 }}
            >
                <DashboardHeader item={data} />
                <DashboardSummary item={data} />
                <DashboardPaymentDetail onPayPress={() => navigation.navigate("Payment")} item={data} />
                <DashboardPaymentHistory />
                <DashboardAnnouncement />
                <DashboardQuickActions />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
