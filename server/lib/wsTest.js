const QRSClass = require('./QRSClass');

const qrs = new QRSClass();

/*
qrs.getUser('e6ff2e60-78cc-43f2-afd7-8f01a1a79f61')
.then( result => console.log(result));
*/

//qrs.removeCustomProp('f63f1be6-13cf-4d68-ba89-88f3acd0cb0c','MAB')
qrs.addCustomProp('f63f1be6-13cf-4d68-ba89-88f3acd0cb0c','MAB')