const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYXNocmFma2hhbiIsImEiOiJja3R4eHhyaGowMmZ3Mm9wbTNnOTZqdzZoIn0.cZAv4vaJQ_u7UVm8xRlenQ&limit=1"

    request({url: geocodeURL, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('There is some error. Please Check!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode