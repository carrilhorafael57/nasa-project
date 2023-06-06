const path = require('path')
const fs = require('fs');
const { parse } = require('csv-parse');

const habitablePlanets = [];

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
    fs.createReadStream(path.join(__dirname,'..','..', 'data', 'kepler_data.csv'))
      //piping create a nicely parsed javascript object as the output of the read stream
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject();
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
