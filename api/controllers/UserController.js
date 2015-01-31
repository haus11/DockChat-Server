/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    
    all: function(req, res) {
            
        return res.json(SessionService.getUserObjects());
    },
        
    create: function(req, res) {
        
        var username = req.param('username');
        
        if(typeof req.session.user !== 'undefined') {
            
            return res.badRequest({message: 'You already got a session, so use it!'});
        }
        
        if(typeof username !== 'undefined') {
            
            User.create({username: username}).exec(function(error, user) {
                
                if(!error) {
                    
                    req.session.user = user;
                    SessionService.addUserSocket(req.socket, user);

                    sails.sockets.emit(SessionService.getUserSockets(req.socket), EventService.USER_CREATED, user);
                    
                    return res.json(user);
                }
                else
                {
                    return req.badRequest(error);
                }
            });
            
        }
        else {
            
            return req.badRequest({message: 'You have to specify a username!'});
        }
    },
    
    authenticate: function(req, res) {

        console.log(req.session);
        if(typeof req.session !== 'undefined' && typeof req.session.user !== 'undefined') {

            req.session.authenticated = true;
            
            SessionService.addUserSocket(req.socket, req.session.user);
            sails.sockets.emit(SessionService.getUserSockets(req.socket), EventService.USER_RECONNECTED, req.session.user);
            console.log('A');
            console.log(req.session);
            return res.json(req.session.user);
        }
        else {
            
            req.session.authenticated = true;
            console.log('B');
            console.log(req.session);
            return res.json({});
        }
    },
    
    disconnect: function(session, socket, cb) {
        
        if(typeof session.user !== 'undefined') {
            
            sails.sockets.emit(SessionService.getUserSockets(socket), EventService.USER_DISCONNECTED, session.user);
            SessionService.removeUserSocket(session.user);
        }
        
        session.authenticated = false;

        return cb();
    }
	
};

