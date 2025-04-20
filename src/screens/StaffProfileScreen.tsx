import { StaffUpdateRequest } from "@api/model/clinic/StaffRequest";
import { staffService } from "@api/staffService";
import Back from "@components/Back"
import { MdLogActivityIndicator } from "@components/MdLogActivityIndicator";
import { MdLodSnackbar } from "@components/MdLogSnacbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown";
import { Avatar, Button, Card, Divider, Icon, TextInput } from "react-native-paper"




export const StaffProffileScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { staffDetails } = route?.params;

    const [isEditing, setIsEditing] = useState(false);
    const [role, setRole] = useState(" ");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const roleOptions = [
        { label: "ADMIN", value: "ADMIN" },
        { label: "DOCTOR", value: "DOCTOR" },
        { label: "NURSE", value: "NURSE" },
        { label: "FRONT_OFFICE", value: "FRONT_OFFICE" },
    ]

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    }

    const toggleCancel = () => {
        setIsEditing(false)
    }

    const handleSaveChanges = async () => {
        setLoading(true);
        const staffUpdate = new StaffUpdateRequest();
        staffUpdate.role = role;
        staffUpdate.startDate = startDate;
        staffUpdate.endDate = endDate;
        staffUpdate.userId = staffDetails.userId;
        try {
            const response = await staffService.updateClinicStaff(staffUpdate, staffDetails.clinicId, staffDetails.userId);
            console.log("Updated staff:", response);
            setIsEditing(false);
        } catch (error) {
            setVisible(true);
            setError(error.toString());
        }
        setLoading(false);
    }

    useEffect(() => {
        setFirstName(staffDetails.firstName);
        setPhone(staffDetails.phone);
        setRole(staffDetails.roleName);
        setStartDate(staffDetails.startDate);
        setEndDate(staffDetails.endDate);
    }, [])

    return (
        <View style={styles.container}>
            <Back nav='Mainscreen' tab="Staff" />

            <Card style={styles.card}>
                <Card.Title
                    title={staffDetails.firstName}
                    subtitle={staffDetails.phone}
                    left={() => (
                        <Avatar.Image
                            size={50}
                            source={{
                                uri: 'https://api.dicebear.com/7.x/adventurer/svg?seed=doctor', // Replace with actual image
                            }}
                        />
                    )}
                />
            </Card>


            <Card style={styles.card}>
                <Card.Content>

                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{staffDetails.email}</Text>

                    <Divider style={styles.divider} />
                    <Text style={styles.label}>Role</Text>
                    {
                        isEditing ? (
                            <Dropdown
                                data={roleOptions}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Role"
                                value={role}
                                onChange={(item) => setRole(item.value)}
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={styles.selectedText}
                            />
                        ) : (
                            <Text style={styles.value}>{role}</Text>
                        )
                    }


                    <Divider style={styles.divider} />
                    <Text style={styles.label}>Start Date</Text>
                    {
                        isEditing ? (
                            <TextInput
                                mode="outlined"
                                value={startDate}
                                onChangeText={setStartDate}
                                style={styles.input}
                            />
                        ) : (
                            <Text style={styles.value}>{startDate}</Text>
                        )
                    }


                    <Divider style={styles.divider} />
                    <Text style={styles.label}>End Date</Text>
                    {
                        isEditing ? (
                            <TextInput
                                mode="outlined"
                                value={endDate}
                                onChangeText={setEndDate}
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="grey"
                            />
                        ) : (
                            <Text style={styles.value}>{endDate}</Text>
                        )
                    }


                </Card.Content>
            </Card>

            {/*buttons*/}
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
                            style={styles.actionButton}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                     <Button
                        mode="outlined"
                        icon="pencil"
                        style={styles.actionButton}
                        onPress={toggleEdit}>
                        Edit Profile
                    </Button>

                    {role === "DOCTOR" &&(
                         <Button
                         mode="outlined"
                         icon="calendar"
                         style={styles.actionButton}
                         onPress={()=>navigation.navigate("DoctorScheduleScreen",{doctorDetails: staffDetails})}>
                         Manage Schedule & Exceptions
                     </Button>
                    )}
                    </>
                   
                )
            }

            {
                !isEditing && (
                    <Button
                        mode="outlined"
                        icon="delete"
                        style={styles.actionButton}
                        onPress={toggleEdit}>
                        Remove Profile
                    </Button>
                )
            }
            <MdLogActivityIndicator loading={loading}></MdLogActivityIndicator>
            <MdLodSnackbar visible={visible} onDismiss={onDismissSnackBar} message={error} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    card: {
        marginTop: 10,
        marginBottom: 35,
        padding: 8,
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
        height: 45
    },
    divider: {
        marginVertical: 10,
    },

    actionButton: {
        marginBottom: 10,
    },
    //dropdown
    dropdown: {
        height: 45,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        fontSize: 14,
        fontWeight: "400",
        marginTop: 4
    },
    placeholder: {
        fontSize: 14,
        fontWeight: "400",
    },
    selectedText: {
        fontSize: 14,
        fontWeight: "400"
    },
})