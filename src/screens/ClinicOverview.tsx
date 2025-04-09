import { ClinicResponse } from '@api/model/clinic/ClinicResponse';
import Back from '@components/Back';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar, Button, useTheme, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClinicOverview = () => {
    const [editMode, setEditMode] = useState(false);

  


    const handlePhonePress = () => {
        Linking.openURL('tel:+12345678901');
    };

    const handleEmailPress = () => {
        Linking.openURL('mailto:clinic@example.com');
    };

    const handleDirectionsPress = () => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=123+Main+St,+New+York,+NY+10001');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Back nav='Mainscreen' />
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.header}>
                    Clinic Overview
                </Text>
                <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                    <Ionicons name="create-outline" size={24} color="#1C60B3" />
                </TouchableOpacity>

            </View>


            {/* Clinic Info Card */}
            <Card style={styles.card}>
                <Card.Content style={styles.rowBetween}>
                    <View>
                        <Text style={styles.clinicTitle}>Example Clinic</Text>
                        <Badge style={styles.activeBadge}>Active</Badge>
                        <View style={styles.licenseCard}>
                            <Ionicons name="card-outline" size={20} color="#1C60B3" />
                            <Text style={styles.licenseStyle}>License: CLIN12345</Text>
                        </View>
                    </View>
                    <Avatar.Icon size={48} icon="hospital-building"/>
                </Card.Content>
            </Card>

            {/* Contact Info Card */}
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.cardHead}>
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                        {editMode && (
                            <Icon name="edit" size={20} color="#1C60B3"></Icon>
                        )}
                    </View>


                    {/* Phone */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="call" size={18} color="#1C60B3" />
                        </View>
                        <View>
                            <Text style={styles.phoneEmailText}>Phone</Text>
                            <Text onPress={handlePhonePress} style={styles.textStyle}>+1 234-567-8901</Text>
                        </View>

                    </View>

                    {/* Email */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="mail" size={18} color="#1C60B3" />
                        </View>
                        <View>
                            <Text  style={styles.phoneEmailText}>Email</Text>
                            <Text onPress={handleEmailPress} style={styles.textStyle}>clinic@example.com</Text>
                        </View>

                    </View>
                </Card.Content>
            </Card>

            {/* Address Card */}
            <Card style={styles.card}>
                <Card.Content>

                    <View style={styles.cardHead}>
                        <Text style={styles.sectionTitle}>Address</Text>
                        {editMode && (
                            <Icon name="edit" size={20} color="#1C60B3"></Icon>
                        )}
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="navigate" size={18} color="#1C60B3" />
                        </View>

                        <View>
                            <Text style={styles.textStyle}>123 Main St</Text>
                            <Text style={styles.textStyle}>New York, NY 10001</Text>
                        </View>
                    </View>

                    <Button
                        icon="navigation"
                        mode="text"
                        onPress={handleDirectionsPress}
                        style={{ marginTop: 8 }}
                    >
                        Get Directions
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1, padding: 15,

    },
    header: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        textAlign: "center",
        marginBottom: 10
    },
    phoneEmailText:{
        fontSize:14,
        color:"grey",
        fontWeight:"500",
        marginBottom:5
    },
    textStyle: {
        fontWeight: "500",
        fontSize: 16
    },
    licenseStyle: {
        marginLeft: 10
    },
    licenseCard: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        elevation: 2,
        backgroundColor: "white"
    },
    cardHead: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activeBadge: {
        marginTop: 4,
        alignSelf: 'flex-start',
        backgroundColor: '#d1fae5',
        color: '#10b981',
    },
    clinicTitle: {
        fontWeight: "bold",
        fontSize: 16
    },
    sectionTitle: {
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 16
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

});

export default ClinicOverview;
