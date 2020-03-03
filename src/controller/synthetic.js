const models = require('../model');
const axios = require('axios');

module.exports = {
  async getSyntheticData(res, filters) {
    let returnArray = [];

    const randomDate = (start, end) => (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));

    for (var i = 0; i < 100; i++) {
      returnArray.push({
        'key': randomDate(new Date(2019, 8, 1), new Date()),
        'TCP': Math.floor(Math.random() * 1000000000),
        'UDP': Math.floor(Math.random() * 1000000000),
        'FTP': Math.floor(Math.random() * 1000000000),
        'SMTP': Math.floor(Math.random() * 1000000000),
      });
    }

    return res.json(returnArray);

    let equipment = await models.Equipment.findOne({
      where: {
        id: filters.equipment
      },
      raw: true
    });

    axios.get(equipment.parameters.collectorUrl+'/table?filters='+(new Buffer(JSON.stringify(filters)).toString('base64'))).then(response => {
      return res.json(response.data);
    }).catch(error => {
      console.log(error);
    });
  }
}
