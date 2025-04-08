import { COLORS } from '@utils/colors';
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export const MdLogActivityIndicator = ({loading}) => {

  if(loading){
    return(
      <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View> 
    )
  }else{
    <></>
  }

};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // dim the background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999 // ensure it's on top
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: 'rgba(218, 23, 23, 0.5)', // Semi-transparent background
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // dim the background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // ensure it's on top
    height: height
  },
});
