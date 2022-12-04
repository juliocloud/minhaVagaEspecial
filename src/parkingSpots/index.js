export const parkingSpots = [
     new ParkingSpot(
          "Hillview Ave, Palo Alto",
          "United States of America",
          "Tesla HQ",
          37.40888176441965, 
          -122.14196713654653
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