//const bluebird = require('bluebird');
const WebSocket = require('ws');
//const qixSchema = require('enigma.js/schemas/3.2.json');
const schema = require('enigma.js/schemas/12.20.0.json');
//const mixins = require('halyard.js/dist/halyard-enigma-mixin');
const Config = require('./settings');
const settings = new Config();
const fs = require('fs');
const path = require('path');

// Your Sense Enterprise installation hostname:
const engineHost = settings.QIX.host;

// Make sure the port below is accessible from the machine where this example
// is executed. If you changed the QIX Engine port in your installation, change this:
const enginePort = settings.QIX.port;

// 'engineData' is a special "app id" that indicates you only want to use the global
// QIX interface or session apps, change this to an existing app guid if you intend
// to open that app:
const appId = 'engineData';

// The Sense Enterprise-configured user directory for the user you want to identify
// as:
const userDirectory = settings.QIX.userDir;

// The user to use when creating the session:
const userId = settings.QIX.userName;

// Path to a local folder containing the Sense Enterprise exported certificates:
const certificatesPath = settings.QIX.certsPath;

// Helper function to read the contents of the certificate files:
const readCert = filename => fs.readFileSync(path.resolve(__dirname, certificatesPath, filename));

/*
const config = {
  Promise: bluebird,
  schema: qixSchema,
  mixins,
  url: 'ws://pbgqix.expovin.it:9076/app/engineData',
  createSocket(url) {
    return new WebSocket(url);
  }
};
*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const config = {
  schema,
//  mixins,
  url: 'wss://'+engineHost+":"+enginePort+"/app/"+appId,
  // Notice the non-standard second parameter here, this is how you pass in
  // additional configuration to the 'ws' npm library, if you use a different
  // library you may configure this differently:
  createSocket: url => new WebSocket(url, {
    ca: [readCert('root.pem')],
    key: readCert('client_key.pem'),
    cert: readCert('client.pem'),
    headers: {
      'X-Qlik-User': `UserDirectory=${encodeURIComponent(userDirectory)}; UserId=${encodeURIComponent(userId)}`,
    },
  }),
}

module.exports = config;