const errorLoger = require('../middleware/error-loger')
module.exports = app => {
  require('./vessel')(app);
  app.use('/', require('./home'));
  app.use('/app/log', require('./log'));
  app.use('/api/userType', require('./userType'));
  app.use('/api/user', require('./user'));
  app.use('/api/permission', require('./permission'));
  app.use('/api/auth', require('./authentication'));
  app.use('/api/voyage', require('./voyage'));
  app.use('/api/car', require('./api-car'));
  app.use('/api/qrLink',require('./api-qrLink'));
  app.use('/api/messageTemplate',require('./api-messageTemplate'));
  app.use('/api/userCarAssign',require('./api-userCarAssign'));
  app.use('/api/userCarAssignMessage',require('./api-userCarAssignMessage'));
  app.use('/api/damage', require('./damage'));
  app.use('/api/area', require('./area'));
  app.use('/api/user',require('./api-user'));
  app.use('/api/appPreference', require('./appPreference'));
  app.use(errorLoger);
};
