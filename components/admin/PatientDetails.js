import React, { useState } from "react";
import{View,Text,StyleSheet, TouchableOpacity} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import ActionSheetMore from "./ActionSheetMore";
import Entypo from '@expo/vector-icons/Entypo';
import Vitals from "./Vitals";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PatientDetails(){
    const route=useRoute();
    const {surname,name,age,phone,} = route.params || {};
    const [showVitals,setShowVitals]=useState(false);
    const navigation=useNavigation();
    console.log("Received Params:", route.params);
    return(
        <View style={{flex:1,paddingBottom:60}}>
            

            <View style={styles.header}>
               <View>
                    <AntDesign name="leftcircle" size={24} color="white" onPress={()=>navigation.navigate("NewPatient")}/> 
                </View>
                <View>
                    <Text style={styles.textStyle}>Patient Details</Text>
                </View>
                
                <View>
                    
                    <Fontisto name="save-1" size={24} color="white" />
                </View>
            </View>


            <View style={styles.patientContainer}>                
                <View>
                    <View>
                        <View  style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <View  style={{flexDirection:"row"}}>
                            <Text style={{marginRight:5}}>Name:  {surname}</Text>
                            <Text>{name}</Text>
                            </View>
                            
                            <Text>Age:  {age}</Text>
                        </View>               
                       <Text>Mobile:  {phone}</Text>
                    </View> 


                    <View style={styles.divider} /> 
                    <View style={styles.vitalsContainer}>
                        <View>
                           <Text style={styles.vitalsStyle}>Vitals:</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>setShowVitals(!showVitals)}>
                               <Entypo name="edit" size={24} color="black" />
                            </TouchableOpacity>                           
                        </View>
                    </View>
                        {
                            showVitals &&(
                                <View>
                                     <Vitals></Vitals>
                                     <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                        <View>
                                           <TouchableOpacity style={styles.Btn} onPress={()=>setShowVitals(false)}>
                                              <Text>Cancel</Text>
                                           </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.Btn} onPress={()=>setShowVitals(false)}>
                                               <Text>Update</Text>
                                             </TouchableOpacity>
                                        </View>
                                       
                                     </View>
                                </View>
                                
                            )
                        }            
                </View> 
            </View>
            
            <View>
                <ActionSheetMore PatientDetails={{surname,name,age,phone}}/>
            </View> 
           
        </View>
        
    )
}

const styles=StyleSheet.create({
    header:{
        paddingVertical:15,
        backgroundColor:"#1A9F7F",
        flexDirection:"row",
        paddingHorizontal: 16,
        justifyContent:"space-between",
        alignItems:"center"
    },
    textStyle:{
        color:"white",
        fontSize:18,
        fontWeight:"400",
        textAlign:"center",
       },

       patientContainer:{
        flex:1,
        borderWidth:2,
        borderColor:"#8DB5A2",
        borderRadius:10,
        margin:20,
        padding: 20,
        justifyContent: "space-between",
      },
      divider:{
        borderBottomWidth: 1,
        borderBlockColor: "#8DB5A2",
        marginVertical: 10,
      },
      vitalsStyle:{
        color:"#1A9F7F",
        fontWeight:"700",
        fontSize:16
      },
      vitalsContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
      },
      Btn:{
        backgroundColor: "#1A9F7F",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
      
      }
    
})