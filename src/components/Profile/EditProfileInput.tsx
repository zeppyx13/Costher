import React from "react";
import { View, Text, TextInput } from "react-native";
import editProfileStyles from "../../styles/editProfile";

const EditProfileInput = ({
    label,
    value,
    onChange,
    secure,
    keyboardType,
    editable = true,
}: any) => {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={editProfileStyles.inputLabel}>{label}</Text>

            <TextInput
                value={value}
                secureTextEntry={secure}
                keyboardType={keyboardType}
                onChangeText={onChange}
                editable={editable}
                selectTextOnFocus={editable}
                placeholder={`Masukkan ${label}`}
                placeholderTextColor="#9CA3AF"
                style={[
                    editProfileStyles.inputField,
                    !editable ? { opacity: 0.6 } : null,
                ]}
            />
        </View>
    );
};

export default EditProfileInput;
