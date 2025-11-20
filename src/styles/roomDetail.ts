import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        backgroundColor: colors.appBackground,
    },

    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        flex: 1,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: colors.deepMaroon,
        marginRight: 36,
    },

    roomImage: {
        width: "100%",
        height: 220,
    },

    infoSection: {
        padding: 16,
    },

    roomName: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 20,
        color: colors.deepMaroon,
    },

    price: {
        fontFamily: "Poppins-Bold",
        fontSize: 18,
        color: colors.elegantGold,
        marginTop: 4,
    },

    statusContainer: {
        marginTop: 6,
        backgroundColor: colors.appBackground,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: "flex-start",
    },

    statusText: {
        fontFamily: "Inter-Medium",
        fontSize: 12,
    },

    section: {
        paddingHorizontal: 16,
        marginTop: 10,
    },

    sectionTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 17,
        color: colors.deepMaroon,
        marginBottom: 6,
    },

    facilityWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    facilityBadge: {
        backgroundColor: colors.lightGrey,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 18,
        marginRight: 8,
        marginBottom: 8,
    },

    facilityText: {
        fontFamily: "Inter-Medium",
        color: colors.darkCharcoal,
    },

    usageRow: {
        flexDirection: "row",
        gap: 12,
    },

    usageCard: {
        flex: 1,
        backgroundColor: colors.lightGrey,
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    usageLabel: {
        fontFamily: "Inter-Medium",
        marginTop: 6,
        color: colors.darkCharcoal,
    },

    usageValue: {
        fontFamily: "Poppins-SemiBold",
        marginTop: 2,
        color: colors.deepMaroon,
    },

    descriptionText: {
        fontFamily: "Inter-Regular",
        color: colors.darkCharcoal,
        lineHeight: 19,
        marginTop: 4,
    },

    bookButton: {
        marginTop: 20,
        marginHorizontal: 16,
        backgroundColor: colors.deepMaroon,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    bookButtonText: {
        fontFamily: "Poppins-SemiBold",
        color: colors.elegantGold,
        fontSize: 16,
    },
    reviewSummary: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    reviewScore: {
        fontFamily: "Poppins-Bold",
        fontSize: 18,
        color: colors.deepMaroon,
        marginLeft: 6,
    },
    reviewTotal: {
        fontFamily: "Inter-Regular",
        color: colors.darkCharcoal,
        marginLeft: 6,
    },

    reviewItem: {
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    reviewName: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        color: colors.darkCharcoal,
    },
    reviewText: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: "#4B5563",
    },

});
