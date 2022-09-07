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
import { Validation } from '../components/Validation';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import toastConfig from '../components/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ForgotPassword() {

  const [WINDOW_HEIGHT, setHeight] = useState('');
  const [WINDOW_WIDTH, setWidth] = useState('');

  const navigation = useNavigation();

  const context = useContext(TradeContext);
  const [email, setEmail] = useState('');

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
   
    welcome_sub_text: {
      fontSize: 14,
    },
  
    forgot_password: {
      textAlign: 'right', marginBottom: 20, marginTop: 20,
      fontSize: 12
    }

  })

  const forgotPassword = () => {

    if (email == '') {
      setEVal(true)
    }
    

    if (email != '') {

      setEVal(false)
      setEAVal(false)
      setEwVal(false)
      var data = {
        email: email,
      }
      sendResetEmail(data)

    }
    else {
      Toast.show({
        type: 'default',
        text1: 'Email Field is Required!',
        props: { err: true, colors: context.colors }
      });
    }

  }

  const sendResetEmail = (data) => {
    auth().sendPasswordResetEmail(data.email)
      .then(()=> {
        Toast.show({
            type: 'default',
            text1: 'Email is sent',
            props: { err:false ,colors:context.colors}
          });
          storeUser(data.email);
          navigation.navigate('CheckForgotPassword')

    }).catch(function (e) {
        Toast.show({
            type: 'default',
            text1: 'Something went wrong',
            props: { err:true ,colors:context.colors}
          });
    })
  }
  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem('user_email', value)
    } catch (e) {
      // saving error
    }
  }
  return (
    <View style={context.styles.container}>
      <Header heading={'Forgot Password'} subtitle={'Reset new password'}  />
      <TitleImage icon={<Feather name={'briefcase'} size={25} color={context.colors.text} />} />
      <View style={{ alignItems: 'center', marginBottom: 15,padding:20 }}>

        <Text style={styles.welcome_sub_text}>Enter the email associated with your account and we’ll send instructions to how to reset to new password.</Text>
      </View>
      <View style={commanStyles.textInput}>
        <TextBox title={'Email address'}
          content={
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
              <TextInput
              placeholder="Please enter email here "
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
       
      </View>


      <CustomButton  title={'Send to email'} onPress={() => forgotPassword()} />

     
      <Toast
        position='bottom'
        bottomOffset={20}
        config={toastConfig}
      />
    </View>
  )
}