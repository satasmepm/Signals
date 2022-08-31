import React, { useContext, useEffect, useState  } from "react";
import { View, Text ,TouchableOpacity} from 'react-native'
import { TradeContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import commanStyles from '../constants/styles';
import TextBox from '../components/TextBox';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import CustomButton from "../components/CustomButton";
import firestore from '@react-native-firebase/firestore';
import toastConfig from "../components/CustomToast";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function Welcome() {

    const navigation = useNavigation();
    const context = useContext(TradeContext);

    
  return (
    <View style={context.styles.container}>
      <TitleImage icon={<Feather name={'check-circle'} size={25} color={context.colors.text} />}/>
        <Text style={context.styles.heading}>Welcome!</Text>
        <Text style={context.styles.text}>Hi {context.user}</Text>
        <Text style={context.styles.text}></Text>
      <CustomButton title={'Get started'} onPress={()=>navigation.navigate('MyDrawer')} />    
      <Toast
        position='bottom'
        bottomOffset={20}
        config={toastConfig}
      />
    </View>
  )
}