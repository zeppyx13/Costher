import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import profileStyles from "../../styles/profile";
import { useNavigation } from "@react-navigation/native";

const ProfileCard = ({ data }: any) => {
    const navigation = useNavigation() as any;
    return (
        <View style={profileStyles.cardContainer}>
            <Image
                source={data.profilePicture}
                style={profileStyles.cardAvatar}
            />

            <Text style={profileStyles.cardName}>{data.name}</Text>

            <Text style={profileStyles.cardEmail}>{data.email}</Text>

            <TouchableOpacity style={profileStyles.editButton} onPress={() => navigation.navigate("EditProfile", { data })}>
                <Text style={profileStyles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileCard;
