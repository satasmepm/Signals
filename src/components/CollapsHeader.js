import React, { useContext, useState , useEffect, useRef } from "react";
import { View, Text,Image, TouchableOpacity , StatusBar, ScrollView , Animated,Easing} from 'react-native'
import commanStyles from "../constants/styles";
import { TradeContext } from "../context/Context"
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';

const CollapsHeader = ({
        heading,
        menu,
        subtitle,
        children,
        image
})=>{
    const navigation = useNavigation();
    const context = useContext(TradeContext);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const heightAnim = useRef(new Animated.Value(1)).current;
    const leftPosition = useRef(new Animated.Value(1)).current;
    const [offset, setOffset] = React.useState(0);

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false 
        }).start();
      };
    
    const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false 
    }).start();
    };

    const headerExpand = () => {
        Animated.timing(heightAnim, {
            toValue: 1,
            duration: offset,
            useNativeDriver: false 
        }).start();
        };

    const headerMinimize = () => {
        Animated.timing(heightAnim, {
            toValue: 0,
            duration: offset,
            useNativeDriver: false 
        }).start();
        };
    // function  onScroll ,
    const onScroll =(event)=> {
        var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > offset ? 'down' : 'up';
        setOffset(currentOffset);
        // fadeOut()
        if (direction=='down'){
            // fadeOut()
            headerMinimize()
            mooveRL()
        }
        else{
            // fadeIn()
            headerExpand()
            mooveLR()
        }
        console.log(direction);
      }
      const mooveLR = ()=>{
        Animated.timing(
          leftPosition,
          {
            toValue: 10,
            duration: 100, // the duration of the animation
            easing: Easing.linear, // the style of animation ,
            useNativeDriver: false 
          }
        ).start() // starts this annimation once this method is called
      }
      
      const mooveRL = ()=>{
        Animated.timing(
         leftPosition,
          {
            toValue: -10,
            duration: 100, // the duration of the animation
            easing: Easing.linear, // the style of animation ,
            useNativeDriver: false 
          }
        ).start() // starts this annimation once this method is called
      }

      const maxHeight = heightAnim.interpolate({ 
        inputRange: [0, 1], 
        outputRange: [60, 120]  // <-- value that larger than your content's height
      });
      
return(
    <Animated.View style={{flex:1,marginTop:0,width:'100%'}}>
    <Animated.View style={{backgroundColor:'red',maxHeight:maxHeight,padding:15}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
        {
                        menu==false?
                        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                            <Feather name={'chevron-left'} size={25}  color={context.colors.text} />
                        </TouchableOpacity>
                        :
                        <View></View>
        }
        {
                        menu?
                        <TouchableOpacity onPress={()=>{navigation.dispatch(DrawerActions.openDrawer())}}>
                            <Feather name={'menu'} size={25} color={context.colors.text} />
                        </TouchableOpacity>
                        :
                        <View></View>
        }
        </View>
        <View style={{flexDirection:'row'}}>
            <Animated.View style={{backgroundColor:'black',borderRadius:0,top:leftPosition}}>
                {
                    image==undefined?
                    <Animated.Image source={require('../../assets/images/profile.png')} style={{width:fadeAnim,height:fadeAnim,borderRadius:50}} />
                    :
                    <Image source={image} />
                }
                
            </Animated.View>
            <Text style={[context.styles.heading,{margin:0,fontSize:20}]}> {heading}</Text>

            <Text style={{textAlign:'left',fontSize:12,color:context.colors.text}}>{subtitle}</Text> 
        </View>
        <View style={{width:25,height:25}}>
        </View>
    </Animated.View>
    <ScrollView 
    onScroll={(event)=>onScroll(event)}
    contentContainerStyle={{paddingTop:0}}
      >
        {children}
    </ScrollView>
    </Animated.View>
)
}

export default CollapsHeader;