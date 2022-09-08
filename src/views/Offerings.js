import { View, Text, Image } from 'react-native'
import React, { useContext, useRef, useState } from "react";
import { TradeContext } from '../context/Context';
import Header from '../components/Header';
import commanStyles from '../constants/styles';

export default function Offerings() {
  const context = useContext(TradeContext);
  return (
    <View style={{ backgroundColor: 'white', paddingTop: 110 }}>
      <Header menu={true} heading={'Offerings'} subtitle={'Your offers'} />
      {/* <Text>Offerings</Text> */}
      <View style={{ backgroundColor: 'white', height: 370, width: '100%' }}>
        <View style={{ width: '100%', height: 250 }}>
          <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/signalbinance-8e9aa.appspot.com/o/offerings%2Faustralia-t20-team.jpg?alt=media&token=70750656-682a-4b12-8190-18d2075cb974' }} style={{ width: '100%', height: "100%" }} />
        </View>
        <View style={{padding:15}}>
          <Text style={{fontWeight:'bold',fontSize:18,color:'black'}}>Headding</Text>
          <Text>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Text>
        </View>
      </View>
    </View>
  )
}