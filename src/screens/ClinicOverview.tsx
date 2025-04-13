import { ClinicResponse } from '@api/model/clinic/ClinicResponse';
import Back from '@components/Back';
import { AuthContext } from '@context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/colors';
import React, { useContext, useEffect, useState } from 'react';
import { View, Linking, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Card, Text, Avatar, Button, useTheme, Badge, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClinicOverview = () => {
    const [editMode, setEditMode] = useState(false);
    const [phone, setPhone] = useState("+12345678901");
    const [email, setEmail] = useState("clinic@example.com")
    const [address, setAddress] = useState("123 Main St New York, NY 10001")

    const { loggedInUserContext } = useContext(AuthContext)

    useEffect(() => {
        setPhone(loggedInUserContext?.clinicDetails.phone);
        setEmail(loggedInUserContext?.clinicDetails.email)
        setAddress(loggedInUserContext?.clinicDetails.addressLine1 + ", " + loggedInUserContext?.clinicDetails.city
            + ", " + loggedInUserContext?.clinicDetails.postalCode
        )
    }, [])

    const toggleEdit = () => {
        if (editMode) {

            console.log('Saving...', { phone, email, address });
        }
        setEditMode(!editMode);
    };

    const handleSaveChanges = () =>{
        
    }

    const toggleCancel = () =>{
        
    }

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
        <View style={Platform.OS === 'web' ? styles.webContainer : styles.container}>
            {/* Header */}
            <Back nav='Mainscreen' />
            <View >
                <Text style={styles.header}>
                    Clinic Overview
                </Text>
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
                    <Avatar.Icon size={48} icon="hospital-building" />
                </Card.Content>
            </Card>

            {/* Contact Info Card */}
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.cardHead}>
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                    </View>


                    {/* Phone */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="call" size={18} color="#1C60B3" />
                        </View>
                        <View>
                            <Text style={styles.phoneEmailText}>Phone</Text>
                            {editMode ? (
                                <TextInput value={phone} onChangeText={setPhone} style={styles.input} mode='outlined' />
                            ) : (
                                <Text onPress={handlePhonePress} style={styles.textStyle}>{phone}</Text>
                            )
                            }

                        </View>

                    </View>

                    {/* Email */}
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="mail" size={18} color="#1C60B3" />
                        </View>
                        <View>
                            <Text style={styles.phoneEmailText}>Email</Text>
                            {editMode ? (
                                <TextInput value={email} onChangeText={setEmail} style={styles.input} mode='outlined' />
                            ) : (
                                <Text onPress={handleEmailPress} style={styles.textStyle}>{email}</Text>
                            )
                            }

                        </View>

                    </View>
                </Card.Content>
            </Card>

            {/* Address Card */}
            <Card style={styles.card}>
                <Card.Content>

                    <View style={styles.cardHead}>
                        <Text style={styles.sectionTitle}>Address</Text>

                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="navigate" size={18} color="#1C60B3" />
                        </View>

                        <View>
                            {editMode ? (
                                <TextInput value={address} onChangeText={setAddress} style={styles.input} mode='outlined' />
                            ) : (
                                <Text onPress={handleEmailPress} style={styles.textStyle}>{address}</Text>
                            )
                            }
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
            {
                editMode ? (
                    <>
                        <Button
                            mode="outlined"
                            icon="content-save"
                            onPress={handleSaveChanges} 
                            style={{ marginBottom:10}}
                        >
                            Save Changes
                        </Button>
                        <Button
                         
                            mode="outlined"
                            icon="close"
                            onPress={toggleCancel} 
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        mode="outlined"
                        icon="pencil"
                        onPress={toggleEdit}>
                        Edit Profile
                    </Button>
                )
            }



        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 15,
    },
    webContainer: {

        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: '10%',
    },
    header: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: "center",
        marginBottom: 10
    },
    phoneEmailText: {
        fontSize: 14,
        color: "grey",
        fontWeight: "500",
        marginBottom: 5
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
    },
    cardHead: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    input: {
        marginTop: 4,
        height: 45
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
