const express = require('express');
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
  httpGetLaunchWithId,
} = require('./launches.controller');

const launchesRouter = express();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.get('/:id', httpGetLaunchWithId);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;
