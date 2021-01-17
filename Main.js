import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { sub } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage'

const styles = StyleSheet.create({
    contentContainerStyle:{
        flexDirection:'column',
        alignItems:'center',
    },
    welcome:{
        flexGrow:1,justifyContent:'center'
    },
    todosContainer:{
        marginTop:40,
        marginBottom:20
    },
    todoContainer:{
        backgroundColor:'white',
        width:350,
        padding:10,
        borderRadius:5,
        marginBottom:20
    },
    subject:{
        fontSize:20,
        marginBottom:20,
        textAlign:'center',
        padding:0
    }, 
    button:{
        backgroundColor:'#841584',
        borderRadius:1000000000000000000000000,
        width:60,
        height:60,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:10,
        right:10
    }   
});

const TODO = ({ID,subject,body,date,navigation}) =>{
    return(
        <View style = {styles.todoContainer}>
            <View style = {{padding:0,margin:0,alignSelf:"flex-end"}}>
                <Button
                icon={
                    <Icon 
                    name='times-circle'
                    size = {15}
                    />
                }
                type = "clear"
                />
            </View>
            <View>
                <Text style = {styles.subject}>
                    Subject : {subject}
                </Text>
                <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style = {{alignSelf:'flex-end'}}>Date-Created: {date}</Text>
                    <Button title = "View" onPress = {()=>navigation.navigate('Create TO-DO',{
                        ID:ID,
                        subject:subject,
                        body:body
                    })}></Button>
                </View>
            </View>
        </View>
    );
}

const STORAGE_KEY = "data";

const Main = ({route,navigation}) =>{
    const [ID,setID] = React.useState(0);
    const [todo,setTodo] = React.useState({});

    const readData = async () => {
        try {
            await AsyncStorage.setItem("name",route.params.name);
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            const data1 = JSON.parse(data);
            if (data1) {
                setTodo(data1);
                let uid = -1;
                Object.keys(data1).map((key,index)=>{
                    if(uid<key)
                        uid = key;
                })
                setID(uid+1);
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    const saveData = async (data) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        }catch (e) {
            alert('Failed to save the data to the storage')
        }
    }
      
    React.useEffect(()=>{
        if(!ID){
            setID(ID+1);
            readData();
        }
        else if(route.params.subject){
            const obj = {subject:route.params.subject,body:route.params.body,date:route.params.date}
            const data = {...todo,[route.params.ID]:obj};
            setTodo(data);
            if(ID == route.params.ID)
                setID(ID+1);
            saveData(data);
        }
    },[route.params])

    return (
        <View style = {{flex:1,backgroundColor:'#1EE5E4'}}>
            <ScrollView contentContainerStyle = {styles.contentContainerStyle}>
                <View>
                    <Text style = {{fontSize:30,letterSpacing:1,marginTop:20,textAlign:"center"}}>
                        Welcome {route.params.name}
                    </Text>
                </View>
                <View style = {styles.todosContainer}>
                    {Object.keys(todo).map((key,index)=>(
                        <TODO ID = {key} date = {todo[key].date} subject = {todo[key].subject} body = {todo[key].body} navigation = {navigation}/>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style = {styles.button} onPress = {()=>navigation.navigate('Create TO-DO',{
                ID:ID,
                subject:'',
                body:''
            })}>
                <Icon name = 'plus' size = {30} color = 'white'></Icon>
            </TouchableOpacity>
        </View>
    )
};

export default Main;