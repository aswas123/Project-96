import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import firebase from 'firebase';

SplashScreen.preventAutoHideAsync();

var customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};


export default class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      previewImage: 'image_1',
      dropDownHeight: 40,
      light_theme: true,
    };
  }
  loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  };
  componentDidMount() {
    this.loadFontsAsync();
    this.fetchUser();
  }
  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };
  addInfo = async () => {
    if (
      this.state.name &&
      this.state.description &&
      this.state.wingspan &&
      this.state.length &&
      this.state.engine
    ) {
      var aircraftData = {
        preview_image: this.state.previewImage,
        name: this.state.name,
        description: this.state.description,
        wingspan: this.state.wingspan,
        length: this.state.length,
        engine: this.state.engine,
        creator: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0,
      };
      await firebase
        .database()
        .ref('/posts/' + Math.random().toString(36).slice(2))
        .set(aircraftData)
        .then((snapShot) => {
          this.props.navigation.navigate('Home');
        });
    } else {
      alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  };
  

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      var preview_images = {
        image_1: require('../assets/Airbus_A350.jpg'),
        image_2: require('../assets/Airbus_A380.jpg'),
        image_3: require('../assets/Boeing-777x.jpg'),
        image_4: require('../assets/Boeing_787-9Dreamliner.jpg'),
        image_5: require('../assets/GulfStream_g650.jpg'),
      };
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                style={styles.iconImage}
                source={require('../assets/logo.png')}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                Upload New Info
              </Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <Image
              style={styles.previewImage}
              source={preview_images[this.state.previewImage]}
            />
            <View style={{ height: RFValue(this.state.dropDownHeight) }}>
              <DropDownPicker
                items={[
                  { label: 'image 1', value: 'image_1' },
                  { label: 'image 2', value: 'image_2' },
                  { label: 'image 3', value: 'image_3' },
                  { label: 'image 4', value: 'image_4' },
                  { label: 'image 5', value: 'image_5' },
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropDownHeight === 170 ? true : false}
                onOpen={() => {
                  this.setState({ dropDownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropDownHeight: 40 });
                }}
                onSelectItem={(item) => {
                  this.setState({ previewImage: item.value });
                }}
              />
            </View>
            <ScrollView>
              <TextInput
                style={styles.inputFont}
                onChangeText={(name) => {
                  this.setState({ name });
                }}
                placeholder={'Name'}
                placeholderTextColor={'pink'}
              />
              <TextInput
                style={styles.inputFont}
                onChangeText={(description) => {
                  this.setState({ description });
                }}
                placeholder={'Description'}
                multiline={true}
                placeholderTextColor={'pink'}
              />
              <TextInput
                style={styles.inputFont}
                onChangeText={(wingspan) => {
                  this.setState({ wingspan });
                }}
                placeholder={'Wingspan'}
                multiline={true}
                placeholderTextColor={'pink'}
              />
              <TextInput
                style={styles.inputFont}
                onChangeText={(length) => {
                  this.setState({ length });
                }}
                placeholder={'Length'}
                multiline={true}
                placeholderTextColor={'pink'}
              />
              <TextInput
                style={styles.inputFont}
                onChangeText={(engine) => {
                  this.setState({ engine });
                }}
                placeholder={'Engine'}
                multiline={true}
                placeholderTextColor={'pink'}
              />


              <View>
                <Button
                  title={'Submit'}
                  onPress={() => {
                    this.addInfo();
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      );
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
    backgroundColor: 'White',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
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
    width: '100%',
    height: '100%',
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
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    marginTop: RFValue(10),
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
});
