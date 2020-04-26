const request = require('postman-request');

const weatherStack_key =        '4b38ef6012403188065cc3d9cb914de1'
const weatherStack_url =        'http://api.weatherstack.com/current?'



const forecast = ({latitude, longitude}, callback) => {
    url =   weatherStack_url
            + 'access_key=' + weatherStack_key 
            + '&query=' + latitude + ',' + longitude

    if (latitude === undefined || longitude === undefined){
        callback('latitude or/and longitude is empty!', undefined)
    }
    else {
        request({ url, json: true}, (error, { body }) => {
            if (error){
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                console.log(body.current)
                callback(undefined,
                    body.current.weather_descriptions + '.'
                    + 'It is currently ' + body.current.temperature + ' degrees out. '
                    + 'It feels ' + body.current.feelslike + ' degrees out. '
                    + 'The wind is ' + body.current.wind_speed + ' km/h. '
                    + 'The visibility is '+ body.current.visibility + ' meter. '
                    + 'The humidity is ' + body.current.humidity + ' %. '
                )
            }
        })
    }
}

module.exports = forecast