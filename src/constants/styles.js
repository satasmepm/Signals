import React, { createContext, useState , useEffect } from "react";
import { View, Text,StyleSheet, Dimensions , StatusBar } from 'react-native'
import { TradeContext } from "../context/Context"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const commanStyles = StyleSheet.create({
      list: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical:15
      },
      row:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
      },
      buttonPrimary:{
        backgroundColor:"#1B0A30",
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:5
      },
      buttonText:{
        color:'#ffffff',
        textAlign:'center'
      },
      hr:{
        width:windowWidth-40,
        height:1,
        backgroundColor:'gray',
        marginVertical:10
      },
      textInput:{
        width:windowWidth-40
      },
      TextBoxView: {
        borderWidth:1,
        borderRadius:10,
      },
      textBoxTitle:{
        position:'absolute',
        top:0,
        left:15,
        zIndex:5,
        paddingHorizontal:5
      },
      header:{
        position:'absolute',
        top:0,
        left:0,
        width:windowWidth,
        padding:15,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between'
      }
})

export default commanStyles;