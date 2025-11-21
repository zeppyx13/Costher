import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import user from "../../data/user";

import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileCard from "../../components/Profile/ProfileCard";
import ProfileKostInfo from "../../components/Profile/ProfileKostInfo";
import ProfileActions from "../../components/Profile/ProfileActions";

const ProfileScreen = ({ navigation }: any) => {
    const data = user[0];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.appBackground }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
            >
                <ProfileHeader navigation={navigation} />
                <ProfileCard data={data} />
                <ProfileKostInfo data={data} />
                <ProfileActions />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
