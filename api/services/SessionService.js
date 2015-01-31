module.exports = {
    
    userSockets: {},
    userObjects: {},
    
    addUserSocket: function (socket, user) {

        this.userSockets['USER' + user.id] = socket;
        this.userObjects['USER' + user.id] = user;
    },
    
    getUserSocket: function (user) {

        if (this.userSockets.hasOwnProperty('USER' + user.id)) {
            return this.userSockets['USER' + user.id];
        }

        return null;
    },
    
    getUserObject: function (user) {

        if (this.userObjects.hasOwnProperty('USER' + user.id)) {
            return this.userObjects['USER' + user.id];
        }

        return null;
    },
    
    getUserObjects: function() {
        
        var userArray = [];
        
        for(var index in this.userObjects) {

            userArray.push(this.userObjects[index]);
        }
        
        return userArray;
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
        
        if (this.userObjects.hasOwnProperty('USER' + user.id)) {
            delete this.userObjects['USER' + user.id];
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