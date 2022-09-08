import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import { TradeContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import commanStyles from '../constants/styles';
import TextBox from '../components/TextBox';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import CustomButton from "../components/CustomButton";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Validation } from '../components/Validation';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import toastConfig from '../components/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD
=======

>>>>>>> 81d07ca3fa078d43a9638a9e0f4292702676e5e1

export default function Login() {

  const [WINDOW_HEIGHT, setHeight] = useState('');
  const [WINDOW_WIDTH, setWidth] = useState('');

  const navigation = useNavigation();

  const context = useContext(TradeContext);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const [showp, setShowp] = useState(true)
  const [pVal, setPVal] = useState(false)
  const [plVal, setPlVal] = useState(false)
  const [eVal, setEVal] = useState(false)
  const [ewVal, setEwVal] = useState(false)
  const [eaVal, setEAVal] = useState(false)

  useEffect(() => {
    //Get device Height
    setHeight(Dimensions.get('window').height);
    //Get device Width
    setWidth(Dimensions.get('window').width);
  }, []);

  const styles = StyleSheet.create({
    welcome_text: {
      fontSize: 20, fontWeight: 'bold', color: 'black', paddingTop: 20,
    },
    welcome_sub_text: {
      fontSize: 12,
    },
    footer: {
      position: 'absolute',
      left: 20,
      top: WINDOW_HEIGHT - 20,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    forgot_password: {
      textAlign: 'right', marginBottom: 20, marginTop: 20,
      fontSize: 12
    }

  })

  const reg = () => {

    if (email == '') {
      setEVal(true)
    }
    if (password == '') {
      setPVal(true)
    }

    if (email != '' && password != '') {

      setEVal(false)
      setPVal(false)
      setPlVal(false)
      setEAVal(false)
      setEwVal(false)
      var data = {
        email: email,
        password: password,
      }
      login(data)

    }
    else {
      Toast.show({
        type: 'default',
        text1: 'All Fields are Required!',
        props: { err: true, colors: context.colors }
      });
    }

  }

  const login = (data) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(function () { 
        
        //Auth is successful
        Toast.show({
          type: 'default',
          text1: 'Login successfull',
          props: { err:false ,colors:context.colors}
        });
        storeUser(data.email)
        context.setUser(data.email)
        setTimeout(() => {
          navigation.navigate('MyDrawer')
          }, 2000);


      })
      .catch(function (error) {
        errorCode = error.code;
        errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          console.log("Wrong password");
          alert('Wrong password.');
        }if(errorCode === 'auth/user-not-found'){
          Toast.show({
            type: 'default',
            text1: "There is no user record corresponding to this identifier",
            props: { err:true ,colors:context.colors}
          });
        } else {
          console.log("Navigate to Home : "+error);
          auth/user-not-found
          Toast.show({
            type: 'default',
            text1: ""+error,
            props: { err:true ,colors:context.colors}
          });
        }
      });

  }
  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
     
    } catch (e) {
      // saving error
    }
  }
  return (
    <View style={context.styles.container}>
      <Header heading={'Login'} />
      <TitleImage icon={<Feather name={'briefcase'} size={25} color={context.colors.text} />} />
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
        <Text style={styles.welcome_text}>Welcome back! </Text>
        <Text style={styles.welcome_sub_text}>Log in to your already created acount of signals</Text>
      </View>
      <View style={commanStyles.textInput}>
        <TextBox title={'Email address'}
          content={
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
              <TextInput
              placeholder="Please enter your email here"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={{ width: "90%", paddingLeft: 10, color: context.colors.text }}
                onFocus={() => { setEVal(false); setEwVal(false) }}
                onChange={() => { setEVal(false); setEwVal(false) }}
              />
              {
                eVal ?
                  <Validation text={'Email is Required'} />
                  :
                  null
              }
              {
                eaVal ?
                  <Validation text={'Email Already Registered'} />
                  :
                  null
              }
              {
                ewVal ?
                  <Validation text={'Email is Invalid'} />
                  :
                  null
              }
              <Feather name={'mail'} size={20} color={context.colors.text} />
            </View>
          }
        />
        <View style={{ marginBottom: 15 }}></View>
        <TextBox title={'Password'}
          content={
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
              <TextInput
                  placeholder="Please enter your password here"
                onChangeText={(text) => setpassword(text)}
                value={password}
                secureTextEntry={showp}
                style={{ width: "90%", paddingLeft: 10, color: context.colors.text }}
                onFocus={() => { setPVal(false); setPlVal(false) }}
                onChange={() => { setPVal(false); setPlVal(false) }}
              />
              {
                pVal ?
                  <Validation text={'password is Required'} />
                  :
                  null
              }
              {
                plVal ?
                  <Validation text={'Password must longer than 8 characters'} />
                  :
                  null
              }
              {
                showp ?
                  <TouchableOpacity onPress={() => { setShowp(false) }}>
                    <Ionicons name={'eye-off'} size={20} color={context.colors.text} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => { setShowp(true) }}>
                    <Ionicons name={'eye'} size={20} color={context.colors.text} />
                  </TouchableOpacity>
              }


            </View>
          }
        />
<<<<<<< HEAD
        <Text onPress={()=>navigation.navigate('ForgotPassword')} style={styles.forgot_password}>Forgot Password?</Text>
</View>
=======

        <Text onPress={()=>navigation.navigate('ForgotPassword')} style={styles.forgot_password}>Forgot Password?</Text>

      </View>
>>>>>>> 81d07ca3fa078d43a9638a9e0f4292702676e5e1


      <CustomButton title={'Sign In'} onPress={() => reg()} />

      <View style={styles.footer}>
        <Text style={{ fontSize: 13 }}>Don’t have an account? </Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }} onPress={() => {navigation.navigate('Register') }}>Sign Up</Text>

      </View>
      <Toast
        position='bottom'
        bottomOffset={20}
        config={toastConfig}
      />
    </View>
  )
}