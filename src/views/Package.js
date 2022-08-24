import React, { useContext, useRef, useState  } from "react";
import { View, Text ,TouchableOpacity} from 'react-native'
import { TradeContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import commanStyles from '../constants/styles';
import TextBox from '../components/TextBox';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';

export default function Package() {

    const navigation = useNavigation();
    
    const context = useContext(TradeContext);

  return (
    <View style={context.styles.container}>
      <Header menu={false} heading={'Select Package'} subtitle={'Select a new Package to continue'} />
      <TitleImage icon={<Feather name={'briefcase'} size={25} color={context.colors.text} />}/>
  

          <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={commanStyles.buttonPrimary}>
            <View>
              <Text style={commanStyles.buttonText}>Continue</Text>
            </View>
          </TouchableOpacity> 

    </View>
  )
}