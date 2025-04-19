import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Alert, useWindowDimensions, Platform } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "@styles/dashboardStyles"
import { Avatar } from "react-native-paper";
import { getAvatarName } from "@utils/utils";
import { AuthContext } from "@context/AuthContext";
import { COLORS } from "@utils/colors";
import { getObject } from "@utils/MdLogAsyncStorage";
import { CLINIC_CONTEXT } from "@utils/constants";
import { ClinicOverview } from "@api/model/auth/Auth";
import { RootStackParamList } from "./MainNavigation";

type Props = {
    nav?: string,
    loading?: boolean
    tab?: string
}

export default function Back({ nav, loading = false, tab = undefined }: Props) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute();
    const [clinicName, setClinicName] = useState("");
    const { loggedInUserContext } = useContext(AuthContext)
    const [avatharName, setAv] = useState("XX");

    const loadClinicDeatils = async () => {
        if (!loading) {
            const clinic: ClinicOverview = await getObject(CLINIC_CONTEXT);
            setClinicName(clinic.clinic.name)
        }
    }

    useEffect(() => {
        setClinicName(loggedInUserContext?.clinicDetails?.name)
        loadClinicDeatils()
        setAv(getAvatarName(loggedInUserContext?.userDetails?.firstName, loggedInUserContext?.userDetails?.lastName));
    }, [loading])

    const { width } = useWindowDimensions();

    const logoWidth = width > 768 ? 120 : 95;
    const isWeb = Platform.OS === "web";

    return (
        <View>
            <View style={styles.header}>
                <View style={{ alignItems: "center", justifyContent: "center", width: logoWidth, flexDirection: "row" }}>
                    {nav ? <AntDesign name="arrowleft" style={{ marginLeft: 35 }} size={24} color="black" onPress={() => navigation.navigate(nav, { tab: tab })} /> :
                        ""}
                        <Image
                            source={require('../../assets/logo.png')}
                            style={{ aspectRatio: 105 / 25, width: "100%", marginLeft: 15 }}
                            resizeMode="contain" // Ensures the whole logo fits inside
                        />
                </View>
                {
                    isWeb && (
                        <View >
                            <Text style={styles.title}>{clinicName}</Text>
                        </View>
                    )
                }



                <View style={styles.headerIcons}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <TouchableOpacity onPress={() => navigation.navigate("UserProfileScreen")}>
                        <Avatar.Text size={32} label={avatharName} />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ borderBottomColor: COLORS.primary, borderBottomWidth: 1, marginVertical: 1, marginBottom: 10 }} />
        </View>
    )
}


