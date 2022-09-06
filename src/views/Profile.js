import { View, Text , Image, TouchableOpacity,StyleSheet} from 'react-native'
import React, { useContext, useEffect, useState , useRef } from "react";
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

import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'react-native-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";


export default function Profile() {

    const context = useContext(TradeContext);
    const refRBSheet = useRef();

    const style = StyleSheet.create({
        container:{
            backgroundColor:context.colors.primary
        },
        text:{
            color:context.colors.text,
        },
        modal:{
            backgroundColor:context.colors.primary,
            margin:20,
            // backgroundColor:'red',
            justifyContent:'space-between'
        }
      })

    const onCaptureButtonPress = React.useCallback(() => {
        const options =
          {
            title: 'Take Image',
            type: 'capture',
            options: {
              saveToPhotos: true,
              mediaType: 'photo',
              includeBase64: false,
              includeExtra:true,
            },
          }
          ImagePicker.launchCamera(options, setResponse);
          console.log(response.assets[0])
      }, []);
    
      const onUploadButtonPress = React.useCallback(() => {
        const options =
        {
          title: 'Select Image',
          type: 'library',
          options: {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra:true,
          },
        }
    
          ImagePicker.launchImageLibrary(options, setResponse);
        
      }, []);
      
      const uploadImage = async () =>{
        var suffix = Date.now();
        var preffix = context.user
        if(response!=null){
        var filetype = response.assets[0]['type'].split('/')[1]
        const reference = storage().ref(preffix+suffix+'.'+filetype);
          console.log(preffix+suffix+'.'+filetype)
            // path to existing file on filesystem
            const pathToFile = response.assets[0]['uri'];
            // uploads file
            await reference.putFile(pathToFile);
            Toast.show({
              type: 'default',
              text1: "Done!",
              props: { err:false ,colors:context.colors}
            });
        }
      }

  return (
    <View style={context.styles.container}>
        <Header menu={true} heading={'Profile'} subtitle={''} />
        <CustomButton title={'Pay for Package'} onPress={()=>refRBSheet.current.open()}/>
        <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    closeOnPressBack={true}
                    height={windowHeight-70}
                    customStyles={{
                      wrapper: {
                        backgroundColor: context.colors.alphabg
                      },
                      draggableIcon: {
                        backgroundColor: context.colors.text
                      },
                      container:{
                        backgroundColor:context.colors.primary,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15
                      }
                    }}
                  >
                    <ScrollView>
            <View style={style.modal}>
            <View style={{width:'95%'}}>

            <Text style={context.styles.text}>Pay via Wallet or Bank and Upload the Reciept here</Text>

            <View style={[commanStyles.spaceBetweenRow,{height:50,width:'100%'}]}>
                {/* <CustomButton title={'Capture '} onPress={()=>{onCaptureButtonPress()}}/> */}
                <Animatable.View animation={'fadeIn'} style={{alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{onCaptureButtonPress()}} style={commanStyles.buttonPrimary}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name={'camera'} size={15} color="#fff" />
                    <Text style={commanStyles.buttonText}> Capture</Text>
                    </View>
                </TouchableOpacity>         
                </Animatable.View>

                <Animatable.View animation={'fadeIn'} style={{alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{onUploadButtonPress()}} style={commanStyles.buttonPrimary}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name={'image'} size={15} color="#fff" />
                    <Text style={commanStyles.buttonText}> Select from Gallery</Text>
                    </View>
                </TouchableOpacity>         
                </Animatable.View>

                {/* <CustomButton title={'Select'} onPress={()=>{onUploadButtonPress()}}/> */}
            </View>  
            <View style={{backgroundColor:context.colors.alphabg,borderRadius:10,padding:10,alignItems:'center'}}>


            {
                response==null?
                <Animatable.View animation={'flash'} iterationCount="infinite" duration={5000}>
                    <MaterialCommunityIcons name={'receipt'} size={70} color="#D18A00" />
                </Animatable.View>   
                :    
                <Image source={{uri:response.assets[0]['uri']}} style={{width:70,height:70,resizeMode:'contain'}}/>     
            }
            <View style={{marginTop:10}}>
                {/* <CustomButton title={'Upload'} onPress={()=>{onUploadButtonPress()}}/>  */}
                <Animatable.View animation={'fadeIn'} style={{alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{uploadImage()}} style={commanStyles.buttonPrimary}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Feather name={'upload-cloud'} size={15} color="#fff" />
                    <Text style={commanStyles.buttonText}>  Upload</Text>
                    </View>
                </TouchableOpacity>         
                </Animatable.View>

            </View>

            </View>
            </View>
            </View>
            </ScrollView>
      </RBSheet>

    </View>
  )
}