import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import { TradeContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import commanStyles from '../constants/styles';
import TextBox from '../components/TextBox';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import CustomButton from "../components/CustomButton";
import { Validation } from '../components/Validation';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import toastConfig from '../components/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export default function Notifications() {

    const [WINDOW_HEIGHT, setHeight] = useState('');
    const [WINDOW_WIDTH, setWidth] = useState('');

    const navigation = useNavigation();

    const [ntcs, setNtcs] = useState(null);

    const context = useContext(TradeContext);




    useEffect(() => {
        setHeight(Dimensions.get('window').height);
        //Get device Width
        setWidth(Dimensions.get('window').width);
        var arr = []
        firestore()
            .collection('notifications')
            // .orderBy('id', 'asc')
            .get()
            .then(querySnapshot => {
                console.log('Total Signal Types: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    arr.push(documentSnapshot.data())
                    // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                });
                setNtcs(arr)
            });

    }, []);

    const styles = StyleSheet.create({

        welcome_sub_text: {
            fontSize: 14,
        },

        forgot_password: {
            textAlign: 'right', marginBottom: 20, marginTop: 20,
            fontSize: 12
        }

    })




    return (
        <View style={{ backgroundColor: 'white', paddingTop: 80 }}>
            <Header menu={false} heading={'Notifications '} subtitle={'Getting new updates'} />
            <View style={{ marginLeft: -5, paddingTop: 35 }}>
                <Text style={{ paddingLeft: 20 }}>RECENT</Text>

                {ntcs == null ?
                    null :
                    ntcs.map((nts) =>
                        <View key={nts.id} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, paddingLeft: 18, paddingRight: 15, backgroundColor: '#D9D9D9' }}>
                            <View style={{ paddingRight: 0, paddingTop: 5 }}>
                                <View style={[commanStyles.coinIconView,]}>
                                    <Image key={nts.id} source={{ uri: nts.image }} style={commanStyles.coinIcon} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                                <View style={{ width: '75%' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>{nts.title}</Text>
                                    <Text style={{ fontSize: 12, paddingBottom: 12 }}>{nts.description}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                    <Text style={{ fontSize: 9 }}>Today</Text>
                                    <View style={{ height: 15, borderLeftWidth: 0.7, borderLeftColor: 'grey', marginLeft: 5, marginRight: 5 }}></View>
                                    <Text style={{ fontSize: 9 }}>4.25 AM</Text>
                                </View>
                            </View>
                        </View>

                    )
                }


            </View>


            <Toast
                position='bottom'
                bottomOffset={20}
                config={toastConfig}
            />
        </View>
    )
}