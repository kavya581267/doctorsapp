import { COLORS } from "@utils/colors";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function GenderSelector({ onTextChange }) {
    const [gender, setGender] = useState("other"); 

    const handleGenderChange = (value) => {
        setGender(value);
        onTextChange("gender", value);
    };

    return (
        <View>
           
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                {["male", "female", "other"].map((g) => (
                    <TouchableOpacity
                        key={g}
                        onPress={() => handleGenderChange(g)}
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            backgroundColor: gender === g ? COLORS.primary : COLORS.grey,
                            margin: 5,
                        }}
                    >
                        <Text style={{ color: "white" }}>{g.charAt(0).toUpperCase() + g.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
