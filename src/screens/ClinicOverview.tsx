
import { ClinicUpdateResponse } from '@api/model/clinic/ClinicRequest';
import Back from '@components/Back';
import { AuthContext } from '@context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils/colors';
import React, { useContext, useEffect, useState } from 'react';
import { View, Linking, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Card, Text, Avatar, Button, useTheme, Badge, TextInput } from 'react-native-paper';


const ClinicOverview = () => {
    const [editMode, setEditMode] = useState(false);
    const [phone, setPhone] = useState("+12345678901");
    const [email, setEmail] = useState("clinic@example.com")
    const [address, setAddress] = useState("123 Main St New York, NY 10001")
    const [clinicName, setClinicName] = useState("Example Clinic")
    const [clinicLicense, setClinicLicense] = useState("")
    const [tax, setTax] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [alternatePhone, setAlternatePhone] = useState("");



    const { loggedInUserContext } = useContext(AuthContext)

    useEffect(() => {
        setPhone(loggedInUserContext?.clinicDetails.phone);
        setEmail(loggedInUserContext?.clinicDetails.email)
        setAddress(loggedInUserContext?.clinicDetails.addressLine1 + ", " + loggedInUserContext?.clinicDetails.city
            + ", " + loggedInUserContext?.clinicDetails.postalCode
        )
        setClinicName(loggedInUserContext?.clinicDetails.name)
        setClinicLicense(loggedInUserContext?.clinicDetails.licenseNumber)
        setCity(loggedInUserContext.clinicDetails.city)
        setState(loggedInUserContext.clinicDetails.state)
        setZipCode(loggedInUserContext.clinicDetails.postalCode)
        setAlternatePhone(loggedInUserContext.clinicDetails.alternatePhone)
        setCountry(loggedInUserContext.clinicDetails.country)
        setTax(loggedInUserContext.clinicDetails.taxId)
    }, [])

    const toggleEdit = () => {
        if (editMode) {

            console.log('Saving...', { phone, email, address });
        }
        setEditMode(!editMode);
    };

    const handleSaveChanges = () => {
        const clinicUpdates = new ClinicUpdateResponse();
    }

    const toggleCancel = () => {
        setEditMode(!editMode);
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
        <ScrollView>
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
                            <Text style={styles.clinicTitle}>{clinicName}</Text>
                            <Badge style={styles.activeBadge}>Active</Badge>
                            <View style={styles.licenseCard}>
                                <Ionicons name="card-outline" size={20} color="#1C60B3" />
                                <Text style={styles.licenseStyle}>License: {clinicLicense}</Text>
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
                        {/* Tax Id */}
                        <View style={styles.infoRow}>
                            {
                                editMode && (
                                    <View style={styles.iconCircle}>
                                        <Ionicons name="mail" size={18} color="#1C60B3" />
                                    </View>
                                )
                            }
                            <View>

                                {editMode && (
                                    <View>
                                        <Text style={styles.phoneEmailText}>Tax Id</Text>
                                        <TextInput value={tax} onChangeText={setTax} style={styles.input} mode='outlined' />
                                    </View>
                                )
                                }

                            </View>
                        </View>

                        {/* Alternate Phone  */}
                        <View style={styles.infoRow}>
                            {
                                editMode && (
                                    <View style={styles.iconCircle}>
                                        <Ionicons name="call" size={18} color="#1C60B3" />
                                    </View>
                                )
                            }

                            <View>

                                {editMode && (
                                    <View>
                                        <Text style={styles.phoneEmailText}>Alternate Phone</Text>
                                        <TextInput value={alternatePhone} onChangeText={setAlternatePhone} style={styles.input} mode='outlined' />
                                    </View>
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
                            {
                                !editMode && (
                                    <View style={styles.iconCircle}>
                                        <Ionicons name="navigate" size={18} color="#1C60B3" />
                                    </View>
                                )
                            }


                            <View>
                                {editMode ? (
                                    <>
                                        <View style={styles.space}>
                                            <View>

                                                {editMode && (
                                                    <View>
                                                        <Text style={styles.phoneEmailText}>City</Text>
                                                        <TextInput value={city} onChangeText={setCity} style={styles.input} mode='outlined' />
                                                    </View>
                                                )}

                                            </View>

                                            <View>

                                                {editMode && (
                                                    <View >
                                                        <Text style={styles.phoneEmailText}>State</Text>
                                                        <TextInput value={state} onChangeText={setState} style={styles.input} mode='outlined' />
                                                    </View>
                                                )}

                                            </View>
                                        </View>

                                        <View style={styles.space}>
                                            <View>

                                                {editMode && (
                                                    <View>
                                                        <Text style={styles.phoneEmailText}>Zip Code</Text>
                                                        <TextInput value={zipCode} onChangeText={setZipCode} style={styles.input} mode='outlined' />
                                                    </View>
                                                )}

                                            </View>

                                            <View>

                                                {editMode && (
                                                    <View>
                                                        <Text style={styles.phoneEmailText}>Country</Text>
                                                        <TextInput value={country} onChangeText={setCountry} style={styles.input} mode='outlined' />
                                                    </View>
                                                )}

                                            </View>


                                        </View>
                                    </>
                                ) : (
                                    <Text onPress={handleEmailPress} style={styles.textStyle}>{address}</Text>
                                )
                                }
                            </View>
                        </View>
                        {!editMode && (
                            <Button
                                icon="navigation"
                                mode="text"
                                onPress={handleDirectionsPress}
                                style={{ marginTop: 8 }}
                            >
                                Get Directions

                            </Button>
                        )}


                    </Card.Content>

                </Card>
                {
                    editMode ? (
                        <>
                            <Button
                                mode="outlined"
                                icon="content-save"
                                onPress={handleSaveChanges}
                                style={{ marginBottom: 10 }}
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 15, backgroundColor: COLORS.white
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
        height: 40,
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

    space: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        gap: 10
    }


});

export default ClinicOverview;
