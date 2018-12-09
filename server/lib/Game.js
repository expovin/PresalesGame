const Market = require('./ClassMarket');
const wsClass = require('./wsMessages');


module.exports = {
    m:new Market('m'),
    ws : new wsClass()
}
