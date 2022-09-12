import React, { createContext, useState , useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, StyleSheet,useColorScheme,View} from 'react-native';

import messaging from '@react-native-firebase/messaging';

export const TradeContext = createContext();

export const TradeProvider = ({ children }) => {

    const [theme, setTheme] = useState("Light");
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const [pack, setPack] = useState();
    const [colors, setColors] = useState({primary:"white",text:"black",alphabg:"rgba(0,0,0,0.1)",alphabg2:"rgba(0,0,0,0.5)",headingtext:'#1B0A30',card:'#FFFFFF',toast:'#292929'})
  //   const [colors, setColors] = useState({
  //     primary:"#1E1E1E",
  //     text:"rgba(255,255,255,0.8)",
  //     headingtext:"white",
  //     alphabg:"rgba(255,255,255,0.4)",
  //     textinputtitle:'#fff',
  //     card:'#292929',
  //     toast:'#E0E0E0'
  // })
    const colorScheme = useColorScheme();

    const getuser= async () => {
      try {
        
        const jsonValue = await AsyncStorage.getItem('theme')
        jsonValue != null ? setColors(JSON.parse(jsonValue)) : null;


        const value = await AsyncStorage.getItem('user')
        if(value !== null) {
          setUser(value)
          // value previously stored
        }
        const pkg = await AsyncStorage.getItem('pack')
        if(pkg !== null) {
          setPack(pkg)
          // value previously stored
        }


      } catch(e) {
        // error reading value
      }
    }

    useEffect(() => {
      // Get the device token      
      getuser()
      messaging()
        .getToken()
        .then(token => {
          return setToken(token);
        });
  
      // If using other push notification providers (ie Amazon SNS, etc)
      // you may need to get the APNs token instead for iOS:
      // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
  
      // Listen to whether the token changes
      return messaging().onTokenRefresh(token => {
        setToken(token);
      });

      

    }, []);

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
                alphabg:"rgba(0,0,0,0.1)",
                alphabg2:"rgba(0,0,0,0.5)",
                textinputtitle:'#160032',
                card:'#FFFFFF',
                toast:'#292929'
            })
            storeTheme({
              primary:"white",
              text:"black",
              headingtext:"#1B0A30",
              alphabg:"rgba(0,0,0,0.1)",
              alphabg2:"rgba(0,0,0,0.5)",
              textinputtitle:'#160032',
              card:'#FFFFFF',
              toast:'#292929'
          })
        }
        else if(color=="dark"){
            setColors({
                primary:"#1E1E1E",
                text:"rgba(255,255,255,0.8)",
                headingtext:"white",
                alphabg:"rgba(255,255,255,0.1)",
                alphabg2:"rgba(255,255,255,0.5)",
                textinputtitle:'#fff',
                card:'#292929',
                toast:'#E0E0E0'
            })
            storeTheme({
                primary:"#1E1E1E",
                text:"rgba(255,255,255,0.8)",
                headingtext:"white",
                alphabg:"rgba(255,255,255,0.1)",
                alphabg2:"rgba(255,255,255,0.5)",
                textinputtitle:'#fff',
                card:'#292929',
                toast:'#E0E0E0'
            })
        }
  }
  const storeTheme = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('theme', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:colors.primary,
        justifyContent: 'center',
        paddingTop:80
      },
    leftalignedcontainer: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor:colors.primary,
        justifyContent: 'flex-start',
        paddingLeft:20,
        paddingTop:80
        // width:'100%'
      },
    heading: {
        fontSize: 35,
        fontWeight: '300',
        // textAlign: 'center',
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
        token,
        setToken,
        user,
        setUser,
        pack,
        setPack,
        changeTheme,
        styles
      }}
    >
      <StatusBar barStyle={colors.primary=="#1E1E1E"?"light-content":"dark-content"} backgroundColor={colors.primary}/>
      {children}
    </TradeContext.Provider>
  );
};