import { Symptom } from '@api/model/doctor/MasterData';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';

type Props = {
    selectedItem: Symptom;
    modalVisible: boolean
  };
 const SubField: React.FC<Props> = ({ selectedItem , modalVisible}) =>{
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState('day');
  const [startDate, setStartDate] = useState('-');
  const [isModalVisible,setIsModalVisible] = useState(modalVisible);

  const calculateStartDate = () => {
    const num = parseInt(value);
    if (!value || isNaN(num)) {
      setStartDate('-');
      return;
    }

   
    const now = new Date();
    let pastDate;

    if (unit === 'day') {
      pastDate = new Date();
      pastDate.setDate(now.getDate() - num);
    } else if (unit === 'month') {
      pastDate = new Date();
      pastDate.setMonth(now.getMonth() - num);
    } else if (unit === 'year') {
      pastDate = new Date();
      pastDate.setFullYear(now.getFullYear() - num);
    }

    setStartDate(pastDate.toDateString());
  };

  useEffect(() => {
    calculateStartDate();
  }, [value, unit]);

  const handleCancel = () => {
    setValue('');
    setStartDate('-');
  };

  const handleSave = () => {
    // Perform save logic here (e.g., API call or form submission)
    console.log('Saved:', { value, unit, startDate });
  };

  return (
    <>
     

      {/* Modal for SubField */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)} 
      >
        <Surface style={styles.container}>
          <Text style={styles.heading}>{selectedItem.name}</Text>
          <Text style={styles.label}>For How Long</Text>

          <View style={styles.row}>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
            />
            <View style={styles.unitSelector}>
              {['day', 'month', 'year'].map((item) => (
                <Button
                  key={item}
                  mode={unit === item ? 'contained' : 'outlined'}
                  onPress={() => setUnit(item)}
                  style={styles.unitButton}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Button>
              ))}
            </View>
          </View>

          <View style={styles.startDateBox}>
            <Text style={styles.startDateText}>Start Date: {startDate}</Text>
          </View>

          <View style={styles.footerButtons}>
            <Button mode="outlined" style={styles.button} onPress={handleCancel}>
              Cancel
            </Button>
            <Button mode="contained" style={styles.button} onPress={handleSave}>
              Save
            </Button>
          </View>
        </Surface>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 80,
    marginRight: 12,
  },
  unitSelector: {
    flexDirection: 'row',
  },
  unitButton: {
    marginHorizontal: 2,
  },
  startDateBox: {
    marginTop: 20,
    backgroundColor: '#f5f6f8',
    padding: 10,
    borderRadius: 6,
  },
  startDateText: {
    fontSize: 14,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  button: {
    marginLeft: 10,
  },
});

export default SubField;