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
import { sub } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    root:{
        backgroundColor:'#1EE5E4',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }, 
    form:{
        alignItems:'center',
        backgroundColor:'#F0F3F4',
        padding:40,
        paddingBottom:20,
        paddingTop:25,
        borderRadius:10,
        width:350
    },  
    subject:{
        width:300,
        height:50,
        borderWidth:1,
        fontSize:20,
    },
    todo:{
        width:300,
        height:250,
        borderWidth:1,
        marginTop:20,
        marginBottom:10,
    }
});

const Form = ({route,navigation}) =>{
    const [ID,setID] = React.useState(0);
    const [subject,setSubject] = React.useState('');
    const [body,setBody] = React.useState('');
    let d = new Date();
    let month;
    if(d.getMonth()<=8)
        month = '0'+(1+d.getMonth());
    else
        month = d.getMonth();
    let date_str = d.getDate()+'/'+month+'/'+d.getFullYear();

    React.useEffect(()=>{
        setID(route.params.ID);
        setSubject(route.params.subject);
        setBody(route.params.body);
    },[route.params])

    const e = subject?"View and Update your TO-DO":"Create your TO-DO here";
    return (
        <View style = {styles.root}>
            <View style = {styles.form}>
                <Text style = {{marginBottom:10,fontSize:20}}>{e}</Text>
                <TextInput placeholder = "Subject" style = {styles.subject} onChangeText = {(text)=>setSubject(text)} value = {subject}></TextInput>
                <View style = {styles.todo}>
                    <TextInput multiline placeholder = "TO-DO" style = {{fontSize:20}} onChangeText = {(text)=>setBody(text)} value = {body}></TextInput>
                </View>
                <Button title = "Submit" onPress = {()=>navigation.navigate('TO-DO App',{
                    ID:ID,
                    subject:subject,
                    body:body,
                    date:date_str,
                })}/>
            </View>
        </View>
    );
};

export default Form;