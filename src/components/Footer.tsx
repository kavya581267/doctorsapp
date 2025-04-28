import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = ({color}) => {
  return (
    <View style={styles.container}>
      <Text style={{...styles.title, color:color?color:"white"}}>EHR v1.0</Text>
      <Text style={{...styles.text, color:color?color:"white"}}>All Rights Reserved, MDOps Corporation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom:20,
    justifyContent: 'center',  // Center vertically
    alignItems: 'center',      // Center horizontall
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center'
  },
});

export default Footer;
