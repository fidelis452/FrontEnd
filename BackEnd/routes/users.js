// const authenticate = require('./functions/authenticate.js');
const chalk = require('chalk');
const camelCase = require('camelcase');
let user = {};

user.getinfo = (userID) => {
  let options = {};
  options.id = parseInt(userID);
  return new Promise((resolve, reject) => {
    authenticate.oAuth([])
    .then(function (smartsheet) {
      smartsheet.user.getUser(options)
      .then(data => resolve(data))
      .then(error => reject(error));
    })
    .catch(error=>reject(error));
  })
}