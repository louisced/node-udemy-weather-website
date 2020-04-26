const request = require('postman-request');

const mapBox_key = 'pk.eyJ1IjoiY2VkcmljbG91aXMiLCJhIjoiY2s5ZTVoaWk3MDIycTNmbXdodmUyODVqbCJ9.JJ9EhUtAuIpwf2s4sp3oKg'


const geocode = (adress, callback) => {
    const url=  'https://api.mapbox.com/geocoding/v5/mapbox.places/'
                + encodeURIComponent(adress)
                + '.json?access_token=' + mapBox_key
                + '&limit=' + '1'

    if (adress === undefined){
        callback('Location is empty! Please give a location', undefined)
    }
    else
    {
        request({ url: url, json: true}, (error, { body }) => {
            if (error){
                callback('Unable to connect to location service!', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find this location. Try another.', undefined)
            } else {
                callback(undefined,{ 
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
    }
}

module.exports = geocode