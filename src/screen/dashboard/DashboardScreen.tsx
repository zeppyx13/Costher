import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import dashboardStyles from "../../styles/dashboard";

// === COMPONENTS ===
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSummary from "../../components/Dashboard/DashboardSummary";
import DashboardAnnouncement from "../../components/Dashboard/DashboardAnnouncement";
import DashboardPaymentHistory from "../../components/Dashboard/DashboardPaymentHistory";
import DashboardQuickActions from "../../components/Dashboard/DashboardQuickActions";  // FIXED & CONSISTENT

const DashboardScreen = () => {
    return (
        <SafeAreaView style={dashboardStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 130 }}
            >
                <DashboardHeader />
                <DashboardSummary />
                <DashboardPaymentHistory />
                <DashboardAnnouncement />
                <DashboardQuickActions />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
