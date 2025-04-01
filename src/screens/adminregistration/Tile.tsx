import { View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";


export default function Tile (){
    return(
        <View>
            <Card style={{margin:5,padding:5}}>
                <Title>Clinic Name</Title>
                <Paragraph>Location:</Paragraph>
                <Paragraph>Contact:</Paragraph>
            </Card>
        </View>
    )
}