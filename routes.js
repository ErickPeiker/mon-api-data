const express = require('express');

const middlewareController = require('./src/controller/middleware');
const { controllerAuthenticationMiddleware } = require('./src/middleware/authentication');

const analyticController = require('./src/controller/analytic');
const syntheticController = require('./src/controller/synthetic');
const dashboardController = require('./src/controller/dashboard');
const widgetController = require('./src/controller/widget');

const router = express.Router();

router.use(controllerAuthenticationMiddleware);

router.get('/dashboard', middlewareController, function(req, res) {
	console.log('Chamou?');
  	dashboardController.getDashboards(req, res);
});

router.post('/widget', middlewareController, function(req, res) {
	widgetController.saveWidget(req, res);
});

router.get('/report/analytic', middlewareController, function(req, res) {
  	analyticController.getAnalyticData(res, req.locals.decodedFilters);
});

router.get('/synthetic', middlewareController, function(req, res) {
  	syntheticController.getSyntheticData(res, req.locals.decodedFilters);
});

// router.get('/teste', (req, res) => {
  // const io = req.app.get('socket.io');
// });

module.exports = router;
