import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const dimensions = {
     screenWidth: Dimensions.get('screen').width,
     screenHeight: Dimensions.get('screen').height,
}

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
     modalView:{
          width: '80%', 
          height: '45%', 
          borderRadius: 25, 
          backgroundColor: 'white',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          borderColor: 'black',
          borderWidth: 3
     },
     modalViewText:{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 12,
          fontSize: 18,
          textAlign: 'center'
     },
     modalViewTextVariant: {
          marginLeft: 'auto',
          marginRight: 'auto',
          fontWeight: 'bold',
          fontSize: 23
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
          maxHeight: '32%'
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
          alignContent: 'center',
          
     },
     rowContainer: {
          flexDirection: "column",
          marginLeft: 20,
          marginTop: 10
     },
     spotTitle: {
          fontSize: 25,
          fontWeight: 'bold'
     },
     infoRowContainer: {
          flexDirection: 'column'
     },
     infoRowTitle: {
          fontSize: 20,
          fontWeight: 'bold'
     },
     infoRowText: {
          fontSize: 20
     },
     spotButton: {
          alignItems: 'center',
          marginTop: 'auto',
          marginBottom: 'auto'

     }
})