import React, { useState, useContext } from 'react'
import {Image, Dimensions, StyleSheet, TouchableOpacity,Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TradeContext } from "../context/Context"
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Popover, PopoverController } from 'react-native-modal-popover';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Validation =({ text })=>{
    const context = useContext(TradeContext);
    return(
        <PopoverController>
        {({
          openPopover,
          closePopover,
          popoverVisible,
          setPopoverAnchor,
          popoverAnchorRect,
        }) => (
          <React.Fragment>
            <TouchableOpacity
            ref={setPopoverAnchor}
            onPress={openPopover}
            >
                <Icon
                    name="error"
                    size={22}
                    color={'red'}
                    style={{marginLeft:-10}}
                />
            </TouchableOpacity>
            <Popover
              contentStyle={[styles.content,{backgroundColor:context.colors.primary,elevation:8}]}
              arrowStyle={styles.arrow}
              backgroundStyle={styles.background}
              visible={popoverVisible}
              onClose={closePopover}
              fromRect={popoverAnchorRect}
              supportedOrientations={['portrait', 'landscape']}
              placement={'bottom'}
              >
              <Text style={{color:context.colors.text}}>{text}</Text>
            </Popover>
          </React.Fragment>
        )}
      </PopoverController> 
    )
}
const styles = StyleSheet.create({
    ////////////////// manoj
    content: {
      padding: 5,
      paddingHorizontal:10,
      borderRadius: 5,
      borderTopWidth:3,
      borderColor:'rgba(255,0,0,0.9)'
    },
    arrow: {
      borderTopColor: 'rgba(255,0,0,0.9)',
    },
    background: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },

  });

export {Validation};