module.exports = {
    
    
    publish: function (message) {

        User.findOrCreate({isServer: true, username: ConfigService.SERVER_USERNAME}, {isServer: true, username: ConfigService.SERVER_USERNAME}).exec(function (error, serveruser) {
            
            if(!error) {

                Message.create({text: message, from: serveruser.id}).exec(function(error, message) {
                    
                    if(error) {
                        
                        return res.badRequest(error);
                    }
                    else {

                        Message.findOne({id: message.id}).populate('from').exec(function(error, populatedMessage) {
                            
                            if(error) {
                                
                                console.log('can not create command message');
                            }
                            else {
                                
                                sails.sockets.emit(SessionService.getUserSockets(), EventService.MESSAGE_CREATED, populatedMessage);
                            }
                        });
                    }
                });
            }
            else {
                console.log('can not publish command (serveruser creation failed');
            }

        });
    }
};