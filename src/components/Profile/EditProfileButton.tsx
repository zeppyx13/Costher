import React from "react";
import { TouchableOpacity, Text } from "react-native";
import editProfileStyles from "../../styles/editProfile";

const EditProfileButton = ({ onPress }: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={editProfileStyles.saveButton}
        >
            <Text style={editProfileStyles.saveButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
    );
};

export default EditProfileButton;
