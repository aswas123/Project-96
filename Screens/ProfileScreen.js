import React from "react"
import {View,Text,StyleSheet,SafeAreaView,StatusBar,Platform,Image,FlatList,Switch} from "react-native"
import {RFValue} from "react-native-responsive-fontsize"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import firebase from "firebase"
SplashScreen.preventAutoHideAsync()

var customFonts={
  "Bubblegum-Sans":require("../assets/fonts/BubblegumSans-Regular.ttf")
}


export default class Profile extends React.Component{
  constructor(){
    super()
    this.state={
      fontsLoaded:false,
      isEnabled:false,
      light_theme:true,
      name:""


    }
  }
  loadFontsAsync=async()=>{
    await Font.loadAsync(customFonts)
    this.setState({fontsLoaded:true})
  }
  componentDidMount(){
    this.loadFontsAsync()
    this.fetchUser()
  }
  toggle=()=>{
    const previousState=this.state.isEnabled
    const theme=!this.state.isEnabled?"dark":"light"
    var updates={}
    updates["/users/"+firebase.auth().currentUser.uid+"/current_theme"] = theme
   firebase.database().ref().update(updates)
   this.setState({isEnabled:!previousState,light_theme:previousState})
  }
  
  fetchUser=async()=>{
    var theme,name,image
    await firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
    .on("value",function(snapShot){
      theme = snapShot.val().current_theme
      name= `${snapShot.val().first_name} ${snapShot.val().last_name} `
    })
    this.setState({
      light_theme:theme==="light"?true:false,
      isEnabled:theme==="light"?false:true,
      name:name
    })
  }
  
  render(){
    if (this.state.fontsLoaded){
      SplashScreen.hideAsync()
    
    return(
      <View style={this.state.light_theme?styles.containerLight:styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.appTitle}>
      <View style={styles.appIcon}>
      <Image style={styles.iconImage}
      source={require("../assets/logo.png")}
      />
      </View>
      <View style={styles.appTitleTextContainer}>
      <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>Story Telling App</Text>
      </View>
      </View>
      <View style={styles.screenContainer}>
      <View style={styles.profileImageContainer}>
      <Image style={styles.profileImage}
      source={require("../assets/profile_img.png")}
      />
      <Text style={this.state.light_theme?styles.nameTextLight:styles.nameText}> {this.state.name} </Text>    
      </View>
      <View style={styles.themeContainer}>
      <Text style={this.state.light_theme?styles.themeTextLight:styles.themeText}> Dark Theme </Text>
      <Switch 
      style={{transform:[{scaleX:1.3},{scaleY:1.3}]}}
      trackColor={{false:"#767577",true:"white"}}
      thumbColor={this.state.isEnabled?"orange":"teal"}
      ios_backgroundColor={"grey"}
      onValueChange={()=>{this.toggle()}}
      value={this.state.isEnabled}
      />
      </View>
      </View>
      </View>
    )
    }
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#15193c',
	},
  containerLight: {
		flex: 1,
		backgroundColor: '#fff',
	},
	droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	appTitle: {
		flex: 0.07,
		flexDirection: 'row',
	},
	appIcon: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconImage: {
		width: '200%',
		height: '200%',
		resizeMode: 'contain',
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: 'center',
	},
	appTitleText: {
		color: 'white',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
  appTitleTextLight: {
		color: 'black',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
	screenContainer: {
		flex: 0.85,
	},
	profileImageContainer: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileImage: {
		width: RFValue(140),
		height: RFValue(140),
		borderRadius: RFValue(70),
	},
	nameTextLight: {
		color: 'black',
		fontSize: RFValue(40),
		fontFamily: 'Bubblegum-Sans',
		marginTop: RFValue(10),
	},
  	nameText: {
		color: 'white',
		fontSize: RFValue(40),
		fontFamily: 'Bubblegum-Sans',
		marginTop: RFValue(10),
	},
	themeContainer: {
		flex: 0.2,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: RFValue(20),
	},
	themeText: {
		color: 'white',
		fontSize: RFValue(30),
		fontFamily: 'Bubblegum-Sans',
		marginRight: RFValue(15),
	},
  themeTextLight: {
		color: 'black',
		fontSize: RFValue(30),
		fontFamily: 'Bubblegum-Sans',
		marginRight: RFValue(15),
	},
});