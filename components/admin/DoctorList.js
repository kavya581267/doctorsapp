import React, { useState } from "react";
import { View,StyleSheet,TouchableOpacity,Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function DoctorList (){
      const navigation=useNavigation();
      const route=useRoute();
      const {surname,name,age,phone}=route.params || {};
      const [selectedCategory,setSelectedCategory]=useState("");
      const [selectedDoctor,setSelectedDoctor]=useState("");

      const categoryLabel =["Cardiologist","Dermatologist","Dentist","Neurologist"];
      const categories=categoryLabel.map((category)=>({
        label:category,
        value:category
      }));
     
      const doctorLabel ={
        Cardiologist: ["Dr. John Doe", "Dr. Richard Roe"],
        Dermatologist: ["Dr. Jane Smith", "Dr. Emily Davis"],
        Dentist:["Dr. Michael Brown", "Dr. Sarah Johnson"],
        Neurologist:["Dr. David Wilson", "Dr. Olivia Thomas"],
      };
      const doctorByCategory=Object.fromEntries(
          Object.entries(doctorLabel).map(([category,doctors])=>[
            category,
            doctors.map((doctor)=>(
                {
                    label:doctor,
                    value:doctor
                }
            )),
          ])
      );
    
      return(
        <View style={styles.container}>
            <View style={styles.header}>
               <View style={{flex:1}}>
                    <AntDesign name="leftcircle" size={24} color="white" onPress={()=>navigation.navigate("PatientDetails")}/> 
                </View>
                <View style={{flex:2.5}}>
                    <Text style={styles.textStyle}>Book Appointment</Text>
                </View>            
            </View>
            
            
            <View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <View style={{ flexDirection: "row" }}>
                          <Text style={{ marginRight: 5 }}>Name:  {surname}</Text>
                          <Text>{name}</Text>
                      </View>

                      <Text>Age:  {age}</Text>
                  </View>
                  <Text>Mobile:  {phone}</Text>
            </View>


            <View style={styles.contentContainer}>
            <Text style={styles.label}>Select Category:</Text>
            <Dropdown
                style={styles.dropdown}
                data={categories}
                labelField="label"
                valueField="value"
                placeholder="Select a Category"
                value={selectedCategory}
                onChange={(item) => {
                    setSelectedCategory(item.value);
                    setSelectedDoctor(null); 
                }}>
            </Dropdown>
             {selectedCategory && (
        <>
          <Text style={styles.label}>Select Doctor:</Text>
          <Dropdown
            style={styles.dropdown}
            data={doctorByCategory[selectedCategory] || []}
            labelField="label"
            valueField="value"
            placeholder="Select a Doctor"
            value={selectedDoctor}
            onChange={(item) => setSelectedDoctor(item.value)}
          />      
        </>
      )}

      {selectedDoctor && <Text style={styles.selectedText}>Selected Doctor: {selectedDoctor}</Text>}

      <TouchableOpacity style={styles.saveButton} onPress={()=>navigation.navigate("BookAppointment",{surname,name,age,phone,selectedCategory,selectedDoctor})}>
            <Text style={styles.saveButtonText}>Next</Text>
        </TouchableOpacity>
        </View>
    </View>
           
        
      )
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: "#f8f9fa",
      },
      contentContainer:{
        padding:20
      },
      header:{
        paddingVertical:15,
        backgroundColor:"#1A9F7F",
        flexDirection:"row",
        paddingHorizontal: 16,
       },
       textStyle:{
        
        color:"white",
        fontSize:18,
        fontWeight:"400",
       
       },
      label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
      dropdown: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "white",
        marginBottom: 10,
      },
      selectedText: {
        fontSize: 18,
        color: "green",
        marginTop: 10,
      },
      saveButton: {
        backgroundColor: "#1A9F7F",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: "5%",
        marginBottom: 10, 
    },
    saveButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
})