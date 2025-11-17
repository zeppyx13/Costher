import { StyleSheet } from "react-native";
import colors from "./colors";

const homeStyles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: colors.appBackground,
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    bannerContainer: {
        width: "100%",
        height: 180,
        backgroundColor: colors.deepMaroon,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
    },
    bannerImage: {
        width: "100%",
        height: "100%",
    },

    sectionTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: colors.deepMaroon,
        marginBottom: 6,
    },
    locationAddress: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: colors.darkCharcoal,
        marginBottom: 10,
    },
    mapContainer: {
        width: "100%",
        height: 160,
        backgroundColor: "#E5E7EB",
        borderRadius: 14,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    mapPlaceholder: {
        color: "#6B7280",
        fontFamily: "Inter-Regular",
    },

    /* FACILITIES */
    facilityScroll: {
        marginBottom: 20,
    },
    facilityBadge: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        marginRight: 10,
    },
    facilityText: {
        fontFamily: "Inter-Medium",
        color: colors.darkCharcoal,
    },

    /* RECOMMENDATIONS */
    HeaderText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: colors.deepMaroon,
        marginBottom: 14,
    },
    recommendCard: {
        width: 200,
        marginRight: 14,
        backgroundColor: colors.lightGrey,
        borderRadius: 14,
        overflow: "hidden",
    },
    recommendImage: {
        width: "100%",
        height: 120,
    },
    recommendContent: {
        padding: 10,
    },
    recommendTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        color: colors.darkCharcoal,
    },
    recommendPrice: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: colors.deepMaroon,
        marginTop: 4,
    },
    recommendStatusContainer: {
        marginTop: 6,
        backgroundColor: colors.appBackground,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    recommendStatus: {
        fontFamily: "Inter-Medium",
        color: "green",
        fontSize: 12,
    },
});

export default homeStyles;
