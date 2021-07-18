module.exports = app => {
    app.use('/api/vessel/deck', require('./deck'));
}; 
