export function calculateDistanceOfTwoCoordinates(
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

export function sortParkingSpotsCoordinates(sortedDistances, parkingSpots, currentUserLocation, sortedParkingSpotsCoords){
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