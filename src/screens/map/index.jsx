import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import { StatusBar } from 'expo-status-bar';

import { styles } from './styles';

export function Map(){
     return(
          <View style={styles.container}>
               <StatusBar hidden={true}/>
               <MapView 
                    style={styles.map}
                    initialRegion={{
                         latitude: 10,
                         longitude: 10,
                         latitudeDelta: 0.00013033,
                         longitudeDelta: 0.00013033
                    }}
                    showsPointsOfInterest={false}
                    showsUserLocation={true}
               >

               </MapView>
          </View>
     )
}