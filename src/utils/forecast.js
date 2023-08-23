const request = require('request');

const forecast = (location, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=bfd80ab979a364f7ecd8a4c9fbc8766c&query=${encodeURIComponent(location)}&units=m`

    request.get({ url, json: true, }, (err, {body}) => {
        if (err)
            callback('Not Able to Connect', undefined)
        else if (body.error)
            callback('Not Able to Find Location', undefined)
        else
            callback(undefined,body);
    })
}

module.exports = forecast;