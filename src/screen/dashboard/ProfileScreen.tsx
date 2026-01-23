import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";

import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileCard from "../../components/Profile/ProfileCard";
import ProfileKostInfo from "../../components/Profile/ProfileKostInfo";
import ProfileActions from "../../components/Profile/ProfileActions";

const ProfileScreen = ({ navigation, route }: any) => {
    const dashboard = route?.params?.dashboard ?? null;
    const me = route?.params?.me ?? null;

    const data = useMemo(() => {
        const room = dashboard?.room;
        const lease = dashboard?.lease;
        const invoice = dashboard?.invoice_current?.invoice;

        const avatarUrl = me?.avatar_url || null;

        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

        const totalNext = invoice?.total_amount ?? room?.price_monthly ?? 0;

        return {
            name: me?.name || "-",
            email: me?.email || "-",
            phone: me?.phone || "-",
            profilePicture: avatarUrl ? { uri: avatarUrl } : undefined,

            room: room?.number ? `Kamar ${room.number}` : "-",
            status: lease?.status || "-",
            nextPayment: formatter.format(Number(totalNext || 0)),
            dueDate: invoice?.due_date
                ? new Date(String(invoice.due_date)).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })
                : "-",

            kostName: lease?.kost_name || "-",
            kostAddress: lease?.kost_address || "-",
        };
    }, [dashboard, me]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
            >
                <ProfileHeader navigation={navigation} />
                <ProfileCard data={data} navigation={navigation} />
                <ProfileKostInfo data={data} />
                <ProfileActions />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
