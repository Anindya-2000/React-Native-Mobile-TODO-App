import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    root:{
        backgroundColor:'#1EE5E4',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
    },
    welcome:{
        flexGrow:1,justifyContent:'center'
    },
    input:{
        height:50,
        borderWidth:1,
        width:300,
        fontSize:20,
        marginBottom:20
    },
    button:{
        width:100,
    }
});

const STORAGE_KEY = "name";
const GetStarted = ({navigation}) =>{
    const [name,setName] = React.useState('');
    const [newUser,setNewUser] = React.useState(true);

    const getName = async() =>{
        const tmp = await AsyncStorage.getItem(STORAGE_KEY);
        if(tmp){
            setName(tmp);
            setNewUser(false);
        }
    }
    React.useEffect(()=>{
        getName();
    },[])

    const e = (!newUser)?"Welcome Back :)":"Get started by typing your name";
    return (
        <View style = {styles.root}>    
            <View style = {styles.welcome}>
                <Text style = {{fontSize:30,textAlign:'center',marginTop:20}}>
                    Welcome to TO-DO App
                </Text>
            </View>
            <View style = {{flexGrow:15,justifyContent:'center'}}>
                <Text style = {{textAlign:'center',marginBottom:20,fontSize:15}}>
                    {e}
                </Text>
                <TextInput style = {styles.input} placeholder = "Name" onChangeText = {(text)=>setName(text)} value = {name}></TextInput>
                <Button
                title="Get Started"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                style = {styles.button}
                onPress={() => navigation.navigate('TO-DO App',{name:name})}
                />
            </View>
        </View>
    )
}

export default GetStarted;