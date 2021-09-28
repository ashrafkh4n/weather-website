const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=0b48e4d8e1d7f37b7ff5221af1000a4b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 

    request({url, json: true}, (error, {body}) => {
        const { error:webError } = body
        const {temperature, feelslike, weather_descriptions} = body.current
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if ( webError ) {
            callback('There is some error. Please Check!', undefined)
        } else {
            const data = weather_descriptions[0] + '. It is currently ' +  temperature + ' degree out. It feels like ' + feelslike + ' degree out.'
            callback(undefined, data)
        }
    })
}


module.exports = forecast