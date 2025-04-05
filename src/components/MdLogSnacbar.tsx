import { Portal, Snackbar } from "react-native-paper";
class MdLodSnackbarProps {
    visible: boolean
    message: string
    onDismiss: any
    success?:boolean = false
}

export const MdLodSnackbar = (props: MdLodSnackbarProps) => {
    const color = props.success ? "green" : "#B00020"
    return (
        <Portal>
            <Snackbar
                style={{ backgroundColor: color }}
                visible={props.visible}
                onDismiss={props.onDismiss}
                action={{
                    label: 'X'
                }}
            >
                {props.message}
            </Snackbar>
        </Portal>
    )
}