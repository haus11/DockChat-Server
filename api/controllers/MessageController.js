/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
        
        all: function(req, res) {
            
            Message.find().exec(function(error, messages){
                
                if(error) {
                    
                    return res.badRequest(error);
                }
                else {
                    
                    return res.json(messages);
                }
                
            });
        },
        
        create: function(req, res) {
            
            var text = req.param('text');

            if(typeof text !== 'undefined' && text !== null && text.length > 0) {
                
                Message.create({text: text}).exec(function(error, message) {
                    
                    if(error) {
                        
                        return res.negotiate(error);
                    }
                    else {
                        
                        sails.sockets.emit(SessionService.getUserSockets(req.socket), EventService.MESSAGE_CREATED, message);
                        
                        return res.json(message);
                    }
                });
                
            }
            else {
                
                return res.badRequest({message: 'You forgot some text!'});
            }
        }
};

