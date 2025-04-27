import { patientService } from '@api/patientService';
import Back from '@components/Back';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { AuthContext } from '@context/AuthContext';
import { AuthProvider } from '@context/AuthProvider';
import { COLORS } from '@utils/colors';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const InProgressNotes = () => {

    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const { loggedInUserContext } = useContext(AuthContext)

    const fields = [
        {
            "name": "john",
            "gender": "Male",
            "status": "Initia Note",
            "MrNo": "83478389",
            "visitDate": "24/04/2025"
        },
        {
            "name": "kavy",
            "gender": "Female",
            "status": "Follow Up",
            "MrNo": "388394",
            "visitDate": "22/04/2025"
        },
        {
            "name": "john",
            "gender": "Male",
            "status": "Initia Note",
            "MrNo": "73828392",
            "visitDate": "24/04/2025"
        },
        {
            "name": "kavya",
            "gender": "Female",
            "status": "Follow Up",
            "MrNo": "7237837",
            "visitDate": "21/04/2025"
        },
        {
            "name": "kavya",
            "gender": "Female",
            "status": "Initia Note",
            "MrNo": "928392",
            "visitDate": "27/04/2025"
        },
        {
            "name": "john",
            "gender": "Male",
            "status": "Initia Note",
            "MrNo": "83829238",
            "visitDate": "26/04/2025"
        }
    ]


    {/*useEffect(() => {
    fetchLipidProfileSchema();
  }, []);

  const fetchLipidProfileSchema = async () => {
    try {
      // Replace with your API call
     // const response = await fetch('https://your-api.com/lipid-profile-schema');
     // const data = await response.json();
     // setFields(data);
     // setLoading(false);
    } catch (error) {
      console.error('Failed to fetch schema:', error);
    }
  };*/}

    const handleInputChange = (key: string, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    //if (loading) {
    //  return <ActivityIndicator style={{ marginTop: 50 }} />;
    // }
    const loadNotes = async () => {
        setLoading(true)
        try {
            const resp = await patientService.getDoctorInprogressNotes(loggedInUserContext.clinicDetails.id)
            console.log(resp);
        } catch (error) {

        }
        setLoading(false)
    }
    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <ScrollView >
            <View style={styles.container}>
                <Back nav='Mainscreen' tab='Appointments' />
                <Text style={styles.title}>InProgress Notes</Text>

                {fields.map((item) => (
                    <View key={item.MrNo} style={styles.card}>
                        <View style={[styles.row, styles.margin]}>
                            <Text style={styles.label}>{item.name}, {item.gender}</Text>
                            <Text style={styles.status}><Text style={{ color: "black" }}>MrNo: </Text>{item.MrNo}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.status}>{item.status}</Text>
                            <Text style={styles.status}><Text style={{ color: "black" }}>Visit Date: </Text>{item.visitDate}</Text>
                        </View>


                    </View>
                ))}
            </View>
            <MdLogActivityIndicator loading={loading} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,

    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 12,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 15,
        padding: 12,
        borderRadius: 12,
        shadowColor: '#aaa',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },


    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    status: {
        fontSize: 15,
        fontWeight: "400",
        color: "green"
    },
    margin: {
        marginBottom: 10
    }

});

export default InProgressNotes;
