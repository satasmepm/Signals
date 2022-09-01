import { View, Text , Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState ,useRef } from "react";
import { TradeContext } from '../context/Context';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import toastConfig from "../components/CustomToast";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import moment from 'moment';
import commanStyles from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import CustomButton from '../components/CustomButton';
import RBSheet from "react-native-raw-bottom-sheet";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Spots() {
  const context = useContext(TradeContext);
  const [pack, setPack] = useState(0);
  const [spots, setspots] = useState(null);

  const refRBSheet = useRef();
  const [expanded, setExpanded] = useState(true);

  const navigation = useNavigation();

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    var arr =[]
    firestore()
    .collection('Spots')
    .orderBy('id', 'asc')
    .get()
    .then(querySnapshot => {
      console.log('Total Signal Types: ', querySnapshot.size);
  
      querySnapshot.forEach(documentSnapshot => {
        arr.push(documentSnapshot.data())
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setspots(arr)
    });

  }, []);
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

  return (
    <View style={[context.styles.leftalignedcontainer,{paddingTop:120}]}>
      <Header menu={true} heading={'All Spots ('+'0'+')'} subtitle={'Spot Market'} />
      {
        spots==null?
        null
        :
        spots.map((spot,index)=>
        spot.package==0?
          <View key={index}>
                <Collapse>
                  <CollapseHeader>
                    <View style={commanStyles.coinView}>
                      <View style={commanStyles.coinIconView}>
                        <Image source={require('../../assets/images/binance.png')} style={commanStyles.coinIcon}/>
                      </View>
                      <View style={{marginLeft:"5%",width:'85%'}}>
                        <View style={commanStyles.spaceBetweenRow}>
                              <Text style={[commanStyles.coins,{color:context.colors.headingtext}]}>{spot.coin}</Text>
                              <Text style={commanStyles.dates}>{moment(new Date(spot.time.seconds * 1000)).format("MMM DD | hh:mm:ssA")}</Text>
                        </View>
                        <View style={[commanStyles.spaceBetweenRow,{marginTop:5}]}>
                          <View style={commanStyles.risk}>
                            <Text style={commanStyles.risktext}>{spot.risk} Risk</Text>
                          </View>
                          <View style={commanStyles.hold}>
                            <Text style={commanStyles.whiteText}>Hold {spot.hold}</Text>
                          </View>
                          <View style={commanStyles.stops}>
                            <Text style={commanStyles.whiteText}>Stop {spot.stop}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Current Price </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{spot.target1}</Text>
                      <Feather name={'chevron-down'} size={15} color={context.colors.text} />
                    </View>

                  </CollapseHeader>

                  <CollapseBody>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:5}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 1 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{spot.target1}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 2 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{spot.target2}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 3 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{spot.target3}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 4 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{spot.target4}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 5 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{spot.target5}</Text>
                    </View>
                  </CollapseBody>

                </Collapse>
                <View style={[commanStyles.spaceBetweenRow,{marginTop:15}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChartView',{url:spot.chart})}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <AntDesign name={'linechart'} size={12} color={context.colors.text} />
                        <Text style={[commanStyles.target,{color:context.colors.text}]}> Chart</Text>
                      </View>
                    </TouchableOpacity>
                </View>
                <View style={commanStyles.hr} />
          </View>
          :
          <View key={index}>
              <View style={commanStyles.coinView}>
                <View style={commanStyles.coinIconView}>
                  <Image source={require('../../assets/images/binance.png')} style={commanStyles.coinIcon}/>
                </View>
                <View style={{marginLeft:"5%",width:'85%'}}>
                  <View style={commanStyles.spaceBetweenRow}>
                        <Text style={[commanStyles.coins,{color:context.colors.headingtext}]}>{spot.coin}</Text>
                        <Text style={commanStyles.dates}>{moment(new Date(spot.time.seconds * 1000)).format("MMM DD | hh:mm:ssA")}</Text>
                  </View>
                  <View style={[commanStyles.spaceBetweenRow,{marginTop:5}]}>
                  <TouchableOpacity onPress={()=>{refRBSheet.current.open()}} style={[commanStyles.buttonPrimary,{paddingVertical:2}]}>
                    <View>
                    <Text style={[commanStyles.buttonText,{fontSize:11}]}>Join with Premium</Text>
                    </View>
                </TouchableOpacity>
                  </View>
                </View>
              </View>

          <View style={commanStyles.hr} />
    </View>
        )
      }

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
            <View style={style.modal}>
                <View>
                  <Text style={context.styles.heading}>Gain Profit</Text>
                  <Text style={{color:context.colors.text,fontSize:12}}>Unlock all signals </Text>
                </View>
                <View style={{alignItems:'center',justifyContent:'flex-start',marginTop:15}}>
                  <FontAwesome name={'diamond'} size={35} color={'#FFCC68'} />
                  <Text style={[context.styles.heading,{fontSize:30,fontWeight:'bold'}]}>Get <Text style={{color:'#FFCC68'}}>Premium</Text></Text>
                  <Text style={{color:context.colors.text,fontSize:12,textAlign:'center'}}>You can get more signals by getting our premium Subscriptions. You can select your best plan under below and can try 3 days free trail version also </Text>
                  <Text style={[context.styles.heading,{fontSize:22,fontWeight:'500',margin:10}]}>Choose your plan</Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity style={commanStyles.buttonPrimary} onPress={()=>{refRBSheet.current.close()}}>
                        <View>
                            <Text style={commanStyles.buttonText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>            
                </View>
            </View>
      </RBSheet>

    </View>
  )
}