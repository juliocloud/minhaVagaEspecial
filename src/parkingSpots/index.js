export const parkingSpots = [
     new ParkingSpot(
          "Hillview Ave, Palo Alto",
          "United States of America",
          "Tesla HQ",
          37.40888176441965, 
          -122.14196713654653
     ),
     new ParkingSpot(
          "MiddleField RD, Palo Alto",
          "United States of America",
          "Cubberley Community Center",
          37.41716691769262, 
          -122.10841353229993
     ),
     new ParkingSpot(
          "Palo Alto",
          "United States of America",
          "Hnery M Gunn High School",
          37.40256691769262, 
          -122.13340353229993
     ) ,
     new ParkingSpot(
          "Palo Alto",
          "United States of America",
          "Google HQ",
          37.4219983,
          -122.084
     )
]

export function ParkingSpot(
     addressOne,
     addressTwo,
     institutionName,
     latitude,
     longitude
){
     this.addressOne = addressOne;
     this.addressTwo = addressTwo;
     this.institutionName = institutionName;
     this.latitude = latitude;
     this.longitude = longitude;
}