import { COLORS } from '@utils/colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SegmentedToggle = ({ options, onSelect, defaultIndex = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handlePress = (index) => {
    setSelectedIndex(index);
    onSelect(options[index]);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = index === selectedIndex;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.button, isSelected && styles.selectedButton]}
            onPress={() => handlePress(index)}
          >
            <Text style={[styles.text, isSelected && styles.selectedText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 2
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    borderEndWidth:1,
    borderEndColor:"white"
  },
  selectedButton: {
    backgroundColor: COLORS.secondary,
  },
  text: {
    color: '#000',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FFF',
  },
});

export default SegmentedToggle;
