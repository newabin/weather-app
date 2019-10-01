const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicHJhdmluZXdhIiwiYSI6ImNqem1sZjZpdDBhbmEzZ29mMzJhNDBxYW8ifQ.NYNvE6G9j_ond3pn7jGMag&limit=1'

    request({url, json : true}, (error, {body}={})=>{
            if(error){
                callback('Unable to connect to location services')
            }else if(body.features.length === 0){
                callback('unable to find location. Try another search')
            }else{
                callback(undefined, {
                    latitude : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    location : body.features[0].place_name
                })    
            }

    })
}

module.exports = geocode