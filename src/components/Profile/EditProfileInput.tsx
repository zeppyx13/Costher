import React from "react";
import { View, Text, TextInput } from "react-native";
import editProfileStyles from "../../styles/editProfile";

const EditProfileInput = ({ label, value, onChange, secure, keyboardType }: any) => {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={editProfileStyles.inputLabel}>{label}</Text>

            <TextInput
                value={value}
                secureTextEntry={secure}
                keyboardType={keyboardType}
                onChangeText={onChange}
                placeholder={`Masukkan ${label}`}
                placeholderTextColor="#9CA3AF"
                style={editProfileStyles.inputField}
            />
        </View>
    );
};

export default EditProfileInput;
