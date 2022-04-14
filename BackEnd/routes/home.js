import express, { json } from "express";
import qs from "querystring";
import client from "smartsheet";
import fetch from "node-fetch";
const app = express();
const router = express.Router();
// const fs = require(fs);
// instantiating the Smartsheet client
const smartsheet =client.createClient({
  // baseUrl: smartsheet.smartsheet.authURL,
  accessToken: "vGgxZCzwVm2G004S4MkPaL4wMCSN1v6qLHHXA",
  logLevel: "info",
});

router.get('/', (req, res) => {
  res.send(
    '<a href="http://localhost:3000">Login to Smartsheet</a></br>'
    )
});
// router.post()

router.get('/auth', (req, res) => {
  console.log('Your authorization url: ', authorizationUri);
  res.redirect(authorizationUri);
});
// helper function to assemble authorization url
function authorizeURL(params) {
  console.log(params);
  const authURL = 'https://app.smartsheet.com/b/authorize';
 
  return `${authURL}?${qs.stringify(params)}`;
}
const authorizationUri = authorizeURL({
  response_type: 'code',
  client_id:"6h28op0dmjmavyxkkuy",
  scope: '',
});


// list all users
router.get("/", (req, res) => {
//list users from smartsheet
smartsheet.users.getUser(option)
.then(function(userProfile) {
  res.send(JSON.stringify(userProfile));
})
.catch(function(error) {
  console.log(error);
});

});

router.post('/', (req, res) => {
  const url ="https://app.smartsheet.com/b/authorize"
  //authenticate the user
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: req.body,
  })
    .then(result=>{
      if(result.status === 500){
        res.status(500).send({message: result.statusText})
      }
    })
    .catch((error) => {
      console.log(error);
    })
});
export default router;