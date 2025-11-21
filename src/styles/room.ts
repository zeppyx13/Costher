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
        fontSize: 16,
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
    filterText: {
        fontFamily: "Inter-Medium",
        color: colors.darkCharcoal,
        fontSize: 13,
        lineHeight: 18,
    },
    filterWrapper: {
        marginTop: 4,
        marginBottom: 8,
    },

    filterContainer: {
        paddingRight: 10,
        paddingLeft: 4,
        flexDirection: "row",
        alignItems: "center",
    },

    filterChip: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 10,
        backgroundColor: colors.appBackground,
        elevation: 1,
    },

    filterChipActive: {
        backgroundColor: colors.deepMaroon,
        borderColor: colors.deepMaroon,
    },

    filterTextActive: {
        color: colors.appBackground,
    },
    // rating
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        paddingHorizontal: 3,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: "flex-start",
    },

    ratingStar: {
        marginRight: 4,
        marginTop: 1,
    },

    ratingNumber: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 13,
        color: colors.deepMaroon,
        marginRight: 6,
        marginLeft: 1,
        marginTop: 5,
    },
});

export default roomStyles;
