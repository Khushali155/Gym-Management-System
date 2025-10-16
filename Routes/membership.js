const express = require("express")
const router = express.Router();
const MembershipController = require('../Controllers/membership');
const auth = require('../Auth/auth');


router.post('/addMembership',auth,MembershipController.addMembership);
router.get('/getMembership',auth,MembershipController.getMembership);

module.exports = router;