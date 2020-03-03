const models = require('../model');

module.exports = {

  	async getWidgets(dashboardId) {
		let widgets = await models.Widget.findAll({
			attributes: ['id', 'name', 'type', 'parameters', 'gridPosition', 'dashboardId'],
			where: {
				dashboardId: dashboardId
			},
			raw: true
		});

		return widgets;
	},

	async saveWidget(req, res) {
		let widget = await models.Widget.save(req.body);
		widget
		.then(wdigetSaved => {
			res.json(wdigetSaved);
		})
	}
}
