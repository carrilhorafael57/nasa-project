const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}
/**
 * const new Promise((resolve, reject) => {})
 * promise.then((result) => ())
 */

function loadPlanetsData() {
  //Reading file and pushing to results array
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      //piping create a nicely parsed javascript object as the output of the read stream
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          // Create with insert + update = upsert
          savePlanet(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject();
      })
      .on('end', async () => {
        const numPlanetsFound = (await getAllplanets()).length;
        console.log(`${numPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllplanets() {
  return await planets.find({}, {__v: 0, _id: 0});
}

async function savePlanet(planetData) {
  try {
    await planets.updateOne(
      {
        keplerName: planetData.kepler_name,
      },
      {
        keplerName: planetData.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(`Could not save the planet ${error}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllplanets,
};
