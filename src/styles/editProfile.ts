import { StyleSheet } from "react-native";
import colors from "./colors";

const editProfileStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.appBackground,
        paddingHorizontal: 20,
    },

    /** HEADER */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: colors.deepMaroon,
    },

    /** FORM */
    formWrapper: {
        backgroundColor: "#FFF",
        padding: 18,
        borderRadius: 16,
        shadowColor: "#000",
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
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

    /** BUTTON */
    saveButton: {
        backgroundColor: colors.deepMaroon,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 3,
    },
    saveButtonText: {
        fontFamily: "Poppins-SemiBold",
        color: colors.elegantGold,
        fontSize: 16,
    },
});

export default editProfileStyles;
