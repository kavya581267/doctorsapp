import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';

const ConfirmationModal = ({
  visible,
  title = 'Confirm',
  message = 'Are you sure?',
  onCancel,
  onAccept,
  cancelText = 'Cancel',
  acceptText = 'Accept',
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Divider />
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <Divider />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAccept} style={styles.button}>
              <Text style={styles.acceptText}>{acceptText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height:150,
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    marginLeft: 10,
  },
  cancelText: {
    color: '#888',
  },
  acceptText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default ConfirmationModal;
