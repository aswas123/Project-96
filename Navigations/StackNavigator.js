import React from "react"
import BottomTabNavigator from "./TabNavigator"
import InfoScreen from "../Screens/InfoScreen"
import {createStackNavigator} from "@react-navigation/stack"


const Stack = createStackNavigator()
export default class StackNavigator extends React.Component{
  render(){
    return(
     
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home"  component={BottomTabNavigator}/>
      <Stack.Screen name="InfoScreen" component={InfoScreen}/>
      </Stack.Navigator>
      
    )
  }
}