import { StyleSheet } from "react-native";
import colors from "./colors";

const profileStyles = StyleSheet.create({
    actionContainer: {
        marginTop: 25,
        backgroundColor: "#FFF",
        borderRadius: 16,
        paddingVertical: 10,
        shadowColor: "#000",
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    actionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#EEE",
    },

    noBorder: {
        borderBottomWidth: 0,
    },

    actionText: {
        marginLeft: 12,
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        color: colors.darkCharcoal,
    },

    /** LOGOUT BUTTON */
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        marginTop: 10,
        backgroundColor: colors.deepMaroon,
        borderRadius: 12,
        marginHorizontal: 10,
        shadowColor: "#000",
        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },

    logoutIconWrapper: {
        padding: 6,
        borderRadius: 50,
    },

    logoutText: {
        marginLeft: 6,
        color: colors.elegantGold,
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
    },

    /** HEADER */
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    headerTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: colors.deepMaroon,
    },

    /** PROFILE CARD */
    cardContainer: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardAvatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    cardName: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: colors.darkCharcoal,
    },
    cardEmail: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },
    editButton: {
        backgroundColor: colors.deepMaroon,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 10,
    },
    editButtonText: {
        color: colors.elegantGold,
        fontFamily: "Poppins-Medium",
        fontSize: 14,
    },

    /** KOST INFO BOX */
    infoContainer: {
        backgroundColor: "#FFF",
        padding: 18,
        borderRadius: 16,
        marginTop: 20,
        shadowColor: "#000",
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: colors.deepMaroon,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    infoLabel: {
        fontFamily: "Inter-Regular",
        color: "#555",
    },
    infoValue: {
        fontFamily: "Inter-Medium",
        color: colors.darkCharcoal,
    },
});

export default profileStyles;
