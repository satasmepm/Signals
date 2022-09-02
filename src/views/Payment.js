import { View, Text,StyleSheet, TouchableOpacity , StatusBar, Modal , Image} from 'react-native'
import React, { useContext, useRef, useState, useEffect  } from "react";
import { TradeContext } from '../context/Context';
import commanStyles from '../constants/styles';
import List from '../components/List';
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Clipboard from '@react-native-clipboard/clipboard';
import toastConfig from "../components/CustomToast";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'react-native-image-picker';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

import { useNavigation } from '@react-navigation/native';

export default function Payment() {

    const route = useRoute();
    const context = useContext(TradeContext);
    const refRBSheet = useRef();
    const [theme, setTheme] = useState("Light");
    const [iconname, setIconName] = useState("sun");
    const [modalVisible, setModalVisible] = useState(true);
    const [wallets, setWallets] = useState(null);
    const [response, setResponse] = React.useState(null);

    const navigation = useNavigation();

    const copyToClipboard = (address) => {
        Clipboard.setString(address);
        Toast.show({
            type: 'default',
            text1: "address Copied!",
            props: { err:false ,colors:context.colors}
          });

      };

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
            height:"75%",
            justifyContent:'space-between'
        }
    })
    
  useEffect(() => {
    var arr =[]
    firestore()
    .collection('Wallets')
    .orderBy('id', 'asc')
    .get()
    .then(querySnapshot => {
      console.log('Total wallets: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        arr.push(documentSnapshot.data())
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setWallets(arr)
    });

  }, []);

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

  const updatePlan =()=>{
    firestore()
    .collection('Users')
    .doc(context.user)
    .update({
      plan: route.params.plan.id,
    })
    .then(() => {
      console.log('User updated!');
    });
    navigation.goBack()
  }

  return (
    <View style={[context.styles.leftalignedcontainer,{paddingTop:120}]}>

      <StatusBar backgroundColor={context.colors.primary} barStyle={theme=="Dark"?"light-content":"dark-content"}/>
      <Header menu={false} heading={route.params.plan.title} />
      
        {/* <Text style={context.styles.smallHeading}>{route.params.plan.id}</Text> */}
      {wallets==null?
        null
        :
        wallets.map((wallet,index)=>
        <List 
          key={index}
          heading={wallet.name}
          content={
            <TouchableOpacity onPress={()=>{copyToClipboard(wallet.address)}} style={{backgroundColor:context.colors.alphabg,paddingHorizontal:5,borderRadius:7}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Feather name={iconname} size={20} color="#D18A00" />
                  <Text style={[context.styles.text,{fontSize:13}]}>  {wallet.address}</Text>
                </View>
            </TouchableOpacity>
          }
        />
        )
      } 
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

        <Text style={context.styles.text}>Or</Text>
        <CustomButton title={'Upload reciept Later'} onPress={()=>{updatePlan()}}/>
      </View>

      <Toast
        position='bottom'
        bottomOffset={20}
        config={toastConfig}
      />
    </View>
  )
}