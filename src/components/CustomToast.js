import { View, Text,StyleSheet, TouchableOpacity , StatusBar, Modal, TextInput } from 'react-native'
import React, { useContext, useRef, useState  } from "react";
import { TradeContext } from '../context/Context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import AntDesign from 'react-native-vector-icons/AntDesign';

const toastConfig = { 

  default: ({ text1, props }) => (
    <View style={{ height: 40, width: '90%', backgroundColor: props.colors.toast ,flexDirection:'row',justifyContent:'flex-start',paddingHorizontal:10,alignItems:'center',borderRadius:5}}>
      {
        props.err==true?
        <AntDesign name={'infocirlce'} size={18} color={'red'} />
        :
        <AntDesign name={'checkcircle'} size={18} color={'#589E4A'} />
        }
      <Text style={{color:props.colors.primary}}>  {text1}</Text>
    </View>
  )
};

export default toastConfig