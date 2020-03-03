const models = require('../../model');
const socketIOClient = require('socket.io-client');

const routes = (ioServer) => {
    console.log('New client connected');

    ioServer.on('generateReport', async ({ reportId, filters }) => {
        console.log('FRONT -> API - generateReport');
        console.log(filters);

        const equipment = await models.Equipment.findOne({
            where: {
                id: filters.equipment
            },
            raw: true
        });

		//Configurar o socket

		console.log(JSON.stringify(equipment.parameters.collectorUrl));
		const ioClient = socketIOClient(equipment.parameters.collectorUrl);
		//console.log(JSON.stringify(ioClient));

        const { type } = filters;
        if (type === 'AdvancedTable') {
            try {
                filters.itemType = [filters.itemType];
                console.log('API -> Collector - reportAdvancedTable');
                ioClient.emit('reportAdvancedTable', {reportId: reportId, filters: filters});
            } catch (errorCollectorSocket) {
                console.log("API -> Collector -  errorReportExecution : "+errorCollectorSocket);
                ioServer.emit('errorReportExecution', errorCollectorSocket);
            }

            ioClient.on('returnReportAdvancedTable', reportData => {
              console.log('Collector -> API - returnReportAdvancedTable');
              if (reportData.reportId === reportId) {
                  console.log('API -> Front - returnReport');
                  ioServer.emit('returnReport', reportData);
              }
          });

        }  else if (type === 'AdvancedGraphic') {

          try {
              filters.itemType = [filters.itemType];
              console.log('API -> Collector - reportAdvancedGraphic');
              ioClient.emit('reportAdvancedGraphic', {reportId: reportId, filters: filters});
          } catch (errorCollectorSocket) {
              console.log("API -> Collector -  errorReportExecution : "+errorCollectorSocket);
              ioServer.emit('errorReportExecution', errorCollectorSocket);
          }

          ioClient.on('returnReportAdvancedGraphic', reportData => {
            console.log('Collector -> API - returnReportAdvancedGraphic');
            if (reportData.reportId === reportId) {
                console.log('API -> Front - returnReport');
                ioServer.emit('returnReport', reportData);
            }
        });

    }  else if (type === 'Widget') {
        try {
            filters.itemType = [filters.itemType];
            console.log('API -> Collector - Widget');
            ioClient.emit('Widget', {reportId: reportId, filters: filters});
        } catch (errorCollectorSocket) {
            console.log("API -> Collector -  errorReportExecution : "+errorCollectorSocket);
            ioServer.emit('errorReportExecution', errorCollectorSocket);
        }

        ioClient.on('returnWidget', reportData => {
            console.log('Collector -> API - returnWidget');
            if (reportData.reportId === reportId) {
                console.log('API -> Front - returnReport');
                ioServer.emit('returnReport', reportData);
            }
        });
    }

      ioServer.on('disconnect', () => {
          console.log('Client disconnected');
      });

    });

}

module.exports = routes;
