
import Geolocation from '@react-native-community/geolocation';

function distanceTwoPoints(lat1, lon1, unit,callback) {
    var lat2, lon2;


    Geolocation.getCurrentPosition(info => {


        lat2 = info.coords.latitude;

        lon2 = info.coords.longitude;
       

        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        callback(dist);
    });


}

export default distanceTwoPoints;
