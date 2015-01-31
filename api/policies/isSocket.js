module.exports = function (req, res, next) {
    
    if(req.isSocket) {
        
        next();
    }
    else {
        
        res.badRequest({message: 'No Socket!'});
    }
};