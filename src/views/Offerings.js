import { View, Text } from 'react-native'
import React, { useContext, useRef, useState  } from "react";
import { TradeContext } from '../context/Context';
import Header from '../components/Header';

export default function Offerings() {
  const context = useContext(TradeContext);
  return (
    <View style={context.styles.leftalignedcontainer}>
      <Header menu={true} heading={'Offerings'} subtitle={'Your offers'}/>
      {/* <Text>Offerings</Text> */}
    </View>
  )
}