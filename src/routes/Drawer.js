import React, { useContext, useState, useEffect } from "react";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Settings from "../views/Settings";
import MyTabs from './BottomTab ';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Modal } from 'react-native'
import { TradeContext } from '../context/Context';
import Feather from 'react-native-vector-icons/Feather';
import Profile from "../views/Profile";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import Tabs from "./Tabs";

const SignOut = () => {

  const navigation = useNavigation();

  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      navigation.navigate('Login');
    });
    removeItemValue();

    
}


const removeItemValue = async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("user_email");
    // return true;
  }
  catch (exception) {
    // return false;
  }


  
}



function CustomDrawerContent(props) {


  const context = useContext(TradeContext);




  return (
    <DrawerContentScrollView style={{ backgroundColor: context.colors.primary }} {...props}>
      <View style={{ padding: 15 }}>
   
        <View style={{ backgroundColor: context.colors.toast, alignSelf: 'flex-start', padding: 5, borderRadius: 15 }}>
          <Feather name={'user'} size={40} color={context.colors.primary} />
        </View>

        <Text style={[context.styles.text, { textAlign: 'left' }]}>{context.user}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const context = useContext(TradeContext);
  return (

    <Drawer.Navigator

      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName='HomeTabs'
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerActiveTintColor: context.colors.text,
        drawerInactiveTintColor: context.colors.text,
        
      }} 
      
      >

      <Drawer.Screen
        name="HomeTabs"
        component={Tabs}
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => <Feather name={'home'} size={20} color={context.colors.text} />
        }}
      />


      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: () => <Feather name={'settings'} size={20} color={context.colors.text} />
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur:true,
          drawerLabel: 'Profile',
          drawerIcon: () => <Feather name={'user'} size={20} color={context.colors.text} 
          />
        }}
      />



      <Drawer.Screen
        name={context.user != null ? "Logout" : "Login"}
        component={SignOut}

        options={{

          drawerLabel: context.user != null ? "Logout" : "Login",
          drawerIcon: () => <Feather name={'log-out'} size={20} color={context.colors.text} />
        }}
      />

    </Drawer.Navigator>

  );
}

export default MyDrawer