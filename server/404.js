module.exports = function (request, response, next) {
    response.status(404);
    response.redirect('/');
    next();
};
