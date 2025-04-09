import { COLORS } from "@utils/colors";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        padding: 15,
    },

    profileSection: {
        alignItems: 'center',
        marginVertical: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
   
    role: {
        fontSize: 16,
        color: 'gray',
        marginTop: 4,
    },
    card: {
        borderRadius: 12,
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
    },
    value: {
        fontSize: 16,
        color: '#111827',
        marginTop: 2,
    },
    input: {
        marginTop: 4,
        height:45
    },
    divider: {
        marginVertical: 10,
    },
    actionCard: {
        borderRadius: 12,
        paddingBottom: 10,
    },
    actionButton: {
        marginBottom: 10,
    },
    logoutButton: {
        marginTop: 4,
        backgroundColor: COLORS.primary
    },
});