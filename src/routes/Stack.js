import React, { createContext, useState , useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Settings from "../views/Settings";
import Package from "../views/Package";
import MyDrawer from "./Drawer";
import Welcome from "../views/Welcome";
import ChartView from "../views/ChartView";
import Payment from "../views/Payment";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="MyDrawer" screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Package" component={Package} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="ChartView" component={ChartView} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
}