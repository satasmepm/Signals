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
        width:windowWidth,
        padding:20,
      },
      TextBoxView: {
        borderWidth:1,
        borderRadius:10,
      },
      textBoxTitle:{
        position:'absolute',
        top:-5,
        left:15,
        zIndex:5,
        paddingHorizontal:5,
        fontSize:13
      },
      header:{
        position:'absolute',
        top:0,
        left:0,
        width:windowWidth,
        padding:15,
        // flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between'
      },
      card:{
        width:(windowWidth-40)/2,
        padding:7,
        margin:5,
        elevation:5,
        backgroundColor:'white',
        borderRadius:5
      },
      spaceBetweenRow:{
        flexDirection:'row',
        height:20,
        borderRadius:5,
        paddingHorizontal:5,
        justifyContent:'space-between',
        alignItems:'center'
      },
      coins:{
        fontSize:15
      },
      dates:{
        color:'gray',
        fontSize:11
      },
      target:{
       fontSize:11
      },
      coinView:{
        width:windowWidth-40,
        marginTop:5,
        flexDirection:'row',
        alignItems:'center'
      },
      coinIcon:{
        resizeMode:'contain',
        width:'100%',
        height:'100%'
      },
      coinIconView:{
        width:(windowWidth-40)/10,
        height:(windowWidth-40)/10
      },
      risk:{
        borderWidth:0.5,
        paddingHorizontal:5,
        borderColor:'#D18A00',
        borderRadius:3,
        paddingVertical:1
      },
      risktext:{
        fontSize:10,
        color:'#D18A00'
      },
      hold:{
        backgroundColor:'#08A835',
        paddingHorizontal:5,
        borderRadius:3,
        paddingVertical:1
      },
      stops:{
        backgroundColor:'#FF0000',
        paddingHorizontal:5,
        borderRadius:3,
        paddingVertical:1
      },
      whiteText:{
        fontSize:10,
        color:'#ffffff',
        fontWeight:'700'
      },
      plancard:{
        width:(windowWidth-50)/2,
        margin:2.5,
        padding:10,
        borderRadius:7
      },
      tralcard:{
        width:(windowWidth-40),
        margin:2.5,
        padding:10,
        borderRadius:7
      },
      profilecard:{
        padding:10,
        borderRadius:10,
        marginBottom:5,
        elevation:3
      },
      ////////////////////////////////////////// chamil/////////////////
      linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      plancard2:{
        width:(windowWidth-50)/2,
        margin:2.5,
        padding:10,
        borderRadius:7,
        borderWidth:0.3,
        borderColor:"grey"
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',

        
      },
      
    
})

export default commanStyles;