
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home';
import React, { useContext, useEffect, useState  } from "react";
import { TradeContext } from '../context/Context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Spots from "../views/Spots";
import Futures from "../views/Futures";
import Offerings from "../views/Offerings";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();


function Tabs() {
    const context = useContext(TradeContext);
  return (
    <Tab.Navigator 
        screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:context.colors.text,
            tabBarInactiveTintColor:context.colors.alphabg2,            
            tabBarStyle:{paddingVertical:5,backgroundColor:context.colors.card,borderTopColor:context.colors.alphabg,paddingBottom:7},
            
        }}
        
        
    >
            <Tab.Screen 
      name="Home" 
      component={Home} 
      
      options={{
        tabBarLabel: 'Home',
        
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" color={color} size={22} />
        ),
      }}
      />

{
  context.pack==1 ?
        <Tab.Screen 
      name="Spots" 
      component={Spots} 
      options={{
        tabBarLabel: 'Spots',
        tabBarIcon: ({ color }) => (
          <Entypo name="flash" color={color} size={20} />
        ),
        unmountOnBlur:true
      }}/>
      :
  context.pack==2 ?
        <Tab.Screen name="Futures" component={Futures} 
      
      options={{
        tabBarLabel: 'Futures',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="file-text" color={color} size={17} />
        ),
        unmountOnBlur:true
      }}/>

      :
      <>
      <Tab.Screen 
      name="Spots" 
      component={Spots} 
      options={{
        tabBarLabel: 'Spots',
        tabBarIcon: ({ color }) => (
          <Entypo name="flash" color={color} size={20} />
        ),
        unmountOnBlur:true
      }}/>
      <Tab.Screen name="Futures" component={Futures} 
      
      options={{
        tabBarLabel: 'Futures',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="file-text" color={color} size={17} />
        ),
        unmountOnBlur:true
      }}/>
</>
      
}


      <Tab.Screen 
      name="Offerings" 
      component={Offerings} 
      
      options={{
        tabBarLabel: 'Offerings',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="box-open" color={color} size={17} />
        ),
      }}/>
    </Tab.Navigator>
  );
}
export default Tabs