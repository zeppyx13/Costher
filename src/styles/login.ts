import { StyleSheet } from "react-native";
import colors from "./colors";
import { Button, Text } from "@react-navigation/elements";

const login = StyleSheet.create({
    // Logo styles
    ContainerLogo: {
        alignItems: "center",
        marginBottom: 40,
    },
    LogoImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    TitleText: {
        fontFamily: "Poppins-Bold",
        fontSize: 22,
        color: colors.deepMaroon,
    },
    SubtitleText: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: colors.darkCharcoal,
    },
    LoginTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        color: colors.deepMaroon,
        textAlign: "center",
    },
    LoginSubtitle: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: "#6B7280",
        textAlign: "center",
        marginTop: 4,
    },
    TextInputLabel: {
        fontFamily: "Inter-Medium",
        fontSize: 13,
        color: colors.darkCharcoal,
        marginBottom: 6,
    },
    InputField: {
        backgroundColor: "#F9FAFB",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: colors.darkCharcoal,
    },
    buttonText: {
        fontFamily: "Poppins-SemiBold",
        color: colors.elegantGold,
        fontSize: 16,
    },
    ButtonStyle: {
        backgroundColor: colors.deepMaroon,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 28,
    },
});

export default login;