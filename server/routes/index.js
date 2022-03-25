const router = require('express').Router();
const viewsRouter = require('./viewRoutes');
const apisRouter = require('./apiRoutes');
const { clientError, serverError } = require('../controllers/errors');

router.use('/api/v1', apisRouter);
router.use(viewsRouter);

router.use(clientError);
router.use(serverError);

module.exports = router;
