import Back from '@components/Back';
import { AuthContext } from '@context/AuthContext';
import { styles } from "styles/userProfileScreenStyle";
import React, { useContext, useEffect, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { Avatar, Text, TextInput, Button, Card, Divider } from 'react-native-paper';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { RootStackParamList } from '@components/MainNavigation';

const UserProfileScreen = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState("ADMiN")
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [loading, setLoading] = useState(false);
    const { logout, loggedInUserContext } = useContext(AuthContext);

    //logout
    const logOutButton = async () => {
        try {
            setLoading(true);
            await logout();

        } catch (error) {

        }
        setLoading(false)
        navigation.navigate("LaunchScreen");
    }


    const toggleEdit = () => {
        if (isEditing) {
            console.log('Saving...', { firstName, lastName, email, phone });
        }
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = () => {

    }

    const toggleCancel = () => {
        setIsEditing(false)
    }


    useEffect(() => {
        setFirstName(loggedInUserContext?.userDetails.firstName)
        setLastName(loggedInUserContext?.userDetails.lastName)
        setPhone(loggedInUserContext?.userDetails.phone)
        setEmail(loggedInUserContext?.userDetails.email)
        setRole((loggedInUserContext?.roles?.length > 0 ? loggedInUserContext?.roles[0] : "ADMIN"))
    }, [])

    return (
        <ScrollView>
            <View style={Platform.OS === 'web' ? styles.webContainer : styles.container}>
                <Back nav='Mainscreen' />
                <View style={styles.profileSection}>
                    <Avatar.Image
                        size={80}
                        source={{ uri: 'https://api.dicebear.com/7.x/adventurer/svg?seed=doctor' }}
                    />
                    <Text style={styles.name}>{firstName} {lastName}</Text>
                    <Text style={styles.role}>{role}</Text>

                </View>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Firstname</Text>
                        {isEditing ? (
                            <TextInput
                                mode="outlined"
                                value={firstName}
                                onChangeText={setFirstName}
                                style={styles.input}
                            />
                        ) : (
                            <Text style={styles.value}>{firstName}</Text>
                        )}

                        <Divider style={styles.divider} />

                        <Text style={styles.label}>LastName</Text>
                        {isEditing ? (
                            <TextInput
                                mode="outlined"
                                value={lastName}
                                onChangeText={setLastName}
                                style={styles.input}
                            />
                        ) : (
                            <Text style={styles.value}>{lastName}</Text>
                        )}

                        <Divider style={styles.divider} />



                        <Text style={styles.label}>Phone</Text>
                        {isEditing ? (
                            <TextInput
                                mode="outlined"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                style={styles.input}
                            />
                        ) : (
                            <Text style={styles.value}>{phone}</Text>
                        )}
                        <Divider style={styles.divider} />

                        <Text style={styles.label}>Email</Text>

                        <Text style={styles.value}>{email}</Text>




                        <Divider style={styles.divider} />

                        <Text style={styles.label}>Role</Text>
                        <Text style={styles.value}>{role}</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.actionCard}>
                    <Card.Content>
                        {
                            isEditing ? (
                                <>
                                    <Button
                                        mode="outlined"
                                        icon="content-save"
                                        onPress={handleSaveChanges}
                                        style={styles.actionButton}
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
                                    style={styles.actionButton}
                                    onPress={toggleEdit}>
                                    Edit Profile
                                </Button>
                            )
                        }

                        {!isEditing && (
                            <>
                                <Button
                                    icon="key"
                                    mode="outlined"
                                    onPress={() => { }}
                                    style={styles.actionButton}
                                >
                                    Reset Password"
                                </Button>

                                <Button
                                    icon="logout"
                                    mode="contained"
                                    textColor="white"
                                    onPress={logOutButton}
                                    style={styles.logoutButton}
                                >
                                    Log Out
                                </Button>
                            </>
                        )}
                    </Card.Content>
                </Card>

                <MdLogActivityIndicator loading={loading} />
            </View>
        </ScrollView>
    );
};



export default UserProfileScreen;
