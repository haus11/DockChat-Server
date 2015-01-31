module.exports = {
    
    
    publish: function (message) {

        User.findOrCreate({isServer: true, username: ConfigService.SERVER_USERNAME}, {isServer: true, username: ConfigService.SERVER_USERNAME}).exec(function (error, serveruser) {
            
            if(!error) {
                
                Message.create({text: message, from: serveruser.id}).populate('from').exec(function(error, message) {
                    
                    if(error) {
                        
                        console.log('can not create command message');
                    }
                    else {

                        sails.sockets.emit(SessionService.getUserSockets(), EventService.MESSAGE_CREATED, message);
                    }
                });
            }
            else {
                console.log('can not publish command (serveruser creation failed');
            }

        });
    }
};