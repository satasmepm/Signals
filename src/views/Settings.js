import { View, Text,StyleSheet, TouchableOpacity , StatusBar, Modal } from 'react-native'
import React, { useContext, useRef, useState  } from "react";
import { TradeContext } from '../context/Context';
import commanStyles from '../constants/styles';
import List from '../components/List';
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';

export default function Settings() {
    const context = useContext(TradeContext);
    const refRBSheet = useRef();
    const [theme, setTheme] = useState("Light");
    const [iconname, setIconName] = useState("sun");
    const [modalVisible, setModalVisible] = useState(true);

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

    const toggleTheme=(theme)=>{

        // context.setTheme(theme)
        context.changeTheme(theme)
        if(theme=='light'){
            setIconName('sun')
            setTheme('Light')
        }
        else if(theme=='dark'){
            setIconName('moon')
            setTheme('Dark')            
        }
        else{
            setIconName('settings')
            setTheme('System')               
        }
        refRBSheet.current.close()
    }
  return (
    <View style={context.styles.leftalignedcontainer}>
        <StatusBar backgroundColor={context.colors.primary} barStyle={theme=="Dark"?"light-content":"dark-content"}/>
        
        <Text style={context.styles.smallHeading}>Settings</Text>
         
        <List 
            heading={"THEME"}
            content={
                <TouchableOpacity onPress={()=>{refRBSheet.current.open()}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Feather name={iconname} size={25} color="#D18A00" />
                    <Text style={context.styles.text}>  {theme}</Text>
                </View>
            </TouchableOpacity>
            }
        /> 
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: context.colors.alphabg
          },
          draggableIcon: {
            backgroundColor: context.colors.text
          },
          container:{
            backgroundColor:context.colors.primary,
            borderTopLeftRadius:50,
            borderTopRightRadius:50
          }
        }}
      >
            <View style={style.modal}>
                <View>
                <TouchableOpacity  onPress={()=>{toggleTheme('light')}}>
                    <View style={commanStyles.row}>
                        <Feather name={'sun'} size={25} color="#D18A00" />
                        <Text style={context.styles.text}>  Light</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>{toggleTheme('dark')}}>
                <View style={commanStyles.row}>
                        <Feather name={'moon'} size={25} color="#D18A00" />
                        <Text style={context.styles.text}>  Dark</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>{toggleTheme('System')}}>
                <View style={commanStyles.row}>
                        <Feather name={'settings'} size={25} color="#D18A00" />
                        <Text style={context.styles.text}>  System</Text>
                    </View>
                </TouchableOpacity>
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