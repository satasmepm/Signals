import {StatusBar, Text,useColorScheme,View} from 'react-native';
import MyStack from './src/routes/Stack';
import { NavigationContainer } from '@react-navigation/native';
import { TradeProvider, TradeContext } from './src/context/Context';
import React, { useContext } from "react";
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const context = useContext(TradeContext);
  return (
    <TradeProvider>
      <NavigationContainer>
        <MyStack/>  
      </NavigationContainer>
    </TradeProvider>

  )
}