const CommunityController = require('../controllers/communityController');
const router = require('express').Router()

router.get('/', CommunityController.GetAllInspire)
router.post('/', CommunityController.CreateInspire)

module.exports = router