const request = require('request')

const forecast = (latitude, longtitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/ee9cffd146119eb96c3173cc7b6221a9/'+latitude+','+longtitude+'?units=si'

    request({url, json : true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            //console.log(body.timezone)
            //console.log(body.daily.data[0])
            callback(undefined,{
                forcastData : body.daily.data[0].summary + ' It is currently '+body.currently.temperature+'°C degrees out. There is '+body.currently.precipProbability+'% chance of '+body.currently.precipType+'. Today high temperature is :'+body.daily.data[0].temperatureHigh+' and minimum temperature is : '+body.daily.data[0].temperatureLow+'. The humidity is : '+body.currently.humidity+' and visibility is : '+body.currently.visibility+'.',
                address : body.timezone
            } )

        }
    })
}

module.exports = forecast