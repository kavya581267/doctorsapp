
import { useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from "@utils/colors";


type TimePickerProps = {
    value: Date;
    onChange: (date: Date) => void;
    disabled  : boolean;

}
export const MdLogTimePicker: React.FC<TimePickerProps> = ({ value, onChange ,disabled}) => {
    const [showPicker, setShowPicker] = useState(false);

    const formattedTime = value.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    })
    const handleTimeChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View>
            {
                Platform.OS === "web" ? (
                    <input
                    style={styles.webInput}
                        type="time"
                        step="1800"
                        disabled={disabled}
                        value={value.toTimeString().slice(0, 5)}
                        onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            if (!isNaN(hours) && !isNaN(minutes)) {
                                const newDate = new Date(value);
                                newDate.setHours(hours);
                                newDate.setMinutes(minutes);
                                onChange(newDate);
                              }
                  
                        }} />
                ) : (
                    <>
                        <TouchableOpacity onPress={() => !disabled && setShowPicker(true)} disabled={disabled}>
                            <TextInput
                                style={[styles.input, disabled && styles.opacity]}
                                value={formattedTime}
                                editable={false}
                                pointerEvents="none"
                            />
                        </TouchableOpacity>


                        {showPicker &&
                            <DateTimePicker

                                value={value}
                                mode="time"
                                minuteInterval={30}
                                display={Platform.OS === "android" ? "clock" : "spinner"}
                                onChange={handleTimeChange}
                            />}


                    </>
                )

                

            }


        </View>
    )
}


const styles = StyleSheet.create({
      input: {
        borderWidth: 1,
        borderColor: COLORS.grey,
        padding: 10,
        borderRadius: 8,
      },
      webInput: {
        padding: 10,
        borderRadius: 8,
        borderWidth:1,
        borderColor:COLORS.grey,
      
      },
      opacity:{
        opacity:0.5
      }
});