
import { TextInput } from 'react-native-paper';
import styles from "../styles/mdLogTextInputStyle";
import { COLORS } from '@utils/colors';

interface MdLogTextInputProps {
    label?: string;
    value: string;
    left?: string;
    right?: string;
    onTextChange: any;
    field: string;
}


export default function MdLogTextInput({ label, value, left, right, onTextChange, field }: MdLogTextInputProps) {
    return (
        <TextInput
            outlineColor={COLORS.grey}
            mode="outlined"
            label={label}
            value={value}

            placeholderTextColor={COLORS.grey}
            onChangeText={(val) => { onTextChange(field,val) }}
            left={<TextInput.Icon icon={left} />}
            right={<TextInput.Icon icon={right} />}

        />
    )
}