import { StyleSheet } from "react-native";
import colors from "./colors";

const dashboard = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appBackground,
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    /* ============================
       🔹 HEADER
    ============================ */
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 22,
        backgroundColor: "#F7F7F7",
        padding: 14,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    headerAvatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        marginRight: 14,
    },
    headerName: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: colors.darkCharcoal,
    },
    headerRoom: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },
    headerLink: {
        fontFamily: "Inter-Medium",
        fontSize: 13,
        color: colors.deepMaroon,
    },

    /* ============================
       🔹 SUMMARY CARDS
    ============================ */
    summaryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    summaryCard: {
        width: "32%",
        backgroundColor: colors.lightGrey,
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    summaryLabel: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 6,
    },
    summaryValue: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: colors.deepMaroon,
    },
    summaryWrapper: {
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    cardSmall: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: "center",
        marginRight: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },

    cardLarge: {
        backgroundColor: "#FFF",
        paddingVertical: 22,
        paddingHorizontal: 18,
        borderRadius: 18,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
    },

    cardLabel: {
        marginTop: 6,
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: colors.darkCharcoal,
    },

    cardValue: {
        marginTop: 4,
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: colors.deepMaroon,
    },

    cardLabelLarge: {
        marginTop: 8,
        fontFamily: "Inter-Medium",
        fontSize: 15,
        color: colors.darkCharcoal,
    },

    cardValueLarge: {
        marginTop: 4,
        fontFamily: "Poppins-Bold",
        fontSize: 22,
        color: colors.deepMaroon,
    },
    /* ============================
       🔹 SECTION BOX (Reusable)
    ============================ */
    sectionBox: {
        backgroundColor: "#FDFDFD",
        borderRadius: 16,
        padding: 16,
        marginBottom: 18,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    sectionTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 17,
        color: colors.deepMaroon,
        marginBottom: 12,
    },

    /* ============================
       🔹 ROOM INFO
    ============================ */
    roomLabel: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        color: colors.darkCharcoal,
    },
    roomDetail: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: "#6B7280",
        marginTop: 4,
        lineHeight: 18,
    },
    detailButton: {
        backgroundColor: colors.deepMaroon,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 14,
    },
    detailButtonText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        color: colors.elegantGold,
    },

    /* ============================
       🔹 ANNOUNCEMENT
    ============================ */
    announcementItem: {
        backgroundColor: colors.lightGrey,
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    announcementBox: {
        backgroundColor: "#FFF",
        padding: 18,
        borderRadius: 16,
        marginTop: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    announcementRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },

    iconNotice: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#F8F0F0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    announcementTitle: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        color: colors.darkCharcoal,
    },

    announcementDesc: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        marginTop: 2,
        color: "#6B7280",
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 8,
    },

    /* ============================
       🔹 PAYMENT HISTORY
    ============================ */
    rowMonth: {
        fontFamily: "Inter-Regular",
        fontSize: 13,
        color: colors.darkCharcoal,
    },
    rowAmount: {
        fontFamily: "Inter-Medium",
        fontSize: 13,
        color: colors.deepMaroon,
    },
    rowStatus: {
        fontFamily: "Inter-Medium",
        fontSize: 13,
    },

    /* ============================
       🔹 QUICK ACTIONS
    ============================ */
    quickItem: {
        backgroundColor: colors.lightGrey,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginBottom: 10,
    },
    quickText: {
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: colors.darkCharcoal,
    },
    /* === PAYMENT BOX === */
    paymentBox: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    paymentRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        marginRight: 12,
    },

    paymentLabel: {
        flex: 1,
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: colors.darkCharcoal,
    },

    paymentValue: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        color: colors.deepMaroon,
    },

    /* === TOTAL === */
    paymentTotalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingTop: 12,
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 20,
    },

    totalLabel: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 15,
        color: colors.darkCharcoal,
    },
    totalValue: {
        fontFamily: "Poppins-Bold",
        fontSize: 18,
        color: colors.deepMaroon,
    },

    /* === BUTTON === */
    payButton: {
        backgroundColor: colors.deepMaroon,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    payButtonText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        color: colors.elegantGold,
    },
});

export default dashboard;
