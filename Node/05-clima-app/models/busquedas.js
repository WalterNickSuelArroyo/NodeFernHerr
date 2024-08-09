const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Bogota'];
    constructor() {
        //TODO: leer DB si existe
    }
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${lugar}`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.properties.full_address,
                lng: lugar.geometry.coordinates[0],
                lat: lugar.geometry.coordinates[1],
            }))
        } catch (error) {
            return [];
        }

    }
}

module.exports = Busquedas;