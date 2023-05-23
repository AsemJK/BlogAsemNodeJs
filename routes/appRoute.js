const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.app_index);

router.get('/about', blogController.app_about);
router.get('/posts/create', blogController.post_get_create);

//post routes
router.get('/posts', blogController.post_index);

router.post('/posts', blogController.post_create);

router.get('/posts/:id', blogController.post_details);

router.delete('/posts/:id', blogController.post_delete);


module.exports = router;