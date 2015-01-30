/**
 * Message.js
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
        
        text: {
            type: 'text',
            required: true
        },
        
        from: {
            model: 'user',
            type: 'json',
            required: false
        },
        
        to: {
            model: 'user',
            type: 'json',
            required: false
        },
        
        deleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

