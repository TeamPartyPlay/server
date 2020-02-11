const express = require('express');

const router = express.Router();

router.use('/spotify', require('./spotify'));
router.use('/user', require('./user'));
router.use('/invite', require('./invite'));
router.use('/spotify', require('./spotify'));

module.exports = router;
