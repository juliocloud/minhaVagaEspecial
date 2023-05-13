//TODO: Create a way to render only n spots close to the user 
import React, { useEffect, useState } from 'react';

import { View, Text, ActivityIndicator, ScrollView, Dimensions, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import { styles } from './styles';
import { parkingSpots } from '../../parkingSpots/index.js';
import { MainButton } from '../../components/mainButton';

import { calculateDistanceOfTwoCoordinates, sortParkingSpotsCoordinates } from '../../utils/coordinateUtils'

let sortedParkingSpotsDistancesFromUser;
let sortedParkingSpotsCoords = [];
let defaultMapZoom = 0.00013033 

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
          
          let numberOfParkingSpots = parkingSpots.length;
          let parkingSpotsDistancesFromUser = [];
          let currentDistance;

          for (let i = 0; i < numberOfParkingSpots; i++) {
               currentDistance = calculateDistanceOfTwoCoordinates(
                    currentUserLocation.coords.latitude,
                    currentUserLocation.coords.longitude,
                    parkingSpots[i].latitude,
                    parkingSpots[i].longitude,
               )
               parkingSpotsDistancesFromUser[i] = currentDistance;

               sortedParkingSpotsDistancesFromUser = parkingSpotsDistancesFromUser.sort(function(a,b){
                    return a - b;
               });
          }

          //Esta funcao ordena os parkingSpots a partir das distancias ordenadas
          sortParkingSpotsCoordinates(sortedParkingSpotsDistancesFromUser, parkingSpots, currentUserLocation, sortedParkingSpotsCoords) 
        
          //TODO: Criar uma condicional para renderizar o mapa apenas quando as coordeneadas estiverem ordenadas

          return(
               <View style={styles.container}>
                    <Modal 
                         visible={false}
                         animationType="fade"
                    >
                              <View style={styles.modalView}>
                                   <Text style={styles.modalViewText}>
                                        Você deseja realmente validar a vaga
                                   </Text>
                                   <Text style={styles.modalViewTextVariant}>
                                        { parkingSpots[0].addressOne } ?
                                   </Text>
                              </View>
                    </Modal>
                    <StatusBar hidden={true}/>
                    <MapView 
                         ref={map => this.mapView = map}
                         style={styles.map}
                         initialRegion={{
                              latitude: currentUserLocation.coords.latitude,
                              longitude: currentUserLocation.coords.longitude,
                              latitudeDelta: defaultMapZoom,
                              longitudeDelta: defaultMapZoom
                         }}
                         showsPointsOfInterest={false}
                         showsUserLocation={true}
                    >
                         {
                              parkingSpots.map(spot => {
                                   return (
                                        <Marker 
                                             key={parkingSpots.indexOf(spot)}
                                             ref={mark => this.mark = mark}
                                             title={spot.addressOne}
                                             coordinate={{
                                                  latitude: spot.latitude,
                                                  longitude: spot.longitude
                                             }}
                                        />
                                   )
                              })
                         }
                    </MapView>

                    <ScrollView
                         style={styles.spotContainer}
                         horizontal
                         pagingEnabled
                         onMomentumScrollEnd={
                              e => {
                                   const scrolled = e.nativeEvent.contentOffset.x;
                                   
                                   let spot = (scrolled > 0)
                                        ? scrolled / Dimensions.get('window').width
                                        : 0;
                                   /*
                                   * Aqui precisamos arredondar o valor porque o scrolled
                                   * irá nos retornar um valor em decimal (0.9999). 
                                   * 
                                   * Porém precisamos de valores inteiros para acessar um valor
                                   * específico da array sortedParkingSpotsCoords
                                   */
                                   spot = Math.round(spot)
                                   const { latitude, longitude } = sortedParkingSpotsCoords[spot]

                                   /*
                                   * animateToCoordinate está em situação deprecated.
                                   * Estou utilizando animateToRegion
                                   */

                                   this.mapView.animateToRegion({
                                        latitude: latitude,
                                        longitude: longitude,
                                        latitudeDelta: defaultMapZoom,
                                        longitudeDelta: defaultMapZoom
                                   }, 1700)
                              }
                         }
                    >
                    {
                         (
                              sortedParkingSpotsDistancesFromUser.map((i) => {
                                   let currentIndex = sortedParkingSpotsDistancesFromUser.indexOf(i);

                                   return(
                                        <View style={styles.spot}>
                                             <View style={styles.rowContainer}>
                                                  <Text style={styles.spotTitle}> 
                                                       Vaga {
                                                            currentIndex + 1 
                                                       }
                                                  </Text>
                                                  <View style={styles.infoRowContainer}>
                                                       <Text style={styles.infoRowTitle}>
                                                            Endereço:  
                                                       </Text>
                                                       <Text style={styles.infoRowText}>
                                                            {
                                                                 parkingSpots[currentIndex].addressOne
                                                            }, 
                                                            {
                                                                 parkingSpots[currentIndex].addressTwo
                                                            }
                                                       </Text>
                                                      
                                                       <Text style={styles.infoRowTitle}>
                                                            Instituição:
                                                       </Text>
                                                       <Text style={styles.infoRowText}>
                                                            {
                                                                 parkingSpots[currentIndex].institutionName
                                                            }
                                                       </Text>
                                                  </View>
                                             </View>
                                             <View style={styles.spotButton}>
                                                  <MainButton title={'Validar'}/>
                                             </View>
                                        </View>)
                              })
                         )
                    }
                    </ScrollView>
               </View>
          )
     }
}