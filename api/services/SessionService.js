module.exports = {
    
    userSockets: {},
    
    addUserSocket: function (socket, user) {

        this.userSockets['USER' + user.id] = socket;
    },
    
    getUserSocket: function (user) {

        if (this.userSockets.hasOwnProperty('USER' + user.id)) {
            return this.userSockets['USER' + user.id];
        }

        return null;
    },
    
    getUserSockets: function (socket) {
        
        var sockets = [];
        
        for(var index in this.userSockets) {

            if(typeof socket !== 'undefined' && socket.id === this.userSockets[index].id) {
                continue;
            }
            
            sockets.push(this.userSockets[index]);
        }
        
        return this.socketToID(sockets);
    },
    
    removeUserSocket: function (user) {

        if (this.userSockets.hasOwnProperty('USER' + user.id)) {
            delete this.userSockets['USER' + user.id];
        }
    },
    
    socketToID: function (sockets) {

        if (sockets instanceof Array) {

            var socketIDArray = [];

            for (var index = 0; index < sockets.length; ++index) {

                socketIDArray.push(sails.sockets.id(sockets[index]));
            }

            return socketIDArray;

        }
        else {

            return sails.sockets.id(sockets);
        }
    },
};