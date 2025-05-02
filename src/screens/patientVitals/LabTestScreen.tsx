import { LabObservation, LabTest } from '@api/model/doctor/MasterData';
import Back from '@components/Back';
import { LabTestScreenParam, RootStackParamList } from '@components/MainNavigation';
import { AuthContext } from '@context/AuthContext';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

type RouteParams = {
  param: LabTestScreenParam
}


const LabTestScreen = () => {
  const { masterData } = useContext(AuthContext)
  const [labTest, setLabtests] = useState<LabTest[]>([])
  const [labResluts, setLabResults] = useState<LabObservation[]>([])
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RouteParams>>()
  const { appointment, patient } = route.params

  useEffect(() => {
   masterData && masterData?.labResults && setLabResults([...masterData.labResults])
   masterData && masterData?.labTests && setLabtests([...masterData.labTests])
  }, [])
  const handlePress = (item: LabTest) => {
    console.log(item);
    // navigation.navigate('TestDetails', { testName });
    const labTestResults = labResluts.filter((lr) => lr.labTestId === item.id)
    navigation.navigate("LabResultsScreen", { labResults: labTestResults, labTest: item, appointment: appointment, patient: patient });
  };

  return (
    <View style={styles.container}>
      <Back nav='Mainscreen' tab='Appointments' />
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
