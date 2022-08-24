import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { createContext, useState , useEffect } from "react";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Settings from "../views/Settings";
import MyTabs from './BottomTab ';

const Drawer = createDrawerNavigator();

function MyDrawer() {

  return (

    <Drawer.Navigator>
      <Drawer.Screen name="Settings" component={Settings} />
      {/* <Drawer.Screen name="HomeTabs" component={MyTabs} /> */}
    </Drawer.Navigator>

  );
}

export default MyDrawer