/**
* Log.js
*
* @description :: This model represents a client contract
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        machine : {
        	model : 'machine'
        },
        monthlyPrice: {
            type: 'float'
        },
        dateStart:
		{
			type: 'date',
			required: true
		},
		dateEnd:
		{
			type: 'date',
			required: true
		},
    }
};
