const express = require('express');
const md5 = require('md5');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const Users = require('../models/users.model')
const Permission = require('../models/permissions.model')
const { GetAll, Update, HardDelete, InsertMany } = require('../util/genericMethods');
const auth = require('../middleware/auth');
const adminOrSuperuser = require('../middleware/adminOrSuperuser');
const queries = require('../util/T-SQL/queries');
const setting = require('../app-setting')
const sworm = require('sworm');
var _ = require('lodash');


router.get('/importNewUsersFromBCTS', [auth, adminOrSuperuser], async (req, res) => {
  try {
    const db = sworm.db(setting.db.sqlConfig[`${req.user.area}`]);
    var { permissions } = await Permission.findOne();
    var mongoUsers = await Users.find();
    var newUsers = [];
    var bctsUsers = await db.query(queries.USER.getAllUsersFromBcts, {});
    bctsUsers.forEach(item => {
      const newUser = mongoUsers.filter(c => c.userCode === item.userCode && c.area === req.user.area);
      if (newUser.length == 0) {
        newUsers.push({...item,area:req.user.area});
      }
    })
    if (newUsers && newUsers.length > 0) {

      let temp = newUsers.map(item => {
        return {
          ...item,
          password: md5(item.password.trim()),
          permissions: permissions
        }
      });
      req.body = temp;
      //console.log(temp);
      await InsertMany(Users, req, res)
    }
    else {
      return SendResponse(req, res, 'call to administrator', false);
    }
  }
  catch (error) {
    //console.log(error)
    return SendResponse(req, res, error, false, 500);
  }
});

router.route('/')
  .get([auth, adminOrSuperuser], async (req, res) => {
    //console.log('user', req.body)
    const options = { condition: { userType: { $ne: 'Superuser' }, area: req.user.area } };
    await GetAll(Users, req, res, options)
  })
  // .post([auth, admin],async (req, res) => {
  //   if (req.body.option)
  //     await GetAll(Users, req, res, req.body.option)
  //   else {
  //     req.body.password = md5(req.body.password).toUpperCase();
  //     await Insert(Users, req, res);
  //   }
  // })
  .put([auth, adminOrSuperuser], async (req, res) => {
    await Update(Users, req, res)
  })



router.route('/:id')
  .delete([auth, adminOrSuperuser], async (req, res) => {
    req.body._id = req.params.id;
    //console.log(req.params);
    await HardDelete(Users, req, res)
  })

module.exports = router;
