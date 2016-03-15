/**
* Machine.js
*
* @description :: This model represents a webserver, it retains informations about contract on this server, CPU/RAM usage
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        ip: {
            type: 'string',
            required: true,
            unique: true
        },
        dns: {
            type: 'string',
            required: true,
            unique: true
        },
        contracts : {
        	collection : 'contract',
            via: 'machine'
        },
        monthlyPrice: {
            type: 'string',
            required: true
        },
        seller: {
            enum: ['ovh', 'soyoustart', 'kimsufi'],
            required: true
        },
        serviceName: {
            type: 'string'
        }
    }
};
