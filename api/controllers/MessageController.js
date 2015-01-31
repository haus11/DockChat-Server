/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
        
        all: function(req, res) {
            
            var page = req.param('page') || 1;
            var limit = req.param('limit') || 20;
            
            Message.find({sort: 'createdAt DESC'}).paginate({page: page, limit: limit}).populate('from').exec(function(error, messages){
                
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
                
                Message.create({text: text, from: req.session.user.id}).exec(function(error, message) {
                    
                    if(error) {
                        
                        return res.badRequest(error);
                    }
                    else {

                        Message.findOne({id: message.id}).populate('from').exec(function(error, populatedMessage) {
                            
                            if(error) {
                                
                                return res.badRequest(error);
                            }
                            else {
                                
                                sails.sockets.emit(SessionService.getUserSockets(), EventService.MESSAGE_CREATED, populatedMessage);
                        
                                return res.json(message);
                            }
                        });
                    }
                });
                
            }
            else {
                
                return res.badRequest({message: 'You forgot some text!'});
            }
        }
};

