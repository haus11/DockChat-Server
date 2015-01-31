module.exports = function (req, res, next) {
    
    var commands = {
        
        '/me' : {
            
            'changename' : [
                sails.controllers.user.changeUsername
            ],
        }
    };
    
    var text = req.param('text');
            
    if(typeof text !== 'string' || text.length <= 0 || typeof req !== 'object' || typeof res !== 'object') {
            
        next();
        return;
    }

    var splitted = text.split(" ");

    for(var commandIndex in commands) {

        if(commandIndex === splitted[0]) {

            for(var actionIndex in commands[commandIndex]) {

                if(actionIndex === splitted[1] && typeof splitted[2] !== 'undefined') {

                    for(var index = 0; index < commands[commandIndex][actionIndex].length; ++index) {

                        commands[commandIndex][actionIndex][index](splitted[2], req, res);
                        return;
                    }
                }
            }
        }
    }

    next();
};