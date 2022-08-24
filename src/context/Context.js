import React, { createContext, useState , useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, StyleSheet,useColorScheme,View} from 'react-native';

export const TradeContext = createContext();

export const TradeProvider = ({ children }) => {

    const [theme, setTheme] = useState("Light");
    const [colors, setColors] = useState({primary:"white",text:"black",headingtext:'#1B0A30'})
    const colorScheme = useColorScheme();

  const changeTheme = (t)=>{
    var color = t
    if(t=="System"){
        color=colorScheme
        console.log(colorScheme)
    }
        if(color=="light"){
            setColors({
                primary:"white",
                text:"black",
                headingtext:"#1B0A30",
                alphabg:"rgba(0,0,0,0.4)",
                textinputtitle:'#160032',
            })
        }
        else if(color=="dark"){
            setColors({
                primary:"#1E1E1E",
                text:"rgba(255,255,255,0.8)",
                headingtext:"white",
                alphabg:"rgba(255,255,255,0.4)",
                textinputtitle:'#fff',
            })
        }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:colors.primary,
        justifyContent: 'center',

      },
    leftalignedcontainer: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor:colors.primary,
        justifyContent: 'flex-start',
        paddingLeft:20,
        // width:'100%'
      },
    heading: {
        fontSize: 35,
        fontWeight: '100',
        textAlign: 'center',
        color:colors.headingtext
      },
    smallHeading: {
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
        color:colors.headingtext
      },
    text: {
        fontSize: 16,
        fontWeight: '100',
        textAlign: 'center',
        color:colors.text,
        marginVertical:5
      },
      textInputTitle:{
        fontSize: 16,
        fontWeight: '100',
        textAlign: 'center',
        color:colors.textinputtitle,
        marginVertical:5
      }
  })
  return (
    <TradeContext.Provider
      value={{
        theme,
        setTheme,
        colors,
        setColors,
        changeTheme,
        styles
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};