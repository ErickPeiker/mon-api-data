const models = require('../model');
const axios = require('axios');

module.exports = {
  async getAnalyticData(res, filters) {
    let equipment = await models.Equipment.findOne({
      where: {
        id: filters.equipment
      },
      raw: true
    });
    console.log(equipment.parameters.collectorUrl+'/table?filters='+(new Buffer(JSON.stringify(filters)).toString('base64')));

    console.log(new Date());

    return res.json([]);
    // axios.get(equipment.parameters.collectorUrl+'/table?filters='+(new Buffer(JSON.stringify(filters)).toString('base64')), { timeout: 0 }).then(response => {
      // console.log(new Date());
      // return res.json(response.data);
    // }).catch(error => {
      // console.log(error);
    // });
  },
}
