import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appBackground,
        paddingHorizontal: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 6,
        marginBottom: 20,
    },

    headerTitle: {
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: colors.deepMaroon,
        marginLeft: 8,
    },

    titleBox: {
        marginBottom: 20,
    },
    pageTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        color: colors.deepMaroon,
    },
    pageSubtitle: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },

    card: {
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 14,
        shadowColor: "#000",
        elevation: 2,
        marginBottom: 20,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    label: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: colors.darkCharcoal,
    },

    value: {
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: colors.deepMaroon,
    },

    separator: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 12,
    },

    totalLabel: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: colors.darkCharcoal,
    },

    totalValue: {
        fontFamily: "Poppins-Bold",
        fontSize: 18,
        color: colors.deepMaroon,
    },

    sectionTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        marginBottom: 10,
        color: colors.deepMaroon,
    },

    paymentMethod: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 1,
    },

    paymentText: {
        marginLeft: 10,
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: colors.darkCharcoal,
    },

    payButton: {
        backgroundColor: colors.deepMaroon,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
    },

    payButtonText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: colors.elegantGold,
    },
});
