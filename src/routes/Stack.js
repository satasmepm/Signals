import React, { createContext, useState, useEffect } from "react";
import { View, Text } from 'react-native'
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
import Profile from "../views/Profile";

import auth from '@react-native-firebase/auth';
import ForgotPassword from "../views/ForgotPassword";
import CheckForgotPassword from "../views/CheckPasswordResetMail";
import Notifications from "../views/Notifications";


const Stack = createStackNavigator();

export default function MyStack() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
    } catch (e) {
      // saving error
    }
  }
  if (user!=null) {

    storeUser(user.email)
  }else{

  }

 
  return (
    <Stack.Navigator
      {...{ initialRouteName: !user ? 'Login' : 'MyDrawer' }}
      // initialRouteName="Login" 
      screenOptions={{
        headerShown: false
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CheckForgotPassword" component={CheckForgotPassword} />
      <Stack.Screen name="Notifications" component={Notifications} />
      
    </Stack.Navigator>
  );
}