import { COLORS } from '@utils/colors';
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native';

export const MdLogActivityIndicator = ({loading}) => {

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:6000
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(218, 23, 23, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's above other UI elements
  },
});
