import React, { useContext, useState , useEffect } from "react";
import { View, Text,StyleSheet, TouchableOpacity , StatusBar } from 'react-native'
import commanStyles from "../constants/styles";
import { TradeContext } from "../context/Context"
import * as Animatable from 'react-native-animatable';

const CustomButton = ({
    title,
    onPress
})=>{
    const context = useContext(TradeContext);
return(
    <Animatable.View animation={'fadeIn'} style={{alignSelf:'center'}}>
        <TouchableOpacity onPress={onPress} style={commanStyles.buttonPrimary}>
        <View>
        <Text style={commanStyles.buttonText}>{title}</Text>
        </View>
    </TouchableOpacity>         
    </Animatable.View>
 
)
}
export default CustomButton