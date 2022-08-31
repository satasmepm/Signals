import React, { useContext, useState , useEffect } from "react";
import { View, Text,StyleSheet, TouchableOpacity , StatusBar } from 'react-native'
import commanStyles from "../constants/styles";
import { TradeContext } from "../context/Context"
import * as Animatable from 'react-native-animatable';

const TextBox = ({
        title,
        content,
})=>{
    
    const context = useContext(TradeContext);
return(
    <Animatable.View animation={'fadeInLeft'} style={{paddingVertical:7}}>
        <Text style={[context.styles.textInputTitle,commanStyles.textBoxTitle,{backgroundColor:context.colors.primary}]}>{title}</Text>
        <View style={[commanStyles.TextBoxView,{borderColor:context.colors.text}]}>
        {content}
        </View>    
    </Animatable.View>

)
}

export default TextBox;