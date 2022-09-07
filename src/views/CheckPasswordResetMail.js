import React, { useContext, useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import { TradeContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import CustomButton from "../components/CustomButton";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import toastConfig from '../components/CustomToast';
import { openInbox } from "react-native-email-link";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CheckForgotPassword() {

    const [WINDOW_HEIGHT, setHeight] = useState('');
    const [WINDOW_WIDTH, setWidth] = useState('');

    const navigation = useNavigation();
    const context = useContext(TradeContext);
    useEffect(() => {
        //Get device Height
        setHeight(Dimensions.get('window').height);
        //Get device Width
        setWidth(Dimensions.get('window').width);
    }, []);

    const styles = StyleSheet.create({

        welcome_text: {
            fontSize: 20, fontWeight: 'bold', color: 'black', paddingTop: 10,
        },
        welcome_sub_text: {
            fontSize: 12,
        },

        forgot_password: {
            textAlign: 'right', marginBottom: 20, marginTop: 20,
            fontSize: 12
        }

    })

    const forgotPassword = () => {
        openInbox();
    }
    const sendResetEmail = async () => {
        const email = await AsyncStorage.getItem('user_email');

        auth().sendPasswordResetEmail(email)
            .then(() => {
                Toast.show({
                    type: 'default',
                    text1: 'Email is sent',
                    props: { err: false, colors: context.colors }
                });
                // navigation.navigate('MyDrawer')

            }).catch(function (e) {
                Toast.show({
                    type: 'default',
                    text1: 'Something went wrong',
                    props: { err: true, colors: context.colors }
                });
            })
    }
   
    return (
        <View style={context.styles.container}>
            <Header heading={'Forgot Password'} subtitle={'Reset new password'} />
            <TitleImage icon={<Feather name={'briefcase'} size={25} color={context.colors.text} />} />
            <View style={{ alignItems: 'center', marginBottom: 15, padding: 20 }}>
                <Text style={styles.welcome_text}>Check your email </Text>
                <Text style={styles.welcome_sub_text}>We have sent password recovery instruction</Text>
                <Text style={styles.welcome_sub_text}>and password to your email.</Text>
            </View>

            <CustomButton title={'Go to email'} onPress={() => forgotPassword()} />
            <Text style={{ fontSize: 14, color: 'grey', marginTop: 35 }} onPress={() => {  navigation.navigate('Login')}}>SKIP</Text>
            <Text style={{ fontSize: 12, color: 'black', marginTop: 35 }} onPress={() => { }}>Didn’t receive the email? check your spam folder</Text>
            <Text style={context.styles.text}>Or</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }} onPress={() => { sendResetEmail(); }}>Try re-send email</Text>
            <Toast
                position='bottom'
                bottomOffset={20}
                config={toastConfig}
            />
            <Toast
                position='bottom'
                bottomOffset={20}
                config={toastConfig}
            />
        </View>

    )
}