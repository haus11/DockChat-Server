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

    changeUsername: function(value, req, res) {

        if(value === ConfigService.SERVER_USERNAME) {

            return res.badRequest({message: 'This name is reserved'});
        }

        User.update({id: req.session.user.id}, {username: value}).exec(function(error, userArray){

            if(error) {

                return res.badRequest(error);
            }

            var user = userArray[0];

            if(typeof user !== 'undefined') {

                CommandService.publish(req.session.user.username + ' changed his name to ' + user.username);

                SessionService.updateUserObject(user);
                req.session.user = user;

                sails.sockets.emit(SessionService.getUserSockets(), EventService.USER_UPDATED, user);

                return res.json({command: true, message: 'You changed your username'});
            }
            else {

                return res.badRequest({message: 'No user found for this session'});
            }
        });
    },

    create: function(req, res) {

        var username = req.param('username');

        if(typeof req.session.user !== 'undefined') {

            return res.badRequest({message: 'You already got a session, so use it!'});
        }

        if(username === ConfigService.SERVER_USERNAME) {

            return res.badRequest({message: 'This name is reserved'});
        }

        if(typeof username !== 'undefined') {

            User.create({username: username}).exec(function(error, user) {

                if(!error) {

                    req.session.user = user;
                    SessionService.addUserSocket(req.socket, user);

                    CommandService.publish(user.username + ' has joined');

                    sails.sockets.emit(SessionService.getUserSockets(req.socket), EventService.USER_CREATED, user);

                    return res.json(user);
                }
                else
                {
                    return res.badRequest(error);
                }
            });

        }
        else {

            return res.badRequest({message: 'You have to specify a username!'});
        }
    },

    authenticate: function(req, res) {
        console.log(req.session);
        if(req.session.authenticated) {

            return res.badRequest({message: 'Only one session is allowed!'});
        }

        if(typeof req.session !== 'undefined' && typeof req.session.user !== 'undefined') {

            req.session.authenticated = true;

            CommandService.publish(req.session.user.username + ' has joined');

            SessionService.addUserSocket(req.socket, req.session.user);
            sails.sockets.emit(SessionService.getUserSockets(req.socket), EventService.USER_RECONNECTED, req.session.user);

            return res.json(req.session.user);
        }
        else {

            req.session.authenticated = true;

            return res.json({});
        }
    },

    disconnect: function(session, socket, cb) {

        if(typeof session.user !== 'undefined') {

            CommandService.publish(session.user.username + ' has left');

            sails.sockets.emit(SessionService.getUserSockets(socket), EventService.USER_DISCONNECTED, session.user);
            SessionService.removeUserSocket(session.user);
        }

        session.authenticated = false;

        return cb();
    }

};

