import { COLORS } from '@utils/colors';
import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Fields = {
  key: string
  label: string
  value:string
}

interface CustomModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (values?: Record<string, string>) => void;
    fields: string[]; // List of field names
    title:string
    values: Record<string, string>
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onCancel, onSave, fields, title, values }) => {
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    useEffect(() => {
        // Initialize fields with empty strings when modal opens
        if (visible) {
            const initialValues: Record<string, string> = {};
            fields.forEach(field => {
                initialValues[field] = values[field];
            });
            setFormValues(initialValues);
        }
    }, [visible, fields,values]);

    const handleChange = (key: string, value: string) => {
        setFormValues(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onSave(formValues);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <KeyboardAwareScrollView>
                        {fields.map((field, key) => (
                            <TextInput
                                key={key}
                                style={styles.input}
                                placeholder={`Enter ${field}`}
                                value={formValues[field] || ''}
                                onChangeText={(text) => handleChange(field, text)}
                            />
                        ))}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;

// Styles same as before
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.red,
        borderRadius: 8,
        padding: 12,
        marginRight: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#6A0DAD',
        fontWeight: 'bold',
        fontSize:15
    },
    saveButton: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        borderRadius: 8,
        padding: 12,
        marginLeft: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:15
    },
});
