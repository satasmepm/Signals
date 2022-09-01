import { View, Text , Image, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState  } from "react";
import { TradeContext } from '../context/Context';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import toastConfig from "../components/CustomToast";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import moment from 'moment';
import commanStyles from '../constants/styles';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function ChartView() {

    const route = useRoute();
    const context = useContext(TradeContext);

  return (
    <View style={context.styles.container}>
        <Header menu={false} heading={''} subtitle={''} />
        <View style={{height:'100%',width:'100%'}}>
            <WebView
                source={{ uri: route.params.url}}
                style={{marginTop:-100}}
            />
        </View>
    </View>
  )
}