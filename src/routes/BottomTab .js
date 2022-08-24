import React, { createContext, useState , useEffect } from "react";
import Home from "../views/Home";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Spots from "../views/Spots";
import Futures from "../views/Futures";
import Offerings from "../views/Offerings";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Spots" component={Spots} />
      <Tab.Screen name="Futures" component={Futures} />
      <Tab.Screen name="Offerings" component={Offerings} />
    </Tab.Navigator>
  );
}

export default MyTabs;