require('express-async-errors')
const express = require('express')
const cors = require('cors');
const app = express()
const {constants} = require('crypto');
const setting = require('./app-setting')
const path = require('path')

const fs = require('fs');
app.use(cors())
app.use(express.json());
app.use(express.static(__dirname + '/www'));
//app.use(require('./middleware/log'))
app.use(require('./bootstrap/init'));
app.use(require('./middleware/nocache'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const serverHttp = require('http').createServer(app);

// const serverHttps = require('https').createServer({
//   key: fs.readFileSync("./keys/client-key.pem"), 
//   cert: fs.readFileSync("./keys/client-cert.pem"),
//   secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
//   passphrase: 'PASSWORD'
// },app); 


require('./messaging/socket')(app, serverHttp);
require('./bootstrap/mongodb');
require('./routes')(app);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);


serverHttp.listen((setting.portNo), () => {
  console.log(`Http Server started on ${setting.portNo} --- ${new Date()}`);
});

// serverHttps.listen((setting.portNo), () => {
//   console.log(`Https Server started on ${setting.portNo}--- ${new Date()}`);
// });

// serverHttps.listen(4100,'localhost',()=>{
//   console.log(`Https Server localhost--- ${new Date()}`);
// })



// const helmet = require('helmet');
// const hpp = require('hpp');
// const csurf = require('csurf');

// const options={
//   key:fs.readFileSync("./certificates/client-key.pem"),
//   cert:fs.readFileSync("./certificates/client-key.pem"),
//   requestCert: true
// }




// /* Set Security Configs */
// app.use(helmet());
// app.use(hpp());
// app.use(csurf());