/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    
    attributes: {
        
        id: {
            primaryKey: true,
            type: 'integer',
            autoIncrement: true
        },
        
        username: {
            type: 'string',
            required: true
        },
        
        password: {
            type: 'string',
            required: false
        },
        
        isServer: {
            type: 'boolean',
            defaultsTo: false
        },
        
        deleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

