import React, { useContext, useEffect, useState  } from "react";
import { View, Text ,TouchableOpacity} from 'react-native'
import { TradeContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import commanStyles from '../constants/styles';
import TextBox from '../components/TextBox';
import TitleImage from '../components/TitleImage';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import CustomButton from "../components/CustomButton";
import firestore from '@react-native-firebase/firestore';
import toastConfig from "../components/CustomToast";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Package() {

    const navigation = useNavigation();
    const context = useContext(TradeContext);

    const [pack, setPack] = useState(0);
    const [pkgs, setPkgs] = useState(null);

    useEffect(() => {
      var arr =[]
      firestore()
      .collection('SignalType')
      .orderBy('id', 'asc')
      .get()
      .then(querySnapshot => {
        console.log('Total Signal Types: ', querySnapshot.size);
    
        querySnapshot.forEach(documentSnapshot => {
          arr.push(documentSnapshot.data())
          // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
        setPkgs(arr)
      });

    }, []);

    const updateuser = () =>{
      firestore()
        .collection('Users')
        .doc(context.user)
        .update({signalType:pack})
        .then(() => {
          Toast.show({
            type: 'default',
            text1: 'Done!',
            props: { err:false ,colors:context.colors}
          });  
          context.setPack(pack) 
          storePack(pack.toString())
          setTimeout(() => {
            navigation.navigate('Welcome')
            }, 2000);      
        });
    }

    const storePack = async (value) => {
      try {
        await AsyncStorage.setItem('pack', value)
      } catch (e) {
        // saving error
      }
    }
  return (
    <View style={context.styles.container}>
      <Header menu={false} heading={'Select Package'} subtitle={'Select a new Package to continue'} />
      <TitleImage icon={<Feather name={'briefcase'} size={25} color={context.colors.text} />}/>
      {pkgs==null?
      null:
        pkgs.map((pkg)=>
        <TouchableOpacity onPress={()=>setPack(pkg.id)} key={pkg.id} style={[commanStyles.card,{backgroundColor:pack==pkg.id?'#E1C45C':context.colors.card}]}>
          <Text style={context.styles.text}>{pkg.title}</Text>
          <Text style={[context.styles.text,{fontSize:17}]}>{pkg.price}</Text>
        </TouchableOpacity>
        )
      }
      <CustomButton title={'Continue'} onPress={()=>updateuser()} />    
      <Toast
        position='bottom'
        bottomOffset={20}
        config={toastConfig}
      />
    </View>
  )
}