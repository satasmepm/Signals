import { View, Text,StyleSheet, TouchableOpacity , StatusBar, Modal, TextInput } from 'react-native'
import React, { useContext, useRef, useState  } from "react";
import { TradeContext } from '../context/Context';
import commanStyles from '../constants/styles';
import TextBox from '../components/TextBox';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import { Validation } from '../components/Validation';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toastConfig from '../components/CustomToast';

export default function Register() {

  const navigation = useNavigation();
  
  const context = useContext(TradeContext);
  const [username, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [uVal,setUVal]=useState(false)
  const [eVal,setEVal]=useState(false)
  const [pVal,setPVal]=useState(false)
  const [cVal,setCVal]=useState(false)
  const [plVal,setPlVal]=useState(false)
  const [ewVal,setEwVal]=useState(false)
  const [eaVal,setEAVal]=useState(false)

  
  const [showp,setShowp]=useState(true)
  const [showcp,setShowcp]=useState(true)

  const reg = ()=>{
    if(username == ''){
      setUVal(true)
    }
    if(email == ''){
      setEVal(true)
    }
    if(password == ''){
      setPVal(true)
    }
    if(password != confirm){
      setCVal(true)
      Toast.show({
        type: 'default',
        text1: 'Confirm Password is not matching',
        props: { err:true ,colors:context.colors}
      });
    }
    if(username !='' && email !='' && password !='' && confirm!=''){
      setUVal(false)
      setEVal(false)
      setPVal(false)
      setPlVal(false)
      setEAVal(false)
      setEwVal(false)
      var data = {
        username: username,
        email: email,
        password:password,
        token:context.token,
        signalType:'',
        package:''
      }
      if(password ==confirm){
        register(data) 
        setCVal(false)
      }
      // else{
      //   Toast.show({
      //     type: 'default',
      //     text1: 'All Fields are Required!',
      //     props: { err:true ,colors:context.colors}
      //   });
      // }
           
    }
    else{
      Toast.show({
        type: 'default',
        text1: 'All Fields are Required!',
        props: { err:true ,colors:context.colors}
      });
    }

  }

  const register =(data)=>{
    auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(() => {
        firestore()
        .collection('Users')
        .doc(data.email)
        .set(data)
        .then(() => {
          Toast.show({
            type: 'default',
            text1: 'User Created.. Next Select the Package',
            props: { err:false ,colors:context.colors}
          });
          storeUser(data.email)
          context.setUser(data.email)
          setTimeout(() => {
            navigation.navigate('Package')
            }, 2000);
          
        });
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type: 'default',
            text1: 'That email address is already in use!',
            props: { err:true ,colors:context.colors}
          });
          setEAVal(true)
        }

        else if (error.code === 'auth/invalid-email') {
          Toast.show({
            type: 'default',
            text1: 'That email address is invalid!',
            props: { err:true ,colors:context.colors}
          });
          setEwVal(true)
        }
        else if (error.code === 'auth/weak-password') {
          Toast.show({
            type: 'default',
            text1: 'That Password is weak!',
            props: { err:true ,colors:context.colors}
          });
          setPlVal(true)
        }
        else{
          Toast.show({
            type: 'default',
            text1: error.code.split("/")[1],
            props: { err:true ,colors:context.colors}
          });
        }  
        // console.log(error.code)
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
      <Header menu={false} heading={'Sign Up'} subtitle={'create a new Account'} />
      <TitleImage icon={<Feather name={'user'} size={25} color={context.colors.text} />}/>
      <View style={commanStyles.textInput}>
          <TextBox title={'Username'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
            <TextInput         
            onChangeText={(text)=>setuserName(text)}
            value={username}
            style={{width:"90%",paddingLeft:10,color:context.colors.text}}
            onFocus={()=>setUVal(false)}
            onChange={()=>setUVal(false)}
            />
            {
              uVal?
              <Validation text={'Username is Required'} />
              :
              null
            }
            
            <Feather name={'user'} size={20} color={context.colors.text} />
            </View>
          }
          /> 

          
          <TextBox title={'Email'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
            <TextInput         
            onChangeText={(text)=>setEmail(text)}
            value={email}
            style={{width:"90%",paddingLeft:10,color:context.colors.text}}
            onFocus={()=>{setEVal(false);setEwVal(false)}}
            onChange={()=>{setEVal(false);setEwVal(false)}}
            />
            {
              eVal?
              <Validation text={'Email is Required'} />
              :
              null
            }
            {
              eaVal?
              <Validation text={'Email Already Registered'} />
              :
              null
            }
            {
              ewVal?
              <Validation text={'Email is Invalid'} />
              :
              null
            }
            <Feather name={'mail'} size={20} color={context.colors.text} />
            </View>
          }
          /> 

          
          <TextBox title={'Password'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
            <TextInput         
            onChangeText={(text)=>setpassword(text)}
            value={password}
            secureTextEntry={showp}
            style={{width:"90%",paddingLeft:10,color:context.colors.text}}
            onFocus={()=>{setPVal(false);setPlVal(false)}}
            onChange={()=>{setPVal(false);setPlVal(false)}}
            />
            {
              pVal?
              <Validation text={'password is Required'} />
              :
              null
            }
            {
              plVal?
              <Validation text={'Password must longer than 8 characters'} />
              :
              null
            }
            {
              showp?
              <TouchableOpacity onPress={()=>{setShowp(false)}}>
                <Ionicons name={'eye-off'} size={20} color={context.colors.text} />              
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>{setShowp(true)}}>
                <Ionicons name={'eye'} size={20} color={context.colors.text} />              
              </TouchableOpacity>
            }


            </View>
          }
          /> 

          
          <TextBox title={'Confirm password'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
            <TextInput         
            onChangeText={(text)=>setConfirm(text)}
            value={confirm}
            secureTextEntry={showcp}
            style={{width:"90%",paddingLeft:10,color:context.colors.text}}
            onFocus={()=>setCVal(false)}
            onChange={()=>setCVal(false)}
            />
            {
              cVal?
              <Validation text={'Confirm Password is not matching'} />
              :
              null
            }
            
            {
              showcp?
              <TouchableOpacity onPress={()=>{setShowcp(false)}}>
                <Ionicons name={'eye-off'} size={20} color={context.colors.text} />              
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={()=>{setShowcp(true)}}>
                <Ionicons name={'eye'} size={20} color={context.colors.text} />              
              </TouchableOpacity>
            }
            </View>
          }
          />
        <CustomButton title={'Next : Select Package'} onPress={()=>reg()} />    
      </View>

      <Toast
        position='bottom'
        bottomOffset={20}
        config={toastConfig}
      />

    </View>
  )
}