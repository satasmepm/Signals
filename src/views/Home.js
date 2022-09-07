import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useRef, useState } from "react";
import { TradeContext } from '../context/Context';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import commanStyles from '../constants/styles';
import * as Progress from 'react-native-progress';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Home() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const context = useContext(TradeContext);
  return (

    <View style={[context.styles.leftalignedcontainer, { paddingTop: 15, }]} >

      {/* <Text>Home {context.user}</Text> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingRight: 15 }}>
        <View width='100%' style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}>
            <Feather name={'bell'} size={22} color={context.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}>

          </TouchableOpacity>
          <View style={{ top: -10 }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', }}>Market Bearish (42.71/100)</Text>
            <View style={{ flexDirection: 'row' }}>

              <View style={{ backgroundColor: 'green', width: width / 5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 11, textAlign: 'center', padding: 2 }}>48.25%</Text></View>
              <View style={{ backgroundColor: 'red', width: width / 5, borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 11, textAlign: 'center', padding: 2 }}>55.28%</Text></View>

            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}>
              <Feather name={'help-circle'} size={20} color={context.colors.text} style={{ marginRight: 12 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}>
              <Feather name={'menu'} size={22} color={context.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>



      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons name={'local-fire-department'} size={19} color={context.colors.text} />
        <Text style={{ marginLeft: 5 }}>24 Hour Liquidations</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
        <View style={[commanStyles.plancard, { backgroundColor: context.colors.alphabg, padding: 15, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Sports</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>5,786,099</Text>
          </View>

          <Progress.Bar progress={0.6} width={width / 2.75} style={{ borderWidth: 0, color: 'red' }} height={2} unfilledColor={'red'} color={'green'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>7,489,365</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Longs</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => { }} style={[commanStyles.plancard, { backgroundColor: context.colors.alphabg }]}>
          <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>sfsdfsdf</Text>
          <Text style={[context.styles.text, { textAlign: 'left' }]}>LKR </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <MaterialIcons name={'local-fire-department'} size={19} color={context.colors.text} />
        <Text style={{ marginLeft: 5 }}>Long and Short Ratio</Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
        <View style={[commanStyles.plancard, { backgroundColor: context.colors.alphabg, padding: 15, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Sports</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>5,786,099</Text>
          </View>

          <Progress.Bar progress={0.6} width={width / 2.75} style={{ borderWidth: 0, color: 'red' }} height={2} unfilledColor={'red'} color={'green'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>7,489,365</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Longs</Text>
          </View>
        </View>
        <View style={[commanStyles.plancard, { backgroundColor: context.colors.alphabg, padding: 15, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Sports</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>5,786,099</Text>
          </View>

          <Progress.Bar progress={0.6} width={width / 2.75} style={{ borderWidth: 0, color: 'red' }} height={2} unfilledColor={'red'} color={'green'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>7,489,365</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Longs</Text>
          </View>
        </View>
        <View style={[commanStyles.plancard, { backgroundColor: context.colors.alphabg, padding: 15, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Sports</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>5,786,099</Text>
          </View>

          <Progress.Bar progress={0.6} width={width / 2.75} style={{ borderWidth: 0, color: 'red' }} height={2} unfilledColor={'red'} color={'green'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>7,489,365</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Longs</Text>
          </View>
        </View>
        <View style={[commanStyles.plancard, { backgroundColor: context.colors.alphabg, padding: 15, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Sports</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>5,786,099</Text>
          </View>

          <Progress.Bar progress={0.6} width={width / 2.75} style={{ borderWidth: 0, color: 'red' }} height={2} unfilledColor={'red'} color={'green'} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12, color: 'black', fontWeight: 'bold' }]}>7,489,365</Text>
            <Text style={[context.styles.text, { textAlign: 'left', fontSize: 12 }]}>Longs</Text>
          </View>
        </View>

      
      </View>
    </View>
  )
}