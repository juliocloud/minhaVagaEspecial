import React from 'react';
import { StyleSheet } from 'react-native';

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
     }
})