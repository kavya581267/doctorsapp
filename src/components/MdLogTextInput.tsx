
import { TextInput } from 'react-native-paper';
import styles from "../styles/mdLogTextInputStyle";
import { COLORS } from '@utils/colors';
import { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatToYYYYMMDD, formatToYYYYMMDDSlash } from '@utils/utils';

interface MdLogTextInputProps {
    label?: string;
    value: string;
    left?: string;
    right?: string;
    onTextChange: any;
    field?: string;
    keyboard?: any;
    onpress?: any;
    secureEntry?: boolean;
    placeHolder?: any;
}

export default function MdLogTextInput({ label, value, left, right, onTextChange, field, keyboard, secureEntry = false, placeHolder }: MdLogTextInputProps) {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);

    const handleConfirm = (date: Date) => {
        const formattedDate =formatToYYYYMMDD(date);
        onTextChange(field, formattedDate);
        hideDatePicker();
    }

    return (
        <>
            {
                field === "dateOfBirth" && Platform.OS !== "web" ? (
                    <TouchableOpacity onPress={showDatePicker}>
                        <View pointerEvents="none">
                            <TextInput
                                outlineColor={COLORS.grey}
                                mode="outlined"
                                label={label}
                                value={value}
                                editable={false}
                                style={{
                                    fontSize: 14, backgroundColor: "#F3F4F6FF", borderColor: COLORS.grey,

                                    fontWeight: "400", height: 40
                                }}
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
                            secureTextEntry={secureEntry}
                            keyboardType={keyboard}
                            placeholderTextColor={"grey"}
                            placeholder={placeHolder}
                            style={{
                                fontSize: 14, backgroundColor: "#F3F4F6FF", borderColor: COLORS.grey,

                                fontWeight: "400", height: 40
                            }}
                            clearButtonMode={"while-editing"}
                            onChangeText={(val) => { onTextChange(field, val) }}
                            left={<TextInput.Icon size={22} style={{}} icon={left} />}
                            right={<TextInput.Icon icon={right} />}
                        />
                    )
            }

            <DateTimePicker isVisible={isDatePickerVisible}
                mode="date"
                themeVariant="light"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date(1980, 0, 1)}
                date={new Date(1980, 0, 1)} />
        </>
    )
}