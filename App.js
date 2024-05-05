import React from "react"
import DrawerNavigator from "./Navigations/DrawerNavigator"
import LoginScreen from "./Screens/LoginScreen"
import RegisterScreen from './Screens/RegisterScreen'
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import firebase from "firebase"
import {firebaseConfig} from "./config"
import CustomSideBarMenu from "./Screens/customSideBarMenu"

if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig) } else{ firebase.app() }

const Stack = createStackNavigator()

const StackNav=()=>{
   return(
     <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login"  component={LoginScreen}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
      <Stack.Screen name="Dashboard" component={DrawerNavigator}/>
      </Stack.Navigator>
      </NavigationContainer>
    )
}


export default class App extends React.Component{
  render(){
    return(
      <StackNav/>
    )
  }
}