import { View, Text , Image, TouchableOpacity,StyleSheet,Dimensions,ScrollView,Animated} from 'react-native'
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
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StickyParallaxHeader from 'react-native-sticky-parallax-header'; 

import CustomButton from '../components/CustomButton';

import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'react-native-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import CollapsHeader from '../components/CollapsHeader';
import { useNavigation , DrawerActions } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Profile() {

    const context = useContext(TradeContext);
    const refRBSheet = useRef();
    const headerRef = useRef();
    const [response, setResponse] = React.useState(null);
    const [plan, setPlan] = useState(null);
    const [user, setUser] = useState(null);
    const [spot, setSpot] = useState(null);
    const [future, setFuture] = useState(null);

    const scroll = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

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
      const renderForeground = () => {

        const titleOpacity = scroll.interpolate({
          inputRange: [0, 106, 154],
          outputRange: [1, 1, 0],
          extrapolate: 'clamp'
        })
    
        return (
          <View style={{paddingLeft:0}}>
              {/* <Text>{'\n'}</Text> */}
            <Animated.View style={{ opacity: titleOpacity ,alignItems:'center',backgroundColor:context.colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,width: '100%',}}>
                
                <Image source={require('../../assets/images/profile.png')} style={{width:60,height: 60,borderRadius:50,marginTop:2.5,zIndex:5}} />
                <View style={{borderRadius:50,width:65,height:65,position: 'absolute',top:0,backgroundColor:context.colors.alphabg}} />
              {/* <View> */}
              <Text style={{fontSize:17,color:context.colors.text,marginTop:5}}>{context.user}</Text>

            </Animated.View>
          </View>
        )
      }

      const renderHeader = () => {
        const opacity = scroll.interpolate({
          inputRange: [0, 100, 160],
          outputRange: [0,0, 1],
          extrapolate: 'clamp'
        })
    
        return (
          <View style={{backgroundColor:context.colors.primary}}>
            <Animated.View style={{ opacity ,flexDirection:'row',alignItems:'center',padding:10,justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignContent:'center'}}> 
              <Image source={require('../../assets/images/profile.png')} style={{width:25,height: 25,borderRadius:50,marginLeft:10,}} />
                <Text style={{paddingLeft:10,fontSize:17,backgroundColor:context.colors.primary,color:context.colors.text}}>{context.user}</Text>
              </View>    
              <TouchableOpacity onPress={()=>{navigation.dispatch(DrawerActions.openDrawer())}}>
                <Feather name={'menu'} size={25} color={context.colors.text} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        )
      }


      useEffect(() => {
        var arr =[]
        var arr2 =[]
        firestore()
        .collection('Users')
        .doc(context.user)
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);

          if(documentSnapshot.exists){
            var data= documentSnapshot.data()
            setUser(documentSnapshot.data())
            if(data.package==1)   {
              firestore()
                .collection('Plans')
                // Filter results
                .where('id', '==', data.spotPlan)
                .get()
                .then(querySnapshot => {
                  /* ... */
                  querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arr.push(documentSnapshot.data())
                  });
                  setSpot(arr)
                  // console.log(querySnapshot.data())
                });
            }  
            
            if(data.package==2)   {
              firestore()
                .collection('FuturePlans')
                // Filter results
                .where('id', '==', data.futurePlan)
                .get()
                .then(querySnapshot => {
                  /* ... */
                  querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arr2.push(documentSnapshot.data())
                  });
                  setFuture(arr2)
                  // console.log(querySnapshot.data())
                });
            }
            if(data.package==3)   {
              firestore()
                .collection('FuturePlans')
                // Filter results
                .where('id', '==', data.futurePlan)
                .get()
                .then(querySnapshot => {
                  /* ... */
                  querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arr2.push(documentSnapshot.data())
                  });
                  setFuture(arr2)
                  // console.log(querySnapshot.data())
                });

                firestore()
                .collection('Plans')
                // Filter results
                .where('id', '==', data.spotPlan)
                .get()
                .then(querySnapshot => {
                  /* ... */
                  querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    arr.push(documentSnapshot.data())
                  });
                  setSpot(arr)
                  // console.log(querySnapshot.data())
                });
            }
            
            
          }
        });
      }, []);


  return (
    <View style={[context.styles.container,{paddingTop:0}]}>
              <TouchableOpacity onPress={()=>{navigation.dispatch(DrawerActions.openDrawer())}} style={{position:'absolute',right:10,top:10,zIndex:9}}>
                <Feather name={'menu'} size={25} color={context.colors.text} />
              </TouchableOpacity>
      
      <StickyParallaxHeader
        backgroundColor={'transparent'}
        bounces={true}
        foreground={renderForeground()}
        header={renderHeader()}
        parallaxHeight={10}
        image={null}
        headerHeight={50}
        headerSize={() => {}}
        onEndReached={() => {}}
        scrollEvent={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }])}
        leftTopIcon={require('../../assets/images/profile.png')}
        leftTopIconOnPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}
        // image={image}
        rightTopIcon={null}
      >
            <View style={{marginTop:80,padding:10}}>
              {
                user==null?
                null
                :
                user.package==1?
                spot==null?
                      null
                      :
              <View style={{width:'100%',backgroundColor:context.colors.alphabg}}>
                  <Text>{spot[0].price}</Text>
                  <Text>ttt</Text>
                  <Text>ttt</Text>
              </View>
              :
              user.package==2?
              future==null?
                      null
                      :
              <View style={{width:'100%',backgroundColor:context.colors.alphabg}}>
                  <Text>{future[0].price}</Text>
                  <Text>ttt</Text>
                  <Text>ttt</Text>
              </View>
              :
              user.package==3?
              <View style={{width:'100%'}}>
                  {
                    spot==null?
                      null
                      :
                    <Animatable.View animation={'flipInY'} style={[commanStyles.profilecard,{backgroundColor:context.colors.card}]}>
                      <Text style={{color:context.colors.text,fontSize:18}}>Spot Plan</Text>
                      <Text style={{color:context.colors.text}}>{spot[0].title}</Text>
                    </Animatable.View>         
                  }

                  {
                    future==null?
                    null
                    :
                    <Animatable.View animation={'flipInY'} style={[commanStyles.profilecard,{backgroundColor:context.colors.card}]}>
                      <Text style={{color:context.colors.text,fontSize:18}}>Future Plan</Text>
                      <Text style={{color:context.colors.text}}>{future[0].title}</Text>
                    </Animatable.View>
                  }

                  {/* <Text>ttt</Text> */}
              </View> 
              :
              null             
              }
            </View>

      </StickyParallaxHeader>


        {/* <CollapsHeader menu={true} heading={'User Profile'} subtitle={''} >
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
          <Text>ggg</Text>
        </CollapsHeader> */}
        <CustomButton title={'Pay for Package'} onPress={()=>refRBSheet.current.open()}/>
        <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    closeOnPressBack={true}
                    height={windowHeight/2}
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