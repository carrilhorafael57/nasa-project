const { getAllLaunches } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  //   for (const value of launches.values()) {
  //   }

  /**
   * Transform into json from map
   */
  return res.status(200).json(getAllLaunches());
}

module.exports = {
  httpGetAllLaunches,
};
