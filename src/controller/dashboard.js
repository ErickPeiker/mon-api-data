const models = require('../model');
const widgetController = require('./widget');

module.exports = {
  	async getDashboards(req, res) {
		const userLogged = JSON.parse(JSON.parse(req.header('User')));
		console.log(userLogged);

    	let dashs = await models.Dashboard.findAll({
			where: {
				companyId: userLogged.company.id
			},
        	raw: true
		});

		/*
			TODO  - Verificar a possibilidade de dar forEach na variável dashs, 
			não necessitando PromisseAll e 
			nem validação para colocar os widgets dentro do dashboard correto
		*/
		const promissesAll = dashs.map( (dash) => {
			return widgetController.getWidgets(dash.id) || [];
		});
		Promise.all(promissesAll)
		.then(function (results) {
			 results.map( (result) => {
			 	result.map( (widget) => {
			 		dashs.map( (dash) => {
			 			if (widget.dashboardId === dash.id) {
							 if (!dash.widgets) {
								dash.widgets = [];
							 }
			 				return dash.widgets.push(widget);
			 			}
			 		})
			 	})
			 })
			res.json(dashs);
		})
  	}
}
