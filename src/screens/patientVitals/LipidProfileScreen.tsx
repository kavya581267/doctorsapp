import Back from '@components/Back';
import MdLogTextInput from '@components/MdLogTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, TouchableOpacity, Button } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LipidProfileScreen = () => {

    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const fields = [
        {
            "label": "Total Cholesterol",
            "unit": "mg/dL",
            "note": "Totalcholesterol : <200 mg/dL",
            "key": "totalCholesterol"
        },
        {
            "label": "LDL Cholesterol",
            "unit": "mg/g",
            "note": "Microalbuminuria : 30-299 mg/g\nNormal : <30 mg/g\nMacroalbuminuria : >=300 mg/g",
            "key": "ldlCholesterol"
        },
        {
            "label": "HDL Cholesterol",
            "unit": "mg/dL",
            "note": "Women : >=50 mg/dL\nMen : >=40 mg/dL",
            "key": "hdlCholesterol"
        },
        {
            "label": "Triglycerides",
            "unit": "mg/dL",
            "note": "Triglycerides : <150 mg/dL",
            "key": "triglycerides"
        },
        {
            "label": "VLDL Cholesterol",
            "unit": "mg/dL",
            "note": "Vldlcholesterol : 5-30 mg/dL",
            "key": "vldlCholesterol"
        },
        {
            "label": "Total Cholesterol/HDL Ratio",
            "unit": "",
            "note": "Totalcholesterolhdlratio : <5:1",
            "key": "cholesterolHdlRatio"
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

    const onChangeDate = (event, selectedDate) => {
       setShowPicker(false); 
        if (selectedDate) {
          setDate(selectedDate);
        }
       
      };

    const openDatePicker = () => {
        setShowPicker(true);
    };

    //if (loading) {
    //  return <ActivityIndicator style={{ marginTop: 50 }} />;
    // }


    return (
        <ScrollView >
            <View style={styles.container}>
                <Back nav='LabTestScreen' />
               
                <View style={styles.dateContainer}>
                <Text style={styles.dateText}> Collection Date:</Text>
                    <TouchableOpacity onPress={openDatePicker} style={styles.dateInputBox}>
                        <Text style={styles.dateText}>
                            {date.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                   
                </View>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChangeDate}
                    />
                )}
                {fields.map((item) => (
                    <View key={item.key} style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.label}>{item.label}</Text>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter"
                                    keyboardType="numeric"
                                    value={values[item.key] || ''}
                                    onChangeText={(text) => handleInputChange(item.key, text)}
                                />
                                <Text style={styles.unit}>{item.unit}</Text>
                            </View>
                        </View>

                        <Text style={styles.note}>{item.note}</Text>
                    </View>
                ))}
            </View>
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
        marginVertical: 12,
    },
    date: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
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

    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 70,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 16,
        width: 90,
        marginRight: 8,
    },

    unit: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333',
    },

    note: {
        fontSize: 12,
        color: '#555',
        marginTop: 6,
    },

    dateContainer: {
        marginVertical: 10,
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    dateText: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16, 
        marginRight:10
    },
    dateInputBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 4,
        width: 140,
        backgroundColor: '#fff',
       
      },
});

export default LipidProfileScreen;
