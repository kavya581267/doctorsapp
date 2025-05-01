import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Back from './Back';
import { getAccessToken } from '@api/apiService';
import { useRoute } from '@react-navigation/native';

const PDFViewer = ({ patientId, noteId, accessToken }) => {

  const route =  useRoute()
  const {pid, nid, token} =  route.params


  let pdfUrl = `https://j7lfcx9ij0.execute-api.ap-south-1.amazonaws.com/prod/patients/${pid}/notes/${nid}/pdf`;
  

  return (
    <View style={styles.container}>
      <Back nav='PastNotes'/>
      <WebView
        source={{
          uri: pdfUrl,
          headers: {
            Authorization: `Bearer ${token._j}`,
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
