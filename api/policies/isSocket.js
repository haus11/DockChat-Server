module.exports = function isSocket (req, res, next) {
    
    if(req.isSocket) {
        
        next();
    }
    else {
        
        res.badRequest({message: 'No Socket!'});
    }
};