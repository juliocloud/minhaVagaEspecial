import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const dimensions = {
     screenWidth: Dimensions.get('screen').width,
     screenHeight: Dimensions.get('screen').height,
}
console.log("Height " + dimensions.screenHeight)
console.log("Width " + dimensions.screenWidth)

export const styles = StyleSheet.create({
     activityIndicatorContainer: {
          flex: 1,
          justifyContent: 'center',
     },
     container: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
     },
     map: {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
     },
     spotContainer: {
          width: '100%',
          maxHeight: '30%'
     },
     spot: {
          width: dimensions.screenWidth/1.2,
          maxHeight: '100%',
          backgroundColor: '#FFF',
          marginHorizontal: (dimensions.screenWidth - dimensions.screenWidth/1.2)/2 ,
          borderTopStartRadius: 35,
          borderTopEndRadius: 35,
          borderColor: 'black',
          borderWidth: 1,
          borderBottomStartRadius:0,
          borderBottomEndRadius: 0,
          alignContent: 'center'
          
     }
})