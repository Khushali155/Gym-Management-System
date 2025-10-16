const Member = require('../Modals/member');
const Membership = require('../Modals/membership');


exports.getAllMember = async(req,res)=>{
    try {
        const {skip,limit} = req.query;
        const members = await Member.find({gym: req.gym._id});
        const totalMember = members.length;

        const limitedMembers = await Member.find({gym:req.gym._id}).sort({createdAt:-1}).skip(skip).limit(limit);
        res.status(200).json({
            message:members.length?"Fetched Member Successfully":"No any Member Registered yet",
            members:limitedMembers,
            totalMembers:totalMember
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server error'});
        
    }
}


function addMonthsToDate(months,joiningDate){
    //get current year , month , day
    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    //calculate the new month and year
    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth / 12);

    //calculate the correct future month (modulus for month)
    const adjustedMonth = futureMonth % 12;

    //set the date to the first of the future month
    const futureDate = new Date(futureYear,adjustedMonth,1);

    //Get the last day of the future month
    const lastDayOffFutureMonth = new Date(futureYear,adjustedMonth +1,0).getDate();
    
    //Adjust the day if current day exceeds the number of the days in the new month
    const adjustedDay = Math.min(currentDay,lastDayOffFutureMonth);

    //set the final adjusted day
    futureDate.setDate(adjustedDay);

    return futureDate;
}

exports.registerMember = async(req,res)=>{
    try {
        const {name,mobileNo,address,membership,profilepic,joiningDate} = req.body;
        const member = await Member.findOne({gym:req.gym._id,mobileNo});
        if(member){
            return res.status(409).json({error:'Already registered with this Mobile No'});
        }

        const memberShip = await Membership.findOne({_id:membership,gym:req.gym._id});
        const membershipMonth = memberShip.months;
        if(memberShip){
            let jngDate = new Date(joiningDate);
            const nextBillDate = addMonthsToDate(membershipMonth,jngDate);
            let newmember = new Member({name,mobileNo,address,membership,gym:req.gym._id,profilepic,nextBillDate});
            await newmember.save();
            res.status(200).json({message:"Member registered Successfully",newmember});

        }else{
            return res.status(409).json({error:"No such Membership are there"});
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server error'});
    }
}

exports.searchedMember = async(req,res)=>{
    try {
        const {searchTerm} = req.query;
        const member = await Member.find({gym:req.gym._id,
            $or:[{name:{$regex : '^' + searchTerm , $options:'i'}},
                {mobileNo:{$regex : '^' + searchTerm , $options:'i'}}
            ]
        });
        res.status(200).json({
            message:member.length?"Fetched Members Successfully":"No Such Member Registered yet",
            members:member,
            totalMembers:member.length
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server error'});
    }
}

exports.monthlyMember = async(req,res)=>{
    try {
        const now = new Date();
        
        //Get the first day of current month 
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        //get the last day of the current month
        const endOfMonth = new Date(now.getFullYear(),now.getMonth() + 1, 0, 23, 59, 59,999);

       const member = await Member.find({gym:req.gym._id,
        createdAt : {
            $gte : startOfMonth, //greater than or equal to the first day of the month
            $lte : endOfMonth //less tham or equal to the last day of the month
        }
       }).sort({createdAt : -1});

       res.status(200).json({
        message:member.length?"Fetched Members Successfully":"No Such Member Registered yet",
        members:member,
        totalMembers:member.length
       })

    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Server error'});
    }
}

exports.expiringWithin3Days = async(req,res)=>{
    try {
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);

        const member = await Member.find({gym:req.gym._id,
            nextBillDate :{
                $gte : today,
                $lte : nextThreeDays
            }
        });

        res.status(200).json({
        message:member.length?"Fetched Members Successfully":"No Such Member is Expiring within 3 days",
        members:member,
        totalMembers:member.length
       })

    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Server error'});
        
    }
}

exports.expiringWithinIn4To7Days = async(req,res)=>{
    try {
        const today = new Date();
        const next4Days = new Date();
        next4Days.setDate(today.getDate() + 4);

        const next7days = new Date();
        next7days.setDate(today.getDate() + 7);

        const member = await Member.find({gym:req.gym._id,
            nextBillDate :{
                $gte : next4Days,
                $lte : next7days
            }
        });

        res.status(200).json({
        message:member.length?"Fetched Members Successfully":"No Such Member is Expiring within 4-7 days",
        members:member,
        totalMembers:member.length
       });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Server error'});
    }
}

exports.expireMember = async(req,res)=>{
    try {
        const today = new Date();

        const member = await Member.find({gym:req.gym._id,status:"Active",
            nextBillDate :{
                $lte : today
            }
        });

        res.status(200).json({
        message:member.length?"Fetched Members Successfully":"No Such Member has been Expired",
        members:member,
        totalMembers:member.length
       });

    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Server error'});
        
    }
}

exports.inactiveMember = async(req,res)=>{
    try {

        const member = await Member.find({gym:req.gym._id,status:"Pending"});

        res.status(200).json({
        message:member.length?"Fetched Members Successfully":"No Such Member is pending",
        members:member,
        totalMembers:member.length
       });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Server error'});
    }
}

exports.getMemberDetails = async(req,res)=>{
    try {
        const {id} = req.params  ;
        const member = await Member.findOne({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                error:"No Such Member"
            })
        } 
        
        res.status(200).json({
            message:"Member Data Fetched",
            member:member
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Server error'});
    }
}

exports.changeStatus = async(req,res)=>{
    try {
        const {id} = req.params  ;
        const {status} = req.body;
        const member = await Member.findOne({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                error:"No Such Member"
            })
        } 

        member.status = status;
        await member.save();
        res.status(200).json({
            message:'Status changed successfully'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Server error'});
    }
}

exports.updateMemberPlan = async(req,res)=>{
    try {
        const {membership} = req.body;
        const {id} = req.params;

        const memberShip = await Membership.findOne({gym:req.gym._id,_id:membership})
        if(membership){
            let getMonths = memberShip.months;
            let today = new Date();
            let nextBillDate = addMonthsToDate(getMonths,today);
            const member = await Member.findOne({gym:req.gym._id,_id:id});
            if(!member){
                return res.status(409).json({error:"No Such Member are there"});
            }
            member.nextBillDate = nextBillDate;
            member.lastPayment = today;

            await member.save();
            res.status(200).json({message:"Member Renewed Successfully ",member});

        }else{
            return res.status(409).json({error:"No Such Membership are there"});
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error:'Server error'});
    }
}