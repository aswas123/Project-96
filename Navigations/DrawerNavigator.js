import React from "react"
import StackNavigator from "./StackNavigator"
import Profile from "../Screens/ProfileScreen"
import Logout from "../Screens/Logout"
import {createDrawerNavigator} from "@react-navigation/drawer"
import {NavigationContainer} from "@react-navigation/native"
import CustomSideBarMenu from "../Screens/customSideBarMenu"
import firebase from "firebase"

const Drawer = createDrawerNavigator()
export default class DrawerNavigator extends React.Component{
  constructor() {
    super();
    this.state = {
      light_theme: true,
    };
  }
  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  }
  render(){
    var props=this.props
    return(
     
      <Drawer.Navigator
      drawerContent={(props)=> <CustomSideBarMenu {...props}/>}
      screenOptions={{
        drawerActiveTintColor:"#e91e63",
        drawerInactiveTintColor:"grey",
        itemStyle:{marginVertical:5}

      }}
      >
      <Drawer.Screen name="Home"  component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
      
    )
  }
}