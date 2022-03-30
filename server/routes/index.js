const router = require('express').Router();
const viewsRouter = require('./viewRoutes');
const apisRouter = require('./apiRoutes');
const { clientError, serverError, getMainPage } = require('../controllers');

router.get('/', getMainPage);

router.use(viewsRouter);
router.use('/api/v1', apisRouter);
router.use('/404', clientError);

router.use(clientError);
router.use(serverError);

module.exports = router;
