import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import profileStyles from "../../styles/profile";
import colors from "../../styles/colors";

const ProfileCard = ({ data }: any) => {
    return (
        <View style={profileStyles.cardContainer}>
            <Image
                source={require("../../assets/images/costher.png")}
                style={profileStyles.cardAvatar}
            />

            <Text style={profileStyles.cardName}>{data.name}</Text>

            <Text style={profileStyles.cardEmail}>{data.email}</Text>

            <TouchableOpacity style={profileStyles.editButton}>
                <Text style={profileStyles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileCard;
