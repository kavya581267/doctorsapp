import { WebView } from 'react-native-webview';

const PDFViewerScreen = ({ data }) => {
  const pdfUrl = `data:application/pdf;base64,${data}`;

  return (
    <WebView
      source={{ uri: pdfUrl }}
      style={{ flex: 1 }}
    />
  );
};

export default PDFViewerScreen
