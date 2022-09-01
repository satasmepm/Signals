import { View, Text } from 'react-native'
import React, { useContext, useRef, useState  } from "react";
import { TradeContext } from '../context/Context';
import Header from '../components/Header';

export default function Futures() {
  const context = useContext(TradeContext);
  return (
    <View style={context.styles.leftalignedcontainer}>
      <Header menu={true} heading={'Futures'} subtitle={'What are the Availabe signals'} />
      {/* <Text>Futures</Text> */}
    </View>
  )
}