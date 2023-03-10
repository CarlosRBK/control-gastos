const { authenticate } = require('../config/jwc.config');

const DataController = require('../controllers/data.controller');
module.exports = function(app){
    app.get('/api',authenticate,  DataController.index);
    app.post('/api/data',authenticate,  DataController.createData);
    app.get('/api/data',authenticate, DataController.getAllData);
    app.get('/api/data/:id',authenticate, DataController.getData)
    app.put('/api/data/:id',authenticate, DataController.updateData);
    app.delete('/api/data/:id',authenticate, DataController.deleteData);
}
