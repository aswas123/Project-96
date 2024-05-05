import React from "react"
import {Text,View,StyleSheet,Image} from "react-native"
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import db from "../config"
export default class CustomSideBarMenu extends React.Component {
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
  <View style={this.light_theme?styles.containerLight:styles.container}>
        <Image style={styles.sideMenuProfileIcon}
        source={require("../assets/logo.png")}
        />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
  )
}
}
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  }
});