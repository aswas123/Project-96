import React from "react"
import {Text,View,TouchableOpacity} from "react-native"
import firebase from  "firebase"



 export default class Logout extends React.Component{
   componentDidMount(){
     firebase.auth().signOut()
     this.props.navigation.navigate("Login")
   }
   render(){
     return(
     <Text>Logout</Text>

     )
   }
 }