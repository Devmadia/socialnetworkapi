// import router
const router = require('express').Router();

// import API routes
const apiRoutes = require('/api');

// prefix API routes imported from 'api' directory
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;