import { View, Text,StyleSheet, TouchableOpacity , StatusBar, Modal, TextInput } from 'react-native'
import React, { useContext, useRef, useState  } from "react";
import { TradeContext } from '../context/Context';
// import { TextInput } from 'react-native-paper';
import commanStyles from '../constants/styles';
import TextBox from '../components/TextBox';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';

import { useNavigation } from '@react-navigation/native';

export default function Register() {

  const navigation = useNavigation();
  
  const context = useContext(TradeContext);
  const [username, setuserName] = useState('');

  const style = StyleSheet.create({

})

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
            style={{width:"90%",paddingLeft:10}}
            />
            <Feather name={'user'} size={20} color={context.colors.text} />
            </View>
          }
          /> 

          
          <TextBox title={'Email'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
            <TextInput         
            onChangeText={(text)=>setuserName(text)}
            value={username}
            style={{width:"90%",paddingLeft:10}}
            />
            <Feather name={'mail'} size={20} color={context.colors.text} />
            </View>
          }
          /> 

          
          <TextBox title={'Password'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
            <TextInput         
            onChangeText={(text)=>setuserName(text)}
            value={username}
            style={{width:"90%",paddingLeft:10}}
            />
            <Feather name={'lock'} size={20} color={context.colors.text} />
            </View>
          }
          /> 

          
          <TextBox title={'Confirm password'} 
          content={
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
            <TextInput         
            onChangeText={(text)=>setuserName(text)}
            value={username}
            style={{width:"90%",paddingLeft:10}}
            />
            <Feather name={'lock'} size={20} color={context.colors.text} />
            </View>
          }
          />     
      </View>

          <TouchableOpacity onPress={()=>navigation.navigate('Package')} style={commanStyles.buttonPrimary}>
            <View>
              <Text style={commanStyles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity> 

    </View>
  )
}