const router = require('express').Router();
const viewsRouter = require('./viewRoutes');

router.use(viewsRouter);

module.exports = router;
