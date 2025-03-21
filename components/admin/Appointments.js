import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View,TextInput,StyleSheet, TouchableOpacity,Text} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Appointments(){
    const [searchText,setSearchText]=useState("");
    return(
        <View>
            <View style={styles.header}>
                <View style={styles.headerName}>
                    <Text style={styles.textStyle}>Appointments</Text>
                </View>
                <View>
                    <AntDesign name="adduser" size={24} color="white" />
                </View>
            </View>


            <View style={styles.searchLine}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="grey" style={styles.searchIcon}></Ionicons>
                    <TextInput style={styles.input} value={searchText} placeholder="Search..." clearButtonMode="while-editing" onChangeText={setSearchText}></TextInput>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setSearchText("")}>
                       <Text style={styles.cancelStyle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
}

const styles=StyleSheet.create({

    header:{    
        paddingVertical:15,
        backgroundColor:"#1A9F7F",
        flexDirection:"row",
        paddingHorizontal: 16
    },
   headerName:{
    flex:1,
    alignItems:"center"
   },
    textStyle:{
        color:"white",
        fontSize:20,
        fontWeight:"400",
        textAlign:"center"
    },
    searchLine:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:18
    },
    searchContainer:{
         flexDirection:"row",
         alignItems:"center",
          backgroundColor:"#FFFFFF",
          borderColor:"#1A9F7F",
          borderWidth:2,
          height:40,
          borderRadius:20,
          paddingHorizontal:10,
          flex:1
    },
    input:{
       fontSize:16,
       flex:1,
    },
    cancelStyle:{
        fontSize:18,
        marginLeft:19
    },
    searchIcon:{
        marginRight:8
    }
})