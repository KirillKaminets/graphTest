const deformation_response  = require('./deformation_response.json');
const deformation_trend_response = require('./deformation_trend_response.json');
const termo_response  = require('./termo_response.json');
const termo_trend_response = require('./termo_trend_response.json');
// and so on

module.exports = function() {
return {
    deformation_response  : deformation_response,
    deformation_trend_response : deformation_trend_response,
    termo_response  : termo_response,
    termo_trend_response : termo_trend_response
// and so on
 }
}