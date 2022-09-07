import { View, Text , Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
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
  const [plans, setPlans] = useState(null);
  const [futures, setFutures] = useState(null);
  const [count, setCount] = useState(0);

  const refRBSheet = useRef();
  const [expanded, setExpanded] = useState(true);

  const navigation = useNavigation();

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    var arr =[]
    firestore()
    .collection('Futures')
    .orderBy('id', 'asc')
    .get()
    .then(querySnapshot => {
      console.log('Total Signal Types: ', querySnapshot.size);
      setCount(querySnapshot.size)
      querySnapshot.forEach(documentSnapshot => {
        arr.push(documentSnapshot.data())
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setFutures(arr)
    });

    var arr2 =[]
    firestore()
    .collection('FuturePlans')
    .orderBy('id', 'asc')
    .get()
    .then(querySnapshot => {
      console.log('Total Signal Types: ', querySnapshot.size);
  
      querySnapshot.forEach(documentSnapshot => {
        arr2.push(documentSnapshot.data())
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setPlans(arr2)
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
    <Header menu={true} heading={'Futures ('+count+')'} subtitle={'What are the Availabe signals'} />
      {
        futures==null?
        null
        :
        futures.map((future,index)=>
        future.package==0?
          <View key={index}>
                <Collapse>
                  <CollapseHeader>
                    <View style={commanStyles.coinView}>
                      <View style={commanStyles.coinIconView}>
                        <Image source={require('../../assets/images/binance.png')} style={commanStyles.coinIcon}/>
                      </View>
                      <View style={{marginLeft:"5%",width:'85%'}}>
                        <View style={commanStyles.spaceBetweenRow}>
                              <Text style={[commanStyles.coins,{color:context.colors.headingtext}]}>{future.coin}</Text>
                              <Text style={commanStyles.dates}>{moment(new Date(future.time.seconds * 1000)).format("MMM DD | hh:mm:ssA")}</Text>
                        </View>
                        <View style={[commanStyles.spaceBetweenRow,{marginTop:5}]}>
                          <View style={commanStyles.risk}>
                            <Text style={commanStyles.risktext}>{future.risk} Risk</Text>
                          </View>
                          <View style={commanStyles.hold}>
                            <Text style={commanStyles.whiteText}>Hold {future.hold}</Text>
                          </View>
                          <View style={commanStyles.stops}>
                            <Text style={commanStyles.whiteText}>Stop {future.stop}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Current Price </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{future.target1}</Text>
                      <Feather name={'chevron-down'} size={15} color={context.colors.text} />
                    </View>

                  </CollapseHeader>

                  <CollapseBody>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:5}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 1 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{future.target1}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 2 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{future.target2}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 3 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{future.target3}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 4 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{future.target4}</Text>
                    </View>
                    <View style={[commanStyles.spaceBetweenRow,{backgroundColor:context.colors.alphabg,marginTop:3}]}>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>Target 5 </Text>
                      <Text style={[commanStyles.target,{color:context.colors.text}]}>{future.target5}</Text>
                    </View>
                  </CollapseBody>

                </Collapse>
                <View style={[commanStyles.spaceBetweenRow,{marginTop:15}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('ChartView',{url:future.chart})}>
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
                        <Text style={[commanStyles.coins,{color:context.colors.headingtext}]}>{future.coin}</Text>
                        <Text style={commanStyles.dates}>{moment(new Date(future.time.seconds * 1000)).format("MMM DD | hh:mm:ssA")}</Text>
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
                    <ScrollView>
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
                  <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    {plans==null?
                    null:
                      plans.map((plan,index)=>
                        plan.trial==0?
                        <TouchableOpacity onPress={()=>{navigation.navigate('Payment',{plan:plan,pkg:2});refRBSheet.current.close()}} key={index} style={[commanStyles.plancard,{backgroundColor:context.colors.alphabg}]}>
                          <Text style={[context.styles.text,{textAlign:'left',fontSize:12}]}>{plan.title}</Text>
                          <Text style={[context.styles.text,{textAlign:'left'}]}>LKR {plan.price}</Text>
                        </TouchableOpacity>
                        :
                        null
                      )
                    }
                  </View>
                  <Text style={{color:context.colors.text,fontSize:12,textAlign:'center',paddingTop:10}}>By Joining, you agree to our privacy policy and terms and conditions</Text>
                  {plans==null?
                    null:
                      plans.map((plan,index)=>
                        plan.trial==1?
                        <TouchableOpacity onPress={()=>{navigation.navigate('Payment',{plan:plan});refRBSheet.current.close()}} key={index} style={[commanStyles.tralcard,{backgroundColor:'#1B0A30'}]}>
                          <Text style={{textAlign:'left',fontSize:12,color:'#fff'}}>{plan.title}</Text>
                          <Text style={{textAlign:'left',color:'#fff'}}>LKR {plan.price}</Text>
                        </TouchableOpacity>
                        :
                        null
                      )
                    }
                  <Text style={{color:context.colors.text,fontSize:12,textAlign:'center',paddingTop:10}}>Billed Monthly, You can cancel anytime</Text>
                </View>
                {/* <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity style={commanStyles.buttonPrimary} onPress={()=>{refRBSheet.current.close()}}>
                        <View>
                            <Text style={commanStyles.buttonText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>            
                </View> */}
                
                  
            </View>
            </ScrollView>
      </RBSheet>

    </View>
  )
}