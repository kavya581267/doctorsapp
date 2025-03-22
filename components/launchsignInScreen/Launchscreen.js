import React from "react";
import { StyleSheet, View ,Text, TouchableOpacity, Image} from "react-native";



export default function LaunchScreen(){
    return(
        <View style={styles.container}>
             <Image style={styles.png} source={require("../../assets/launchscreen.png")}/>
             <Text style={styles.text}>CureSync</Text>
             <Text style={styles.subText}>Join us for seamless Health Management and Support</Text>
             <TouchableOpacity style={styles.buttonLogIn}>
                <Text style={styles.logTxt}>LogIn</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.buttonSign}>
                <Text style={styles.signTxt}>Sign Up</Text>
             </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:"#6A81D5",
    },
    png:{
      position: "absolute",
      top: 304, 
      left: 150,
      fontSize:40,
      fontWeight:"700",
      lineHeight:56,
      color:"#FFFFFF",
     },
   text:{
    position: "absolute",
    top: 404, 
    left: 100,
    fontSize:40,
    fontWeight:"700",
    lineHeight:56,
    color:"#FFFFFF",
   },
   subText:{
    position:"absolute",
    top:472,
    left:45,
    color:"#FFFFFF",
    width:300,
    fontSize:16,
    fontWeight:"400",
    lineHeight:26,
    textAlign:"center"
   },
   buttonLogIn:{
    position:"absolute",
    top:688,
    left:20,
    width:350,
    height:52,
    backgroundColor:"#F3F5FCFF",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:3,
   },
   logTxt:{
    fontSize:18,
    fontWeight:"400",
    color:"#6A81D5"
   },
   buttonSign:{
    position:"absolute",
    top:756,
    left:20,
    width:350,
    height:52,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    borderWidth:2,
    borderColor:"white",
    borderRadius:3
   },
   signTxt:{
    fontSize:18,
    fontWeight:"400",
    color:"white"
   }
})