const errorLoger = require('../middleware/error-loger')
module.exports = app => {
  require('./vessel')(app);
  app.use('/', require('./home'));
  app.use('/app/log', require('./log'));
  app.use('/api/permission', require('./permission'));
  app.use('/api/auth', require('./authentication'));
  app.use('/api/captcha',require('./api-svgCaptcha'));
  app.use('/api/car', require('./api-car'));
  app.use('/api/qrLink',require('./api-qrLink'));
  app.use('/api/messageTemplate',require('./api-messageTemplate'));
  app.use('/api/userCarAssignMessage',require('./api-userCarAssignMessage'));
  app.use('/api/userCarAssign',require('./api-userCarAssign'));
  app.use('/api/userType', require('./userType'));
  app.use('/api/user',require('./api-user'));
  app.use('/api/registerDriver', require('./api-register'));
  app.use(errorLoger);
};
