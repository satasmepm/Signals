import React, { useContext, useState , useEffect } from "react";
import { View, Text,StyleSheet, TouchableOpacity , StatusBar, ImageBackground } from 'react-native'
import commanStyles from "../constants/styles";
import { TradeContext } from "../context/Context"
import * as Animatable from 'react-native-animatable';

const TitleImage = ({
        icon,
})=>{
    
    const context = useContext(TradeContext);
return(
    <Animatable.View animation={'bounceIn'}>
        <ImageBackground source={require('../../assets/images/circle.png')}
        style={{width:100,height:100,justifyContent:'center',alignItems:'center'}}
        imageStyle={{tintColor:context.colors.text}}
        >
            <View >
                {icon}
            </View>  
        </ImageBackground> 
    </Animatable.View>
)
}

export default TitleImage;