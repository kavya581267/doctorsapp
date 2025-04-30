import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Back from './Back';
import { getAccessToken } from '@api/apiService';

const PDFViewer = ({ patientId, noteId, accessToken }) => {
  let pdfUrl = `https://j7lfcx9ij0.execute-api.ap-south-1.amazonaws.com/prod/patients/24/notes/18/pdf`;

  const token = getAccessToken()
  

  return (
    <View style={styles.container}>
      <Back nav='PastNotes'/>
      <WebView
        source={{
          uri: pdfUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/pdf',
          },
        }}
        style={styles.webview}
        useWebKit
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" style={styles.loader} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

export default PDFViewer;
