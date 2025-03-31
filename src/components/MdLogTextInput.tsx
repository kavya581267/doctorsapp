
import { TextInput } from 'react-native-paper';
import styles from "../styles/mdLogTextInputStyle";


export default function MdLogTextInput ({label,value}) {
    return(
        <TextInput 
        mode="outlined"
        label={label}
        value={value}
        style={styles.input}
        onChangeText={()=>{console.log("sdfg")}}
        />
    )
}