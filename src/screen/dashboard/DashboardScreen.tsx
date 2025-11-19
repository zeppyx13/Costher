import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import dashboardStyles from "../../styles/dashboard";

// === COMPONENTS ===
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSummary from "../../components/Dashboard/DashboardSummary";
import DashboardAnnouncement from "../../components/Dashboard/DashboardAnnouncement";
import DashboardPaymentHistory from "../../components/Dashboard/DashboardPaymentHistory";
import DashboardQuickActions from "../../components/Dashboard/DashboardQuickActions";
import DashboardPaymentDetail from "../../components/Dashboard/DashboardPaymentDetail";
const DashboardScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={dashboardStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 130 }}
            >
                <DashboardHeader />
                <DashboardSummary />
                <DashboardPaymentDetail onPayPress={() => navigation.navigate("Payment")} />
                <DashboardPaymentHistory />
                <DashboardAnnouncement />
                <DashboardQuickActions />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
