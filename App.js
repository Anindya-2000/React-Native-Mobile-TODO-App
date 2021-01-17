/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GetStarted from './Getstarted.js';
import Main from './Main.js';
import Form from './Form.js';

const Stack = createStackNavigator();

const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Get Started">
        <Stack.Screen name="Get Started" component={GetStarted}/> 
        <Stack.Screen name="TO-DO App" component={Main} />       
        <Stack.Screen name="Create TO-DO" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
