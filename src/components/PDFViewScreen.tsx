import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Back from './Back';
import { getAccessToken } from '@api/apiService';
import { useRoute } from '@react-navigation/native';

const PDFViewer = ({ patientId, noteId, accessToken }) => {

  const route = useRoute()
  const { pid, nid } = route.params
  const [htmlContent, setHtmlContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdf = async () => {
      let pdfUrl = `https://j7lfcx9ij0.execute-api.ap-south-1.amazonaws.com/prod/patients/${pid}/notes/${nid}/pdf`;
      const token = await getAccessToken()
      try {
        const response = await fetch(pdfUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/pdf',
          },
        });

        const base64Data = await response.text(); // Not `response.json()` or `response.blob()` since it's base64

        const html = `
        <html>
          <body style="margin:0">
            <iframe src="data:application/pdf;base64,${base64Data}" width="100%" height="100%" 
            style="border:none;transform: scale(2); transform-origin: top left;"></iframe>
          </body>
        </html>
      `;

        console.log(base64Data)

        setHtmlContent(html);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!htmlContent) {
    return (
      <View style={styles.loading}>
        <Text>Failed to load PDF</Text>
      </View>
    );
  }

  return (
    <View style={{padding:15, flex: 1}}>
      <Back nav='PastNotes'/>
      <WebView originWhitelist={['*']} source={{ html: htmlContent }} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PDFViewer;



