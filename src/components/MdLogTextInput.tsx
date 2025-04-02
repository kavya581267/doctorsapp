
import { TextInput } from 'react-native-paper';
import styles from "../styles/mdLogTextInputStyle";
import { COLORS } from '@utils/colors';
import { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

interface MdLogTextInputProps {
    label?: string;
    value: string;
    left?: string;
    right?: string;
    onTextChange: any;
    field: string;
    keyboard?: any;
    onpress?: any;
}

export default function MdLogTextInput({ label, value, left, right, onTextChange, field, keyboard }: MdLogTextInputProps) {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);

    const handleConfirm = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        onTextChange(field, formattedDate);
        hideDatePicker();
    }
    return (
        <>
            {
                field === "dateOfBirth" && Platform.OS!=="web" ? (
                    <TouchableOpacity onPress={showDatePicker}>
                         <View pointerEvents="none">
                        <TextInput
                            outlineColor={COLORS.grey}
                            mode="outlined"
                            label={label}
                            value={value}
                            editable={false}
                            left={<TextInput.Icon icon={left} />}
                            right={<TextInput.Icon icon={right} />}
                        />
                        </View>
                    </TouchableOpacity>
                )
                
                 : (
                    <TextInput
                        outlineColor={COLORS.grey}
                        mode="outlined"
                        label={label}
                        value={value}
                        keyboardType={keyboard}

                        onChangeText={(val) => { onTextChange(field, val) }}
                        left={<TextInput.Icon icon={left} />}
                        right={<TextInput.Icon icon={right} />}
                    />
                )
            }
            <DateTimePicker isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}/>
        </>
    )
}