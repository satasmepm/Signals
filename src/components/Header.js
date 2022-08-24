import React, { useContext, useState , useEffect } from "react";
import { View, Text,StyleSheet, TouchableOpacity , StatusBar } from 'react-native'
import commanStyles from "../constants/styles";
import { TradeContext } from "../context/Context"
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const Header = ({
        heading,
        menu,
        subtitle
})=>{
    const navigation = useNavigation();
    const context = useContext(TradeContext);
return(
    <Animatable.View animation={'fadeInDown'} style={commanStyles.header}>
        <View>
        {
            menu?
            <TouchableOpacity>
                <Feather name={'menu'} size={25} color={context.colors.text} />
            </TouchableOpacity>
            :
            menu==false?
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Feather name={'chevron-left'} size={25}  color={context.colors.text} />
            </TouchableOpacity>
            :
            null
        }
        </View>
        <View>
            <Text style={[context.styles.heading,{margin:0}]}>{heading}</Text>
            <Text style={{textAlign:'center',fontSize:12}}>{subtitle}</Text> 
        </View>
        <View style={{width:25,height:25}}>
        </View>
    </Animatable.View>
)
}

export default Header;