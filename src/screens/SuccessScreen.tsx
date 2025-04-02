import {  Image, Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@styles/SuccessScreenStyle";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";




export default function SuccessScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.img}>
                    <Image source={require("../../assets/success.png")}></Image>
                </View>
                <Text style={styles.title}>Registration Successful!</Text>
                <Text style={styles.subtitle}>
                    Your clinic and admin have been registered successfully.
                </Text>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate("SignIn")}
                    style={styles.button}
                >
                    Go To LogIn Page
                </Button>

            </View>
        </SafeAreaView>
    )
}