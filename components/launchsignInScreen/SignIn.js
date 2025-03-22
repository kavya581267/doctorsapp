import React from "react";
import { View,StyleSheet,Text,TextInput,TouchableOpacity, Alert } from "react-native";


export default function SignIn(){

    const[form,setForm]=React.useState({
        email:"",
        password:""
    })
    return(
        <View style={{flex:1,padding:24}}>
            <View>
                <View style={styles.header}>
                    <Text style={{fontSize:24}}>Welcome to <Text style={{color:"#065C46",fontWeight:"600"}}>CureSync</Text></Text>
                </View>
            </View>                        
                                          
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput style={styles.inputControl} 
                   autoCapitalize="none" keyboardType="email-address" autoCorrect={false} value={form.email} onChangeText={email=>setForm({...form,email})}/>
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputText}>password</Text>
                    <TextInput secureTextEntry style={styles.inputControl} value={form.password} onChangeText={password=>setForm({...form,password})}/>
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.btn_gap} onPress={()=>{
                    
                }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Sign In</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.btn_gap} onPress={()=>{               
                }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Face ID</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{alignItems:"center"}}>
                <TouchableOpacity>
                    <Text style={{color:"#007B7F",textDecorationLine:"underline",fontSize:16,fontWeight:"500"}}>Create New Account</Text>
                </TouchableOpacity>
            </View>
        </View>
       
    );
}

const styles=StyleSheet.create({
    header:{
        alignItems:"center",
        marginBottom:30
    },
    inputControl:{
        height:44,       
        borderWidth:1,
        borderColor:"black",
        borderRadius:12,
        fontSize:20,
        fontWeight:"400",
        backgroundColor:"#fff",
        paddingLeft:10
    },
    inputText:{
       fontSize:20,      
    },
    input:{
        marginBottom:16
    },
    form:{
        marginBottom:30,
    },
    btn:{
       
        backgroundColor:"#D4EDDA",
        alignItems:"center",
        borderRadius:10,
        borderColor:"#1A9F7F",
        borderWidth:2 ,   
        paddingVertical:10
    },
    btnText:{
        fontSize:20,
        fontWeight:"500",
        color:"#065C46"
    },
    btn_gap:{
        marginBottom:16
    }
})

