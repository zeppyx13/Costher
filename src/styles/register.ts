import { StyleSheet } from "react-native";
import colors from "./colors";

const register = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
        backgroundColor: colors.appBackground,
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 40,
    },

    logoImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },

    logoTitle: {
        fontFamily: "Poppins-Bold",
        fontSize: 22,
        color: colors.deepMaroon,
    },

    logoSubtitle: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: colors.darkCharcoal,
    },

    titleContainer: {
        marginBottom: 30,
    },

    registerTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        color: colors.deepMaroon,
        textAlign: "center",
    },

    registerSubtitle: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: "#6B7280",
        textAlign: "center",
        marginTop: 4,
    },

    inputLabel: {
        fontFamily: "Inter-Medium",
        fontSize: 13,
        color: colors.darkCharcoal,
        marginBottom: 6,
    },

    inputField: {
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

    buttonStyle: {
        backgroundColor: colors.deepMaroon,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 28,
    },

    buttonText: {
        fontFamily: "Poppins-SemiBold",
        color: colors.elegantGold,
        fontSize: 16,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },

    bottomText: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: colors.darkCharcoal,
    },

    bottomLink: {
        fontFamily: "Inter-Medium",
        fontSize: 13,
        color: colors.deepMaroon,
    },
});

export default register;
