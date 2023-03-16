/*
* TODO:Criar um modo de renderizar apenas X vagas perto do usuário (não é
* necessário renderizar tudo de uma vez)
*/

import React, { useEffect, useState } from 'react';

import { View, Text, ActivityIndicator, ScrollView, Dimensions, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import { styles } from './styles';
import { parkingSpots } from '../../parkingSpots/index.js';
import { MainButton } from '../../components/mainButton';

let sortedParkingSpotsDistancesFromUser;
let sortedParkingSpotsCoords = [];
let defaultMapZoom = 0.00013033 
//Refactor date
export function Map(){
     const [currentUserLocation, setCurrentUserLocation] = useState(0);
     const [alreadyFetchedCurrentUserLocation, setAlreadyFetchedCurrentUserLocation] = useState(false);
     
     function calculateDistanceOfTwoCoordinates(
          latitude1,
          longitude1,
          latitude2,
          longitude2
     ){
          let coordinates = [
               latitude1,
               longitude1,
               latitude2,
               longitude2
          ];

          let radianCoordinates = [], radianCoordinatesSin = [], radianCoordinatesCos = [];
          let partialSum1 = 1, partialSum2 = 1, partialSum3 = 1;

          let partialSumGeneral, arcCosin, resultDistance;

          for(let i = 0; i < 4; i++) {
               radianCoordinates[i] = (coordinates[i] * Math.PI) / 180;
          }

          for(let i = 0; i < 4; i++){
               radianCoordinatesSin[i] = Math.sin(radianCoordinates[i]);
               radianCoordinatesCos[i] = Math.cos(radianCoordinates[i]);
          }

          for(let i = 0; i < 4; i++){ //TODO: Colocar esses for em um só
               partialSum1 = partialSum1 * radianCoordinatesCos[i];
          }

          partialSum2 = radianCoordinatesCos[0] * radianCoordinatesCos[2] * radianCoordinatesSin[1] * radianCoordinatesSin[3];
          partialSum3 = radianCoordinatesSin[0] * radianCoordinatesSin[2];
          partialSumGeneral = partialSum1 + partialSum2 + partialSum3;
          arcCosin = Math.acos(partialSumGeneral);
          resultDistance = arcCosin * 6371 * 1.15; //Constantes

          return resultDistance;
     }

     function sortParkingSpotsCoordinates(sortedDistances){
          /*
          * Nesta funcao ha dois for loops para que possamos comparar
          * a distancia de cada parkingSpot com a distancia ordenada
          * Dessa forma, se a comparacao for verdadeira, adicionamo a 
          * coordenada na lista.
          *
          * Se o segundo parkingSpot, por exemplo, for o mais proximo
          * do usuario, colocamos esse parkingSpot como primeiro na
          * lista de coordenadas ordenadas
          */
          let currentDistanceBetweenUserAndSpot;
          for(let i = 0; i < parkingSpots.length; i++){
               for(let j = 0; j < parkingSpots.length; j++){

                    currentDistanceBetweenUserAndSpot = calculateDistanceOfTwoCoordinates(
                         currentUserLocation.coords.latitude,
                         currentUserLocation.coords.longitude,
                         parkingSpots[j].latitude,
                         parkingSpots[j].longitude
                    ).toFixed(5)

                    if(currentDistanceBetweenUserAndSpot === sortedDistances[i].toFixed(5)){
                         sortedParkingSpotsCoords[i] = parkingSpots[j];
                    }
               }
          }
          
     }


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
          sortParkingSpotsCoordinates(sortedParkingSpotsDistancesFromUser) 
        
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