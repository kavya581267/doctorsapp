import Back from '@components/Back';
import { AuthContext } from '@context/AuthContext';
import {styles} from "styles/userProfileScreenStyle";
import React, { useContext, useState } from 'react';
import { Platform, View } from 'react-native';
import { Avatar, Text, TextInput, Button, Card, Divider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const UserProfileScreen = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe")
    const [email, setEmail] = useState('john.doe@example.com');
    const [phone, setPhone] = useState('+1 (555) 123-4567');
    const role = 'Administrator';
     const navigation = useNavigation();

    const[loading,setLoading] = useState(false);
     const {  logout } = useContext(AuthContext);

   //logout
   const logOutButton = async () =>{
    try{
     setLoading(true);
     await logout();
    
    }catch(error){
       
    }
    setLoading(false)
    navigation.navigate("LaunchScreen");
}


    const toggleEdit = () => {
        if (isEditing) {

            console.log('Saving...', { firstName,lastName, email, phone });
        }
        setIsEditing(!isEditing);
    };

    return (
        <View style={Platform.OS === 'web' ? styles.webContainer : styles.container}>
            <Back nav='Mainscreen' />


            <View style={styles.profileSection}>
                <Avatar.Image
                    size={80}
                    source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
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
                    <Button
                        mode="outlined"
                        icon={isEditing ? 'content-save' : 'pencil'}
                        onPress={toggleEdit}
                        style={styles.actionButton}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>

                    {!isEditing && (
                        <>
                            <Button
                                icon="key"
                                mode="outlined"
                                onPress={() => { }}
                                style={styles.actionButton}
                            >
                                Reset Password
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
        </View>
    );
};



export default UserProfileScreen;
