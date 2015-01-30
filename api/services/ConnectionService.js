module.exports = {
    
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