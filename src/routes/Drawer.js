import React, { useContext, useState , useEffect } from "react";
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
import { View, Text,StyleSheet, TouchableOpacity , StatusBar, Modal } from 'react-native'
import { TradeContext } from '../context/Context';
import Feather from 'react-native-vector-icons/Feather';



function CustomDrawerContent(props) {

  const context = useContext(TradeContext);

  return (
    <DrawerContentScrollView style={{backgroundColor:context.colors.primary}} {...props}>
      <View style={{padding:15}}>
        <View style={{backgroundColor:context.colors.toast,alignSelf:'flex-start',padding:5,borderRadius:15}}>
          <Feather name={'user'} size={40} color={context.colors.primary} />          
        </View>

        <Text style={[context.styles.text,{textAlign:'left'}]}>{context.user}</Text>
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
    drawerContent={(props) => <CustomDrawerContent {...props}/>}
    initialRouteName='HomeTabs' 
    screenOptions={{
      headerShown:false,
      drawerPosition:'right',
      drawerActiveTintColor:context.colors.text,
      drawerInactiveTintColor:context.colors.text
      }} >
      
      <Drawer.Screen 
      name="HomeTabs" 
      component={MyTabs} 
      options={{
        drawerLabel:'Home',
        drawerIcon:()=><Feather name={'home'} size={20} color={context.colors.text} />
      }}
      />

      <Drawer.Screen 
      name="Settings" 
      component={Settings}  
      options={{
        drawerLabel:'Settings',
        drawerIcon:()=><Feather name={'settings'} size={20} color={context.colors.text} />
      }}
      />

      <Drawer.Screen 
      name="Login" 
      component={Login}  
      options={{
        drawerLabel:'Login',
        drawerIcon:()=><Feather name={'log-in'} size={20} color={context.colors.text} />
      }}
      />

    </Drawer.Navigator>

  );
}

export default MyDrawer