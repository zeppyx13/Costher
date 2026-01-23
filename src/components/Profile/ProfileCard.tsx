import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import profileStyles from "../../styles/profile";

const ProfileCard = ({ data, navigation }: any) => {
    const avatarSource = data?.profilePicture ?? require("../../assets/images/costher.png");

    return (
        <View style={profileStyles.cardContainer}>
            <Image source={avatarSource} style={profileStyles.cardAvatar} />

            <Text style={profileStyles.cardName}>{data?.name ?? "-"}</Text>
            <Text style={profileStyles.cardEmail}>{data?.email ?? "-"}</Text>

            <TouchableOpacity
                style={profileStyles.editButton}
                onPress={() => navigation.navigate("EditProfile", { data })}
            >
                <Text style={profileStyles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileCard;
