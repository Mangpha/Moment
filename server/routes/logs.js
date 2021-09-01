const express = require('express');
const router = express.Router();

const { logController } = require('../controllers');

// Users Controller
router.put('/submit', logController.submit);
router.patch('/fix/:id', logController.fix);
router.delete('/delete/:id', logController.delete);
router.get('/detail/:id', logController.detail);
router.get('/like/:id', logController.like);
router.get('/recent/page/:num', logController.recent);
router.get('/myPost/:num', logController.myPost);
router.get('/myPostDetail/:id', logController.myPostDetail);
router.get('/userIsLike/:id', logController.userIsLike);

module.exports = router;
