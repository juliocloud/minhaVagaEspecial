import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

import { StatusBar } from 'expo-status-bar';

import { styles } from './styles';

export function Map(){
     const [currentUserLocation, setCurrentUserLocation] = useState(0);
     const [alreadyFetchedCurrentUserLocation, setAlreadyFetchedCurrentUserLocation] = useState(false);
     
     useEffect(() => {
          (
               async () => {
                    let userLocationRequestStatus = await Location.requestForegroundPermissionsAsync(); //TODO: Usar status para renderizar o mapa condicionalmente 
                    let userLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
                    setCurrentUserLocation(userLocation);
                    setAlreadyFetchedCurrentUserLocation(true);
               }
          )()
     }, [])

     if(!alreadyFetchedCurrentUserLocation){
          return(
               <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator 
                         size={'large'} 
                         color={'#1e81b0'}
                    />
               </View>
          )
     }else{
          return(
               <View style={styles.container}>
                    <StatusBar hidden={true}/>
                    <MapView 
                         style={styles.map}
                         initialRegion={{
                              latitude: currentUserLocation.coords.latitude,
                              longitude: currentUserLocation.coords.longitude,
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
}