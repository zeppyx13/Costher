import { StyleSheet } from "react-native";
import colors from "./colors";

const roomStyles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.lightGrey,
        borderRadius: 12,
        marginBottom: 16,
        marginTop: 16,
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: 180,
    },
    cardContent: {
        padding: 12,
    },
    roomNumber: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: colors.darkCharcoal,
    },
    roomPrice: {
        fontFamily: "Poppins-Bold",
        fontSize: 15,
        color: colors.deepMaroon,
        marginTop: 4,
    },
    facilityContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    facilityBadge: {
        backgroundColor: colors.appBackground,
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 6,
        marginBottom: 6,
    },
    facilityText: {
        fontFamily: "Inter-Medium",
        fontSize: 12,
        color: colors.darkCharcoal,
    },
    statusText: {
        fontFamily: "Inter-Medium",
        fontSize: 13,
        marginTop: 4,
    },
    bookingButton: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },

    /* FILTER BAR */
    filterBar: {
        marginTop: 6,
        marginBottom: 6,
    },
    filterContainer: {
        paddingRight: 10,
        paddingLeft: 4,
    },
    filterChip: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 6,
        height: 36,
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: colors.appBackground,
    },
    filterText: {
        fontFamily: "Inter-Medium",
        color: colors.darkCharcoal,
        fontSize: 13,
        lineHeight: 18,
    },
});

export default roomStyles;
