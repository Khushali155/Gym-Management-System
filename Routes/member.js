const express = require("express")
const router = express.Router();
const MemberController = require('../Controllers/member')
const auth = require('../Auth/auth');

router.get('/allMember',auth,MemberController.getAllMember);
router.post('/registerMember',auth,MemberController.registerMember);


router.get('/searchedMembers',auth,MemberController.searchedMember);
router.get('/monthlyMember',auth,MemberController.monthlyMember);
router.get('/within-3-days-expiring',auth,MemberController.expiringWithin3Days);
router.get('/within-4-7-days-expiring',auth,MemberController.expiringWithinIn4To7Days);
router.get('/expireMember',auth,MemberController.expireMember);
router.get('/inactiveMember',auth,MemberController.inactiveMember);


router.get('/getMember/:id',auth,MemberController.getMemberDetails);
router.post('/changeStatus/:id',auth,MemberController.changeStatus);
router.put('/updateMemberPlan/:id',auth,MemberController.updateMemberPlan);
module.exports = router;