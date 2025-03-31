
import { TextInput } from 'react-native-paper';
import styles from "../styles/mdLogTextInputStyle";

interface MdLogTextInputProps{
    label?: string;
    value: string;
    left?: string;
    right?: string
}


export default function MdLogTextInput ({label,value, left, right}: MdLogTextInputProps) {
    return(
        <TextInput 
        mode="outlined"
        label={label}
        value={value}
        style={styles.input}
         onChangeText={()=>{console.log("sdfg")}}
         left={ <TextInput.Icon icon={left}/>}
         right={ <TextInput.Icon icon={right}/>}
        />
    )
}