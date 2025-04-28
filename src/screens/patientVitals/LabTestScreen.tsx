import { LabTest } from '@api/model/doctor/MasterData';
import Back from '@components/Back';
import { AuthContext } from '@context/AuthContext';
import { AuthProvider } from '@context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';


const labTests = [
  'FBS',
  'PPBS',
  'HbA1c',
  'Sr. Creatinine',
  'UACR',
  'Lipid Profile',
  'Retinal Exam',
  'Vit B12',
  'TFT',
  'hs-CRP'
];

const LabTestScreen = () => {
  const navigation = useNavigation();
  const {masterData} = useContext(AuthContext)
  const [labTest, setLabtests] = useState([...masterData.labTests])

  useEffect(()=>{
      console.log(labTest)
  },[])
  const handlePress = (item:LabTest) => {
    console.log( item);
     // navigation.navigate('TestDetails', { testName });
     if(item.testName === "Lipid Profile"){
      navigation.navigate("LipidProfileScreen");
     }
     
  };

  return (
    <View style={styles.container}>
        <Back nav='Mainscreen' tab='Appointments'/>
        <Text style={styles.headerTitle}>Select Lab Test</Text>
      <FlatList
        data={labTest}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Text style={styles.itemText}>{item.testName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: "center"
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white'
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LabTestScreen;
